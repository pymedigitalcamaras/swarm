"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/lib/products";
import {
  Sun,
  Zap,
  Thermometer,
  ArrowRight,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Calculator,
  Shield,
  Award,
  Globe,
  TrendingDown,
  Leaf,
  Brain,
  Users,
  Wrench,
} from "lucide-react";

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations("home");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [hasSolar, setHasSolar] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const stats = [
    { icon: Globe, value: "20+", label: t("yearsExperience") },
    { icon: Globe, value: "15+", label: t("countries") },
    { icon: Users, value: "500K+", label: t("installers") },
    { icon: Zap, value: "70-90%", label: t("energySavings") },
  ];

  const benefits = [
    { icon: TrendingDown, title: t("benefit1Title"), desc: t("benefit1Desc") },
    { icon: Leaf, title: t("benefit2Title"), desc: t("benefit2Desc") },
    { icon: Shield, title: t("benefit3Title"), desc: t("benefit3Desc") },
    { icon: Award, title: t("benefit4Title"), desc: t("benefit4Desc") },
  ];

  const solarBenefits = [
    { icon: Zap, title: t("solarBenefit1Title"), desc: t("solarBenefit1Desc") },
    { icon: Sun, title: t("solarBenefit2Title"), desc: t("solarBenefit2Desc") },
    { icon: TrendingDown, title: t("solarBenefit3Title"), desc: t("solarBenefit3Desc") },
  ];

  const tools = [
    { icon: Calculator, title: t("tool1Title"), desc: t("tool1Desc") },
    { icon: Brain, title: t("tool2Title"), desc: t("tool2Desc") },
    { icon: Users, title: t("tool3Title"), desc: t("tool3Desc") },
    { icon: Wrench, title: t("tool4Title"), desc: t("tool4Desc") },
  ];

  const comparisonSystems = [
    { name: t("gasSystem"), cost: "$$$$", efficiency: "60-80%", solar: "❌", color: "bg-red-50 border-red-200" },
    { name: t("electricSystem"), cost: "$$$", efficiency: "95-100%", solar: "⚠️", color: "bg-yellow-50 border-yellow-200" },
    { name: t("naeSolarSystem"), cost: "$$", efficiency: "300-400%", solar: "✅", color: "bg-green-50 border-green-200" },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-sunset.jpg" alt="NAE Heat Pump" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 via-[#1E3A5F]/80 to-[#1E3A5F]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-[#F59E0B] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sun className="w-4 h-4" />
                <span>{t("solarBadge")}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-shadow-hero">
                {t("heroTitle")}
              </h1>

              <p className="text-lg sm:text-xl text-white/80 mb-4 leading-relaxed">
                {t("heroSubtitle")}
              </p>

              <p className="text-base text-white/60 mb-8 leading-relaxed">
                {t("heroDescription")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold px-8 py-6 text-lg rounded-xl transition-all hover:scale-105 animate-pulse-glow">
                  <Link href={`/${locale}#calculator`}>
                    {t("ctaPrimary")}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg rounded-xl transition-all">
                  <Link href={`/${locale}#products`}>{t("ctaSecondary")}</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                    <stat.icon className="w-6 h-6 text-[#F59E0B] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#F59E0B]/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                  <Image src="/products/5P.jpg" alt="NAE Heat Pump 5P" width={500} height={400} className="rounded-2xl object-contain" />
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-lg">OBT-050-DKFXRS</p>
                      <p className="text-white/60 text-sm">17,8 kW | 5.000 L/dia</p>
                    </div>
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      <Sun className="w-5 h-5" />
                      <span className="text-sm font-medium">Solar Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* SOLAR SECTION */}
      <section id="solar" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 bg-[#F59E0B]/10 text-[#F59E0B] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sun className="w-4 h-4" />
                <span>{t("solarSectionBadge")}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">{t("solarTitle")}</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{t("solarDescription")}</p>
              <p className="text-base text-gray-500 mb-8 leading-relaxed">{t("solarDescription2")}</p>

              <div className="space-y-4">
                {solarBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#1E3A5F]/5 hover:bg-[#1E3A5F]/10 transition-colors">
                    <div className="w-10 h-10 bg-[#1E3A5F] rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E3A5F] mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#1E3A5F]/10 to-[#F59E0B]/10 rounded-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/images/solar-house.jpg" alt="Solar + Heat Pump" width={600} height={500} className="w-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1E3A5F] to-transparent p-6">
                  <div className="flex items-center gap-2 text-[#F59E0B] mb-2">
                    <Sun className="w-5 h-5" />
                    <span className="font-bold">{t("solarImageBadge")}</span>
                  </div>
                  <p className="text-white text-sm">{t("solarImageCaption")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY NAE */}
      <section id="why-nae" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">{t("whyTitle")}</h2>
            <div className="section-divider mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("whySubtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="reveal bg-white rounded-2xl p-6 shadow-lg hover-lift border border-gray-100" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 bg-[#1E3A5F] rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[#1E3A5F] text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 reveal">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-[#1E3A5F] text-center mb-8">{t("comparisonTitle")}</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {comparisonSystems.map((system, i) => (
                  <div key={i} className={`rounded-xl p-6 border-2 ${system.color}`}>
                    <h4 className="font-bold text-lg mb-4">{system.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-600">{t("costLabel")}</span><span className="font-semibold">{system.cost}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">{t("efficiencyLabel")}</span><span className="font-semibold">{system.efficiency}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">{t("solarLabel")}</span><span className="font-semibold">{system.solar}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">{t("productsTitle")}</h2>
            <div className="section-divider mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("productsSubtitle")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12 reveal">
            <button onClick={() => setActiveCategory("all")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === "all" ? "bg-[#1E3A5F] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {t("allProducts")}
            </button>
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id ? "bg-[#1E3A5F] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {locale === "en" ? cat.labelEn : cat.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <div key={product.id} className="reveal bg-white rounded-2xl border border-gray-100 shadow-md hover-lift overflow-hidden group" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="relative h-48 bg-gray-50 overflow-hidden">
                  <Image src={product.image} alt={locale === "en" ? product.nameEn : product.name} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                  {product.solarCompatible && (
                    <div className="absolute top-3 right-3 bg-[#F59E0B] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Sun className="w-3 h-3" /><span>Solar</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs text-[#1E3A5F]/70 font-medium mb-1">
                    {locale === "en" ? categories.find(c => c.id === product.category)?.labelEn : categories.find(c => c.id === product.category)?.label}
                  </div>
                  <h3 className="font-bold text-[#1E3A5F] text-sm mb-2 line-clamp-2">{locale === "en" ? product.nameEn : product.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{product.power} kW</span>
                    <span className="flex items-center gap-1"><Thermometer className="w-3 h-3" />{product.temperature}°C</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">{product.capacity}</p>
                  <Button onClick={() => setSelectedProduct(product)} className="w-full bg-[#1E3A5F] hover:bg-[#142840] text-white text-sm">{t("viewDetails")}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-[#1E3A5F] to-[#2A4F7C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t("calculatorTitle")}</h2>
            <p className="text-lg text-white/70">{t("calculatorSubtitle")}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 reveal">
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("calcM2Label")}</label>
                <input type="number" placeholder="ej: 150" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("calcLitersLabel")}</label>
                <input type="number" placeholder="ej: 5000" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("calcTypeLabel")}</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all bg-white">
                  <option>{t("typeHouse")}</option>
                  <option>{t("typeApartment")}</option>
                  <option>{t("typeBuilding")}</option>
                  <option>{t("typeCommercial")}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t("calcCountryLabel")}</label>
                <input type="text" placeholder="ej: Chile" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all" />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#F59E0B]/10 rounded-xl mb-6 border border-[#F59E0B]/20">
              <input type="checkbox" id="solar" checked={hasSolar} onChange={(e) => setHasSolar(e.target.checked)} className="w-5 h-5 text-[#F59E0B] rounded focus:ring-[#F59E0B]" />
              <label htmlFor="solar" className="flex items-center gap-2 text-sm font-medium text-[#1E3A5F]">
                <Sun className="w-4 h-4 text-[#F59E0B]" />
                {t("calcSolarLabel")}
              </label>
            </div>

            {hasSolar && (
              <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200 animate-fade-in">
                <div className="flex items-center gap-2 text-green-700 font-medium mb-1">
                  <Sun className="w-5 h-5" />
                  <span>{t("solarSavingsTitle")}</span>
                </div>
                <p className="text-sm text-green-600">{t("solarSavingsDesc")}</p>
              </div>
            )}

            <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold py-4 text-lg rounded-xl transition-all hover:scale-[1.02]">
              <Calculator className="w-5 h-5 mr-2" />
              {t("calcButton")}
            </Button>
          </div>
        </div>
      </section>

      {/* AREA TECNICA */}
      <section id="area-tecnica" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">{t("areaTitle")}</h2>
            <div className="section-divider mb-4" />
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("areaSubtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, i) => (
              <div key={i} className="reveal bg-white rounded-2xl p-6 shadow-lg hover-lift border border-gray-100 text-center" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 bg-[#1E3A5F] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#1E3A5F] text-lg mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center reveal">
            <div className="bg-[#1E3A5F] rounded-2xl p-8 text-white max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">{t("areaCTATitle")}</h3>
              <p className="text-white/80 mb-6">{t("areaCTADesc")}</p>
              <Button asChild className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold px-8 py-4 text-lg rounded-xl">
                <Link href={`/${locale}/register`}>
                  {t("areaCTAButton")}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="reveal">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3A5F] mb-4">{t("contactTitle")}</h2>
              <p className="text-lg text-gray-600 mb-8">{t("contactSubtitle")}</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#1E3A5F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E3A5F] mb-1">{t("factoryAddress")}</h3>
                    <p className="text-gray-600 text-sm">Guangzhou SPRSUN New Energy Technology Development Co., Ltd.</p>
                    <p className="text-gray-500 text-sm">Building 2, No.15-1 Tangxi Road, Xingtang Town, Zengcheng District, Guangzhou, China 511338</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#1E3A5F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E3A5F] mb-1">{t("phoneLabel")}</h3>
                    <p className="text-gray-600 text-sm">+56 9 4584 7109</p>
                    <p className="text-gray-600 text-sm">+56 9 4584 7124</p>
                    <p className="text-gray-600 text-sm">+56 9 9011 7784</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#1E3A5F]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1E3A5F] mb-1">{t("emailLabel")}</h3>
                    <a href="mailto:prosol.aguacaliente@gmail.com" className="text-gray-600 text-sm hover:text-[#1E3A5F]">prosol.aguacaliente@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal">
              <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-6">{t("formTitle")}</h3>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" placeholder={t("formName")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all" />
                    <input type="text" placeholder={t("formCompany")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="email" placeholder={t("formEmail")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all" />
                    <input type="tel" placeholder={t("formPhone")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all" />
                  </div>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all bg-white">
                    <option>{t("formCountry")}</option>
                    <option>Chile</option>
                    <option>Mexico</option>
                    <option>Argentina</option>
                    <option>Colombia</option>
                    <option>Peru</option>
                    <option>Brasil</option>
                    <option>Otro</option>
                  </select>
                  <textarea rows={4} placeholder={t("formMessage")} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all resize-none" />
                  <Button className="w-full bg-[#1E3A5F] hover:bg-[#142840] text-white font-bold py-3 rounded-xl">{t("formSubmit")}</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64 bg-gray-50">
              <Image src={selectedProduct.image} alt={locale === "en" ? selectedProduct.nameEn : selectedProduct.name} fill className="object-contain p-6" />
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors">✕</button>
              {selectedProduct.solarCompatible && (
                <div className="absolute top-4 left-4 bg-[#F59E0B] text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Sun className="w-4 h-4" /><span>Solar Ready</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="text-sm text-[#1E3A5F]/70 font-medium mb-1">{selectedProduct.model}</div>
              <h2 className="text-2xl font-bold text-[#1E3A5F] mb-2">{locale === "en" ? selectedProduct.nameEn : selectedProduct.name}</h2>
              <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">{t("modalPower")}</div><div className="font-bold text-[#1E3A5F]">{selectedProduct.power} kW</div></div>
                <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">{t("modalTemp")}</div><div className="font-bold text-[#1E3A5F]">{selectedProduct.temperature}°C</div></div>
                <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">{t("modalFlow")}</div><div className="font-bold text-[#1E3A5F]">{selectedProduct.flowRate} {selectedProduct.category === "pool" ? "m3/h" : "L/h"}</div></div>
                <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">{t("modalVoltage")}</div><div className="font-bold text-[#1E3A5F]">{selectedProduct.voltage}</div></div>
                <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">{t("modalRefrigerant")}</div><div className="font-bold text-[#1E3A5F]">{selectedProduct.refrigerant}</div></div>
                <div className="bg-gray-50 rounded-lg p-3"><div className="text-xs text-gray-500">{t("modalWeight")}</div><div className="font-bold text-[#1E3A5F]">{selectedProduct.weight} kg</div></div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-[#1E3A5F] mb-2">{t("modalApplications")}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.applications.map((app, i) => (
                    <span key={i} className="bg-[#1E3A5F]/10 text-[#1E3A5F] text-xs font-medium px-3 py-1 rounded-full">{app}</span>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold py-3 rounded-xl">{t("modalQuote")}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
