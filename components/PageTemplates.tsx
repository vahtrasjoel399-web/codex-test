import Image from 'next/image';
import Link from 'next/link';
import {ArrowDown, ArrowRight, ArrowUpRight, Check, Clock3, Download, MapPin, Phone} from 'lucide-react';
import heroImage from '@/public/images/bakery-morning.png';
import cateringImage from '@/public/images/catering-table.png';
import productsImage from '@/public/images/product-tray.png';
import {cards, catalogProducts, faqs, pageCopy, specs, uiCopy, brand, type CatalogProduct} from '@/content/site-copy';
import {routeById, routeHref, type Locale, type RouteEntry} from '@/config/routes';
import {CatalogGrid} from '@/components/CatalogGrid';
import {HeroImage, HeroLines, Reveal} from '@/components/Motion';
import {EnquiryForm} from '@/components/EnquiryForm';
import {ProductPriceList} from '@/components/ProductPriceList';

export function PageRenderer({entry, locale}: {entry: RouteEntry; locale: Locale}) {
  if (entry.template === 'home') return <HomeTemplate locale={locale} />;
  if (entry.template === 'service-hub') return <ServiceHubTemplate entry={entry} locale={locale} />;
  if (entry.template === 'service-detail') return <ServiceDetailTemplate entry={entry} locale={locale} />;
  if (entry.template === 'catalog') return <CatalogTemplate entry={entry} locale={locale} />;
  if (entry.template === 'article') return <ArticleTemplate entry={entry} locale={locale} />;
  return <UtilityTemplate entry={entry} locale={locale} />;
}

function HomeTemplate({locale}: {locale: Locale}) {
  const copy = uiCopy[locale];
  return (
    <>
      <section className="home-hero">
        <div className="visible-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="hero-kicker"><span>00</span>{copy.homeKicker}</div>
          <HeroLines lines={copy.homeTitle.split(' ').reduce<string[]>((lines, word) => {
            const last = lines[lines.length - 1];
            if (!last || last.length + word.length > 11) lines.push(word); else lines[lines.length - 1] = `${last} ${word}`;
            return lines;
          }, [])}/>
          <p>{copy.homeIntro}</p>
          <div className="hero-links"><a className="button-primary" href="tel:+3725032485">{copy.primary}<Phone/></a><Link className="text-link" href={routeHref(locale, 'bakery')}>{copy.secondary}<ArrowRight/></Link></div>
        </div>
        <div className="hero-photo">
          <HeroImage><Image src={heroImage} alt={locale === 'et' ? 'Pagar valmistab värsket tellimust' : locale === 'ru' ? 'Мастер готовит свежую выпечку на заказ' : 'A baker makes a fresh custom order'} fill priority placeholder="blur" sizes="(max-width: 768px) 100vw, 58vw" /></HeroImage>
          <div className="photo-note"><span>HANDMADE</span><span>ORDER B—0427</span></div>
        </div>
        <div className="hero-scroll"><ArrowDown/> SCROLL</div>
      </section>

      <section className="manifesto grid-shell">
        <div className="section-index">01 / {copy.sectionLabel}</div>
        <Reveal className="manifesto-text"><h2>{copy.trust}</h2></Reveal>
        <div className="manifesto-facts">{copy.facts.map((fact, index) => <div key={fact}><span>0{index + 1}</span>{fact}</div>)}</div>
      </section>

      <section className="service-scroll-section">
        <div className="section-heading"><span>02</span><h2>{copy.homeOfferTitle}</h2><Link href={routeHref(locale, 'bakery')}>{routeById.bakery.titles[locale]}<ArrowUpRight/></Link></div>
        <div className="service-scroll">
          {cards.home.map((card, index) => <ServiceCard key={card.id} locale={locale} {...card} index={index}/>) }
        </div>
      </section>

      <section className="process-intro grid-shell">
        <div className="section-index">03 / ORDER</div>
        <Reveal><h2>{copy.processTitle}</h2></Reveal>
        <p>{copy.processBody}</p>
        <ol className="process-steps">{copy.process.map((step) => <li key={step}>{step}</li>)}</ol>
      </section>

      <section className="full-bleed">
        <Image src={cateringImage} alt={locale === 'et' ? 'Tellimuse järgi valmistatud pidulaud' : locale === 'ru' ? 'Праздничный стол, приготовленный на заказ' : 'A celebration table made to order'} fill placeholder="blur" sizes="100vw" />
        <div className="full-bleed-caption"><span>04 / MADE FOR YOU</span><h2>{copy.fullBleed}</h2></div>
      </section>
      <ClosingCta locale={locale} title={copy.ctaTitle} body={copy.ctaBody} type="corporate" />
    </>
  );
}

