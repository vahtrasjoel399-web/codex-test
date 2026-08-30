export const locales = ['et', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];
export type TemplateKind = 'home' | 'service-hub' | 'service-detail' | 'catalog' | 'article' | 'utility';
export type PageSection = 'home' | 'catering' | 'menus' | 'bakery' | 'references' | 'about' | 'journal' | 'utility';

export type RouteEntry = {
  id: string;
  paths: Record<Locale, string>;
  titles: Record<Locale, string>;
  template: TemplateKind;
  section: PageSection;
  eyebrow?: Record<Locale, string>;
  eventType?: string;
};

const r = (
  id: string,
  paths: [string, string, string],
  titles: [string, string, string],
  template: TemplateKind,
  section: PageSection,
  options: Partial<Pick<RouteEntry, 'eyebrow' | 'eventType'>> = {}
): RouteEntry => ({
  id,
  paths: {et: paths[0], ru: paths[1], en: paths[2]},
  titles: {et: titles[0], ru: titles[1], en: titles[2]},
  template,
  section,
  ...options
});

export const routeEntries: RouteEntry[] = [
  r('home', ['', '', ''], ['Vara Pagarikoda', 'Пекарня Vara', 'Vara Bakery'], 'home', 'home'),

  r('catering', ['toitlustus', 'keytering', 'catering'], ['Tellimus sinu sündmuseks', 'Заказ к вашему событию', 'An order for your occasion'], 'service-hub', 'catering', {eventType: 'corporate'}),

  r('menus', ['menuud', 'menyu', 'menus'], ['Ideed sinu tellimuseks', 'Варианты для вашего заказа', 'Ideas for your order'], 'catalog', 'menus'),
  r('breakfast', ['menuud/hommikusook', 'menyu/zavtrak', 'menus/breakfast'], ['Hommikusöök ettetellimisel', 'Завтрак на заказ', 'Breakfast made to order'], 'service-detail', 'menus', {eventType: 'breakfast'}),
  r('lunch-buffet', ['menuud/lounabufee', 'menyu/obedennyy-bufet', 'menus/lunch-buffet'], ['Soolane valik ettetellimisel', 'Несладкая выпечка на заказ', 'Savoury bakes made to order'], 'service-detail', 'menus', {eventType: 'lunch'}),
  r('coffee-break', ['menuud/kohvipaus', 'menyu/kofe-breyk', 'menus/coffee-break'], ['Küpsetised kohvipausiks', 'Выпечка для кофе-паузы', 'Bakes for a coffee break'], 'service-detail', 'menus', {eventType: 'conference'}),
  r('dessert-table', ['menuud/magusalaud', 'menyu/desertnyy-stol', 'menus/dessert-table'], ['Magus laud sinu peole', 'Сладкий стол к вашему празднику', 'A dessert table for your celebration'], 'service-detail', 'menus', {eventType: 'private'}),

  r('bakery', ['pagaritooted', 'vypechka', 'bakery'], ['Pagaritooted ettetellimisel', 'Выпечка на заказ', 'Bakes made to order'], 'catalog', 'bakery'),
  r('bread', ['pagaritooted/suupisted', 'vypechka/zakuski', 'bakery/snacks'], ['Suupisted ja lihatoidud', 'Закуски и мясные блюда', 'Snacks and meat dishes'], 'catalog', 'bakery'),
  r('pastry', ['pagaritooted/kupsetised', 'vypechka/izdeliya', 'bakery/bakes'], ['Küpsetised', 'Выпечка', 'Bakes'], 'catalog', 'bakery'),
  r('cakes', ['pagaritooted/tordid', 'vypechka/torty', 'bakery/cakes'], ['Tordid', 'Торты', 'Cakes'], 'catalog', 'bakery'),
  r('gluten-free', ['pagaritooted/vaagnad', 'vypechka/assorti', 'bakery/platters'], ['Vaagnad', 'Ассорти и подносы', 'Platters'], 'catalog', 'bakery'),
  r('seeded-sourdough', ['pagaritooted/leivad/seemne-juuretisesai', 'vypechka/khleb/zernovoy-na-zakvaske', 'bakery/bread/seeded-sourdough'], ['Seemne-juuretisesai', 'Зерновой хлеб на закваске', 'Seeded sourdough'], 'service-detail', 'bakery', {eventType: 'corporate'}),
  r('rye-bread', ['pagaritooted/leivad/rukkileib', 'vypechka/khleb/rzhanoy-khleb', 'bakery/bread/rye-bread'], ['Tume rukkileib', 'Тёмный ржаной хлеб', 'Dark rye bread'], 'service-detail', 'bakery', {eventType: 'corporate'}),
  r('country-loaf', ['pagaritooted/leivad/maasai', 'vypechka/khleb/derevenskiy-khleb', 'bakery/bread/country-loaf'], ['48 tunni maasai', 'Деревенский хлеб, 48 часов', '48-hour country loaf'], 'service-detail', 'bakery', {eventType: 'corporate'}),
  r('cardamom-bun', ['pagaritooted/saiakesed/kardemonisai', 'vypechka/bulochki/s-kardamonom', 'bakery/pastry/cardamom-bun'], ['Kardemonisai', 'Булочка с кардамоном', 'Cardamom bun'], 'service-detail', 'bakery', {eventType: 'breakfast'}),
  r('croissant', ['pagaritooted/saiakesed/voisarvesai', 'vypechka/bulochki/kruassan', 'bakery/pastry/butter-croissant'], ['Võisarvesai', 'Сливочный круассан', 'Butter croissant'], 'service-detail', 'bakery', {eventType: 'breakfast'}),
  r('sea-buckthorn-cake', ['pagaritooted/tordid/astelpajutort', 'vypechka/torty/oblepikhovyy', 'bakery/cakes/sea-buckthorn-cake'], ['Astelpajutort', 'Облепиховый торт', 'Sea-buckthorn cake'], 'service-detail', 'bakery', {eventType: 'cake'}),
  r('chocolate-cake', ['pagaritooted/tordid/sokolaaditort', 'vypechka/torty/shokoladnyy', 'bakery/cakes/chocolate-layer-cake'], ['Tume šokolaaditort', 'Торт с тёмным шоколадом', 'Dark chocolate layer cake'], 'service-detail', 'bakery', {eventType: 'cake'}),
  r('buckwheat-loaf', ['pagaritooted/gluteenivaba/tatraleib', 'vypechka/bez-glyutena/grechnevyy-khleb', 'bakery/gluten-free/buckwheat-seed-loaf'], ['Tatra-seemneleib', 'Гречневый хлеб с семенами', 'Buckwheat seed loaf'], 'service-detail', 'bakery', {eventType: 'corporate'}),
  r('custom-cakes', ['tellimustordid', 'torty-na-zakaz', 'custom-cakes'], ['Tellimustort, millest jätkub päriselt', 'Торт на заказ — правильного размера', 'A custom cake sized for the room'], 'service-detail', 'bakery', {eventType: 'cake'}),

  r('references', ['tood', 'raboty', 'references'], ['Valminud tellimused', 'Примеры готовых заказов', 'Completed orders'], 'catalog', 'references'),
  r('case-conference', ['tood/konverents-180', 'raboty/konferentsiya-180', 'references/conference-180'], ['Värsked saiakesed hommikuseks kohtumiseks', 'Свежие булочки для утренней встречи', 'Fresh pastries for a morning meeting'], 'article', 'references'),
  r('case-office', ['tood/iganadalane-kontorilouna', 'raboty/ofisnye-obedy', 'references/weekly-office-lunch'], ['Kontorihommik värske leivaga', 'Офисное утро со свежим хлебом', 'An office morning with fresh bread'], 'article', 'references'),
  r('case-wedding', ['tood/suvine-pulm', 'raboty/letnyaya-svadba', 'references/summer-wedding'], ['Suvine pulm mere ääres', 'Летняя свадьба у моря', 'A summer wedding by the sea'], 'article', 'references'),
  r('case-launch', ['tood/tooteesitlus', 'raboty/prezentatsiya-produkta', 'references/product-launch'], ['Hommikune tooteesitlus', 'Утренняя презентация продукта', 'A morning product launch'], 'article', 'references'),
  r('case-family', ['tood/perekondlik-pidu', 'raboty/semeynyy-prazdnik', 'references/family-celebration'], ['Perekondlik pidu koduaias', 'Семейный праздник в саду', 'A family celebration in the garden'], 'article', 'references'),

  r('pricing', ['hinnad', 'tseny', 'pricing'], ['Kuidas kujuneb tellimuse hind', 'Как рассчитывается цена заказа', 'How an order is priced'], 'utility', 'utility'),
  r('how-to-order', ['kuidas-tellida', 'kak-zakazat', 'how-to-order'], ['Kuidas tellimus liigub', 'Как проходит заказ', 'How an order moves'], 'utility', 'utility'),

  r('journal', ['blogi', 'blog', 'journal'], ['Märkmed pagarilaualt', 'Записи с пекарского стола', 'Notes from the baker’s table'], 'catalog', 'journal'),
  r('article-seasonal', ['blogi/hooajaline-menuu', 'blog/sezonnoe-menyu', 'journal/seasonal-menu'], ['Miks menüü peab aastaajaga liikuma', 'Почему меню должно меняться по сезону', 'Why a menu should move with the season'], 'article', 'journal'),
  r('article-office', ['blogi/kontoritoitlustus-50', 'blog/ofisnyy-keytering-50', 'journal/office-catering-for-50'], ['Kontoritoitlustus 50 inimesele', 'Офисный кейтеринг на 50 человек', 'Office catering for 50'], 'article', 'journal'),
  r('article-cake', ['blogi/pulmatordi-suurus', 'blog/razmer-svadebnogo-torta', 'journal/wedding-cake-size'], ['Kuidas valida pulmatordi suurust', 'Как выбрать размер свадебного торта', 'How to choose a wedding cake size'], 'article', 'journal'),
  r('article-allergens', ['blogi/allergeenid', 'blog/allergeny', 'journal/allergens'], ['Kuidas me allergeenidega töötame', 'Как мы работаем с аллергенами', 'How we work with allergens'], 'article', 'journal'),

  r('gallery', ['galerii', 'galereya', 'gallery'], ['Lauad, leivad ja tööpäevad', 'Столы, хлеб и рабочие дни', 'Tables, loaves and working days'], 'catalog', 'utility'),
  r('faq', ['kusimused', 'voprosy', 'faq'], ['Küsimused enne tellimist', 'Вопросы перед заказом', 'Questions before ordering'], 'utility', 'utility'),
  r('contact', ['kontakt', 'kontakty', 'contact'], ['Helista ja räägi oma soovist', 'Позвоните и расскажите о своём заказе', 'Call and tell me what you would like'], 'utility', 'utility'),
  r('enquiry', ['kusi-pakkumist', 'zapros', 'get-a-quote'], ['Kirjelda oma tellimust', 'Расскажите о вашем заказе', 'Tell me about your order'], 'utility', 'utility'),
  r('privacy', ['privaatsus', 'konfidentsialnost', 'privacy'], ['Privaatsus', 'Конфиденциальность', 'Privacy'], 'article', 'utility'),
  r('terms', ['tingimused', 'usloviya', 'terms'], ['Tellimistingimused', 'Условия заказа', 'Order terms'], 'article', 'utility'),
  r('cookies', ['kupsised', 'fayly-cookie', 'cookies'], ['Küpsised', 'Файлы cookie', 'Cookies'], 'article', 'utility'),
  r('thank-you', ['taname', 'spasibo', 'thank-you'], ['Päring on pagarilaual', 'Запрос уже на пекарском столе', 'Your enquiry is on the baker’s table'], 'utility', 'utility')
];

export const routeById = Object.fromEntries(routeEntries.map((entry) => [entry.id, entry])) as Record<string, RouteEntry>;

export function routeHref(locale: Locale, id: string, query = '') {
  const path = routeById[id]?.paths[locale] ?? '';
  return `/${locale}${path ? `/${path}` : ''}${query}`;
}

export function findRoute(locale: Locale, segments: string[] = []) {
  const path = segments.join('/');
  return routeEntries.find((entry) => entry.paths[locale] === path);
}

export function alternatesFor(entry: RouteEntry) {
  return {
    et: routeHref('et', entry.id),
    ru: routeHref('ru', entry.id),
    en: routeHref('en', entry.id),
    'x-default': routeHref('et', entry.id)
  };
}

export const navIds = ['catering', 'bakery', 'references', 'pricing'] as const;
export const bakeryIds = ['bread', 'pastry', 'cakes', 'gluten-free'] as const;
