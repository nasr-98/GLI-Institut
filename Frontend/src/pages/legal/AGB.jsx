import React from "react";

import { Typography } from "@mui/material";

import legalContent from "../../data/legalContent";

import { LegalPage, LegalSection, LegalDivider } from "./LegalStyles";

export default function AGB({ lang = "de" }) {
  const content = legalContent[lang]?.agb || legalContent.de.agb;

  return (
    <LegalPage title={content.title} subtitle={content.subtitle}>
      {content.sections?.map((section, index) => (
        <React.Fragment key={index}>
          <LegalSection>
            <Typography variant="h5" gutterBottom>
              {section.title}
            </Typography>

            {section.paragraphs?.map((paragraph, paragraphIndex) => (
              <Typography key={paragraphIndex} paragraph>
                {paragraph}
              </Typography>
            ))}

            {section.subsections?.map((subsection, subsectionIndex) => (
              <React.Fragment key={subsectionIndex}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  {subsection.title}
                </Typography>

                {subsection.paragraphs?.map((paragraph, paragraphIndex) => (
                  <Typography key={paragraphIndex} paragraph>
                    {paragraph}
                  </Typography>
                ))}
              </React.Fragment>
            ))}
          </LegalSection>

          {index < content.sections.length - 1 && <LegalDivider />}
        </React.Fragment>
      ))}
    </LegalPage>
  );
}
