import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";

import {
  Favorite,
  Groups,
  MenuBook,
  RecordVoiceOver,
} from "@mui/icons-material";

export default function MethodSection({ t }) {
  const methods = [
    {
      icon: <MenuBook />,
      title: t.methodItems.grammarTitle,
      text: t.methodItems.grammarText,
    },
    {
      icon: <RecordVoiceOver />,
      title: t.methodItems.speakingTitle,
      text: t.methodItems.speakingText,
    },
    {
      icon: <Groups />,
      title: t.methodItems.interactionTitle,
      text: t.methodItems.interactionText,
    },
    {
      icon: <Favorite />,
      title: t.methodItems.supportTitle,
      text: t.methodItems.supportText,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" fontWeight={800} mb={1}>
            {t.methodTitle}
          </Typography>

          <Typography color="text.secondary">{t.methodSubtitle}</Typography>
        </Box>

        <Grid container spacing={4}>
          {methods.map((method, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                  sx={{
                    bgcolor: "action.selected",
                    color: "primary.main",
                  }}
                >
                  {method.icon}
                </Avatar>

                <Box>
                  <Typography fontWeight={700} mb={0.5}>
                    {method.title}
                  </Typography>

                  <Typography color="text.secondary" lineHeight={1.7}>
                    {method.text}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Paper>
  );
}
