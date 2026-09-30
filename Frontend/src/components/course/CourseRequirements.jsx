import { Paper, Typography, Divider, Stack } from "@mui/material";

export default function CourseRequirements({ requirements, lang }) {
  if (!requirements?.length) {
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
          ? "المتطلبات"
          : lang === "de"
            ? "Voraussetzungen"
            : "Requirements"}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={1.5}>
        {requirements.map((item, index) => (
          <Typography key={index} color="text.secondary">
            • {item}
          </Typography>
        ))}
      </Stack>
    </Paper>
  );
}
