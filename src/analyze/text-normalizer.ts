// Maps free-text input to canonical symptom terms that match the diagnoses DB
const SYNONYMS: Record<string, string[]> = {
  // --- Respiratory ---
  "dyspnoea": [
    "dyspnoea", "dyspnea", "shortness of breath", "sob", "breathlessness",
    "difficulty breathing", "breathing difficulty", "can't breathe", "cannot breathe",
    "short of breath",
  ],
  "orthopnoea": [
    "orthopnoea", "orthopnea", "cannot lie flat", "can't lie flat",
    "breathless lying flat", "shortness of breath lying down",
  ],
  "tachypnoea": [
    "tachypnoea", "tachypnea", "rapid breathing", "fast breathing",
    "increased respiratory rate",
  ],
  "hypoxia": [
    "hypoxia", "low oxygen", "low oxygen saturation", "low sats", "desaturating",
  ],
  "wheeze": [
    "wheeze", "wheezing", "whistling breath", "whistling when breathing",
  ],
  "haemoptysis": [
    "haemoptysis", "hemoptysis", "coughing blood", "coughing up blood",
    "blood in sputum", "bloody cough", "blood when coughing", "bloody sputum",
  ],
  "productive cough": [
    "productive cough", "cough with phlegm", "cough with sputum",
    "wet cough", "mucus cough",
  ],
  "cough": [
    "cough", "coughing", "dry cough",
  ],

  // --- Cardiovascular ---
  "chest pain": [
    "chest pain", "thoracic pain", "precordial pain", "retrosternal pain",
    "angina", "chest tightness",
  ],
  "chest discomfort": [
    "chest discomfort", "chest pressure", "chest heaviness",
  ],
  "pleuritic chest pain": [
    "pleuritic chest pain", "pain on breathing", "pain when breathing",
    "pain on inspiration", "sharp chest pain on deep breath", "pleuritic pain",
  ],
  "tachycardia": [
    "tachycardia", "rapid heart rate", "fast pulse", "fast heart rate",
    "elevated heart rate", "rapid pulse",
  ],
  "hypotension": [
    "hypotension", "low blood pressure", "low bp", "blood pressure low", "bp low",
    "hypotensive",
  ],
  "bradycardia": [
    "bradycardia", "slow heart rate", "slow pulse",
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
    "near faint", "near syncope", "near blackout", "feeling faint", "felt faint",
  ],
  "diaphoresis": [
    "diaphoresis", "sweating", "sweaty", "drenching sweat",
    "cold sweat", "night sweats", "profuse sweating", "clammy",
  ],
  "pallor": [
    "pallor", "pale", "pale skin", "pallid", "looking pale",
  ],
  "jaw pain": [
    "jaw pain", "jaw discomfort", "jaw ache", "jaw tightness",
  ],

  // --- Neurological ---
  "headache": [
    "headache", "head pain", "cephalalgia", "migraine",
  ],
  "neck stiffness": [
    "neck stiffness", "stiff neck", "nuchal rigidity", "meningism",
    "cannot touch chin to chest",
  ],
  "photophobia": [
    "photophobia", "sensitivity to light", "light sensitivity",
    "light hurts eyes", "cannot tolerate light",
  ],
  "phonophobia": [
    "phonophobia", "sensitivity to sound", "noise sensitivity",
    "sound hurts", "cannot tolerate noise",
  ],
  "facial droop": [
    "facial droop", "facial weakness", "drooping face", "face drooping",
    "one side of face drooping", "asymmetric face",
  ],
  "arm weakness": [
    "arm weakness", "weak arm", "weakness in arm", "cannot lift arm", "can't lift arm",
    "cannot move arm", "can't move arm",
  ],
  "hemiplegia": [
    "hemiplegia", "hemiparesis", "leg weakness",
    "one-sided weakness", "unilateral weakness", "weakness on one side",
    "cannot move leg", "can't move leg",
  ],
  "dysarthria": [
    "dysarthria", "slurred speech", "difficulty speaking", "speech slurred",
    "can't speak properly",
  ],
  "dysphasia": [
    "dysphasia", "aphasia", "difficulty finding words", "speech problems",
    "cannot find words", "word finding difficulty", "cannot understand speech",
  ],
  "sudden vision loss": [
    "sudden vision loss", "sudden loss of vision", "lost vision suddenly",
    "acute vision loss", "amaurosis",
  ],
  "visual disturbance": [
    "visual disturbance", "blurred vision", "vision problems", "double vision",
    "diplopia", "visual loss", "loss of vision", "flashing lights", "aura",
    "visual aura", "scintillating scotoma",
  ],
  "dizziness": [
    "dizziness", "dizzy", "vertigo", "lightheadedness", "light headed",
    "room spinning", "off balance",
  ],
  "altered consciousness": [
    "altered consciousness", "confusion", "confused", "disoriented",
    "unresponsive", "unconscious", "altered mental status",
  ],
  "seizure": [
    "seizure", "fit", "convulsion", "epileptic fit", "shaking uncontrollably",
  ],
  "tremor": [
    "tremor", "shaking hands", "hand tremor", "shaky hands", "trembling",
  ],

  // --- General / Systemic ---
  "fever": [
    "fever", "pyrexia", "high temperature", "febrile", "temperature",
    "feeling feverish", "burning up",
  ],
  "rigors": [
    "rigors", "rigour", "shaking chills", "chills", "shivering",
    "uncontrollable shaking",
  ],
  "fatigue": [
    "fatigue", "tired", "tiredness", "exhaustion", "weakness",
    "lethargy", "lethargic", "no energy",
  ],
  "malaise": [
    "malaise", "feeling unwell", "not feeling well", "feeling ill", "feeling bad",
  ],
  "weight loss": [
    "weight loss", "losing weight", "lost weight", "unintentional weight loss",
  ],
  "weight gain": [
    "weight gain", "gaining weight", "gained weight",
  ],
  "rash": [
    "rash", "skin rash", "petechiae", "purpura", "spots", "non-blanching rash",
  ],

  // --- Gastrointestinal ---
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
  "abdominal pain": [
    "abdominal pain", "stomach pain", "belly pain", "stomach ache",
    "tummy pain", "abdominal cramps", "sharp stomach pain", "stomach hurts",
  ],
  "epigastric pain": [
    "epigastric pain", "upper abdominal pain", "upper stomach pain",
    "epigastric discomfort", "pain in upper stomach", "pain in upper abdomen",
  ],
  "periumbilical pain": [
    "periumbilical pain", "pain around navel", "pain around belly button",
    "central abdominal pain",
  ],
  "back pain": [
    "back pain", "backache", "lumbar pain", "loin pain",
    "tearing back pain", "ripping back pain", "radiating to back",
  ],
  "jaundice": [
    "jaundice", "yellow skin", "yellowing skin", "yellow eyes",
    "yellowing of eyes", "icterus",
  ],
  "constipation": [
    "constipation", "constipated", "difficulty passing stool",
    "can't pass stool", "cannot pass stool", "unable to pass stool",
  ],
  "diarrhoea": [
    "diarrhoea", "diarrhea", "loose stools", "frequent loose stools", "watery stool",
  ],

  // --- Urological ---
  "flank pain": [
    "flank pain", "loin pain", "side pain", "renal colic",
    "pain in side", "pain in flank",
  ],
  "haematuria": [
    "haematuria", "hematuria", "blood in urine", "red urine",
    "bloody urine", "pink urine",
  ],
  "dysuria": [
    "dysuria", "painful urination", "burning urination", "pain when urinating",
    "burning when passing urine", "stinging urination",
  ],
  "oliguria": [
    "oliguria", "reduced urine output", "not passing urine", "low urine output",
    "passing less urine", "barely urinating",
  ],
  "polyuria": [
    "polyuria", "frequent urination", "urinating frequently",
    "passing urine frequently", "peeing a lot",
  ],
  "polydipsia": [
    "polydipsia", "excessive thirst", "very thirsty", "increased thirst",
    "always thirsty",
  ],

  // --- Fluid / Oedema ---
  "oedema": [
    "oedema", "edema", "fluid retention",
  ],
  "ankle oedema": [
    "ankle oedema", "ankle edema", "swollen ankles", "ankle swelling",
  ],

  // --- Psychiatric / Other ---
  "depression": [
    "depression", "depressed", "low mood", "feeling depressed",
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
