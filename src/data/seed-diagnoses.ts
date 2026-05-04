export const diagnoses = [
  {
    name: "pulmonary embolism",
    symptoms:
      "sudden dyspnoea,pleuritic chest pain,haemoptysis,tachycardia,tachypnoea,hypoxia,calf pain/swelling,syncope (massive PE),low-grade fever",
    distinguishing_features:
      "Risk factors (Virchow's triad: stasis, hypercoagulability, endothelial damage). Wells PE score stratifies pre-test probability. Classic CXR: normal OR Westermark sign (oligaemia), Hampton's hump (wedge opacity). ECG: sinus tachycardia (most common), S1Q3T3 (right heart strain), new RBBB, AF. Echo: RV dilatation, McConnell sign, D-sign (septal flattening). CTPA is gold standard. D-dimer negative in low-probability: excludes PE (high sensitivity, low specificity).",
    key_investigations:
      "D-dimer (if low/intermediate probability — PERC rule first), CTPA (gold standard), VQ scan (if contrast contraindicated), ECG, arterial blood gas (type 1 respiratory failure, ↓CO₂), troponin/BNP (right heart strain severity), echo (haemodynamic instability), lower limb duplex USS",
    icd11_code: "BB41",
    prevalence:
      "~60-70 per 100,000/year. DVT preceding in 70% of cases. 10-15% 3-month mortality if untreated.",
  },
  {
    name: "community-acquired pneumonia",
    symptoms:
      "productive cough,fever,pleuritic chest pain,dyspnoea,tachypnoea,tachycardia,reduced breath sounds,crackles,bronchial breathing,dullness to percussion,malaise",
    distinguishing_features:
      "CURB-65 score guides admission (1 point each: Confusion, Urea >7mmol/L, RR ≥30, BP <90/60, age ≥65; score 0-1 home, ≥2 hospital). CXR: lobar/segmental consolidation (typical — S. pneumoniae, Klebsiella), bilateral patchy (atypical — Mycoplasma, Chlamydophila, Legionella). Atypical features: dry cough, extrapulmonary symptoms, relative bradycardia, normal WCC. Legionella: hyponatraemia, hepatitis, lymphopenia, urinary antigen test.",
    key_investigations:
      "CXR PA (consolidation), FBC (↑WCC typical, normal/low atypical), CRP, U&E, LFTs, blood cultures (2 sets before antibiotics if CURB ≥2), sputum MC&S, urine pneumococcal and Legionella antigen, oxygen saturation, ABG if SpO₂ <92%",
    icd11_code: "CA40",
    prevalence:
      "5-11 per 1000 adults/year. Commonest cause of infection-related death. S. pneumoniae accounts for 30-40% of cases.",
  },
  {
    name: "deep vein thrombosis",
    symptoms:
      "unilateral leg swelling,calf pain/tenderness,warmth,erythema,low-grade fever,pitting oedema,distended superficial veins",
    distinguishing_features:
      "Wells DVT score (clinical probability: high ≥3, moderate 1-2, low ≤0). Proximal DVT (popliteal and above) is higher risk for PE than distal (calf). Risk factors: prolonged immobility, recent surgery (hip/knee replacement highest risk), malignancy, OCP/HRT, thrombophilia, previous VTE, pregnancy. Phlegmasia cerulea dolens: massive DVT with venous gangrene (emergency).",
    key_investigations:
      "D-dimer (sensitive in low probability — if negative, excludes DVT), Duplex ultrasonography (first-line diagnostic — sensitivity 97% for proximal DVT, 73% for distal), If USS negative but high suspicion: repeat in 1 week or consider MRI venography. Thrombophilia screen (if unprovoked, recurrent, unusual site — do AFTER completing anticoagulation). Malignancy screen if unprovoked (FBC, CXR, PSA, mammography, CA125).",
    icd11_code: "BB41",
    prevalence:
      "~1-2 per 1000 per year. Lifetime risk ~5%. 50% have concurrent PE at diagnosis.",
  },
  {
    name: "type 2 diabetes mellitus",
    symptoms:
      "polyuria,polydipsia,weight loss (or gain in early stages),fatigue,blurred vision,recurrent infections (UTI, candida),slow wound healing,peripheral neuropathy symptoms (tingling/numbness feet),acanthosis nigricans,xanthelasma",
    distinguishing_features:
      "Often asymptomatic for years (diagnosed on screening). T2DM vs T1DM: T2DM — older age, obesity, gradual onset, insulin resistance, family history strong, rarely DKA at presentation; T1DM — younger, thin, rapid onset, autoimmune, DKA common at presentation, positive islet autoantibodies (anti-GAD, anti-IA2). MODY: young, non-obese, strong family history (autosomal dominant). Microvascular: retinopathy (commonest cause of blindness working age), nephropathy, neuropathy. Macrovascular: MI, stroke, PAD.",
    key_investigations:
      "Fasting plasma glucose, HbA1c (diagnosis and monitoring), OGTT if borderline, urine ACR (microalbuminuria), eGFR, lipid profile, annual retinal screening, foot examination (monofilament, vibration, pulses), ECG",
    icd11_code: "5A11",
    prevalence:
      "~10% global prevalence (2025). UK: ~4 million diagnosed. Accounts for >90% of all diabetes.",
  },
  {
    name: "heart failure with reduced ejection fraction",
    symptoms:
      "dyspnoea on exertion,orthopnoea,paroxysmal nocturnal dyspnoea,ankle oedema,fatigue,reduced exercise tolerance,tachycardia,S3 gallop,displaced apex beat,crepitations (bilateral basal),elevated JVP,hepatomegaly,ascites (severe)",
    distinguishing_features:
      "HFrEF: EF <40% (systolic failure — impaired contractility). HFmrEF: EF 40-49%. HFpEF: EF ≥50% (diastolic failure — impaired relaxation/filling — elderly women, hypertension, AF, obesity, CKD). NYHA classification (I-IV). BNP/NT-proBNP: highly sensitive screen (if normal → very unlikely HF). CXR: cardiomegaly (CTR >0.5), upper lobe diversion, Kerley B lines, bat-wing pulmonary oedema, pleural effusions. Echo: diagnostic (EF, chamber size, wall motion, valvular). Causes: IHD (most common), hypertension, valvular disease, cardiomyopathy.",
    key_investigations:
      "BNP/NT-proBNP (screen), ECG (LVH, LBBB, AF, Q waves), CXR, echocardiogram (essential — LVEF, diastolic function, valvular disease), FBC, U&E, LFTs, TFTs, urine ACR, 6-minute walk test, cardiopulmonary exercise testing",
    icd11_code: "BD10",
    prevalence:
      "~2% of the adult population. 10% of those >70 years. 5-year mortality ~50% (worse than many cancers).",
  },
  {
    name: "atrial fibrillation",
    symptoms:
      "palpitations,irregular pulse,dyspnoea,fatigue,reduced exercise tolerance,presyncope,chest discomfort,polyuria (atrial natriuretic peptide release)",
    distinguishing_features:
      "Irregularly irregular pulse (absent in very fast rate). ECG: absent P waves, irregular RR intervals, fibrillatory baseline. May be asymptomatic (found incidentally). Classify: paroxysmal (self-terminating <7 days), persistent (>7 days), long-standing persistent (>12 months), permanent. CHA₂DS₂-VASc score guides anticoagulation (1 point: CHF, HTN, age 65-74, diabetes, female sex, vascular disease; 2 points: age ≥75, prior stroke/TIA — score ≥2 men or ≥3 women: anticoagulate). HAS-BLED for bleeding risk. Rate control vs rhythm control decision based on symptoms, age, duration.",
    key_investigations:
      "ECG (diagnostic), Holter monitor (paroxysmal), echocardiogram (left atrial size, LV function, valvular disease, thrombus if cardioversion planned), TFTs (thyrotoxicosis), FBC, U&E, CXR, TOE (if cardioversion without 3 weeks anticoagulation)",
    icd11_code: "BC81",
    prevalence:
      "2-4% of the general population. Lifetime risk ~25%. Prevalence increases with age (>10% of those >80 years).",
  },
  {
    name: "acute appendicitis",
    symptoms:
      "periumbilical pain migrating to right iliac fossa,nausea,vomiting,anorexia,low-grade fever,rebound tenderness (Blumberg sign),guarding,Rovsing sign,psoas sign,obturator sign,point tenderness at McBurney's point",
    distinguishing_features:
      "Pain migration is pathognomonic (visceral periumbilical → somatic RIF). Alvarado score (MANTRELS) guides management. Atypical presentations: retrocaecal appendix (less RIF tenderness, more flank/back), pelvic appendix (urinary symptoms, suprapubic pain), pregnancy (appendix displaced superiorly → RUQ/flank pain). Perforation: sudden pain relief then generalisation (peritonitis). Inflammatory mass (appendix mass) may be managed conservatively. Differential: mesenteric adenitis (children), ovarian pathology, Meckel's diverticulitis, right-sided ureteric colic, psoas abscess.",
    key_investigations:
      "FBC (↑WCC, neutrophilia), CRP (elevated), urinalysis (to exclude UTI, mild pyuria can occur in appendicitis), USS (first-line in children and women of reproductive age — 75% sensitivity), CT abdomen/pelvis with contrast (gold standard — 94% sensitivity, especially for adults and atypical cases), β-hCG (exclude ectopic pregnancy in women)",
    icd11_code: "DC80",
    prevalence:
      "Lifetime risk ~7%. Most common cause of acute abdomen requiring surgery. Peak 10-30 years.",
  },
  {
    name: "hypothyroidism",
    symptoms:
      "fatigue,weight gain,cold intolerance,constipation,dry skin,hair loss (lateral eyebrows),bradycardia,delayed tendon reflexes,myxoedema (severe),cognitive slowing,depression,menorrhagia,hoarse voice,goitre,periorbital puffiness",
    distinguishing_features:
      "Primary (>95%): TSH ↑, free T4 ↓. Commonest causes: Hashimoto's thyroiditis (anti-TPO antibodies, most common worldwide cause in iodine-replete areas), post-radioiodine, post-thyroidectomy, drugs (amiodarone, lithium, carbimazole). Secondary: TSH ↓/normal, free T4 ↓ (pituitary or hypothalamic disease). Subclinical: TSH ↑, normal T4, no/minimal symptoms — treat if TSH >10 or symptomatic. Myxoedema coma: severe hypothyroidism precipitated by cold, infection, sedatives — hypothermia, altered consciousness, hypoventilation — medical emergency.",
    key_investigations:
      "TSH (first-line, most sensitive), free T4, anti-TPO antibodies (if Hashimoto's suspected), USS thyroid (if goitre or nodules), FBC (normocytic anaemia), lipid profile (hypercholesterolaemia), ECG (bradycardia, low voltage, flattened T waves, prolonged QTc)",
    icd11_code: "5A00",
    prevalence:
      "~5% of adults. Hashimoto's affects women 7-10× more than men. Risk increases with age.",
  },
];
