import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import session from "express-session";
import connectSqlite3 from "connect-sqlite3";
import dotenv from "dotenv";
import fs from "fs";

import { initDatabase } from "./database.js";

import sendEmailWithPhoto from "./routes/sendEmailWithPhoto.js";
import sendEmailContactForm from "./routes/sendEmails_ContactForm.js";
import registrationRouter from "./routes/sendEmailRegistration.js";
import restfull from "./routes/RESTfull.js";
import login from "./routes/login.js";
import testDeinDeutschRouter from "./routes/testDeinDeutsch.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SQLiteStore = connectSqlite3(session);

const PORT = process.env.PORT || 3000;

// --------------------------------------------------
// Persistent data directory
// --------------------------------------------------

const dataDir = "/home/u800937993/domains/api.gli-ms.de/data";

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log("Persistent data directory:", dataDir);

// --------------------------------------------------
// CORS
// --------------------------------------------------

const corsOptions = {
  origin: [process.env.FRONTEND_API],
  credentials: true,
};

app.use(cors(corsOptions));

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(express.json());

// --------------------------------------------------
// Session
// --------------------------------------------------

app.use(
  session({
    store: new SQLiteStore({
      db: "session.db",
      dir: dataDir,
      expired: {
        clear: true,
        intervalMs: 1000 * 60 * 15,
      },
    }),

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// --------------------------------------------------
// EJS
// --------------------------------------------------

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set("trust proxy", 1);

// --------------------------------------------------
// Routes
// --------------------------------------------------

app.use("/test-dein-deutsch", testDeinDeutschRouter);
app.use("/sendMessage", sendEmailContactForm);
app.use("/sendRegistration", registrationRouter);
app.use("/login", login);
app.use("/restfull", restfull);

// --------------------------------------------------
// Health Check
// --------------------------------------------------

// app.get("/health", (req, res) => {
//   res.status(200).json({
//     status: "ok",
//     message: "Backend is running",
//   });
// });

// --------------------------------------------------
// Start Server
// --------------------------------------------------

async function startServer() {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
