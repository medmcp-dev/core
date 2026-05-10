# Pragmatic risk classification — MedMCP B2B layer (draft)

**Status:** Politika za **risk-mapper v2**; implementacija živi u kodu (**`src/analyze/risk-mapper.ts`** + **`symptom-engine.ts`** signals). Bruno **`medical: approved`** ostaje kao zapis na PR‑u kojim se ovo shipa; dokument uredi ako se pravila mijenjaju (`docs/medical-review.md`).

---

## Pozicioniranje (prije svake točke)

Sve ocjene su u kontekstu **„curated heuristic layer“** — infrastruktura za agente, ne kliničko odlučivanje.

Mjera uspjeha **nije** nula false positiva; pitanje je: **Može li Bruno javno obraniti svaki `critical`/`high` output** kao scenarij koji bi u velikoj većini odraslih prezentacija (bez potpune anamneze) **opravdao hitnu kliničku evaluaciju**?

---

## 1. Haemoptysis solo — CRITICAL ili HIGH?

**Medicinski kontekst javnih poruka:** NHS i slični materijali preporučuju **hitnu ili urgentnu kliničku procjenu** za iskašljavanje krvi — često uz gradaciju jačine (*streak vs volume*). NICE CKS: **same-day urgent** ili A&E obzirom na količinu i prateće simptome.

**Limitacija NLP-a:** String `haemoptysis` u engineu **ne razlikuje** bronhitis s prugama krvi od masivne hemoptize ili PE bez dodatnog polja za količinu.

| Opcija | Opis |
|--------|------|
| **A** | Solo **CRITICAL** — maximal trijaž. Javno obranivo („isključiti ozbiljne uzroke“); rizik alarm fatigue kod developera. |
| **B** | Solo **HIGH**; **CRITICAL** u kombinacijama (**npr. + dyspnoea**). Niži ton od „hitni poziv za svaki tekst“. |

**Preporuka (konsultacija, ne presuda):** **Opcija B** — HIGH solo; CRITICAL u kombinaciji. Bez kvantifikacije iskašljaja, solo CRITICAL ima teže obraniti uspoređivo s klasama tipa ACS s dijahorezom.

---

## 2. „Sudden severe headache“ solo — automatika?

**Kontekst:** Thunderclap (vrh bolova za sekunde–minute) kao **SAH flag** kod više autoriteta — ali **„thunderclap“** je definirani klinički koncept.

**Limitacija NLP-a:** String hvata tensijsku, migrenom slične opise, itd., bez konteksta *worst of life*, *peak u sekundama*, *thunderclap token*.

| Opcija | Opis |
|--------|------|
| **A** | **Bez automatike za generički string** — ostaje hint u `interpretation` / `signals[]`. |
| **B** | **HIGH samo ako** `text-normalizer` ima eksplicitni token (**npr. thunderclap / worst headache**) koji se **ne** pali na generički headache. |

**Preporuka:** **A za generički string.** **B samo ako** Bruno + backend dogovore jasan NLP entry.

---

## 3. FAST znaci solo — HIGH za B2B?

**Javni konsenzus:** FAST materijali obično = **bilo koji** od ključnih znakova → hitna reakcija (vremenski prozor za akutni moždani udar).

**Produkt:** „Alarm fatigue“ je developer UX pitanje; **ne smije** biti principom da engine bude **tolerantniji** od javnog FAST poruka na razini **hitne kliničke procjene** — `HIGH` u B2B nije isto što i „zovi 112“ (to odlučuje agent/korisnik).

| Opcija | Opis |
|--------|------|
| **A** | **HIGH** za svaki FAST znak solo; **2+ FAST** → **CRITICAL**. |
| **B** | Solo FAST → MEDIUM — previše konzervativno u odnosu na trijažne poruke. |

**Preporuka:** **Opcija A.** Alarm fatigue rješavati **copyjem** u `interpretation`/`signals`, ne automatskim snižavanjem klase.

---

## 4. Hipotenzija — MEDIUM solo, HIGH u kombinaciji?

**Kontekst:** Hipotenzija bez brojeva (SBP/MAP) — širok FP spektar (ortostatska, medikamentna, šok).

| Opcija | Opis |
|--------|------|
| **A** | **MEDIUM** solo; **tachycardia + hypotension** → **HIGH**; **+ fever** → razmotriti **CRITICAL** (sepsa hint). |
| **B** | Solo izvan automatike — gubi signal kad agent pošalje samo „hypotension“. |

**Preporuka:** **Opcija A.** Dodati `hypotension` u model i kombinacije prema tablici ispod.

---

