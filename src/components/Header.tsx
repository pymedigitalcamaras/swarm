import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import {useLocale} from 'next-intl';

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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#1E3A5F]">NAE</span>
          <span className="hidden text-sm font-medium text-gray-600 sm:inline">New Age Energy</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/catalogo" className="text-sm font-medium text-gray-700 hover:text-[#1E3A5F]">
            {t('products')}
          </Link>
          <Link href="/calculadora" className="text-sm font-medium text-gray-700 hover:text-[#1E3A5F]">
            {t('calculator')}
          </Link>
          <Link href="/por-que-nae" className="text-sm font-medium text-gray-700 hover:text-[#1E3A5F]">
            {t('why')}
          </Link>
          <Link href="/area-tecnica" className="text-sm font-medium text-gray-700 hover:text-[#1E3A5F]">
            {t('tech')}
          </Link>
          <Link href="/contacto" className="text-sm font-medium text-gray-700 hover:text-[#1E3A5F]">
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
                className={`rounded px-2 py-1 ${locale === l.code ? 'bg-[#1E3A5F] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <a
            href="/app/login"
            className="rounded-lg bg-[#1E3A5F] px-4 py-2 text-sm font-medium text-white hover:bg-[#152d4a]"
          >
            {t('login')}
          </a>
        </div>
      </div>
    </header>
  );
}