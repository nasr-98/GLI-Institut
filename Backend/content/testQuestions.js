/*
 * ============================================================
 * GLI - Teste dein Deutsch
 * Backend Question Pool
 *
 * IMPORTANT:
 * This file MUST stay on the backend.
 * Never import this file from the React frontend.
 *
 * The frontend must never receive:
 * - correct_option_id
 * - explanation
 * - difficulty
 * - points
 * ============================================================
 */

const createQuestion = ({
  id,
  level,
  category,
  type,
  question,
  context_text = null,
  options,
  correctIndex,
  difficulty,
  points = 1,
}) => {
  const optionObjects = options.map((text, index) => ({
    id: `${id.toLowerCase()}_opt_${index + 1}`,
    text,
  }));

  return {
    id,
    level,
    category,
    type,
    question,
    context_text,
    options: optionObjects,
    correct_option_id: optionObjects[correctIndex].id,
    explanation: "",
    difficulty,
    points,
    active: true,
    version: 1,
  };
};

const testQuestions = [
  // ==========================================================
  // A1
  // ==========================================================

  createQuestion({
    id: "A1_01",
    level: "A1",
    category: "Verbkonjugation",
    type: "gap_choice",
    difficulty: 1,
    question: "Meine Schwester ___ in Köln.",
    options: ["wohnen", "wohnt", "wohnst", "gewohnt"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "A1_02",
    level: "A1",
    category: "Artikel / Akkusativ",
    type: "gap_choice",
    difficulty: 1,
    question: "Ich möchte ___ Kaffee, bitte.",
    options: ["ein", "eine", "einen", "einem"],
    correctIndex: 2,
  }),

  createQuestion({
    id: "A1_03",
    level: "A1",
    category: "Possessivartikel",
    type: "gap_choice",
    difficulty: 1,
    question: "Das ist Anna. ___ Bruder studiert Medizin.",
    options: ["Sein", "Dein", "Ihr", "Mein"],
    correctIndex: 2,
  }),

  createQuestion({
    id: "A1_04",
    level: "A1",
    category: "Modalverben",
    type: "gap_choice",
    difficulty: 1,
    question: "Heute ___ ich bis 18 Uhr arbeiten.",
    options: ["muss", "musst", "müssen", "gemusst"],
    correctIndex: 0,
  }),

  createQuestion({
    id: "A1_05",
    level: "A1",
    category: "Präpositionen / Uhrzeit",
    type: "gap_choice",
    difficulty: 1,
    question: "Der Deutschkurs beginnt ___ 9:30 Uhr.",
    options: ["an", "im", "um", "zu"],
    correctIndex: 2,
  }),

  createQuestion({
    id: "A1_06",
    level: "A1",
    category: "Alltagswortschatz",
    type: "multiple_choice",
    difficulty: 1,
    question: "Du brauchst ein Medikament gegen Kopfschmerzen. Wohin gehst du?",
    options: [
      "in die Apotheke",
      "in die Bäckerei",
      "zur Post",
      "in die Bibliothek",
    ],
    correctIndex: 0,
  }),

  createQuestion({
    id: "A1_07",
    level: "A1",
    category: "Leseverständnis",
    type: "multiple_choice",
    difficulty: 1,
    context_text:
      "Praxis Dr. Klein\nMittwoch: 08:00–12:00 Uhr\nDonnerstag: 14:00–18:00 Uhr\nFreitag: geschlossen",
    question: "Wann ist die Praxis geöffnet?",
    options: [
      "Mittwoch um 14:00 Uhr",
      "Donnerstag um 16:00 Uhr",
      "Freitag um 10:00 Uhr",
      "Donnerstag um 19:00 Uhr",
    ],
    correctIndex: 1,
  }),

  // ==========================================================
  // A2
  // ==========================================================

  createQuestion({
    id: "A2_01",
    level: "A2",
    category: "Perfekt",
    type: "gap_choice",
    difficulty: 2,
    question: "Letztes Wochenende ___ wir nach Hamburg gefahren.",
    options: ["haben", "sind", "werden", "waren"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "A2_02",
    level: "A2",
    category: "Dativ / Präposition",
    type: "gap_choice",
    difficulty: 2,
    question: "Ich fahre jeden Morgen mit ___ Bus zur Arbeit.",
    options: ["der", "den", "dem", "des"],
    correctIndex: 2,
  }),

  createQuestion({
    id: "A2_03",
    level: "A2",
    category: "Adjektivdeklination",
    type: "gap_choice",
    difficulty: 2,
    question: "Sie sucht einen ___ Mantel für den Winter.",
    options: ["warmer", "warmen", "warmes", "warme"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "A2_04",
    level: "A2",
    category: "Nebensatz mit weil",
    type: "gap_choice",
    difficulty: 2,
    question: "Ich bleibe heute zu Hause, weil ich mich nicht gut ___.",
    options: ["fühle", "fühlt", "fühlen", "gefühlt"],
    correctIndex: 0,
  }),

  createQuestion({
    id: "A2_05",
    level: "A2",
    category: "Komparativ",
    type: "gap_choice",
    difficulty: 2,
    question: "Mein neues Zimmer ist viel ___ als das alte.",
    options: ["groß", "größte", "größer", "großen"],
    correctIndex: 2,
  }),

  createQuestion({
    id: "A2_06",
    level: "A2",
    category: "Verben mit Präposition",
    type: "gap_choice",
    difficulty: 2,
    question: "Er interessiert sich sehr ___ Geschichte.",
    options: ["an", "mit", "über", "für"],
    correctIndex: 3,
  }),

  createQuestion({
    id: "A2_07",
    level: "A2",
    category: "Leseverständnis",
    type: "multiple_choice",
    difficulty: 2,
    context_text:
      "Hallo Frau Berger,\nIhr Termin am Dienstag um 14:00 Uhr muss leider ausfallen. Wir haben für Sie einen neuen Termin am Donnerstag um 16:30 Uhr reserviert. Falls Sie zu diesem Zeitpunkt nicht können, rufen Sie uns bitte an.",
    question: "Wann findet der neue Termin statt?",
    options: [
      "Dienstag um 16:30 Uhr",
      "Donnerstag um 14:00 Uhr",
      "Donnerstag um 16:30 Uhr",
      "Freitag um 16:30 Uhr",
    ],
    correctIndex: 2,
  }),

  // ==========================================================
  // B1
  // ==========================================================

  createQuestion({
    id: "B1_01",
    level: "B1",
    category: "Relativsätze",
    type: "gap_choice",
    difficulty: 3,
    question: "Das ist die Kollegin, ___ mir gestern geholfen hat.",
    options: ["die", "der", "den", "deren"],
    correctIndex: 0,
  }),

  createQuestion({
    id: "B1_02",
    level: "B1",
    category: "Konzessivsätze",
    type: "gap_choice",
    difficulty: 3,
    question:
      "Obwohl er sehr müde war, ___ er den Bericht noch fertiggeschrieben.",
    options: ["hat", "ist", "wird", "würde"],
    correctIndex: 0,
  }),

  createQuestion({
    id: "B1_03",
    level: "B1",
    category: "Passiv",
    type: "gap_choice",
    difficulty: 3,
    question: "Die alte Sporthalle ___ im nächsten Jahr renoviert.",
    options: ["hat", "wird", "ist", "wurde"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "B1_04",
    level: "B1",
    category: "Konjunktiv II",
    type: "gap_choice",
    difficulty: 3,
    question: "Wenn ich mehr Freizeit ___, würde ich wieder Fußball spielen.",
    options: ["habe", "hatte", "hätte", "haben würde"],
    correctIndex: 2,
  }),

  createQuestion({
    id: "B1_05",
    level: "B1",
    category: "Temporale Konjunktionen",
    type: "gap_choice",
    difficulty: 3,
    question: "___ ich nach Deutschland gekommen bin, konnte ich kaum Deutsch.",
    options: ["Wenn", "Als", "Ob", "Währenddessen"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "B1_06",
    level: "B1",
    category: "Verben mit Präposition",
    type: "gap_choice",
    difficulty: 3,
    question: "Nach langer Diskussion haben wir uns ___ einen Termin geeinigt.",
    options: ["für", "über", "auf", "an"],
    correctIndex: 2,
  }),

  createQuestion({
    id: "B1_07",
    level: "B1",
    category: "Leseverständnis",
    type: "multiple_choice",
    difficulty: 3,
    context_text:
      "Wegen Bauarbeiten hält die Linie 7 bis einschließlich Freitag nicht am Hauptbahnhof. Fahrgäste mit Ziel Innenstadt steigen bitte an der Station Hafen in die Linie 5 um.",
    question:
      "Du fährst mit der Linie 7 und möchtest in die Innenstadt. Was sollst du tun?",
    options: [
      "Bis zum Hauptbahnhof in der Linie 7 bleiben.",
      "An der Station Hafen in die Linie 5 umsteigen.",
      "Erst am Freitag in die Linie 5 umsteigen.",
      "Am Hafen auf die Linie 7 zurückwechseln.",
    ],
    correctIndex: 1,
  }),

  // ==========================================================
  // B2
  // ==========================================================

  createQuestion({
    id: "B2_01",
    level: "B2",
    category: "Indirekte Rede / Konjunktiv I",
    type: "gap_choice",
    difficulty: 4,
    question:
      "Die Sprecherin erklärte, die Verhandlungen ___ erfolgreich verlaufen.",
    options: ["sind", "seien", "wären", "waren"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "B2_02",
    level: "B2",
    category: "Partizipialattribute",
    type: "gap_choice",
    difficulty: 4,
    question:
      "Die gestern im Ausschuss ___ Entscheidung sorgt für Diskussionen.",
    options: ["getroffen", "getroffene", "treffende", "getroffenene"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "B2_03",
    level: "B2",
    category: "Passiversatzform",
    type: "gap_choice",
    difficulty: 4,
    question: "Diese Frage ___ sich nicht ohne weitere Daten beantworten.",
    options: ["lässt", "macht", "wird", "hat"],
    correctIndex: 0,
  }),

  createQuestion({
    id: "B2_04",
    level: "B2",
    category: "Kollokationen / formeller Wortschatz",
    type: "gap_choice",
    difficulty: 4,
    question:
      "Um die Wartezeiten zu verkürzen, wurden zusätzliche Maßnahmen ___.",
    options: ["genommen", "gemacht", "ergriffen", "gesetzt"],
    correctIndex: 2,
  }),

  createQuestion({
    id: "B2_05",
    level: "B2",
    category: "Satzverknüpfung",
    type: "gap_choice",
    difficulty: 4,
    question:
      "Während die Nachfrage deutlich zunahm, ___ das Angebot nahezu unverändert.",
    options: ["blieb", "wurde", "hielt", "bestand"],
    correctIndex: 0,
  }),

  createQuestion({
    id: "B2_06",
    level: "B2",
    category: "Präpositionale Wendungen",
    type: "gap_choice",
    difficulty: 4,
    question:
      "Seine Aussage steht im Widerspruch ___ den veröffentlichten Zahlen.",
    options: ["mit", "gegen", "zu", "von"],
    correctIndex: 2,
  }),

  createQuestion({
    id: "B2_07",
    level: "B2",
    category: "Leseverständnis / Schlussfolgerung",
    type: "multiple_choice",
    difficulty: 4,
    context_text:
      "Ab Januar sollen Beschäftigte an drei Tagen pro Woche im Büro arbeiten. Das Unternehmen begründet die Regelung mit einer besseren Zusammenarbeit innerhalb der Teams. In begründeten Einzelfällen können Teams jedoch gemeinsam mit ihrer Führungskraft abweichende Regelungen vereinbaren.",
    question: "Welche Aussage gibt den Text am besten wieder?",
    options: [
      "Alle Beschäftigten müssen ausnahmslos fünf Tage im Büro arbeiten.",
      "Die Beschäftigten dürfen vollständig selbst entscheiden, wann sie ins Büro kommen.",
      "Drei Bürotage sind grundsätzlich vorgesehen, Ausnahmen können jedoch vereinbart werden.",
      "Die neue Regelung betrifft nur Führungskräfte.",
    ],
    correctIndex: 2,
  }),

  // ==========================================================
  // C1
  // ==========================================================

  createQuestion({
    id: "C1_01",
    level: "C1",
    category: "Komplexe Konnektoren",
    type: "gap_choice",
    difficulty: 5,
    question:
      "___ die Ergebnisse auf den ersten Blick überzeugend wirken, bleiben mehrere methodische Fragen offen.",
    options: ["Sobald", "Wenngleich", "Indem", "Damit"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "C1_02",
    level: "C1",
    category: "Differenzierter Wortschatz",
    type: "gap_choice",
    difficulty: 5,
    question:
      "Die langfristigen Folgen der Entscheidung lassen sich derzeit nur schwer ___.",
    options: ["vorlegen", "abschätzen", "einsetzen", "aufstellen"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "C1_03",
    level: "C1",
    category: "Redewendungen / Kollokationen",
    type: "gap_choice",
    difficulty: 5,
    question:
      "Um den vereinbarten Termin einzuhalten, mussten wir zusätzliche Kosten in Kauf ___.",
    options: ["geben", "nehmen", "stellen", "bringen"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "C1_04",
    level: "C1",
    category: "Idiomatische Satzverknüpfung",
    type: "gap_choice",
    difficulty: 5,
    question:
      "Er hatte kaum Zeit, die Zusammenfassung zu lesen, ___ den vollständigen Bericht.",
    options: ["dadurch", "geschweige denn", "allerdings", "sofern"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "C1_05",
    level: "C1",
    category: "Indirekte Rede / komplexe Verbformen",
    type: "gap_choice",
    difficulty: 5,
    question:
      "Er erklärte, die Frist habe wegen technischer Probleme nicht eingehalten werden ___.",
    options: ["gekonnt", "können", "konnte", "zu können"],
    correctIndex: 1,
  }),

  createQuestion({
    id: "C1_06",
    level: "C1",
    category: "Register / Konnektoren",
    type: "gap_choice",
    difficulty: 5,
    question:
      "Die Maßnahme ist kurzfristig kostspielig; ___ könnte sie sich langfristig wirtschaftlich auszahlen.",
    options: ["folglich", "demnach", "gleichwohl", "insofern"],
    correctIndex: 2,
  }),

  createQuestion({
    id: "C1_07",
    level: "C1",
    category: "Anspruchsvolles Leseverständnis",
    type: "multiple_choice",
    difficulty: 5,
    context_text:
      "Eine Studie zeigt einen deutlichen Zusammenhang zwischen der Nutzung digitaler Lernangebote und besseren Prüfungsergebnissen. Daraus lässt sich jedoch nicht ohne Weiteres schließen, dass die digitalen Angebote die Ursache für die besseren Leistungen sind. Denkbar ist beispielsweise, dass besonders motivierte Lernende solche Angebote häufiger nutzen. Für belastbare Aussagen wären daher kontrollierte Untersuchungen erforderlich.",
    question:
      "Welche Aussage entspricht am ehesten der Argumentation des Textes?",
    options: [
      "Digitale Lernangebote führen nachweislich zu besseren Prüfungsergebnissen.",
      "Digitale Lernangebote haben keinen Einfluss auf Prüfungsergebnisse.",
      "Der beobachtete Zusammenhang beweist noch keinen ursächlichen Effekt.",
      "Motivierte Lernende sollten keine digitalen Lernangebote verwenden.",
    ],
    correctIndex: 2,
  }),
];

export default testQuestions;
