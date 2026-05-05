export const icd11Codes = [
  {
    code: "5A11",
    title: "Type 2 diabetes mellitus",
    description:
      "Type 2 diabetes mellitus is characterised by hyperglycaemia due to progressive loss of adequate beta-cell insulin secretion frequently on a background of insulin resistance. Usually presents in adults >40 years but increasingly seen in younger people due to obesity epidemic. Diagnosis: fasting glucose ≥7.0 mmol/L, 2h OGTT ≥11.1 mmol/L, HbA1c ≥48 mmol/mol (6.5%), or random glucose ≥11.1 with symptoms.",
    inclusion_terms:
      "Non-insulin-dependent diabetes mellitus, adult-onset diabetes mellitus, diabetes mellitus type 2 with or without complications",
    exclusion_terms:
      "Type 1 diabetes mellitus (5A10), Gestational diabetes (JA63), Maturity-onset diabetes of the young (5A13), Drug or chemical induced diabetes (5A14)",
    category: "endocrine",
  },
  {
    code: "5A10",
    title: "Type 1 diabetes mellitus",
    description:
      "Type 1 diabetes mellitus is a chronic condition characterised by absolute insulin deficiency due to autoimmune destruction of pancreatic beta cells (islets of Langerhans). Results in complete dependency on exogenous insulin. Peak onset in childhood/adolescence (bimodal: 4-7 years and 10-14 years) but can occur at any age. DKA is a common presenting feature.",
    inclusion_terms:
      "Insulin-dependent diabetes mellitus, juvenile-onset diabetes, autoimmune diabetes, brittle diabetes",
    exclusion_terms:
      "Type 2 diabetes mellitus (5A11), Maturity-onset diabetes of the young (5A13), Wolfram syndrome (5A13.1)",
    category: "endocrine",
  },
  {
    code: "BA00",
    title: "Essential hypertension",
    description:
      "Persistently elevated arterial blood pressure without identifiable secondary cause, defined as systolic BP ≥140 mmHg and/or diastolic BP ≥90 mmHg on multiple measurements (NICE: ≥140/90 clinic-measured confirmed by ABPM ≥135/85 daytime average). Accounts for 90-95% of all hypertension. Strong genetic component, environmental factors (salt, obesity, alcohol, sedentary lifestyle). Major risk factor for stroke, MI, heart failure, CKD.",
    inclusion_terms:
      "Primary hypertension, idiopathic hypertension, arterial hypertension, benign hypertension",
    exclusion_terms:
      "Secondary hypertension — renovascular (BA81), primary hyperaldosteronism (5A70), phaeochromocytoma (5A71), Cushing syndrome (5A71.0), coarctation of aorta (LA88)",
    category: "cardiovascular",
  },
  {
    code: "BC81",
    title: "Atrial fibrillation",
    description:
      "Most common sustained cardiac arrhythmia; chaotic irregular atrial electrical activity (350-600 impulses/min) with irregularly irregular ventricular response. Loss of coordinated atrial contraction → ↓cardiac output (~15-20%), blood stasis in left atrial appendage → thrombus formation → embolic stroke (5× increased risk). Classified as: paroxysmal (<7 days, self-terminating), persistent (>7 days), long-standing persistent (>12 months), permanent (accepted, no rhythm control). Management: rate control, rhythm control, anticoagulation (CHA₂DS₂-VASc score).",
    inclusion_terms:
      "AF, auricular fibrillation, chronic atrial fibrillation, paroxysmal atrial fibrillation",
    exclusion_terms:
      "Atrial flutter (BC82), Ventricular fibrillation (BC91.1), Supraventricular tachycardia (BC82)",
    category: "cardiovascular",
  },
  {
    code: "CA40",
    title: "Pneumonia due to Streptococcus pneumoniae",
    description:
      "Acute lower respiratory tract infection with parenchymal lung consolidation caused by Streptococcus pneumoniae (pneumococcus). Most common cause of community-acquired pneumonia (CAP). Presents with productive cough (rusty sputum), fever, pleuritic chest pain, dyspnoea. CXR: lobar or segmental consolidation. Severity assessed by CURB-65 score (Confusion, Urea >7, RR ≥30, BP <90/60, age ≥65: score ≥2 = hospital admission). Treated with amoxicillin (mild) or IV co-amoxiclav/cephalosporin + macrolide (severe).",
    inclusion_terms:
      "Pneumococcal pneumonia, lobar pneumonia (pneumococcal), CAP due to S. pneumoniae",
    exclusion_terms:
      "Atypical pneumonia — Mycoplasma (CA40.1), Chlamydophila (CA40.1), Legionella (CA40.2); COVID-19 pneumonia (RA01.1); Hospital-acquired pneumonia (CA41)",
    category: "respiratory",
  },
  {
    code: "DA22",
    title: "Gastro-oesophageal reflux disease",
    description:
      "Condition in which gastric contents reflux into the oesophagus causing troublesome symptoms and/or mucosal injury. Results from transient lower oesophageal sphincter relaxations, reduced LOS tone, hiatal hernia, impaired oesophageal clearance, delayed gastric emptying. Symptoms: heartburn (retrosternal burning), regurgitation, water brash, nocturnal cough/wheeze, hoarseness. Complications: oesophagitis (grades A-D Los Angeles), peptic stricture, Barrett's oesophagus (columnar metaplasia, risk of adenocarcinoma). Treated with lifestyle modification and PPIs.",
    inclusion_terms:
      "GORD, GERD, reflux oesophagitis, acid reflux, symptomatic gastro-oesophageal reflux",
    exclusion_terms:
      "Barrett's oesophagus (DA23.0), Oesophageal cancer (2B70), Eosinophilic oesophagitis (DA22)",
    category: "gastrointestinal",
  },
  {
    code: "GB60",
    title: "Acute kidney injury",
    description:
      "Abrupt decline in renal function defined by KDIGO criteria: rise in serum creatinine ≥26.5 µmol/L within 48h, or ≥1.5× baseline within 7 days, or urine output <0.5 mL/kg/h for ≥6 hours. Staging: Stage 1 (Cr ×1.5-1.9 or ↑26.5), Stage 2 (Cr ×2-2.9), Stage 3 (Cr ×3 or >354 µmol/L or RRT). Causes: pre-renal (60-70%: dehydration, sepsis, cardiogenic shock, NSAIDs, ACEi in bilateral RAS), intrinsic renal (ATN most common, glomerulonephritis, interstitial nephritis), post-renal (obstruction — stones, BPH, malignancy). Management: treat underlying cause, IV fluids (if pre-renal), stop nephrotoxins, avoid contrast, monitor K⁺.",
    inclusion_terms:
      "AKI, acute tubular necrosis, acute renal failure, acute-on-chronic kidney disease",
    exclusion_terms:
      "Chronic kidney disease (GB61), Haemolytic uraemic syndrome (GB51)",
    category: "renal",
  },
  {
    code: "8B20",
    title: "Ischaemic stroke",
    description:
      "Sudden onset focal neurological deficit caused by cerebral ischaemia lasting >24h (or resulting in tissue infarction), due to thromboembolism, in situ thrombosis, or haemodynamic failure. Subtypes (TOAST): large artery atherosclerosis (carotid/vertebrobasilar disease), cardioembolic (AF, valvular disease, LV thrombus), small vessel disease (lacunar, <15mm in basal ganglia, internal capsule, pons), other determined, undetermined (cryptogenic). Management: thrombolysis (tPA within 4.5h if no contraindications) or thrombectomy (large vessel occlusion, within 24h), antiplatelet therapy, BP management, secondary prevention.",
    inclusion_terms:
      "Cerebral infarction, thromboembolic stroke, lacunar infarction, embolic stroke, TIA (8A01 — if <24h with no infarction)",
    exclusion_terms:
      "Haemorrhagic stroke — intracerebral haemorrhage (8B00), Subarachnoid haemorrhage (8B01), TIA (8A01)",
    category: "neurological",
  },
  {
    code: "1G40",
    title: "Sepsis without septic shock",
    description:
      "Life-threatening organ dysfunction caused by a dysregulated host response to infection. Sepsis-3 definition: suspected infection + SOFA score increase ≥2 points. Organ dysfunction markers: altered mentation, SpO₂/FiO₂ ratio <300, RR ≥22, SBP ≤100, creatinine ≥110 µmol/L, bilirubin ≥32, platelet <100, GCS <15, lactate >2. Clinical presentation: fever or hypothermia, tachycardia, tachypnoea, ± hypotension. NEWS2/qSOFA for screening. Management (Sepsis-6 within 1h): blood cultures, broad-spectrum antibiotics, IV fluids (if hypoperfusion), lactate measurement, urine output monitoring, oxygen if SpO₂ <92%.",
    inclusion_terms:
      "Sepsis, systemic inflammatory response syndrome with infection (SIRS), bacteraemia with organ dysfunction",
    exclusion_terms:
      "Septic shock (MG31 — requires vasopressors to maintain MAP ≥65 + lactate >2 despite adequate fluid), Uncomplicated bacteraemia, SIRS without infection",
    category: "infectious",
  },
  {
    code: "BA41",
    title: "Acute myocardial infarction",
    description:
      "Myocardial cell death due to prolonged ischaemia, identified by rise and/or fall of cardiac troponin (cTn) with at least one value above 99th percentile URL plus evidence of ischaemia (symptoms, new ECG changes, imaging, or coronary thrombus). STEMI (ST-elevation MI): full-thickness ischaemia, complete vessel occlusion, requires immediate reperfusion (primary PCI within 90 min or thrombolysis if PCI unavailable within 120 min). NSTEMI: non-obstructive or subtotal occlusion, elevated troponin without persistent ST elevation, managed with risk stratification and early invasive strategy within 24-72h. Complications: cardiogenic shock, arrhythmias, cardiac rupture, pericarditis (Dressler syndrome).",
    inclusion_terms:
      "MI, heart attack, STEMI, NSTEMI, acute coronary syndrome with myocardial necrosis",
    exclusion_terms:
      "Unstable angina (BB42 — no troponin rise), Stable angina (BA85), Myocarditis (BC43)",
    category: "cardiovascular",
  },
  {
    code: "BD10",
    title: "Heart failure",
    description:
      "Clinical syndrome caused by structural or functional cardiac abnormality leading to elevated intracardiac pressures and/or inadequate cardiac output at rest or during stress. Symptoms include dyspnoea, orthopnoea, fatigue, ankle swelling and reduced exercise tolerance. Classified by LVEF into HFrEF, HFmrEF, and HFpEF. Common causes include ischemic heart disease, hypertension, valvular disease, and cardiomyopathy.",
    inclusion_terms:
      "Congestive heart failure, chronic heart failure, acute decompensated heart failure, left ventricular failure",
    exclusion_terms:
      "Isolated lower-limb oedema without cardiac cause, cardiogenic shock (MD90), congenital structural heart disease without HF",
    category: "cardiovascular",
  },
  {
    code: "CB01",
    title: "Asthma",
    description:
      "Chronic inflammatory airway disease characterised by variable respiratory symptoms (wheeze, dyspnoea, chest tightness, cough) and variable expiratory airflow limitation. Triggered by allergens, viral infection, exercise, cold air, or irritants. Pathophysiology includes airway hyperresponsiveness, inflammation, mucus overproduction, and reversible bronchoconstriction.",
    inclusion_terms:
      "Bronchial asthma, allergic asthma, non-allergic asthma, exercise-induced bronchoconstriction",
    exclusion_terms:
      "COPD (CA22), vocal cord dysfunction, isolated acute bronchitis without variable airflow limitation",
    category: "respiratory",
  },
  {
    code: "6A70",
    title: "Depressive episode",
    description:
      "Affective disorder episode characterised by persistent depressed mood and/or loss of interest or pleasure with associated cognitive, biological, and psychomotor symptoms for at least two weeks causing clinically significant distress or impairment. Symptoms can include sleep disturbance, appetite change, fatigue, guilt, impaired concentration, and suicidal ideation.",
    inclusion_terms:
      "Major depressive episode, unipolar depressive episode, clinical depression",
    exclusion_terms:
      "Bipolar depressive episode (6A60), normal grief reaction without functional impairment, substance-induced depressive disorder",
    category: "mental-health",
  },
  {
    code: "FA01",
    title: "Iron deficiency anaemia",
    description:
      "Anaemia due to inadequate iron availability for hemoglobin synthesis, most commonly from chronic blood loss, increased requirements, malabsorption, or poor intake. Typical findings include low hemoglobin, low MCV (microcytosis), low ferritin, and low transferrin saturation. Clinical features include fatigue, pallor, dyspnoea on exertion, pica, and restless legs.",
    inclusion_terms:
      "Microcytic hypochromic anaemia due to iron deficiency, chronic blood-loss anaemia",
    exclusion_terms:
      "Anaemia of chronic inflammation, thalassaemia trait, vitamin B12 deficiency anaemia",
    category: "haematology",
  },
  {
    code: "1C62",
    title: "Urinary tract infection, site not specified",
    description:
      "Infection involving the urinary tract when clinical documentation does not reliably distinguish upper from lower tract. Common pathogens include Escherichia coli and other enteric Gram-negative organisms. Symptoms may include dysuria, urgency, frequency, suprapubic discomfort, and occasionally systemic features.",
    inclusion_terms:
      "UTI NOS, bacterial urinary tract infection",
    exclusion_terms:
      "Acute pyelonephritis (GB54), asymptomatic bacteriuria, sexually transmitted urethritis",
    category: "infectious",
  },
  {
    code: "DD90",
    title: "Peptic ulcer disease",
    description:
      "Mucosal ulceration in stomach or proximal duodenum due to imbalance between mucosal defense and acid-peptic injury, commonly associated with Helicobacter pylori infection or NSAID use. Presentations include epigastric pain, dyspepsia, nausea, GI bleeding, or perforation in severe cases.",
    inclusion_terms:
      "Gastric ulcer, duodenal ulcer, NSAID-associated ulcer disease",
    exclusion_terms:
      "Functional dyspepsia without ulcer, gastric malignancy, erosive gastritis without ulcer crater",
    category: "gastrointestinal",
  },
  {
    code: "GB61",
    title: "Chronic kidney disease",
    description:
      "Persistent abnormalities of kidney structure or function for at least 3 months with health implications. Defined by reduced eGFR (<60 mL/min/1.73m2) and/or markers of kidney damage such as albuminuria. CKD is staged by G (eGFR) and A (albuminuria) categories and is associated with cardiovascular risk, mineral-bone disease, anaemia, and progression to kidney failure.",
    inclusion_terms:
      "CKD, chronic renal insufficiency, chronic renal failure",
    exclusion_terms:
      "Acute kidney injury (GB60), transient eGFR reduction from dehydration, isolated kidney stone without chronic dysfunction",
    category: "renal",
  },
  {
    code: "5C80",
    title: "Obesity",
    description:
      "Excess adiposity that impairs health, commonly assessed in adults by BMI >=30 kg/m2, though body composition and central adiposity also contribute to risk. Obesity is linked to insulin resistance, type 2 diabetes, cardiovascular disease, sleep apnea, osteoarthritis, and certain cancers. Management includes nutrition/physical activity interventions, behavioral support, pharmacotherapy, and bariatric procedures for selected patients.",
    inclusion_terms:
      "Adult obesity, severe obesity, adiposity-related chronic disease",
    exclusion_terms:
      "Overweight without obesity, edema-related weight gain, lipodystrophy syndromes",
    category: "endocrine",
  },
  {
    code: "8A80",
    title: "Migraine",
    description:
      "Primary headache disorder with recurrent attacks typically lasting 4–72 hours, often unilateral, pulsating, of moderate or severe intensity, aggravated by routine activity, and associated with nausea and/or photophobia and phonophobia; some attacks are preceded or accompanied by reversible aura symptoms. Chronic migraine denotes headache on ≥15 days/month for >3 months with migraine features on ≥8 days/month.",
    inclusion_terms:
      "Migraine with aura, migraine without aura, chronic migraine, menstrual migraine",
    exclusion_terms:
      "Secondary headache from SAH or meningitis, tension-type headache (8A81), cluster headache (8A82)",
    category: "neurological",
  },
  {
    code: "DB10",
    title: "Acute appendicitis",
    description:
      "Acute inflammation of the vermiform appendix, usually from luminal obstruction followed by bacterial proliferation. Typical presentation includes periumbilical pain migrating to the right iliac fossa, anorexia, nausea, fever, and localized tenderness (McBurney point). Complications include perforation, abscess, and peritonitis.",
    inclusion_terms:
      "Appendicitis, RIF pain with suspected appendicitis, perforated appendix",
    exclusion_terms:
      "Mesenteric adenitis, ovarian pathology, renal colic, gastroenteritis without appendiceal inflammation",
    category: "gastrointestinal",
  },
];
