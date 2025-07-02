import express from "express"
import { authenticator } from "../Middleware/authenticator.js"
import { addMoreData, chat, chat_starter } from "../Controller/Chat.js"

const router=express.Router()

router.post('/question',authenticator,chat)
router.post('/start-chat',authenticator,chat_starter)
router.post('/addMoreData',authenticator,addMoreData)

export default router