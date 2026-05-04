export const medicalConcepts = [
  {
    name: "action potential",
    category: "physiology",
    summary:
      "Transient electrical signal generated when a neuron or excitable cell rapidly depolarizes and repolarizes across its membrane.",
    mechanism:
      "Resting membrane potential (~-70 mV) is maintained by Na⁺/K⁺-ATPase. Depolarizing stimulus opens voltage-gated Na⁺ channels → rapid Na⁺ influx → membrane reaches threshold (~-55 mV) → all-or-none response. Peak ~+30 mV. Repolarization via K⁺ channel opening and Na⁺ channel inactivation. Brief hyperpolarization (afterhyperpolarization) follows.",
    clinical_relevance:
      "Basis of cardiac arrhythmias (antiarrhythmics target ion channels), local anesthetic action (Na⁺ channel blockade), epilepsy (abnormal neuronal firing), and neuromuscular diseases.",
    related_concepts:
      "resting membrane potential,depolarization,repolarization,refractory period,saltatory conduction,Nernst equation",
  },
  {
    name: "resting membrane potential",
    category: "physiology",
    summary:
      "Electrical potential difference across a cell membrane at rest, approximately -70 mV in neurons (inside negative relative to outside).",
    mechanism:
      "Determined primarily by K⁺ permeability (K⁺ leaks out down concentration gradient) and maintained by Na⁺/K⁺-ATPase (3 Na⁺ out, 2 K⁺ in per cycle). Calculated by Nernst/Goldman equations accounting for all ion concentrations and permeabilities.",
    clinical_relevance:
      "Hypokalemia hyperpolarizes cells (harder to excite); hyperkalemia depolarizes cells (easier to excite → arrhythmias). Local anesthetics, cardiac drugs, and anticonvulsants manipulate membrane potential.",
    related_concepts:
      "action potential,Nernst equation,Goldman equation,Na⁺/K⁺-ATPase,electrochemical gradient",
  },
  {
    name: "cardiac cycle",
    category: "physiology",
    summary:
      "Sequence of mechanical and electrical events in one heartbeat: systole (contraction) and diastole (relaxation), coordinating atria and ventricles.",
    mechanism:
      "1) Atrial diastole/ventricular diastole: passive ventricular filling. 2) Atrial systole: active filling (~20-30% of SV). 3) Isovolumetric contraction: pressure rises, all valves closed. 4) Ventricular ejection: aortic/pulmonary valves open. 5) Isovolumetric relaxation: pressure falls. 6) Rapid ventricular filling begins cycle again. Governed by Frank-Starling law.",
    clinical_relevance:
      "Basis for understanding heart sounds (S1 = AV valve closure, S2 = semilunar valve closure), murmurs (turbulent flow timing), heart failure (systolic vs diastolic), and echocardiographic measurements (EF, SV).",
    related_concepts:
      "Frank-Starling law,stroke volume,ejection fraction,heart sounds,preload,afterload,Wiggers diagram",
  },
  {
    name: "glomerular filtration",
    category: "physiology",
    summary:
      "Process by which blood is filtered through glomerular capillaries into Bowman's space, producing the primary urine ultrafiltrate at ~125 mL/min (GFR).",
    mechanism:
      "Driven by Starling forces: net filtration pressure = (Pgc - Pbs) - (πgc - πbs). Filtration barrier: fenestrated endothelium, glomerular basement membrane (charge + size selective), podocyte slit diaphragms. GFR regulated by afferent/efferent arteriole tone (angiotensin II, prostaglandins, myogenic response, tubuloglomerular feedback).",
    clinical_relevance:
      "eGFR used to stage CKD. ACE inhibitors dilate efferent arteriole → reduce GFR acutely but are renoprotective long-term. NSAIDs block prostaglandins → afferent constriction → AKI risk. Nephrotic syndrome disrupts filtration barrier → proteinuria.",
    related_concepts:
      "GFR,tubuloglomerular feedback,renin-angiotensin-aldosterone system,creatinine clearance,nephrotic syndrome,CKD staging",
  },
  {
    name: "blood-brain barrier",
    category: "anatomy",
    summary:
      "Selectively permeable barrier formed by cerebral endothelial cells with tight junctions, astrocyte end-feet, and pericytes that restricts passage of substances into the CNS.",
    mechanism:
      "Tight junctions (claudin-5, occludin, ZO-1) between endothelial cells prevent paracellular transport. Transcellular transport requires specific carriers (GLUT1 for glucose, LAT1 for amino acids) or lipid solubility. P-glycoprotein (efflux pump) actively removes xenobiotics. Astrocyte end-feet regulate ion homeostasis. No fenestrations (unlike peripheral capillaries).",
    clinical_relevance:
      "CNS drug design challenge: lipophilicity, molecular weight (<500 Da), and efflux pump evasion determine CNS penetration. Disrupted in meningitis, stroke, MS lesions, brain tumors (contrast enhancement on MRI). Circumventricular organs (area postrema) lack BBB — exploit for antiemetics.",
    related_concepts:
      "neurovascular unit,tight junctions,P-glycoprotein,CNS drug delivery,circumventricular organs,meningitis,stroke",
  },
  {
    name: "inflammatory response",
    category: "immunology",
    summary:
      "Innate immune response to tissue injury or infection: vascular, cellular, and molecular events that contain damage, eliminate pathogens, and initiate repair.",
    mechanism:
      "Tissue damage → pattern recognition (TLRs detect DAMPs/PAMPs) → mast cell degranulation → vasodilation and increased permeability (histamine, prostaglandins, bradykinin). Neutrophil recruitment via selectins → integrins (firm adhesion) → diapedesis → chemotaxis (IL-8, C5a). Phagocytosis and oxidative burst. Macrophage polarization (M1 pro-inflammatory, M2 repair). Resolution via lipoxins, resolvins.",
    clinical_relevance:
      "Cardinal signs: rubor, calor, tumor, dolor, functio laesa. NSAIDs block COX → reduce prostaglandins. Corticosteroids block PLA2 → broad anti-inflammatory. Uncontrolled → sepsis, ARDS, cytokine storm. Chronic → atherosclerosis, autoimmune disease.",
    related_concepts:
      "innate immunity,cytokines,neutrophil,macrophage,complement system,NF-κB,prostaglandins,resolution of inflammation",
  },
  {
    name: "oxyhemoglobin dissociation curve",
    category: "physiology",
    summary:
      "Sigmoidal curve relating hemoglobin oxygen saturation (SaO₂) to partial pressure of oxygen (PaO₂), reflecting cooperative O₂ binding by hemoglobin.",
    mechanism:
      "Hemoglobin cooperativity: first O₂ binding increases affinity for subsequent O₂ (T-state to R-state conformational change). P50 (~26.7 mmHg) = PaO₂ at 50% saturation. Right shift (↓affinity, ↑O₂ delivery) by: ↑CO₂, ↑H⁺ (Bohr effect), ↑temperature, ↑2,3-DPG. Left shift (↑affinity, ↓O₂ delivery) by: ↓CO₂, ↓H⁺, ↓temperature, ↓2,3-DPG, fetal Hb (HbF), CO poisoning, methemoglobin.",
    clinical_relevance:
      "Plateau portion (>60 mmHg → >90% SaO₂) = safety margin. Steep portion (20-60 mmHg) = effective O₂ unloading in tissues. CO shifts curve left AND reduces O₂ capacity → pulse oximetry falsely normal. High altitude: ↑2,3-DPG shifts right to compensate.",
    related_concepts:
      "hemoglobin,Bohr effect,2,3-DPG,carbon monoxide poisoning,fetal hemoglobin,pulse oximetry,oxygen delivery",
  },
  {
    name: "renin-angiotensin-aldosterone system",
    category: "physiology",
    summary:
      "Hormonal cascade regulating blood pressure, fluid balance, and electrolyte homeostasis via renin, angiotensin II, and aldosterone.",
    mechanism:
      "↓Renal perfusion / ↓Na⁺ delivery to macula densa / β1-adrenergic stimulation → juxtaglomerular cells release renin → cleaves angiotensinogen (liver) to angiotensin I → ACE (lung endothelium) converts to angiotensin II. Ang II: vasoconstriction (AT1R), aldosterone release (adrenal cortex), ADH release, thirst, Na⁺ reabsorption. Aldosterone: principal cells → ↑ENaC and Na⁺/K⁺-ATPase → Na⁺ retention, K⁺ excretion, water follows.",
    clinical_relevance:
      "ACE inhibitors: block Ang II production (preserve bradykinin → cough/angioedema). ARBs: block AT1R. Spironolactone: aldosterone antagonist. Overactivation in heart failure, CKD, hypertension. Primary hyperaldosteronism (Conn syndrome): hypertension + hypokalemia.",
    related_concepts:
      "ACE inhibitors,ARBs,aldosterone,juxtaglomerular apparatus,heart failure,hypertension,hyperaldosteronism",
  },
];
