import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { ExpandMore } from "@mui/icons-material";

import content from "../data/content";
import quiz from "../data/quiz";

import PageShell from "../components/PageShell";

export default function GermanTest({ lang }) {
  const t = content[lang];
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const score = quiz.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0);
  return <PageShell title={t.testTitle} subtitle={t.testText}>
    {!started ? <Paper sx={{ p: 5, textAlign: "center" }}><Typography variant="h4" fontWeight={800} mb={2}>{t.start}</Typography><Button variant="contained" size="large" onClick={() => setStarted(true)}>{t.start}</Button></Paper> :
    <Stack spacing={2}>
      {quiz.map((q, i) => <Accordion key={i} defaultExpanded={i === 0}>
        <AccordionSummary expandIcon={<ExpandMore />}><Typography fontWeight={800}>{i + 1}. {q.q}</Typography></AccordionSummary>
        <AccordionDetails><Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          {q.options.map((o, j) => <Button key={o} variant={answers[i] === j ? "contained" : "outlined"} onClick={() => setAnswers({ ...answers, [i]: j })}>{o}</Button>)}
        </Stack></AccordionDetails>
      </Accordion>)}
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={800}>{t.result}</Typography>
        <Typography variant="h2" color="primary" sx={{ my: 1 }}>{score}/{quiz.length}</Typography>
        <Typography color="text.secondary">{t.score}</Typography>
        <Button onClick={() => { setAnswers({}); setStarted(false); }} sx={{ mt: 2 }}>{t.restart}</Button>
      </Paper>
    </Stack>}
  </PageShell>;
}