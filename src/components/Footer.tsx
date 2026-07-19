import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="w-full border-t border-gray-200 bg-[#1E3A5F] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">NAE</h3>
            <p className="text-sm text-gray-300">New Age Energy</p>
            <p className="mt-2 text-sm text-gray-300">Energía que transforma, confort que perdura</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/catalogo" className="text-sm text-gray-300 hover:text-white">{t('products')}</Link></li>
              <li><Link href="/calculadora" className="text-sm text-gray-300 hover:text-white">{t('calculator')}</Link></li>
              <li><Link href="/por-que-nae" className="text-sm text-gray-300 hover:text-white">{t('why')}</Link></li>
              <li><Link href="/area-tecnica" className="text-sm text-gray-300 hover:text-white">{t('tech')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{t('contact')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>info@nae-energy.com</li>
              <li>WhatsApp: +86 xxx xxxx xxxx</li>
              <li>China Factory Address</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{t('newsletter')}</h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/30"
              />
              <button type="submit" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#1E3A5F] hover:bg-gray-100">
                {t('subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} New Age Energy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}