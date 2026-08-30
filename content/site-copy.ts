import type {Locale, RouteEntry} from '@/config/routes';

type Localized = Record<Locale, string>;
const l = (et: string, ru: string, en: string): Localized => ({et, ru, en});

export type CatalogProduct = {
  id: string;
  code: string;
  group: 'cakes' | 'bakes' | 'snacks' | 'platters';
  title: Localized;
  image: string;
  price: string;
  unit?: Localized;
};

const product = (
  id: string,
  code: string,
  group: CatalogProduct['group'],
  title: Localized,
  price: string,
  unit?: Localized
): CatalogProduct => ({id, code, group, title, image: `/images/products/${id}.webp`, price, unit});

export const brand = {
  name: 'VARA',
  legalName: 'Vara Pagarikoda OÜ',
  address: 'Tööstuse 47d, 10416 Tallinn',
  phone: '+372 5551 0414',
  email: 'tellimus@vara.ee',
  instagram: 'https://www.instagram.com/juliaklein_ou/',
  founded: '2017',
  team: '1',
  radius: '50 km',
  replyHours: '4',
  minimumGuests: '12',
  leadDays: '3'
};

export const uiCopy = {
  et: {
    homeKicker: 'Kodune pagar · ainult ettetellimisel · Tallinn',
    homeTitle: 'Küpsetan just sinu tellimuse järgi.',
    homeIntro: 'Siin ei ole valmis vitriini. Helista, räägi oma soovist ja valmistan leiva, saiakesed, tordi või magusa laua värskelt sinu kuupäevaks.',
    primary: 'Helista ja telli',
    secondary: 'Vaata valikut',
    trust: 'Mitte vitriinilt. Küpsetatud just sinu jaoks.',
    homeOfferTitle: 'Mida saan sulle küpsetada',
    processTitle: 'Kõik algab ühest kõnest.',
    processBody: 'Räägi, mida soovid, mitmele inimesele ja mis kuupäevaks. Lepime maitse, koguse, kujunduse ja hinna kokku enne, kui töö algab.',
    process: ['01 · helistad', '02 · arutame', '03 · küpsetan', '04 · saad kätte'],
    proofTitle: 'Üks pagar. Iga tellimus isiklik.',
    proofBody: 'Räägid otse inimesega, kes sinu tellimuse valmis teeb. Iga toode sünnib konkreetse soovi ja kuupäeva jaoks — midagi ei oota riiulil valmis.',
    fullBleed: 'Tort, leib või magus laud — värskelt sinu päevaks.',
    ctaTitle: 'Kas sul on üks maitsev mõte?',
    ctaBody: 'Helista ja räägi, mida soovid. Arutame võimalused läbi ning lepime kokku kuupäeva, hinna ja kättesaamise.',
    sectionLabel: 'Ettetellimisel',
    facts: ['ainult ettetellimisel', 'kokkulepe telefoni teel', 'värske sinu kuupäevaks', 'käsitsi valmistatud'],
    open: 'Tellimused telefoni teel'
  },
  ru: {
    homeKicker: 'Домашняя выпечка · только на заказ · Таллинн',
    homeTitle: 'Испеку специально для вас.',
    homeIntro: 'Здесь нет витрины с готовой выпечкой. Вы звоните, рассказываете, что хотите, а я готовлю хлеб, булочки, торт или сладкий стол свежими к вашей дате.',
    primary: 'Позвонить и заказать',
    secondary: 'Посмотреть варианты',
    trust: 'Не с витрины. Сделано именно для вас.',
    homeOfferTitle: 'Что я могу приготовить',
    processTitle: 'Всё начинается с одного звонка.',
    processBody: 'Расскажите, что хотите, на сколько человек и к какой дате. До начала работы мы согласуем вкус, количество, оформление и цену.',
    process: ['01 · звоните', '02 · обсуждаем', '03 · готовлю', '04 · забираете'],
    proofTitle: 'Один мастер. Каждый заказ — личный.',
    proofBody: 'Вы говорите напрямую с человеком, который будет готовить ваш заказ. Каждое изделие создаётся под конкретное пожелание и дату — ничего не лежит готовым на полке.',
    fullBleed: 'Торт, хлеб или сладкий стол — свежими к вашему дню.',
    ctaTitle: 'Есть вкусная идея?',
    ctaBody: 'Позвоните и расскажите, что вам хочется. Обсудим варианты и договоримся о дате, цене и получении заказа.',
    sectionLabel: 'Только на заказ',
    facts: ['только по предзаказу', 'обсуждение по телефону', 'свежо к вашей дате', 'ручная работа'],
    open: 'Заказы принимаются по телефону'
  },
  en: {
    homeKicker: 'Home baker · made to order only · Tallinn',
    homeTitle: 'Baked especially for you.',
    homeIntro: 'There is no counter of ready-made bakes here. Call and tell me what you would like, and I will make your bread, pastries, cake or dessert table fresh for your date.',
    primary: 'Call to order',
    secondary: 'See the options',
    trust: 'Not off the shelf. Made especially for you.',
    homeOfferTitle: 'What I can make for you',
    processTitle: 'It all starts with one call.',
    processBody: 'Tell me what you would like, for how many people and for which date. We agree the flavour, quantity, design and price before work begins.',
    process: ['01 · you call', '02 · we discuss', '03 · I bake', '04 · you collect'],
    proofTitle: 'One baker. Every order is personal.',
    proofBody: 'You speak directly to the person making your order. Every item is created for a particular wish and date — nothing is left waiting on a shelf.',
    fullBleed: 'Cake, bread or a dessert table — fresh for your day.',
    ctaTitle: 'Have something delicious in mind?',
    ctaBody: 'Call and tell me what you would like. We will discuss the options and agree the date, price and collection.',
    sectionLabel: 'Made to order',
    facts: ['pre-order only', 'agreed by phone', 'fresh for your date', 'made by hand'],
    open: 'Orders taken by phone'
  }
};