## 5. Palpitacije solo — downgrade na MEDIUM?

**Javni materijali (npr. NHS/CKS smisao):** hitnije uz **chest pain, syncope, dyspnoea**, „very unwell“; solo često GP put.

| Opcija | Opis |
|--------|------|
| **A** | **MEDIUM** solo; **HIGH** u kombo s red-flag pratiteljima. |
| **B** | Zadržati **HIGH** solo — konzervativnije, više FP. |

**Preporuka:** **Opcija A** za B2B infra sloj.

---

## 6. Point-based upgrade bez HIGH/CRITICAL sidra

**Problem:** Npr. 5× MEDIUM → **HIGH** bez jednog „sidra“ — teško transparentno **obraniti** jedan jasan razlog u `signals`.

| Opcija | Opis |
|--------|------|
| **A** | **Ankora:** za aggregate **HIGH** treba barem jedan **HIGH** simptom ili **CRITICAL** kombinacija; čista MEDIUM akumulacija max **MEDIUM**. |
| **B** | Zadržati bodove, ali **eksplicitan reason** string za „multi moderate without cluster“. |

**Preporuka:** **A** je medicinski/brand čišća; **B** kompromis ako refaktor mora čekati — uz Brunov sign-off.

---

## 7. Seizure solo — HIGH bez povijesti epilepsije

**Kontekst:** Prvi / atipični napadaj vs poznata epilepsija — engine **nema karton**.

| Opcija | Opis |
|--------|------|
| **A** | **HIGH** solo (safe default) + obvezan explainer u `signals[]` o limitu bez anamneze. |
| **B** | **MEDIUM** solo — slabije u skladu s porukama za prvi napadaj. |

**Preporuka:** **Opcija A.** CRITICAL zadržati za **seizure + fever**, **seizure + altered consciousness** (kad su u modelu).

---

## Bruno checklist — predložena politika (za PR opis)

| Simptom / pravilo | Predložena klasa | Napomena za PR |
|-------------------|------------------|----------------|
| haemoptysis solo | HIGH | downgrade s CRITICAL ako je bio; CRITICAL u kombinaciji |
| haemoptysis + dyspnoea | CRITICAL | PE/haemorrhage hint — zadržati |
| haemoptysis + chest pain | CRITICAL | dodati kao kombinaciju ako nije |
| headache solo | izvan automatike | samo interpretation hint |
| sudden severe headache generički | izvan automatike | visok NLP FP |
| thunderclap token (ako postoji u normalizeru) | HIGH | tek uz eksplicitni NLP entry |
| hemiplegia solo | HIGH | FAST kriterij (sync s postojećim mapiranjem u kodu) |
| facial droop solo | HIGH | FAST |
| dysarthria solo | HIGH | FAST |
| arm weakness solo | HIGH | FAST; uskladiti overlap s weakness u kodu |
| 2+ FAST znaka zajedno | CRITICAL | |
| hypotension solo | MEDIUM | novi simptam / synonyms |
| tachycardia + hypotension | HIGH | nova kombinacija |
| tachycardia + hypotension + fever | CRITICAL | sepsa hint |
| palpitations solo | MEDIUM | downgrade s HIGH ako je bio HIGH |
| palpitations + presyncope / chest pain / dyspnoea | HIGH+ | ostaje u kombinacijama |
| sudden vision loss | HIGH | novo — uskladiti naziv/normalizator s kodom |
| seizure solo | HIGH | explanatory `signals[]` tekst uz Brunovo odobrenje stringa |
| seizure + fever | CRITICAL | zadržati |
| seizure + altered consciousness | CRITICAL | dodati ako nije |
| Point-upgrade ≥5 MEDIUM → HIGH | ukinuti ili cap MEDIUM | sidro: HIGH zahtijeva HIGH simptom ili CRITICAL kombinacija |

---

## Otvorena pitanja za Brunu

1. **Brand:** maximal trijaž vs pragmatičan heuristic layer — što je javni obećani ton?
2. **Thunderclap token:** Postoji li stvarni entry u `text-normalizer.ts`? Ako ne, ostaje izvan automatike dok se ne doda.
3. **Hypotension izvor:** Samo symptom string iz agenta ili budući `vitals` tip requesta — treba li duplicirati u symptom engine?
4. **Seizure `signals[]` copy:** konkretnu rečenicu mora eksplicitno odobriti Bruno.
5. **Point-score refaktor:** isti PR s pravilima ili odvojeni refaktor PR radi reviewabilnosti?

---

*Izvorno: konsolidacija Clauda + pragmatic review; datum unosa prema Brunoovoj odluci o mergeu speca.*
