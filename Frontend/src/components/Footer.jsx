import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import content from "../data/content";

export default function Footer({ lang }) {
  const t = content[lang];
  return (
    <Box
      component="footer"
      sx={{ mt: 4, borderTop: "1px solid rgba(128,145,170,.16)" }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr 1fr" },
            gap: 5,
          }}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                component="img"
                src="/logo.png"
                sx={{ width: 48, height: 48 }}
              />
              <Typography fontWeight={800}>
                German Language Institute
              </Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 440 }}>
              {t.heroText}
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight={800} mb={1.5}>
              Explore
            </Typography>
            <Stack spacing={0.7}>
              <Button
                component={Link}
                to="/courses"
                sx={{ justifyContent: "flex-start", px: 0 }}
              >
                {t.nav.courses}
              </Button>
              <Button
                component={Link}
                to="/prices"
                sx={{ justifyContent: "flex-start", px: 0 }}
              >
                {t.nav.prices}
              </Button>
              <Button to="/test" sx={{ justifyContent: "flex-start", px: 0 }}>
                {t.nav.test}
              </Button>
              <Button
                component={Link}
                to="/contact"
                sx={{ justifyContent: "flex-start", px: 0 }}
              >
                {t.nav.contact}
              </Button>
            </Stack>
          </Box>
          <Box>
            <Typography fontWeight={800} mb={1.5}>
              Legal
            </Typography>
            <Stack spacing={0.7}>
              <Button
                component={Link}
                to="/impressum"
                sx={{ justifyContent: "flex-start", px: 0 }}
              >
                Impressum
              </Button>
              <Button
                component={Link}
                to="/datenschutz"
                sx={{ justifyContent: "flex-start", px: 0 }}
              >
                Datenschutz
              </Button>
              <Button
                component={Link}
                to="/agb"
                sx={{ justifyContent: "flex-start", px: 0 }}
              >
                AGB
              </Button>
            </Stack>
          </Box>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} German Language Institute. Alle Rechte
          vorbehalten.
        </Typography>
      </Container>
    </Box>
  );
}
