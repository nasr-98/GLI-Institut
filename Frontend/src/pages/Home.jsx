import React from "react";

import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { Language, ArrowForward, CheckCircle } from "@mui/icons-material";

import { Link } from "react-router-dom";

import GridSection from "../components/GridSection";
import GridCards from "../components/GridCards";
import Callout from "../components/Callout";

import content from "../data/content";
import courses from "../data/courses";

export default function Home({ lang }) {
  const t = content[lang];
  return (
    <>
      <Box className="hero">
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 760, py: { xs: 12, md: 18 } }}>
            <Chip
              icon={<Language />}
              label="German • English • العربية"
              sx={{
                mb: 3,
                bgcolor: "rgba(255,255,255,.12)",
                color: "white",
                backdropFilter: "blur(10px)",
              }}
            />
            <Typography
              variant="h1"
              sx={{
                color: "white",
                fontSize: { xs: "3rem", md: "5.2rem" },
                lineHeight: 0.98,
                mb: 3,
              }}
            >
              {t.heroTitle}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,.82)",
                fontSize: { xs: "1.05rem", md: "1.25rem" },
                maxWidth: 650,
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              {t.heroText}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                color="secondary"
                size="large"
                endIcon={
                  <ArrowForward
                    sx={{
                      color: "#000000",
                    }}
                  />
                }
              >
                {t.cta}
              </Button>
              <Button
                component={Link}
                to="/courses"
                variant="outlined"
                size="large"
                sx={{ color: "white", borderColor: "rgba(255,255,255,.45)" }}
              >
                {t.explore}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box id="about" sx={{ py: { xs: 8, md: 12 } }}>
          <GridSection>
            <Box>
              <Typography color="primary" fontWeight={800} sx={{ mb: 1 }}>
                GERMAN LANGUAGE INSTITUTE
              </Typography>
              <Typography variant="h2" sx={{ mb: 2 }}>
                {t.aboutTitle}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: "1.08rem", lineHeight: 1.8 }}
              >
                {t.aboutText}
              </Typography>
            </Box>
            <Stack spacing={2}>
              {t.benefits.map((x) => (
                <Paper
                  key={x}
                  sx={{
                    p: 2.2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <CheckCircle color="primary" />
                  <Typography fontWeight={700}>{x}</Typography>
                </Paper>
              ))}
            </Stack>
          </GridSection>
        </Box>

        <Box sx={{ pb: 12 }}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            {t.coursesTitle}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 760 }}>
            {t.coursesText}
          </Typography>
          <GridCards items={courses[lang].slice(0, 5)} t={t} />
        </Box>

        <Callout t={t} />
      </Container>
    </>
  );
}
