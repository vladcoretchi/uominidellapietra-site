# Uomini della Pietra

Sito della scuola subacquea Uomini della Pietra asd (Bergamo), corsi CMAS-PTA e immersioni nei laghi.

## Stack

- **Astro** genera un sito statico dai contenuti in `src/content` e `src/data`.
- **Pages CMS** ([pagescms.org](https://pagescms.org)) fornisce il pannello di gestione: configurazione in `.pages.yml`.
- **Cloudflare Workers** (static assets) serve la cartella `dist`: configurazione in `wrangler.jsonc`.

Ogni salvataggio da Pages CMS crea un commit su GitHub; Cloudflare ricostruisce e pubblica il sito in automatico.

## Contenuti

| Cosa | Dove | Nel CMS |
| --- | --- | --- |
| Eventi (uscite, vacanze, settimana blu, cene...) | `src/content/eventi` | Eventi |
| Siti d'immersione | `src/content/siti` | Siti d'immersione |
| Corsi | `src/content/corsi` | Corsi |
| Testi delle pagine | `src/content/pagine` | Pagina: ... |
| Dati generali, contatti, social | `src/data/impostazioni.json` | Impostazioni generali |
| Foto e documenti | `public/uploads` | Media |

In home compaiono in automatico i prossimi eventi e gli ultimi passati. La divisione viene ricalcolata anche nel browser in base alla data del visitatore, quindi un evento concluso passa tra i passati senza bisogno di ripubblicare. Un evento con **Bozza** attiva non viene pubblicato.

I siti d'immersione non sono nel menu: si raggiungono dalla home (quelli con "Mostra in home") e dal footer.

## Sviluppo

Richiede Node.js 22.12 o superiore.

```bash
npm install
npm run dev       # sito in locale su http://localhost:4321
npm run build     # genera dist/
npm run preview   # build + anteprima con il runtime Cloudflare
npm run deploy    # build + pubblicazione manuale con Wrangler
```

## Pubblicazione

1. **Cloudflare**: Workers & Pages, Create application, Import a repository, scegli questo repo. Build command `npx astro build`, deploy command `npx wrangler deploy`. Il sito sarà su un indirizzo `*.workers.dev`; il dominio si aggiunge poi da Settings, Domains & Routes.
2. **Pages CMS**: accedi su [app.pagescms.org](https://app.pagescms.org) con GitHub e apri questo repository. Per dare accesso ad altri gestori si invitano dal pannello.

## Evoluzioni previste

- Spostamento delle foto su Cloudflare R2.
- Form del battesimo con invio reale (per ora compone una email precompilata).
