import React, { useState } from 'react';
import { 
  PhoneCall, 
  ShieldCheck, 
  Globe, 
  Menu, 
  X, 
  Download, 
  Sparkles, 
  Lock, 
  CreditCard,
  Layers,
  Wrench,
  Mail,
  Flame,
  Camera
} from 'lucide-react';
import { Language, ProfileInfo } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_PROFILE } from '../data/initialData';
import { usePWA } from '../hooks/usePWA';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenAdmin: () => void;
  onOpenEmergency: () => void;
  onOpenPayment?: () => void;
  onOpenPhotoModal?: () => void;
  profile?: ProfileInfo;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenAdmin,
  onOpenEmergency,
  onOpenPayment,
  onOpenPhotoModal,
  profile: propProfile
}) => {
  const profile = propProfile && propProfile.name ? propProfile : INITIAL_PROFILE;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isInstallable, install } = usePWA();
  const t = TRANSLATIONS[lang];
  const avatarSrc = profile.avatarUrl || '/assets/hossen_ali_profile.jpg';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Monogram / Avatar & Name */}
        <div className="flex items-center gap-3">
          <div 
            onClick={onOpenPhotoModal}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-500 p-[2px] shadow-lg shadow-indigo-500/20 hover:scale-105 transition duration-300 cursor-pointer group"
            title={lang === 'bn' ? 'প্রোফাইল ছবি পরিবর্তন করুন' : 'Change Profile Picture'}
          >
            <div className="relative h-full w-full rounded-[10px] bg-slate-950 overflow-hidden flex items-center justify-center">
              {avatarSrc ? (
                <img src={avatarSrc} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                <span className="font-mono text-base font-bold text-white tracking-wider">HA</span>
              )}

              {/* Hover camera badge */}
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-sky-400">
                <Camera className="h-4 w-4" />
              </div>
            </div>

            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <a href="#home" className="group">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-sky-400 transition">
                {lang === 'bn' ? profile.nameBn : profile.name}
              </span>
              <ShieldCheck className="h-4 w-4 text-emerald-400 inline" />
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {lang === 'bn' ? 'ফুল-স্ট্যাক সফটওয়্যার আর্কিটেক্ট' : 'Full-Stack Software Architect'}
            </p>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#projects" className="hover:text-white transition flex items-center gap-1.5 py-1">
            <Layers className="h-4 w-4 text-sky-400" />
            {t.nav.projects}
          </a>
          <a href="#skills" className="hover:text-white transition flex items-center gap-1.5 py-1">
            <Wrench className="h-4 w-4 text-emerald-400" />
            {t.nav.skills}
          </a>
          <a href="#services" className="hover:text-white transition flex items-center gap-1.5 py-1">
            <Sparkles className="h-4 w-4 text-amber-400" />
            {t.nav.services}
          </a>
          <a href="#contact" className="hover:text-white transition flex items-center gap-1.5 py-1">
            <Mail className="h-4 w-4 text-indigo-400" />
            {t.nav.contact}
          </a>
        </nav>

        {/* Desktop Actions & Emergency Button */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Emergency Direct Hotline Button */}
          <button
            id="emergency-hotline-nav-btn"
            onClick={onOpenEmergency}
            className="emergency-pulse flex items-center gap-2 rounded-xl bg-red-600/90 hover:bg-red-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/25 transition cursor-pointer border border-red-500/50"
            title="Emergency Hotline: +8801876357998"
          >
            <PhoneCall className="h-3.5 w-3.5 animate-bounce" />
            <span>{t.nav.emergency}</span>
            <span className="hidden xl:inline text-[11px] font-mono text-red-200">
              {profile.phone}
            </span>
          </button>

          {/* Hire Me / Payment Modal */}
          <button
            id="hire-me-nav-btn"
            onClick={() => onOpenPayment && onOpenPayment()}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-emerald-700/20 transition cursor-pointer"
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>{t.nav.hireMe}</span>
          </button>

          {/* Merchant / Admin Access Button */}
          <button
            id="admin-login-nav-btn"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white transition cursor-pointer"
            title="Admin access: mhossenali740@gmail.com"
          >
            <Lock className="h-3.5 w-3.5 text-indigo-400" />
            <span>{t.nav.admin}</span>
          </button>

          {/* Quick Photo Modal Button */}
          {onOpenPhotoModal && (
            <button
              onClick={onOpenPhotoModal}
              className="flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-950/40 hover:bg-sky-900/50 px-2.5 py-2 text-xs font-semibold text-sky-300 hover:text-white transition cursor-pointer"
              title={lang === 'bn' ? 'প্রোফাইল ছবি পরিবর্তন করুন' : 'Change Profile Photo'}
            >
              <Camera className="h-3.5 w-3.5 text-sky-400" />
              <span className="hidden md:inline">{lang === 'bn' ? 'ছবি' : 'Photo'}</span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            id="language-toggle-btn"
            onClick={onToggleLang}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 px-2.5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
            title="Switch Language"
          >
            <Globe className="h-3.5 w-3.5 text-sky-400" />
            <span>{t.nav.language}</span>
          </button>

          {/* PWA Install Button if eligible */}
          {isInstallable && (
            <button
              onClick={install}
              className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-2.5 py-2 text-xs font-medium text-white shadow transition cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{t.nav.installApp}</span>
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-bold text-white emergency-pulse"
          >
            <PhoneCall className="h-3 w-3" />
            <span>SOS</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-slate-900"
            >
              <Layers className="h-4 w-4 text-sky-400" />
              {t.nav.projects}
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-slate-900"
            >
              <Wrench className="h-4 w-4 text-emerald-400" />
              {t.nav.skills}
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-slate-900"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              {t.nav.services}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 hover:bg-slate-900"
            >
              <Mail className="h-4 w-4 text-indigo-400" />
              {t.nav.contact}
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white shadow"
            >
              <PhoneCall className="h-4 w-4" />
              <span>{t.nav.emergency} ({profile.phone})</span>
            </button>

            {onOpenPhotoModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPhotoModal();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-sky-950/50 px-4 py-2 text-xs font-semibold text-sky-300"
              >
                <Camera className="h-4 w-4" />
                <span>{lang === 'bn' ? 'প্রোফাইল ছবি পরিবর্তন করুন' : 'Change Profile Photo'}</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenPayment) onOpenPayment();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
            >
              <CreditCard className="h-4 w-4" />
              <span>{t.nav.hireMe} / পেমেন্ট করুন</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200"
              >
                <Lock className="h-3.5 w-3.5 text-indigo-400" />
                <span>{t.nav.admin}</span>
              </button>

              <button
                onClick={onToggleLang}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200"
              >
                <Globe className="h-3.5 w-3.5 text-sky-400" />
                <span>{t.nav.language}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
