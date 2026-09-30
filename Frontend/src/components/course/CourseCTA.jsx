import { Paper, Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";

export default function CourseCTA({ lang }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {lang === "ar"
          ? "هل أنت مستعد للبدء؟"
          : lang === "de"
            ? "Bereit zu starten?"
            : "Ready to get started?"}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {lang === "ar"
          ? "سجل الآن وابدأ رحلتك في تعلم اللغة الألمانية."
          : lang === "de"
            ? "Melden Sie sich jetzt an und beginnen Sie Ihre Deutschlernreise."
            : "Register now and start your German learning journey."}
      </Typography>

      <Button component={Link} to="/register" variant="contained" size="large">
        {lang === "ar"
          ? "التسجيل في الكورس"
          : lang === "de"
            ? "Für den Kurs anmelden"
            : "Register for this course"}
      </Button>
    </Paper>
  );
}
