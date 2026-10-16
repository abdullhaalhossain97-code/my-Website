import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  CreditCard,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { ServicePackage, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ServicesSectionProps {
  services: ServicePackage[];
  lang: Language;
  onBookService: (service: ServicePackage) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  lang,
  onBookService
}) => {
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');
  const t = TRANSLATIONS[lang];

  return (
    <section id="services" className="py-16 sm:py-20 border-t border-slate-900 bg-slate-950/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.services.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {t.services.title}
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-2xl">
              {t.services.subtitle}
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 p-1 self-start md:self-auto">
            <span className="text-xs text-slate-400 px-2 font-medium">
              {t.services.currencyToggle}:
            </span>
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                currency === 'BDT'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ৳ BDT
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                currency === 'USD'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(service => {
            const name = lang === 'bn' ? service.nameBn : service.name;
            const description = lang === 'bn' ? service.descriptionBn : service.description;
            const deliveryTime = lang === 'bn' ? service.deliveryTimeBn : service.deliveryTime;
            const features = lang === 'bn' ? service.featuresBn : service.features;
            const price = currency === 'BDT' ? `৳${service.priceBdt.toLocaleString()}` : `$${service.priceUsd}`;

            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 transition duration-300 shadow-xl ${
                  service.popular
                    ? 'border-emerald-500/80 bg-gradient-to-b from-slate-900 via-slate-900/90 to-emerald-950/20 shadow-emerald-950/30'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                {/* Popular Ribbon */}
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-0.5 text-[11px] font-bold text-slate-950 shadow-md">
                      <Zap className="h-3 w-3 fill-slate-950" />
                      {lang === 'bn' ? 'সবচেয়ে জনপ্রিয়' : 'Most Popular'}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      {description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white font-mono">
                        {price}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {service.id === 'srv-1' ? '/hr' : '/project'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-sky-400 mt-2 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{deliveryTime}</span>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-2 pt-4 border-t border-slate-800/80">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {t.services.featuresHeading}
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Book Action Button */}
                <div className="pt-6 mt-6 border-t border-slate-800/60">
                  <button
                    onClick={() => onBookService(service)}
                    className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition cursor-pointer ${
                      service.popular
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-700/30'
                        : 'border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>{t.services.orderNow}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