const intros: Record<string, Localized> = {
  catering: l('Sünnipäev, pulm või töökohtumine — valmistan kokkulepitud küpsetised värskelt just sinu sündmuseks.', 'День рождения, свадьба или рабочая встреча — я приготовлю согласованную выпечку свежей именно к вашему событию.', 'Birthday, wedding or work meeting — I make the agreed bakes fresh for your occasion.'),
  corporate: l('Värske leib, saiakesed või magus valik töökohta. Koguse, kuupäeva ja kättesaamise lepime telefonis kokku.', 'Свежий хлеб, булочки или сладкий набор для офиса. Количество, дату и получение согласуем по телефону.', 'Fresh bread, pastries or a dessert selection for work. We agree quantity, date and collection by phone.'),
  weddings: l('Tort ja magusad küpsetised sinu pulmapäevaks. Maitse, suurus ja kujundus sünnivad isiklikust kokkuleppest.', 'Торт и сладкая выпечка к вашей свадьбе. Вкус, размер и оформление согласуем лично.', 'Cake and sweet bakes for your wedding day. Flavour, size and design are agreed personally.'),
  conferences: l('Värsked saiakesed kohtumiseks või kohvipausiks — kokkulepitud koguses ja õigeks ajaks.', 'Свежая выпечка для встречи или кофе-паузы — в согласованном количестве и к нужному времени.', 'Fresh pastries for a meeting or coffee break, in the agreed quantity and ready at the right time.'),
  'private-events': l('Sünnipäev, koosviibimine või mälestuslaud vajab õiget tooni. Kuulame enne, kui menüüd pakume.', 'День рождения, семейная встреча или поминальный стол требуют разного тона. Сначала мы слушаем, затем предлагаем меню.', 'A birthday, family gathering or memorial each needs a different tone. We listen before suggesting a menu.'),
  menus: l('Need on ideed, millest alustada. Iga valiku koostise, koguse ja hinna lepime enne küpsetamist eraldi kokku.', 'Это идеи, с которых можно начать. Состав, количество и цену каждого заказа согласуем отдельно до приготовления.', 'These are ideas to begin with. Contents, quantity and price are agreed separately before baking.'),
  breakfast: l('Soe sai, rukkileib, munaroad ja hooajaline puuvili. Minimaalne tellimus 12 inimesele.', 'Тёплые булочки, ржаной хлеб, блюда из яиц и сезонные фрукты. Минимальный заказ — на 12 человек.', 'Warm buns, rye bread, egg dishes and seasonal fruit. Minimum order: 12 guests.'),
  'lunch-buffet': l('Kaks sooja rooga, kolm salatit, pagarikoja leib ja väike magus. Alates 20 inimesest.', 'Два горячих блюда, три салата, хлеб из нашей пекарни и небольшой десерт. От 20 человек.', 'Two warm dishes, three salads, bakery bread and something small and sweet. From 20 guests.'),
  'coffee-break': l('15 või 30 minuti paus, mis päriselt mahub ajakavasse. Portsjonid on ühe käega võetavad ja selgelt märgistatud.', 'Перерыв на 15 или 30 минут, который действительно укладывается в расписание. Порции удобно брать одной рукой, маркировка понятна.', 'A 15- or 30-minute break that genuinely fits the schedule. Portions are one-hand friendly and clearly labelled.'),
  'dessert-table': l('Väikesed koogid, hooajalised tartaletid ja üks keskne tort. Magusus on tasakaalus, mitte valjuhäälne.', 'Небольшие пирожные, сезонные тарталетки и один центральный торт. Сладость остаётся сбалансированной, а не навязчивой.', 'Small cakes, seasonal tartlets and one centrepiece cake. Sweetness is balanced rather than loud.'),
  bakery: l('Leivad, saiakesed ja tordid valmivad ainult ettetellimisel — värskelt sinu soovitud kuupäevaks.', 'Хлеб, булочки и торты готовятся только по предварительному заказу — свежими к нужной вам дате.', 'Bread, pastries and cakes are made by pre-order only — fresh for the date you need.'),
  references: l('Mõned näited sellest, mida saab tellida. Sinu tellimus ei pea neid kordama — see sünnib sinu soovist.', 'Несколько примеров того, что можно заказать. Ваш заказ не обязан их повторять — он будет сделан по вашим пожеланиям.', 'A few examples of what can be ordered. Yours does not have to copy them — it will be made around your wishes.'),
  pricing: l('Iga tellimuse hind sõltub koostisest, kogusest ja kujundusest. Pärast lühikest telefonikõnet saad täpse hinna enne kinnitamist.', 'Цена каждого заказа зависит от состава, количества и оформления. После короткого разговора вы узнаете точную цену до подтверждения.', 'Each order is priced by its ingredients, quantity and design. After a short call, you receive the exact price before confirming.'),
  delivery: l('Tallinna sees on hind fikseeritud. Kaugemad tsoonid arvutame teekonna, väljumisaja ja tagastatava inventari järgi.', 'В Таллинне действует фиксированная цена. За городом учитываем маршрут, время выезда и возвратный инвентарь.', 'Within Tallinn, delivery is fixed-price. Beyond the city, we calculate route, departure time and returnable equipment.'),
  'how-to-order': l('Helista, räägi oma soovist, kinnita detailid ja tule kokkulepitud ajal järele. Nii lihtne tellimine ongi.', 'Позвоните, расскажите о пожеланиях, подтвердите детали и заберите заказ в согласованное время. Всё просто.', 'Call, describe what you would like, confirm the details and collect at the agreed time. That is all it takes.'),
  about: l('Vara on ühe pagari väike tellimusköök. Iga kõne, retsept ja valmis tellimus käib läbi samade käte.', 'Vara — небольшая пекарня одного мастера. На звонок отвечает тот же человек, который согласует рецепт и готовит ваш заказ.', 'Vara is a small one-baker order kitchen. The same person answers your call, agrees the recipe and makes your order.'),
  journal: l('Praktilised märkmed kogustest, ajakavast, hooajast ja allergeenidest — neile, kes peavad laua päriselt ära korraldama.', 'Практические записи о количестве, графике, сезоне и аллергенах — для тех, кто действительно отвечает за стол.', 'Practical notes on quantities, timing, seasonality and allergens—for the person who has to make the table happen.'),
  contact: l('Tellimused valmivad ainult eelneval kokkuleppel. Kõige lihtsam on helistada ja oma soovist rääkida.', 'Выпечка готовится только по предварительному заказу. Проще всего позвонить и рассказать, что вам хочется.', 'Everything is made by prior order. The easiest way to begin is to call and describe what you would like.'),
  enquiry: l('Kirjuta, mida soovid ja mis kuupäevaks. Kui eelistad, saad tellimuse kohe telefoni teel läbi arutada.', 'Напишите, что вы хотите и к какой дате. Если удобнее, заказ можно сразу обсудить по телефону.', 'Tell me what you would like and for which date. If you prefer, we can discuss the order by phone.'),
  faq: l('Vastused tarne, maksete, dieetide, tortide ja toitlustuse kohta. Kui sinu küsimust siin pole, vasta nelja töötunni jooksul inimene.', 'Ответы о доставке, оплате, диетах, тортах и кейтеринге. Если вашего вопроса здесь нет, человек ответит в течение четырёх рабочих часов.', 'Answers on delivery, payment, dietary needs, cakes and catering. If yours is not here, a person replies within four working hours.')
};

