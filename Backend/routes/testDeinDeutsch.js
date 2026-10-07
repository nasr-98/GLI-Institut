import express from "express";
import { Resend } from "resend";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import testDb, { uuidv4 } from "../test_dein_deutsch.js";
import testQuestions from "../content/testQuestions.js";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_FROM =
  process.env.RESEND_FROM_EMAIL || "GLI Institut <mail@contact.gli-ms.de>";

const TEST_ADMIN_EMAIL = process.env.TEST_RESULT_ADMIN_EMAIL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const emailTemplatesPath = path.join(__dirname, "../views");

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

const MAX_QUESTIONS = 28;

const TEST_STATUS = [
  "started",
  "in_progress",
  "contact_form",
  "completed",
  "abandoned",
];

const RESULT_DESCRIPTIONS = {
  A1: "Dein aktuelles Deutschniveau ist ungefähr A1. Du verfügst bereits über erste Deutschkenntnisse. Du kannst einfache Wörter und Sätze verstehen und dich in sehr vertrauten Alltagssituationen verständigen.",
  A2: "Dein aktuelles Deutschniveau ist ungefähr A2. Du kannst häufig verwendete Sätze und Ausdrücke aus dem Alltag verstehen und dich in einfachen, vertrauten Situationen verständigen.",
  B1: "Dein aktuelles Deutschniveau ist ungefähr B1. Du kannst die Hauptpunkte klarer Standardsprache verstehen und dich in vielen Alltagssituationen selbstständig verständigen.",
  B2: "Dein aktuelles Deutschniveau ist ungefähr B2. Du kannst komplexere Texte verstehen und dich relativ flüssig und klar zu vielen Themen ausdrücken.",
  C1: "Dein aktuelles Deutschniveau ist ungefähr C1. Du verfügst über sehr gute Deutschkenntnisse. Du kannst anspruchsvolle Texte verstehen und dich auch zu komplexen Themen weitgehend flüssig, differenziert und präzise ausdrücken.",
};

/* ============================================================
 * Helpers
 * ============================================================ */

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function createAttemptId() {
  const shortUuid = uuidv4().replaceAll("-", "").slice(0, 6).toUpperCase();

  return `GLI-${new Date().getFullYear()}-${shortUuid}`;
}

function sanitizeQuestion(question) {
  /*
   * SECURITY:
   * Never send:
   * correct_option_id
   * explanation
   * difficulty
   * points
   * active
   * version
   */

  return {
    id: question.id,
    type: question.type,
    question: question.question,
    context_text: question.context_text || null,

    /*
     * Level is intentionally NOT returned.
     * The user should not know which CEFR level is being tested.
     */

    options: shuffle(
      question.options.map((option) => ({
        id: option.id,
        text: option.text,
      })),
    ),
  };
}

async function getAttempt(attemptId) {
  return testDb.get(
    `
      SELECT *
      FROM test_attempts
      WHERE attempt_id = ?
    `,
    [attemptId],
  );
}

async function getUsedQuestionIds(attemptId) {
  const rows = await testDb.all(
    `
      SELECT question_id
      FROM test_answers
      WHERE attempt_id = ?
    `,
    [attemptId],
  );

  return new Set(rows.map((row) => row.question_id));
}

async function getUnusedQuestion(attemptId, level) {
  const usedIds = await getUsedQuestionIds(attemptId);

  const available = testQuestions.filter(
    (question) =>
      question.active && question.level === level && !usedIds.has(question.id),
  );

  if (available.length === 0) {
    return null;
  }

  return available[Math.floor(Math.random() * available.length)];
}

async function getQuestionStats(attemptId, level) {
  const row = await testDb.get(
    `
      SELECT
        COUNT(*) AS answered,
        COALESCE(SUM(is_correct), 0) AS correct
      FROM test_answers
      WHERE attempt_id = ?
      AND question_level = ?
    `,
    [attemptId, level],
  );

  return {
    answered: Number(row?.answered || 0),
    correct: Number(row?.correct || 0),
  };
}

