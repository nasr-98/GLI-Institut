import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { School, ArrowForward } from "@mui/icons-material";

import { Link } from "react-router-dom";

import courses from "../data/courses";

export default function GridCards({ items, t, lang }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        },
        gap: 3,
      }}
    >
      {items.map((c) => (
        <Card key={c.title} sx={{ height: "100%" }}>
          <CardContent sx={{ p: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Chip label={c.level} color="primary" />
              <School color="primary" />
            </Stack>
            <Typography variant="h5" fontWeight={800} sx={{ mb: 1.5 }}>
              {c.title}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
              {c.description}
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {c.duration}
            </Typography>
            <Button
              component={Link}
              to={`/course/${c.id}`}
              sx={{ mt: 2, px: 0 }}
              endIcon={<ArrowForward />}
            >
              {t.learnMore}
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