const sectionBodies: Record<string, Record<Locale, string[]>> = {
  catering: {
    et: ['Kõik algab sinu kõnest: mida soovid, mitmele inimesele ja mis kuupäevaks. Seejärel pakun välja sobiva koguse ja võimalused.', 'Tellimus valmib värskelt pärast detailide kinnitamist. Midagi ei tehta vitriinile ootama ning iga töö on seotud konkreetse kliendi ja kuupäevaga.', 'Kui soov muutub, räägid otse minuga. Lepime muudatused ja nende mõju hinnale kokku enne, kui küpsetama hakkan.'],
    ru: ['Всё начинается с вашего звонка: что вы хотите, на сколько человек и к какой дате. Затем я предложу подходящее количество и возможные варианты.', 'Заказ готовится свежим после подтверждения деталей. Ничего не выпекается заранее для витрины — у каждой работы есть конкретный клиент и дата.', 'Если пожелания меняются, вы говорите напрямую со мной. Изменения и их влияние на цену согласуем до начала приготовления.'],
    en: ['Everything starts with your call: what you would like, for how many people and for which date. I then suggest a suitable quantity and the available options.', 'Your order is made fresh after the details are confirmed. Nothing is baked to wait on a counter; every piece has a specific customer and date.', 'If your wishes change, you speak directly with me. We agree any change and its effect on price before I begin baking.']
  },
  bakery: {
    et: ['Juuretisesai käärib 48 tundi, et maitse saaks areneda ja sisu püsiks kauem mahlane. Saiakeste tainast voldin külmalt ning kõik valmib väikeste tellimuspartiidena.', 'Valmis vitriini ei ole: küpsetan pärast tellimuse ja kuupäeva kokkuleppimist. Nii saad oma leiva, saiakesed või tordi võimalikult värskelt.', 'Erisoovid ja allergeenid arutame alati enne tellimuse kinnitamist läbi. Köögis kasutatakse nisujahu, mistõttu ei saa ma lubada meditsiiniliselt steriilset keskkonda.'],
    ru: ['Хлеб на закваске ферментируется 48 часов, чтобы вкус успел раскрыться, а мякиш дольше оставался сочным. Слоёное тесто складываю холодным, всё выпекаю небольшими партиями под заказ.', 'Готовой витрины нет: я начинаю готовить после согласования заказа и даты. Поэтому хлеб, булочки или торт попадают к вам максимально свежими.', 'Особые пожелания и аллергены всегда обсуждаем до подтверждения заказа. На кухне используется пшеничная мука, поэтому медицински стерильную среду гарантировать нельзя.'],
    en: ['Sourdough ferments for 48 hours so its flavour can develop and the crumb stays moist for longer. I fold laminated dough cold and bake everything in small made-to-order batches.', 'There is no ready-made counter: I begin after the order and date are agreed. That means your bread, pastries or cake reach you as fresh as possible.', 'We always discuss special requests and allergens before confirming an order. The kitchen handles wheat flour, so I cannot promise a medically sterile environment.']
  },
  references: {
    et: ['Iga juhtum algas praktilise piiranguga: lühike paus, keeruline ligipääs, mitu dieeti või ruum, kus puudus köök. Lahendus ei olnud rohkem dekoratsiooni, vaid parem tootmisjärjekord.', 'Avaldame ainult kontrollitavad detailid. Kui kliendi nimi või tsitaat pole avaldamiseks kinnitatud, jätame selle välja — anonüümne kiitus ei tõesta midagi.', 'Tulemust mõõdame ajas, järelejäänud toidus ja korraldaja töökoormuses. Hea sündmus tähendab, et õige kogus oli õiges kohas enne, kui keegi pidi küsima.'],
    ru: ['Каждый проект начинался с практического ограничения: короткий перерыв, сложный доступ, несколько диет или помещение без кухни. Решением становился не дополнительный декор, а лучший производственный порядок.', 'Мы публикуем только проверяемые детали. Если имя клиента или цитата не согласованы, их здесь нет — анонимная похвала ничего не доказывает.', 'Результат измеряем временем, остатками еды и нагрузкой на организатора. Хорошее событие — это нужное количество в нужном месте до того, как кто-либо успел спросить.'],
    en: ['Every case began with a practical constraint: a short break, difficult access, several diets or a room without a kitchen. The answer was not more decoration, but a better production order.', 'We publish only verifiable detail. If a client name or quote is not approved for publication, we leave it out—anonymous praise proves nothing.', 'We measure the result in time, leftovers and organiser workload. A good event has the right quantity in the right place before anybody needs to ask.']
  },
  journal: {
    et: ['Hea toitlustusplaan ei alga roogade nimekirjast. See algab hetkest, mil inimesed ruumi jõuavad, kui kaua nad süüa saavad ja mida peab järgmise päevakorrapunkti jaoks vältima.', 'Koguste juures arvestame kellaaega, sündmuse pikkust ja seda, kas toit on põhjus kokku tulla või üks osa pikemast päevast. Sama külaliste arv ei tähenda alati sama kogust.', 'Allergeenid tuleb küsida enne menüü kinnitamist. Nii saame leida terviklikud alternatiivid, mitte eemaldada viimasel hetkel taldrikult üht komponenti.'],
    ru: ['Хороший план кейтеринга начинается не со списка блюд. Он начинается с момента прихода гостей, времени на еду и того, что важно учесть перед следующим пунктом программы.', 'При расчёте количества учитываем время суток, продолжительность события и роль еды: главная ли это причина встречи или часть длинного дня. Одинаковое число гостей не всегда означает одинаковый объём.', 'Информацию об аллергенах важно собрать до утверждения меню. Тогда мы предлагаем полноценную альтернативу, а не убираем один компонент с тарелки в последний момент.'],
    en: ['A good catering plan does not begin with a list of dishes. It begins with when people enter the room, how long they have to eat and what needs to happen before the next agenda item.', 'Quantities depend on time of day, event length and whether food is the reason to gather or one part of a longer day. The same guest count does not always mean the same volume.', 'Allergens should be collected before the menu is approved. That lets us build complete alternatives instead of removing one component from a plate at the last minute.']
  }
};

