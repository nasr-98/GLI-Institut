const courses = {
  en: [
    {
      id: "a1",
      title: "German Course — Level A1",
      level: "A1",

      duration: "8 Weeks",

      description:
        "Beginner-level course designed to help students build a strong foundation in German. Learn basic vocabulary, grammar, pronunciation, and everyday communication.",

      overview:
        "This course introduces the fundamentals of German and helps beginners communicate in simple everyday situations. Students progressively develop their vocabulary, grammar, pronunciation, listening, speaking, reading, and writing skills.",

      objectives: [
        "Understand and use basic German expressions and everyday phrases.",
        "Introduce yourself and provide basic personal information.",
        "Ask and answer simple questions in familiar situations.",
        "Build a practical basic German vocabulary.",
        "Understand essential German grammar structures.",
        "Improve basic pronunciation and listening comprehension.",
      ],

      topics: [
        "Alphabet & Pronunciation",
        "Greetings & Introductions",
        "Personal Information",
        "Numbers, Dates & Time",
        "Family & Friends",
        "Daily Routine",
        "Food & Drinks",
        "Shopping",
        "Home & City",
        "Grammar Basics",
      ],

      skills: [
        "Basic speaking",
        "Basic listening",
        "Reading simple texts",
        "Writing simple sentences",
        "Everyday communication",
      ],

      requirements: [
        "No previous German knowledge is required.",
        "Basic ability to read and write.",
      ],

      details: {
        format: "On-site / Online",
        lessons: "2–3 lessons per week",
        level: "Beginner",
        certificate: true,
      },

      curriculum: [
        {
          title: "Introduction to German",
          topics: ["Alphabet", "Pronunciation", "Greetings", "Introductions"],
        },
        {
          title: "Everyday German",
          topics: ["Family", "Numbers", "Time", "Daily routine"],
        },
        {
          title: "Practical Communication",
          topics: ["Shopping", "Food", "Directions", "Appointments"],
        },
        {
          title: "Grammar Foundations",
          topics: [
            "Articles",
            "Personal pronouns",
            "Basic verbs",
            "Sentence structure",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },

    {
      id: "a2",
      title: "German Course — Level A2",
      level: "A2",

      duration: "8 Weeks",

      description:
        "Elementary-level course focused on improving everyday communication, expanding vocabulary, and developing essential German grammar and speaking skills.",

      overview:
        "This course builds on A1 knowledge and enables students to communicate more independently in familiar everyday situations. Students expand their vocabulary and strengthen their grammar, speaking, listening, reading, and writing skills.",

      objectives: [
        "Communicate in common everyday situations with greater confidence.",
        "Describe experiences, routines, plans, and personal preferences.",
        "Understand the main information in short, clear conversations and texts.",
        "Expand vocabulary for everyday and practical situations.",
        "Use common German grammatical structures more accurately.",
        "Write short messages and simple connected texts.",
      ],

      topics: [
        "Everyday Communication",
        "Travel & Transportation",
        "Appointments & Plans",
        "Work & Education",
        "Health & Body",
        "Shopping & Services",
        "Past Experiences",
        "Future Plans",
        "Opinions & Preferences",
        "A2 Grammar",
      ],

      skills: [
        "Everyday conversation",
        "Listening for main information",
        "Reading short texts",
        "Writing short messages",
        "Describing experiences and plans",
      ],

      requirements: [
        "Basic German knowledge at approximately A1 level.",
        "Ability to understand and produce simple German sentences.",
      ],

      details: {
        format: "On-site / Online",
        lessons: "2–3 lessons per week",
        level: "Elementary",
        certificate: true,
      },

      curriculum: [
        {
          title: "Everyday Communication",
          topics: [
            "Daily conversations",
            "Appointments",
            "Plans",
            "Personal preferences",
          ],
        },
        {
          title: "Travel & Services",
          topics: ["Travel", "Transportation", "Hotels", "Public services"],
        },
        {
          title: "Experiences & Plans",
          topics: [
            "Past experiences",
            "Future plans",
            "Describing events",
            "Making arrangements",
          ],
        },
        {
          title: "A2 Grammar",
          topics: [
            "Past tense",
            "Modal verbs",
            "Subordinate clauses",
            "Common prepositions",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },

    {
      id: "b1",
      title: "German Course — Level B1",
      level: "B1",

      duration: "10 Weeks",

      description:
        "Intermediate-level course that develops your ability to communicate confidently in everyday and professional situations while improving grammar, vocabulary, listening, and speaking skills.",

      overview:
        "This intermediate course develops independent communication in familiar personal, social, and professional situations. Students work with longer texts and conversations while improving fluency, accuracy, vocabulary, grammar, listening, speaking, reading, and writing.",

      objectives: [
        "Communicate confidently in everyday and professional situations.",
        "Explain opinions, experiences, plans, and reasons in connected speech.",
        "Understand the main points of standard German conversations and texts.",
        "Participate in discussions on familiar topics.",
        "Write connected texts such as emails, descriptions, and personal statements.",
        "Use intermediate grammar and vocabulary with increasing accuracy.",
      ],

      topics: [
        "Work & Professional Life",
        "Education & Career",
        "Travel & Experiences",
        "Media & Communication",
        "Society & Everyday Life",
        "Opinions & Discussions",
        "Problems & Solutions",
        "Formal & Informal Communication",
        "Reading & Listening",
        "B1 Grammar",
      ],

      skills: [
        "Confident everyday speaking",
        "Listening comprehension",
        "Reading longer texts",
        "Connected writing",
        "Expressing opinions and arguments",
      ],

      requirements: [
        "German knowledge at approximately A2 level.",
        "Ability to communicate using basic everyday German.",
      ],

      details: {
        format: "On-site / Online",
        lessons: "2–3 lessons per week",
        level: "Intermediate",
        certificate: true,
      },

      curriculum: [
        {
          title: "Professional German",
          topics: [
            "Workplace communication",
            "Job applications",
            "Career",
            "Professional vocabulary",
          ],
        },
        {
          title: "Communication & Society",
          topics: ["Media", "Society", "Current topics", "Personal opinions"],
        },
        {
          title: "Discussion & Argumentation",
          topics: [
            "Expressing opinions",
            "Giving reasons",
            "Agreeing and disagreeing",
            "Finding solutions",
          ],
        },
        {
          title: "B1 Grammar",
          topics: [
            "Complex sentences",
            "Connectors",
            "Relative clauses",
            "Tenses",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },

    {
      id: "b2",
      title: "German Course — Level B2",
      level: "B2",

      duration: "10 Weeks",

      description:
        "Upper-intermediate course designed to improve fluency, advanced communication skills, and the ability to understand and express complex ideas in German.",

      overview:
        "This upper-intermediate course focuses on fluent and precise communication. Students work with more complex language, authentic-style texts and discussions, and develop the ability to express nuanced opinions and understand detailed spoken and written German.",

      objectives: [
        "Communicate fluently and spontaneously in a wide range of situations.",
        "Understand the main ideas and important details in complex texts and discussions.",
        "Express and defend opinions using clear arguments.",
        "Discuss abstract and professional topics with greater precision.",
        "Write structured and detailed texts for different purposes.",
        "Use advanced grammatical structures and a broader vocabulary accurately.",
      ],

      topics: [
        "Advanced Communication",
        "Professional German",
        "Presentations & Discussions",
        "Current Issues & Society",
        "Media & Culture",
        "Argumentation",
        "Complex Texts",
        "Formal Writing",
        "Advanced Vocabulary",
        "B2 Grammar",
      ],

      skills: [
        "Fluent speaking",
        "Advanced listening comprehension",
        "Complex reading comprehension",
        "Structured and detailed writing",
        "Argumentation and discussion",
      ],

      requirements: [
        "German knowledge at approximately B1 level.",
        "Ability to communicate independently in familiar German-speaking situations.",
      ],

      details: {
        format: "On-site / Online",
        lessons: "2–3 lessons per week",
        level: "Upper-intermediate",
        certificate: true,
      },

      curriculum: [
        {
          title: "Advanced Communication",
          topics: [
            "Fluent conversation",
            "Presentations",
            "Professional communication",
            "Advanced vocabulary",
          ],
        },
        {
          title: "Discussion & Argumentation",
          topics: ["Debates", "Arguments", "Opinions", "Complex discussions"],
        },
        {
          title: "Media & Society",
          topics: ["Current issues", "Culture", "Media", "Social topics"],
        },
        {
          title: "B2 Grammar & Writing",
          topics: [
            "Advanced sentence structures",
            "Formal writing",
            "Connectors",
            "Complex grammar",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },
    {
      id: "c1",
      title: "German Course — Level C1",
      level: "C1",
      duration: "12 Weeks",

      description:
        "Advanced German course designed to develop fluent, precise, and flexible communication. Students work with complex language, demanding texts, professional topics, and nuanced discussions.",

      overview:
        "This advanced course helps students communicate confidently and effectively in academic, professional, and social contexts. Students develop a high level of fluency, accuracy, vocabulary, comprehension, argumentation, and writing while working with complex authentic-style materials.",

      objectives: [
        "Communicate fluently and spontaneously with a high degree of accuracy.",
        "Understand complex spoken and written German, including implicit meanings and nuanced arguments.",
        "Express ideas clearly, precisely, and flexibly on complex topics.",
        "Participate actively and confidently in academic, professional, and social discussions.",
        "Present and defend detailed arguments using appropriate language and structure.",
        "Write well-structured, coherent, and sophisticated texts for different purposes.",
        "Expand advanced vocabulary, idiomatic expressions, and formal language.",
      ],

      topics: [
        "Advanced Communication",
        "Academic & Professional German",
        "Complex Discussions & Debates",
        "Presentations & Public Speaking",
        "Media & Current Issues",
        "Society, Culture & Politics",
        "Advanced Reading & Listening",
        "Formal & Academic Writing",
        "Idioms & Advanced Vocabulary",
        "C1 Grammar & Style",
      ],

      skills: [
        "Fluent and precise speaking",
        "Advanced listening comprehension",
        "Understanding complex texts",
        "Structured academic and professional writing",
        "Argumentation and critical discussion",
        "Presentations and public speaking",
        "Using nuanced and idiomatic language",
      ],

      requirements: [
        "German knowledge at approximately B2 level.",
        "Ability to communicate independently and confidently in German.",
        "Ability to understand longer and relatively complex German texts and conversations.",
      ],

      details: {
        format: "On-site / Online",
        lessons: "2–3 lessons per week",
        level: "Advanced",
        certificate: true,
      },

      curriculum: [
        {
          title: "Advanced Communication",
          topics: [
            "Fluent conversation",
            "Nuanced expression",
            "Idiomatic language",
            "Professional communication",
          ],
        },
        {
          title: "Academic & Professional German",
          topics: [
            "Presentations",
            "Academic vocabulary",
            "Professional discussions",
            "Formal communication",
          ],
        },
        {
          title: "Debate & Argumentation",
          topics: [
            "Complex discussions",
            "Developing arguments",
            "Supporting opinions",
            "Responding to opposing views",
          ],
        },
        {
          title: "C1 Grammar, Style & Writing",
          topics: [
            "Advanced sentence structures",
            "Formal and academic writing",
            "Connectors and discourse markers",
            "Stylistic variation",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },
  ],

  de: [
    {
      id: "a1",
      title: "Deutschkurs — Niveau A1",
      level: "A1",
      duration: "8 Wochen",

      description:
        "Deutschkurs für Anfänger, der Ihnen eine solide Grundlage in der deutschen Sprache vermittelt. Sie lernen grundlegenden Wortschatz, Grammatik, Aussprache und alltägliche Kommunikation.",

      overview:
        "Dieser Kurs vermittelt die Grundlagen der deutschen Sprache und hilft Anfängern, sich in einfachen Alltagssituationen zu verständigen. Schritt für Schritt entwickeln die Teilnehmer Wortschatz, Grammatik, Aussprache sowie Hör-, Sprech-, Lese- und Schreibfähigkeiten.",

      objectives: [
        "Grundlegende deutsche Ausdrücke und Redewendungen verstehen und verwenden.",
        "Sich vorstellen und grundlegende persönliche Informationen geben.",
        "Einfache Fragen in vertrauten Situationen stellen und beantworten.",
        "Einen praktischen Grundwortschatz aufbauen.",
        "Wichtige grammatische Strukturen des Deutschen verstehen.",
        "Aussprache und grundlegendes Hörverstehen verbessern.",
      ],

      topics: [
        "Alphabet & Aussprache",
        "Begrüßung & Vorstellung",
        "Persönliche Informationen",
        "Zahlen, Datum & Uhrzeit",
        "Familie & Freunde",
        "Tagesablauf",
        "Essen & Getränke",
        "Einkaufen",
        "Wohnen & Stadt",
        "Grundlagen der Grammatik",
      ],

      skills: [
        "Grundlegendes Sprechen",
        "Grundlegendes Hörverstehen",
        "Einfache Texte lesen",
        "Einfache Sätze schreiben",
        "Alltägliche Kommunikation",
      ],

      requirements: [
        "Keine Vorkenntnisse der deutschen Sprache erforderlich.",
        "Grundlegende Lese- und Schreibkenntnisse.",
      ],

      details: {
        format: "Präsenz / Online",
        lessons: "2–3 Unterrichtseinheiten pro Woche",
        level: "Anfänger",
        certificate: true,
      },

      curriculum: [
        {
          title: "Einführung in die deutsche Sprache",
          topics: ["Alphabet", "Aussprache", "Begrüßung", "Vorstellung"],
        },
        {
          title: "Deutsch im Alltag",
          topics: ["Familie", "Zahlen", "Uhrzeit", "Tagesablauf"],
        },
        {
          title: "Praktische Kommunikation",
          topics: ["Einkaufen", "Essen", "Wegbeschreibung", "Termine"],
        },
        {
          title: "Grundlagen der Grammatik",
          topics: [
            "Artikel",
            "Personalpronomen",
            "Grundlegende Verben",
            "Satzstruktur",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },

    {
      id: "a2",
      title: "Deutschkurs — Niveau A2",
      level: "A2",
      duration: "8 Wochen",

      description:
        "Grundstufenkurs zur Verbesserung der alltäglichen Kommunikation. Sie erweitern Ihren Wortschatz und entwickeln wichtige Kenntnisse in Grammatik und Sprechen.",

      overview:
        "Dieser Kurs baut auf den A1-Kenntnissen auf und ermöglicht eine selbstständigere Kommunikation in vertrauten Alltagssituationen. Die Teilnehmer erweitern ihren Wortschatz und verbessern Grammatik, Sprechen, Hörverstehen, Lesen und Schreiben.",

      objectives: [
        "In häufigen Alltagssituationen sicherer kommunizieren.",
        "Erfahrungen, Routinen, Pläne und persönliche Vorlieben beschreiben.",
        "Die wichtigsten Informationen aus kurzen Gesprächen und Texten verstehen.",
        "Den Wortschatz für alltägliche und praktische Situationen erweitern.",
        "Häufige grammatische Strukturen sicherer anwenden.",
        "Kurze Nachrichten und zusammenhängende einfache Texte schreiben.",
      ],

      topics: [
        "Alltagskommunikation",
        "Reisen & Verkehr",
        "Termine & Pläne",
        "Arbeit & Bildung",
        "Gesundheit & Körper",
        "Einkaufen & Dienstleistungen",
        "Vergangene Erlebnisse",
        "Zukünftige Pläne",
        "Meinungen & Vorlieben",
        "A2-Grammatik",
      ],

      skills: [
        "Alltagsgespräche",
        "Hörverstehen von Hauptinformationen",
        "Kurze Texte lesen",
        "Kurze Nachrichten schreiben",
        "Erfahrungen und Pläne beschreiben",
      ],

      requirements: [
        "Grundkenntnisse der deutschen Sprache auf etwa A1-Niveau.",
        "Fähigkeit, einfache deutsche Sätze zu verstehen und zu bilden.",
      ],

      details: {
        format: "Präsenz / Online",
        lessons: "2–3 Unterrichtseinheiten pro Woche",
        level: "Grundstufe",
        certificate: true,
      },

      curriculum: [
        {
          title: "Alltagskommunikation",
          topics: [
            "Alltagsgespräche",
            "Termine",
            "Pläne",
            "Persönliche Vorlieben",
          ],
        },
        {
          title: "Reisen & Dienstleistungen",
          topics: ["Reisen", "Verkehr", "Hotels", "Dienstleistungen"],
        },
        {
          title: "Erfahrungen & Pläne",
          topics: [
            "Vergangene Erlebnisse",
            "Zukünftige Pläne",
            "Ereignisse beschreiben",
            "Vereinbarungen",
          ],
        },
        {
          title: "A2-Grammatik",
          topics: [
            "Vergangenheit",
            "Modalverben",
            "Nebensätze",
            "Präpositionen",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },

    {
      id: "b1",
      title: "Deutschkurs — Niveau B1",
      level: "B1",
      duration: "10 Wochen",

      description:
        "Mittelstufenkurs, der Ihre Fähigkeit verbessert, sicher in alltäglichen und beruflichen Situationen zu kommunizieren. Sie erweitern dabei Ihre Grammatik-, Wortschatz-, Hör- und Sprechkenntnisse.",

      overview:
        "Dieser Mittelstufenkurs entwickelt die selbstständige Kommunikation in vertrauten persönlichen, sozialen und beruflichen Situationen. Die Teilnehmer arbeiten mit längeren Texten und Gesprächen und verbessern dabei Sprachfluss, Genauigkeit, Wortschatz, Grammatik sowie Hör-, Sprech-, Lese- und Schreibfähigkeiten.",

      objectives: [
        "Sicher in alltäglichen und beruflichen Situationen kommunizieren.",
        "Meinungen, Erfahrungen, Pläne und Gründe zusammenhängend ausdrücken.",
        "Die Hauptpunkte von Gesprächen und Texten in Standardsprache verstehen.",
        "An Diskussionen über vertraute Themen teilnehmen.",
        "Zusammenhängende Texte wie E-Mails und Beschreibungen schreiben.",
        "Grammatik und Wortschatz auf mittlerem Niveau sicherer anwenden.",
      ],

      topics: [
        "Arbeit & Berufsleben",
        "Bildung & Karriere",
        "Reisen & Erfahrungen",
        "Medien & Kommunikation",
        "Gesellschaft & Alltag",
        "Meinungen & Diskussionen",
        "Probleme & Lösungen",
        "Formelle & informelle Kommunikation",
        "Lesen & Hörverstehen",
        "B1-Grammatik",
      ],

      skills: [
        "Sicheres Sprechen im Alltag",
        "Hörverstehen",
        "Lesen längerer Texte",
        "Zusammenhängendes Schreiben",
        "Meinungen und Argumente ausdrücken",
      ],

      requirements: [
        "Deutschkenntnisse auf etwa A2-Niveau.",
        "Fähigkeit, sich auf Deutsch in grundlegenden Alltagssituationen zu verständigen.",
      ],

      details: {
        format: "Präsenz / Online",
        lessons: "2–3 Unterrichtseinheiten pro Woche",
        level: "Mittelstufe",
        certificate: true,
      },

      curriculum: [
        {
          title: "Berufsdeutsch",
          topics: [
            "Kommunikation am Arbeitsplatz",
            "Bewerbungen",
            "Karriere",
            "Beruflicher Wortschatz",
          ],
        },
        {
          title: "Kommunikation & Gesellschaft",
          topics: [
            "Medien",
            "Gesellschaft",
            "Aktuelle Themen",
            "Eigene Meinungen",
          ],
        },
        {
          title: "Diskussion & Argumentation",
          topics: [
            "Meinungen ausdrücken",
            "Begründungen",
            "Zustimmen und widersprechen",
            "Lösungen finden",
          ],
        },
        {
          title: "B1-Grammatik",
          topics: [
            "Komplexe Sätze",
            "Konnektoren",
            "Relativsätze",
            "Zeitformen",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },

    {
      id: "b2",
      title: "Deutschkurs — Niveau B2",
      level: "B2",
      duration: "10 Wochen",

      description:
        "Fortgeschrittener Kurs zur Verbesserung Ihrer Sprachkompetenz und Kommunikationsfähigkeit. Sie lernen, komplexe Inhalte auf Deutsch sicher zu verstehen und auszudrücken.",

      overview:
        "Dieser Kurs auf der oberen Mittelstufe konzentriert sich auf flüssige und präzise Kommunikation. Die Teilnehmer arbeiten mit komplexerer Sprache, anspruchsvollen Texten und Diskussionen und lernen, differenzierte Meinungen auszudrücken sowie detaillierte Inhalte zu verstehen.",

      objectives: [
        "Flüssig und spontan in verschiedenen Situationen kommunizieren.",
        "Hauptaussagen und wichtige Details komplexer Texte und Diskussionen verstehen.",
        "Meinungen mit klaren Argumenten ausdrücken und vertreten.",
        "Abstrakte und berufliche Themen präzise diskutieren.",
        "Strukturierte und detaillierte Texte für verschiedene Zwecke schreiben.",
        "Fortgeschrittene grammatische Strukturen und einen erweiterten Wortschatz sicher anwenden.",
      ],

      topics: [
        "Fortgeschrittene Kommunikation",
        "Berufsdeutsch",
        "Präsentationen & Diskussionen",
        "Aktuelle Themen & Gesellschaft",
        "Medien & Kultur",
        "Argumentation",
        "Komplexe Texte",
        "Formelles Schreiben",
        "Fortgeschrittener Wortschatz",
        "B2-Grammatik",
      ],

      skills: [
        "Flüssiges Sprechen",
        "Fortgeschrittenes Hörverstehen",
        "Komplexes Leseverstehen",
        "Strukturiertes und detailliertes Schreiben",
        "Argumentation und Diskussion",
      ],

      requirements: [
        "Deutschkenntnisse auf etwa B1-Niveau.",
        "Fähigkeit, sich in vertrauten deutschsprachigen Situationen selbstständig zu verständigen.",
      ],

      details: {
        format: "Präsenz / Online",
        lessons: "2–3 Unterrichtseinheiten pro Woche",
        level: "Obere Mittelstufe",
        certificate: true,
      },

      curriculum: [
        {
          title: "Fortgeschrittene Kommunikation",
          topics: [
            "Flüssige Gespräche",
            "Präsentationen",
            "Berufliche Kommunikation",
            "Fortgeschrittener Wortschatz",
          ],
        },
        {
          title: "Diskussion & Argumentation",
          topics: [
            "Debatten",
            "Argumente",
            "Meinungen",
            "Komplexe Diskussionen",
          ],
        },
        {
          title: "Medien & Gesellschaft",
          topics: [
            "Aktuelle Themen",
            "Kultur",
            "Medien",
            "Gesellschaftliche Themen",
          ],
        },
        {
          title: "B2-Grammatik & Schreiben",
          topics: [
            "Fortgeschrittene Satzstrukturen",
            "Formelles Schreiben",
            "Konnektoren",
            "Komplexe Grammatik",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },
    {
      id: "c1",
      title: "Deutschkurs — Niveau C1",
      level: "C1",
      duration: "12 Wochen",

      description:
        "Fortgeschrittener Deutschkurs zur Entwicklung einer flüssigen, präzisen und flexiblen Kommunikation. Die Teilnehmer arbeiten mit komplexer Sprache, anspruchsvollen Texten, beruflichen Themen und differenzierten Diskussionen.",

      overview:
        "Dieser fortgeschrittene Kurs hilft den Teilnehmern, sich sicher und wirkungsvoll in akademischen, beruflichen und gesellschaftlichen Situationen auszudrücken. Dabei werden Sprachfluss, Genauigkeit, Wortschatz, Hör- und Leseverstehen, Argumentation und Schreiben auf hohem Niveau weiterentwickelt.",

      objectives: [
        "Flüssig und spontan mit hoher sprachlicher Genauigkeit kommunizieren.",
        "Komplexe gesprochene und geschriebene Texte einschließlich impliziter Bedeutungen verstehen.",
        "Komplexe Inhalte klar, präzise und flexibel ausdrücken.",
        "Aktiv und sicher an akademischen, beruflichen und gesellschaftlichen Diskussionen teilnehmen.",
        "Detaillierte Argumente strukturiert präsentieren und vertreten.",
        "Gut strukturierte, zusammenhängende und anspruchsvolle Texte für verschiedene Zwecke verfassen.",
        "Fortgeschrittenen Wortschatz, Redewendungen und formelle Ausdrucksweisen erweitern.",
      ],

      topics: [
        "Fortgeschrittene Kommunikation",
        "Akademisches & berufliches Deutsch",
        "Komplexe Diskussionen & Debatten",
        "Präsentationen & freies Sprechen",
        "Medien & aktuelle Themen",
        "Gesellschaft, Kultur & Politik",
        "Fortgeschrittenes Lesen & Hörverstehen",
        "Formelles & akademisches Schreiben",
        "Redewendungen & fortgeschrittener Wortschatz",
        "C1-Grammatik & Sprachstil",
      ],

      skills: [
        "Flüssiges und präzises Sprechen",
        "Fortgeschrittenes Hörverstehen",
        "Verstehen komplexer Texte",
        "Strukturiertes akademisches und berufliches Schreiben",
        "Argumentation und anspruchsvolle Diskussion",
        "Präsentationen und freies Sprechen",
        "Verwendung differenzierter und idiomatischer Sprache",
      ],

      requirements: [
        "Deutschkenntnisse auf etwa B2-Niveau.",
        "Fähigkeit, sich selbstständig und sicher auf Deutsch zu verständigen.",
        "Fähigkeit, längere und relativ komplexe deutsche Texte und Gespräche zu verstehen.",
      ],

      details: {
        format: "Präsenz / Online",
        lessons: "2–3 Unterrichtseinheiten pro Woche",
        level: "Fortgeschritten",
        certificate: true,
      },

      curriculum: [
        {
          title: "Fortgeschrittene Kommunikation",
          topics: [
            "Flüssige Gespräche",
            "Differenzierter Ausdruck",
            "Redewendungen",
            "Berufliche Kommunikation",
          ],
        },
        {
          title: "Akademisches & berufliches Deutsch",
          topics: [
            "Präsentationen",
            "Akademischer Wortschatz",
            "Berufliche Diskussionen",
            "Formelle Kommunikation",
          ],
        },
        {
          title: "Debatte & Argumentation",
          topics: [
            "Komplexe Diskussionen",
            "Argumente entwickeln",
            "Meinungen begründen",
            "Auf Gegenpositionen reagieren",
          ],
        },
        {
          title: "C1-Grammatik, Stil & Schreiben",
          topics: [
            "Fortgeschrittene Satzstrukturen",
            "Formelles und akademisches Schreiben",
            "Konnektoren und Diskursmarker",
            "Stilistische Variation",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },
  ],

  ar: [
    {
      id: "a1",
      title: "دورة اللغة الألمانية — المستوى A1",
      level: "A1",
      duration: "8 أسابيع",

      description:
        "دورة للمبتدئين تهدف إلى بناء أساس قوي في اللغة الألمانية. ستتعلم المفردات الأساسية والقواعد والنطق ومهارات التواصل في المواقف اليومية.",

      overview:
        "تقدم هذه الدورة أساسيات اللغة الألمانية وتساعد المبتدئين على التواصل في المواقف اليومية البسيطة. يتطور الطالب تدريجياً في المفردات والقواعد والنطق والاستماع والتحدث والقراءة والكتابة.",

      objectives: [
        "فهم واستخدام العبارات والتعبيرات الألمانية الأساسية.",
        "التعريف بالنفس وتقديم المعلومات الشخصية الأساسية.",
        "طرح الأسئلة البسيطة والإجابة عنها في المواقف المألوفة.",
        "بناء حصيلة أساسية وعملية من المفردات الألمانية.",
        "فهم أهم القواعد الأساسية في اللغة الألمانية.",
        "تحسين النطق ومهارات الاستماع الأساسية.",
      ],

      topics: [
        "الأبجدية والنطق",
        "التحية والتعريف بالنفس",
        "المعلومات الشخصية",
        "الأرقام والتاريخ والوقت",
        "العائلة والأصدقاء",
        "الروتين اليومي",
        "الطعام والشراب",
        "التسوق",
        "المنزل والمدينة",
        "أساسيات القواعد",
      ],

      skills: [
        "التحدث الأساسي",
        "الاستماع الأساسي",
        "قراءة النصوص البسيطة",
        "كتابة الجمل البسيطة",
        "التواصل في الحياة اليومية",
      ],

      requirements: [
        "لا يشترط وجود معرفة سابقة باللغة الألمانية.",
        "القدرة الأساسية على القراءة والكتابة.",
      ],

      details: {
        format: "حضوري / أونلاين",
        lessons: "2–3 حصص أسبوعياً",
        level: "مبتدئ",
        certificate: true,
      },

      curriculum: [
        {
          title: "مقدمة في اللغة الألمانية",
          topics: ["الأبجدية", "النطق", "التحية", "التعريف بالنفس"],
        },
        {
          title: "الألمانية في الحياة اليومية",
          topics: ["العائلة", "الأرقام", "الوقت", "الروتين اليومي"],
        },
        {
          title: "التواصل العملي",
          topics: ["التسوق", "الطعام", "الاتجاهات", "المواعيد"],
        },
        {
          title: "أساسيات القواعد",
          topics: [
            "أدوات التعريف",
            "الضمائر الشخصية",
            "الأفعال الأساسية",
            "بنية الجملة",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },

    {
      id: "a2",
      title: "دورة اللغة الألمانية — المستوى A2",
      level: "A2",
      duration: "8 أسابيع",

      description:
        "دورة للمستوى الأساسي تركز على تحسين القدرة على التواصل في الحياة اليومية، وتوسيع المفردات، وتطوير المهارات الأساسية في قواعد اللغة الألمانية والتحدث.",

      overview:
        "تبني هذه الدورة على مهارات المستوى A1 وتساعد الطالب على التواصل باستقلالية أكبر في المواقف اليومية المألوفة. كما تعمل على توسيع المفردات وتطوير القواعد والتحدث والاستماع والقراءة والكتابة.",

      objectives: [
        "التواصل بثقة أكبر في المواقف اليومية الشائعة.",
        "وصف التجارب والعادات والخطط والتفضيلات الشخصية.",
        "فهم المعلومات الرئيسية في المحادثات والنصوص القصيرة والواضحة.",
        "توسيع المفردات الخاصة بالمواقف اليومية والعملية.",
        "استخدام التراكيب والقواعد الألمانية الشائعة بدقة أكبر.",
        "كتابة رسائل قصيرة ونصوص بسيطة مترابطة.",
      ],

      topics: [
        "التواصل اليومي",
        "السفر والمواصلات",
        "المواعيد والخطط",
        "العمل والتعليم",
        "الصحة والجسم",
        "التسوق والخدمات",
        "التجارب السابقة",
        "الخطط المستقبلية",
        "الآراء والتفضيلات",
        "قواعد المستوى A2",
      ],

      skills: [
        "المحادثة اليومية",
        "فهم المعلومات الرئيسية عند الاستماع",
        "قراءة النصوص القصيرة",
        "كتابة الرسائل القصيرة",
        "وصف التجارب والخطط",
      ],

      requirements: [
        "معرفة أساسية باللغة الألمانية بمستوى يقارب A1.",
        "القدرة على فهم وإنتاج الجمل الألمانية البسيطة.",
      ],

      details: {
        format: "حضوري / أونلاين",
        lessons: "2–3 حصص أسبوعياً",
        level: "المستوى الأساسي",
        certificate: true,
      },

      curriculum: [
        {
          title: "التواصل اليومي",
          topics: [
            "المحادثات اليومية",
            "المواعيد",
            "الخطط",
            "التفضيلات الشخصية",
          ],
        },
        {
          title: "السفر والخدمات",
          topics: ["السفر", "المواصلات", "الفنادق", "الخدمات"],
        },
        {
          title: "التجارب والخطط",
          topics: [
            "التجارب السابقة",
            "الخطط المستقبلية",
            "وصف الأحداث",
            "تنظيم المواعيد",
          ],
        },
        {
          title: "قواعد A2",
          topics: [
            "زمن الماضي",
            "الأفعال الناقصة",
            "الجمل الثانوية",
            "حروف الجر",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },

    {
      id: "b1",
      title: "دورة اللغة الألمانية — المستوى B1",
      level: "B1",
      duration: "10 أسابيع",

      description:
        "دورة للمستوى المتوسط تساعدك على التواصل بثقة في المواقف اليومية والمهنية، مع تطوير مهارات القواعد والمفردات والاستماع والتحدث باللغة الألمانية.",

      overview:
        "تعمل هذه الدورة المتوسطة على تطوير القدرة على التواصل باستقلالية في المواقف الشخصية والاجتماعية والمهنية المألوفة. يتعامل الطالب مع نصوص ومحادثات أطول مع تطوير الطلاقة والدقة والمفردات والقواعد والاستماع والتحدث والقراءة والكتابة.",

      objectives: [
        "التواصل بثقة في المواقف اليومية والمهنية.",
        "التعبير عن الآراء والتجارب والخطط والأسباب بطريقة مترابطة.",
        "فهم الأفكار الرئيسية في المحادثات والنصوص باللغة الألمانية القياسية.",
        "المشاركة في النقاشات حول الموضوعات المألوفة.",
        "كتابة نصوص مترابطة مثل رسائل البريد الإلكتروني والوصف.",
        "استخدام القواعد والمفردات في المستوى المتوسط بدقة متزايدة.",
      ],

      topics: [
        "العمل والحياة المهنية",
        "التعليم والمسار المهني",
        "السفر والتجارب",
        "الإعلام والتواصل",
        "المجتمع والحياة اليومية",
        "الآراء والنقاشات",
        "المشكلات والحلول",
        "التواصل الرسمي وغير الرسمي",
        "القراءة والاستماع",
        "قواعد المستوى B1",
      ],

      skills: [
        "التحدث بثقة في الحياة اليومية",
        "فهم الاستماع",
        "قراءة النصوص الأطول",
        "الكتابة المترابطة",
        "التعبير عن الآراء والحجج",
      ],

      requirements: [
        "معرفة باللغة الألمانية بمستوى يقارب A2.",
        "القدرة على التواصل الأساسي باللغة الألمانية في مواقف الحياة اليومية.",
      ],

      details: {
        format: "حضوري / أونلاين",
        lessons: "2–3 حصص أسبوعياً",
        level: "متوسط",
        certificate: true,
      },

      curriculum: [
        {
          title: "الألمانية المهنية",
          topics: [
            "التواصل في مكان العمل",
            "طلبات التوظيف",
            "المسار المهني",
            "المفردات المهنية",
          ],
        },
        {
          title: "التواصل والمجتمع",
          topics: ["الإعلام", "المجتمع", "القضايا المعاصرة", "الآراء الشخصية"],
        },
        {
          title: "النقاش وبناء الحجج",
          topics: [
            "التعبير عن الرأي",
            "تقديم الأسباب",
            "الموافقة والاختلاف",
            "إيجاد الحلول",
          ],
        },
        {
          title: "قواعد B1",
          topics: ["الجمل المعقدة", "أدوات الربط", "الجمل الموصولة", "الأزمنة"],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },

    {
      id: "b2",
      title: "دورة اللغة الألمانية — المستوى B2",
      level: "B2",
      duration: "10 أسابيع",

      description:
        "دورة للمستوى فوق المتوسط تهدف إلى تطوير الطلاقة ومهارات التواصل المتقدمة، وتمكينك من فهم الأفكار والمحتوى المعقد والتعبير عنها باللغة الألمانية.",

      overview:
        "تركز هذه الدورة للمستوى فوق المتوسط على التواصل بطلاقة ودقة أكبر. يتعامل الطالب مع لغة أكثر تعقيداً ونصوص ومناقشات متقدمة، ويتعلم التعبير عن الآراء الدقيقة وفهم المحتوى الألماني المنطوق والمكتوب بتفاصيل أكبر.",

      objectives: [
        "التواصل بطلاقة وبشكل عفوي في مجموعة واسعة من المواقف.",
        "فهم الأفكار الرئيسية والتفاصيل المهمة في النصوص والمناقشات المعقدة.",
        "التعبير عن الآراء والدفاع عنها باستخدام حجج واضحة.",
        "مناقشة الموضوعات المجردة والمهنية بدقة أكبر.",
        "كتابة نصوص منظمة ومفصلة لأغراض مختلفة.",
        "استخدام التراكيب النحوية المتقدمة والمفردات الموسعة بدقة.",
      ],

      topics: [
        "التواصل المتقدم",
        "اللغة الألمانية المهنية",
        "العروض التقديمية والنقاشات",
        "القضايا المعاصرة والمجتمع",
        "الإعلام والثقافة",
        "بناء الحجج",
        "النصوص المعقدة",
        "الكتابة الرسمية",
        "المفردات المتقدمة",
        "قواعد المستوى B2",
      ],

      skills: [
        "التحدث بطلاقة",
        "فهم الاستماع المتقدم",
        "فهم النصوص المعقدة",
        "الكتابة المنظمة والمفصلة",
        "النقاش وبناء الحجج",
      ],

      requirements: [
        "معرفة باللغة الألمانية بمستوى يقارب B1.",
        "القدرة على التواصل بشكل مستقل في المواقف الألمانية المألوفة.",
      ],

      details: {
        format: "حضوري / أونلاين",
        lessons: "2–3 حصص أسبوعياً",
        level: "فوق المتوسط",
        certificate: true,
      },

      curriculum: [
        {
          title: "التواصل المتقدم",
          topics: [
            "المحادثة بطلاقة",
            "العروض التقديمية",
            "التواصل المهني",
            "المفردات المتقدمة",
          ],
        },
        {
          title: "النقاش وبناء الحجج",
          topics: ["المناظرات", "الحجج", "الآراء", "النقاشات المعقدة"],
        },
        {
          title: "الإعلام والمجتمع",
          topics: [
            "القضايا المعاصرة",
            "الثقافة",
            "الإعلام",
            "القضايا الاجتماعية",
          ],
        },
        {
          title: "قواعد B2 والكتابة",
          topics: [
            "تراكيب الجمل المتقدمة",
            "الكتابة الرسمية",
            "أدوات الربط",
            "القواعد المعقدة",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },
    {
      id: "c1",
      title: "دورة اللغة الألمانية — المستوى C1",
      level: "C1",
      duration: "12 أسبوعًا",

      description:
        "دورة متقدمة في اللغة الألمانية تهدف إلى تطوير القدرة على التواصل بطلاقة ودقة ومرونة. يتعامل الطالب مع اللغة المعقدة والنصوص المتقدمة والموضوعات المهنية والنقاشات المتعمقة.",

      overview:
        "تساعد هذه الدورة المتقدمة الطالب على التواصل بثقة وفعالية في السياقات الأكاديمية والمهنية والاجتماعية. كما تعمل على تطوير الطلاقة والدقة والمفردات وفهم النصوص المسموعة والمقروءة والقدرة على بناء الحجج والكتابة بمستوى متقدم.",

      objectives: [
        "التواصل بطلاقة وعفوية مع مستوى عالٍ من الدقة اللغوية.",
        "فهم النصوص الألمانية المعقدة المسموعة والمكتوبة، بما في ذلك المعاني الضمنية والحجج الدقيقة.",
        "التعبير عن الأفكار المعقدة بوضوح ودقة ومرونة.",
        "المشاركة بفعالية وثقة في النقاشات الأكاديمية والمهنية والاجتماعية.",
        "عرض الحجج التفصيلية والدفاع عنها بطريقة منظمة ومقنعة.",
        "كتابة نصوص مترابطة ومنظمة ومتقدمة لأغراض مختلفة.",
        "توسيع المفردات المتقدمة والتعبيرات الاصطلاحية واللغة الرسمية.",
      ],

      topics: [
        "التواصل المتقدم",
        "اللغة الألمانية الأكاديمية والمهنية",
        "النقاشات والمناظرات المعقدة",
        "العروض التقديمية والتحدث أمام الجمهور",
        "الإعلام والقضايا المعاصرة",
        "المجتمع والثقافة والسياسة",
        "القراءة والاستماع المتقدم",
        "الكتابة الرسمية والأكاديمية",
        "التعبيرات الاصطلاحية والمفردات المتقدمة",
        "قواعد وأسلوب المستوى C1",
      ],

      skills: [
        "التحدث بطلاقة ودقة",
        "فهم الاستماع المتقدم",
        "فهم النصوص المعقدة",
        "الكتابة الأكاديمية والمهنية المنظمة",
        "بناء الحجج والمناقشة المتقدمة",
        "العروض التقديمية والتحدث أمام الجمهور",
        "استخدام لغة دقيقة ومتنوعة وتعبيرات اصطلاحية",
      ],

      requirements: [
        "معرفة باللغة الألمانية بمستوى يقارب B2.",
        "القدرة على التواصل بشكل مستقل وواثق باللغة الألمانية.",
        "القدرة على فهم النصوص والمحادثات الألمانية الطويلة والمعقدة نسبيًا.",
      ],

      details: {
        format: "حضوري / أونلاين",
        lessons: "2–3 حصص أسبوعيًا",
        level: "متقدم",
        certificate: true,
      },

      curriculum: [
        {
          title: "التواصل المتقدم",
          topics: [
            "المحادثة بطلاقة",
            "التعبير الدقيق والمتنوع",
            "التعبيرات الاصطلاحية",
            "التواصل المهني",
          ],
        },
        {
          title: "الألمانية الأكاديمية والمهنية",
          topics: [
            "العروض التقديمية",
            "المفردات الأكاديمية",
            "النقاشات المهنية",
            "التواصل الرسمي",
          ],
        },
        {
          title: "المناظرة وبناء الحجج",
          topics: [
            "النقاشات المعقدة",
            "تطوير الحجج",
            "دعم الآراء",
            "الرد على وجهات النظر المخالفة",
          ],
        },
        {
          title: "قواعد C1 والأسلوب والكتابة",
          topics: [
            "تراكيب الجمل المتقدمة",
            "الكتابة الرسمية والأكاديمية",
            "أدوات الربط وعلامات الخطاب",
            "التنوع الأسلوبي",
          ],
        },
      ],

      registration: {
        available: true,
        link: "/register",
      },
    },
  ],
};

export default courses;