function ServiceCard({id, code, meta, locale, index}: {id: string; code: string; meta: Record<Locale, string>; locale: Locale; index: number}) {
  return <article className="service-card"><Link href={routeHref(locale, id)}><div className="service-card-top"><span>{code}</span><ArrowUpRight/></div><div className="service-card-image"><Image src={index % 2 ? productsImage : cateringImage} alt="" fill placeholder="blur" sizes="(max-width: 768px) 82vw, 32vw" /></div><h3>{routeById[id].titles[locale]}</h3><p>{meta[locale]}</p><i/></Link></article>;
}

function InnerHero({entry, locale, image = cateringImage}: {entry: RouteEntry; locale: Locale; image?: typeof cateringImage}) {
  const copy = pageCopy(entry, locale);
  return (
    <section className="inner-hero grid-shell">
      <Breadcrumb entry={entry} locale={locale}/>
      <div className="inner-title"><span className="section-index">{entry.section.toUpperCase()} / {entry.id.replaceAll('-', ' ')}</span><h1>{entry.titles[locale]}</h1><p>{copy.intro}</p></div>
      <div className="inner-image"><Image src={image} alt={entry.titles[locale]} fill placeholder="blur" priority sizes="(max-width: 768px) 100vw, 48vw"/></div>
      <div className="bleed-number" aria-hidden="true">{entry.id.length.toString().padStart(2, '0')}</div>
    </section>
  );
}

function ServiceHubTemplate({entry, locale}: {entry: RouteEntry; locale: Locale}) {
  const items = cards.services;
  const copy = pageCopy(entry, locale);
  return <><InnerHero entry={entry} locale={locale} image={cateringImage}/><section className="hub-ledger grid-shell"><div className="section-index">01 / ORDER</div><div className="hub-copy"><h2>{locale === 'et' ? 'Üks tellimus igaks sündmuseks.' : locale === 'ru' ? 'Один заказ для любого события.' : 'One order for any occasion.'}</h2>{copy.body.map((p) => <p key={p}>{p}</p>)}</div><div className="hub-options">{items.map((item) => <Link href={routeHref(locale, item.id)} key={item.id}><span>{item.code}</span><strong>{routeById[item.id].titles[locale]}</strong><em>{item.meta[locale]}</em><ArrowUpRight/></Link>)}</div></section><SpecBand locale={locale}/><ClosingCta locale={locale} type={entry.eventType}/></>;
}