export const cards = {
  home: [
    {id: 'custom-cakes', code: '01', meta: l('suurus, maitse ja kujundus sinu soovil', 'размер, вкус и оформление по вашему желанию', 'size, flavour and design made for you')},
    {id: 'pastry', code: '02', meta: l('saiakesed sinu kuupäevaks', 'булочки к нужной вам дате', 'pastries fresh for your date')},
    {id: 'bread', code: '03', meta: l('juuretisega ja ainult ettetellimisel', 'на закваске и только по предзаказу', 'sourdough, made by pre-order only')},
    {id: 'dessert-table', code: '04', meta: l('magus valik sinu peole', 'сладкий набор для вашего праздника', 'a sweet selection for your celebration')}
  ],
  services: [
    {id: 'menus', code: '01', meta: l('kõik tooted ja hinnad', 'все товары и цены', 'all products and prices')},
    {id: 'references', code: '02', meta: l('valminud tellimuste näited', 'примеры готовых заказов', 'examples of completed orders')},
    {id: 'how-to-order', code: '03', meta: l('neli lihtsat sammu', 'четыре простых шага', 'four simple steps')},
    {id: 'contact', code: '04', meta: l('räägi oma soovist otse', 'расскажите о своём пожелании', 'tell me what you would like')}
  ],
  menus: [
    {id: 'breakfast', code: 'M—01', meta: l('12+ külalist · 14 €', 'от 12 гостей · 14 €', '12+ guests · €14')},
    {id: 'lunch-buffet', code: 'M—02', meta: l('20+ külalist · 24 €', 'от 20 гостей · 24 €', '20+ guests · €24')},
    {id: 'coffee-break', code: 'M—03', meta: l('15+ külalist · 9 €', 'от 15 гостей · 9 €', '15+ guests · €9')},
    {id: 'dessert-table', code: 'M—04', meta: l('16+ külalist · 12 €', 'от 16 гостей · 12 €', '16+ guests · €12')}
  ],
  products: [
    {id: 'seeded-sourdough', code: 'L—01', meta: l('750 g · 6,20 €', '750 г · 6,20 €', '750 g · €6.20')},
    {id: 'rye-bread', code: 'L—02', meta: l('620 g · 5,40 €', '620 г · 5,40 €', '620 g · €5.40')},
    {id: 'country-loaf', code: 'L—03', meta: l('900 g · 7,00 €', '900 г · 7,00 €', '900 g · €7.00')},
    {id: 'cardamom-bun', code: 'S—01', meta: l('110 g · 3,80 €', '110 г · 3,80 €', '110 g · €3.80')},
    {id: 'croissant', code: 'S—02', meta: l('85 g · 3,50 €', '85 г · 3,50 €', '85 g · €3.50')},
    {id: 'sea-buckthorn-cake', code: 'T—01', meta: l('8 lõiku · 38 €', '8 порций · 38 €', '8 slices · €38')},
    {id: 'chocolate-cake', code: 'T—02', meta: l('10 lõiku · 44 €', '10 порций · 44 €', '10 slices · €44')},
    {id: 'buckwheat-loaf', code: 'G—01', meta: l('480 g · 6,80 €', '480 г · 6,80 €', '480 g · €6.80')}
  ],
  cases: [
    {id: 'case-conference', code: 'T—01', meta: l('saiakesed · ettetellimisel', 'булочки · на заказ', 'pastries · made to order')},
    {id: 'case-office', code: 'L—02', meta: l('värske leib · ettetellimisel', 'свежий хлеб · на заказ', 'fresh bread · made to order')},
    {id: 'case-wedding', code: 'T—03', meta: l('pulmatort · isiklik kujundus', 'свадебный торт · свой дизайн', 'wedding cake · personal design')},
    {id: 'case-launch', code: 'M—04', meta: l('magus valik · sündmuseks', 'сладкий набор · к событию', 'dessert selection · for an occasion')},
    {id: 'case-family', code: 'P—05', meta: l('perepidu · värskelt tehtud', 'семейный праздник · свежая выпечка', 'family celebration · freshly made')}
  ],
  journal: [
    {id: 'article-seasonal', code: '01', meta: l('6 min lugemist', '6 минут чтения', '6 min read')},
    {id: 'article-office', code: '02', meta: l('8 min lugemist', '8 минут чтения', '8 min read')},
    {id: 'article-cake', code: '03', meta: l('5 min lugemist', '5 минут чтения', '5 min read')},
    {id: 'article-allergens', code: '04', meta: l('7 min lugemist', '7 минут чтения', '7 min read')}
  ]
};

