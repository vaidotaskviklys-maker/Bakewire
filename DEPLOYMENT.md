# BAKEWIRE – Cloudflare Pages paleidimas

**Domenas:** bakewire.com
**GitHub:** vaidotaskviklys-maker/Bakewire
**Šaka:** main

## 1. Prijungti Cloudflare Pages

1. Atidaryk https://dash.cloudflare.com/ → Workers & Pages → Create application → Pages.
2. Rinkis Import an existing Git repository.
3. Susiek GitHub ir pasirink `Bakewire`.
4. Build command: `npm run build`
5. Build output directory: `dist`
6. Root directory: `/`
7. Node.js: 20 arba 22.

Kol kas ENV `PUBLICATION_READY` **nenustatyti**. Ši būsena generuoja `noindex` bei neleidžia indeksuoti paieškos sistemoms, nors svetainė per `pages.dev` adresą gali būti viešai pasiekiama.

## 2. Prijungti domeną

Cloudflare Pages projekto Custom domains → Add custom domain → `bakewire.com`. Jei domenas registruotas Cloudflare, įprastai paruošiamas tinkamas DNS įrašas; kitu atveju sek Cloudflare pateiktomis DNS instrukcijomis. Tikrink HTTPS sertifikatą ir www peradresavimą.

## 3. Patikrinimo sąrašas

- [ ] Atsidaro pradinis puslapis ir 9 straipsniai
- [ ] Veikia paieška ir kategorijų filtrai
- [ ] Telefone veikia mobilus meniu ir visas tekstas telpa ekrane
- [ ] Atsidaro 2026-11-21 numerio archyvas
- [ ] Atsidaro 2 Ideas & Playbook puslapiai
- [ ] Patikrintos išorinės šaltinių nuorodos ir redakciniai teiginiai
- [ ] Teisinga pagrindinio puslapio, straipsnių ir socialinių nuorodų peržiūra
- [ ] Prijungtas bakewire.com, HTTPS ir DNS
- [ ] Tik tada Cloudflare Environment Variables → PUBLICATION_READY=true, ir pakartotinis deploy
- [ ] Įjungta Cloudflare Web Analytics, pridėta Google Search Console

**Svarbu:** GitHub saugykla šiuo metu gali būti vieša. Nepridėk slaptažodžių, API raktų ar nepublikuotinų konfidencialių dokumentų.

## 4. Publikavimo eiga

Straipsnių duomenys šiuo metu yra `content/editorial.json`. Keičiami per GitHub UI. Patogesnis redaktoriaus CMS planuojamas kitam etapui. Cloudflare po GitHub commit gali automatiškai persurinkti projektą.
