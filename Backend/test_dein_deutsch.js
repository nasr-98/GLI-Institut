/*
 * ============================================================
 * GLI - Teste dein Deutsch
 * Dedicated SQLite database
 *
 * Database file:
 * data/test_dein_deutsch.db
 *
 * This file is completely independent from database.js
 * which handles registrations.db.
 *
 * IMPORTANT:
 * - Do NOT use top-level await here.
 * - This is intentionally compatible with the Hostinger/
 *   LiteSpeed Node environment that previously caused
 *   ESM top-level-await startup problems.
 * ============================================================
 */

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { v4 as uuidv4 } from "uuid";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import testQuestions from "./content/testQuestions.js";

/*
 * ============================================================
 * PATH CONFIGURATION
 * ============================================================
 */

const dataDirectory = "/home/u800937993/domains/api.gli-ms.de/data";

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const databasePath = path.join(dataDirectory, "test_dein_deutsch.db");

/*
 * ============================================================
 * DATABASE INITIALIZATION PROMISE
 *
 * We use a promise instead of top-level await.
 * This prevents the previous Hostinger ESM startup problem.
 * ============================================================
 */

let databasePromise = null;

/*
 * ============================================================
 * CREATE DATABASE + TABLES
 * ============================================================
 */

async function initializeDatabase() {
  /*
   * Create /data directory if it does not exist.
   */

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, {
      recursive: true,
    });
  }

  /*
   * Open dedicated SQLite database.
   */

  const database = await open({
    filename: databasePath,
    driver: sqlite3.Database,
  });

  /*
   * Foreign keys are important because:
   *
   * test_attempts
   *      ↓
   * test_answers
   *      ↓
   * test_contacts
   *      ↓
   * test_results
   */

  await database.run("PRAGMA foreign_keys = ON");

  /*
   * ==========================================================
   * QUESTION BANK
   * ==========================================================
   */

  await database.exec(`
    CREATE TABLE IF NOT EXISTS test_questions (
      id TEXT PRIMARY KEY,

      level TEXT NOT NULL
        CHECK (
          level IN (
            'A1',
            'A2',
            'B1',
            'B2',
            'C1'
          )
        ),

      category TEXT NOT NULL,

      type TEXT NOT NULL
        CHECK (
          type IN (
            'multiple_choice',
            'gap_choice'
          )
        ),

      question TEXT NOT NULL,

      context_text TEXT,

      /*
       * IMPORTANT:
       * Internal answer key.
       * NEVER send to React.
       */
      correct_option_id TEXT NOT NULL,

      /*
       * IMPORTANT:
       * Internal explanation.
       * NEVER send to React.
       */
      explanation TEXT,

      difficulty INTEGER NOT NULL
        CHECK (
          difficulty BETWEEN 1 AND 5
        ),

      points INTEGER NOT NULL DEFAULT 1
        CHECK (
          points >= 0
        ),

      active INTEGER NOT NULL DEFAULT 1
        CHECK (
          active IN (0, 1)
        ),

      version INTEGER NOT NULL DEFAULT 1,

      created_at TEXT NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

      updated_at TEXT NOT NULL
        DEFAULT CURRENT_TIMESTAMP
    );
  `);

  /*
   * ==========================================================
   * QUESTION OPTIONS
   * ==========================================================
   */

  await database.exec(`
    CREATE TABLE IF NOT EXISTS test_question_options (
      id TEXT PRIMARY KEY,

      question_id TEXT NOT NULL,

      option_text TEXT NOT NULL,

      sort_order INTEGER NOT NULL,

      created_at TEXT NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (
        question_id
      )
      REFERENCES test_questions(id)
      ON DELETE CASCADE
    );
  `);

  /*
   * ==========================================================
   * TEST ATTEMPTS
   * ==========================================================
   */

  await database.exec(`
    CREATE TABLE IF NOT EXISTS test_attempts (
      attempt_id TEXT PRIMARY KEY,

      started_at TEXT NOT NULL,

      completed_at TEXT,

      status TEXT NOT NULL DEFAULT 'started'
        CHECK (
          status IN (
            'started',
            'in_progress',
            'contact_form',
            'completed',
            'abandoned'
          )
        ),

      questions_answered INTEGER NOT NULL DEFAULT 0,

      current_level TEXT
        CHECK (
          current_level IS NULL OR
          current_level IN (
            'A1',
            'A2',
            'B1',
            'B2',
            'C1'
          )
        ),

      current_question_id TEXT,

      final_level TEXT
        CHECK (
          final_level IS NULL OR
          final_level IN (
            'A1',
            'A2',
            'B1',
            'B2',
            'C1'
          )
        ),

      confidence TEXT
        CHECK (
          confidence IS NULL OR
          confidence IN (
            'low',
            'medium',
            'high'
          )
        )
    );
  `);

  /*
   * ==========================================================
   * TEST ANSWERS
   * ==========================================================
   */

  await database.exec(`
    CREATE TABLE IF NOT EXISTS test_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      attempt_id TEXT NOT NULL,

      question_id TEXT NOT NULL,

      question_level TEXT NOT NULL
        CHECK (
          question_level IN (
            'A1',
            'A2',
            'B1',
            'B2',
            'C1'
          )
        ),

      selected_option_id TEXT NOT NULL,

      is_correct INTEGER NOT NULL DEFAULT 0
        CHECK (
          is_correct IN (0, 1)
        ),

      answered_at TEXT NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

      response_time_seconds REAL NOT NULL DEFAULT 0,

      UNIQUE (
        attempt_id,
        question_id
      ),

      FOREIGN KEY (
        attempt_id
      )
      REFERENCES test_attempts(attempt_id)
      ON DELETE CASCADE
    );
  `);

  /*
   * ==========================================================
   * CONTACT DATA
   * ==========================================================
   */

  await database.exec(`
    CREATE TABLE IF NOT EXISTS test_contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      attempt_id TEXT NOT NULL UNIQUE,

      first_name TEXT NOT NULL,

      last_name TEXT NOT NULL,

      email TEXT NOT NULL,

      phone TEXT,

      privacy_policy INTEGER NOT NULL DEFAULT 0
        CHECK (
          privacy_policy IN (0, 1)
        ),

      contact_consent INTEGER NOT NULL DEFAULT 0
        CHECK (
          contact_consent IN (0, 1)
        ),

      created_at TEXT NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (
        attempt_id
      )
      REFERENCES test_attempts(attempt_id)
      ON DELETE CASCADE
    );
  `);

  /*
   * ==========================================================
   * TEST RESULTS
   * ==========================================================
   */

  await database.exec(`
    CREATE TABLE IF NOT EXISTS test_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      attempt_id TEXT NOT NULL UNIQUE,

      final_level TEXT NOT NULL
        CHECK (
          final_level IN (
            'A1',
            'A2',
            'B1',
            'B2',
            'C1'
          )
        ),

      confidence TEXT NOT NULL
        CHECK (
          confidence IN (
            'low',
            'medium',
            'high'
          )
        ),

      total_answered INTEGER NOT NULL DEFAULT 0,

      total_correct INTEGER NOT NULL DEFAULT 0,

      score_percentage INTEGER NOT NULL DEFAULT 0,

      created_at TEXT NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (
        attempt_id
      )
      REFERENCES test_attempts(attempt_id)
      ON DELETE CASCADE
    );
  `);

  /*
   * ==========================================================
   * INDEXES
   * ==========================================================
   */

  await database.exec(`
    CREATE INDEX IF NOT EXISTS
    idx_test_questions_level
    ON test_questions(level);

    CREATE INDEX IF NOT EXISTS
    idx_test_questions_active
    ON test_questions(active);

    CREATE INDEX IF NOT EXISTS
    idx_test_questions_level_active
    ON test_questions(level, active);

    CREATE INDEX IF NOT EXISTS
    idx_test_question_options_question
    ON test_question_options(question_id);

    CREATE UNIQUE INDEX IF NOT EXISTS
    idx_test_question_options_position
    ON test_question_options(
      question_id,
      sort_order
    );

    CREATE INDEX IF NOT EXISTS
    idx_test_answers_attempt
    ON test_answers(attempt_id);

    CREATE INDEX IF NOT EXISTS
    idx_test_answers_level
    ON test_answers(
      attempt_id,
      question_level
    );

    CREATE INDEX IF NOT EXISTS
    idx_test_attempts_status
    ON test_attempts(status);

    CREATE INDEX IF NOT EXISTS
    idx_test_contacts_email
    ON test_contacts(email);

    CREATE INDEX IF NOT EXISTS
    idx_test_results_level
    ON test_results(final_level);
  `);

  /*
   * ==========================================================
   * SEED QUESTION BANK
   *
   * The current source is:
   * data/testQuestions.js
   *
   * The PDF contains 35 questions:
   * A1 = 7
   * A2 = 7
   * B1 = 7
   * B2 = 7
   * C1 = 7
   *
   * We synchronize the SQLite question bank from that
   * backend-only source.
   * ==========================================================
   */

  await database.exec("BEGIN TRANSACTION");

  try {
    for (const question of testQuestions) {
      /*
       * Insert/update question.
       */

      await database.run(
        `
          INSERT INTO test_questions (
            id,
            level,
            category,
            type,
            question,
            context_text,
            correct_option_id,
            explanation,
            difficulty,
            points,
            active,
            version,
            updated_at
          )
          VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            CURRENT_TIMESTAMP
          )
          ON CONFLICT(id)
          DO UPDATE SET
            level = excluded.level,
            category = excluded.category,
            type = excluded.type,
            question = excluded.question,
            context_text = excluded.context_text,
            correct_option_id = excluded.correct_option_id,
            explanation = excluded.explanation,
            difficulty = excluded.difficulty,
            points = excluded.points,
            active = excluded.active,
            version = excluded.version,
            updated_at = CURRENT_TIMESTAMP
        `,
        [
          question.id,
          question.level,
          question.category,
          question.type,
          question.question,
          question.context_text || null,
          question.correct_option_id,
          question.explanation || null,
          Number(question.difficulty) || 1,
          Number(question.points) || 1,
          question.active === false ? 0 : 1,
          Number(question.version) || 1,
        ],
      );

      /*
       * Synchronize options.
       *
       * We remove the existing option rows first,
       * then insert the current four options.
       */

      await database.run(
        `
          DELETE FROM test_question_options
          WHERE question_id = ?
        `,
        [question.id],
      );

      for (let index = 0; index < question.options.length; index += 1) {
        const option = question.options[index];

        await database.run(
          `
            INSERT INTO test_question_options (
              id,
              question_id,
              option_text,
              sort_order
            )
            VALUES (?, ?, ?, ?)
          `,
          [option.id, question.id, option.text, index + 1],
        );
      }
    }

    await database.exec("COMMIT");

    console.log(`Test database initialized successfully: ${databasePath}`);

    console.log(
      `Test question pool synchronized: ${testQuestions.length} questions.`,
    );
  } catch (error) {
    await database.exec("ROLLBACK");

    throw error;
  }

  return database;
}

