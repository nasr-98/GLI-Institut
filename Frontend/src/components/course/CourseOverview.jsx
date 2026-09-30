import { Paper, Typography, Divider } from "@mui/material";

export default function CourseOverview({ course, lang }) {
  if (!course.overview) {
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
          ? "تفاصيل الكورس"
          : lang === "de"
            ? "Kursdetails"
            : "Course details"}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
        {course.overview}
      </Typography>
    </Paper>
  );
}
