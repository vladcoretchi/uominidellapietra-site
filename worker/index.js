// Runs only for /index.php* (run_worker_first): 301 from old Joomla URLs to the new pages

// Joomla article id -> new path
const ARTICOLI = {
  1: '/chi-siamo/',
  2: '/privacy/',
  3: '/eventi/2016-11-02-presentazione-corso-p1/',
  4: '/contatti/',
  5: '/eventi/2016-11-09-inizia-la-prima-stagione/',
  6: '/corsi/',
  7: '/corsi/',
  8: '/corsi/',
  9: '/eventi/2017-05-06-esami-al-mare-capo-noli/',
  10: '/eventi/2017-08-26-prove-scuba-dalmine/',
  11: '/eventi/2017-10-06-assemblea-soci-2017/',
  13: '/eventi/2018-04-14-moneglia-2018/',
  14: '/eventi/2018-05-06-esami-a-capo-noli/',
  15: '/eventi/2018-08-26-prova-gratuita-dalmine/',
  19: '/eventi/2019-07-14-open-day-2019/',
  20: '/eventi/2019-11-06-inizio-stagione-2019-20/',
  23: '/eventi/2020-07-30-elezione-direttivo-2020-2024/',
  27: '/eventi/2021-03-21-a-presto-con-il-2021-22/',
  28: '/eventi/2021-11-03-si-torna-in-piscina/',
  30: '/eventi/2022-08-17-un-saluto-a-peter-bennett/',
  34: '/eventi/2023-10-11-addio-bret-gilliam/',
  40: '/associazione/',
  42: '/associazione/',
};

// Joomla menu Itemid -> new path, used when the article is not mapped
const MENU = {
  101: '/',
  102: '/privacy/',
  108: '/chi-siamo/',
  109: '/contatti/',
  110: '/corsi/',
  115: '/corsi/',
  116: '/corsi/',
  143: '/eventi/',
  159: '/associazione/',
  160: '/associazione/',
};

export function destinazione(params) {
  const id = parseInt(params.get('id') ?? '', 10); // "10:slug" -> 10
  if (params.get('view') === 'article' && ARTICOLI[id]) return ARTICOLI[id];
  if (params.get('view') === 'category' && id === 12) return '/eventi/';
  if (params.get('format') === 'feed') return '/eventi/';
  return MENU[parseInt(params.get('Itemid') ?? '', 10)] ?? '/';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/index.php')) return env.ASSETS.fetch(request);
    return Response.redirect(new URL(destinazione(url.searchParams), url.origin).href, 301);
  },
};
