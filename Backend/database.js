import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { v4 as uuidv4 } from "uuid";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "./data/registrations.db");

const db = await open({
  filename: dbPath,
  driver: sqlite3.Database,
});

// Create registrations table if it does not exist
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

export { uuidv4 };
export default db;
