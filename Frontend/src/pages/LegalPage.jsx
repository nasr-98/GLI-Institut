import {
  Paper,
  Typography,
} from "@mui/material";

import content from "../data/content";
import PageShell from "../components/PageShell";


export default function LegalPage({ title, lang }) {
  const t = content[lang];
  return <PageShell title={title} subtitle={t.legalNote}>
    <Paper sx={{ p: { xs: 3, md: 5 } }}>
      <Typography variant="h5" fontWeight={800} mb={2}>{title}</Typography>
      <Typography color="text.secondary" sx={{ lineHeight: 1.9 }}>
        temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary {title} temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary temporary.
      </Typography>
    </Paper>
  </PageShell>;
}