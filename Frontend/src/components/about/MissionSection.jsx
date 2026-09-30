import { Avatar, Grid, Box, Paper, Stack, Typography } from "@mui/material";

import {
  EmojiObjects,
  Groups,
  School,
  WorkspacePremium,
} from "@mui/icons-material";

function InfoCard({ icon, title, text, color = "secondary" }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        height: "100%",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 4,
        },
      }}
    >
      <Stack spacing={2}>
        <Avatar
          sx={{
            bgcolor: `${color}.main`,
          }}
        >
          {icon}
        </Avatar>

        <Typography variant="h5" fontWeight={800}>
          {title}
        </Typography>

        <Typography color="text.secondary" lineHeight={1.9}>
          {text}
        </Typography>
      </Stack>
    </Paper>
  );
}

export default function MissionSection({ t }) {
  return (
    <Stack spacing={4}>
      {/* Who we are */}
      <Box>
        <Typography variant="h4" fontWeight={800} textAlign="center" mb={2}>
          {t.whoWeAreTitle}
        </Typography>

        <Typography
          color="text.secondary"
          textAlign="center"
          maxWidth={750}
          mx="auto"
          lineHeight={1.8}
        >
          {t.whoWeAreText}
        </Typography>
      </Box>

      {/* Mission + Vision + Values */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <InfoCard
            icon={
              <EmojiObjects
                sx={{
                  color: "primary.main",
                }}
              />
            }
            title={t.missionTitle}
            text={t.missionText}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <InfoCard
            icon={
              <School
                sx={{
                  color: "primary.main",
                }}
              />
            }
            title={t.visionTitle}
            text={t.visionText}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

/*<Grid item xs={12} md={4}>
          <InfoCard
            icon={<WorkspacePremium />}
            title={t.valuesTitle}
            text={t.valuesText}
            color="secondary"
          /></Grid>*/
