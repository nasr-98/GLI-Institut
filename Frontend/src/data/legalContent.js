const legalContent = {
  en: {
    impressum: {
      title: "Legal Notice",
      subtitle:
        "Information in accordance with the statutory information requirements.",

      company: {
        title: "Company Information",
        name: "German Language Institut GbR",
        address: "Berliner Platz 35–37",
        postalCode: "48143 Münster",
        country: "Germany",
      },

      representedBy: {
        title: "Represented by",
        description: "Partners of German Language Institut GbR",
        persons: ["Amir Alhalis", "Taher Abunjaila"],
      },

      contact: {
        title: "Contact",
        email: "info@gli-ms.de",
        website: "www.gli-ms.de",
      },

      legalForm: {
        title: "Legal Form",
        value: "Gesellschaft bürgerlichen Rechts (GbR)",
      },

      additional: {
        title: "Additional Information",
        text: "Further legally required information, where applicable, will be added after verification.",
      },
    },

    datenschutz: {
      title: "Privacy Policy",
      subtitle:
        "Information about the processing of personal data when using our website and our services.",

      responsible: {
        title: "1. Data Controller",
        name: "German Language Institut GbR",
        address: "Berliner Platz 35–37",
        postalCode: "48143 Münster",
        country: "Germany",
        representedBy: "Represented by the partners:",
        persons: ["Amir Alhalis", "Taher Abunjaila"],
        email: "info@gli-ms.de",
        website: "www.gli-ms.de",
      },

      dataProtectionOfficer: {
        title: "2. Data Protection Officer",
        text: "No data protection officer has currently been appointed.",
      },

      generalInformation: {
        title: "3. General Information",
        paragraphs: [
          "We take the protection of your personal data seriously. Personal data is information that can be used to identify you personally.",
          "We process personal data only in accordance with applicable data protection laws and for the purposes stated in this privacy policy.",
          "This privacy policy explains which data may be processed when you use our website and services and what rights you have in relation to this processing.",
        ],
      },

      hosting: {
        title: "4. Hosting",
        paragraphs: [
          "Our website is hosted by Hostinger. When you access our website, the hosting provider may process technically necessary information.",
          "This may include the following information:",
        ],
        data: [
          "IP address",
          "Date and time of access",
          "Pages and files accessed",
          "Browser type and version",
          "Operating system",
          "Referrer URL",
          "Technical connection data",
        ],
        additional:
          "The processing serves to provide, maintain and secure our website. The specific legal basis, storage period and any subcontractors involved must be determined based on our hosting agreement and server configuration.",
      },

      contact: {
        title: "5. Contact",
        paragraphs: [
          "If you contact us by email or through a contact form, we process the personal data you provide in order to process your request and, where necessary, respond to follow-up questions.",
          "Depending on the nature of your request, this may include the following information:",
        ],
        data: [
          "Name",
          "Email address",
          "Telephone number",
          "Content of your message",
          "Other information voluntarily provided",
        ],
        additional:
          "The processing is carried out where necessary to take pre-contractual measures, perform a contract or on another applicable legal basis.",
      },

      registration: {
        title: "6. Course Registration",
        paragraphs: [
          "When registering for a course, we process personal data that is necessary for registration, communication, course organization and payment processing.",
          "Depending on the registration form, this may include:",
        ],
        data: [
          "First and last name",
          "Email address",
          "Telephone number",
          "Gender, if provided",
          "Desired language level",
          "Course type",
          "Preferred course start date",
          "Other voluntarily provided information",
        ],
        additional:
          "We use this information in particular to process your registration, communicate with you, organize the course and provide the agreed services.",
      },

      resend: {
        title: "7. Email Delivery via Resend",
        paragraphs: [
          "We use the Resend service to send emails relating to contact requests and course registrations.",
          "For email delivery, necessary information such as email addresses and message content may be transmitted to the service.",
          "The processing serves to send messages, communicate with prospective students and participants, and process enquiries and registrations.",
        ],
        additional:
          "Information regarding the provider, the location of data processing, possible transfers to third countries and contractual data protection arrangements must be verified based on the Resend configuration actually used.",
      },

      googleFonts: {
        title: "8. Google Fonts",
        paragraphs: [
          "Our website uses fonts provided by Google Fonts, which are loaded from external servers.",
          "When these fonts are loaded, a connection to Google servers may be established. In particular, the IP address and technical browser and device information may be transmitted.",
          "Because the fonts are loaded externally, it must be determined on which legal basis the data transfer takes place and whether prior consent is required.",
        ],
        linkText: "Google Fonts – Privacy Information",
        linkUrl: "https://developers.google.com/fonts/faq/privacy",
      },

      googleMaps: {
        title: "9. Google Maps",
        paragraphs: [
          "Our website uses Google Maps to display locations and directions.",
          "When the map is loaded, a connection to Google servers may be established. In particular, your IP address and technical information about your browser and device may be transmitted.",
          "Depending on use, cookies or similar technologies may also be used.",
          "The map is currently loaded directly when the relevant page is opened. We therefore need to ensure technically that any required consent is obtained before the relevant content is loaded.",
        ],
        linkText: "Google Privacy Policy",
        linkUrl: "https://policies.google.com/privacy",
      },

      youtube: {
        title: "10. YouTube",
        paragraphs: [
          "Our website may embed videos from YouTube. YouTube is a service provided by Google.",
          "When an embedded video is loaded, a connection to YouTube or Google servers may be established. In particular, your IP address and technical information about your browser and device may be transmitted.",
          "Depending on the integration and use, cookies or similar technologies may be used.",
          "Since videos may currently be loaded directly, it must be determined whether prior consent is required and how this can be implemented technically.",
        ],
        linkText: "Google Privacy Policy",
        linkUrl: "https://policies.google.com/privacy",
      },

      cookies: {
        title: "11. Cookies and Similar Technologies",
        paragraphs: [
          "Our website may use cookies and similar technologies. These may be technically necessary or may be used by integrated external services.",
          "We currently do not use Google Analytics and do not have a separate cookie consent management system in place.",
          "Since external services such as Google Maps, YouTube and Google Fonts are integrated, a technical review of the cookies, connections and storage technologies actually used is required.",
          "Where legally required, technologies that are not necessary may only be activated after valid consent has been obtained.",
        ],
      },

      thirdParties: {
        title: "12. Data Transfers to Third Parties",
        paragraphs: [
          "Personal data may be transferred to third parties where this is necessary to provide our website, communicate with users, organize courses or comply with legal obligations.",
          "Our external service providers include, in particular, our hosting provider Hostinger, the email service Resend and the integrated Google services.",
          "Whether and to what extent data is transferred to countries outside the European Union or the European Economic Area depends on the specific services and their configuration and must be verified based on the relevant contractual and privacy documentation.",
        ],
      },

      storage: {
        title: "13. Data Retention",
        paragraphs: [
          "We store personal data only for as long as necessary for the respective processing purpose.",
          "Statutory retention obligations may require longer storage. After the purpose has ceased and any applicable statutory periods have expired, the data will be deleted or processing will be restricted in accordance with applicable law.",
        ],
      },

      rights: {
        title: "14. Your Rights",
        introduction:
          "Under applicable data protection laws, you may have the following rights, provided that the respective legal requirements are met:",
        items: [
          {
            title: "Right of access:",
            text: "You may request information about whether and which personal data we process about you.",
          },
          {
            title: "Right to rectification:",
            text: "You may request the correction of inaccurate or completion of incomplete personal data.",
          },
          {
            title: "Right to erasure:",
            text: "Under certain legal conditions, you may request the deletion of your personal data.",
          },
          {
            title: "Right to restriction:",
            text: "Under certain conditions, you may request restriction of processing.",
          },
          {
            title: "Right to data portability:",
            text: "Under the legal requirements, you may request your provided data in a structured format.",
          },
          {
            title: "Right to object:",
            text: "You may object to processing for reasons arising from your particular situation where the legal requirements are met.",
          },
          {
            title: "Right to withdraw consent:",
            text: "You may withdraw consent that you have given at any time with effect for the future.",
          },
          {
            title: "Right to lodge a complaint:",
            text: "You have the right to lodge a complaint with a competent data protection supervisory authority.",
          },
        ],
      },

      supervisoryAuthority: {
        title: "15. Right to Lodge a Complaint",
        paragraphs: [
          "You have the right to lodge a complaint with a data protection supervisory authority regarding the processing of your personal data.",
          "The competent authority may in particular be the supervisory authority of your habitual residence, place of work or the place of the alleged infringement.",
        ],
      },

      privacyContact: {
        title: "16. Contact Regarding Data Protection",
        paragraphs: [
          "If you have any questions regarding data protection or the processing of your personal data, you can contact us at any time.",
        ],
        name: "German Language Institut GbR",
        address: "Berliner Platz 35–37",
        postalCode: "48143 Münster",
        country: "Germany",
        email: "info@gli-ms.de",
      },
    },

    agb: {
      title: "General Terms and Conditions",
      subtitle:
        "Terms and conditions for registration and participation in our German language courses.",

      sections: [
        {
          title: "1. Scope of Application",
          paragraphs: [
            "These General Terms and Conditions apply to participation in the language courses offered by German Language Institut GbR.",
          ],
        },
        {
          title: "2. Course Offer",
          paragraphs: [
            "We offer German language courses at levels A1, A2, B1, B2 and C1. A C2 course is currently not offered.",
            "Depending on the course, classes are offered either on-site or online. The course duration is between 8 and 16 weeks depending on the language level and course type.",
          ],
        },
        {
          title: "3. Registration and Conclusion of Contract",
          paragraphs: [
            "Registration is possible via our website, in person at our institute or by email.",
            "Registration becomes binding only after receipt of the agreed payment.",
          ],
        },
        {
          title: "4. Course Fees and Payment",
          paragraphs: [
            "Course fees are paid by bank transfer. The agreed payment is a prerequisite for binding registration.",
          ],
        },
        {
          title: "5. Cancellation and Refunds",
          subsections: [
            {
              title: "Cancellation up to 14 days before the course starts",
              text: "Cancellation is possible up to 14 days before the course start date. In this case, a cancellation fee of 20% of the course price will be charged. The remaining 80% will be refunded.",
            },
            {
              title: "Cancellation less than 14 days before the course starts",
              text: "If the course is cancelled less than 14 days before the course start date, there is no entitlement to a refund of the course fee under the stated course conditions.",
            },
          ],
        },
        {
          title: "6. Absence from Classes",
          paragraphs: [
            "Missed lessons cannot be made up. Participants are not entitled to a refund or replacement lessons for classes they have missed.",
          ],
        },
        {
          title: "7. Minimum Number of Participants",
          paragraphs: [
            "The minimum number of participants is 12 people. The maximum group size is 20 people.",
            "If the minimum number of participants is not reached, the course will not take place. If German Language Institut cancels a course for this reason, all course fees already paid will be fully refunded.",
          ],
        },
        {
          title: "8. Course Materials",
          paragraphs: [
            "Books and other teaching materials are not included in the course price and must be paid for separately by the participant.",
          ],
        },
        {
          title: "9. Class Times and Organizational Changes",
          paragraphs: [
            "Specific class times, course duration and organizational details may vary depending on the language level and course. Participants will be informed of these details before the course begins.",
          ],
        },
        {
          title: "10. Contact",
          paragraphs: [
            "German Language Institut GbR",
            "Berliner Platz 35–37, 48143 Münster",
            "Email: info@gli-ms.de",
          ],
        },
      ],
    },
  },

  // ============================================================
  // DEUTSCH
  // ============================================================

  de: {
    impressum: {
      title: "Impressum",
      subtitle: "Angaben gemäß den gesetzlichen Informationspflichten.",

      company: {
        title: "Angaben zum Unternehmen",
        name: "German Language Institut GbR",
        address: "Berliner Platz 35–37",
        postalCode: "48143 Münster",
        country: "Deutschland",
      },

      representedBy: {
        title: "Vertreten durch",
        description: "Gesellschafter der German Language Institut GbR",
        persons: ["Amir Alhalis", "Taher Abunjaila"],
      },

      contact: {
        title: "Kontakt",
        email: "info@gli-ms.de",
        website: "www.gli-ms.de",
      },

      legalForm: {
        title: "Rechtsform",
        value: "Gesellschaft bürgerlichen Rechts (GbR)",
      },

      additional: {
        title: "Zusätzliche Informationen",
        text: "Weitere gesetzlich erforderliche Angaben werden, soweit erforderlich, nach entsprechender Prüfung ergänzt.",
      },
    },

    datenschutz: {
      title: "Datenschutzerklärung",
      subtitle:
        "Informationen über die Verarbeitung personenbezogener Daten bei der Nutzung unserer Website und unserer Dienstleistungen.",

      responsible: {
        title: "1. Verantwortlicher",
        name: "German Language Institut GbR",
        address: "Berliner Platz 35–37",
        postalCode: "48143 Münster",
        country: "Deutschland",
        representedBy: "Vertreten durch die Gesellschafter:",
        persons: ["Amir Alhalis", "Taher Abunjaila"],
        email: "info@gli-ms.de",
        website: "www.gli-ms.de",
      },

      dataProtectionOfficer: {
        title: "2. Datenschutzbeauftragter",
        text: "Derzeit wurde kein Datenschutzbeauftragter bestellt.",
      },

      generalInformation: {
        title: "3. Allgemeine Informationen",
        paragraphs: [
          "Wir nehmen den Schutz Ihrer personenbezogenen Daten ernst. Personenbezogene Daten sind Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen.",
          "Wir verarbeiten personenbezogene Daten ausschließlich im Einklang mit den geltenden Datenschutzvorschriften und zu den in dieser Datenschutzerklärung genannten Zwecken.",
          "Diese Datenschutzerklärung erläutert, welche Daten bei der Nutzung unserer Website und unserer Dienstleistungen verarbeitet werden können und welche Rechte Ihnen im Zusammenhang mit dieser Verarbeitung zustehen.",
        ],
      },

      hosting: {
        title: "4. Hosting",
        paragraphs: [
          "Unsere Website wird bei Hostinger gehostet. Beim Aufruf unserer Website kann der Hosting-Anbieter technisch erforderliche Informationen verarbeiten.",
          "Hierzu können insbesondere folgende Informationen gehören:",
        ],
        data: [
          "IP-Adresse",
          "Datum und Uhrzeit des Zugriffs",
          "Aufgerufene Seiten und Dateien",
          "Browsertyp und Browserversion",
          "Betriebssystem",
          "Referrer-URL",
          "Technische Verbindungsdaten",
        ],
        additional:
          "Die Verarbeitung dient der Bereitstellung, Aufrechterhaltung und Absicherung unserer Website. Die konkrete Rechtsgrundlage, Speicherdauer sowie gegebenenfalls eingesetzte Unterauftragnehmer sind anhand unseres Hostingvertrags und der tatsächlichen Serverkonfiguration zu prüfen.",
      },

      contact: {
        title: "5. Kontaktaufnahme",
        paragraphs: [
          "Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, verarbeiten wir die von Ihnen übermittelten personenbezogenen Daten, um Ihre Anfrage zu bearbeiten und gegebenenfalls Rückfragen zu beantworten.",
          "Je nach Art Ihrer Anfrage können insbesondere folgende Daten verarbeitet werden:",
        ],
        data: [
          "Name",
          "E-Mail-Adresse",
          "Telefonnummer",
          "Inhalt Ihrer Nachricht",
          "Sonstige freiwillig übermittelte Informationen",
        ],
        additional:
          "Die Verarbeitung erfolgt, soweit erforderlich, zur Durchführung vorvertraglicher Maßnahmen, zur Erfüllung eines Vertrags oder auf einer anderen anwendbaren Rechtsgrundlage.",
      },

      registration: {
        title: "6. Kursanmeldung",
        paragraphs: [
          "Bei der Anmeldung zu einem Sprachkurs verarbeiten wir personenbezogene Daten, die für die Anmeldung, Kommunikation, Kursorganisation und Zahlungsabwicklung erforderlich sind.",
          "Abhängig vom verwendeten Anmeldeformular können insbesondere folgende Daten erfasst werden:",
        ],
        data: [
          "Vor- und Nachname",
          "E-Mail-Adresse",
          "Telefonnummer",
          "Geschlecht, sofern angegeben",
          "Gewünschtes Sprachniveau",
          "Kursart",
          "Gewünschter Kursbeginn",
          "Sonstige freiwillig übermittelte Informationen",
        ],
        additional:
          "Wir verwenden diese Informationen insbesondere zur Bearbeitung Ihrer Anmeldung, zur Kommunikation mit Ihnen, zur Organisation des Kurses und zur Erbringung der vereinbarten Leistungen.",
      },

      resend: {
        title: "7. E-Mail-Versand über Resend",
        paragraphs: [
          "Für den Versand von E-Mails im Zusammenhang mit Kontaktanfragen und Kursanmeldungen nutzen wir den Dienst Resend.",
          "Für die Zustellung von E-Mails können erforderliche Informationen wie E-Mail-Adressen und der Inhalt der jeweiligen Nachricht an den Dienst übermittelt werden.",
          "Die Verarbeitung dient dem Versand von Nachrichten, der Kommunikation mit Interessenten und Teilnehmern sowie der Bearbeitung von Anfragen und Anmeldungen.",
        ],
        additional:
          "Angaben zum Anbieter, zum Ort der Datenverarbeitung, zu möglichen Übermittlungen in Drittländer sowie zu vertraglichen Datenschutzvereinbarungen sind anhand der tatsächlich verwendeten Resend-Konfiguration zu prüfen.",
      },

      googleFonts: {
        title: "8. Google Fonts",
        paragraphs: [
          "Unsere Website verwendet Schriftarten von Google Fonts, die von externen Servern geladen werden.",
          "Beim Laden dieser Schriftarten kann eine Verbindung zu Servern von Google hergestellt werden. Dabei können insbesondere die IP-Adresse sowie technische Informationen über Browser und Endgerät übermittelt werden.",
          "Da die Schriftarten extern geladen werden, ist zu prüfen, auf welcher Rechtsgrundlage die Datenübermittlung erfolgt und ob eine vorherige Einwilligung erforderlich ist.",
        ],
        linkText: "Google Fonts – Datenschutzhinweise",
        linkUrl: "https://developers.google.com/fonts/faq/privacy",
      },

      googleMaps: {
        title: "9. Google Maps",
        paragraphs: [
          "Unsere Website verwendet Google Maps zur Darstellung von Standorten und Anfahrtswegen.",
          "Beim Laden der Karte kann eine Verbindung zu Servern von Google hergestellt werden. Dabei können insbesondere Ihre IP-Adresse sowie technische Informationen über Ihren Browser und Ihr Endgerät übermittelt werden.",
          "Je nach Nutzung können außerdem Cookies oder ähnliche Technologien eingesetzt werden.",
          "Die Karte wird derzeit direkt beim Öffnen der entsprechenden Seite geladen. Daher ist technisch sicherzustellen, dass eine gegebenenfalls erforderliche Einwilligung vor dem Laden der entsprechenden Inhalte eingeholt wird.",
        ],
        linkText: "Datenschutzerklärung von Google",
        linkUrl: "https://policies.google.com/privacy",
      },

      youtube: {
        title: "10. YouTube",
        paragraphs: [
          "Unsere Website kann Videos von YouTube einbinden. YouTube ist ein Dienst von Google.",
          "Beim Laden eines eingebetteten Videos kann eine Verbindung zu YouTube- oder Google-Servern hergestellt werden. Dabei können insbesondere Ihre IP-Adresse sowie technische Informationen über Ihren Browser und Ihr Endgerät übermittelt werden.",
          "Je nach Einbindung und Nutzung können Cookies oder ähnliche Technologien eingesetzt werden.",
          "Da Videos derzeit möglicherweise direkt geladen werden, ist zu prüfen, ob eine vorherige Einwilligung erforderlich ist und wie diese technisch umgesetzt werden kann.",
        ],
        linkText: "Datenschutzerklärung von Google",
        linkUrl: "https://policies.google.com/privacy",
      },

      cookies: {
        title: "11. Cookies und ähnliche Technologien",
        paragraphs: [
          "Unsere Website kann Cookies und ähnliche Technologien verwenden. Diese können technisch erforderlich sein oder durch eingebundene externe Dienste eingesetzt werden.",
          "Wir verwenden derzeit kein Google Analytics und verfügen über kein separates Consent-Management-System für Cookies.",
          "Da externe Dienste wie Google Maps, YouTube und Google Fonts eingebunden sind, ist eine technische Prüfung der tatsächlich verwendeten Cookies, Verbindungen und Speichertechnologien erforderlich.",
          "Soweit gesetzlich erforderlich, dürfen nicht notwendige Technologien erst nach wirksamer Einwilligung aktiviert werden.",
        ],
      },

      thirdParties: {
        title: "12. Datenübermittlung an Dritte",
        paragraphs: [
          "Personenbezogene Daten können an Dritte übermittelt werden, soweit dies für die Bereitstellung unserer Website, die Kommunikation mit Nutzern, die Organisation von Kursen oder die Erfüllung gesetzlicher Verpflichtungen erforderlich ist.",
          "Zu unseren externen Dienstleistern gehören insbesondere unser Hosting-Anbieter Hostinger, der E-Mail-Dienst Resend sowie die eingebundenen Google-Dienste.",
          "Ob und in welchem Umfang Daten in Länder außerhalb der Europäischen Union oder des Europäischen Wirtschaftsraums übermittelt werden, hängt von den konkret eingesetzten Diensten und deren Konfiguration ab und ist anhand der jeweiligen Vertrags- und Datenschutzunterlagen zu prüfen.",
        ],
      },

      storage: {
        title: "13. Speicherdauer",
        paragraphs: [
          "Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Verarbeitungszweck erforderlich ist.",
          "Gesetzliche Aufbewahrungspflichten können eine längere Speicherung erforderlich machen. Nach Wegfall des Zwecks und Ablauf etwaiger gesetzlicher Aufbewahrungsfristen werden die Daten gelöscht oder die Verarbeitung entsprechend den gesetzlichen Vorgaben eingeschränkt.",
        ],
      },

      rights: {
        title: "14. Ihre Rechte",
        introduction:
          "Nach den geltenden Datenschutzvorschriften können Ihnen unter den jeweiligen gesetzlichen Voraussetzungen folgende Rechte zustehen:",
        items: [
          {
            title: "Auskunftsrecht:",
            text: "Sie können Auskunft darüber verlangen, ob und welche personenbezogenen Daten wir über Sie verarbeiten.",
          },
          {
            title: "Recht auf Berichtigung:",
            text: "Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger personenbezogener Daten verlangen.",
          },
          {
            title: "Recht auf Löschung:",
            text: "Unter bestimmten gesetzlichen Voraussetzungen können Sie die Löschung Ihrer personenbezogenen Daten verlangen.",
          },
          {
            title: "Recht auf Einschränkung der Verarbeitung:",
            text: "Unter bestimmten Voraussetzungen können Sie die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.",
          },
          {
            title: "Recht auf Datenübertragbarkeit:",
            text: "Unter den gesetzlichen Voraussetzungen können Sie die Herausgabe der von Ihnen bereitgestellten Daten in einem strukturierten Format verlangen.",
          },
          {
            title: "Widerspruchsrecht:",
            text: "Sie können aus Gründen, die sich aus Ihrer besonderen Situation ergeben, der Verarbeitung widersprechen, sofern die gesetzlichen Voraussetzungen erfüllt sind.",
          },
          {
            title: "Recht auf Widerruf einer Einwilligung:",
            text: "Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.",
          },
          {
            title: "Beschwerderecht:",
            text: "Sie haben das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.",
          },
        ],
      },

      supervisoryAuthority: {
        title: "15. Beschwerderecht",
        paragraphs: [
          "Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.",
          "Zuständig kann insbesondere die Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes sein.",
        ],
      },

      privacyContact: {
        title: "16. Kontakt zum Datenschutz",
        paragraphs: [
          "Wenn Sie Fragen zum Datenschutz oder zur Verarbeitung Ihrer personenbezogenen Daten haben, können Sie uns jederzeit kontaktieren.",
        ],
        name: "German Language Institut GbR",
        address: "Berliner Platz 35–37",
        postalCode: "48143 Münster",
        country: "Deutschland",
        email: "info@gli-ms.de",
      },
    },

    agb: {
      title: "Allgemeine Geschäftsbedingungen",
      subtitle:
        "Allgemeine Bedingungen für die Anmeldung und Teilnahme an unseren Deutschkursen.",

      sections: [
        {
          title: "1. Geltungsbereich",
          paragraphs: [
            "Diese Allgemeinen Geschäftsbedingungen gelten für die Teilnahme an den von der German Language Institut GbR angebotenen Sprachkursen.",
          ],
        },

        {
          title: "2. Kursangebot",
          paragraphs: [
            "Wir bieten Deutschkurse auf den Niveaustufen A1, A2, B1, B2 und C1 an. Ein C2-Kurs wird derzeit nicht angeboten.",
            "Je nach Kurs werden die Unterrichtseinheiten entweder in Präsenz oder online durchgeführt. Die Kursdauer beträgt abhängig vom Sprachniveau und der Kursart zwischen 8 und 16 Wochen.",
          ],
        },

        {
          title: "3. Anmeldung und Vertragsschluss",
          paragraphs: [
            "Eine Anmeldung ist über unsere Website, persönlich in unserem Institut oder per E-Mail möglich.",
            "Die Anmeldung wird erst nach Eingang der vereinbarten Zahlung verbindlich.",
          ],
        },

        {
          title: "4. Kursgebühren und Zahlung",
          paragraphs: [
            "Die Kursgebühren sind per Banküberweisung zu bezahlen. Die vereinbarte Zahlung ist Voraussetzung für eine verbindliche Anmeldung.",
          ],
        },

        {
          title: "5. Stornierung und Rückerstattung",
          subsections: [
            {
              title: "Stornierung bis 14 Tage vor Kursbeginn",
              text: "Eine Stornierung ist bis 14 Tage vor Kursbeginn möglich. In diesem Fall wird eine Stornierungsgebühr in Höhe von 20 % des Kurspreises berechnet. Die verbleibenden 80 % werden zurückerstattet.",
            },
            {
              title: "Stornierung weniger als 14 Tage vor Kursbeginn",
              text: "Bei einer Stornierung weniger als 14 Tage vor Kursbeginn besteht unter den genannten Kursbedingungen kein Anspruch auf Rückerstattung der Kursgebühr.",
            },
          ],
        },

        {
          title: "6. Fehlzeiten",
          paragraphs: [
            "Versäumte Unterrichtsstunden können nicht nachgeholt werden. Teilnehmer haben für versäumte Unterrichtsstunden keinen Anspruch auf Rückerstattung oder Ersatzunterricht.",
          ],
        },

        {
          title: "7. Mindestteilnehmerzahl",
          paragraphs: [
            "Die Mindestteilnehmerzahl beträgt 12 Personen. Die maximale Gruppengröße beträgt 20 Personen.",
            "Wird die Mindestteilnehmerzahl nicht erreicht, findet der Kurs nicht statt. Wenn German Language Institut den Kurs aus diesem Grund absagt, werden bereits gezahlte Kursgebühren vollständig zurückerstattet.",
          ],
        },

        {
          title: "8. Kursmaterialien",
          paragraphs: [
            "Bücher und sonstige Unterrichtsmaterialien sind nicht im Kurspreis enthalten und müssen von den Teilnehmern separat bezahlt werden.",
          ],
        },

        {
          title: "9. Unterrichtszeiten und organisatorische Änderungen",
          paragraphs: [
            "Konkrete Unterrichtszeiten, Kursdauer und organisatorische Einzelheiten können je nach Sprachniveau und Kurs variieren. Die Teilnehmer werden vor Beginn des Kurses über diese Einzelheiten informiert.",
          ],
        },

        {
          title: "10. Kontakt",
          paragraphs: [
            "German Language Institut GbR",
            "Berliner Platz 35–37, 48143 Münster",
            "E-Mail: info@gli-ms.de",
          ],
        },
      ],
    },
  },

  // ============================================================
  // العربية
  // ============================================================

  ar: {
    impressum: {
      title: "بيانات الجهة القانونية",
      subtitle:
        "المعلومات المطلوبة وفقًا للمتطلبات القانونية المتعلقة ببيانات الجهة المسؤولة.",

      company: {
        title: "بيانات الشركة",
        name: "German Language Institut GbR",
        address: "Berliner Platz 35–37",
        postalCode: "48143 Münster",
        country: "ألمانيا",
      },

      representedBy: {
        title: "يمثلها",
        description: "شركاء German Language Institut GbR",
        persons: ["Amir Alhalis", "Taher Abunjaila"],
      },

      contact: {
        title: "معلومات الاتصال",
        email: "info@gli-ms.de",
        website: "www.gli-ms.de",
      },

      legalForm: {
        title: "الشكل القانوني",
        value: "شركة مدنية (GbR – Gesellschaft bürgerlichen Rechts)",
      },

      additional: {
        title: "معلومات إضافية",
        text: "ستتم إضافة أي معلومات أخرى مطلوبة قانونًا، عند الاقتضاء، بعد التحقق منها.",
      },
    },

    datenschutz: {
      title: "سياسة الخصوصية",
      subtitle:
        "معلومات حول معالجة البيانات الشخصية عند استخدام موقعنا الإلكتروني وخدماتنا.",

      responsible: {
        title: "1. الجهة المسؤولة عن معالجة البيانات",
        name: "German Language Institut GbR",
        address: "Berliner Platz 35–37",
        postalCode: "48143 Münster",
        country: "ألمانيا",
        representedBy: "يمثلها الشركاء:",
        persons: ["Amir Alhalis", "Taher Abunjaila"],
        email: "info@gli-ms.de",
        website: "www.gli-ms.de",
      },

      dataProtectionOfficer: {
        title: "2. مسؤول حماية البيانات",
        text: "لم يتم تعيين مسؤول لحماية البيانات في الوقت الحالي.",
      },

      generalInformation: {
        title: "3. معلومات عامة",
        paragraphs: [
          "نحن نولي حماية بياناتكم الشخصية أهمية كبيرة. البيانات الشخصية هي المعلومات التي يمكن استخدامها لتحديد هوية الشخص بشكل مباشر أو غير مباشر.",
          "نقوم بمعالجة البيانات الشخصية فقط وفقًا لقوانين حماية البيانات المعمول بها وللأغراض الموضحة في سياسة الخصوصية هذه.",
          "توضح سياسة الخصوصية هذه أنواع البيانات التي قد تتم معالجتها عند استخدام موقعنا الإلكتروني وخدماتنا، بالإضافة إلى الحقوق التي تتمتعون بها فيما يتعلق بهذه المعالجة.",
        ],
      },

      hosting: {
        title: "4. استضافة الموقع",
        paragraphs: [
          "يتم استضافة موقعنا الإلكتروني لدى شركة Hostinger. عند الوصول إلى موقعنا، قد يقوم مزود الاستضافة بمعالجة بعض المعلومات الضرورية من الناحية التقنية.",
          "قد تشمل هذه المعلومات ما يلي:",
        ],
        data: [
          "عنوان IP",
          "تاريخ ووقت الوصول إلى الموقع",
          "الصفحات والملفات التي تم الوصول إليها",
          "نوع المتصفح وإصداره",
          "نظام التشغيل",
          "عنوان الصفحة المُحيلة (Referrer URL)",
          "بيانات الاتصال التقنية",
        ],
        additional:
          "تتم هذه المعالجة من أجل توفير موقعنا الإلكتروني وصيانته وحمايته. ويجب تحديد الأساس القانوني المحدد، ومدة التخزين، وأي جهات فرعية مشاركة في المعالجة استنادًا إلى عقد الاستضافة وإعدادات الخادم الفعلية.",
      },

      contact: {
        title: "5. التواصل معنا",
        paragraphs: [
          "عند التواصل معنا عبر البريد الإلكتروني أو من خلال نموذج الاتصال، نقوم بمعالجة البيانات الشخصية التي تقدمونها من أجل معالجة طلبكم والرد على أي استفسارات إضافية عند الحاجة.",
          "وبحسب طبيعة الطلب، قد تشمل البيانات المعالجة ما يلي:",
        ],
        data: [
          "الاسم",
          "عنوان البريد الإلكتروني",
          "رقم الهاتف",
          "محتوى الرسالة",
          "معلومات أخرى يتم تقديمها طوعًا",
        ],
        additional:
          "تتم المعالجة عند الحاجة لاتخاذ إجراءات ما قبل التعاقد، أو لتنفيذ العقد، أو استنادًا إلى أساس قانوني آخر معمول به.",
      },

      registration: {
        title: "6. التسجيل في الدورات",
        paragraphs: [
          "عند التسجيل في إحدى دوراتنا، نقوم بمعالجة البيانات الشخصية اللازمة لإتمام التسجيل والتواصل وتنظيم الدورة ومعالجة المدفوعات.",
          "وبحسب نموذج التسجيل المستخدم، قد تشمل البيانات ما يلي:",
        ],
        data: [
          "الاسم الأول واسم العائلة",
          "عنوان البريد الإلكتروني",
          "رقم الهاتف",
          "الجنس، إذا تم تقديمه",
          "مستوى اللغة المطلوب",
          "نوع الدورة",
          "تاريخ البدء المفضل للدورة",
          "معلومات أخرى يتم تقديمها طوعًا",
        ],
        additional:
          "نستخدم هذه المعلومات بشكل خاص لمعالجة طلب التسجيل، والتواصل معكم، وتنظيم الدورة، وتقديم الخدمات المتفق عليها.",
      },

      resend: {
        title: "7. إرسال البريد الإلكتروني عبر Resend",
        paragraphs: [
          "نستخدم خدمة Resend لإرسال رسائل البريد الإلكتروني المتعلقة بطلبات التواصل والتسجيل في الدورات.",
          "ولإرسال رسائل البريد الإلكتروني، قد يتم نقل بعض المعلومات الضرورية مثل عناوين البريد الإلكتروني ومحتوى الرسائل إلى هذه الخدمة.",
          "تُستخدم هذه المعالجة لإرسال الرسائل والتواصل مع المهتمين والطلاب والمشاركين، بالإضافة إلى معالجة الاستفسارات وطلبات التسجيل.",
        ],
        additional:
          "يجب التحقق من المعلومات المتعلقة بمزود الخدمة، ومكان معالجة البيانات، وأي عمليات نقل محتملة إلى دول خارج المنطقة الاقتصادية الأوروبية، بالإضافة إلى ترتيبات حماية البيانات التعاقدية، استنادًا إلى إعدادات خدمة Resend المستخدمة فعليًا.",
      },

      googleFonts: {
        title: "8. Google Fonts",
        paragraphs: [
          "يستخدم موقعنا الإلكتروني خطوطًا مقدمة من خدمة Google Fonts، ويتم تحميل هذه الخطوط من خوادم خارجية.",
          "عند تحميل هذه الخطوط، قد يتم إنشاء اتصال مع خوادم Google. وقد يتم، على وجه الخصوص، نقل عنوان IP ومعلومات تقنية عن المتصفح والجهاز.",
          "نظرًا لتحميل الخطوط من خوادم خارجية، يجب تحديد الأساس القانوني الذي تتم بموجبه عملية نقل البيانات وما إذا كانت هناك حاجة إلى الحصول على موافقة مسبقة.",
        ],
        linkText: "Google Fonts – معلومات الخصوصية",
        linkUrl: "https://developers.google.com/fonts/faq/privacy",
      },

      googleMaps: {
        title: "9. Google Maps",
        paragraphs: [
          "يستخدم موقعنا خدمة Google Maps لعرض المواقع والاتجاهات.",
          "عند تحميل الخريطة، قد يتم إنشاء اتصال مع خوادم Google. وقد يتم، على وجه الخصوص، نقل عنوان IP الخاص بكم ومعلومات تقنية عن المتصفح والجهاز.",
          "وبحسب طريقة الاستخدام، قد يتم أيضًا استخدام ملفات تعريف الارتباط (Cookies) أو تقنيات مشابهة.",
          "يتم حاليًا تحميل الخريطة مباشرة عند فتح الصفحة المعنية. ولذلك يجب التأكد من الناحية التقنية من الحصول على أي موافقة مطلوبة قبل تحميل المحتوى المعني.",
        ],
        linkText: "سياسة الخصوصية لدى Google",
        linkUrl: "https://policies.google.com/privacy",
      },

      youtube: {
        title: "10. YouTube",
        paragraphs: [
          "قد يتضمن موقعنا الإلكتروني مقاطع فيديو من YouTube، وهي خدمة تابعة لشركة Google.",
          "عند تحميل مقطع فيديو مضمّن، قد يتم إنشاء اتصال مع خوادم YouTube أو Google. وقد يتم، على وجه الخصوص، نقل عنوان IP الخاص بكم ومعلومات تقنية عن المتصفح والجهاز.",
          "وبحسب طريقة دمج الخدمة واستخدامها، قد يتم استخدام ملفات تعريف الارتباط أو تقنيات مشابهة.",
          "نظرًا لأنه قد يتم حاليًا تحميل مقاطع الفيديو مباشرة، يجب تحديد ما إذا كانت الموافقة المسبقة مطلوبة وكيف يمكن تنفيذ ذلك من الناحية التقنية.",
        ],
        linkText: "سياسة الخصوصية لدى Google",
        linkUrl: "https://policies.google.com/privacy",
      },

      cookies: {
        title: "11. ملفات تعريف الارتباط والتقنيات المشابهة",
        paragraphs: [
          "قد يستخدم موقعنا الإلكتروني ملفات تعريف الارتباط (Cookies) وتقنيات مشابهة. وقد تكون هذه التقنيات ضرورية من الناحية التقنية أو يتم استخدامها من قبل الخدمات الخارجية المدمجة في الموقع.",
          "نحن لا نستخدم حاليًا Google Analytics ولا نملك نظامًا منفصلًا لإدارة الموافقة على ملفات تعريف الارتباط.",
          "وبما أن خدمات خارجية مثل Google Maps وYouTube وGoogle Fonts مدمجة في الموقع، فمن الضروري إجراء مراجعة تقنية لملفات تعريف الارتباط والاتصالات وتقنيات التخزين المستخدمة فعليًا.",
          "عندما يكون ذلك مطلوبًا قانونًا، لا يجوز تفعيل التقنيات غير الضرورية إلا بعد الحصول على موافقة صحيحة.",
        ],
      },

      thirdParties: {
        title: "12. نقل البيانات إلى أطراف ثالثة",
        paragraphs: [
          "قد يتم نقل البيانات الشخصية إلى أطراف ثالثة عندما يكون ذلك ضروريًا لتوفير موقعنا الإلكتروني، أو التواصل مع المستخدمين، أو تنظيم الدورات، أو الوفاء بالالتزامات القانونية.",
          "يشمل مقدمو الخدمات الخارجيون لدينا، على وجه الخصوص، مزود الاستضافة Hostinger، وخدمة البريد الإلكتروني Resend، وخدمات Google المدمجة في الموقع.",
          "يعتمد ما إذا كانت البيانات ستُنقل وإلى أي مدى إلى دول خارج الاتحاد الأوروبي أو المنطقة الاقتصادية الأوروبية على الخدمات المستخدمة وإعداداتها المحددة، ويجب التحقق من ذلك استنادًا إلى الوثائق التعاقدية ووثائق الخصوصية ذات الصلة.",
        ],
      },

      storage: {
        title: "13. مدة الاحتفاظ بالبيانات",
        paragraphs: [
          "نحتفظ بالبيانات الشخصية فقط للمدة اللازمة لتحقيق الغرض من معالجتها.",
          "قد تتطلب الالتزامات القانونية المتعلقة بالاحتفاظ بالبيانات فترة تخزين أطول. وبعد انتهاء الغرض من المعالجة وانتهاء أي فترات احتفاظ قانونية واجبة التطبيق، يتم حذف البيانات أو تقييد معالجتها وفقًا للقانون المعمول به.",
        ],
      },

      rights: {
        title: "14. حقوقكم",
        introduction:
          "بموجب قوانين حماية البيانات المعمول بها، قد تتمتعون بالحقوق التالية، شريطة استيفاء المتطلبات القانونية الخاصة بكل حق:",

        items: [
          {
            title: "حق الوصول إلى البيانات:",
            text: "يمكنكم طلب معلومات حول ما إذا كنا نعالج بيانات شخصية تخصكم وما هي هذه البيانات.",
          },
          {
            title: "حق التصحيح:",
            text: "يمكنكم طلب تصحيح البيانات الشخصية غير الصحيحة أو استكمال البيانات غير المكتملة.",
          },
          {
            title: "حق الحذف:",
            text: "في ظل شروط قانونية معينة، يمكنكم طلب حذف بياناتكم الشخصية.",
          },
          {
            title: "حق تقييد المعالجة:",
            text: "في ظل شروط معينة، يمكنكم طلب تقييد معالجة بياناتكم الشخصية.",
          },
          {
            title: "حق نقل البيانات:",
            text: "وفقًا للمتطلبات القانونية، يمكنكم طلب الحصول على البيانات التي قدمتموها بصيغة منظمة.",
          },
          {
            title: "حق الاعتراض:",
            text: "يمكنكم الاعتراض على معالجة بياناتكم لأسباب تتعلق بوضعكم الخاص، متى توفرت المتطلبات القانونية لذلك.",
          },
          {
            title: "حق سحب الموافقة:",
            text: "يمكنكم سحب أي موافقة سبق أن منحتموها في أي وقت، ويكون السحب ساريًا بالنسبة للمستقبل.",
          },
          {
            title: "حق تقديم شكوى:",
            text: "يحق لكم تقديم شكوى إلى هيئة إشراف مختصة بحماية البيانات.",
          },
        ],
      },

      supervisoryAuthority: {
        title: "15. الحق في تقديم شكوى",
        paragraphs: [
          "يحق لكم تقديم شكوى إلى هيئة إشراف مختصة بحماية البيانات بشأن معالجة بياناتكم الشخصية.",
          "وقد تكون الهيئة المختصة، على وجه الخصوص، هي هيئة حماية البيانات في مكان إقامتكم المعتاد أو مكان عملكم أو المكان الذي يُدعى أن المخالفة قد وقعت فيه.",
        ],
      },

      privacyContact: {
        title: "16. التواصل بشأن حماية البيانات",
        paragraphs: [
          "إذا كانت لديكم أي أسئلة تتعلق بحماية البيانات أو بمعالجة بياناتكم الشخصية، يمكنكم التواصل معنا في أي وقت.",
        ],
        name: "German Language Institut GbR",
        address: "Berliner Platz 35–37",
        postalCode: "48143 Münster",
        country: "ألمانيا",
        email: "info@gli-ms.de",
      },
    },

    agb: {
      title: "الشروط والأحكام العامة",
      subtitle:
        "الشروط والأحكام الخاصة بالتسجيل والمشاركة في دورات اللغة الألمانية لدينا.",

      sections: [
        {
          title: "1. نطاق التطبيق",
          paragraphs: [
            "تسري هذه الشروط والأحكام العامة على المشاركة في دورات اللغة التي تقدمها German Language Institut GbR.",
          ],
        },

        {
          title: "2. الدورات المقدمة",
          paragraphs: [
            "نقدم دورات اللغة الألمانية للمستويات A1 وA2 وB1 وB2 وC1. ولا يتم تقديم دورة C2 حاليًا.",
            "بحسب نوع الدورة، يتم تقديم الدروس إما حضوريًا في مقر المعهد أو عبر الإنترنت. وتتراوح مدة الدورة بين 8 و16 أسبوعًا بحسب مستوى اللغة ونوع الدورة.",
          ],
        },

        {
          title: "3. التسجيل وإبرام العقد",
          paragraphs: [
            "يمكن التسجيل من خلال موقعنا الإلكتروني، أو شخصيًا في مقر المعهد، أو عبر البريد الإلكتروني.",
            "يصبح التسجيل ملزمًا فقط بعد استلام الدفعة المتفق عليها.",
          ],
        },

        {
          title: "4. رسوم الدورة والدفع",
          paragraphs: [
            "يتم دفع رسوم الدورة عن طريق التحويل البنكي. ويُعد دفع المبلغ المتفق عليه شرطًا أساسيًا لإتمام التسجيل بشكل ملزم.",
          ],
        },

        {
          title: "5. الإلغاء واسترداد الرسوم",
          subsections: [
            {
              title: "الإلغاء حتى 14 يومًا قبل بدء الدورة",
              text: "يمكن إلغاء التسجيل حتى 14 يومًا قبل تاريخ بدء الدورة. في هذه الحالة، يتم احتساب رسوم إلغاء بنسبة 20% من قيمة الدورة، ويتم رد نسبة 80% المتبقية.",
            },
            {
              title: "الإلغاء قبل أقل من 14 يومًا من بدء الدورة",
              text: "إذا تم إلغاء الدورة قبل أقل من 14 يومًا من تاريخ بدء الدورة، فلا يحق للمشارك استرداد رسوم الدورة وفقًا لشروط الدورة المذكورة.",
            },
          ],
        },

        {
          title: "6. الغياب عن الدروس",
          paragraphs: [
            "لا يمكن تعويض الدروس التي تم التغيب عنها. ولا يحق للمشاركين استرداد الرسوم أو الحصول على دروس بديلة عن الدروس التي تم التغيب عنها.",
          ],
        },

        {
          title: "7. الحد الأدنى لعدد المشاركين",
          paragraphs: [
            "الحد الأدنى لعدد المشاركين هو 12 شخصًا، بينما يبلغ الحد الأقصى لحجم المجموعة 20 شخصًا.",
            "إذا لم يتم الوصول إلى الحد الأدنى لعدد المشاركين، فلن يتم عقد الدورة. وإذا قام German Language Institut بإلغاء الدورة لهذا السبب، فسيتم رد جميع رسوم الدورة المدفوعة مسبقًا بالكامل.",
          ],
        },

        {
          title: "8. مواد الدورة",
          paragraphs: [
            "الكتب والمواد التعليمية الأخرى غير مشمولة في سعر الدورة، ويتعين على المشارك دفع تكلفتها بشكل منفصل.",
          ],
        },

        {
          title: "9. مواعيد الدروس والتغييرات التنظيمية",
          paragraphs: [
            "قد تختلف مواعيد الدروس المحددة ومدة الدورة والتفاصيل التنظيمية بحسب مستوى اللغة ونوع الدورة. وسيتم إبلاغ المشاركين بهذه التفاصيل قبل بدء الدورة.",
          ],
        },

        {
          title: "10. التواصل",
          paragraphs: [
            "German Language Institut GbR",
            "Berliner Platz 35–37, 48143 Münster",
            "البريد الإلكتروني: info@gli-ms.de",
          ],
        },
      ],
    },
  },
};

export default legalContent;
