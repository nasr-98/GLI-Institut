import { Paper, Typography, Button } from "@mui/material";

import { ArrowForward } from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function Callout({ t }) {
  return (
    <Paper
      sx={{
        mb: 12,
        p: { xs: 4, md: 6 },
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(135deg, rgba(21,94,239,.12), rgba(255,212,0,.18))",
      }}
    >
      <Typography variant="h3" sx={{ mb: 1 }}>
        {t.cta}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {t.calloutText}
      </Typography>
      <Button
        component={Link}
        to="/register"
        variant="contained"
        endIcon={
          <ArrowForward
            sx={{
              color: "#ffff",
            }}
          />
        }
      >
        {t.cta}
      </Button>
    </Paper>
  );
}
