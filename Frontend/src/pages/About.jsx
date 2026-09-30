import { Stack } from "@mui/material";

import content from "../data/contentAbout";

import PageShell from "../components/PageShell";

import AboutHero from "../components/about/AboutHero";
import MissionSection from "../components/about/MissionSection";
import WhyUs from "../components/about/WhyUs";
import LearningApproach from "../components/about/LearningApproach";
import MethodSection from "../components/about/MethodSection";
import LanguageLevels from "../components/about/LanguageLevels";
import StatesSection from "../components/about/StatesSection";
import AboutCTA from "../components/about/AboutCTA";

export default function About({ lang }) {
  const t = content[lang];

  return (
    <PageShell title={t.aboutTitle} subtitle={t.aboutSubtitle}>
      <Stack spacing={7}>
        <AboutHero t={t} />

        <MissionSection t={t} />

        <WhyUs t={t} />

        <MethodSection t={t} />

        <LanguageLevels t={t} />

        {/* <StatesSection t={t} /> */}

        <AboutCTA t={t} />
      </Stack>
    </PageShell>
  );
}
