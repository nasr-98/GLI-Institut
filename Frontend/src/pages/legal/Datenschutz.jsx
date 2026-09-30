import React from "react";

import { Link as MuiLink, Typography, List, ListItem } from "@mui/material";

import legalContent from "../../data/legalContent";

import { LegalPage, LegalSection, LegalDivider } from "./LegalStyles";

export default function Datenschutz({ lang = "de" }) {
  const content =
    legalContent[lang]?.datenschutz || legalContent.de.datenschutz;

  return (
    <LegalPage title={content.title} subtitle={content.subtitle}>
      {/* 1. Data Controller */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.responsible.title}
        </Typography>

        <Typography>{content.responsible.name}</Typography>
        <Typography>{content.responsible.address}</Typography>
        <Typography>{content.responsible.postalCode}</Typography>
        <Typography>{content.responsible.country}</Typography>

        <Typography sx={{ mt: 1 }}>
          {content.responsible.representedBy}
        </Typography>

        {content.responsible.persons.map((person, index) => (
          <Typography key={index}>{person}</Typography>
        ))}

        <Typography sx={{ mt: 1 }}>
          <strong>E-Mail:</strong>{" "}
          <MuiLink href={`mailto:${content.responsible.email}`}>
            {content.responsible.email}
          </MuiLink>
        </Typography>

        <Typography>
          <strong>Website:</strong>{" "}
          <MuiLink
            href={`https://${content.responsible.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.responsible.website}
          </MuiLink>
        </Typography>
      </LegalSection>

      <LegalDivider />

      {/* 2. Data Protection Officer */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.dataProtectionOfficer.title}
        </Typography>

        <Typography>{content.dataProtectionOfficer.text}</Typography>
      </LegalSection>

      <LegalDivider />

      {/* 3. General Information */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.generalInformation.title}
        </Typography>

        {content.generalInformation.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}
      </LegalSection>

      <LegalDivider />

      {/* 4. Hosting */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.hosting.title}
        </Typography>

        {content.hosting.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}

        <List>
          {content.hosting.data.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "list-item",
              }}
            >
              {item}
            </ListItem>
          ))}
        </List>

        <Typography>{content.hosting.additional}</Typography>
      </LegalSection>

      <LegalDivider />

      {/* 5. Contact */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.contact.title}
        </Typography>

        {content.contact.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}

        <List>
          {content.contact.data.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "list-item",
              }}
            >
              {item}
            </ListItem>
          ))}
        </List>

        <Typography>{content.contact.additional}</Typography>
      </LegalSection>

      <LegalDivider />

      {/* 6. Course Registration */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.registration.title}
        </Typography>

        {content.registration.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}

        <List>
          {content.registration.data.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "list-item",
              }}
            >
              {item}
            </ListItem>
          ))}
        </List>

        <Typography>{content.registration.additional}</Typography>
      </LegalSection>

      <LegalDivider />

      {/* 7. Resend */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.resend.title}
        </Typography>

        {content.resend.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}

        <Typography>{content.resend.additional}</Typography>
      </LegalSection>

      <LegalDivider />

      {/* 8. Google Fonts */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.googleFonts.title}
        </Typography>

        {content.googleFonts.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}

        <MuiLink
          href={content.googleFonts.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.googleFonts.linkText}
        </MuiLink>
      </LegalSection>

      <LegalDivider />

      {/* 9. Google Maps */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.googleMaps.title}
        </Typography>

        {content.googleMaps.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}

        <MuiLink
          href={content.googleMaps.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.googleMaps.linkText}
        </MuiLink>
      </LegalSection>

      <LegalDivider />

      {/* 10. YouTube */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.youtube.title}
        </Typography>

        {content.youtube.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}

        <MuiLink
          href={content.youtube.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.youtube.linkText}
        </MuiLink>
      </LegalSection>

      <LegalDivider />

      {/* 11. Cookies */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.cookies.title}
        </Typography>

        {content.cookies.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}
      </LegalSection>

      <LegalDivider />

      {/* 12. Third Parties */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.thirdParties.title}
        </Typography>

        {content.thirdParties.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}
      </LegalSection>

      <LegalDivider />

      {/* 13. Data Retention */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.storage.title}
        </Typography>

        {content.storage.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}
      </LegalSection>

      <LegalDivider />

      {/* 14. Rights */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.rights.title}
        </Typography>

        <Typography paragraph>{content.rights.introduction}</Typography>

        <List>
          {content.rights.items.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "list-item",
                mb: 1,
              }}
            >
              <strong>{item.title}</strong> {item.text}
            </ListItem>
          ))}
        </List>
      </LegalSection>

      <LegalDivider />

      {/* 15. Supervisory Authority */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.supervisoryAuthority.title}
        </Typography>

        {content.supervisoryAuthority.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}
      </LegalSection>

      <LegalDivider />

      {/* 16. Privacy Contact */}
      <LegalSection>
        <Typography variant="h5" gutterBottom>
          {content.privacyContact.title}
        </Typography>

        {content.privacyContact.paragraphs.map((paragraph, index) => (
          <Typography key={index} paragraph>
            {paragraph}
          </Typography>
        ))}

        <Typography>{content.privacyContact.name}</Typography>

        <Typography>{content.privacyContact.address}</Typography>

        <Typography>{content.privacyContact.postalCode}</Typography>

        <Typography>{content.privacyContact.country}</Typography>

        <Typography sx={{ mt: 1 }}>
          <strong>E-Mail:</strong>{" "}
          <MuiLink href={`mailto:${content.privacyContact.email}`}>
            {content.privacyContact.email}
          </MuiLink>
        </Typography>
      </LegalSection>
    </LegalPage>
  );
}
