import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ErrorOutline, Home, ArrowBack } from "@mui/icons-material";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 4,
            textAlign: "center",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "action.hover",
              }}
            >
              <ErrorOutline
                sx={{
                  fontSize: 55,
                  color: "primary.main",
                }}
              />
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "4rem", sm: "6rem" },
                lineHeight: 1,
                color: "primary.main",
              }}
            >
              404
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
              }}
            >
              Page Not Found
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                maxWidth: 450,
                lineHeight: 1.7,
              }}
            >
              Sorry, the page you are looking for does not exist or the address
              you entered is incorrect.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                startIcon={<Home />}
                component={RouterLink}
                to="/"
                size="large"
              >
                Go Home
              </Button>

              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                size="large"
              >
                Go Back
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
