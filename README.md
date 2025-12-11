**Aerial-Ascend**

A full-stack flight booking web application (React + Node). This repository contains a Vite React client in `Client/` and an Express-style Node server in `Server/` with simple data modules in `DB/`.

**Quick Start**

- **Clone:**

  ```bash
  git clone <repo-url>
  cd "./Aerial Ascends" # or your chosen path
  ```

- **Install dependencies:**

  ```bash
  # Client
  cd Client
  npm install

  # In another terminal: Server
  cd ../Server
  npm install
  ```

- **Run locally:**

  ```bash
  # Start server (from Server/)
  cd Server
  npm run dev   # or: node server.js

  # Start client dev server (from Client/)
  cd ../Client
  npm run dev  # Vite dev server
  ```

**Environment**
- **Server env (example):** create a file `Server/.env` with values similar to:

  ```env
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/aerial-ascend
  JWT_SECRET=your_jwt_secret_here
  NODE_ENV=development
  ```

  The server code references token and auth middleware in `Server/Middleware/` and database helpers in `DB/` — adapt env vars accordingly.

**Project Structure (high level)**
- **Client/**: Vite + React web app
  - `src/` — React source files
  - `src/Components/` — UI components (Flights, Forms, Footer, Home, etc.)
  - `index.html`, `vite.config.js`

- **Server/**: Node backend
  - `server.js` — main server entry
  - `Routes/` — route definitions (`auth.js`, `flights.js`, `passenger.js`, `chat.js`)
  - `Controller/` — controller logic
  - `Middleware/` — auth & error handling

- **DB/**: Lightweight data modules (`flighs.js`, `Locations.js`, `passenger.js`, `user.js`)

**Available Scripts**
- From `Client/`:
  - `npm run dev` — start Vite dev server
  - `npm run build` — build production bundle
  - `npm run preview` — preview production build

- From `Server/`:
  - `npm start` — start server (may call `node server.js` or use a start script)
  - If you prefer live reload, install `nodemon` and run `nodemon server.js`.

**Notes & Tips**
- If the server expects a database, either run MongoDB locally or update `MONGO_URI` to point to your cloud DB.
- If CORS or proxy issues occur while developing, check `Client/vite.config.js` or add a proxy to avoid cross-origin issues.
- There are sample HTML/email templates in `Server/Controller/ticket.html`.

**Testing**
- No automated tests are included by default. Add tests under a `tests/` directory and use a test runner like `jest` or `vitest` for UI tests.

**Contributing**
- Feel free to open issues or pull requests. Keep changes scoped and include short descriptions and how to reproduce.

**License**
- This project does not include an explicit license file. Add `LICENSE` if you want to make licensing explicit (e.g., MIT).

**Contact**
- Repository owner: `PrashantGoyal20` on GitHub.

---

If you want, I can add:
- A `.env.example` file in `Server/` with recommended keys.
- README badges (build / license / repo links).
- More detailed setup for production (PM2 / Docker / deployment notes).