function ServiceDetailTemplate({entry, locale}: {entry: RouteEntry; locale: Locale}) {
  const copy = pageCopy(entry, locale);
  const product = entry.section === 'bakery';
  const menu = entry.section === 'menus';
  return <><InnerHero entry={entry} locale={locale} image={product ? productsImage : cateringImage}/><section className="detail-narrative grid-shell"><div className="section-index">01 / BRIEF</div><div className="narrative-main"><h2>{locale === 'et' ? 'Kõigepealt soov. Siis maitse.' : locale === 'ru' ? 'Сначала пожелания. Затем вкус.' : 'Your wishes first. Then flavour.'}</h2>{copy.body.map((paragraph, index) => <Reveal key={paragraph} delay={index * .05}><p>{paragraph}</p></Reveal>)}</div><aside><span>{locale === 'et' ? 'Sobib' : locale === 'ru' ? 'Подходит' : 'Best for'}</span><strong>{entry.titles[locale]}</strong><p>{copy.intro}</p></aside></section><section className="detail-image-band"><Image src={product ? productsImage : cateringImage} alt={entry.titles[locale]} fill placeholder="blur" sizes="100vw"/><div>MADE / TO ORDER</div></section><section className="spec-section grid-shell"><div className="section-index">02 / SPEC</div><h2>{menu ? (locale === 'et' ? 'Tellimuse sisu' : locale === 'ru' ? 'Состав заказа' : 'Order contents') : (locale === 'et' ? 'Tellimuse raam' : locale === 'ru' ? 'Параметры заказа' : 'Order parameters')}</h2><SpecTable locale={locale}/><div className="included-list">{['A', 'B', 'C', 'D'].map((letter, index) => <div key={letter}><span>{letter}</span><p>{[locale === 'et' ? 'Värskelt sinu tellimuse järgi valmistatud' : locale === 'ru' ? 'Приготовлено свежим специально по вашему заказу' : 'Made fresh especially for your order', locale === 'et' ? 'Koostis ja allergeenid eelnevalt läbi räägitud' : locale === 'ru' ? 'Состав и аллергены обсуждены заранее' : 'Ingredients and allergens discussed in advance', locale === 'et' ? 'Kinnitatud kuupäev ja kättesaamise aeg' : locale === 'ru' ? 'Согласованная дата и время получения' : 'Confirmed date and collection time', locale === 'et' ? 'Otsekontakt pagariga' : locale === 'ru' ? 'Прямая связь с мастером' : 'Direct contact with the baker'][index]}</p><Check/></div>)}</div></section><Related locale={locale} entry={entry}/><ClosingCta locale={locale} type={entry.eventType}/></>;
}

function CatalogTemplate({entry, locale}: {entry: RouteEntry; locale: Locale}) {
  const productGroupByRoute: Partial<Record<string, CatalogProduct['group']>> = {cakes: 'cakes', pastry: 'bakes', bread: 'snacks', 'gluten-free': 'platters'};
  const group = productGroupByRoute[entry.id];
  if (group) {
    const count = catalogProducts.filter((item) => item.group === group).length;
    return <><section className="catalog-hero grid-shell"><Breadcrumb entry={entry} locale={locale}/><span className="section-index">CAT / {count.toString().padStart(2,'0')}</span><h1>{entry.titles[locale]}</h1><p>{pageCopy(entry, locale).intro}</p></section><ProductPriceList locale={locale} group={group}/><ClosingCta locale={locale}/></>;
  }
  let items: {id: string; code: string; meta: Record<Locale, string>; group?: string}[] = cards.products.map((item) => ({...item, group: ['seeded-sourdough','rye-bread','country-loaf'].includes(item.id) ? 'bread' : ['cardamom-bun','croissant'].includes(item.id) ? 'pastry' : ['sea-buckthorn-cake','chocolate-cake'].includes(item.id) ? 'cakes' : 'gluten-free'}));
  let image = productsImage;
  let filters: {value: string; label: string}[] | undefined;
  if (entry.id === 'bakery') items = [
    {id:'cakes',code:'01',group:'cakes',meta:{et:'tordid ja koogid',ru:'торты и пирожные',en:'cakes and desserts'}},
    {id:'pastry',code:'02',group:'pastry',meta:{et:'värske küpsetis',ru:'свежая выпечка',en:'fresh bakes'}},
    {id:'bread',code:'03',group:'bread',meta:{et:'suupisted ja lihatoidud',ru:'закуски и мясные блюда',en:'snacks and meat dishes'}},
    {id:'gluten-free',code:'04',group:'gluten-free',meta:{et:'vaagnad',ru:'ассорти и подносы',en:'platters'}}
  ];
  if (entry.section === 'menus') {items = cards.menus; image = cateringImage;}
  if (entry.section === 'references') {items = cards.cases; image = cateringImage;}
  if (entry.section === 'journal') {items = cards.journal; image = heroImage;}
  if (entry.id === 'team') items = [
    {id: 'bakery-space', code: '01', meta: {et:'peapagar · 04:00',ru:'главный пекарь · 04:00',en:'head baker · 04:00'}},
    {id: 'about', code: '02', meta: {et:'tootmine · 05:00',ru:'производство · 05:00',en:'production · 05:00'}},
    {id: 'contact', code: '03', meta: {et:'tellimused · 08:00',ru:'заказы · 08:00',en:'orders · 08:00'}}
  ];
  if (entry.id === 'gallery') items = [...cards.cases, ...cards.products.slice(0,3)];
  if (entry.section === 'bakery' && ['bread','pastry','cakes','gluten-free'].includes(entry.id)) items = items.filter((item) => item.group === entry.id);
  return <><section className="catalog-hero grid-shell"><Breadcrumb entry={entry} locale={locale}/><span className="section-index">CAT / {items.length.toString().padStart(2,'0')}</span><h1>{entry.titles[locale]}</h1><p>{pageCopy(entry, locale).intro}</p></section><section className="catalog-wrap"><CatalogGrid items={items} locale={locale} image={image} filters={filters}/></section><ClosingCta locale={locale} type={entry.section === 'bakery' ? 'corporate' : undefined}/></>;
}

