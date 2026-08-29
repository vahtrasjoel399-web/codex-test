'use server';

import {headers} from 'next/headers';
import {Resend} from 'resend';
import {enquirySchema} from '@/lib/enquiry-schema';

export type EnquiryState = {ok: boolean; error?: string};
const attempts = new Map<string, {count: number; reset: number}>();

function allowed(ip: string) {
  const now = Date.now();
  const record = attempts.get(ip);
  if (!record || record.reset < now) {
    attempts.set(ip, {count: 1, reset: now + 60 * 60 * 1000});
    return true;
  }
  if (record.count >= 5) return false;
  record.count += 1;
  return true;
}

export async function submitEnquiry(input: unknown): Promise<EnquiryState> {
  const ip = headers().get('x-forwarded-for')?.split(',')[0] ?? 'local';
  if (!allowed(ip)) return {ok: false, error: 'rate-limit'};
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) return {ok: false, error: 'validation'};
  if (parsed.data.website) return {ok: true};

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (key && to) {
    const resend = new Resend(key);
    const d = parsed.data;
    const subject = `Uus päring · ${d.eventDate} · ${d.guests} külalist`;
    const lines = [
      `Nimi: ${d.name}`,
      `Ettevõte: ${d.company || '—'}`,
      `Kontakt: ${d.email} · ${d.phone}`,
      `Sündmus: ${d.eventType}`,
      `Kuupäev: ${d.eventDate}`,
      `Külalisi: ${d.guests}`,
      `Eelarve: ${d.budget}`,
      `Teenindus: ${d.serviceStyle}`,
      `Dieedid: ${d.dietary.join(', ') || '—'}`,
      `Sõnum: ${d.message || '—'}`
    ];
    const confirmations = {
      et: ['Sinu tellimussoov jõudis Varasse', 'Aitäh! Võtan sinuga ühendust, et detailid ja kuupäev kokku leppida. Kiire küsimuse korral helista +372 5551 0414.'],
      ru: ['Vara получила ваш запрос', 'Спасибо! Я свяжусь с вами, чтобы согласовать детали и дату. Если ответ нужен быстро, позвоните: +372 5551 0414.'],
      en: ['Vara has received your order request', 'Thank you! I will contact you to agree the details and date. If you need a quick answer, call +372 5551 0414.']
    } as const;
    await Promise.all([
      resend.emails.send({from: 'Vara <orders@vara.ee>', to, subject, text: lines.join('\n')}),
      resend.emails.send({from: 'Vara <orders@vara.ee>', to: d.email, subject: confirmations[d.locale][0], text: confirmations[d.locale][1]})
    ]);
  }
  return {ok: true};
}
