import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";

import { ArrowForward, Language } from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function AboutCTA({ t }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 4, md: 6 },
        textAlign: "center",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: "primary.main",
          }}
        >
          <Language
            sx={{
              fontSize: { xs: 50, sm: 50, md: 50 },
              color: "secondary.main",
            }}
          />
        </Avatar>

        <Typography variant="h4" fontWeight={800}>
          {t.aboutCtaTitle}
        </Typography>

        <Typography color="text.secondary" maxWidth={650} lineHeight={1.8}>
          {t.aboutCtaText}
        </Typography>

        <Button
          component={Link}
          to="/contact"
          variant="contained"
          size="large"
          endIcon={
            <ArrowForward
              sx={{
                color: "secondary.main",
              }}
            />
          }
          sx={{
            mt: 1,
            borderRadius: 3,
            px: 4,
            py: 1.3,
          }}
        >
          {t.aboutCtaButton}
        </Button>
      </Stack>
    </Paper>
  );
}
