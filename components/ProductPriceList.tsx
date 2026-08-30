'use client';

import Image from 'next/image';
import {useEffect, useMemo, useState} from 'react';
import {Check, Copy, Minus, Phone, Plus, ShoppingBag, Trash2, X} from 'lucide-react';
import {catalogProducts, type CatalogProduct} from '@/content/site-copy';
import type {Locale} from '@/config/routes';

type Group = CatalogProduct['group'];

const groupOrder: Group[] = ['cakes', 'bakes', 'snacks', 'platters'];

const groupLabels: Record<Group, Record<Locale, string>> = {
  cakes: {et: 'Tordid ja koogid', ru: 'Торты и пирожные', en: 'Cakes and desserts'},
  bakes: {et: 'Küpsetised', ru: 'Выпечка', en: 'Bakes'},
  snacks: {et: 'Suupisted ja lihatoidud', ru: 'Закуски и мясные блюда', en: 'Snacks and meat dishes'},
  platters: {et: 'Vaagnad', ru: 'Ассорти и подносы', en: 'Platters'}
};

const customCopy: Record<Locale, {label: string; title: string; body: string; call: string}> = {
  et: {
    label: 'ERITELLIMUS',
    title: 'Kas soovitud toodet pole nimekirjas?',
    body: 'Helista ja räägi oma soovist. Võimalusel valmistan ka midagi täiesti teistsugust — maitse, kogus, kujundus ja hind lepitakse enne töö algust kokku.',
    call: 'Helista ja küsi'
  },
  ru: {
    label: 'ИНДИВИДУАЛЬНЫЙ ЗАКАЗ',
    title: 'Не нашли нужное в списке?',
    body: 'Позвоните и расскажите, что вам хочется. Если это возможно, я приготовлю и совсем другое блюдо — вкус, количество, оформление и цену согласуем до начала работы.',
    call: 'Позвонить и спросить'
  },
  en: {
    label: 'CUSTOM ORDER',
    title: 'Cannot find what you need?',
    body: 'Call and tell me what you have in mind. Where possible, I can make something completely different too — we agree the flavour, quantity, design and price before work begins.',
    call: 'Call and ask'
  }
};

