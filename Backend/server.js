import express from "express";
import { Resend } from "resend";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import session from "express-session";
import connectSqlite3 from "connect-sqlite3";

import sendEmailWithPhoto from "./routes/sendEmailWithPhoto.js";
import sendEmailContactForm from "./routes/sendEmails_ContactForm.js";
import registrationRouter from "./routes/sendEmailRegistration.js";
import restfull from "./routes/RESTfull.js";
import login from "./routes/login.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SQLiteStore = connectSqlite3(session);

const corsOptions = {
  origin: [process.env.FRONTEND_API],
  credentials: true,
};

const resend = new Resend(process.env.RESEND_API_KEY);

const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, "data");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set("trust proxy", 1);

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    store: new SQLiteStore({
      db: "session.db",
      dir: dataDir, // "/var/www/data"
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

app.use("/photo", sendEmailWithPhoto);
app.use("/sendMessage", sendEmailContactForm);
app.use("/sendRegistration", registrationRouter);
app.use("/login", login);
app.use("/restfull", restfull);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
