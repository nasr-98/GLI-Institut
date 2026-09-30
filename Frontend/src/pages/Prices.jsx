import { Box, Card, CardContent, Typography } from "@mui/material";

import content from "../data/content";
import PageShell from "../components/PageShell";

export default function Prices({ lang }) {
  const t = content[lang];
  const rows = [
    ["A1 Course", "Starts on 01.09.2026", "400 €"],
    ["A2 Course", "Starts on 01.11.2026", "400 €"],
    ["B1 Course", "Available", "600 €"],
  ];
  return (
    <PageShell title={t.pricesTitle} subtitle={t.pricesText}>
      <Card>
        <CardContent sx={{ p: 0 }}>
          {rows.map(([a, b, c], i) => (
            <Box
              key={a}
              sx={{
                p: 3,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1.5fr" },
                gap: 2,
                borderBottom:
                  i < rows.length - 1 ? "1px solid rgba(128,145,170,.16)" : 0,
              }}
            >
              <Typography fontWeight={800}>{a}</Typography>
              <Typography color="primary" fontWeight={700}>
                {b}
              </Typography>
              <Typography color="text.secondary">{c}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
