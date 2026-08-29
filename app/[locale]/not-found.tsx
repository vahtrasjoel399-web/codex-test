import Link from 'next/link';

export default function NotFound() {
  return <section className="not-found"><span>404 / BATCH MISSING</span><h1>See partii jäi ahjust välja.</h1><p>Lehte ei leitud. Pagarikoda töötab edasi.</p><Link href="/et">Tagasi avalehele</Link></section>;
}
