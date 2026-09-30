import { Box, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import courses from "../data/courses";

import CourseHeader from "../components/course/CourseHeader";
import CourseDescription from "../components/course/CourseDescription";
import CourseOverview from "../components/course/CourseOverview";
import CourseObjectives from "../components/course/CourseObjectives";
import CourseTopics from "../components/course/CourseTopics";
import CourseSkills from "../components/course/CourseSkills";
import CourseRequirements from "../components/course/CourseRequirements";
import CourseCTA from "../components/course/CourseCTA";

export default function Course({ lang }) {
  const { id } = useParams();

  const languageCourses = courses[lang] || courses.en;

  const course = languageCourses.find((item) => item.id === id);

  if (!course) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: "center",
            maxWidth: 600,
            width: "100%",
          }}
        >
          <Typography variant="h4">
            {lang === "ar"
              ? "الكورس غير موجود"
              : lang === "de"
                ? "Kurs nicht gefunden"
                : "Course not found"}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 4, md: 7 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          px: { xs: 2, md: 3 },
        }}
      >
        <Stack spacing={3}>
          <CourseHeader course={course} lang={lang} />

          <CourseDescription course={course} lang={lang} />

          <CourseOverview course={course} lang={lang} />

          <CourseObjectives objectives={course.objectives} lang={lang} />

          <CourseTopics topics={course.topics} lang={lang} />

          <CourseSkills skills={course.skills} lang={lang} />

          <CourseRequirements requirements={course.requirements} lang={lang} />

          <CourseCTA lang={lang} />
        </Stack>
      </Box>
    </Box>
  );
}
