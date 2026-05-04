import { initSchema, getDb } from "./database.js";
import { medicalConcepts } from "../data/seed-concepts.js";
import { drugs } from "../data/seed-drugs.js";
import { drugInteractions } from "../data/seed-interactions.js";
import { icd11Codes } from "../data/seed-icd11.js";
import { diagnoses } from "../data/seed-diagnoses.js";
import { labValues } from "../data/seed-labs.js";

const anatomyConcepts = [
  {
    name: "brachial plexus",
    category: "anatomy",
    summary:
      "Network of nerve roots (C5-T1) that innervates the upper limb, formed from the ventral rami of cervical and first thoracic spinal nerves.",
    mechanism:
      "Roots (C5-T1) → trunks (upper C5-C6, middle C7, lower C8-T1) → divisions (anterior/posterior) → cords (lateral, medial, posterior) → terminal branches: musculocutaneous, median, ulnar, radial, axillary. Key mnemonic: Rob Taylor Drinks Cold Beer.",
    clinical_relevance:
      "Erb's palsy (C5-C6 injury): 'waiter's tip' position — arm adducted, medially rotated, extended. Klumpke's palsy (C8-T1): intrinsic hand muscle weakness + Horner syndrome. Thoracic outlet syndrome compresses plexus. Landmark for regional anesthesia (interscalene, supraclavicular blocks).",
    related_concepts:
      "peripheral neuropathy,Erb's palsy,Klumpke's palsy,thoracic outlet syndrome,regional anesthesia,dermatomes",
  },
  {
    name: "circle of Willis",
    category: "anatomy",
    summary:
      "Arterial anastomotic ring at the base of the brain connecting anterior and posterior cerebral circulations, providing collateral flow.",
    mechanism:
      "Anterior circulation: internal carotid arteries → anterior cerebral arteries (ACA) connected by anterior communicating artery (ACoA). Posterior circulation: basilar artery → posterior cerebral arteries (PCA) connected to ICA via posterior communicating arteries (PCoA). Complete circle allows hemispheric compensation if one vessel occludes.",
    clinical_relevance:
      "Berry aneurysms most common at junctions (ACoA most common, then PCoA-ICA junction). Rupture → subarachnoid haemorrhage (sudden 'thunderclap' headache). Incomplete circle in 50% of people (PCoA aplasia common) → limits collateral protection. Basis of stroke territory localisation.",
    related_concepts:
      "stroke,berry aneurysm,subarachnoid haemorrhage,ACA territory,MCA territory,PCA territory,internal carotid artery",
  },
  {
    name: "hepatic portal system",
    category: "anatomy",
    summary:
      "Venous system carrying blood from GI tract, spleen, pancreas, and gallbladder to the liver before entering systemic circulation.",
    mechanism:
      "Portal vein formed by splenic vein + superior mesenteric vein (SMV) at neck of pancreas. Inferior mesenteric vein (IMV) drains into splenic vein. Portal vein → liver sinusoids → hepatic veins → IVC. First-pass metabolism occurs here. Normal portal pressure: 5-10 mmHg.",
    clinical_relevance:
      "Portal hypertension (>12 mmHg): varices (oesophageal — risk of fatal haemorrhage, rectal, caput medusae), splenomegaly, ascites. Portocaval anastomoses decompress system. TIPS procedure creates artificial shunt. Liver cirrhosis is most common cause. First-pass effect determines oral bioavailability of many drugs.",
    related_concepts:
      "portal hypertension,oesophageal varices,cirrhosis,ascites,TIPS procedure,first-pass metabolism,caput medusae",
  },
  {
    name: "coronary artery anatomy",
    category: "anatomy",
    summary:
      "Right and left coronary arteries arise from aortic sinuses and supply the myocardium; dominance determined by which artery supplies the posterior descending artery (PDA).",
    mechanism:
      "Left main coronary artery (LMCA) → left anterior descending (LAD, supplies anterior LV + septum + anterior papillary muscle) + left circumflex (LCx, supplies lateral LV). Right coronary artery (RCA) → SA node (60%), AV node (85%), posterior descending (PDA) in right-dominant systems (85% of people). Coronary flow occurs predominantly in diastole.",
    clinical_relevance:
      "LAD occlusion: anterior STEMI (most common, worst prognosis). RCA occlusion: inferior STEMI ± RV infarction (ST elevation V1, hypotension with fluids). LCx occlusion: lateral STEMI (may have no ST changes on standard 12-lead, check V7-V9). LMCA disease: cardiogenic shock. Dominance affects STEMI territory.",
    related_concepts:
      "STEMI,coronary angiography,LAD,RCA,circumflex,myocardial infarction,cardiac catheterisation,collateral circulation",
  },
  {
    name: "lymphatic system",
    category: "anatomy",
    summary:
      "Network of vessels, nodes, and organs that returns interstitial fluid to circulation, transports dietary lipids, and mediates immune surveillance.",
    mechanism:
      "Interstitial fluid enters blind-ended lymphatic capillaries → collecting lymphatics (smooth muscle, valves) → lymph nodes (filtering) → thoracic duct (drains everything except right upper quadrant) or right lymphatic duct → subclavian veins. Thoracic duct: largest lymph vessel, empties left subclavian vein, carries chylomicrons from gut (lacteals).",
    clinical_relevance:
      "Lymphoedema: obstruction (filariasis, post-mastectomy, tumour) → pitting then non-pitting oedema. Sentinel lymph node biopsy maps cancer spread. Virchow's node (left supraclavicular): metastasis from abdominal/thoracic malignancies. Thoracic duct injury (oesophageal surgery, central line) → chylothorax. Hodgkin lymphoma: Reed-Sternberg cells.",
    related_concepts:
      "lymphoedema,lymphoma,sentinel node,chylothorax,Virchow node,lacteals,immune surveillance,filariasis",
  },
  {
    name: "knee joint anatomy",
    category: "anatomy",
    summary:
      "Largest synovial joint; hinge joint between femur, tibia, and patella with key stabilising structures: ACL, PCL, MCL, LCL, and menisci.",
    mechanism:
      "Articulation: femoral condyles on tibial plateau (+ menisci as shock absorbers and stabilisers). Cruciate ligaments: ACL (prevents anterior tibial translation, torn with valgus + internal rotation, Lachman test), PCL (prevents posterior translation, dashboard injury, posterior drawer). Collaterals: MCL (valgus stress), LCL (varus stress). Menisci: medial (C-shaped, less mobile → more commonly torn), lateral (O-shaped).",
    clinical_relevance:
      "ACL tear: pivoting sports injury, haemarthrosis, positive Lachman. Unhappy triad: ACL + MCL + medial meniscus. PCL tear: posterior sag sign. Meniscal tear: McMurray test, joint-line tenderness. Patellofemoral syndrome: anterior knee pain with stairs. MRI is gold standard for soft tissue injury.",
    related_concepts:
      "ACL,PCL,MCL,meniscus,ligament injury,Lachman test,knee MRI,unhappy triad,patellofemoral syndrome",
  },
  {
    name: "diaphragm anatomy",
    category: "anatomy",
    summary:
      "Dome-shaped musculotendinous partition between thoracic and abdominal cavities; primary muscle of inspiration, innervated by phrenic nerve (C3-C5).",
    mechanism:
      "Peripheral muscular portion attaches to xiphoid, costal margin (ribs 7-12), and lumbar vertebrae (via crura). Central tendon is fibrous. Three major apertures: T8 (IVC + right phrenic nerve), T10 (oesophagus + vagus nerves), T12 (aorta + thoracic duct + azygos vein). Innervation: phrenic nerve (C3,4,5 — 'keeps the diaphragm alive').",
    clinical_relevance:
      "Hiatal hernia: stomach herniation through T10 aperture (sliding most common, rolling/paraesophageal more dangerous). Phrenic nerve injury (cardiac surgery, cervical spine) → hemidiaphragm paralysis. Referred shoulder tip pain: diaphragmatic irritation (blood, air, subphrenic abscess) transmitted via phrenic nerve. Congenital diaphragmatic hernia (Bochdalek): left-sided, pulmonary hypoplasia.",
    related_concepts:
      "phrenic nerve,hiatal hernia,referred pain,congenital diaphragmatic hernia,inspiration,respiratory mechanics",
  },
  {
    name: "renal anatomy",
    category: "anatomy",
    summary:
      "Paired retroperitoneal organs at T12-L3 with functional units (nephrons) organised into cortex (glomeruli, convoluted tubules) and medulla (loops of Henle, collecting ducts).",
    mechanism:
      "Each kidney: ~1 million nephrons. Cortex: glomeruli (filtration), proximal and distal convoluted tubules. Medulla: loops of Henle (concentrating mechanism), collecting ducts → renal papillae → calyces → renal pelvis → ureter. Blood supply: renal artery → segmental → interlobar → arcuate → interlobular → afferent arterioles → glomerular capillaries → efferent arterioles → peritubular capillaries or vasa recta.",
    clinical_relevance:
      "Horseshoe kidney: fusion at lower poles, trapped under IMA → recurrent UTIs, stones. Renal cell carcinoma arises from proximal tubule cells. Wilms tumour (nephroblastoma): paediatric. Renal artery stenosis → renovascular hypertension (refractory hypertension, renal bruit). Kidney stone locations: UPJ, pelvic brim (iliac crossing), UVJ (most common impaction).",
    related_concepts:
      "nephron,renal artery stenosis,renal cell carcinoma,nephrolithiasis,horseshoe kidney,ureter anatomy,GFR",
  },
];

