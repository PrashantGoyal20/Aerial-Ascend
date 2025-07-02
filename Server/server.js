import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import { errorMiddleware } from './Middleware/error.js'
import userRouter from "./Routes/auth.js"
import flightRoute from "./Routes/flights.js"
import passengerRoute from "./Routes/passenger.js"
import chatRoute from "./Routes/chat.js"
import cors from "cors"
import cloudinary from "cloudinary"
import fileUpload from "express-fileupload"
import crypto from "crypto"
import Razorpay from "razorpay"
import { QdrantClient } from "@qdrant/js-client-rest"
import { MongoClient, ServerApiVersion } from "mongodb"
import { getEmbedding } from "./Controller/Chat.js"
import axios from "axios"
import { upsertToQdrant, deleteFromQdrant } from "./Controller/Chat.js"
import { Flights } from "./DB/flighs.js"
import PQueue from 'p-queue';



const app = express()
dotenv.config()
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware)
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use('/auth', userRouter)
app.use('/flights', flightRoute)
app.use('/passenger', passengerRoute)
app.use('/chat', chatRoute)

const PORT = process.env.PORT

const Qdrant_api_key = process.env.Qdrant_api_key
const Qdrant_url = process.env.Qdrant_url
const Qdrant_Collection = process.env.Qdrant_Collection
const queue = new PQueue({ concurrency: 2 });

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  replicaSet: process.env.MONGO_REPLICA_SET

})
  .then(app.listen(PORT, async () => {
    console.log("Mongoose Connected")
    const client = mongoose.connection.getClient();
    console.log("🔁 Replica Set:", client.options?.replicaSet || 'undefined');
    const changeStream = Flights.watch([], {
  fullDocument: 'updateLookup',
});


    if (typeof changeStream.on !== 'function') {
      console.error('❌ changeStream is not a valid ChangeStream');

      return;
    }


    console.log('🟢 Watching MongoDB for changes...');

    changeStream.on('change', async (change) => {
      try {
        console.log('Detected:', change);
        const { operationType } = change;
        let doc = change.fullDocument;
        const docId = change.documentKey._id.toString();

        if (operationType === 'insert') {

          const text = `
              Flight ${doc.flightNumber} travels from ${doc.origin} to ${doc.destination}.
              Departure is at ${doc.departureTime}, and arrival is at ${doc.arrivalTime}, with a total duration of ${doc.duration}.

              Origin coordinates: [${doc.originCoordinates.join(', ')}]
              Destination coordinates: [${doc.destinationCoordinates.join(', ')}]

              Available seat types and prices:
              ${doc.seatType.map((type, i) => `- ${type}: ₹${doc.price[i]} (${doc.seatsAvailable[i]} seats available)`).join('\n')}
            `;

          if (typeof text !== 'string' || text.trim() === '') {
            console.warn("⚠️ Invalid composed text, skipping...");
            return;
          }

          queue.add(async () => {
            try {
              const embedding = await getEmbedding(text);
              console.log("📐 Embedding length:", embedding.length);

              await upsertToQdrant(docId, embedding, doc);
              console.log(`✅ Synced ${operationType} to Qdrant → ID: ${docId}`);
            } catch (err) {
              console.error("❌ Error processing doc:", doc._id, err.message);
            }
          });


        }
        else if(operationType === 'update'){
          doc = change.fullDocument;
          console.log(doc)
          await deleteFromQdrant(docId);
          console.log(`🗑️ Deleted from Qdrant → ID: ${docId}`);
          console.log(doc)
          const text = `
              Flight ${doc.flightNumber} travels from ${doc.origin} to ${doc.destination}.
              Departure is at ${doc.departureTime}, and arrival is at ${doc.arrivalTime}, with a total duration of ${doc.duration}.

              Origin coordinates: [${doc.originCoordinates.join(', ')}]
              Destination coordinates: [${doc.destinationCoordinates.join(', ')}]

              Available seat types and prices:
              ${doc.seatType.map((type, i) => `- ${type}: ₹${doc.price[i]} (${doc.seatsAvailable[i]} seats available)`).join('\n')}
            `;

          if (typeof text !== 'string' || text.trim() === '') {
            console.warn("⚠️ Invalid composed text, skipping...");
            return;
          }

          queue.add(async () => {
            try {
              const embedding = await getEmbedding(text);
              console.log("📐 Embedding length:", embedding.length);

              await upsertToQdrant(docId, embedding, doc);
              console.log(`✅ Synced ${operationType} to Qdrant → ID: ${docId}`);
            } catch (err) {
              console.error("❌ Error processing doc:", doc._id, err.message);
            }
          });

        }

        else if (operationType === 'delete') {
          await deleteFromQdrant(docId);
          console.log(`🗑️ Deleted from Qdrant → ID: ${docId}`);
        }
      } catch (err) {
        console.error('❌ Error in ChangeStream handler:', err);
      }
    });

    changeStream.on('error', (error) => {
      console.error("Message:", error.message);
    });

  })).catch((err) =>
    console.log(err)
  )



