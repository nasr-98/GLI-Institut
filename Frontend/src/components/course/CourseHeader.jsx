import { Paper, Stack, Avatar, Typography, Box, Chip } from "@mui/material";

import GrainTwoToneIcon from "@mui/icons-material/GrainTwoTone";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function CourseHeader({ course, lang }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 4,
      }}
    >
      <Stack
        direction={{ xs: "row", sm: "row" }}
        spacing={3}
        alignItems={{
          xs: "center",
          sm: "center",
        }}
      >
        <Avatar
          sx={{
            width: {
              xs: 45,
              sm: 55,
              md: 65,
              lg: 80,
            },
            height: {
              xs: 45,
              sm: 55,
              md: 65,
              lg: 80,
            },
            borderRadius: 3,
          }}
        >
          <GrainTwoToneIcon
            sx={{
              fontSize: {
                xs: 32,
                sm: 40,
                md: 50,
                lg: 60,
              },
            }}
          />
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={700}
            sx={{
              fontSize: {
                xs: "2rem",
                md: "2.8rem",
              },
            }}
          >
            {course.title}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ mt: 2 }}
          >
            <Chip
              icon={<SchoolOutlinedIcon />}
              label={course.level}
              variant="outlined"
            />

            {course.duration && (
              <Chip
                icon={<AccessTimeIcon />}
                label={course.duration}
                variant="outlined"
              />
            )}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