export function ProductPriceList({locale, group}: {locale: Locale; group?: Group}) {
  const groups = group ? [group] : groupOrder;
  const custom = customCopy[locale];
  const [order, setOrder] = useState<Record<string, number>>({});
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const text = orderCopy[locale];

  useEffect(() => {
    try {setOrder(JSON.parse(localStorage.getItem('vara-order-list') ?? '{}'));} catch {setOrder({});}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('vara-order-list', JSON.stringify(order));
  }, [hydrated, order]);

  const selected = useMemo(() => catalogProducts.filter((item) => order[item.id]), [order]);
  const itemCount = Object.values(order).reduce((sum, quantity) => sum + quantity, 0);
  const changeQuantity = (id: string, change: number) => setOrder((current) => {
    const quantity = Math.max(0, (current[id] ?? 0) + change);
    const next = {...current};
    if (quantity) next[id] = quantity; else delete next[id];
    return next;
  });
  const copyOrder = async () => {
    const lines = selected.map((item) => `${order[item.id]} × ${item.title[locale]} (${item.unit?.[locale] ?? item.price})`);
    await navigator.clipboard.writeText(`${text.listTitle}\n${lines.join('\n')}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="product-price-list">
      <div className="custom-order-note">
        <span>{custom.label}</span>
        <h2>{custom.title}</h2>
        <p>{custom.body}</p>
        <a href="tel:+37255510414"><Phone size={18}/>{custom.call}</a>
      </div>

      {groups.map((currentGroup, groupIndex) => {
        const items = catalogProducts.filter((item) => item.group === currentGroup);
        return (
          <div className="product-price-group" key={currentGroup}>
            <header><span>0{groupIndex + 1}</span><h2>{groupLabels[currentGroup][locale]}</h2><em>{items.length.toString().padStart(2, '0')}</em></header>
            <div className="product-price-head"><span aria-hidden="true"/><span>№</span><span>{locale === 'et' ? 'Toode' : locale === 'ru' ? 'Позиция' : 'Item'}</span><span>{locale === 'et' ? 'Ühik' : locale === 'ru' ? 'Единица' : 'Unit'}</span><span>{locale === 'et' ? 'Hind' : locale === 'ru' ? 'Цена' : 'Price'}</span></div>
            {items.map((item) => (
              <div className="product-price-row" key={item.id}>
                <div className="product-price-photo"><Image src={item.image} alt={item.title[locale]} fill sizes="(max-width: 820px) 64px, 72px"/></div>
                <span>{item.code}</span>
                <strong>{item.title[locale]}</strong>
                <em>{item.unit?.[locale] ?? '—'}</em>
                <b>{item.price}</b>
                <button className={order[item.id] ? 'product-add is-added' : 'product-add'} type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`${text.add}: ${item.title[locale]}`}>
                  {order[item.id] ? <><Check size={16}/><span>{order[item.id]}</span></> : <><Plus size={16}/><span>{text.add}</span></>}
                </button>
              </div>
            ))}
          </div>
        );
      })}
      {itemCount > 0 && <button className="order-list-trigger" type="button" onClick={() => setDrawerOpen(true)}><ShoppingBag size={19}/><span>{text.open}</span><b>{itemCount}</b></button>}
      <div className={drawerOpen ? 'order-drawer-backdrop is-open' : 'order-drawer-backdrop'} onClick={() => setDrawerOpen(false)} />
      <aside className={drawerOpen ? 'order-drawer is-open' : 'order-drawer'} aria-hidden={!drawerOpen} aria-label={text.title}>
        <header><div><span>{text.label}</span><h2>{text.title}</h2></div><button type="button" onClick={() => setDrawerOpen(false)} aria-label={text.close}><X/></button></header>
        <p>{text.intro}</p>
        <div className="order-drawer-items">
          {selected.map((item) => <div className="order-drawer-item" key={item.id}>
            <div><strong>{item.title[locale]}</strong><span>{item.price} · {item.unit?.[locale]}</span></div>
            <div className="order-quantity"><button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={text.minus}><Minus size={15}/></button><b>{order[item.id]}</b><button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={text.plus}><Plus size={15}/></button></div>
            <button className="order-remove" type="button" onClick={() => setOrder((current) => {const next = {...current}; delete next[item.id]; return next;})} aria-label={text.remove}><Trash2 size={16}/></button>
          </div>)}
        </div>
        <div className="order-drawer-actions"><button type="button" onClick={copyOrder}>{copied ? <Check size={17}/> : <Copy size={17}/>} {copied ? text.copied : text.copy}</button><a href="tel:+37255510414"><Phone size={17}/>{text.call}</a></div>
        <small>{text.note}</small>
      </aside>
    </section>
  );
}

const orderCopy: Record<Locale, Record<'label'|'title'|'intro'|'add'|'open'|'close'|'minus'|'plus'|'remove'|'copy'|'copied'|'call'|'note'|'listTitle', string>> = {
  et: {label:'SOOVINIMEKIRI',title:'Minu tellimus',intro:'Lisa kogused, kopeeri nimekiri ja helista — nii on soovid kohe käepärast.',add:'Lisa',open:'Minu nimekiri',close:'Sulge',minus:'Vähenda kogust',plus:'Suurenda kogust',remove:'Eemalda',copy:'Kopeeri nimekiri',copied:'Kopeeritud',call:'Helista pagarile',note:'Nimekiri ei kinnita tellimust. Saadavus, kuupäev, kogused ja lõpphind lepitakse telefonis kokku.',listTitle:'Soovin tellida:'},
  ru: {label:'СПИСОК ЖЕЛАЕМОГО',title:'Мой заказ',intro:'Укажите количество, скопируйте список и позвоните — все пожелания будут под рукой.',add:'Добавить',open:'Мой список',close:'Закрыть',minus:'Уменьшить количество',plus:'Увеличить количество',remove:'Удалить',copy:'Скопировать список',copied:'Скопировано',call:'Позвонить пекарю',note:'Список не подтверждает заказ. Наличие, дату, количество и итоговую цену согласуем по телефону.',listTitle:'Хочу заказать:'},
  en: {label:'WISH LIST',title:'My order',intro:'Set quantities, copy the list and call — your wishes will be ready to discuss.',add:'Add',open:'My list',close:'Close',minus:'Decrease quantity',plus:'Increase quantity',remove:'Remove',copy:'Copy list',copied:'Copied',call:'Call the baker',note:'This list does not confirm an order. Availability, date, quantities and final price are agreed by phone.',listTitle:'I would like to order:'}
};
