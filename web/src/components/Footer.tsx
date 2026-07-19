import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="w-full bg-[#1E3A5F] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image 
              src="/images/logo-nae.png" 
              alt="NAE Logo" 
              width={100} 
              height={35} 
              className="mb-4 h-8 w-auto brightness-0 invert"
            />
            <p className="text-sm text-white/70">New Age Energy</p>
            <p className="mt-2 text-sm text-white/70">Tecnología china de alta capacidad para Latinoamérica</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/catalogo" className="text-sm text-white/70 hover:text-white transition">{t('products')}</Link></li>
              <li><Link href="/calculadora" className="text-sm text-white/70 hover:text-white transition">{t('calculator')}</Link></li>
              <li><Link href="/por-que-nae" className="text-sm text-white/70 hover:text-white transition">{t('why')}</Link></li>
              <li><Link href="/area-tecnica" className="text-sm text-white/70 hover:text-white transition">{t('tech')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">Contacto</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:prosol.aguacaliente@gmail.com" className="hover:text-white transition">prosol.aguacaliente@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+56 9 4584 7109</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+56 9 4584 7124</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+56 9 9011 7784</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/90">Web</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="https://www.prosolinversiones.cl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  www.prosolinversiones.cl
                </a>
              </li>
              <li>
                <a href="https://www.senkosolar.cl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  www.senkosolar.cl
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-white/50">
                China<br />
                Guangzhou SPRSUN New Energy Technology<br />Development Co., Ltd
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          © {new Date().getFullYear()} NAE - New Age Energy. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
