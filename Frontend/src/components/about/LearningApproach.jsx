import {
  Box,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

export default function LearningApproach({ t }) {
  const skills = [
    {
      label: t.skills.speaking,
      value: 90,
    },
    {
      label: t.skills.listening,
      value: 85,
    },
    {
      label: t.skills.writing,
      value: 80,
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" fontWeight={800} mb={1}>
              {t.learningApproachTitle}
            </Typography>

            <Typography color="text.secondary" lineHeight={1.8}>
              {t.learningApproachText}
            </Typography>
          </Box>

          <Divider />

          <Stack spacing={3}>
            {skills.map((skill) => (
              <Box key={skill.label}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography fontWeight={600}>{skill.label}</Typography>

                  <Typography color="text.secondary">{skill.value}%</Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={skill.value}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
