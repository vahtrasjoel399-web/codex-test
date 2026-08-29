import Image from 'next/image';
import {Phone} from 'lucide-react';
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
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
}
