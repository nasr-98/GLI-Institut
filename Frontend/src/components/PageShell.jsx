import {
  Box,
  Container,
  Typography,
} from "@mui/material";

export default function PageShell({ title, subtitle, children }) {
  return <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 }, minHeight: "70vh" }}>
    <Box sx={{ maxWidth: 800, mb: 5 }}>
      <Typography variant="h1" sx={{ fontSize: { xs: "2.7rem", md: "4rem" }, mb: 2 }}>{title}</Typography>
      <Typography color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>{subtitle}</Typography>
    </Box>
    {children}
  </Container>;
}