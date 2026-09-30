import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { CheckCircle } from "@mui/icons-material";

export default function WhyUs({ t }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={800} textAlign="center">
        {t.whyUsTitle}
      </Typography>

      <Typography color="text.secondary" textAlign="center" mb={2}>
        {t.whyUsSubtitle}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <List>
          {t.whyUsItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                py: 2,
                alignItems: "flex-start",
              }}
            >
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>

              <ListItemText
                primary={<Typography fontWeight={700}>{item.title}</Typography>}
                secondary={
                  <Typography color="text.secondary" lineHeight={1.7} mt={0.5}>
                    {item.text}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Stack>
  );
}
