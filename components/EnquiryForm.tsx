'use client';

import {useState, useTransition} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {AnimatePresence, motion} from 'motion/react';
import {Check, ChevronLeft, ChevronRight, LoaderCircle} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {submitEnquiry} from '@/app/actions';
import {dietaryOptions, enquirySchema, type EnquiryInput} from '@/lib/enquiry-schema';
import {routeHref, type Locale} from '@/config/routes';

const options = {
  type: {
    et: [['cake', 'Tellimustort'], ['corporate', 'Leib'], ['conference', 'Saiakesed'], ['wedding', 'Pulmatort'], ['private', 'Magus valik peole'], ['breakfast', 'Hommikusöök'], ['lunch', 'Soolased küpsetised']],
    ru: [['cake', 'Торт на заказ'], ['corporate', 'Хлеб'], ['conference', 'Булочки и выпечка'], ['wedding', 'Свадебный торт'], ['private', 'Сладкий набор к празднику'], ['breakfast', 'Завтрак'], ['lunch', 'Несладкая выпечка']],
    en: [['cake', 'Custom cake'], ['corporate', 'Bread'], ['conference', 'Pastries'], ['wedding', 'Wedding cake'], ['private', 'Dessert selection'], ['breakfast', 'Breakfast'], ['lunch', 'Savoury bakes']]
  },
  budget: {
    et: [['under-500', 'Kuni 50 €'], ['500-1000', '50–100 €'], ['1000-2500', '100–200 €'], ['2500-5000', '200–500 €'], ['over-5000', 'Üle 500 €']],
    ru: [['under-500', 'До 50 €'], ['500-1000', '50–100 €'], ['1000-2500', '100–200 €'], ['2500-5000', '200–500 €'], ['over-5000', 'Более 500 €']],
    en: [['under-500', 'Under €50'], ['500-1000', '€50–100'], ['1000-2500', '€100–200'], ['2500-5000', '€200–500'], ['over-5000', 'Over €500']]
  },
  service: {
    et: [['pickup', 'Tulen ise järele'], ['delivery', 'Soovin tarnet'], ['full-service', 'Lepime telefoni teel kokku']],
    ru: [['pickup', 'Самовывоз'], ['delivery', 'Нужна доставка'], ['full-service', 'Договоримся по телефону']],
    en: [['pickup', 'Pickup'], ['delivery', 'Delivery'], ['full-service', 'Agree by phone']]
  }
} as const;

const dietaryLabels = {
  et: ['Vegan', 'Gluteenivaba', 'Laktoosivaba', 'Pähklivaba', 'Halal'],
  ru: ['Веганское', 'Без глютена', 'Без лактозы', 'Без орехов', 'Халяль'],
  en: ['Vegan', 'Gluten-free', 'Lactose-free', 'Nut-free', 'Halal']
};

function minDate() {
  const date = new Date();
  let days = 0;
  while (days < 3) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) days += 1;
  }
  return date.toISOString().slice(0, 10);
}

export function EnquiryForm({locale}: {locale: Locale}) {
  const t = useTranslations();
  const router = useRouter();
  const search = useSearchParams();
  const requestedType = search.get('type');
  const safeType = options.type[locale].some(([value]) => value === requestedType) ? requestedType as EnquiryInput['eventType'] : 'cake';
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [pending, startTransition] = useTransition();
  const {register, handleSubmit, trigger, formState: {errors}} = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {locale, eventType: safeType, dietary: [], message: '', company: '', website: '', consent: false}
  });

  const next = async () => {
    const valid = await trigger(['name', 'email', 'phone']);
    if (valid) setStep(2);
  };

  const submit = handleSubmit((data) => {
    setServerError(false);
    startTransition(async () => {
      const result = await submitEnquiry(data);
      if (!result.ok) return setServerError(true);
      setSent(true);
      window.setTimeout(() => router.push(routeHref(locale, 'thank-you')), 900);
    });
  });

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <div className="form-progress" aria-label={`${step}/2`}><span className={step >= 1 ? 'active' : ''}>01 · {t('formStepContact')}</span><span className={step >= 2 ? 'active' : ''}>02 · {t('formStepEvent')}</span><i style={{transform: `scaleX(${step / 2})`}} /></div>
      <input className="honeypot" tabIndex={-1} autoComplete="off" {...register('website')} />
      <input type="hidden" {...register('locale')} />
      <AnimatePresence mode="wait" initial={false}>
        {step === 1 ? (
          <motion.div className="form-step" key="contact" initial={{opacity: 0, x: -24}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 24}} transition={{duration: 0.4, ease: [0.65, 0, 0.35, 1]}}>
            <Field label={t('formName')} error={errors.name && t('formRequired')}><input autoComplete="name" {...register('name')} /></Field>
            <Field label={t('formCompany')}><input autoComplete="organization" {...register('company')} /></Field>
            <div className="field-pair">
              <Field label={t('formEmail')} error={errors.email && t('formInvalidEmail')}><input type="email" autoComplete="email" {...register('email')} /></Field>
              <Field label={t('formPhone')} error={errors.phone && t('formRequired')}><input type="tel" autoComplete="tel" {...register('phone')} /></Field>
            </div>
            <button type="button" className="form-next" onClick={next}>{t('formNext')}<ChevronRight /></button>
          </motion.div>
        ) : (
          <motion.div className="form-step" key="event" initial={{opacity: 0, x: 24}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -24}} transition={{duration: 0.4, ease: [0.65, 0, 0.35, 1]}}>
            <div className="field-pair">
              <Field label={t('formDate')} error={errors.eventDate && t('formRequired')}><input type="date" min={minDate()} {...register('eventDate')} /></Field>
              <Field label={t('formType')} error={errors.eventType && t('formRequired')}><select {...register('eventType')}>{options.type[locale].map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></Field>
            </div>
            <div className="field-pair">
              <Field label={t('formGuests')} error={errors.guests && t('formRequired')}><input type="number" min="1" inputMode="numeric" {...register('guests')} /></Field>
              <Field label={t('formBudget')} error={errors.budget && t('formRequired')}><select defaultValue="" {...register('budget')}><option value="" disabled>—</option>{options.budget[locale].map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></Field>
            </div>
            <Field label={t('formStyle')} error={errors.serviceStyle && t('formRequired')}><select defaultValue="" {...register('serviceStyle')}><option value="" disabled>—</option>{options.service[locale].map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></Field>
            <fieldset className="check-field"><legend>{t('formDietary')}</legend><div>{dietaryOptions.map((value, index) => <label key={value}><input type="checkbox" value={value} {...register('dietary')} /><span><Check size={14}/>{dietaryLabels[locale][index]}</span></label>)}</div></fieldset>
            <Field label={t('formMessage')}><textarea rows={4} {...register('message')} /></Field>
            <label className="consent"><input type="checkbox" {...register('consent')} /><span>{t('formConsent')}</span></label>
            {errors.consent && <p className="field-error">{t('formRequired')}</p>}
            {serverError && <p className="form-server-error">{t('formError')}</p>}
            <div className="form-buttons"><button type="button" onClick={() => setStep(1)}><ChevronLeft />{t('formBack')}</button><button className={sent ? 'is-sent' : ''} type="submit" disabled={pending || sent}>{sent ? <Check /> : pending ? <LoaderCircle className="spin" /> : null}{sent ? 'OK' : pending ? t('formSending') : t('formSubmit')}</button></div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({label, children, error}: {label: string; children: React.ReactNode; error?: string | false}) {
  return <label className="form-field"><span>{label}</span>{children}{error && <em>{error}</em>}</label>;
}