function ArticleTemplate({entry, locale}: {entry: RouteEntry; locale: Locale}) {
  const copy = pageCopy(entry, locale);
  const isCase = entry.section === 'references';
  return <><article className="article-template"><Breadcrumb entry={entry} locale={locale}/><header><span className="section-index">{isCase ? 'CASE' : 'NOTE'} / {entry.id.slice(-2).toUpperCase()}</span><h1>{entry.titles[locale]}</h1><p>{copy.intro}</p><div className="article-meta"><span>VARA / 28.08.2026</span><span>{isCase ? (locale === 'et' ? 'Kontrollitud juhtum' : locale === 'ru' ? 'Проверенный проект' : 'Verified case') : '7 MIN'}</span></div></header><div className="article-lead-image"><Image src={isCase ? cateringImage : heroImage} alt={entry.titles[locale]} fill placeholder="blur" sizes="100vw"/></div><div className="article-body"><p className="article-drop">{copy.body[0]}</p><h2>{locale === 'et' ? 'Mida planeerija peab teadma' : locale === 'ru' ? 'Что важно знать организатору' : 'What the planner needs to know'}</h2><p>{copy.body[1]}</p><blockquote>{locale === 'et' ? 'Hea toitlustus ei tõmba endale tähelepanu. See annab üritusele õige rütmi.' : locale === 'ru' ? 'Хороший кейтеринг не перетягивает внимание на себя. Он задаёт событию правильный ритм.' : 'Good catering does not demand attention. It gives the event the right rhythm.'}</blockquote><p>{copy.body[2]}</p><h2>{locale === 'et' ? 'Praktiline kontrollnimekiri' : locale === 'ru' ? 'Практический список' : 'A practical checklist'}</h2><ul><li>{locale === 'et' ? 'Kinnita külaliste arv ja söömise kellaaeg.' : locale === 'ru' ? 'Подтвердите число гостей и время подачи.' : 'Confirm guest count and serving time.'}</li><li>{locale === 'et' ? 'Kogu dieedid enne menüü lukustamist.' : locale === 'ru' ? 'Соберите данные о диетах до утверждения меню.' : 'Collect dietary needs before locking the menu.'}</li><li>{locale === 'et' ? 'Jaga korruse, lifti ja parkimise info.' : locale === 'ru' ? 'Сообщите этаж, доступ к лифту и парковке.' : 'Share floor, lift and parking information.'}</li></ul><p>{copy.body[0]}</p><div className="article-links"><Link href={routeHref(locale,'pricing')}>{routeById.pricing.titles[locale]}<ArrowUpRight/></Link><Link href={routeHref(locale,'how-to-order')}>{routeById['how-to-order'].titles[locale]}<ArrowUpRight/></Link></div></div></article><ClosingCta locale={locale} type={isCase ? 'corporate' : undefined}/></>;
}

