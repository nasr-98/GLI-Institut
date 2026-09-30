import React from "react";
import { Link as MuiLink, Typography } from "@mui/material";

import legalContent from "../../data/legalContent";

import { LegalPage, LegalSection, LegalDivider } from "./LegalStyles";

export default function Impressum({ lang = "de" }) {
  const content = legalContent[lang]?.impressum || legalContent.de.impressum;

  return (
    <LegalPage title={content.title} subtitle={content.subtitle}>
      {/* Company Information */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.company.title}
        </Typography>

        <Typography>{content.company.name}</Typography>

        <Typography>{content.company.address}</Typography>

        <Typography>{content.company.postalCode}</Typography>

        <Typography>{content.company.country}</Typography>
      </LegalSection>

      <LegalDivider />

      {/* Represented By */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.representedBy.title}
        </Typography>

        <Typography>{content.representedBy.description}</Typography>

        {content.representedBy.persons.map((person, index) => (
          <Typography key={index}>{person}</Typography>
        ))}
      </LegalSection>

      <LegalDivider />

      {/* Contact */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.contact.title}
        </Typography>

        <Typography>
          <strong>Email:</strong>{" "}
          <MuiLink href={`mailto:${content.contact.email}`}>
            {content.contact.email}
          </MuiLink>
        </Typography>

        <Typography>
          <strong>Website:</strong>{" "}
          <MuiLink
            href={`https://${content.contact.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.contact.website}
          </MuiLink>
        </Typography>
      </LegalSection>

      <LegalDivider />

      {/* Legal Form */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.legalForm.title}
        </Typography>

        <Typography>{content.legalForm.value}</Typography>
      </LegalSection>

      <LegalDivider />

      {/* Additional Information */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.additional.title}
        </Typography>

        <Typography>{content.additional.text}</Typography>
      </LegalSection>
    </LegalPage>
  );
}
