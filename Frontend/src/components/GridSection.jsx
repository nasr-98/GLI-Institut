import { Box } from "@mui/material";

export default function GridSection({ children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.05fr .95fr" },
        gap: 7,
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
}