async function getLevelStatus(attemptId, level) {
  const stats = await getQuestionStats(attemptId, level);

  /*
   * Level Gate:
   *
   * < 5 answers:
   *   continue
   *
   * 5 answers:
   *   4-5 -> PASS
   *   0-2 -> FAIL
   *   3   -> 2 extra questions
   *
   * 7 answers:
   *   5-7 -> PASS
   *   0-4 -> FAIL
   */

  if (stats.answered < 5) {
    return {
      status: "CONTINUE",
      ...stats,
    };
  }

  if (stats.answered === 5) {
    if (stats.correct >= 4) {
      return {
        status: "PASS",
        ...stats,
      };
    }

    if (stats.correct <= 2) {
      return {
        status: "FAIL",
        ...stats,
      };
    }

    return {
      status: "EXTRA",
      ...stats,
    };
  }

  if (stats.answered >= 7) {
    return {
      status: stats.correct >= 5 ? "PASS" : "FAIL",
      ...stats,
    };
  }

  /*
   * This branch normally represents the two extra questions
   * being completed.
   */
  return {
    status: "EXTRA",
    ...stats,
  };
}

async function getAllLevelStatuses(attemptId) {
  const result = {};

  for (const level of LEVELS) {
    result[level] = await getLevelStatus(attemptId, level);
  }

  return result;
}

async function getCalibrationDecision(attemptId) {
  const a1 = await getQuestionStats(attemptId, "A1");
  const a2 = await getQuestionStats(attemptId, "A2");

  /*
   * Start calibration:
   * A1 = 3 questions
   * A2 = 3 questions
   */

  if (a1.answered < 3 || a2.answered < 3) {
    return null;
  }

  /*
   * Case 1:
   * A1 >= 2/3 and A2 >= 2/3
   * -> B1 path
   */

  if (a1.correct >= 2 && a2.correct >= 2) {
    return "B1";
  }

  /*
   * Case 2:
   * A1 >= 2/3 and A2 <= 1/3
   * -> continue A2
   */

  if (a1.correct >= 2 && a2.correct <= 1) {
    return "A2";
  }

  /*
   * Case 3:
   * A1 <= 1/3
   * -> continue A1 only
   */

  return "A1";
}

async function calculateFinalLevel(attemptId) {
  const statuses = await getAllLevelStatuses(attemptId);

  /*
   * Final security gate.
   *
   * C1 requires:
   * B1 PASS + B2 PASS + C1 PASS
   */

  if (
    statuses.C1.status === "PASS" &&
    statuses.B2.status === "PASS" &&
    statuses.B1.status === "PASS"
  ) {
    return "C1";
  }

  /*
   * B2 requires:
   * B1 PASS + B2 PASS
   */

  if (statuses.B2.status === "PASS" && statuses.B1.status === "PASS") {
    return "B2";
  }

  /*
   * B1 requires:
   * A2 PASS + B1 PASS
   */

  if (statuses.B1.status === "PASS" && statuses.A2.status === "PASS") {
    return "B1";
  }

  /*
   * A2 requires:
   * A2 PASS
   */

  if (statuses.A2.status === "PASS") {
    return "A2";
  }

  return "A1";
}

async function calculateConfidence(attemptId, finalLevel) {
  const attempt = await getAttempt(attemptId);

  const answered = Number(attempt?.questions_answered || 0);

  if (finalLevel === "A1") {
    /*
     * Very few answers or a weak result -> low confidence.
     */
    if (answered < 5) {
      return "low";
    }

    return "medium";
  }

  /*
   * A2+ means at least one meaningful Level Gate was passed.
   */
  if (answered >= 10) {
    return "high";
  }

  return "medium";
}

async function saveFinalResult(attemptId, status = "contact_form") {
  const finalLevel = await calculateFinalLevel(attemptId);
  const confidence = await calculateConfidence(attemptId, finalLevel);

  await testDb.run(
    `
      UPDATE test_attempts
      SET
        final_level = ?,
        confidence = ?,
        current_level = ?,
        completed_at = CURRENT_TIMESTAMP,
        status = ?
      WHERE attempt_id = ?
    `,
    [finalLevel, confidence, finalLevel, status, attemptId],
  );

  return {
    finalLevel,
    confidence,
  };
}