export const catalogProducts: CatalogProduct[] = [
  product('napoleon', 'T—01', 'cakes', l('Napoleon', 'Наполеон', 'Napoleon cake'), '17 €'),
  product('poppy-seed-cake', 'T—02', 'cakes', l('Moonikook võise vahukreemiga', 'Маковый торт со сливочным кремом', 'Poppy seed cake with buttercream'), '25 €'),
  product('sponge-cream-cake', 'T—03', 'cakes', l('Biskviitkook koorekreemiga', 'Бисквитный торт со сливочным кремом', 'Sponge cake with cream'), '20 €'),
  product('vanilla-cheesecake', 'T—04', 'cakes', l('Vanillimaitseline juustukook', 'Ванильный чизкейк', 'Vanilla cheesecake'), '18 €'),
  product('chocolate-cheesecake', 'T—05', 'cakes', l('Šokolaadijuustukook', 'Шоколадный чизкейк', 'Chocolate cheesecake'), '20 €'),
  product('tiramisu', 'T—06', 'cakes', l('Tiramisu', 'Тирамису', 'Tiramisu'), '20 €'),
  product('red-velvet', 'T—07', 'cakes', l('Punane velvetkook', 'Торт «Красный бархат»', 'Red velvet cake'), '20 €'),
  product('red-velvet-cherry', 'T—08', 'cakes', l('Punane velvetkook kirssidega', 'Торт «Красный бархат» с вишней', 'Red velvet cake with cherries'), '22 €'),
  product('red-velvet-raspberry', 'T—09', 'cakes', l('Punane velvetkook vaarikatega', 'Торт «Красный бархат» с малиной', 'Red velvet cake with raspberries'), '25 €'),
  product('spinach-cake', 'T—10', 'cakes', l('Spinatikook', 'Шпинатный торт', 'Spinach cake'), '25 €'),
  product('honey-cake', 'T—11', 'cakes', l('Meekook', 'Медовик', 'Honey cake'), '18 €'),
  product('meringue-prune-roll', 'T—12', 'cakes', l('Beseerull kuivatatud ploomidega', 'Безе-рулет с черносливом', 'Meringue roll with prunes'), '20 €'),
  product('jaconda-almond-cake', 'T—13', 'cakes', l('Jaconda tort mandlibiskviidiga', 'Торт «Жаконда» с миндальным бисквитом', 'Jaconda cake with almond sponge'), '25 €'),
  product('marzipan-kringel', 'T—14', 'cakes', l('Kringel martsipaniga', 'Крендель с марципаном', 'Marzipan kringel'), '15 €'),
  product('walnut-honey-cake', 'T—15', 'cakes', l('Kreeka pähklitega meekook', 'Медовик с грецкими орехами', 'Honey cake with walnuts'), '22 €'),
  product('red-velvet-cherry-portion', 'T—16', 'cakes', l('Punase velveti kook kirssidega', 'Красный бархат с вишней', 'Red velvet cake with cherries'), '4.50 €', l('1 portsjon', '1 порция', '1 portion')),
  product('chocolate-cake', 'T—17', 'cakes', l('Šokolaadikook', 'Шоколадный торт', 'Chocolate cake'), '25 €'),
  product('chocolate-orange-cake', 'T—18', 'cakes', l('Šokolaadikook apelsinikreemiga', 'Шоколадный торт с апельсиновым кремом', 'Chocolate cake with orange cream'), '30 €'),
  product('hollandia-cake', 'T—19', 'cakes', l('Tort Hollandia', 'Торт «Голландия»', 'Hollandia cake'), '25 €', l('1 kg', '1 кг', '1 kg')),

  product('spinach-pie', 'K—01', 'bakes', l('Spinatipirukas', 'Пирожок со шпинатом', 'Spinach pie'), '2.50 €', l('1 tk', '1 шт.', '1 pc')),
  product('focaccia', 'K—02', 'bakes', l('Focaccia', 'Фокачча', 'Focaccia'), '7 €'),
  product('small-khachapuri', 'K—03', 'bakes', l('Väike hatšapuri', 'Маленький хачапури', 'Small khachapuri'), '10 €'),
  product('large-khachapuri', 'K—04', 'bakes', l('Suur hatšapuri', 'Большой хачапури', 'Large khachapuri'), '15 €'),
  product('vegetable-khachapuri', 'K—05', 'bakes', l('Hatšapuri köögiviljadega', 'Хачапури с овощами', 'Khachapuri with vegetables'), '18 €'),
  product('sausage-mini-burger', 'K—06', 'bakes', l('Mini-burger vorstikesega', 'Мини-бургер с колбаской', 'Mini burger with sausage'), '2 €'),
  product('mini-pizza', 'K—07', 'bakes', l('Mini-pitsa', 'Мини-пицца', 'Mini pizza'), '0.80 €', l('1 tk', '1 шт.', '1 pc')),
  product('salmon-grissini', 'K—08', 'bakes', l('Lõhe grisini pulgaga', 'Лосось с палочкой гриссини', 'Salmon with a grissini stick'), '1.50 €'),
  product('chicken-burger', 'K—09', 'bakes', l('Burger kanakotletiga', 'Бургер с куриной котлетой', 'Burger with chicken patty'), '2.50 €'),
  product('lavash', 'K—10', 'bakes', l('Lavašš', 'Лаваш', 'Lavash'), '0.80 €'),
  product('macarons', 'K—11', 'bakes', l('Makroonid', 'Макарон', 'Macaron'), '1.80 €', l('1 tk', '1 шт.', '1 pc')),

  product('stuffed-eggs', 'S—01', 'snacks', l('Täidetud munad', 'Фаршированные яйца', 'Stuffed eggs'), '1.20 €', l('1 tk', '1 шт.', '1 pc')),
  product('mushroom-tartlets', 'S—02', 'snacks', l('Korvikesed seentega', 'Корзиночки с грибами', 'Mushroom tartlets'), '1 €'),
  product('herring-bread', 'S—03', 'snacks', l('Leib heeringaga', 'Хлеб с сельдью', 'Bread with herring'), '1 €'),
  product('sesame-chicken', 'S—04', 'snacks', l('Kana seesamiseemnetega', 'Курица с кунжутом', 'Chicken with sesame seeds'), '20 €', l('1 kg', '1 кг', '1 kg')),
  product('roast-pork', 'S—05', 'snacks', l('Sealiha praad', 'Жаркое из свинины', 'Roast pork'), '18 €', l('1 kg', '1 кг', '1 kg')),
  product('chicken-roll', 'S—06', 'snacks', l('Kanarull', 'Куриный рулет', 'Chicken roll'), '25 €'),

  product('viljavaagen', 'V—01', 'platters', l('Viljavaagen', 'Ассорти Viljavaagen', 'Viljavaagen platter'), '30 €', l('1 kg', '1 кг', '1 kg')),
  product('fruit-platter', 'V—02', 'platters', l('Puuviljavaagen', 'Фруктовая тарелка', 'Fruit platter'), '32 €', l('1 kg', '1 кг', '1 kg')),
  product('smoked-platter', 'V—03', 'platters', l('Suitsuvaagen', 'Ассорти копчёностей', 'Smoked selection platter'), '27 €', l('1 kg', '1 кг', '1 kg')),
  product('meat-platter', 'V—04', 'platters', l('Lihavaagen', 'Мясная тарелка', 'Meat platter'), '30 €', l('1 kg', '1 кг', '1 kg')),
  product('fish-platter', 'V—05', 'platters', l('Kalavaagen', 'Рыбная тарелка', 'Fish platter'), '32 €', l('1 kg', '1 кг', '1 kg')),
  product('snack-platter', 'V—06', 'platters', l('Suupistevaagen', 'Тарелка закусок', 'Snack platter'), '25 €', l('1 kg', '1 кг', '1 kg')),
  product('ham-rolls-bread', 'V—07', 'platters', l('Singirullid mustal leival', 'Ветчинные рулетики на чёрном хлебе', 'Ham rolls on dark bread'), '16 €', l('1 kg', '1 кг', '1 kg')),
  product('smoked-sprat-carrot-bites', 'V—08', 'platters', l('Minisaiad suitsuräime ja porgandiga', 'Мини-бутерброды с копчёной салакой и морковью', 'Mini bakes with smoked sprat and carrot'), '25 €', l('1 kg', '1 кг', '1 kg'))
];

