import { Grid, Paper, Stack, Typography } from "@mui/material";

export default function LanguageLevels({ t }) {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  return (
    <Stack spacing={3}>
      <BoxTitle title={t.levelsTitle} subtitle={t.levelsSubtitle} />

      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {levels.map((level, index) => (
          <Grid item xs={6} sm={4} md={2} key={level}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",

                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: "primary.main",
                  boxShadow: 3,
                },
              }}
            >
              <Typography variant="h5" fontWeight={800}>
                {level}
              </Typography>

              <Typography variant="body2" color="text.secondary" mt={1}>
                {t.levelLabels[index]}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

function BoxTitle({ title, subtitle }) {
  return (
    <Stack spacing={1}>
      <Typography variant="h4" fontWeight={800} textAlign="center">
        {title}
      </Typography>

      <Typography color="text.secondary" textAlign="center">
        {subtitle}
      </Typography>
    </Stack>
  );
}
