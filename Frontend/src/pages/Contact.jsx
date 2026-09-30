import { Paper, Stack, Typography } from "@mui/material";

import { Email, Phone, Instagram, LocationOn } from "@mui/icons-material";

import content from "../data/content";
import contactInfo from "../data/contactInfo";

import PageShell from "../components/PageShell";
import GridSection from "../components/GridSection";
import ContactForm from "../components/ContactForm";
import InfoCard from "../components/InfoCard";

export default function Contact({ lang }) {
  const t = content[lang];
  return (
    <PageShell title={t.contactTitle} subtitle={t.contactText}>
      <GridSection>
        <ContactForm t={t} />
        <Stack spacing={2}>
          <InfoCard icon={<Email />} label="Email" value={contactInfo.email} />
          <InfoCard icon={<Phone />} label="Phone" value={contactInfo.phone} />

          <a href={contactInfo.instagramURL}>
            <InfoCard
              icon={<Instagram />}
              label="Instagram"
              value={contactInfo.instagram}
            />
          </a>
          <InfoCard
            icon={<LocationOn />}
            label="Address"
            value={contactInfo.address}
          />

          <Paper
            sx={{
              height: 220,
              display: "grid",
              placeItems: "center",
              background:
                "linear-gradient(135deg, rgba(21,94,239,.1), rgba(255,212,0,.16))",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2458.7997922312265!2d7.631493177434249!3d51.955842277843566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b9bada17ce2a0f%3A0xd433f0764283144d!2sBerliner%20Pl.%2035-37%2C%2048143%20M%C3%BCnster!5e0!3m2!1sen!2sde!4v1790727989910!5m2!1sen!2sde"
              width="100%"
              height="220"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Google Map"
            />
          </Paper>
        </Stack>
      </GridSection>
    </PageShell>
  );
}

/*<Typography color="text.secondary" textAlign="center" px={3}>
              Google Map embed placeholder
              <br />
              Add the institute's confirmed location here.
            </Typography>*/
