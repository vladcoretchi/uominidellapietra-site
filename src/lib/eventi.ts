import { getCollection, type CollectionEntry } from 'astro:content';
import { TIPI_EVENTO } from '../content.config';

export type Evento = CollectionEntry<'eventi'>;

// ISO day (YYYY-MM-DD) used both at build time and by the client script
export const isoDay = (d: Date) => d.toISOString().slice(0, 10);
export const fineEvento = (e: Evento) => e.data.data_fine ?? e.data.data_inizio;
export const tipoLabel = (t: string) => (TIPI_EVENTO as Record<string, string>)[t] ?? 'Altro';

const fmt = (d: Date, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('it-IT', { timeZone: 'UTC', ...o }).format(d);
export const giorno = (d: Date) => fmt(d, { day: 'numeric', month: 'short' });
export const anno = (d: Date) => fmt(d, { year: 'numeric' });
export const dataLunga = (e: Evento) => {
  const a = e.data.data_inizio;
  const b = e.data.data_fine;
  const lunga = (d: Date) => fmt(d, { day: 'numeric', month: 'long', year: 'numeric' });
  return b && isoDay(b) !== isoDay(a) ? `dal ${fmt(a, { day: 'numeric', month: 'long' })} al ${lunga(b)}` : lunga(a);
};

// All published events split at build time; the client script refreshes the split daily
export async function eventiDivisi() {
  const tutti = (await getCollection('eventi', (e) => !e.data.bozza)).sort(
    (a, b) => a.data.data_inizio.getTime() - b.data.data_inizio.getTime(),
  );
  const oggi = isoDay(new Date());
  const prossimi = tutti.filter((e) => isoDay(fineEvento(e)) >= oggi);
  const passati = tutti.filter((e) => isoDay(fineEvento(e)) < oggi).reverse();
  return { tutti, prossimi, passati };
}