async function saveCurrentQuestion(attemptId, question) {
  await testDb.run(
    `
      UPDATE test_attempts
      SET
        current_question_id = ?,
        current_level = ?,
        status = 'in_progress'
      WHERE attempt_id = ?
    `,
    [question.id, question.level, attemptId],
  );
}

async function getCalibrationQuestion(attemptId) {
  const a1 = await getQuestionStats(attemptId, "A1");
  const a2 = await getQuestionStats(attemptId, "A2");

  const levelsAvailable = [];

  if (a1.answered < 3) {
    levelsAvailable.push("A1");
  }

  if (a2.answered < 3) {
    levelsAvailable.push("A2");
  }

  if (levelsAvailable.length === 0) {
    return null;
  }

  const randomLevel =
    levelsAvailable[Math.floor(Math.random() * levelsAvailable.length)];

  return getUnusedQuestion(attemptId, randomLevel);
}

/*
 * ==========================================================
 *
 * Function for sending email to student
 *
 *==========================================================
 */
async function sendTesterResultEmail({
  email,
  firstName,
  finalLevel,
  confidence,
  totalAnswered,
  totalCorrect,
  scorePercentage,
  description,
  attemptId,
}) {
  const templatePath = path.join(emailTemplatesPath, "testResultTester.ejs");

  const html = await ejs.renderFile(templatePath, {
    firstName,
    finalLevel,
    confidence,
    totalAnswered,
    totalCorrect,
    scorePercentage,
    description,
    attemptId,
  });

  const { data, error } = await resend.emails.send(
    {
      from: EMAIL_FROM,
      to: [email],
      subject: `Dein GLI-Deutschergebnis: ${finalLevel}`,
      html,
    },
    {
      idempotencyKey: `test-result-user-${attemptId}`,
    },
  );

  if (error) {
    throw new Error(error.message || "Failed to send tester result email.");
  }

  return data;
}

/*
 * ==========================================================
 *
 * Function for sending email to us
 *
 *==========================================================
 */
async function sendAdminTestResultEmail({
  attemptId,
  firstName,
  lastName,
  email,
  phone,
  privacyPolicy,
  contactConsent,
  finalLevel,
  confidence,
  totalAnswered,
  totalCorrect,
  scorePercentage,
  startedAt,
}) {
  if (!TEST_ADMIN_EMAIL) {
    throw new Error("TEST_RESULT_ADMIN_EMAIL is not configured.");
  }

  const levelStatuses = await getAllLevelStatuses(attemptId);

  const templatePath = path.join(emailTemplatesPath, "testResultAdmin.ejs");

  const html = await ejs.renderFile(templatePath, {
    attemptId,
    firstName,
    lastName,
    email,
    phone,
    privacyPolicy,
    contactConsent,
    finalLevel,
    confidence,
    totalAnswered,
    totalCorrect,
    scorePercentage,
    startedAt,
    maxQuestions: MAX_QUESTIONS,
    levels: LEVELS,
    levelStatuses,
    resultDescription: RESULT_DESCRIPTIONS[finalLevel],
  });

  const { data, error } = await resend.emails.send(
    {
      from: EMAIL_FROM,
      to: [TEST_ADMIN_EMAIL],
      subject: `Neuer Einstufungstest – ${firstName} ${lastName} – ${finalLevel}`,
      html,
    },
    {
      idempotencyKey: `test-result-admin-${attemptId}`,
    },
  );

  if (error) {
    throw new Error(error.message || "Failed to send admin test result email.");
  }

  return data;
}

/*
 * ==========================================================
 *
 *
 *
 *==========================================================
 */

