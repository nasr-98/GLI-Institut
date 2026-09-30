import { Paper, Typography, Divider, Stack, Chip } from "@mui/material";

export default function CourseTopics({ topics, lang }) {
  if (!topics?.length) {
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
          ? "المحاور التي ستدرسها"
          : lang === "de"
            ? "Kursthemen"
            : "Course topics"}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {topics.map((topic, index) => (
          <Chip key={index} label={topic} sx={{ mb: 1 }} />
        ))}
      </Stack>
    </Paper>
  );
}
