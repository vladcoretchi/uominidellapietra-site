import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// CMS may save empty strings or nulls: normalize them to undefined
const empty = (v: unknown) => (v === '' || v === null ? undefined : v);
const text = z.preprocess(empty, z.string().optional());
const num = z.preprocess(empty, z.coerce.number().optional());
const date = z.preprocess(empty, z.coerce.date().optional());
const images = z.preprocess((v) => (Array.isArray(v) ? v.filter(Boolean) : []), z.array(z.string()));

export const TIPI_EVENTO = {
  'uscita-lago': 'Uscita al lago',
  'uscita-mare': 'Uscita al mare',
  vacanza: 'Vacanza',
  'settimana-blu': 'Settimana blu',
  'cena-sociale': 'Cena sociale',
  corso: 'Corso',
  'prova-gratuita': 'Prova gratuita',
  assemblea: 'Assemblea',
  notizia: 'Notizia',
  ricordo: 'In ricordo',
  altro: 'Altro',
} as const;

const eventi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/eventi' }),
  schema: z.object({
    titolo: z.string(),
    tipo: z.preprocess(empty, z.enum(Object.keys(TIPI_EVENTO) as [string, ...string[]]).default('altro')),
    data_inizio: z.coerce.date(),
    data_fine: date,
    luogo: text,
    livello: text,
    descrizione: text,
    iscrizione: text,
    copertina: text,
    galleria: images,
    bozza: z.preprocess(empty, z.boolean().default(false)),
  }),
});

const siti = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/siti' }),
  schema: z.object({
    nome: z.string(),
    lago: z.preprocess(empty, z.string().default('Altro')),
    profondita: num,
    livello: text,
    ingresso: text,
    descrizione: text,
    copertina: text,
    galleria: images,
    in_evidenza: z.preprocess(empty, z.boolean().default(false)),
    ordine: z.preprocess(empty, z.coerce.number().default(100)),
  }),
});

const corsi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/corsi' }),
  schema: z.object({
    titolo: z.string(),
    categoria: z.preprocess(empty, z.enum(['ricreativo', 'tecnico']).default('ricreativo')),
    etichetta: text,
    quota: num,
    prerequisiti: text,
    durata: text,
    prezzo: text,
    immagine: text,
    ordine: z.preprocess(empty, z.coerce.number().default(100)),
  }),
});

const pagine = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pagine' }),
  schema: z.object({}).passthrough(),
});

export const collections = { eventi, siti, corsi, pagine };