export function pageCopy(entry: RouteEntry, locale: Locale) {
  const sectionKey = entry.section === 'menus' ? 'catering' : entry.section === 'about' ? 'bakery' : entry.section;
  const fallback = {
    et: `${entry.titles.et} valmib ainult ettetellimisel. Lepime koostise, koguse, kujunduse ja kättesaamise aja enne küpsetamist kokku.`,
    ru: `${entry.titles.ru} готовится только по предварительному заказу. Состав, количество, оформление и время получения согласуем заранее.`,
    en: `${entry.titles.en} is made by pre-order only. We agree the contents, quantity, design and collection time before baking.`
  }[locale];
  const body = sectionBodies[sectionKey]?.[locale] ?? sectionBodies.catering[locale];
  return {
    intro: intros[entry.id]?.[locale] ?? fallback,
    body,
    meta: (intros[entry.id]?.[locale] ?? fallback).slice(0, 156)
  };
}

export const specs = {
  et: [
    ['Miinimum', 'sõltub tootest'], ['Tellimise aeg', 'lepime kokku'], ['Kättesaamine', 'kokkuleppel'], ['Kontakt', 'otse pagariga']
  ],
  ru: [
    ['Минимум', 'зависит от изделия'], ['Срок заказа', 'согласуем'], ['Получение', 'по договорённости'], ['Контакт', 'напрямую с мастером']
  ],
  en: [
    ['Minimum', 'depends on the item'], ['Lead time', 'agreed together'], ['Collection', 'by arrangement'], ['Contact', 'directly with the baker']
  ]
};