function UtilityTemplate({entry, locale}: {entry: RouteEntry; locale: Locale}) {
  if (entry.id === 'enquiry') return <EnquiryPage entry={entry} locale={locale}/>;
  if (entry.id === 'thank-you') return <ThankYou entry={entry} locale={locale}/>;
  const copy = pageCopy(entry, locale);
  return <><section className="utility-hero grid-shell"><Breadcrumb entry={entry} locale={locale}/><div><span className="section-index">INFO / {entry.id.toUpperCase()}</span><h1>{entry.titles[locale]}</h1><p>{copy.intro}</p></div></section>{entry.id === 'faq' ? <Faq locale={locale}/> : entry.id === 'pricing' ? <Pricing locale={locale}/> : entry.id === 'contact' ? <Contact locale={locale}/> : entry.id === 'delivery' ? <Delivery locale={locale}/> : <UtilityBody entry={entry} locale={locale}/>} {!['privacy','terms','cookies'].includes(entry.id) && <ClosingCta locale={locale}/>}</>;
}

function EnquiryPage({entry, locale}: {entry: RouteEntry; locale: Locale}) {
  return <section className="enquiry-page"><div className="enquiry-aside"><Breadcrumb entry={entry} locale={locale}/><span className="section-index">ORDER / 02 MIN</span><h1>{entry.titles[locale]}</h1><p>{pageCopy(entry, locale).intro}</p><div className="enquiry-contact"><span>{locale === 'et' ? 'Eelistad helistada?' : locale === 'ru' ? 'Удобнее позвонить?' : 'Prefer to call?'}</span><a href="tel:+3725032485">{brand.phone}</a><small>{locale === 'et' ? 'Tellimused kokkuleppel' : locale === 'ru' ? 'Заказы по договорённости' : 'Orders by arrangement'}</small></div></div><div className="enquiry-form-wrap"><EnquiryForm locale={locale}/></div></section>;
}

function ThankYou({entry, locale}: {entry: RouteEntry; locale: Locale}) {
  return <section className="thank-you"><span className="success-mark"><Check/></span><span>RECEIVED / 01</span><h1>{entry.titles[locale]}</h1><p>{locale === 'et' ? 'Aitäh! Võtan sinuga ühendust, et tellimuse detailid ja kuupäev läbi rääkida. Kui soovid kiiremini vastust, helista.' : locale === 'ru' ? 'Спасибо! Я свяжусь с вами, чтобы обсудить детали и дату заказа. Если нужен быстрый ответ, позвоните.' : 'Thank you! I will contact you to discuss the details and date. If you need a quick answer, please call.'}</p><a href="tel:+3725032485">{brand.phone}<ArrowUpRight/></a><Link href={routeHref(locale,'home')}>{locale === 'et' ? 'Tagasi avalehele' : locale === 'ru' ? 'Вернуться на главную' : 'Return home'}</Link></section>;
}

function Breadcrumb({entry, locale}: {entry: RouteEntry; locale: Locale}) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={`/${locale}`}>Vara</Link><span>/</span>{entry.section !== 'utility' && entry.section !== 'home' && entry.id !== entry.section && routeById[entry.section] ? <><Link href={routeHref(locale, entry.section)}>{routeById[entry.section].titles[locale]}</Link><span>/</span></> : null}<span aria-current="page">{entry.titles[locale]}</span></nav>;
}

function SpecTable({locale}: {locale: Locale}) {return <div className="spec-table">{specs[locale].map(([label,value],index) => <div key={label}><span>0{index+1}</span><strong>{label}</strong><em>{value}</em></div>)}</div>}
function SpecBand({locale}: {locale: Locale}) {return <section className="spec-band"><SpecTable locale={locale}/></section>}

function Related({locale, entry}: {locale: Locale; entry: RouteEntry}) {
  const ids = entry.section === 'bakery' ? ['bakery','menus','catering'] : ['pricing','menus','how-to-order'];
  return <section className="related grid-shell"><span className="section-index">03 / NEXT</span><h2>{locale === 'et' ? 'Järgmine kasulik otsus' : locale === 'ru' ? 'Следующее полезное решение' : 'The next useful decision'}</h2><div>{ids.map((id) => <Link href={routeHref(locale,id)} key={id}><span>{routeById[id].titles[locale]}</span><ArrowUpRight/></Link>)}</div></section>;
}

