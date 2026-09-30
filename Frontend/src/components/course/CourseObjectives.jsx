import { Paper, Typography, Divider, Stack } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function CourseObjectives({ objectives, lang }) {
  if (!objectives?.length) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {lang === "ar"
          ? "أهداف الكورس"
          : lang === "de"
            ? "Lernziele"
            : "Learning objectives"}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        {objectives.map((item, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1.5}
            alignItems="flex-start"
          >
            <CheckCircleOutlineIcon sx={{ mt: 0.2 }} />

            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