async function getNextQuestion(attemptId) {
  const attempt = await getAttempt(attemptId);

  if (!attempt) {
    throw new Error("Attempt not found.");
  }

  if (Number(attempt.questions_answered) >= MAX_QUESTIONS) {
    return {
      finished: true,
    };
  }

  /*
   * ==========================================================
   * PHASE 1 - Calibration
   * ==========================================================
   */

  if (Number(attempt.questions_answered) < 6) {
    const question = await getCalibrationQuestion(attemptId);

    if (!question) {
      return {
        finished: true,
      };
    }

    await saveCurrentQuestion(attemptId, question);

    return {
      finished: false,
      question,
    };
  }

  /*
   * ==========================================================
   * PHASE 2 - Decide the adaptive path
   * ==========================================================
   */

  const calibrationDecision = await getCalibrationDecision(attemptId);

  /*
   * ----------------------------------------------------------
   * Weak A1 path
   * ----------------------------------------------------------
   */

  if (calibrationDecision === "A1") {
    const a1Status = await getLevelStatus(attemptId, "A1");

    if (a1Status.status === "FAIL" || a1Status.status === "PASS") {
      return {
        finished: true,
      };
    }

    const question = await getUnusedQuestion(attemptId, "A1");

    if (!question) {
      return {
        finished: true,
      };
    }

    await saveCurrentQuestion(attemptId, question);

    return {
      finished: false,
      question,
    };
  }

  /*
   * ----------------------------------------------------------
   * A2 path
   * ----------------------------------------------------------
   */

  if (calibrationDecision === "A2") {
    const a2Status = await getLevelStatus(attemptId, "A2");

    if (a2Status.status === "PASS" || a2Status.status === "FAIL") {
      return {
        finished: true,
      };
    }

    const question = await getUnusedQuestion(attemptId, "A2");

    if (!question) {
      return {
        finished: true,
      };
    }

    await saveCurrentQuestion(attemptId, question);

    return {
      finished: false,
      question,
    };
  }

  /*
   * ----------------------------------------------------------
   * Strong A2 -> B1 -> B2 -> C1 path
   * ----------------------------------------------------------
   */

  const a2Status = await getLevelStatus(attemptId, "A2");

  /*
   * A2 must be confirmed before B1.
   */

  if (a2Status.status === "FAIL") {
    return {
      finished: true,
    };
  }

  if (a2Status.status !== "PASS") {
    const question = await getUnusedQuestion(attemptId, "A2");

    if (!question) {
      return {
        finished: true,
      };
    }

    await saveCurrentQuestion(attemptId, question);

    return {
      finished: false,
      question,
    };
  }

  /*
   * ----------------------------------------------------------
   * B1
   * ----------------------------------------------------------
   */

  const b1Status = await getLevelStatus(attemptId, "B1");

  if (b1Status.status === "FAIL") {
    return {
      finished: true,
    };
  }

  if (b1Status.status !== "PASS") {
    const question = await getUnusedQuestion(attemptId, "B1");

    if (!question) {
      return {
        finished: true,
      };
    }

    await saveCurrentQuestion(attemptId, question);

    return {
      finished: false,
      question,
    };
  }

  /*
   * ----------------------------------------------------------
   * B2
   * ----------------------------------------------------------
   */

  const b2Status = await getLevelStatus(attemptId, "B2");

  if (b2Status.status === "FAIL") {
    return {
      finished: true,
    };
  }

  if (b2Status.status !== "PASS") {
    const question = await getUnusedQuestion(attemptId, "B2");

    if (!question) {
      return {
        finished: true,
      };
    }

    await saveCurrentQuestion(attemptId, question);

    return {
      finished: false,
      question,
    };
  }

  /*
   * ----------------------------------------------------------
   * C1
   * ----------------------------------------------------------
   */

  const c1Status = await getLevelStatus(attemptId, "C1");

  if (c1Status.status === "FAIL") {
    return {
      finished: true,
    };
  }

  if (c1Status.status !== "PASS") {
    const question = await getUnusedQuestion(attemptId, "C1");

    if (!question) {
      return {
        finished: true,
      };
    }

    await saveCurrentQuestion(attemptId, question);

    return {
      finished: false,
      question,
    };
  }

  /*
   * C1 passed -> test finished.
   */
  return {
    finished: true,
  };
}

/* ============================================================
 * POST /test-dein-deutsch/start
 * ============================================================ */

router.post("/start", async (req, res) => {
  try {
    const attemptId = createAttemptId();

    await testDb.run(
      `
        INSERT INTO test_attempts (
          attempt_id,
          started_at,
          status,
          questions_answered,
          current_level
        )
        VALUES (
          ?,
          CURRENT_TIMESTAMP,
          'started',
          0,
          'A1'
        )
      `,
      [attemptId],
    );

    const next = await getNextQuestion(attemptId);

    if (!next.question) {
      return res.status(500).json({
        success: false,
        message: "Could not initialize the test.",
      });
    }

    return res.status(201).json({
      success: true,
      attemptId,
      durationSeconds: 20 * 60,
      maxQuestions: MAX_QUESTIONS,
      status: "in_progress",
      question: sanitizeQuestion(next.question),
    });
  } catch (error) {
    console.error("Test start error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to start the German placement test.",
    });
  }
});

