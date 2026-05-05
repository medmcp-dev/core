export const drugs = [
  {
    name: "metformin",
    generic_name: "metformin hydrochloride",
    drug_class: "biguanide / antidiabetic",
    mechanism:
      "Activates AMPK → inhibits hepatic gluconeogenesis (primary effect, ~70% reduction). Also increases peripheral glucose uptake, reduces intestinal glucose absorption, and improves insulin sensitivity without stimulating insulin secretion. Does NOT cause hypoglycemia.",
    indications:
      "Type 2 diabetes mellitus (first-line), pre-diabetes, polycystic ovary syndrome (PCOS, off-label), weight management in T2DM",
    contraindications:
      "eGFR <30 mL/min (hold if <45 perioperatively), active hepatic disease, excessive alcohol use, contrast dye administration (hold 48h), metabolic acidosis",
    side_effects:
      "GI: nausea, diarrhoea, abdominal pain (most common, take with food), metallic taste. Rare: lactic acidosis (eGFR <30, hepatic disease, alcohol). Long-term: vitamin B12 deficiency (check annually).",
    dosing:
      "Start 500mg BD with meals or 850mg OD. Titrate over 4-8 weeks. Maximum 2550mg/day (usually 2000mg/day for GI tolerability). XR formulation has better GI profile.",
    monitoring:
      "HbA1c every 3 months until stable, then 6-monthly. eGFR annually (or more frequently if CKD). Vitamin B12 annually. LFTs at baseline.",
  },
  {
    name: "atorvastatin",
    generic_name: "atorvastatin calcium",
    drug_class: "HMG-CoA reductase inhibitor / statin",
    mechanism:
      "Competitively inhibits HMG-CoA reductase (rate-limiting step in hepatic cholesterol synthesis) → ↓intracellular cholesterol → upregulates LDL receptors on hepatocytes → ↑LDL clearance from plasma. Also: ↓VLDL, ↑HDL, anti-inflammatory (pleiotropic effects independent of lipid lowering).",
    indications:
      "Primary/secondary prevention of cardiovascular events (MI, stroke), hypercholesterolaemia, familial hypercholesterolaemia, diabetic dyslipidaemia",
    contraindications:
      "Active hepatic disease, unexplained persistent LFT elevation, pregnancy (teratogenic — category X), breastfeeding. Use caution with CYP3A4 inhibitors (risk of myopathy).",
    side_effects:
      "Myalgia (most common, 5-10%). Myositis (elevated CK). Rare: rhabdomyolysis (CK >10x ULN, myoglobinuria, AKI). Hepatotoxicity (rare, check LFTs if symptomatic). New-onset T2DM (modest risk). Cognitive effects (rare, reversible).",
    dosing:
      "10-80mg once daily at any time (unlike older statins, does not need evening dosing — long half-life). High-intensity: 40-80mg (>50% LDL reduction). Moderate: 10-20mg (30-50% reduction).",
    monitoring:
      "Fasting lipid panel at 4-12 weeks after initiation/dose change, then annually. LFTs at baseline, repeat if symptomatic. CK if myalgia develops.",
  },
  {
    name: "lisinopril",
    generic_name: "lisinopril",
    drug_class: "ACE inhibitor / antihypertensive",
    mechanism:
      "Inhibits angiotensin-converting enzyme (ACE) → prevents angiotensin I → angiotensin II conversion → vasodilation (no AT1R stimulation), ↓aldosterone release (→ ↓Na⁺/H₂O retention, ↑K⁺), ↓ADH release. Also prevents bradykinin breakdown → vasodilation + cough. Reduces efferent arteriolar tone in kidney → ↓glomerular pressure → renoprotective.",
    indications:
      "Hypertension, heart failure (EF <40%), post-MI cardioprotection, diabetic nephropathy (first-line with microalbuminuria), CKD with proteinuria",
    contraindications:
      "Bilateral renal artery stenosis, pregnancy (teratogenic — all trimesters), history of ACE-inhibitor-induced angioedema, concurrent aliskiren use (if eGFR <60), hyperkalemia (K⁺ >5.5 mmol/L)",
    side_effects:
      "Dry persistent cough (10-15%, bradykinin-mediated — switch to ARB). Angioedema (rare, 0.1-0.5%, life-threatening — African Americans higher risk). First-dose hypotension. Hyperkalemia. AKI (in volume depletion or bilateral RAS). Teratogenicity.",
    dosing:
      "Hypertension: start 5-10mg OD, target 20-40mg. Heart failure: start 2.5mg OD (low BP risk), target 20-35mg. Post-MI: start 2.5-5mg within 24h, increase to 10mg BD.",
    monitoring:
      "BP, eGFR, and K⁺ at 1-2 weeks after initiation or dose change, then 3-6 monthly. Hold/reduce dose if K⁺ >5.5 or creatinine rises >30% above baseline.",
  },
  {
    name: "aspirin",
    generic_name: "acetylsalicylic acid",
    drug_class: "antiplatelet / NSAID / salicylate",
    mechanism:
      "Irreversibly acetylates COX-1 (and COX-2) → blocks thromboxane A₂ (TXA₂) synthesis in platelets (platelet effect lasts platelet lifetime ~7-10 days, no new COX synthesis). Low dose (75-100mg): selective antiplatelet. High dose (>300mg): anti-inflammatory and analgesic via COX-1/2 inhibition → ↓prostaglandins.",
    indications:
      "Acute MI / ACS (300mg loading), secondary prevention of cardiovascular events (75mg OD), ischaemic stroke prevention, primary prevention (selected high-risk patients only — benefit/risk reassessment needed), Kawasaki disease (high dose)",
    contraindications:
      "Active peptic ulcer disease, bleeding disorders (haemophilia), severe hepatic failure, children <16 years with viral illness (Reye syndrome risk), hypersensitivity / aspirin-exacerbated respiratory disease (AERD), concurrent anticoagulation without clear indication",
    side_effects:
      "GI: dyspepsia, peptic ulceration, GI bleeding (take with food or PPI cover). Bleeding risk (surgical — hold 7-10 days pre-op). Reye syndrome (children). Salicylate toxicity (high dose): tinnitus, hyperventilation, metabolic acidosis. Hypersensitivity (ASA triad).",
    dosing:
      "Antiplatelet: 75-100mg OD. Acute ACS/stroke: 300mg stat (loading). Anti-inflammatory/analgesic: 300-900mg every 4-6h (max 4g/day). Enteric-coated reduces GI symptoms but not GI bleeding risk.",
    monitoring:
      "No routine monitoring for low-dose antiplatelet use. Signs of bleeding. Renal function if long-term high dose. Haematocrit annually in elderly.",
  },
  {
    name: "warfarin",
    generic_name: "warfarin sodium",
    drug_class: "vitamin K antagonist / anticoagulant",
    mechanism:
      "Inhibits vitamin K epoxide reductase (VKOR) → prevents recycling of vitamin K → impairs γ-carboxylation of clotting factors II, VII, IX, X (and proteins C, S). Factor VII has shortest half-life (6h) → PT/INR rises first. Full effect takes 3-5 days. Protein C and S also reduced → initial pro-thrombotic state (warfarin skin necrosis in protein C deficiency).",
    indications:
      "AF (non-valvular, CHA₂DS₂-VASc ≥2), mechanical heart valves (only anticoagulant with evidence), DVT/PE treatment and secondary prevention, antiphospholipid syndrome",
    contraindications:
      "Active major bleeding, pregnancy (teratogenic — warfarin embryopathy), severe hepatic disease, poor adherence/monitoring capacity. Use caution with drugs affecting CYP2C9 or vitamin K.",
    side_effects:
      "Bleeding (major: intracranial, GI — supratherapeutic INR). Warfarin skin necrosis (rare, day 3-5, protein C/S deficiency — give heparin bridge). Purple toe syndrome. Teratogenicity (1st and 3rd trimester). Drug and food interactions (major clinical burden).",
    dosing:
      "Highly variable — guided by INR response and pharmacogenomics (CYP2C9, VKORC1). Typical starting dose: 5mg OD, then adjust. Target INR: 2-3 (most indications), 2.5-3.5 (mechanical mitral valve). Many drugs and foods (vitamin K) alter dose requirements.",
    monitoring:
      "INR: daily initially, then weekly when stable, then monthly when stable for 3+ months. Each dose change requires rechecking INR in 3-5 days. Supratherapeutic INR >5: withhold warfarin ± vitamin K (oral or IV). INR >8 or bleeding: reverse with vitamin K ± PCC/FFP.",
  },
  {
    name: "amoxicillin",
    generic_name: "amoxicillin trihydrate",
    drug_class: "aminopenicillin / beta-lactam antibiotic",
    mechanism:
      "Binds penicillin-binding proteins (PBPs) → inhibits transpeptidation step of peptidoglycan cross-linking → cell wall synthesis failure → bacteriolysis. Bactericidal, time-dependent killing (efficacy depends on time above MIC). Broader spectrum than benzylpenicillin: covers streptococci, enterococci, H. influenzae, E. coli, Listeria. NOT stable against beta-lactamases (add clavulanate for resistant organisms).",
    indications:
      "Community-acquired pneumonia (mild-moderate), upper RTIs (otitis media, sinusitis, tonsillitis), UTIs (if susceptible E. coli), H. pylori eradication (triple therapy), Lyme disease, endocarditis prophylaxis, Listeria meningitis",
    contraindications:
      "Penicillin allergy (cross-reactivity with cephalosporins ~1-2%). Infectious mononucleosis (EBV) — causes florid maculopapular rash (not true allergy). Renal impairment: reduce dose if eGFR <10.",
    side_effects:
      "Diarrhoea (most common, ~10%). Nausea, vomiting. Maculopapular rash (especially with EBV). Hypersensitivity: urticaria, anaphylaxis (IgE-mediated, <0.05%). Clostridium difficile colitis (any antibiotic). Convulsions at very high doses.",
    dosing:
      "Adults: 250-500mg TDS or 875mg BD (PO). Severe infection: 1g TDS. Pneumonia: 500mg TDS for 5 days. H. pylori: 1g BD (+ clarithromycin + PPI) for 7-14 days. IV: 500mg-1g every 6-8h.",
    monitoring:
      "No routine monitoring. Signs of allergic reaction. Renal function if prolonged use. C. difficile if diarrhoea persists >2 days.",
  },
  {
    name: "furosemide",
    generic_name: "furosemide",
    drug_class: "loop diuretic",
    mechanism:
      "Inhibits Na⁺/K⁺/2Cl⁻ (NKCC2) cotransporter in thick ascending limb of loop of Henle → prevents concentration of medullary interstitium → impairs water reabsorption → massive natriuresis (20-25% of filtered Na⁺ excreted, cf. thiazides ~5%). Also: venodilation (rapid onset, preload reduction before diuresis). Prostaglandin-mediated effects (blocked by NSAIDs).",
    indications:
      "Acute pulmonary oedema (IV), heart failure (chronic fluid overload), nephrotic syndrome oedema, hepatic ascites, hypertension (resistant, volume-dependent), hypercalcaemia (with IV saline), Ménière disease",
    contraindications:
      "Anuria (unresponsive to diuretics), electrolyte depletion (hyponatraemia, hypokalaemia), hepatic coma precipitated by electrolyte imbalance, allergy (sulfonamide — rare cross-reactivity). Caution: dehydration, hypovolaemia.",
    side_effects:
      "Hypokalaemia (most common — use K⁺ supplement or K⁺-sparing diuretic). Hyponatraemia, hypomagnesaemia. Dehydration, postural hypotension, pre-renal AKI (creatinine rise). Ototoxicity (high dose IV, especially with aminoglycosides). Hyperuricaemia (gout). Glucose intolerance. Sulfonamide hypersensitivity (rare).",
    dosing:
      "PO: 20-80mg OD-BD (heart failure, start low, titrate to response, max 600mg/day). IV acute pulmonary oedema: 40mg stat (if on diuretics, give equivalent daily dose as IV). IV infusion: 5-10mg/h. Bioavailability PO ~50% (variable) — double PO dose when switching from IV.",
    monitoring:
      "Electrolytes (Na⁺, K⁺, Mg²⁺) and renal function: after initiation, after dose changes, then 3-6 monthly. Daily weights in heart failure. Uric acid if symptomatic. BP for orthostatic hypotension.",
  },
  {
    name: "omeprazole",
    generic_name: "omeprazole",
    drug_class: "proton pump inhibitor (PPI)",
    mechanism:
      "Prodrug — activated in acidic environment of parietal cell canaliculi → irreversibly binds H⁺/K⁺-ATPase (proton pump) → blocks final step of gastric acid secretion (inhibits acid regardless of stimulus). 80-95% acid suppression. Effect lasts 24-36h (new pumps must be synthesised for recovery). Best taken 30-60 min before first meal (pumps activated by eating).",
    indications:
      "GORD/GERD (gastro-oesophageal reflux disease), peptic ulcer disease (healing and prevention), H. pylori eradication (component of triple therapy), NSAID-associated ulcer prevention, Zollinger-Ellison syndrome, stress ulcer prophylaxis (ICU), Barrett's oesophagus",
    contraindications:
      "Known hypersensitivity. Avoid concurrent use with clopidogrel (CYP2C19 inhibition may reduce antiplatelet effect — use pantoprazole instead). Atazanavir/nelfinavir (requires acidic pH for absorption).",
    side_effects:
      "Generally well tolerated. Short-term: headache, diarrhoea, nausea. Long-term (>1 year): hypomagnesaemia (refractory), hypocalcaemia, vitamin B12 deficiency, increased C. difficile risk, community-acquired pneumonia (↓acid barrier), hip fracture (↓Ca²⁺ absorption), SIBO, rebound acid hypersecretion on stopping.",
    dosing:
      "GORD: 20mg OD before breakfast. Duodenal ulcer: 20mg OD for 4 weeks. Gastric ulcer: 20mg OD for 8 weeks. H. pylori (with amoxicillin + clarithromycin): 20mg BD for 7-14 days. Zollinger-Ellison: 60-120mg/day. Step-down to lowest effective dose for chronic use.",
    monitoring:
      "Magnesium at baseline and annually for long-term use. Vitamin B12 if symptomatic. Reassess need for continued PPI every 6-12 months (many patients can step down or stop).",
  },
  {
    name: "insulin glargine",
    generic_name: "insulin glargine",
    drug_class: "long-acting basal insulin analogue",
    mechanism:
      "Modified human insulin that precipitates in subcutaneous tissue at physiologic pH and slowly releases active insulin over ~24 hours with relatively flat profile. Binds insulin receptors, promotes peripheral glucose uptake, suppresses hepatic glucose output, and inhibits lipolysis/ketogenesis.",
    indications:
      "Type 1 diabetes mellitus (basal component), Type 2 diabetes mellitus when oral therapy is insufficient, steroid-induced hyperglycaemia requiring basal control",
    contraindications:
      "Current hypoglycaemia, hypersensitivity to insulin glargine or excipients. Use caution in renal/hepatic impairment due to reduced insulin clearance.",
    side_effects:
      "Hypoglycaemia (most important adverse effect), weight gain, lipohypertrophy/lipoatrophy at injection sites, local injection reactions, rare hypersensitivity.",
    dosing:
      "Given once daily at the same time. Typical start in T2DM: 10 units OD or 0.1-0.2 units/kg/day, then titrate every 3-4 days by fasting glucose. In T1DM usually provides 40-50% of total daily insulin dose.",
    monitoring:
      "Capillary glucose (especially fasting), HbA1c every 3 months until stable, hypoglycaemia episodes, weight, injection-site rotation and technique.",
  },
  {
    name: "salbutamol",
    generic_name: "salbutamol sulfate",
    drug_class: "short-acting beta-2 agonist (SABA) bronchodilator",
    mechanism:
      "Selective beta-2 adrenergic receptor agonist in bronchial smooth muscle → activates adenylate cyclase → increased cAMP → smooth muscle relaxation and rapid bronchodilation. Also shifts potassium intracellularly via Na/K ATPase stimulation.",
    indications:
      "Acute bronchospasm in asthma/COPD, exercise-induced bronchoconstriction prophylaxis, adjunctive treatment of hyperkalaemia",
    contraindications:
      "Severe hypersensitivity. Relative caution: significant tachyarrhythmias, ischemic heart disease, uncontrolled hyperthyroidism.",
    side_effects:
      "Tremor, palpitations, tachycardia, anxiety, headache. Dose-related hypokalaemia and mild hyperglycaemia, especially with repeated nebulised doses.",
    dosing:
      "Inhaler: 100-200 mcg PRN every 4-6h (1-2 puffs). Nebulised acute severe asthma: 2.5-5 mg every 20 minutes initially. Hyperkalaemia adjunct: 10-20 mg nebulised.",
    monitoring:
      "Symptom relief and inhaler use frequency (overuse indicates poor control), pulse, serum potassium in high-dose nebulisation settings, peak flow in acute exacerbations.",
  },
  {
    name: "sertraline",
    generic_name: "sertraline hydrochloride",
    drug_class: "selective serotonin reuptake inhibitor (SSRI)",
    mechanism:
      "Selectively inhibits presynaptic serotonin transporter (SERT) leading to increased synaptic serotonin and downstream receptor adaptation over weeks. Minimal anticholinergic and cardiotoxic activity compared with tricyclic antidepressants.",
    indications:
      "Major depressive disorder, generalized anxiety disorder, panic disorder, PTSD, obsessive-compulsive disorder, social anxiety disorder",
    contraindications:
      "Concurrent MAOI use or within 14 days of MAOI discontinuation, known hypersensitivity. Caution with bipolar disorder (mania switch risk), bleeding disorders, and severe hepatic impairment.",
    side_effects:
      "GI upset (nausea/diarrhoea), insomnia or somnolence, sexual dysfunction, headache, sweating. Early anxiety activation may occur. Rare: serotonin syndrome, hyponatraemia (SIADH), increased bleeding risk.",
    dosing:
      "Start 25-50 mg once daily, increase by 25-50 mg at intervals of at least 1 week based on response/tolerability. Typical therapeutic range 50-200 mg/day.",
    monitoring:
      "Mood, suicidality (especially first weeks and younger patients), side effects, adherence, sodium in high-risk patients (elderly, diuretics), signs of serotonin toxicity.",
  },
  {
    name: "apixaban",
    generic_name: "apixaban",
    drug_class: "direct oral anticoagulant (DOAC) / factor Xa inhibitor",
    mechanism:
      "Directly and reversibly inhibits factor Xa (free and clot-associated) resulting in reduced thrombin generation and fibrin clot formation without requiring antithrombin cofactor.",
    indications:
      "Stroke/systemic embolism prevention in non-valvular atrial fibrillation, treatment of DVT/PE, secondary prevention after DVT/PE, thromboprophylaxis after hip or knee replacement",
    contraindications:
      "Active pathological bleeding, severe hepatic disease with coagulopathy, mechanical heart valves, severe hypersensitivity. Use caution in severe renal impairment and with potent CYP3A4/P-gp modulators.",
    side_effects:
      "Bleeding (GI, genitourinary, intracranial less frequent than warfarin), bruising, anemia, nausea. Rare hypersensitivity reactions.",
    dosing:
      "AF stroke prevention: 5 mg BD (reduce to 2.5 mg BD if dose-reduction criteria met). Acute DVT/PE: 10 mg BD for 7 days then 5 mg BD. Extended prevention: 2.5 mg BD.",
    monitoring:
      "No routine INR monitoring. Periodic renal/hepatic function, full blood count, bleeding signs, adherence (short half-life means missed doses reduce protection).",
  },
  {
    name: "paracetamol",
    generic_name: "paracetamol (acetaminophen)",
    drug_class: "para-aminophenol derivative / analgesic and antipyretic",
    mechanism:
      "Exact mechanism not fully elucidated; central COX inhibition (weak peripheral COX inhibition at usual doses), serotonergic and cannabinoid CB1 pathways may contribute to analgesia. Antipyretic effect via hypothalamic thermoregulatory centre.",
    indications:
      "Mild to moderate pain, fever reduction, component of multimodal analgesia",
    contraindications:
      "Severe active liver disease, known hypersensitivity. Caution: chronic alcohol use, malnutrition, concurrent hepatotoxic drugs — cumulative liver injury risk at high cumulative dose.",
    side_effects:
      "Generally well tolerated at ≤4 g/day in adults without liver risk factors. Hepatotoxicity with overdose or repeated supratherapeutic dosing. Rare: serious skin reactions, blood dyscrasias.",
    dosing:
      "Adults: 0.5–1 g every 4–6 h as needed, max 4 g/day from all sources (lower max in frailty, liver disease, or chronic alcohol — follow local guidance).",
    monitoring:
      "Liver function if high-risk or prolonged high-dose use; total daily dose from combination products.",
  },
  {
    name: "ibuprofen",
    generic_name: "ibuprofen",
    drug_class: "NSAID (propionic acid derivative)",
    mechanism:
      "Non-selective inhibition of cyclo-oxygenase (COX-1 and COX-2) → reduced prostaglandin synthesis → analgesic, anti-inflammatory, and antipyretic effects. Also antiplatelet effect (reversible COX-1 inhibition).",
    indications:
      "Mild to moderate pain, dysmenorrhoea, inflammatory conditions, fever",
    contraindications:
      "Active or history of recurrent peptic ulcer/GI bleeding, severe heart failure, third-trimester pregnancy, hypersensitivity to ibuprofen/aspirin (asthma, rhinitis, urticaria). Caution: CKD, dehydration, concurrent anticoagulants, elderly.",
    side_effects:
      "GI upset, dyspepsia, GI bleeding/ulceration, fluid retention, BP elevation, AKI in volume depletion, rare hypersensitivity.",
    dosing:
      "Adults: 200–400 mg every 6–8 h with food as needed, OTC max typically 1.2 g/day without supervision (local labels vary).",
    monitoring:
      "Renal function, BP, GI symptoms; consider gastroprotection with risk factors.",
  },
];
