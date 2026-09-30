import { Grid, Paper, Stack, Typography } from "@mui/material";

export default function StatsSection({ t }) {
  const stats = [
    {
      value: "000+",
      label: t.stats.years,
    },
    {
      value: "00000+",
      label: t.stats.students,
    },
    {
      value: "00000",
      label: t.stats.levels,
    },
    {
      value: "100%",
      label: t.stats.dedication,
    },
  ];

  return (
    <Stack>
      <Paper></Paper>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(21,94,239,.09), rgba(255,212,0,.12))",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={900}
          color="#9c27b0"
          sx={{
            textAlign: "center",
          }}
        >
          Temporary
        </Typography>

        <Grid
          container
          spacing={15}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {stats.map((stat) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <Stack spacing={0.5} alignItems="center" textAlign="center">
                <Typography variant="h3" fontWeight={900} color="primary.main">
                  {stat.value}
                </Typography>

                <Typography color="text.secondary" fontWeight={600}>
                  {stat.label}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Stack>
  );
}
