import { Paper, Box, Typography } from "@mui/material";

export default function InfoCard({ icon, label, value }) {
  return (
    <Paper sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ color: "primary.main" }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography fontWeight={700}>{value}</Typography>
      </Box>
    </Paper>
  );
}
