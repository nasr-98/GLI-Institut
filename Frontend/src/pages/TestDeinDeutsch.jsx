import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  Checkbox,
  LinearProgress,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowForward,
  CheckCircleOutline,
  EmojiEvents,
  PlayArrow,
  TimerOutlined,
} from "@mui/icons-material";

/*
 * ============================================================
 * CONFIGURATION
 * ============================================================
 */

const DEFAULT_DURATION_SECONDS = 20 * 60;

const START_ENDPOINT = "/test-dein-deutsch/start";
const ANSWER_ENDPOINT = "/test-dein-deutsch/answer";
const FINISH_ENDPOINT = "/test-dein-deutsch/finish";
const SUBMIT_ENDPOINT = "/test-dein-deutsch/submit";

/*
 * ============================================================
 * COMPONENT
 * ============================================================
 */

export default function TestDeinDeutsch() {
  const navigate = useNavigate();

  /*
   * ==========================================================
   * TEST FLOW
   *
   * intro
   *   ↓
   * test
   *   ↓
   * contact
   *   ↓
   * result
   * ==========================================================
   */

  const [stage, setStage] = useState("intro");

  /*
   * ==========================================================
   * TEST STATE
   * ==========================================================
   */

  const [attemptId, setAttemptId] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [selectedOptionId, setSelectedOptionId] = useState("");

  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const [remainingSeconds, setRemainingSeconds] = useState(
    DEFAULT_DURATION_SECONDS,
  );

  /*
   * Used to calculate response_time_seconds.
   */
  const [questionStartedAt, setQuestionStartedAt] = useState(null);

  /*
   * Backend may tell us the real duration.
   */
  const testDeadlineRef = useRef(null);

  /*
   * Prevent duplicate /finish requests when:
   * - the timer reaches zero
   * - user clicks finish
   * - multiple events happen close together
   */
  const finishingRef = useRef(false);

  /*
   * ==========================================================
   * UI STATE
   * ==========================================================
   */

  const [loading, setLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");

  /*
   * ==========================================================
   * CONTACT FORM
   * ==========================================================
   */

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    privacyPolicy: false,
    contactConsent: false,
  });

  const [contactErrors, setContactErrors] = useState({});

  /*
   * ==========================================================
   * RESULT
   * ==========================================================
   */

  const [result, setResult] = useState(null);

  /*
   * ==========================================================
   * HELPERS
   * ==========================================================
   */

  const formatTime = (totalSeconds) => {
    const safeSeconds = Math.max(0, totalSeconds);

    const minutes = Math.floor(safeSeconds / 60);

    const seconds = safeSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  };

  const validateEmail = (email) => {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  };

  /*
   * ==========================================================
   * TIMER
   * ==========================================================
   */

  useEffect(() => {
    if (stage !== "test") {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      if (!testDeadlineRef.current) {
        return;
      }

      const secondsLeft = Math.max(
        0,
        Math.ceil((testDeadlineRef.current - Date.now()) / 1000),
      );

      setRemainingSeconds(secondsLeft);

      if (secondsLeft <= 0) {
        window.clearInterval(intervalId);

        finishTest("timeout");
      }
    }, 500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [stage]);

  /*
   * ==========================================================
   * START TEST
   * ==========================================================
   */

  const handleStartTest = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.post(START_ENDPOINT);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to start the test.");
      }

      const {
        attemptId: newAttemptId,
        durationSeconds,
        question,
      } = response.data;

      if (!newAttemptId || !question) {
        throw new Error("The server did not return a valid test session.");
      }

      const duration =
        Number(durationSeconds) > 0
          ? Number(durationSeconds)
          : DEFAULT_DURATION_SECONDS;

      setAttemptId(newAttemptId);

      setCurrentQuestion(question);

      setSelectedOptionId("");

      setQuestionsAnswered(0);

      setRemainingSeconds(duration);

      setResult(null);

      setContactErrors({});

      setQuestionStartedAt(Date.now());

      testDeadlineRef.current = Date.now() + duration * 1000;

      setStage("test");
    } catch (err) {
      console.error("Failed to start German placement test:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Der Test konnte nicht gestartet werden.",
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ==========================================================
   * SELECT ANSWER
   * ==========================================================
   */

  const handleSelectOption = (optionId) => {
    /*
     * No validation is performed here.
     *
     * The answer is checked ONLY after pressing Weiter
     * by the backend.
     */

    setSelectedOptionId(optionId);

    setError("");
  };

  /*
   * ==========================================================
   * SEND ANSWER
   * ==========================================================
   */

  const handleNextQuestion = async () => {
    if (!attemptId) {
      setError("Die Testsitzung wurde nicht gefunden.");

      return;
    }

    if (!currentQuestion) {
      setError("Keine aktuelle Frage gefunden.");

      return;
    }

    if (!selectedOptionId) {
      setError("Bitte wähle zuerst eine Antwort aus.");

      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      /*
       * Calculate response time on the frontend.
       *
       * The backend stores it only for analysis.
       * According to the specification, it must not directly
       * influence the level calculation.
       */

      const responseTimeSeconds = questionStartedAt
        ? Math.max(0, Math.round((Date.now() - questionStartedAt) / 1000))
        : 0;

      /*
       * IMPORTANT:
       *
       * There is only ONE POST request here.
       *
       * The previous implementation accidentally submitted
       * the same answer twice.
       */

      const response = await api.post(ANSWER_ENDPOINT, {
        attemptId,
        questionId: currentQuestion.id,
        selectedOptionId,
        responseTimeSeconds,
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to save the answer.");
      }

      /*
       * Backend says the adaptive test is finished.
       */
      if (response.data.testFinished) {
        setQuestionsAnswered(
          Number(response.data.questionsAnswered || questionsAnswered + 1),
        );

        setCurrentQuestion(null);

        setSelectedOptionId("");

        setQuestionStartedAt(null);

        testDeadlineRef.current = null;

        setStage("contact");

        return;
      }

      /*
       * Backend gives us the next adaptive question.
       */
      const nextQuestion = response.data.nextQuestion;

      if (!nextQuestion) {
        throw new Error("The server did not provide the next question.");
      }

      const newQuestionsAnswered = Number(
        response.data.questionsAnswered || questionsAnswered + 1,
      );

      setQuestionsAnswered(newQuestionsAnswered);

      setCurrentQuestion(nextQuestion);

      setSelectedOptionId("");

      setQuestionStartedAt(Date.now());
    } catch (err) {
      console.error("Failed to submit test answer:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Die Antwort konnte nicht gespeichert werden.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * ==========================================================
   * FINISH TEST
   * ==========================================================
   */

  async function finishTest(reason = "manual") {
    if (!attemptId) {
      return;
    }

    /*
     * Prevent duplicate finish requests.
     */
    if (finishingRef.current) {
      return;
    }

    finishingRef.current = true;

    try {
      setLoading(true);
      setError("");

      testDeadlineRef.current = null;

      const response = await api.post(FINISH_ENDPOINT, {
        attemptId,
        reason,
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to finish the test.");
      }

      setCurrentQuestion(null);

      setSelectedOptionId("");

      setQuestionStartedAt(null);

      setRemainingSeconds(0);

      setStage("contact");
    } catch (err) {
      console.error("Failed to finish test:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Der Test konnte nicht beendet werden.",
      );
    } finally {
      setLoading(false);

      /*
       * Allow retry only if the request failed.
       */
      if (!error && stage !== "contact") {
        finishingRef.current = false;
      } else {
        finishingRef.current = false;
      }
    }
  }

  /*
   * ==========================================================
   * CONTACT FORM CHANGE
   * ==========================================================
   */

  const handleContactChange = (event) => {
    const { name, value, checked, type } = event.target;

    setContact((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setContactErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setError("");
  };

  /*
   * ==========================================================
   * CONTACT FORM VALIDATION
   * ==========================================================
   */

  const validateContactForm = () => {
    const errors = {};

    if (!contact.firstName.trim()) {
      errors.firstName = "Vorname ist erforderlich.";
    }

    if (!contact.lastName.trim()) {
      errors.lastName = "Nachname ist erforderlich.";
    }

    if (!contact.email.trim()) {
      errors.email = "E-Mail-Adresse ist erforderlich.";
    } else if (!validateEmail(contact.email.trim())) {
      errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    }

    /*
     * Phone is intentionally OPTIONAL.
     */
    if (contact.phone && contact.phone.length > 30) {
      errors.phone = "Die Telefonnummer ist zu lang.";
    }

    if (!contact.privacyPolicy) {
      errors.privacyPolicy = "Bitte bestätige die Datenschutzerklärung.";
    }

    setContactErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /*
   * ==========================================================
   * SUBMIT CONTACT + GET RESULT
   * ==========================================================
   */

  const handleSubmitContact = async (event) => {
    event.preventDefault();

    setError("");

    if (!validateContactForm()) {
      return;
    }

    if (!attemptId) {
      setError("Die Testsitzung wurde nicht gefunden.");

      return;
    }

    try {
      setIsSubmitting(true);

      /*
       * We intentionally do NOT send:
       *
       * - score
       * - level
       * - correct answers
       * - answers array
       *
       * The backend already has all answers in SQLite
       * and calculates the final result itself.
       */

      const response = await api.post(SUBMIT_ENDPOINT, {
        attemptId,

        contact: {
          firstName: contact.firstName.trim(),

          lastName: contact.lastName.trim(),

          email: contact.email.trim().toLowerCase(),

          phone: contact.phone.trim(),

          privacyPolicy: contact.privacyPolicy,

          contactConsent: contact.contactConsent,
        },
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to submit contact information.",
        );
      }

      if (!response.data?.result) {
        throw new Error("The server did not return a test result.");
      }

      setResult(response.data.result);

      setStage("result");
    } catch (err) {
      console.error("Failed to submit test result:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Dein Ergebnis konnte nicht geladen werden.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * ==========================================================
   * INTRO
   * ==========================================================
   */

  if (stage === "intro") {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 4, md: 7 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={4}>
            <Box>
              <Chip
                label="German Language Institut"
                color="primary"
                sx={{ mb: 2 }}
              />

              <Typography
                variant="h2"
                fontWeight={800}
                sx={{
                  fontSize: {
                    xs: "2.2rem",
                    md: "3.5rem",
                  },
                  lineHeight: 1.1,
                  mb: 2,
                }}
              >
                Teste dein Deutsch
              </Typography>

              <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                Wie gut ist dein Deutsch?
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  maxWidth: 760,
                  lineHeight: 1.8,
                }}
              >
                Finde in wenigen Minuten heraus, welches Deutschniveau ungefähr
                zu dir passt.
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 2,
              }}
            >
              {[
                "Grammatik",
                "Wortschatz",
                "Satzbau",
                "Leseverständnis",
                "Alltagssprache",
                "A1 bis C1",
              ].map((item) => (
                <Card
                  key={item}
                  elevation={0}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography fontWeight={700}>{item}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Box
              sx={{
                p: 2.5,
                borderRadius: 3,
                bgcolor: "action.hover",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Dauer: ca. 10–20 Minuten
                <br />
                Niveau: A1 bis C1
                <br />
                Kosten: kostenlos
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  mb: 2,
                }}
              >
                Du bekommst immer nur eine Aufgabe angezeigt. Wähle die Antwort
                aus, die deiner Meinung nach richtig ist.
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                Bitte benutze während des Tests keine Übersetzungsprogramme,
                Wörterbücher oder andere Hilfsmittel.
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={handleStartTest}
                disabled={loading}
                endIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <PlayArrow />
                  )
                }
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                }}
              >
                Test starten
              </Button>
            </Box>

            <Divider />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              Dieser Einstufungstest dient ausschließlich einer ersten
              Einschätzung deiner Sprachkenntnisse und ersetzt keine offizielle
              Sprachprüfung.
            </Typography>
          </Stack>
        </Paper>
      </Box>
    );
  }

  /*
   * ==========================================================
   * TEST
   * ==========================================================
   */

  if (stage === "test") {
    const progress = Math.min((questionsAnswered / 28) * 100, 100);

    const isTimeRunningOut = remainingSeconds <= 60;

    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 3, md: 5 },
        }}
      >
        <Stack spacing={2.5}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack spacing={2}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                justifyContent="space-between"
                alignItems={{
                  xs: "stretch",
                  sm: "center",
                }}
                spacing={2}
              >
                <Box>
                  <Typography variant="subtitle1" fontWeight={800}>
                    Dein Fortschritt
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Frage {questionsAnswered + 1}
                  </Typography>
                </Box>

                <Chip
                  icon={<TimerOutlined />}
                  label={formatTime(remainingSeconds)}
                  color={isTimeRunningOut ? "error" : "primary"}
                  variant="outlined"
                  sx={{
                    fontWeight: 700,
                    alignSelf: {
                      xs: "flex-start",
                      sm: "center",
                    },
                  }}
                />
              </Stack>

              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 999,
                }}
              />
            </Stack>
          </Paper>

          {error && <Alert severity="error">{error}</Alert>}

          {currentQuestion && (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 5 },
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack spacing={4}>
                {currentQuestion.context_text && (
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: "action.hover",
                    }}
                  >
                    <Typography
                      sx={{
                        whiteSpace: "pre-line",
                        lineHeight: 1.8,
                      }}
                    >
                      {currentQuestion.context_text}
                    </Typography>
                  </Box>
                )}

                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{
                    lineHeight: 1.5,
                  }}
                >
                  {currentQuestion.question}
                </Typography>

                <Stack spacing={1.5}>
                  {Array.isArray(currentQuestion.options) &&
                    currentQuestion.options.map((option) => {
                      const selected = selectedOptionId === option.id;

                      return (
                        <Button
                          key={option.id}
                          variant={selected ? "contained" : "outlined"}
                          color="primary"
                          onClick={() => handleSelectOption(option.id)}
                          disabled={isSubmitting}
                          startIcon={
                            <Radio
                              checked={selected}
                              color="inherit"
                              sx={{
                                pointerEvents: "none",
                              }}
                            />
                          }
                          sx={{
                            justifyContent: "flex-start",
                            textAlign: "left",
                            px: 2,
                            py: 1.8,
                            borderRadius: 2.5,
                            minHeight: 62,
                            fontSize: "1rem",
                            textTransform: "none",
                          }}
                        >
                          {option.text}
                        </Button>
                      );
                    })}
                </Stack>

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => finishTest("manual")}
                    disabled={isSubmitting || loading}
                    sx={{
                      borderRadius: 2,
                    }}
                  >
                    Test beenden
                  </Button>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleNextQuestion}
                    disabled={!selectedOptionId || isSubmitting}
                    endIcon={
                      isSubmitting ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <ArrowForward />
                      )
                    }
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.4,
                      fontWeight: 700,
                    }}
                  >
                    Weiter
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          )}

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Nach „Weiter“ kann die Antwort nicht mehr geändert werden.
          </Typography>
        </Stack>
      </Box>
    );
  }

  /*
   * ==========================================================
   * CONTACT FORM
   * ==========================================================
   */

  if (stage === "contact") {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 760,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 3, md: 6 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 5 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Chip label="Fast geschafft!" color="primary" sx={{ mb: 2 }} />

              <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                Dein Testergebnis ist fertig.
              </Typography>

              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Gib bitte deine Kontaktdaten ein, um dein Ergebnis anzuzeigen.
              </Typography>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={700} sx={{ mb: 0.7 }}>
                  Vorname *
                </Typography>

                <input
                  name="firstName"
                  value={contact.firstName}
                  onChange={handleContactChange}
                  placeholder="Vorname"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: "1px solid #c7cbd1",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                />

                {contactErrors.firstName && (
                  <Typography color="error" variant="caption">
                    {contactErrors.firstName}
                  </Typography>
                )}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={700} sx={{ mb: 0.7 }}>
                  Nachname *
                </Typography>

                <input
                  name="lastName"
                  value={contact.lastName}
                  onChange={handleContactChange}
                  placeholder="Nachname"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "10px",
                    border: "1px solid #c7cbd1",
                    fontSize: "16px",
                    boxSizing: "border-box",
                  }}
                />

                {contactErrors.lastName && (
                  <Typography color="error" variant="caption">
                    {contactErrors.lastName}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Box>
              <Typography variant="body2" fontWeight={700} sx={{ mb: 0.7 }}>
                E-Mail-Adresse *
              </Typography>

              <input
                name="email"
                type="email"
                value={contact.email}
                onChange={handleContactChange}
                placeholder="name@beispiel.de"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid #c7cbd1",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />

              {contactErrors.email && (
                <Typography color="error" variant="caption">
                  {contactErrors.email}
                </Typography>
              )}
            </Box>

            <Box>
              <Typography variant="body2" fontWeight={700} sx={{ mb: 0.7 }}>
                Telefonnummer
              </Typography>

              <input
                name="phone"
                value={contact.phone}
                onChange={handleContactChange}
                placeholder="+49 ..."
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid #c7cbd1",
                  fontSize: "16px",
                  boxSizing: "border-box",
                }}
              />

              <Typography variant="caption" color="text.secondary">
                Optional
              </Typography>

              {contactErrors.phone && (
                <Typography color="error" variant="caption" display="block">
                  {contactErrors.phone}
                </Typography>
              )}
            </Box>

            <Divider />

            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="privacyPolicy"
                    checked={contact.privacyPolicy}
                    onChange={handleContactChange}
                    disabled={isSubmitting}
                  />
                }
                label={
                  <Typography variant="body2">
                    Ich habe die Datenschutzerklärung gelesen.
                  </Typography>
                }
              />

              {contactErrors.privacyPolicy && (
                <Typography color="error" variant="caption">
                  {contactErrors.privacyPolicy}
                </Typography>
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    name="contactConsent"
                    checked={contact.contactConsent}
                    onChange={handleContactChange}
                    disabled={isSubmitting}
                  />
                }
                label={
                  <Typography variant="body2">
                    Ich möchte vom German Language Institut zu passenden
                    Deutschkursen und Beratungsmöglichkeiten kontaktiert werden.
                  </Typography>
                }
              />
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7 }}
            >
              Wir verwenden deine Angaben zur Durchführung und Auswertung des
              Einstufungstests sowie – sofern gewünscht – zur Kontaktaufnahme
              bezüglich unserer Deutschkurse.
            </Typography>

            <Button
              type="button"
              variant="contained"
              size="large"
              onClick={handleSubmitContact}
              disabled={isSubmitting}
              endIcon={
                isSubmitting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <CheckCircleOutline />
                )
              }
              sx={{
                borderRadius: 2,
                py: 1.5,
                fontWeight: 700,
              }}
            >
              Mein Ergebnis anzeigen
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  /*
   * ==========================================================
   * RESULT
   * ==========================================================
   */

  if (stage === "result") {
    const level = result?.level || result?.finalLevel || "A1";

    const score = result?.scorePercentage ?? result?.score ?? 0;

    const totalAnswered = result?.totalAnswered ?? 0;

    const totalCorrect = result?.totalCorrect ?? 0;

    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 820,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 3, md: 6 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <EmojiEvents />
            </Box>

            <Box>
              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={700}
              >
                Dein Testergebnis
              </Typography>

              <Typography
                variant="h2"
                fontWeight={800}
                sx={{
                  fontSize: {
                    xs: "3.5rem",
                    md: "5rem",
                  },
                  lineHeight: 1,
                  my: 1,
                }}
              >
                {level}
              </Typography>

              <Typography variant="h6" color="text.secondary">
                Dein aktuelles Deutschniveau ist ungefähr {level}.
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                p: 3,
                borderRadius: 3,
                bgcolor: "action.hover",
              }}
            >
              <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
                {score}%
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {totalCorrect} von {totalAnswered} beantworteten Fragen richtig
              </Typography>
            </Box>

            {result?.description && (
              <Typography
                sx={{
                  maxWidth: 680,
                  lineHeight: 1.9,
                  color: "text.secondary",
                }}
              >
                {result.description}
              </Typography>
            )}

            {result?.confidence && (
              <Chip
                label={"you will recieve an email with your result from us"}
                variant="outlined"
              />
            )}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              sx={{
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate(`/courses?result=${level}`)}
                sx={{
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Passenden Deutschkurs finden
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/contact")}
                sx={{
                  borderRadius: 2,
                  px: 3,
                }}
              >
                Jetzt Beratung anfragen
              </Button>
            </Stack>

            <Divider
              sx={{
                width: "100%",
                my: 1,
              }}
            />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: 650,
                lineHeight: 1.7,
              }}
            >
              Das Ergebnis ist eine unverbindliche Einschätzung und stellt
              keinen offiziellen Sprachnachweis dar.
            </Typography>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return null;
}
