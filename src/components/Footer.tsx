"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Sun, ArrowUp } from "lucide-react";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1E3A5F] text-white">
      {/* Newsletter Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F59E0B] rounded-lg flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t("newsletterTitle")}</h3>
                <p className="text-white/70 text-sm">{t("newsletterDesc")}</p>
              </div>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="flex-1 md:w-64 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#F59E0B] transition-colors"
              />
              <button className="px-6 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold rounded-lg transition-colors whitespace-nowrap">
                {t("subscribe")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#1E3A5F] font-bold text-xl">NAE</span>
              </div>
              <div>
                <span className="font-bold text-lg block">New Age Energy</span>
                <span className="text-[#F59E0B] text-xs font-medium">{t("tagline")}</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {t("brandDesc")}
            </p>
            <div className="flex items-center gap-2 text-[#F59E0B]">
              <Sun className="w-4 h-4" />
              <span className="text-sm font-medium">{t("solarReady")}</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t("products")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}#products`} className="text-white/70 hover:text-[#F59E0B] text-sm transition-colors">
                  {t("acsLine")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#products`} className="text-white/70 hover:text-[#F59E0B] text-sm transition-colors">
                  {t("climaLine")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#products`} className="text-white/70 hover:text-[#F59E0B] text-sm transition-colors">
                  {t("poolLine")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#products`} className="text-white/70 hover:text-[#F59E0B] text-sm transition-colors">
                  {t("commercialLine")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#products`} className="text-white/70 hover:text-[#F59E0B] text-sm transition-colors">
                  {t("accessories")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t("support")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}#calculator`} className="text-white/70 hover:text-[#F59E0B] text-sm transition-colors">
                  {t("calculator")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#area-tecnica`} className="text-white/70 hover:text-[#F59E0B] text-sm transition-colors">
                  {t("areaTecnica")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#why-nae`} className="text-white/70 hover:text-[#F59E0B] text-sm transition-colors">
                  {t("whyNAE")}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/login`} className="text-white/70 hover:text-[#F59E0B] text-sm transition-colors">
                  {t("distributorAccess")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">{t("contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                <div className="text-sm text-white/70">
                  <p className="font-medium text-white">{t("factory")}</p>
                  <p>Guangzhou SPRSUN New Energy</p>
                  <p>Technology Development Co., Ltd.</p>
                  <p className="text-white/50 mt-1">Building 2, No.15-1 Tangxi Road</p>
                  <p className="text-white/50">Xingtang Town, Zengcheng District</p>
                  <p className="text-white/50">Guangzhou, China 511338</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F59E0B] flex-shrink-0" />
                <a href="mailto:prosol.aguacaliente@gmail.com" className="text-sm text-white/70 hover:text-[#F59E0B] transition-colors">
                  prosol.aguacaliente@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F59E0B] flex-shrink-0" />
                <div className="text-sm text-white/70">
                  <p>+56 9 4584 7109</p>
                  <p>+56 9 4584 7124</p>
                  <p>+56 9 9011 7784</p>
                </div>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-white/50">{t("websites")}</p>
              <div className="flex flex-col gap-1 mt-1">
                <a href="https://www.prosolinversiones.cl" target="_blank" rel="noopener" className="text-sm text-[#F59E0B] hover:text-white transition-colors">
                  www.prosolinversiones.cl
                </a>
                <a href="https://www.senkosolar.cl" target="_blank" rel="noopener" className="text-sm text-[#F59E0B] hover:text-white transition-colors">
                  www.senkosolar.cl
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-white/50 text-sm text-center md:text-left">
              {t("copyright")}
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/50 hover:text-[#F59E0B] text-sm transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              {t("backToTop")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
