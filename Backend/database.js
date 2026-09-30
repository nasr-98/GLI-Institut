import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database directory
const dataDir = path.join(__dirname, "data");

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Database file
const dbPath = path.join(dataDir, "registrations.db");

console.log("Initializing database...");
console.log("Database directory:", dataDir);
console.log("Database path:", dbPath);

let db;

export async function initDatabase() {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS registrations (
        id TEXT PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        gender TEXT NOT NULL,
        course_level TEXT NOT NULL,
        course_type TEXT NOT NULL,
        preferred_start_date TEXT NOT NULL,
        addInfo TEXT,
        status TEXT NOT NULL DEFAULT 'bewerber',
        privacy_policy INTEGER NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Database initialized successfully.");

    return db;
  } catch (error) {
    console.error("Database initialization failed:");
    console.error(error);

    throw error;
  }
}

export function getDb() {
  if (!db) {
    throw new Error("Database has not been initialized.");
  }

  return db;
}

export { uuidv4 };
