"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const locales = [
  { code: "es", label: "ES", name: "Español" },
  { code: "en", label: "EN", name: "English" },
  { code: "pt", label: "PT", name: "Português" },
  { code: "zh", label: "中文", name: "简体中文" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("header");
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const navLinks = [
    { href: `/${locale}#products`, label: t("products") },
    { href: `/${locale}#calculator`, label: t("calculator") },
    { href: `/${locale}#why-nae`, label: t("whyNAE") },
    { href: `/${locale}#area-tecnica`, label: t("areaTecnica") },
    { href: `/${locale}#contact`, label: t("contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E3A5F] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
              <span className="text-[#1E3A5F] font-bold text-lg lg:text-xl">NAE</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg lg:text-xl tracking-tight">New Age Energy</span>
              <span className="block text-[#F59E0B] text-xs font-medium -mt-1">{t("tagline")}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-white/80 hover:text-white px-2 py-2 rounded-md hover:bg-white/10 transition-colors text-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{locale.toUpperCase()}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        switchLocale(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                        locale === l.code ? "text-[#1E3A5F] font-semibold bg-gray-50" : "text-gray-700"
                      }`}
                    >
                      <span className="font-medium">{l.label}</span>
                      <span className="text-gray-400">{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login Button */}
            <Button
              asChild
              className="hidden sm:inline-flex bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Link href={`/${locale}/login`}>{t("login")}</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1E3A5F] border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white/80 hover:text-white px-3 py-3 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 mt-4">
              <Button
                asChild
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold"
              >
                <Link href={`/${locale}/login`} onClick={() => setMobileMenuOpen(false)}>
                  {t("login")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
