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
| Eventi (uscite, vacanze, cene, assemblee, notizie...) | `src/content/eventi` | Eventi |
| Siti d'immersione | `src/content/siti` | Siti d'immersione |
| Corsi | `src/content/corsi` | Corsi |
| Citazioni (poesie, frasi) da collegare alle pagine | `src/content/citazioni` | Citazioni |
| Testi delle pagine (home, chi siamo, statuto e safeguarding, privacy...) | `src/content/pagine` | Pagina: ... |
| Dati generali, contatti, social | `src/data/impostazioni.json` | Impostazioni generali |
| Foto e documenti | `public/uploads` | Media |

I contenuti storici (news, archivio, corsi, chi siamo, statuto, safeguarding) sono stati importati dal vecchio sito Joomla: le foto sono in `public/uploads/archivio`, i PDF in `public/uploads/documenti`.

Le citazioni si scrivono una volta nella raccolta e si collegano a Leggenda, Home e Chi siamo con il campo "Citazione (dalla raccolta)"; le mostra `src/components/Citazione.astro`. Se il campo è vuoto non compare nulla.

Nei campi indicati dal CMS, una parola tra asterischi (`*pietra*`) viene mostrata in arancione.

In home compaiono in automatico i prossimi eventi e gli ultimi passati. La divisione viene ricalcolata anche nel browser in base alla data del visitatore, quindi un evento concluso passa tra i passati senza bisogno di ripubblicare. Un evento con **Bozza** attiva non viene pubblicato. Agli eventi si possono allegare file (volantini, programmi, moduli) dal campo "Allegati": compaiono sotto i Dettagli come card da scaricare, con tipo e dimensione. La copertina degli eventi si vede intera (anche un volantino verticale).

I siti d'immersione non sono nel menu: si raggiungono dalla home (quelli con "Mostra in home") e dal footer.

Il logo è lo scudo storico UDP: `public/uploads/logo/udp-logo.svg` (originale, anche come icona) e `udp-logo-chiaro.svg` (versione chiara per header e footer), usati tramite `src/components/Logo.astro`; la favicon resta il sasso "Sasso e onda" nei colori dello scudo. I colori del sito (grigio e rosso) derivano dallo scudo. La variante moderna con logo "Sasso e onda" e palette ardesia/arancione è sul branch `design/moderno`. L'illustrazione del hero della home è disegnata a livelli in `src/components/HeroArt.astro`; quella della leggenda è in `public/uploads/leggenda/leggenda.svg`.

I loghi di affiliazione (ACSI, CMAS, PTA) sono in `public/uploads/loghi`, in versione chiara per il footer scuro, e si elencano in `src/layouts/Base.astro`.

Le foto non ancora caricate, o che non si caricano (404), mostrano il sasso come segnaposto.

Nei testi si evita "gratuito": la prova di immersione in piscina si presenta come esperienza speciale, non come offerta.

I caratteri (Archivo e Source Sans 3) sono ospitati sul sito tramite Fontsource, senza richieste a Google Fonts.

## SEO

- Sitemap generata da `@astrojs/sitemap` (`/sitemap-index.xml`), indicata in `public/robots.txt`.
- Ogni pagina ha canonical e `og:url` su `https://www.uominidellapietra.it`, eventi e siti anche `og:image` dalla copertina; la 404 è `noindex`.
- Le vecchie URL Joomla (`/index.php?...`) vanno con un 301 alla pagina nuova equivalente: le gestisce `worker/index.js`, eseguito solo per `/index.php*` (`run_worker_first` in `wrangler.jsonc`); il resto del sito resta statico.
- Dominio senza www e http vanno su `https://www.` tramite Cloudflare (Always Use HTTPS e una Redirect Rule), non dal codice.

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
- Form della prova di immersione con invio reale (per ora compone una email precompilata).