function seed(): void {
  console.log("Initialising schema...");
  initSchema();

  const db = getDb();

  const insertConcept = db.prepare(`
    INSERT OR IGNORE INTO medical_concepts
      (name, category, summary, mechanism, clinical_relevance, related_concepts)
    VALUES (@name, @category, @summary, @mechanism, @clinical_relevance, @related_concepts)
  `);

  const insertDrug = db.prepare(`
    INSERT OR IGNORE INTO drugs
      (name, generic_name, drug_class, mechanism, indications, contraindications, side_effects, dosing, monitoring)
    VALUES
      (@name, @generic_name, @drug_class, @mechanism, @indications, @contraindications, @side_effects, @dosing, @monitoring)
  `);

  const insertInteraction = db.prepare(`
    INSERT OR IGNORE INTO drug_interactions
      (drug_a, drug_b, severity, mechanism, clinical_effect, management)
    VALUES (@drug_a, @drug_b, @severity, @mechanism, @clinical_effect, @management)
  `);

  const insertICD11 = db.prepare(`
    INSERT OR IGNORE INTO icd11_codes
      (code, title, description, inclusion_terms, exclusion_terms, category)
    VALUES (@code, @title, @description, @inclusion_terms, @exclusion_terms, @category)
  `);

  const insertDiagnosis = db.prepare(`
    INSERT OR IGNORE INTO diagnoses
      (name, symptoms, distinguishing_features, key_investigations, icd11_code, prevalence)
    VALUES
      (@name, @symptoms, @distinguishing_features, @key_investigations, @icd11_code, @prevalence)
  `);

  const insertLab = db.prepare(`
    INSERT OR IGNORE INTO lab_values
      (name, abbreviation, unit, reference_range, reference_low, reference_high,
       critical_low, critical_high, sex_specific, male_low, male_high, female_low, female_high,
       interpretation, clinical_notes, category)
    VALUES
      (@name, @abbreviation, @unit, @reference_range, @reference_low, @reference_high,
       @critical_low, @critical_high, @sex_specific, @male_low, @male_high, @female_low, @female_high,
       @interpretation, @clinical_notes, @category)
  `);

  const runAll = db.transaction(() => {
    const allConcepts = [...medicalConcepts, ...anatomyConcepts];
    let concepts = 0, drugsCount = 0, interactions = 0, icd11 = 0, dx = 0, labs = 0;

    for (const c of allConcepts) if (insertConcept.run(c).changes > 0) concepts++;
    for (const d of drugs) if (insertDrug.run(d).changes > 0) drugsCount++;
    for (const i of drugInteractions) if (insertInteraction.run(i).changes > 0) interactions++;
    for (const code of icd11Codes) if (insertICD11.run(code).changes > 0) icd11++;
    for (const d of diagnoses) if (insertDiagnosis.run(d).changes > 0) dx++;
    for (const l of labValues) if (insertLab.run(l).changes > 0) labs++;

    return { concepts, drugs: drugsCount, interactions, icd11, diagnoses: dx, labs };
  });

  const counts = runAll();

  console.log("Seed complete:");
  console.log(`  Medical concepts : ${counts.concepts}`);
  console.log(`  Drugs            : ${counts.drugs}`);
  console.log(`  Drug interactions: ${counts.interactions}`);
  console.log(`  ICD-11 codes     : ${counts.icd11}`);
  console.log(`  Diagnoses        : ${counts.diagnoses}`);
  console.log(`  Lab values       : ${counts.labs}`);
}

seed();