/* ============================================================
 * POST /test-dein-deutsch/answer
 * ============================================================ */

router.post("/answer", async (req, res) => {
  try {
    const { attemptId, questionId, selectedOptionId, responseTimeSeconds } =
      req.body;

    if (!attemptId || !questionId || !selectedOptionId) {
      return res.status(400).json({
        success: false,
        message: "attemptId, questionId and selectedOptionId are required.",
      });
    }

    const attempt = await getAttempt(attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Test attempt not found.",
      });
    }

    if (attempt.status === "completed" || attempt.status === "abandoned") {
      return res.status(409).json({
        success: false,
        message: "This test attempt is already closed.",
      });
    }

    if (Number(attempt.questions_answered) >= MAX_QUESTIONS) {
      return res.status(409).json({
        success: false,
        message: "Maximum number of questions reached.",
      });
    }

    /*
     * Prevent submitting an arbitrary question.
     * The question must be the question currently assigned
     * by the backend.
     */

    if (attempt.current_question_id !== questionId) {
      return res.status(409).json({
        success: false,
        message: "This question is not the current test question.",
      });
    }

    const question = testQuestions.find((item) => item.id === questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found.",
      });
    }

    const selectedOption = question.options.find(
      (option) => option.id === selectedOptionId,
    );

    if (!selectedOption) {
      return res.status(400).json({
        success: false,
        message: "Invalid answer option.",
      });
    }

    /*
     * Prevent answering the same question twice.
     */

    const existingAnswer = await testDb.get(
      `
        SELECT id
        FROM test_answers
        WHERE attempt_id = ?
        AND question_id = ?
      `,
      [attemptId, questionId],
    );

    if (existingAnswer) {
      return res.status(409).json({
        success: false,
        message: "This question has already been answered.",
      });
    }

    /*
     * IMPORTANT:
     * Correctness is calculated ONLY on the backend.
     */

    const isCorrect = selectedOption.id === question.correct_option_id;

    const safeResponseTime = Math.max(
      0,
      Math.min(3600, Number(responseTimeSeconds) || 0),
    );

    await testDb.run(
      `
        INSERT INTO test_answers (
          attempt_id,
          question_id,
          question_level,
          selected_option_id,
          is_correct,
          answered_at,
          response_time_seconds
        )
        VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          CURRENT_TIMESTAMP,
          ?
        )
      `,
      [
        attemptId,
        question.id,
        question.level,
        selectedOption.id,
        isCorrect ? 1 : 0,
        safeResponseTime,
      ],
    );

    const updatedAttempt = await getAttempt(attemptId);

    const newQuestionCount = Number(updatedAttempt.questions_answered || 0) + 1;

    await testDb.run(
      `
        UPDATE test_attempts
        SET
          questions_answered = ?,
          status = 'in_progress'
        WHERE attempt_id = ?
      `,
      [newQuestionCount, attemptId],
    );

    /*
     * Ask adaptive engine for the next question.
     */

    const next = await getNextQuestion(attemptId);

    if (next.finished) {
      await saveFinalResult(attemptId, "contact_form");

      return res.status(200).json({
        success: true,
        testFinished: true,
        status: "contact_form",
        questionsAnswered: newQuestionCount,

        /*
         * No correct/incorrect information is sent.
         * No final level is sent before contact submission.
         */
      });
    }

    return res.status(200).json({
      success: true,
      testFinished: false,
      status: "in_progress",
      questionsAnswered: newQuestionCount,
      nextQuestion: sanitizeQuestion(next.question),
    });
  } catch (error) {
    console.error("Test answer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save the answer.",
    });
  }
});

/* ============================================================
 * POST /test-dein-deutsch/finish
 *
 * Called when:
 * - user manually finishes
 * - timer reaches zero
 * ============================================================ */

