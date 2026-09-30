import { Paper, Typography, Divider, Stack } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function CourseSkills({ skills, lang }) {
  if (!skills?.length) {
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
          ? "المهارات المكتسبة"
          : lang === "de"
            ? "Erworbene Fähigkeiten"
            : "Skills you will gain"}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        {skills.map((skill, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1.5}
            alignItems="flex-start"
          >
            <CheckCircleOutlineIcon sx={{ mt: 0.2 }} />

            <Typography color="text.secondary">{skill}</Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
