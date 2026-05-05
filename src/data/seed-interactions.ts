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
  {
    drug_a: "sertraline",
    drug_b: "warfarin",
    severity: "moderate",
    mechanism:
      "Pharmacodynamic interaction: SSRIs reduce platelet serotonin uptake, impairing platelet aggregation; combined with warfarin anticoagulation this increases bleeding tendency. Minor CYP effects may additionally alter anticoagulant exposure in some patients.",
    clinical_effect:
      "Increased risk of mucosal and GI bleeding, bruising, and clinically relevant hemorrhage, especially in older adults or those with additional antiplatelet/NSAID use.",
    management:
      "Combination can be used with caution. Check INR more closely after SSRI initiation/change, assess bleeding risk factors, consider gastroprotection where appropriate, and counsel patients to report bleeding symptoms promptly.",
  },
  {
    drug_a: "aspirin",
    drug_b: "sertraline",
    severity: "moderate",
    mechanism:
      "Additive antiplatelet impairment: aspirin irreversibly blocks TXA2 generation while sertraline decreases platelet serotonin-mediated aggregation.",
    clinical_effect:
      "Higher risk of GI bleeding and easy bruising compared with either drug alone, particularly in elderly patients or history of peptic ulcer disease.",
    management:
      "Use only when indication is clear. Consider PPI gastroprotection, avoid additional NSAIDs/alcohol excess, and monitor for occult/overt bleeding.",
  },
  {
    drug_a: "apixaban",
    drug_b: "clarithromycin",
    severity: "severe",
    mechanism:
      "Clarithromycin strongly inhibits CYP3A4 and P-glycoprotein, both key elimination pathways for apixaban, increasing apixaban plasma concentration.",
    clinical_effect:
      "Marked increase in anticoagulant effect and major bleeding risk, especially in elderly patients and those with renal dysfunction.",
    management:
      "Avoid combination when possible. Use alternative antibiotic (e.g., doxycycline/azithromycin when appropriate) or consider temporary anticoagulation strategy adjustment with specialist input.",
  },
  {
    drug_a: "insulin glargine",
    drug_b: "salbutamol",
    severity: "moderate",
    mechanism:
      "High-dose beta-2 agonism increases glycogenolysis and can raise glucose transiently; insulin requirements may increase during repeated nebulised salbutamol treatment.",
    clinical_effect:
      "Short-term hyperglycaemia during acute asthma treatment; risk of glycaemic instability in insulin-treated diabetes.",
    management:
      "Monitor capillary glucose more frequently during acute bronchodilator therapy and adjust insulin temporarily if clinically needed.",
  },
  {
    drug_a: "furosemide",
    drug_b: "salbutamol",
    severity: "moderate",
    mechanism:
      "Both agents lower serum potassium by different pathways: furosemide causes renal potassium wasting, while salbutamol shifts potassium intracellularly.",
    clinical_effect:
      "Synergistic hypokalaemia can precipitate weakness and arrhythmias, especially with frequent nebulised beta-agonist use.",
    management:
      "Check potassium in high-risk or acutely unwell patients, replace potassium if needed, and review diuretic/bronchodilator intensity.",
  },
  {
    drug_a: "metformin",
    drug_b: "furosemide",
    severity: "moderate",
    mechanism:
      "Diuretic-induced volume depletion can reduce renal perfusion and eGFR, impairing metformin clearance and increasing exposure.",
    clinical_effect:
      "Potential accumulation of metformin with higher risk of adverse effects (notably GI symptoms and rare lactic acidosis in severe renal compromise).",
    management:
      "Monitor renal function and hydration status, especially after dose escalation or acute illness. Temporarily hold metformin during significant dehydration or AKI risk.",
  },
];
