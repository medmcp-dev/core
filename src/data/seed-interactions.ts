export const drugInteractions = [
  {
    drug_a: "warfarin",
    drug_b: "aspirin",
    severity: "severe",
    mechanism:
      "Additive: aspirin inhibits platelet function (irreversible COX-1) + warfarin inhibits coagulation factors. Additionally, aspirin displaces warfarin from albumin binding sites → ↑free warfarin → ↑anticoagulant effect.",
    clinical_effect:
      "Significantly increased bleeding risk: GI haemorrhage (3-4× risk), intracranial haemorrhage. Small antiplatelet dose (75mg) with therapeutic warfarin roughly doubles major bleeding events.",
    management:
      "Avoid combination unless specifically indicated (e.g., dual antithrombotic therapy post-ACS with mechanical valve — use lowest effective aspirin dose, add PPI, strict INR monitoring). If unavoidable, use aspirin ≤100mg/day, ensure INR 2-3, prescribe PPI, educate patient on bleeding signs.",
  },
  {
    drug_a: "warfarin",
    drug_b: "amoxicillin",
    severity: "moderate",
    mechanism:
      "Broad-spectrum antibiotics alter gut flora → ↓vitamin K production by intestinal bacteria (contributes ~10-50% of vitamin K₂) → ↑warfarin effect. Also, infection itself can increase INR. Some penicillins inhibit platelet function.",
    clinical_effect:
      "INR elevation within 2-7 days of antibiotic start. Risk of over-anticoagulation and bleeding, especially in patients with borderline vitamin K intake.",
    management:
      "Check INR 3-5 days after starting and after stopping amoxicillin. Educate patient to maintain consistent dietary vitamin K. Monitor for bruising/bleeding. Dose adjust warfarin if INR >3.5.",
  },
  {
    drug_a: "metformin",
    drug_b: "alcohol",
    severity: "moderate",
    mechanism:
      "Both metformin and alcohol inhibit hepatic gluconeogenesis and promote anaerobic metabolism → lactic acid accumulation. Alcohol also causes dehydration → ↓renal metformin clearance → ↑plasma levels.",
    clinical_effect:
      "Lactic acidosis risk (though rare at therapeutic metformin doses). Hypoglycaemia if alcohol taken without food (depletes glycogen stores, blocks gluconeogenesis). Nausea/vomiting exacerbated.",
    management:
      "Advise patient to limit alcohol to ≤2 units/day, never binge drink, always eat with alcohol. Hold metformin if acute illness with dehydration. Counsel on hypoglycaemia signs.",
  },
  {
    drug_a: "lisinopril",
    drug_b: "spironolactone",
    severity: "severe",
    mechanism:
      "Both drugs increase serum potassium: ACE inhibitors block angiotensin II → ↓aldosterone → ↓K⁺ excretion. Spironolactone is aldosterone antagonist → directly ↓K⁺ secretion. Additive effect.",
    clinical_effect:
      "Life-threatening hyperkalaemia (K⁺ >6.5 mmol/L) → cardiac arrhythmias, ventricular fibrillation, cardiac arrest. Risk highest in elderly, CKD, diabetes, volume depletion.",
    management:
      "Combination can be used in resistant hypertension and heart failure (evidence-based) with strict monitoring. Check K⁺ and eGFR at 1-2 weeks after initiation, then monthly for 3 months, then 3-6 monthly. Target K⁺ <5.5 mmol/L. Avoid NSAIDs, potassium supplements. Dose reduce or stop spironolactone if K⁺ >5.5.",
  },
  {
    drug_a: "furosemide",
    drug_b: "gentamicin",
    severity: "severe",
    mechanism:
      "Synergistic ototoxicity: furosemide disrupts endolymph ion transport (stria vascularis) via NKCC1 inhibition → changes endocochlear potential → potentiates aminoglycoside entry into cochlear hair cells. Furosemide also reduces gentamicin clearance by reducing renal blood flow → higher gentamicin levels → increased nephrotoxicity.",
    clinical_effect:
      "Irreversible sensorineural hearing loss (cochlear hair cell destruction), vestibular dysfunction (vertigo, ataxia). AKI (additive nephrotoxicity). Risk increases with rapid IV furosemide, high gentamicin doses, and pre-existing renal impairment.",
    management:
      "Avoid concurrent use if possible. If unavoidable (e.g., resistant Gram-negative infection with fluid overload): give furosemide as slow IV infusion (not bolus), use minimum effective doses of both, monitor gentamicin levels (trough <1 mg/L, peak 5-10 mg/L for standard dosing), serial audiometry, avoid prolonged courses.",
  },
  {
    drug_a: "aspirin",
    drug_b: "ibuprofen",
    severity: "moderate",
    mechanism:
      "Ibuprofen (reversible COX-1 inhibitor) competitively blocks the same acetylation site on COX-1 that aspirin targets. If taken before aspirin, ibuprofen occupies the site → aspirin cannot irreversibly acetylate → antiplatelet effect abolished.",
    clinical_effect:
      "Loss of aspirin's antiplatelet effect → increased risk of cardiovascular events (MI, stroke) in patients taking aspirin for secondary prevention. Effect is dose- and timing-dependent.",
    management:
      "Take aspirin at least 30-60 minutes BEFORE ibuprofen (or ≥8 hours after ibuprofen) to allow irreversible acetylation first. Better: avoid ibuprofen entirely — use paracetamol for analgesia. If chronic NSAID required, use selective COX-2 inhibitor (celecoxib) which does not interfere with COX-1.",
  },
  {
    drug_a: "warfarin",
    drug_b: "omeprazole",
    severity: "moderate",
    mechanism:
      "Omeprazole inhibits CYP2C19 (and to lesser extent CYP3A4) → reduces metabolism of S-warfarin (the more potent enantiomer is primarily metabolised by CYP2C9, but CYP2C19 plays a role) → ↑warfarin plasma levels. Effect varies with CYP2C19 genotype (poor metabolisers most affected).",
    clinical_effect:
      "INR elevation (typically modest, 10-20% increase). Risk of over-anticoagulation and bleeding. Clinically relevant in poor CYP2C19 metabolisers.",
    management:
      "Increased INR monitoring when starting or stopping omeprazole with warfarin. Consider pantoprazole (less CYP2C19 inhibition) if PPI is needed long-term. Adjust warfarin dose based on INR response.",
  },
  {
    drug_a: "metformin",
    drug_b: "contrast media",
    severity: "moderate",
    mechanism:
      "Iodinated contrast media causes transient renal vasoconstriction and direct tubular toxicity → contrast-induced nephropathy (CIN) → ↓metformin renal clearance → metformin accumulation → lactic acidosis. Risk amplified in pre-existing CKD.",
    clinical_effect:
      "If CIN develops post-contrast, metformin accumulates → lactic acidosis (rare but potentially fatal). eGFR <45 patients at highest risk.",
    management:
      "NICE/national guidelines: hold metformin for 48 hours after IV contrast administration in patients with eGFR <60 or undergoing emergency procedures. Restart only when renal function confirmed stable. Adequate hydration pre- and post-contrast reduces CIN risk.",
  },
  {
    drug_a: "atorvastatin",
    drug_b: "clarithromycin",
    severity: "severe",
    mechanism:
      "Clarithromycin is a potent CYP3A4 inhibitor. Atorvastatin is primarily metabolised by CYP3A4 → inhibition → dramatic ↑atorvastatin plasma levels (AUC up to 10-fold). Elevated statin levels → increased myopathy risk.",
    clinical_effect:
      "Statin-induced myopathy: myalgia, myositis, rhabdomyolysis (CK >10× ULN, myoglobinuria, acute kidney injury). Risk increases with higher statin doses and prolonged co-administration.",
    management:
      "Temporarily hold atorvastatin during short clarithromycin courses (7-14 days). If long-term macrolide needed, switch to pravastatin or rosuvastatin (not CYP3A4 substrates). Alternatively, switch macrolide to azithromycin (weak CYP3A4 inhibitor).",
  },
  {
    drug_a: "furosemide",
    drug_b: "lisinopril",
    severity: "moderate",
    mechanism:
      "Furosemide-induced volume depletion → activates RAAS → renin-angiotensin system dependent on maintaining GFR via efferent arteriole tone. ACE inhibitor (lisinopril) blocks efferent arteriole vasoconstriction → precipitous drop in GFR in volume-depleted state. Also: first-dose hypotension risk (synergistic vasodilation).",
    clinical_effect:
      "Pre-renal AKI (creatinine and urea rise, concentrated urine). First-dose hypotension, syncope (especially in elderly, volume-depleted, or hyponatraemic patients). Hypokalaemia exacerbated by combined effect.",
    management:
      "Standard combination in heart failure (evidence-based — reduces mortality). Start lisinopril at low dose (2.5mg), check renal function and electrolytes at 1-2 weeks. Hold furosemide 24h before initiating ACE inhibitor if patient is dry. If creatinine rises >30% above baseline, reduce furosemide dose. Monitor K⁺.",
  },
];
