import { Paper, Typography, Divider } from "@mui/material";

export default function CourseDescription({ course, lang }) {
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
          ? "نبذة عن الكورس"
          : lang === "de"
            ? "Über den Kurs"
            : "About the course"}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Typography
        color="text.secondary"
        sx={{
          lineHeight: 1.9,
          fontSize: "1.05rem",
        }}
      >
        {course.description}
      </Typography>
    </Paper>
  );
}
