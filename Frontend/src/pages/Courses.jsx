import content from "../data/content";
import courses from "../data/courses";

import PageShell from "../components/PageShell";
import GridCards from "../components/GridCards";

export default function Courses({ lang }) {
  const t = content[lang];
  return (
    <PageShell title={t.coursesTitle} subtitle={t.coursesText}>
      <GridCards items={courses[lang]} t={t} />
    </PageShell>
  );
}
