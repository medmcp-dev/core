# Lovable landing (`medmcp.vercel.app`) — usage policy bez dviju EN kopija

Repozitorij `core` nema Lovable kod; ovo su **koraci za copy-u Lovable**.

## Jedan izvor istine (canonical)

| Sadržaj | Gdje živi |
|--------|-----------|
| Puni ENG usage policy | [`docs/policy.md`](./policy.md) na `main` |
| HR sažetak za web | [`docs/policy-hr.md`](./policy-hr.md) na `main` |

Stable linkovi za web (kad je `main` na GitHubu):

- **Puni ENG policy:** https://github.com/medmcp-dev/core/blob/main/docs/policy.md  
- **HR blok (referenca / dijeljenje):** https://github.com/medmcp-dev/core/blob/main/docs/policy-hr.md  

## Footer

Dodaj natpis (EN je uobičajen na footersima):

**`Usage policy`**

→ poveži na **puni ENG** URL iznad (`…/blob/main/docs/policy.md`).

Preporuka: `target="_blank"` i `rel="noopener noreferrer"` da se osova ne navigira iz produkta.

Opcijski dodatni link u istoj traci ako želiš:

**`KR / Sažetak`** → blob `policy-hr.md` (bez obveze ako već imaš tekst inline).

## HR odlomak na stranici (preporuka)

Na glavnoj ili kraćoj `/` sekciji npr. **„Na hrvatskom“**:

1. Otvori lokalno [`policy-hr.md`](./policy-hr.md).  
2. Zalijepi u Lovable sve **iza naslova**, tj. dva pasusa (bez H1 ako već imaš vlastiti naslov sekcije), ili kopiraj cijelu stranicu uključujući `# MedMCP — kratki opis namjene (HR)`.

### Što wrapati u `<strong>` (React / plain HTML)

Da se ne izgubi naglasak kao u Markdownu iz `policy-hr.md`, koristi **`strong` točno za ove substringove** (ostatak rečenice običan tekst):

**Prvi paragraf**

- `nije medicinski uređaj`
- `nije dijagnostički alat u regulatornom smislu`
- `nije zamjena za kliničku prosudbu`

**Drugi paragraf**

- `MDR`

**Treći red (link na ENG policy)**

- Samo tekst linka **`Usage policy`** u `<strong>` (ili cijeli anchor bold ako je tako u dizajnu); URL ostaje isti kao u footeru.

### Opcijska mono-linija iznad naslova sekcije

Bez mijene copyja, npr. `// pravna granica proizvoda` ili `// na hrvatskom, kratko` — uskladi font s ostalim eyebrow linijama na stranici.

Kad mijenjaš Hrvatski ili regulatorni disclaimer, mijenjaš **prvo** `policy-hr.md`, commit & push na `main`, pa u Lovable ažuriraš pasted tekst ili barem blob link.

## Što ne raditi na webu

- Ne postavljaj **cijeli** ENG `policy.md` kao dupli plain-text na sajtu — dupli je source of drift. Jedan footer link na GitHub blob je dovoljan.

## Promjena organa / pravnog tijela kad eventualno dobiješ d.o.o.

Ažuriraj odjeljak **Operator** u `policy.md`; možeš paralelno uvesti osobnu recenju u nastavku `policy-hr.md` ako HR copy treba reći „Tvrtka X“ umjesto „pojedinac“.
