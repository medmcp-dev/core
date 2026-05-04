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
  {
    name: "non-ST-elevation acute coronary syndrome",
    symptoms: "chest pain,chest discomfort,diaphoresis,nausea,vomiting,dyspnoea,tachycardia,palpitations,jaw pain,back pain,fatigue",
    distinguishing_features:
      "NSTEMI vs UA distinguished by troponin rise (NSTEMI: hs-troponin above 99th centile + significant delta; UA: normal troponin). ECG: ST depression, T-wave inversion, or normal — NOT ST elevation. GRACE score guides invasive strategy timing: immediate (<2h) if refractory ischaemia/haemodynamic instability; early (<24h) for GRACE >140 or rising troponin; within 72h for lower risk. Dual antiplatelet: aspirin + P2Y12 inhibitor (ticagrelor preferred over clopidogrel). Anticoagulation: fondaparinux (preferred) or LMWH. 0h/1h hs-troponin pathway (ESC): rule in if hs-TnI/T ≥5× 99th centile at 0h OR significant delta at 1h.",
    key_investigations:
      "12-lead ECG (on arrival + serial), high-sensitivity troponin I or T (0h and 1-3h), FBC, U&E, LFTs, coagulation, glucose, lipid profile, echocardiogram (LV function, wall motion abnormality), coronary angiography ± PCI, CXR",
    icd11_code: "BA41",
    prevalence:
      "~3 per 1000/year. NSTEMI more common than STEMI in UK. 30-day mortality ~5%; 1-year mortality ~10-15%.",
  },
  {
    name: "ST-elevation myocardial infarction",
    symptoms: "chest pain,diaphoresis,nausea,vomiting,dyspnoea,syncope,tachycardia,pallor,jaw pain",
    distinguishing_features:
      "ECG: ST elevation ≥1mm in ≥2 contiguous limb leads or ≥2mm in ≥2 contiguous precordial leads. New LBBB with symptoms = STEMI-equivalent. Territory: anterior (LAD — V1-V4), inferior (RCA/LCx — II, III, aVF), lateral (LCx — I, aVL, V5-V6). Reciprocal changes support diagnosis. Primary PCI (pPCI): door-to-balloon <90min — superior to thrombolysis. Thrombolysis: if pPCI unavailable within 120min. Antiplatelet: aspirin + prasugrel/ticagrelor (preferred). Complications: VF/VT (highest risk first hour), complete heart block (inferior MI — requires pacing), cardiogenic shock, mechanical (VSD, papillary muscle rupture, free wall rupture).",
    key_investigations:
      "12-lead ECG (within 10 min — diagnostic), hs-troponin (do not delay reperfusion), FBC, U&E, coagulation, glucose, group and save, echocardiogram (LV function, complications), continuous cardiac monitoring, CXR",
    icd11_code: "BA41",
    prevalence:
      "~50,000 STEMIs/year in UK. 30-day mortality ~5-7% with primary PCI. Historically 25-30% untreated. VF risk highest in first hour.",
  },
  {
    name: "aortic dissection",
    symptoms: "chest pain,back pain,tachycardia,syncope,diaphoresis,pallor,dyspnoea",
    distinguishing_features:
      "Type A (ascending aorta): surgical emergency — mortality 1-2%/hour untreated; risk of tamponade, aortic regurgitation, coronary ostia involvement (inferior MI pattern), stroke. Type B (descending only): managed medically (anti-impulse therapy: IV labetalol/esmolol — target HR <60, SBP 100-120) unless complicated (malperfusion, rupture). Classic presentation: sudden-onset tearing/ripping chest or back pain, maximal at onset. CXR: widened mediastinum (>8cm) in 60% — normal CXR does NOT exclude. CT aortography: gold standard. BP differential between arms. Risk factors: hypertension (most common), Marfan syndrome, bicuspid aortic valve, Turner syndrome, cocaine.",
    key_investigations:
      "CT aortography (urgent — gold standard), 12-lead ECG (exclude ACS — coronary ostia involvement), CXR, TTE/TOE (tamponade, AR assessment), BP both arms simultaneously, FBC, U&E, coagulation, group and crossmatch, point-of-care troponin",
    icd11_code: "BA91",
    prevalence:
      "3-4 per 100,000/year. Type A: 60-70% of cases. Untreated Type A mortality: 25% at 24h, 50% at 48h, 75% at 2 weeks.",
  },
  {
    name: "acute pericarditis",
    symptoms: "pleuritic chest pain,chest pain,fever,tachycardia,malaise,fatigue,dyspnoea",
    distinguishing_features:
      "Chest pain: sharp, pleuritic, worse lying flat, relieved sitting forward ('pericarditic position'). Pericardial friction rub: pathognomonic scratching/creaking sound, best heard with patient leaning forward. ECG: saddle-shaped (concave upward) ST elevation in multiple leads + PR depression (pathognomonic — opposite to ST changes; reciprocal in aVR). Distinguishes from MI: no reciprocal changes (except aVR/V1), concave ST morphology, PR depression. Aetiology: viral (most common — Coxsackie B, echovirus), autoimmune (SLE, RA, Dressler syndrome), bacterial (TB in endemic areas), malignancy, uraemia. Complication: tamponade (Beck's triad: hypotension + elevated JVP + muffled heart sounds), constrictive pericarditis.",
    key_investigations:
      "ECG (serial), echocardiogram (pericardial effusion, tamponade), CXR (cardiomegaly if large effusion), FBC (↑WCC), CRP/ESR (elevated), troponin (myopericarditis if elevated), viral serology, ANA/dsDNA (if autoimmune suspected), TSH",
    icd11_code: "BC30",
    prevalence:
      "~5% of A&E chest pain presentations. Males 20-50 most commonly affected. Recurrence in 20-30% without colchicine. Purulent pericarditis: rare but high mortality.",
  },
  {
    name: "pneumothorax",
    symptoms: "dyspnoea,pleuritic chest pain,chest pain,tachycardia,tachypnoea,hypoxia",
    distinguishing_features:
      "Primary spontaneous (PSP): tall thin young males, no underlying lung disease — apical blebs. Secondary spontaneous (SSP): underlying COPD, asthma, CF, TB, malignancy — higher mortality. Tension pneumothorax: tracheal deviation away from affected side, elevated JVP, haemodynamic compromise — immediate needle decompression (2nd ICS, MCL), then chest drain. Clinical signs: reduced/absent breath sounds + hyper-resonance on affected side. CXR: visible lung edge with absent vascular markings (measure at hilum level). CT chest: gold standard (bullae vs pneumothorax). Management BTS: PSP <2cm + minimal symptoms = discharge with follow-up; PSP ≥2cm = aspiration; SSP = drain; tension = immediate needle decompression.",
    key_investigations:
      "CXR PA erect, CT chest (if diagnostic doubt, SSP, or failed aspiration), ABG (type 1 respiratory failure in large/bilateral), oxygen saturation, ECG (PE differential — right heart strain)",
    icd11_code: "CB21",
    prevalence:
      "PSP: 18-28/100,000/year males; 1.2-6/100,000 females. SSP: 6.3/100,000. 20-50% recurrence after first PSP without pleurodesis.",
  },
  {
    name: "acute exacerbation of COPD",
    symptoms: "dyspnoea,productive cough,wheeze,tachycardia,tachypnoea,hypoxia,cough,fever",
    distinguishing_features:
      "Sustained worsening of dyspnoea/cough/sputum beyond day-to-day variation. Triggers: viral (rhinovirus, influenza, RSV — 50%), bacterial (H. influenzae, S. pneumoniae, M. catarrhalis — 50%), air pollution, PE. ABG interpretation: type 2 respiratory failure (↑PaCO₂ + ↓pH + ↓PaO₂) indicates severity — acidosis drives NIV. Target SpO₂ 88-92% (not 94-98% — preserve hypoxic drive). NIV (BiPAP): pH 7.25-7.35 + PaCO₂ >6kPa. Treatment: SABA + SAMA nebulisers, oral prednisolone 5 days (40mg), antibiotics if purulent sputum (amoxicillin/doxycycline/clarithromycin). GOLD classification: spirometry FEV1/FVC <0.70 post-bronchodilator.",
    key_investigations:
      "ABG (essential — type 2 failure, pH determines NIV need), CXR, sputum culture (MC&S), FBC (↑WCC infective), U&E (hypokalaemia with nebulisers), ECG (AF, cor pulmonale), BNP (exclude HF), D-dimer (if PE suspected), peak flow, spirometry (stable phase)",
    icd11_code: "CA22",
    prevalence:
      "UK: ~115,000 hospital admissions/year. In-hospital mortality 4-7%; 90-day mortality 15-25%. Frequent exacerbators (≥2/year): accelerated FEV1 decline, worse prognosis.",
  },
  {
    name: "acute severe asthma",
    symptoms: "dyspnoea,wheeze,tachycardia,tachypnoea,hypoxia,cough,chest pain",
    distinguishing_features:
      "BTS/SIGN severity: Moderate (PEFR 50-75%, able to talk, SpO₂ ≥92%). Acute severe (PEFR 33-50%, HR ≥110, RR ≥25, can't complete sentences). Life-threatening (PEFR <33%, SpO₂ <92%, PaCO₂ 4.6-6kPa = exhaustion, silent chest, cyanosis, bradycardia, confusion). Near-fatal (raised PaCO₂, intubation). Silent chest = no airflow = danger. Normal/raised PaCO₂ in acute asthma = patient tiring = ICU. Treatment: O₂ (94-98%), back-to-back salbutamol nebulisers, ipratropium bromide, systemic steroids (hydrocortisone IV or prednisolone oral), IV magnesium sulphate 2g over 20min (life-threatening). IV salbutamol/aminophylline: refractory.",
    key_investigations:
      "Peak flow (% predicted — key assessment), ABG (normal/raised CO₂ = danger), SpO₂, CXR (pneumothorax, pneumonia — trigger), FBC, U&E (hypokalaemia with beta-agonists), ECG, sputum culture",
    icd11_code: "CA23",
    prevalence:
      "~5.4 million with asthma in UK; ~1,200 deaths/year. September epidemics (school return + viral infections). Life-threatening exacerbations frequently underestimated.",
  },
  {
    name: "bacterial meningitis",
    symptoms: "headache,fever,neck stiffness,photophobia,altered consciousness,vomiting,nausea,tachycardia,rash",
    distinguishing_features:
      "Classic triad: fever + neck stiffness + altered consciousness (only 44% have all three — do not wait for triad). Non-blanching petechial/purpuric rash: meningococcal septicaemia — glass test. Kernig's sign: inability to extend knee with hip flexed 90°. Brudzinski's sign: involuntary knee flexion on neck flexion. Causative organisms: neonates (GBS, E. coli, Listeria), children (N. meningitidis, S. pneumoniae), adults (S. pneumoniae most common, N. meningitidis), elderly/immunocompromised (Listeria). CSF: turbid, ↑neutrophils, ↑protein, ↓glucose (<50% plasma glucose), Gram stain/culture. Do NOT delay antibiotics for LP — if LP will delay >1h, give ceftriaxone first. Dexamethasone: before/with first antibiotic dose — reduces hearing loss (pneumococcal).",
    key_investigations:
      "Blood cultures (×2 before antibiotics), LP and CSF (cell count, protein, glucose + paired serum glucose, Gram stain, culture, meningococcal/pneumococcal PCR), FBC (↑WCC, sometimes leucopenia — bad sign), CRP, U&E, coagulation, glucose, CT head before LP (only if: GCS <13, papilloedema, focal neurology, immunocompromised, seizure), throat swab (meningococcal)",
    icd11_code: "1C1Z",
    prevalence:
      "~3,000-5,000 cases/year UK. In-hospital mortality: 10-20% (pneumococcal higher ~20-30%). Neurological sequelae: 15-20% (deafness, cognitive impairment). Meningococcal: highest fatality with purpura/shock.",
  },
  {
    name: "ischaemic stroke",
    symptoms: "facial droop,hemiplegia,dysarthria,dysphasia,headache,altered consciousness,vomiting,tachycardia,visual disturbance,dizziness",
    distinguishing_features:
      "FAST: Face drooping + Arm weakness + Speech difficulty + Time. Always exclude hypoglycaemia first (glucose). ROSIER score. Anterior circulation (MCA): contralateral face + arm > leg weakness, dysphasia (dominant hemisphere), neglect (non-dominant), homonymous hemianopia. Posterior circulation: vertigo, diplopia, ataxia, dysphagia, crossed signs, Horner syndrome. Stroke mimics: hypoglycaemia, Todd's paresis, complex migraine, hypertensive encephalopathy, brain tumour, MS. Thrombolysis window: IV alteplase within 4.5h if haemorrhage excluded on CT and BP controlled (<185/110). Thrombectomy: up to 24h for large vessel occlusion (NIHSS ≥6). Secondary prevention: antiplatelet (clopidogrel preferred for non-cardioembolic), anticoagulation for AF (start after 2 weeks).",
    key_investigations:
      "Non-contrast CT head (urgent — exclude haemorrhage before thrombolysis), MRI DWI (more sensitive, especially posterior fossa), CT angiography (large vessel occlusion → thrombectomy), glucose, ECG (AF), 24-48h cardiac monitoring, echocardiogram (embolic source), FBC, coagulation, lipids, carotid duplex USS",
    icd11_code: "8B11",
    prevalence:
      "~100,000 strokes/year UK (85% ischaemic). Leading cause of adult disability. 30-day mortality ~12%. AF-related strokes: 20-30%, associated with higher NIHSS scores.",
  },
  {
    name: "transient ischaemic attack",
    symptoms: "facial droop,hemiplegia,dysarthria,dysphasia,visual disturbance,dizziness,headache",
    distinguishing_features:
      "Focal neurological deficit resolving within 24h (usually <1h) without infarction on MRI. High early stroke risk: ABCD² score predicts 2-day stroke risk (Age ≥60=1, BP ≥140/90=1, Clinical features: unilateral weakness=2/speech=1, Duration: ≥60min=2/10-59min=1, Diabetes=1). Score ≥4: high risk (>4% 2-day stroke risk). DWI MRI: may show restricted diffusion even with symptom resolution — reclassified as stroke. Aspirin 300mg immediately. Carotid imaging: symptomatic TIA — carotid endarterectomy within 2 weeks if ≥50% NASCET stenosis. AF: anticoagulate. ABCD² limitation: does not capture high-risk features (AF, >50% carotid stenosis, DWI lesion) — all high-risk TIA should be assessed urgently.",
    key_investigations:
      "MRI DWI (infarction?), non-contrast CT (if MRI unavailable), ECG, glucose, FBC, coagulation, lipids, carotid duplex USS (anterior circulation), cardiac monitoring (AF), echocardiogram, BP monitoring",
    icd11_code: "8B12",
    prevalence:
      "~50,000 TIAs/year UK. 10-15% stroke risk within 3 months — highest in first 48h. With urgent intervention (SOS TIA clinic), stroke risk reduced by ~80%.",
  },
  {
    name: "migraine",
    symptoms: "headache,nausea,vomiting,photophobia,phonophobia,visual disturbance,fatigue,dizziness",
    distinguishing_features:
      "ICHD-3 criteria: ≥5 attacks, 4-72h duration, ≥2 of (unilateral, pulsating, moderate-severe, aggravated by routine activity) + nausea/vomiting OR photophobia AND phonophobia. Migraine with aura: visual aura (scintillating scotoma, fortification spectra, spreading over 20-30min), sensory/motor aura — each symptom 5-60min, fully reversible. Cortical spreading depression underlies aura. Thunderclap headache = SAH until proven otherwise (LP at ≥12h for xanthochromia if CT negative). Triggers: stress, menstruation, sleep disruption, alcohol (red wine/beer), tyramine-rich foods, missed meals. Acute: triptans (5-HT1B/1D — vasoconstrictors, avoid in cardiovascular disease), NSAIDs, anti-emetics (metoclopramide). Preventive (≥4/month): propranolol, amitriptyline, topiramate, valproate, CGRP mAbs (erenumab, fremanezumab).",
    key_investigations:
      "Clinical diagnosis in typical presentations. CT head (first/worst headache, progressive, neurological deficit, fever, age >50 — exclude SAH, space-occupying lesion), LP (if CT negative but SAH suspected — xanthochromia at 12h). MRI if complex aura, hemiplegic migraine.",
    icd11_code: "8A80",
    prevalence:
      "~10-15% of population. Female:male 3:1. Peak disability age 35-45. Leading cause of disability in under-50s worldwide. Estimated global prevalence >1 billion.",
  },
  {
    name: "acute pancreatitis",
    symptoms: "epigastric pain,abdominal pain,vomiting,nausea,fever,tachycardia,diaphoresis,jaundice,back pain",
    distinguishing_features:
      "Pain: epigastric/periumbilical, radiating to back, partially relieved leaning forward, onset over hours, severe. Aetiology (GET SMASHED): Gallstones (40% — UK most common), Ethanol (30%), Trauma, Steroids, Mumps/autoimmune, Autoimmune (IgG4), Scorpion venom, Hyperlipidaemia/Hypercalcaemia, ERCP, Drugs. Severity (Revised Atlanta): mild (no organ failure, no necrosis), moderately severe (transient organ failure <48h or local complications), severe (persistent organ failure ≥48h). Scoring: Glasgow-Imrie (≥3 = severe — BUN, age, WCC, glucose, LDH, albumin, calcium, PaO₂). Complications: infected necrosis (peak 2-3 weeks — CT-guided FNA, necrosectomy), pseudocyst, haemorrhage. Gallstone pancreatitis: ERCP ± sphincterotomy within 72h if cholangitis; cholecystectomy same admission.",
    key_investigations:
      "Serum lipase (more sensitive/specific than amylase, remains elevated longer) or amylase (>3× ULN), FBC, U&E (urea — severity marker), LFTs (biliary aetiology: ↑ALP/ALT, bilirubin), calcium, triglycerides, glucose, CRP (>150 at 48h = severe), USS abdomen (gallstones, CBD dilatation), CT abdomen with IV contrast (48-72h if severe — Balthazar grading, necrosis)",
    icd11_code: "DC31",
    prevalence:
      "~25-50 per 100,000/year UK. Overall mortality ~3%; severe pancreatitis: 20-30%. Gallstones most common cause in UK. Alcohol-related in younger males.",
  },
  {
    name: "acute cholecystitis",
    symptoms: "abdominal pain,fever,vomiting,nausea,tachycardia,jaundice",
    distinguishing_features:
      "Gallstone impaction in cystic duct → bile stasis → bacterial superinfection (E. coli, Klebsiella, Enterococcus). Murphy's sign: inspiratory arrest on palpation of right hypochondrium (sensitivity ~65%, specificity ~87%). Charcot's triad (cholangitis): RUQ pain + fever/rigors + jaundice. Reynolds' pentad (severe cholangitis): + hypotension + altered consciousness — septic shock, emergency. Acalculous cholecystitis: critically ill ICU patients, ischaemia. Tokyo Guidelines severity grading. Management: analgesia, antibiotics (piperacillin-tazobactam or co-amoxiclav), early laparoscopic cholecystectomy within 72h (same admission superior to delayed). ERCP ± sphincterotomy if CBD stones/cholangitis.",
    key_investigations:
      "USS abdomen (gallstones, gallbladder wall thickening >3mm, pericholecystic fluid, CBD dilatation — first-line), FBC (↑WCC), CRP, LFTs (↑ALP/bilirubin if CBD involved), amylase/lipase (exclude pancreatitis), blood cultures (if septic), MRCP (if CBD stones), HIDA scan (if USS equivocal)",
    icd11_code: "DC13",
    prevalence:
      "10-15% of Western adults have gallstones; 1-3% develop acute cholecystitis annually. F>M, peak 40-50s (fair, fat, fertile, forty, flatulent — though this is a mnemonic, not fully accurate). Most common indication for emergency cholecystectomy.",
  },
  {
    name: "peptic ulcer disease",
    symptoms: "epigastric pain,abdominal pain,nausea,vomiting,anorexia,weight loss,fatigue",
    distinguishing_features:
      "Gastric ulcer: epigastric pain worse WITH food (eating → pain). Duodenal ulcer: pain relieved by food, worse fasting/at night (antacids relieve). Aetiology: H. pylori (most common — DU > GU — CLO test, urea breath test, stool antigen), NSAIDs (COX-1 inhibition — PGE2 reduction → mucus/bicarbonate impaired), Zollinger-Ellison (gastrinoma — multiple/refractory ulcers, diarrhoea, fasting gastrin >1000). Complications: haemorrhage (haematemesis/melaena — Forrest classification guides endoscopic Rx — haemostasis clips, adrenaline, argon plasma), perforation (peritonitis — free air on erect CXR), gastric outlet obstruction. Rockall score (pre-endoscopy): age, shock, comorbidities; post-endoscopy: adds stigmata of bleeding. Endoscopy: within 24h for UGIB (within 12h if haemodynamically unstable).",
    key_investigations:
      "OGD (diagnostic + therapeutic), H. pylori testing (urea breath test or stool antigen for active infection — NOT serology), FBC (Hb — bleeding), U&E (↑urea in UGIB — protein digestion), LFTs, coagulation, group and save, CXR erect (free air = perforation)",
    icd11_code: "DA63",
    prevalence:
      "Lifetime prevalence ~5-10%. DU:GU ratio ~4:1. H. pylori-related declining (eradication era); NSAID-related increasing. UGIB mortality ~10% overall.",
  },
  {
    name: "small bowel obstruction",
    symptoms: "abdominal pain,vomiting,nausea,constipation,tachycardia,fever",
    distinguishing_features:
      "Causes: adhesions (60% — post-surgical), hernias (always examine hernial orifices — femoral/inguinal), malignancy, Crohn's, volvulus, intussusception (children). Complete vs partial: complete = absolute constipation (no flatus/faeces) + frequent bilious vomiting; partial = may pass flatus. Strangulation/ischaemia: constant severe pain (not colicky), fever, tachycardia, peritonism, ↑WCC, elevated lactate — surgical emergency. AXR: dilated small bowel loops (>3cm, central, valvulae conniventes — 'stack of coins'), no colonic gas. CT abdomen/pelvis with IV contrast: identifies transition point, cause, ischaemia (pneumatosis intestinalis, portal venous gas). Management: 'drip and suck' (IV fluids + NG tube decompression) for adhesive SBO; surgery for strangulation, hernia, failed conservative.",
    key_investigations:
      "AXR supine, CT abdomen/pelvis with IV contrast (gold standard — transition point, ischaemia), FBC (↑WCC = strangulation), U&E (dehydration, electrolyte imbalance), lactate (ischaemia), VBG, group and save",
    icd11_code: "DD31",
    prevalence:
      "One of the most common surgical emergencies. Adhesive SBO: 20-30% recurrence. Strangulated bowel: mortality increases significantly per hour of delay.",
  },
  {
    name: "pyelonephritis",
    symptoms: "fever,rigors,flank pain,dysuria,nausea,vomiting,tachycardia,haematuria",
    distinguishing_features:
      "Upper UTI — renal parenchymal infection. Organisms: E. coli (80%), Klebsiella, Proteus, Enterococcus. ESBL producers: increasing prevalence — affects antibiotic choice (meropenem). Complicated pyelonephritis: male sex, pregnancy, DM, structural abnormality, hospital-acquired, catheter-associated. Urosepsis: obstructed kidney = emergency — percutaneous nephrostomy or ureteric stent for decompression. Renal abscess: fever persisting >72h on antibiotics — USS/CT + drainage. Emphysematous pyelonephritis: gas-forming organisms in DM — CT, surgical emergency. Treatment: oral ciprofloxacin (7 days) for uncomplicated; IV co-amoxiclav or piperacillin-tazobactam if systemically unwell. Nitrofurantoin NOT suitable (poor tissue penetration).",
    key_investigations:
      "Urine dipstick (leucocytes, nitrites, blood), MSU MC&S (before antibiotics), blood cultures (if septic/hospitalised), FBC (↑WCC), CRP, U&E, USS renal tract (obstruction, abscess — especially if not responding at 72h), CT KUB (abscess, emphysematous PN, stone)",
    icd11_code: "GB60",
    prevalence:
      "~1-2% of all GP consultations. Women: 12-13/10,000/year; men: 2-3/10,000/year. Recurrence: 30% within 1 year. Gram-negative bacteraemia source in ~25% of bacteraemia cases.",
  },
  {
    name: "nephrolithiasis",
    symptoms: "flank pain,haematuria,vomiting,nausea,tachycardia,diaphoresis",
    distinguishing_features:
      "Renal colic: severe colicky loin-to-groin pain, patient restless/cannot keep still (unlike peritoneal irritation). Haematuria (micro or macro) in ~90%. Stone composition: calcium oxalate (80% — radio-opaque on plain film), uric acid (radiolucent — gout, chemotherapy), struvite (staghorn — Proteus infection, alkaline urine), cystine (cystinuria). Spontaneous passage probability: <5mm = ~90%, 5-10mm = ~50%, >10mm = unlikely. Indications for urgent intervention: infected obstructed kidney (emergency — decompression ± nephrostomy), solitary kidney + obstruction, intractable pain/vomiting, bilateral obstruction. Treatment: NSAIDs (superior to opioids for renal colic), tamsulosin (alpha-blocker — promotes ureteral relaxation), ESWL, ureteroscopy + laser lithotripsy, PCNL (staghorn).",
    key_investigations:
      "CT KUB without contrast (gold standard — >95% sensitivity, identifies stone, site, size, obstruction), USS (pregnancy, children, radiation concern), urine dipstick (haematuria), MSU MC&S (exclude infection), U&E, FBC, uric acid, calcium, PTH (if hypercalcaemia), 24h urine (recurrent stones)",
    icd11_code: "GC00",
    prevalence:
      "~10-15% lifetime risk. M:F = 3:1. Recurrence: 50% within 10 years. Increasing incidence linked to obesity, Western diet, and metabolic syndrome.",
  },
  {
    name: "sepsis",
    symptoms: "fever,tachycardia,tachypnoea,altered consciousness,rigors,diaphoresis,malaise,fatigue",
    distinguishing_features:
      "Sepsis-3 definition: life-threatening organ dysfunction (SOFA ≥2) from dysregulated host response to infection. qSOFA (bedside screen): RR ≥22 + altered mental status + SBP ≤100mmHg — ≥2 = sepsis likely. Septic shock: sepsis + vasopressor requirement to maintain MAP ≥65 + lactate >2mmol/L despite adequate fluid resuscitation (30-40% mortality). Source: respiratory (most common), urinary, abdominal, skin/soft tissue, line-related. Sepsis Six (within 1 hour): blood cultures × 2 sets, IV antibiotics (empirical — piperacillin-tazobactam ± gentamicin), IV crystalloid 30ml/kg (if hypotensive/lactate >4), urine output monitoring, serial lactate, oxygen to maintain SpO₂ ≥94%. Vasopressors: noradrenaline first-line (MAP target ≥65). Hydrocortisone: if refractory septic shock.",
    key_investigations:
      "Blood cultures (×2 before antibiotics), FBC (↑WCC — leucopenia in overwhelming sepsis = poor prognostic sign), CRP, procalcitonin, U&E (AKI), LFTs (hepatic dysfunction), coagulation (DIC — ↓fibrinogen, ↑D-dimer, ↑PT), lactate (arterial or venous — serial), ABG, urine MC&S, CXR, glucose, group and save",
    icd11_code: "1G40",
    prevalence:
      "~150,000 cases/year UK; ~44,000 deaths. Global: ~49 million cases, ~11 million deaths/year. Septic shock in-hospital mortality: 40-50%. UKST data: 1 in 5 hospital deaths associated with sepsis.",
  },
  {
    name: "iron deficiency anaemia",
    symptoms: "fatigue,pallor,dyspnoea,palpitations,tachycardia,headache,dizziness",
    distinguishing_features:
      "Most common cause of anaemia worldwide. Causes: blood loss (menorrhagia — most common in pre-menopausal women; GI bleeding — peptic ulcer, colorectal cancer, IBD, coeliac), inadequate intake (vegetarians, elderly), malabsorption (coeliac — anti-TTG IgA, H. pylori). Tissue iron deficiency features: koilonychia (spoon nails), angular cheilitis/stomatitis, glossitis, Plummer-Vinson syndrome (post-cricoid web + dysphagia + IDA). Pica: craving non-food items (ice, clay) — pathognomonic. Blood film: microcytic, hypochromic, pencil cells, anisocytosis/poikilocytosis. Ferritin: best single test for iron stores — low = IDA; may be falsely elevated as acute phase reactant. Investigation of cause in adults: upper and lower GI endoscopy (OGD + colonoscopy — exclude malignancy). Treat underlying cause + oral ferrous sulphate (constipation — take with food, dark stools).",
    key_investigations:
      "FBC (Hb↓, MCV↓, MCH↓, MCHC↓, ↑RDW), blood film, serum iron (↓), TIBC (↑), transferrin saturation (<20%), ferritin (↓), reticulocyte count (↓), B12/folate (exclude mixed deficiency), anti-TTG IgA (coeliac screen), OGD + colonoscopy (adults — exclude malignancy)",
    icd11_code: "3A00",
    prevalence:
      "~30% of global population anaemic; ~50% due to iron deficiency. UK: ~3% of adult men, ~8% of pre-menopausal women. Most common nutritional deficiency worldwide.",
  },
  {
    name: "diabetic ketoacidosis",
    symptoms: "polyuria,polydipsia,vomiting,nausea,abdominal pain,weight loss,fatigue,altered consciousness,tachycardia,tachypnoea,diaphoresis",
    distinguishing_features:
      "Diagnostic criteria: glucose >11mmol/L (or known T1DM with any glucose), blood ketones ≥3mmol/L or ketonuria 2+, pH <7.3 or bicarbonate <15mmol/L. Precipitants: infection (most common — always look for source), missed insulin (sick-day rules), new-onset T1DM (20-25%), MI, pancreatitis. Kussmaul breathing: deep sighing respiration — respiratory compensation for metabolic acidosis. Acetone breath (pear-drop/fruity smell). Cerebral oedema: rare but serious complication — especially children with rapid fluid shifts. Management (DKA ABCD): IV fluids (0.9% NaCl — 1L over 1h, then 500ml/h ×2, then 250ml/h), fixed-rate insulin infusion (FRII: 0.1 units/kg/hr), potassium replacement (never give insulin if K <3.5 without replacing — CRITICAL), glucose 10% when BG <14mmol/L, monitor hourly (BG, ketones, electrolytes). Resolution: pH >7.3 + ketones <0.3mmol/L + bicarbonate >18mmol/L.",
    key_investigations:
      "Blood glucose (bedside), blood ketones (bedside — key), ABG (pH, bicarbonate, anion gap, PaCO₂), U&E (sodium — corrected for hyperglycaemia; potassium — CRITICAL for management), FBC, blood cultures (infection screen), CXR, ECG (hyperkalaemia changes: peaked T waves, wide QRS), urine dipstick, urinary MC&S, HbA1c, amylase (commonly elevated in DKA without pancreatitis — do not overinterpret)",
    icd11_code: "5A23",
    prevalence:
      "~4-8% of T1DM admissions annually. UK: ~16,000 episodes/year. Mortality <1% in specialist centres (higher in elderly, delayed presentation). Predominantly T1DM; T2DM DKA increasingly recognised (SGLT2 inhibitor-related — euglycaemic DKA).",
  },
  {
    name: "hyperthyroidism",
    symptoms: "weight loss,palpitations,tachycardia,tremor,diaphoresis,fatigue,dyspnoea",
    distinguishing_features:
      "Primary (TSH↓, free T4/T3↑): Graves disease (70-80% — TSH receptor antibodies, diffuse goitre, ophthalmopathy — proptosis, lid lag, periorbital oedema; dermopathy — pretibial myxoedema), toxic multinodular goitre (MNG), toxic adenoma. T3 thyrotoxicosis: T4 normal but T3 elevated. Thyroid storm (thyrotoxic crisis): Burch-Wartofsky score — fever >38.5°C + tachycardia/AF + CNS dysfunction (agitation, psychosis, coma) + GI symptoms. Graves ophthalmopathy: treated separately — EUGOGO classification, selenium, IV methylprednisolone, orbital decompression. AF in hyperthyroidism: 10-15% — cardioversion unlikely to succeed until euthyroid, anticoagulate (CHA₂DS₂-VASc). Atrial tachycardia/sinus tachycardia: most common cardiac manifestation. Treatment: carbimazole (agranulocytosis risk — warn to seek attention for sore throat/fever; monitor FBC), propylthiouracil (pregnancy T1), radioiodine (definitive UK first-line), thyroidectomy.",
    key_investigations:
      "TSH (suppressed — first-line), free T4 (elevated), free T3 (elevated; T3 toxicosis), TSH receptor antibodies TRAb (Graves — sensitivity 97%), thyroid USS (nodularity, vascularity — 'inferno' pattern on Doppler), isotope scan (I-123: diffuse uptake = Graves; focal = adenoma/MNG), ECG (AF, sinus tachycardia), FBC before carbimazole (baseline WCC)",
    icd11_code: "5A01",
    prevalence:
      "~0.5-1% of the population. Graves disease: female:male 5-10:1. Peak onset 20-50 years. Radioiodine: most common definitive treatment UK.",
  },
  {
    name: "acute kidney injury",
    symptoms: "oliguria,oedema,fatigue,nausea,vomiting,altered consciousness,dyspnoea,ankle oedema,tachycardia",
    distinguishing_features:
      "KDIGO criteria: creatinine rise ≥26.5µmol/L within 48h OR ≥1.5× baseline within 7 days OR urine output <0.5ml/kg/h for ≥6h. Staging: 1 (Cr 1.5-1.9× baseline), 2 (2-2.9×), 3 (≥3× or Cr ≥354µmol/L or RRT). Causes: Pre-renal (most common — hypovolaemia, AHF, hepatorenal syndrome; urine Na <20mmol/L, FeNa <1%). Intrinsic renal (ATN — most common intrinsic, from ischaemia or nephrotoxins; GN — red cell casts; AIN — drug-related; vasculitis). Post-renal (obstruction — palpate bladder, catheterise, USS urgently). Hyperkalaemia: emergency — ECG changes (peaked T, widened QRS, sine wave), stabilise membrane (IV calcium gluconate), shift K into cells (insulin-dextrose, nebulised salbutamol), remove K (resonium, dialysis). Indications for urgent RRT (AEIOU): Acidosis, Electrolytes (refractory hyperkalaemia), Intoxication, Overload, Uraemia (encephalopathy, pericarditis).",
    key_investigations:
      "U&E (creatinine trend, urea, potassium — CRITICAL), urinalysis (proteinuria, haematuria, casts — granular = ATN, red cell = GN), USS renal tract (obstruction, renal size), FBC, LFTs, calcium, phosphate, bicarbonate (ABG), urine sodium/creatinine (FeNa), blood cultures (if septic), ECG (hyperkalaemia), ANCA/anti-GBM/ANA/complement (if intrinsic renal disease suspected)",
    icd11_code: "GB60",
    prevalence:
      "~15% of hospital admissions develop AKI; ~50% of ICU patients. Hospital-acquired AKI: 30-day mortality ~25%. Community-acquired AKI: better prognosis with prompt treatment.",
  },
  {
    name: "subarachnoid haemorrhage",
    symptoms: "headache,vomiting,neck stiffness,photophobia,altered consciousness,seizure,syncope",
    distinguishing_features:
      "Classic: sudden-onset 'thunderclap' headache — worst headache of life, peaks within seconds, persists. Caused by ruptured berry aneurysm (85%) — most common at ACoA, PCoA-ICA junction. Non-aneurysmal perimesencephalic SAH (15%): benign, venous origin. Hunt-Hess grade (I-V) and WFNS grade predict prognosis. CT head (non-contrast) within 6h: 98% sensitive. If CT negative: LP at 12h post-onset for xanthochromia (spectrophotometry). CTA/DSA to identify aneurysm. Complications: rebleeding (highest risk 24h), vasospasm (days 3-14 — delayed ischaemic deficit), hydrocephalus, hyponatraemia (SIADH or cerebral salt wasting).",
    key_investigations:
      "CT head non-contrast (within 6h — >98% sensitivity), LP at ≥12h post-onset if CT negative (xanthochromia by spectrophotometry), CTA (aneurysm identification), DSA (gold standard for aneurysm), ECG (deep T-wave inversions, QT prolongation — neurogenic), FBC, coagulation, U&E (hyponatraemia), transcranial Doppler (vasospasm monitoring)",
    icd11_code: "8B00",
    prevalence: "~9 per 100,000/year. Peak 40-60 years. 30-day mortality ~40-50%; 10-15% die before hospital. Of survivors, ~30% have significant disability.",
  },
  {
    name: "anaphylaxis",
    symptoms: "rash,dyspnoea,tachycardia,vomiting,dizziness,syncope,wheeze,oedema,tachypnoea",
    distinguishing_features:
      "Severe, life-threatening systemic hypersensitivity reaction. Onset: usually within 30 min of trigger (food, drugs, venom, latex, idiopathic). Criteria: involvement of skin/mucosal tissue + either respiratory compromise or haemodynamic compromise. Biphasic reaction: 1-8h after initial resolution (in 1-20%). Differential: vasovagal, panic attack, hereditary angioedema (no urticaria, no response to adrenaline — treat with C1-inhibitor), carcinoid (flush, diarrhoea, wheeze), mastocytosis. Skin: urticaria, angioedema, flushing, pruritus.",
    key_investigations:
      "Clinical diagnosis — treat immediately, investigations secondary. Serum mast cell tryptase (within 1-3h of reaction — peak at 60 min; >11.4 µg/L supports anaphylaxis), repeat at 24h baseline, FBC, ECG, oxygen saturation. Subsequent allergy testing: skin prick test, specific IgE (RAST), basophil activation test.",
    icd11_code: "4A84",
    prevalence: "Lifetime prevalence ~0.5-2%. Fatality rate ~0.5-1% of cases. Food (peanuts, tree nuts, shellfish) most common in children; drugs (penicillin, NSAIDs, contrast) and venom in adults.",
  },
  {
    name: "hypertensive emergency",
    symptoms: "headache,visual disturbance,chest pain,dyspnoea,altered consciousness,vomiting,seizure",
    distinguishing_features:
      "BP >180/120 mmHg with acute end-organ damage — distinguishes from hypertensive urgency (no end-organ damage). End-organ damage types: hypertensive encephalopathy (headache, confusion, seizure, papilloedema), aortic dissection (tearing chest/back pain), acute LVF (pulmonary oedema), NSTEMI/STEMI, AKI, haemorrhagic/ischaemic stroke, eclampsia, TMA (microangiopathic haemolytic anaemia, thrombocytopaenia). Target: lower MAP by 10-20% in first hour, then to 160/100 over 2-6h (NOT to normal — risk of end-organ ischaemia). Exception: aortic dissection — target SBP <120 within 20 min.",
    key_investigations:
      "BP both arms (dissection: difference >20mmHg), ECG (LVH, ischaemia), fundoscopy (papilloedema, haemorrhages, exudates — grades III/IV = hypertensive emergency), U&E (AKI, hypokalaemia), FBC (microangiopathic haemolysis), troponin, CXR (pulmonary oedema, widened mediastinum), urine dipstick (proteinuria), CT head (stroke, ICH), CT aorta if dissection suspected",
    icd11_code: "BA80",
    prevalence: "~1-2% of hypertensive patients present as emergency. 1-year mortality if untreated ~90% (historical). With treatment: 5-year survival >70%.",
  },
  {
    name: "cardiac tamponade",
    symptoms: "dyspnoea,chest pain,syncope,tachycardia,dizziness,fatigue,oedema",
    distinguishing_features:
      "Compression of cardiac chambers by pericardial effusion → impaired filling → reduced CO. Beck's triad: hypotension, raised JVP (Kussmaul's sign absent — JVP rises on inspiration), muffled heart sounds. Pulsus paradoxus: SBP drop >10mmHg on inspiration (due to RV filling competing with LV). CXR: 'water bottle' heart (if effusion >250ml). ECG: sinus tachycardia, low-voltage QRS, electrical alternans (pathognomonic). Echo: gold standard — RA/RV diastolic collapse, IVC plethora, respiratory variation in mitral/tricuspid flow. Causes: malignancy (most common), idiopathic, TB, post-MI (Dressler's), post-cardiac surgery, uraemia.",
    key_investigations:
      "Echo (gold standard — pericardial effusion + haemodynamic compromise), ECG (sinus tachycardia, low voltage, electrical alternans), CXR (globular heart), pulsus paradoxus (sphygmomanometer), U&E (uraemia), troponin, FBC, pericardial fluid analysis post-drainage (cytology, MC&S, AFB, LDH, protein)",
    icd11_code: "BC71",
    prevalence: "Uncommon in general population; seen in 2% of penetrating chest trauma, 14% of malignant pericardial effusions. Mortality very high without pericardiocentesis.",
  },
  {
    name: "infective endocarditis",
    symptoms: "fever,malaise,rigors,weight loss,fatigue,dyspnoea,tachycardia,diaphoresis",
    distinguishing_features:
      "Infection of cardiac valvular endothelium or mural endocardium. Modified Duke Criteria: Major (blood cultures positive for typical organisms — S. aureus, viridans streptococci; evidence of endocardial involvement on echo — vegetation, abscess, dehiscence). Minor (predisposition, fever >38°C, vascular phenomena, immunological phenomena, microbiological evidence). Definite: 2 major, 1 major + 3 minor, or 5 minor. Peripheral stigmata: Osler nodes (painful finger pulp), Janeway lesions (painless palmar/plantar haemorrhages), Roth spots (retinal haemorrhages), splinter haemorrhages, splenomegaly, finger clubbing. Most common organisms: S. aureus (acute, IVDU), viridans streptococci (subacute, dental), Enterococcus, Streptococcus bovis (associated with colon cancer — colonoscopy needed).",
    key_investigations:
      "Blood cultures ×3 from different sites before antibiotics (essential — most important investigation), echo (TOE more sensitive than TTE for vegetations — TOE if TTE negative and high suspicion), FBC (anaemia, leukocytosis), CRP/ESR, U&E, LFTs, urinalysis (microscopic haematuria/casts), RF (immunological phenomena), ECHO, dental panoramic radiograph",
    icd11_code: "BA80.1",
    prevalence: "3-10 per 100,000/year. Mortality 15-30% despite treatment. S. aureus endocarditis: in-hospital mortality ~25-40%.",
  },
  {
    name: "pulmonary tuberculosis",
    symptoms: "productive cough,haemoptysis,weight loss,fever,diaphoresis,fatigue,dyspnoea",
    distinguishing_features:
      "Caused by Mycobacterium tuberculosis. Primary TB often asymptomatic — Ghon focus + hilar lymphadenopathy = Ghon complex. Post-primary (reactivation): upper lobe cavitation, night sweats, haemoptysis. Risk factors: immunosuppression (HIV — most important globally), malnutrition, diabetes, overcrowding, prior TB. CXR: upper lobe infiltrates/cavities, hilar lymphadenopathy, miliary pattern (haematogenous spread). IGRA (interferon-gamma release assay) or Mantoux: latent TB. Sputum AFB smear (3 samples) + culture (gold standard, 6-8 weeks). GeneXpert (rapid PCR, also detects rifampicin resistance). Notifiable disease — contact tracing mandatory. Standard treatment: 2HRZE + 4HR (rifampicin, isoniazid, pyrazinamide, ethambutol).",
    key_investigations:
      "Sputum AFB smear ×3 (early morning — 40-60% sensitivity), GeneXpert MTB/RIF (rapid PCR, 85% sensitivity, detects rifampicin resistance), sputum culture on Lowenstein-Jensen (gold standard — 80-90% sensitivity), CXR PA, IGRA/Mantoux, HIV test, LFTs (baseline before hepatotoxic drugs), FBC, bronchoscopy + BAL if sputum negative",
    icd11_code: "1B10",
    prevalence: "~10 million new cases/year globally. UK: ~5,000 cases/year. 90% asymptomatic latent infection; 10% lifetime risk of reactivation. HIV co-infection increases risk 20-30×.",
  },
  {
    name: "ectopic pregnancy",
    symptoms: "abdominal pain,vomiting,syncope,tachycardia,dizziness,shoulder tip pain,vaginal bleeding",
    distinguishing_features:
      "Implantation outside uterine cavity — 95% in fallopian tubes (ampullary most common). Risk factors: previous ectopic, PID, tubal surgery, IUD, assisted conception. Triad: amenorrhoea + lower abdominal pain + vaginal bleeding (60-70% have all three). Rupture: sudden severe pain, haemoperitoneum, peritonism, haemodynamic collapse. Shoulder tip pain: diaphragmatic irritation from haemoperitoneum. β-hCG positive (always check in women of reproductive age with abdominal pain). Discriminatory zone: if β-hCG >1500-2000 IU/L and no intrauterine pregnancy on TVUSS = ectopic until proven otherwise. Cornual/interstitial: ruptures later (12-14 weeks), higher mortality.",
    key_investigations:
      "Urine βhCG (immediate), serum βhCG (quantitative + serial every 48h — should double in normal IUP; plateau/fall in ectopic), transvaginal USS (gold standard for location), FBC, group and save (rhesus status), coagulation (if haemodynamically unstable), laparoscopy (definitive diagnosis and treatment)",
    icd11_code: "JA01",
    prevalence: "1-2% of pregnancies. Commonest cause of maternal death in first trimester. Incidence rising due to PID and assisted reproduction.",
  },
  {
    name: "pre-eclampsia",
    symptoms: "headache,visual disturbance,oedema,epigastric pain,vomiting,tachycardia",
    distinguishing_features:
      "New-onset hypertension (≥140/90 mmHg on 2 occasions ≥4h apart) after 20 weeks gestation + proteinuria (≥300mg/24h or PCR ≥30mg/mmol) or end-organ dysfunction. Severe features: BP ≥160/110, thrombocytopaenia (<100×10⁹/L), renal impairment (creatinine >97µmol/L), impaired liver function (ALT >2× ULN), pulmonary oedema, new-onset headache, visual disturbance. HELLP syndrome: Haemolysis (microangiopathic), Elevated Liver enzymes, Low Platelets — severe variant, mortality 1-3%. Eclampsia: seizures in context of pre-eclampsia. Only cure: delivery. Pathophysiology: abnormal placentation → ischaemia → systemic inflammatory response → widespread endothelial dysfunction.",
    key_investigations:
      "BP monitoring (sphygmomanometer — avoid automated in severe pre-eclampsia), urine PCR or 24h urine protein, FBC (platelets — HELLP), LFTs (AST/ALT — HELLP), U&E (AKI), LDH (haemolysis), blood film (schistocytes), coagulation (DIC), CTG (fetal wellbeing), USS (growth restriction, liquor volume, Doppler), urate (raised in pre-eclampsia)",
    icd11_code: "JA24",
    prevalence: "2-8% of pregnancies worldwide. Leading cause of maternal and perinatal morbidity/mortality. Pre-term delivery in 15% of cases.",
  },
  {
    name: "Addison's disease",
    symptoms: "fatigue,weight loss,nausea,vomiting,dizziness,syncope,anorexia,malaise",
    distinguishing_features:
      "Primary adrenal insufficiency — bilateral adrenal cortex destruction. Causes: autoimmune (80% in developed world — anti-21-hydroxylase antibodies), TB (most common worldwide), metastases, haemorrhage (Waterhouse-Friderichsen — meningococcal), drugs (ketoconazole, etomidate). Features: fatigue, postural hypotension, hyponatraemia, hyperkalaemia, hypoglycaemia, hyperpigmentation (buccal mucosa, skin creases, scars, pressure areas — ↑ACTH drives MSH release). Adrenal crisis: life-threatening — precipitated by intercurrent illness, trauma, surgery; presents with severe hypotension, vomiting, abdominal pain, altered consciousness. Treatment: hydrocortisone 100mg IV immediately — do not wait for results. Short Synacthen Test: 250µg tetracosactide IM → cortisol <500 nmol/L at 30/60 min = adrenal insufficiency.",
    key_investigations:
      "9am cortisol (<100 nmol/L = almost certain; >500 nmol/L = excluded), Short Synacthen Test (gold standard — 250µg tetracosactide IM, measure cortisol at 0, 30, 60 min), ACTH (↑primary, ↓secondary), anti-21-hydroxylase antibodies, U&E (hyponatraemia, hyperkalaemia, uraemia), glucose (hypoglycaemia), adrenal CT (bilateral adrenal enlargement in TB/malignancy; small in autoimmune), AXR/CXR (adrenal calcification in TB)",
    icd11_code: "5A70",
    prevalence: "~120 per million. Female:male 2:1 for autoimmune. Adrenal crisis mortality ~6% per episode without prompt treatment.",
  },
  {
    name: "hyperosmolar hyperglycaemic state",
    symptoms: "polydipsia,polyuria,altered consciousness,fatigue,vomiting,tachycardia,dyspnoea",
    distinguishing_features:
      "Life-threatening complication of type 2 diabetes. Distinguishing from DKA: serum glucose >30 mmol/L, plasma osmolality >320 mOsm/kg, NO significant ketonaemia (<3 mmol/L) or acidosis (pH >7.30, bicarbonate >15). Profound dehydration (fluid deficit 5-10L vs 3-5L in DKA). Altered consciousness/coma from hyperosmolality. Precipitants: infection, MI, stroke, drugs (diuretics, steroids, antipsychotics — clozapine). Complications: VTE (high risk — dehydration + hypercoagulability), cerebral oedema if corrected too rapidly, rhabdomyolysis. Mortality 10-20% (higher than DKA) — mostly elderly with significant comorbidities. Correct glucose slowly: target 5 mmol/L/hour reduction. Use 0.9% NaCl initially; insulin only after glucose <15 mmol/L unless ketonaemia present.",
    key_investigations:
      "Glucose (>30 mmol/L), plasma osmolality (calc: 2[Na+K] + urea + glucose; >320), U&E (hypernatraemia despite total body Na deficit, hypokalaemia), ketones (blood/urine — minimal in HHS), ABG (pH >7.30 — no acidosis), FBC, CRP, blood cultures, ECG (precipitant MI, hypokalaemia changes), CXR, urine MC&S, troponin",
    icd11_code: "5A23",
    prevalence: "~20-30% of diabetic emergencies. Predominantly type 2 diabetes. 10-20% mortality. Can be first presentation of T2DM in 25-30% of cases.",
  },
  {
    name: "acute mesenteric ischaemia",
    symptoms: "abdominal pain,vomiting,diarrhoea,tachycardia,fever,nausea",
    distinguishing_features:
      "Surgical emergency — bowel infarction without prompt intervention. Classic: severe central abdominal pain out of proportion to clinical findings (peritonism only once transmural infarction). Four types: arterial embolism (50% — AF most common source, sudden onset), arterial thrombosis (25% — pre-existing atherosclerosis, post-prandial pain, weight loss), venous thrombosis (10% — hypercoagulable states, portal hypertension), non-occlusive (15% — low-flow states: cardiogenic shock, vasoconstriction). D-lactate elevated (bowel bacteria product). CT mesenteric angiography: gold standard. Late signs: haemodynamic instability, peritonitis, metabolic acidosis, haemoconcentration, elevated lactate. Mortality 60-80% if bowel necrosis.",
    key_investigations:
      "CT mesenteric angiography (gold standard — arterial phase), lactate (elevated — bowel ischaemia, correlates with severity), ABG (metabolic acidosis), FBC (haemoconcentration — rising haematocrit), CRP, D-dimer, coagulation, ECG (AF — embolic source), echo (cardiac thrombus), AXR (thumbprinting, pneumatosis intestinalis — late sign), explorative laparoscopy if CT inconclusive",
    icd11_code: "DB99",
    prevalence: "0.1% of acute surgical admissions but mortality >60% once bowel necrosis. Increasing with ageing population and AF prevalence.",
  },
  {
    name: "acute angle-closure glaucoma",
    symptoms: "headache,vomiting,visual disturbance,eye pain,nausea",
    distinguishing_features:
      "Sudden occlusion of trabecular meshwork by peripheral iris → acute IOP rise (>21 mmHg, often 40-80 mmHg). Risk factors: hypermetropia (shallow anterior chamber), female, Asian ethnicity, age >60, dilated pupil (dim light, mydriatics, anticholinergics, sympathomimetics). Presentation: severe unilateral eye pain radiating to forehead/temple, fixed mid-dilated pupil, corneal cloudiness/oedema, coloured halos around lights, reduced visual acuity. The headache and vomiting can mimic migraine or subarachnoid haemorrhage — look at the eye. Slit-lamp: shallow anterior chamber, corneal oedema, fixed semi-dilated pupil. Immediate treatment: reduce IOP urgently — IV acetazolamide, topical timolol/pilocarpine, IV mannitol. Definitive: laser peripheral iridotomy.",
    key_investigations:
      "Tonometry (IOP >21 mmHg, often 40-80 — gold standard), slit-lamp examination (corneal oedema, shallow AC, fixed pupil), gonioscopy (closed angle), visual field testing, dilated fundoscopy (optic disc — cupping), corneal pachymetry, anterior segment OCT",
    icd11_code: "9C61",
    prevalence: "~6-8 per 100,000/year in Caucasians; higher in Asians. Female:male ~4:1. Contralateral eye: 50% risk of attack within 5 years without prophylactic iridotomy.",
  },
  {
    name: "cellulitis",
    symptoms: "rash,fever,malaise,oedema,tachycardia,fatigue",
    distinguishing_features:
      "Bacterial infection of dermis and subcutaneous tissue. Most common organisms: beta-haemolytic streptococci (Groups A, B, C, G) and S. aureus. Lower limb (90%) — entry via skin break, tinea pedis, venous ulcer. Features: spreading erythema (mark borders to monitor progression), warmth, swelling, tenderness. Eron classification: Class I (no systemic illness, no comorbidities — oral antibiotics), Class II/III/IV (systemic illness or co-morbidities or severe — IV antibiotics). Differential: DVT (USS), lipodermatosclerosis (chronic, indurated, brown pigmentation), contact dermatitis (bilateral, itchy), necrotising fasciitis (rapidly spreading, severe pain, systemic toxicity, crepitus, gas on imaging). Necrotising fasciitis (LRINEC score ≥6): surgical emergency — do not delay debridement for imaging.",
    key_investigations:
      "Clinical diagnosis — bloods and imaging guide severity and rule out complications. FBC (leukocytosis), CRP/ESR (elevated), blood cultures (if systemic illness — bacteraemia in <2%), swab (if open wound/discharge), USS (abscess — fluctuant area, treatment: incision and drainage), LRINEC score (rule out NF: CRP, WCC, Hb, Na, creatinine, glucose), MRI (definitive for NF if diagnosis uncertain)",
    icd11_code: "1B72",
    prevalence: "~24 per 1000 person-years. Accounts for 1-3% of A&E attendances. 30-day recurrence rate ~15%. Annual recurrence rate ~8-20%.",
  },
  {
    name: "liver cirrhosis",
    symptoms: "jaundice,oedema,fatigue,weight loss,nausea,malaise,vomiting,anorexia",
    distinguishing_features:
      "End-stage liver disease — replacement of hepatocytes by fibrotic tissue. Causes: alcohol (most common in UK), NAFLD/NASH (increasing), viral hepatitis (HBV, HCV), autoimmune hepatitis, PBC, PSC, haemochromatosis, Wilson's disease. Compensated vs decompensated (ascites, variceal haemorrhage, hepatic encephalopathy, jaundice). Child-Pugh score (bilirubin, albumin, PT, ascites, encephalopathy) and MELD score (bilirubin, INR, creatinine) predict prognosis and transplant priority. Complications: portal hypertension (varices, ascites, splenomegaly), hepatic encephalopathy (ammonia, check EEG — triphasic waves), HRS (AKI in cirrhosis — poor prognosis), SBP (fever, abdominal pain, ascites — PMNs >250/mm³ in ascitic tap), HCC (AFP + USS screening every 6 months).",
    key_investigations:
      "LFTs (↑bilirubin, ↑ALP/GGT, ↓albumin — late sign of decompensation), PT/INR (synthetic function marker), FBC (thrombocytopaenia — hypersplenism, anaemia), U&E (hyponatraemia, AKI — hepatorenal), USS abdomen (nodular liver, splenomegaly, ascites, portal vein flow), OGD (varices), diagnostic ascitic tap (PMN count, albumin — SAAG, MC&S — SBP), ARFI/FibroScan (liver stiffness), liver biopsy (rarely needed now), AFP (HCC screening)",
    icd11_code: "DB93",
    prevalence: "~25 per 100,000 in UK. 400,000 in UK with cirrhosis. 10-year survival: compensated ~50%, decompensated <50% at 5 years. Liver transplant improves survival significantly.",
  },
  {
    name: "pleural effusion",
    symptoms: "dyspnoea,pleuritic chest pain,cough,tachypnoea,fatigue,malaise",
    distinguishing_features:
      "Accumulation of fluid in pleural space. Classified by Light's criteria into transudates (protein <25g/L, pleural:serum protein <0.5, pleural:serum LDH <0.6) vs exudates (any one criterion met). Transudates: HF (bilateral, raised JVP), cirrhosis, nephrotic syndrome, hypothyroidism. Exudates: pneumonia (parapneumonic — most common exudate), malignancy (commonly unilateral, bloody, large), TB (exudate, lymphocytic, ADA >40), PE (blood-stained exudate), rheumatoid/SLE. Clinical: stony dull to percussion, reduced breath sounds, bronchial breathing above effusion (tactile fremitus absent). CXR: meniscus sign (>200ml), blunts costophrenic angle (>150ml), contralateral mediastinal shift (large). USS: confirms effusion, guides aspiration. CT thorax with contrast: characterises pleura, identifies cause.",
    key_investigations:
      "CXR PA (blunted costophrenic angle, meniscus, mediastinal shift), USS thorax (confirms fluid, guides aspiration), CT chest with contrast (characterise pleura, malignancy), diagnostic pleural aspiration (Light's criteria — protein, LDH; pH — <7.2 needs drain; glucose; MC&S; cytology — malignancy; AFB — TB; ADA — TB if >40), FBC, LFTs, U&E, albumin, serum LDH/protein (for Light's), NT-proBNP (HF)",
    icd11_code: "CB21",
    prevalence: "~320 per 100,000/year. Commonest causes: HF (40%), malignancy (25%), pneumonia (15%). Malignant effusion median survival 3-12 months depending on primary.",
  },
  {
    name: "Crohn's disease",
    symptoms: "abdominal pain,diarrhoea,weight loss,fatigue,fever,malaise,nausea",
    distinguishing_features:
      "Inflammatory bowel disease — transmural granulomatous inflammation, can affect any part of GI tract (mouth to anus), skip lesions. Most common: terminal ileum + colon (ileocolonic 40%). Features: abdominal pain (RIF most common — terminal ileal disease), diarrhoea (may be bloody but less than UC), weight loss, perianal disease (fistulae, skin tags, abscesses — pathognomonic). Extra-intestinal manifestations (EIMs): joints (arthropathy, AS), eyes (uveitis, episcleritis), skin (erythema nodosum — disease activity, pyoderma gangrenosum — independent), PSC (more in UC). Complications: stricture (obstructive symptoms), fistula (enteroenteral, enterovaginal, enterovesical), abscess, perforation, malabsorption (terminal ileal disease — B12 deficiency, bile salt malabsorption — diarrhoea). Montreal classification: disease location (L1-L4) and behaviour (B1 inflammatory, B2 stricturing, B3 penetrating).",
    key_investigations:
      "FBC (anaemia — iron/B12/folate deficiency), CRP/ESR, albumin (low — disease severity/malnutrition), B12/folate (terminal ileal disease), faecal calprotectin (>250 µg/g = active IBD, NPV ~94% for excluding active IBD), faecal cultures (exclude infective colitis), colonoscopy + biopsy (gold standard — cobblestoning, aphthous ulcers, skip lesions, granulomas on histology in 30%), MRI small bowel (strictures, fistulae, active inflammation — no radiation), CT abdomen (acute complications — abscess, perforation)",
    icd11_code: "DD70",
    prevalence: "~200-300 per 100,000 in UK. Incidence 5-10 per 100,000/year. Peak onset 15-35 and 55-70 years. Bimodal distribution. Female:male approximately equal.",
  },
  {
    name: "ulcerative colitis",
    symptoms: "diarrhoea,abdominal pain,weight loss,fatigue,fever,malaise",
    distinguishing_features:
      "Inflammatory bowel disease — mucosal inflammation limited to colon, always involves rectum (proctitis), extends proximally in continuity. Bloody diarrhoea is hallmark (unlike Crohn's — often non-bloody). Extent: proctitis (E1), left-sided/distal (E2, up to splenic flexure), extensive/pancolitis (E3). Truelove-Witts criteria for acute severe UC (any one): >6 bloody stools/day, fever >37.8°C, HR >90, Hb <105g/L, ESR >30, CRP >30. Admit immediately — risk of toxic megacolon (>6cm transverse colon on AXR). Complications: toxic megacolon (obstruction, perforation), colorectal cancer (risk increases after 8-10 years of extensive disease — needs surveillance colonoscopy), primary sclerosing cholangitis (PSC — 5%, biliary strictures, ↑risk of cholangiocarcinoma). EIMs similar to Crohn's but PSC more common in UC.",
    key_investigations:
      "FBC (anaemia, thrombocytosis — acute phase), CRP, albumin, AXR (toxic megacolon >6cm, mucosal islands), rigid sigmoidoscopy/flexible sigmoidoscopy + biopsy (DO NOT proceed to full colonoscopy in acute severe — risk of perforation), stool cultures (exclude infective colitis — Clostridium difficile, Campylobacter, Salmonella), faecal calprotectin, colonoscopy + biopsy (gold standard in remission — continuous inflammation from rectum, no skip lesions, loss of haustra — lead pipe, pseudopolyps)",
    icd11_code: "DD71",
    prevalence: "~250-400 per 100,000 in UK. Incidence ~10-15 per 100,000/year. Slightly more common than Crohn's. Female:male approximately equal. Peak onset 20-40 years.",
  },
  {
    name: "chronic kidney disease",
    symptoms: "fatigue,oedema,oliguria,nausea,dyspnoea,malaise,anorexia,pruritus",
    distinguishing_features:
      "Structural or functional kidney abnormality persisting >3 months. Staged by GFR (G1-G5) and albuminuria (A1-A3) — CGA staging (Cause, GFR, Albuminuria). Causes: diabetic nephropathy (most common — diffuse glomerulosclerosis, Kimmelstiel-Wilson nodules), hypertensive nephrosclerosis, IgA nephropathy (most common primary GN), FSGS, polycystic kidney disease. Complications: anaemia (↓EPO — normochromic normocytic), mineral bone disease (↑PTH, ↓vit D — renal osteodystrophy), cardiovascular disease (leading cause of death in CKD), hyperkalaemia, metabolic acidosis, uraemic symptoms (GFR <15 — uraemic pericarditis, encephalopathy, pruritus). CKD-EPI equation for eGFR. KDIGO staging: G1 (≥90), G2 (60-89), G3a (45-59), G3b (30-44), G4 (15-29), G5 (<15 or dialysis).",
    key_investigations:
      "eGFR (CKD-EPI), ACR (albumin:creatinine ratio — A1 <3, A2 3-30, A3 >30 mg/mmol), U&E (creatinine, potassium, bicarbonate), FBC (normochromic normocytic anaemia — EPO deficiency), bone profile (Ca, phosphate, ALP, PTH — renal osteodystrophy), LFTs, urinalysis (proteinuria, haematuria), USS renal tract (kidney size — small in CKD, echogenicity, obstruction, cysts — PKD), renal biopsy (if diagnosis uncertain and management would change)",
    icd11_code: "GB61",
    prevalence: "~10-15% of adults globally. Prevalence 6-7% in UK. 1.5-2 million on renal replacement therapy worldwide. CKD G3-G5: ~7% of UK adult population.",
  },
];