router.post("/finish", async (req, res) => {
  try {
    const { attemptId, reason = "manual" } = req.body;

    if (!attemptId) {
      return res.status(400).json({
        success: false,
        message: "attemptId is required.",
      });
    }

    const attempt = await getAttempt(attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Test attempt not found.",
      });
    }

    if (attempt.status === "completed") {
      return res.status(409).json({
        success: false,
        message: "Test is already completed.",
      });
    }

    /*
     * Compute the safest currently confirmed level.
     * The level is stored internally, but NOT returned yet.
     */

    await saveFinalResult(attemptId, "contact_form");

    return res.status(200).json({
      success: true,
      status: "contact_form",
      reason,
      questionsAnswered: Number(attempt.questions_answered || 0),

      /*
       * Do NOT return:
       * finalLevel
       * confidence
       * score
       *
       * These are revealed only after contact submission.
       */
    });
  } catch (error) {
    console.error("Test finish error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to finish the test.",
    });
  }
});

/* ============================================================
 * POST /test-dein-deutsch/abandon
 * ============================================================ */

router.post("/abandon", async (req, res) => {
  try {
    const { attemptId } = req.body;

    if (!attemptId) {
      return res.status(400).json({
        success: false,
        message: "attemptId is required.",
      });
    }

    const attempt = await getAttempt(attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Test attempt not found.",
      });
    }

    await testDb.run(
      `
        UPDATE test_attempts
        SET
          status = 'abandoned',
          completed_at = CURRENT_TIMESTAMP
        WHERE attempt_id = ?
      `,
      [attemptId],
    );

    return res.status(200).json({
      success: true,
      status: "abandoned",
    });
  } catch (error) {
    console.error("Test abandon error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to abandon the test.",
    });
  }
});

/* ============================================================
 * POST /test-dein-deutsch/submit
 *
 * Saves contact data and finally reveals result.
 * ============================================================ */