export const faqs = {
  et: [
    ['Kuidas tellimust esitada?', 'Helista ja räägi, mida soovid ning mis kuupäevaks. Arutame maitse, koguse, kujunduse, hinna ja kättesaamise läbi.'],
    ['Kui vara peaksin tellima?', 'See sõltub tootest ja tellimuste hulgast. Mida varem helistad, seda lihtsam on soovitud kuupäev kinnitada.'],
    ['Kas arvestad erisoovide ja allergeenidega?', 'Räägime need enne tellimuse kinnitamist läbi. Köögis kasutatakse nisujahu, seega palun anna tugevast allergiast kindlasti teada.'],
    ['Kas midagi saab kohe vitriinilt osta?', 'Ei. Valmis vitriini ei ole — kõik valmib ainult eelnevalt kokkulepitud tellimuse järgi.']
  ],
  ru: [
    ['Как сделать заказ?', 'Позвоните и расскажите, что хотите и к какой дате. Обсудим вкус, количество, оформление, цену и получение.'],
    ['Насколько заранее нужно заказывать?', 'Это зависит от изделия и текущей загрузки. Чем раньше вы позвоните, тем проще подтвердить нужную дату.'],
    ['Можно учесть особые пожелания и аллергены?', 'Обсудим их до подтверждения заказа. На кухне используется пшеничная мука, поэтому о сильной аллергии обязательно сообщите заранее.'],
    ['Можно купить что-нибудь готовое с витрины?', 'Нет. Готовой витрины нет — всё выпекается только под заранее согласованный заказ.']
  ],
  en: [
    ['How do I place an order?', 'Call with what you would like and the date you need it. We will discuss flavour, quantity, design, price and collection.'],
    ['How far ahead should I order?', 'That depends on the item and current workload. The earlier you call, the easier it is to confirm your date.'],
    ['Can you accommodate special requests and allergens?', 'We discuss these before confirming the order. The kitchen handles wheat flour, so please always mention any serious allergy.'],
    ['Can I buy anything ready-made from a counter?', 'No. There is no ready-made counter — everything is baked for an order agreed in advance.']
  ]
};
