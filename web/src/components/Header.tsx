'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {useLocale} from 'next-intl';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();

  const locales = [
    {code: 'es', label: 'ES'},
    {code: 'en', label: 'EN'},
    {code: 'pt', label: 'PT'},
    {code: 'zh', label: '中文'}
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1E3A5F] shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/images/logo-nae.png" 
            alt="NAE Logo" 
            width={120} 
            height={40} 
            className="h-10 w-auto"
            priority
          />
          <span className="hidden text-sm font-medium text-white/80 sm:inline">
            New Age Energy
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/catalogo" className="text-sm font-medium text-white/90 hover:text-white transition">
            {t('products')}
          </Link>
          <Link href="/calculadora" className="text-sm font-medium text-white/90 hover:text-white transition">
            {t('calculator')}
          </Link>
          <Link href="/por-que-nae" className="text-sm font-medium text-white/90 hover:text-white transition">
            {t('why')}
          </Link>
          <Link href="/area-tecnica" className="text-sm font-medium text-white/90 hover:text-white transition">
            {t('tech')}
          </Link>
          <Link href="/contacto" className="text-sm font-medium text-white/90 hover:text-white transition">
            {t('contact')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            {locales.map((l) => (
              <Link
                key={l.code}
                href="/"
                locale={l.code}
                className={`rounded px-2 py-1 transition ${locale === l.code ? 'bg-white text-[#1E3A5F] font-bold' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <a
            href="/app/login"
            className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#1E3A5F] hover:bg-gray-100 transition"
          >
            {t('login')}
          </a>
        </div>
      </div>
    </header>
  );
}
