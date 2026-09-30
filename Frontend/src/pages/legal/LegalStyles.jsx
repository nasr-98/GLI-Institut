import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Stack,
} from "@mui/material";

export const LegalPage = ({ title, subtitle, children }) => (
  <Box sx={{ bgcolor: "#F7F9FC", minHeight: "100vh", py: { xs: 5, md: 9 } }}>
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          sx={{
            color: "#1E3A8A",
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          GLI INSTITUT
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#14213D",
            mt: 1,
            mb: 2,
            fontSize: { xs: "2rem", md: "2.8rem" },
          }}
        >
          {title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ fontSize: "1.05rem", lineHeight: 1.8 }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 4, md: 5 },
          border: "1px solid #E5EAF2",
          borderRadius: 3,
          bgcolor: "#fff",
        }}
      >
        <Stack spacing={3}>{children}</Stack>
      </Paper>
    </Container>
  </Box>
);

export const LegalSection = ({ title, children }) => (
  <Box>
    <Typography
      variant="h6"
      sx={{
        fontWeight: 750,
        color: "#1E3A8A",
        mb: 1.5,
      }}
    >
      {title}
    </Typography>
    <Box sx={{ color: "#475569", lineHeight: 1.9 }}>{children}</Box>
  </Box>
);

export const LegalDivider = () => <Divider sx={{ borderColor: "#E8EDF4" }} />;