function ClosingCta({locale, title, body, type: _type}: {locale: Locale; title?: string; body?: string; type?: string}) {
  const copy = uiCopy[locale];
  return <section className="closing-cta"><div className="visible-grid"/><span>Q—01</span><h2>{title ?? copy.ctaTitle}</h2><p>{body ?? copy.ctaBody}</p><a href="tel:+3725032485">{copy.primary}<Phone/></a></section>;
}

function Faq({locale}: {locale: Locale}) {return <section className="faq-list grid-shell">{faqs[locale].map(([q,a],index) => <details key={q}><summary><span>0{index+1}</span><strong>{q}</strong><i>＋</i></summary><p>{a}</p></details>)}</section>}

function Pricing({locale}: {locale: Locale}) {
  return <ProductPriceList locale={locale}/>;
}

function Contact({locale}: {locale: Locale}) {return <section className="contact-grid grid-shell"><div><span>01 / ORDER</span><MapPin/><h2>{locale==='et'?'Ainult eelneval kokkuleppel':locale==='ru'?'Только по предварительному заказу':'By prior order only'}</h2><p>{locale==='et'?'Valmis vitriini ega tavapärast kauplust ei ole. Kättesaamise aja ja koha lepime iga tellimuse puhul eraldi kokku.':locale==='ru'?'Готовой витрины и обычного магазина нет. Время и место получения согласуем отдельно для каждого заказа.':'There is no ready-made counter or regular shop. We agree the collection time and place separately for every order.'}</p></div><div><span>02 / CALL</span><Phone/><h2>{brand.phone}</h2><p>{locale==='et'?'Helista, räägi oma soovist ja soovitud kuupäevast. Vastan ise ning teen ka sinu tellimuse valmis.':locale==='ru'?'Позвоните, расскажите, что хотите и к какой дате. Я сама отвечу на звонок и приготовлю ваш заказ.':'Call with your idea and date. I answer personally and make your order too.'}</p><a href={`tel:${brand.phone.replace(/\s/g, '')}`}>{locale==='et'?'Helista ja telli':locale==='ru'?'Позвонить и заказать':'Call to order'} <ArrowUpRight/></a></div></section>}

function Delivery({locale}: {locale: Locale}) {const zones=[['A','0–8 km','24 €'],['B','8–20 km','42 €'],['C','20–35 km','68 €'],['D','35–50 km','95 €']];return <section className="delivery-zones grid-shell"><div className="zone-map"><div className="ring r1">A</div><div className="ring r2">B</div><div className="ring r3">C</div><div className="ring r4">D</div><span>TALLINN</span></div><div className="zone-list">{zones.map(([z,km,price])=><div key={z}><strong>{z}</strong><span>{km}</span><b>{price}</b></div>)}<p>{locale==='et'?'Hind kehtib ühele tarnele tööpäeval 07–18. Õhtune tagastus ja praamitransport lisatakse eraldi.':locale==='ru'?'Цена действует для одной доставки в рабочий день 07–18. Вечерний возврат и паромный транспорт рассчитываются отдельно.':'Price covers one weekday delivery from 07–18. Evening collection and ferry transport are quoted separately.'}</p></div></section>}

function UtilityBody({entry, locale}: {entry: RouteEntry; locale: Locale}) {const copy=pageCopy(entry,locale);return <section className="utility-body grid-shell"><div className="section-index">01 / DETAIL</div><div>{copy.body.map((p)=><p key={p}>{p}</p>)}{entry.id==='how-to-order'&&<ol>{['Kõne / Звонок / Call','Soovid / Пожелания / Wishes','Kinnitus / Подтверждение / Approval','Küpsetamine / Приготовление / Baking','Kättesaamine / Получение / Collection'].map((s,i)=><li key={s}><span>0{i+1}</span>{s}</li>)}</ol>}</div></section>}