router.post("/submit", async (req, res) => {
  try {
    const contact = req.body?.contact || req.body || {};

    const { attemptId } = req.body;

    const firstName = String(contact.firstName || "").trim();

    const lastName = String(contact.lastName || "").trim();

    const email = String(contact.email || "")
      .trim()
      .toLowerCase();

    const phone = String(contact.phone || "").trim();

    const privacyPolicy = contact.privacyPolicy === true;

    const contactConsent = contact.contactConsent === true;

    if (!attemptId) {
      return res.status(400).json({
        success: false,
        message: "attemptId is required.",
      });
    }

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: "First name, last name and email are required.",
      });
    }

    if (firstName.length > 80 || lastName.length > 80) {
      return res.status(400).json({
        success: false,
        message: "Name is too long.",
      });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    /*
     * Phone is intentionally OPTIONAL,
     * according to the user's requested frontend behavior.
     */

    if (phone.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Phone number is too long.",
      });
    }

    if (!privacyPolicy) {
      return res.status(400).json({
        success: false,
        message: "Privacy Policy agreement is required.",
      });
    }

    const attempt = await getAttempt(attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Test attempt not found.",
      });
    }

    if (attempt.status !== "contact_form" && attempt.status !== "completed") {
      return res.status(409).json({
        success: false,
        message:
          "Please finish the test before submitting your contact details.",
      });
    }

    /*
     * Calculate again on the backend.
     * We NEVER trust a level or score sent by React.
     */

    const finalLevel = await calculateFinalLevel(attemptId);

    const confidence = await calculateConfidence(attemptId, finalLevel);

    const stats = await testDb.get(
      `
        SELECT
          COUNT(*) AS total_answered,
          COALESCE(SUM(is_correct), 0) AS total_correct
        FROM test_answers
        WHERE attempt_id = ?
      `,
      [attemptId],
    );

    const totalAnswered = Number(stats?.total_answered || 0);

    const totalCorrect = Number(stats?.total_correct || 0);

    const scorePercentage =
      totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

    /*
     * Save contact.
     */

    await testDb.run(
      `
        INSERT INTO test_contacts (
          attempt_id,
          first_name,
          last_name,
          email,
          phone,
          privacy_policy,
          contact_consent
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(attempt_id)
        DO UPDATE SET
          first_name = excluded.first_name,
          last_name = excluded.last_name,
          email = excluded.email,
          phone = excluded.phone,
          privacy_policy = excluded.privacy_policy,
          contact_consent = excluded.contact_consent
      `,
      [
        attemptId,
        firstName,
        lastName,
        email,
        phone || null,
        privacyPolicy ? 1 : 0,
        contactConsent ? 1 : 0,
      ],
    );

    /*
     * Save result.
     */

    await testDb.run(
      `
        INSERT INTO test_results (
          attempt_id,
          final_level,
          confidence,
          total_answered,
          total_correct,
          score_percentage
        )
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(attempt_id)
        DO UPDATE SET
          final_level = excluded.final_level,
          confidence = excluded.confidence,
          total_answered = excluded.total_answered,
          total_correct = excluded.total_correct,
          score_percentage = excluded.score_percentage
      `,
      [
        attemptId,
        finalLevel,
        confidence,
        totalAnswered,
        totalCorrect,
        scorePercentage,
      ],
    );

    /*
     * Close attempt.
     */

    await testDb.run(
      `
        UPDATE test_attempts
        SET
          final_level = ?,
          confidence = ?,
          completed_at = CURRENT_TIMESTAMP,
          status = 'completed',
          current_question_id = NULL
        WHERE attempt_id = ?
      `,
      [finalLevel, confidence, attemptId],
    );

    // ============================================================
    // SEND RESULT EMAILS
    // ============================================================

    const emailPayload = {
      attemptId,
      firstName,
      lastName,
      email,
      phone,
      privacyPolicy,
      contactConsent,
      finalLevel,
      confidence,
      totalAnswered,
      totalCorrect,
      scorePercentage,
      startedAt: attempt.started_at,
    };

    const emailResults = await Promise.allSettled([
      sendTesterResultEmail({
        email,
        firstName,
        finalLevel,
        confidence,
        totalAnswered,
        totalCorrect,
        scorePercentage,
        description: RESULT_DESCRIPTIONS[finalLevel],
        attemptId,
      }),

      sendAdminTestResultEmail(emailPayload),
    ]);

    emailResults.forEach((emailResult, index) => {
      if (emailResult.status === "fulfilled") {
        console.log(
          index === 0
            ? `Tester result email sent successfully for ${attemptId}.`
            : `Admin test notification sent successfully for ${attemptId}.`,
        );
      } else {
        console.error(
          index === 0
            ? `Tester result email failed for ${attemptId}:`
            : `Admin test notification failed for ${attemptId}:`,
          emailResult.reason,
        );
      }
    });

    return res.status(200).json({
      success: true,
      message: "Test result calculated successfully.",
      result: {
        level: finalLevel,
        finalLevel,
        confidence,
        score: scorePercentage,
        scorePercentage,
        totalAnswered,
        totalCorrect,
        description: RESULT_DESCRIPTIONS[finalLevel],
      },
    });
  } catch (error) {
    console.error("Test submit error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save contact details and calculate the result.",
    });
  }
});

/* ============================================================
 * GET /test-dein-deutsch/result/:attemptId
 *
 * Result is available only after contact submission.
 * ============================================================ */

router.get("/result/:attemptId", async (req, res) => {
  try {
    const { attemptId } = req.params;

    const result = await testDb.get(
      `
        SELECT
          r.attempt_id,
          r.final_level,
          r.confidence,
          r.total_answered,
          r.total_correct,
          r.score_percentage,
          c.first_name,
          c.last_name,
          c.email
        FROM test_results r
        INNER JOIN test_contacts c
          ON c.attempt_id = r.attempt_id
        WHERE r.attempt_id = ?
      `,
      [attemptId],
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found or contact form has not been submitted.",
      });
    }

    return res.status(200).json({
      success: true,
      result: {
        attemptId: result.attempt_id,
        level: result.final_level,
        finalLevel: result.final_level,
        confidence: result.confidence,
        score: result.score_percentage,
        scorePercentage: result.score_percentage,
        totalAnswered: result.total_answered,
        totalCorrect: result.total_correct,
        description: RESULT_DESCRIPTIONS[result.final_level],
      },
    });
  } catch (error) {
    console.error("Get test result error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load test result.",
    });
  }
});

export default router;
