import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { ArrowForward, Language, School } from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function AboutHero({ t }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 6 },
        borderRadius: 4,
        background:
          "linear-gradient(135deg, rgba(21,94,239,.08), rgba(255,212,0,.16))",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Grid container spacing={20} alignItems="center" justifyContent="center">
        {/* Text */}
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <Chip
              icon={<School />}
              label={t.aboutBadge}
              color="primary"
              variant="outlined"
              sx={{
                width: "fit-content",
              }}
            />

            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                fontSize: {
                  xs: "2rem",
                  md: "3rem",
                },
              }}
            >
              {t.aboutHeading}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              lineHeight={1.9}
              fontSize="1.05rem"
            >
              {t.aboutIntro}
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                size="large"
                endIcon={
                  <ArrowForward
                    sx={{
                      color: "#FFFFFF",
                    }}
                  />
                }
                sx={{
                  borderRadius: 3,
                  px: 3,
                }}
              >
                {t.aboutContactButton}
              </Button>

              <Button
                component={Link}
                to="/courses"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 3,
                  px: 3,
                }}
              >
                {t.aboutCoursesButton}
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

{
  /* Icon */
}
/*
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                width: {
                  xs: 180,
                  md: 250,
                },
                height: {
                  xs: 180,
                  md: 250,
                },
                bgcolor: "primary.main",
                boxShadow: 6,
              }}
            >
              <Language
                sx={{
                  fontSize: {
                    xs: 80,
                    md: 200,
                  },
                }}
              />
            </Avatar>
          </Box>
        </Grid>*/
