# BAKEWIRE

**BAKEWIRE – Fresh news. Sharp takes.** Nepriklausomas lietuviškas skaitmeninis žurnalas apie marketingą, technologijas, AI ir verslą. Prekės ženklo kryptis tarptautinė, pirmoji leidinio kalba lietuvių.

## Turinys

- 9 atskiri redakciniai straipsniai su **SO WHAT?** išvadomis ir šaltinių nuorodomis.
- 1 numeris, numerių archyvas, paieška, 4 kategorijų filtrai.
- 2 „Ideas & Playbook“ eksperimentai.
- Autentiška BAKEWIRE vizualinė sistema ir automatiškai sugeneruojamos SVG iliustracijos.
- Mobilus dizainas, RSS, Open Graph, canonical nuorodos, sitemap ir 404.

## Kaip paleisti

Šiame projekte nereikia npm bibliotekų – veikia su Node.js 20+.

```bash
npm run build
```

Atsiranda `dist/` katalogas su pilna statine svetaine. GitHub Actions `Test BAKEWIRE build` tikrina puslapius po kiekvieno pakeitimo.

### Cloudflare Pages

1. Prisijunk prie Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**.
2. Pasirink `vaidotaskviklys-maker/Bakewire` ir šaką `main`.
3. **Framework preset:** None; **Build command:** `npm run build`; **Build output directory:** `dist`; **Root directory:** `/`.
4. Pirmą kartą išbandyk `*.pages.dev`. Po patikros Pages → **Custom domains** prijunk `bakewire.com`.
5. Įjunk Cloudflare Web Analytics, kai reikės auditorijos matavimo.

**Dėmesio:** Cloudflare integracija ir DNS neįjungiami automatiškai, kai failai įkelti į GitHub. Repo turinys dar nereiškia viešai veikiančios svetainės.

## Redagavimas

Visas turinys laikomas `content/editorial.json` – redaguojamas GitHub web sąsajoje. Keisk `title`, `summary`, `body`, `take`, `source`, `category`; kiekvienas naujas straipsnis turi turėti unikalų `slug`. Išsaugojus automatiškai pradedamas naujas Cloudflare build, kai jis bus prijungtas.

Pirmai versijai tai paprastas JSON redagavimas; patogų vizualų CMS dar reikės atskirai prijungti. Šiame etape neskelbiame, kad CMS jau veikia.

## Redakcinis paleidimo saugiklis

Dabartinė svetainė yra **bandomoji redakcinė versija**. Ji turi `noindex` ir `robots.txt: Disallow: /`. Kai straipsnių faktai, nuorodos ir šaltiniai bus patikrinti, galima Cloudflare Pages Environment Variables nustatyti:

```text
PUBLICATION_READY=true
```

Tada naujo build metu atsiranda paieškos varikliams skirta sitemap.xml. Iki galutinio patvirtinimo šio kintamojo **nenustatyk**.

Redakcijos iliustracijos yra sukurtos iš SVG formų ir **nėra dokumentinės fotografijos**. Sudėtingų, sensacingų ir reputacinių teiginių netvirtinti vien pagal ankstesnes juodraščio versijas.

## Vėlesni etapai

- Redaktoriui patogus CMS su peržiūra prieš publikavimą.
- LinkedIn newsletter integracija, analitika ir prenumeratos.
- Jei pasiteisins 90 dienų testas – anglų kalbos leidinys ir papildomi Playbook.

Infrastruktūros pradžioje gali pakakti GitHub + Cloudflare Pages nemokamų planų; domeno registracija apmokama atskirai.
