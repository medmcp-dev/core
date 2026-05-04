// Maps free-text input to canonical symptom terms that match the diagnoses DB
const SYNONYMS: Record<string, string[]> = {
  "dyspnoea": [
    "dyspnoea", "dyspnea", "shortness of breath", "sob", "breathlessness",
    "difficulty breathing", "breathing difficulty", "can't breathe", "cannot breathe",
    "short of breath",
  ],
  "orthopnoea": [
    "orthopnoea", "orthopnea", "cannot lie flat", "can't lie flat",
    "breathless lying flat", "shortness of breath lying down",
  ],
  "pleuritic chest pain": [
    "pleuritic chest pain", "pain on breathing", "pain when breathing",
    "pain on inspiration", "sharp chest pain on deep breath", "pleuritic pain",
  ],
  "chest pain": [
    "chest pain", "thoracic pain", "precordial pain", "retrosternal pain",
    "angina", "chest tightness",
  ],
  "chest discomfort": [
    "chest discomfort", "chest pressure", "chest heaviness",
  ],
  "haemoptysis": [
    "haemoptysis", "hemoptysis", "coughing blood", "coughing up blood",
    "blood in sputum", "bloody cough", "blood when coughing", "bloody sputum",
  ],
  "tachycardia": [
    "tachycardia", "rapid heart rate", "fast pulse", "fast heart rate",
    "elevated heart rate", "rapid pulse",
  ],
  "bradycardia": [
    "bradycardia", "slow heart rate", "slow pulse",
  ],
  "tachypnoea": [
    "tachypnoea", "tachypnea", "rapid breathing", "fast breathing",
    "increased respiratory rate",
  ],
  "palpitations": [
    "palpitations", "heart racing", "racing heart", "heart pounding",
    "fast heartbeat", "irregular heartbeat", "heart fluttering",
  ],
  "syncope": [
    "syncope", "fainted", "fainting", "loss of consciousness", "blackout",
    "passed out", "blacked out", "collapse", "collapsed",
  ],
  "presyncope": [
    "presyncope", "pre-syncope", "nearly fainted", "almost fainted",
    "near faint", "near syncope", "near blackout", "light headed before fainting",
  ],
  "altered consciousness": [
    "altered consciousness", "confusion", "confused", "disoriented",
    "unresponsive", "unconscious", "altered mental status",
  ],
  "hypoxia": [
    "hypoxia", "low oxygen", "low oxygen saturation", "low sats", "desaturating",
  ],
  "fever": [
    "fever", "pyrexia", "high temperature", "febrile", "temperature",
  ],
  "productive cough": [
    "productive cough", "cough with phlegm", "cough with sputum",
    "wet cough", "mucus cough",
  ],
  "cough": [
    "cough", "coughing", "dry cough",
  ],
  "fatigue": [
    "fatigue", "tired", "tiredness", "exhaustion", "weakness",
    "lethargy", "lethargic", "no energy",
  ],
  "malaise": [
    "malaise", "feeling unwell", "not feeling well", "feeling ill", "feeling bad",
  ],
  "nausea": [
    "nausea", "nauseous", "feeling sick", "sick to stomach", "queasy",
  ],
  "vomiting": [
    "vomiting", "vomit", "vomited", "throwing up", "being sick",
  ],
  "anorexia": [
    "anorexia", "loss of appetite", "no appetite", "not eating",
    "reduced appetite", "poor appetite",
  ],
  "oedema": [
    "oedema", "edema", "fluid retention",
  ],
  "ankle oedema": [
    "ankle oedema", "ankle edema", "swollen ankles", "ankle swelling",
  ],
  "polyuria": [
    "polyuria", "frequent urination", "urinating frequently",
    "passing urine frequently", "peeing a lot",
  ],
  "polydipsia": [
    "polydipsia", "excessive thirst", "very thirsty", "increased thirst",
    "always thirsty",
  ],
  "weight loss": [
    "weight loss", "losing weight", "lost weight", "unintentional weight loss",
  ],
  "weight gain": [
    "weight gain", "gaining weight", "gained weight",
  ],
  "constipation": [
    "constipation", "constipated", "difficulty passing stool",
  ],
  "depression": [
    "depression", "depressed", "low mood", "feeling depressed",
  ],
  "periumbilical pain": [
    "periumbilical pain", "pain around navel", "pain around belly button",
    "central abdominal pain",
  ],
  "abdominal pain": [
    "abdominal pain", "stomach pain", "belly pain", "stomach ache",
    "tummy pain", "abdominal cramps",
  ],
};

// Sort all synonyms longest-first so multi-word phrases match before substrings
const REVERSE_MAP = new Map<string, string>(
  Object.entries(SYNONYMS)
    .flatMap(([canonical, syns]) => syns.map((syn): [string, string] => [syn, canonical]))
    .sort(([a], [b]) => b.length - a.length)
);

export function normalizeText(text: string): string[] {
  const lower = text.toLowerCase();
  const found = new Set<string>();

  for (const [syn, canonical] of REVERSE_MAP) {
    if (lower.includes(syn)) {
      found.add(canonical);
    }
  }

  return Array.from(found);
}