/*
 * ============================================================
 * GET DATABASE
 *
 * Every request to testDb waits for initialization.
 * ============================================================
 */

export async function getTestDatabase() {
  if (!databasePromise) {
    databasePromise = initializeDatabase().catch((error) => {
      /*
       * Reset the promise so a later request can retry.
       */
      databasePromise = null;

      console.error("Failed to initialize test database:", error);

      throw error;
    });
  }

  return databasePromise;
}

/*
 * ============================================================
 * DEFAULT DATABASE API
 *
 * This keeps the route code simple:
 *
 * await testDb.get(...)
 * await testDb.all(...)
 * await testDb.run(...)
 * await testDb.exec(...)
 *
 * There is NO top-level await.
 * ============================================================
 */

const testDb = {
  get: async (...args) => {
    const database = await getTestDatabase();

    return database.get(...args);
  },

  all: async (...args) => {
    const database = await getTestDatabase();

    return database.all(...args);
  },

  run: async (...args) => {
    const database = await getTestDatabase();

    return database.run(...args);
  },

  exec: async (...args) => {
    const database = await getTestDatabase();

    return database.exec(...args);
  },

  close: async () => {
    if (!databasePromise) {
      return;
    }

    const database = await databasePromise;

    await database.close();

    databasePromise = null;
  },
};

/*
 * Export uuidv4 so existing route code can use:
 *
 * import testDb, { uuidv4 } from "../test_dein_deutsch.js";
 */

export { uuidv4 };

export default testDb;
