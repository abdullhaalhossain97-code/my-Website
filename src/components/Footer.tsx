import React from 'react';
import { 
  PhoneCall, 
  Mail, 
  Send, 
  MessageSquare, 
  Github, 
  Lock, 
  ShieldCheck, 
  Heart,
  Terminal,
  Activity
} from 'lucide-react';
import { Language, ProfileInfo } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_PROFILE } from '../data/initialData';

interface FooterProps {
  lang: Language;
  profile?: ProfileInfo;
  onOpenAdmin: () => void;
  onOpenEmergency: () => void;
  onOpenPayment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  profile: propProfile,
  onOpenAdmin,
  onOpenEmergency,
  onOpenPayment
}) => {
  const profile = propProfile && propProfile.name ? propProfile : INITIAL_PROFILE;
  const t = TRANSLATIONS[lang];

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400 py-12 text-left relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-900">
          
          {/* Brand & Identity Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 font-bold text-white text-sm shadow">
                HA
              </div>
              <span className="text-base font-extrabold text-white">
                {lang === 'bn' ? profile.nameBn : profile.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {lang === 'bn' ? profile.titleBn : profile.title} — {t.hero.tagline}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              <span>Database Sync Active & Verified</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {t.nav.projects} & Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition">
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition">
                  {t.nav.skills}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels & Access */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {lang === 'bn' ? 'জরুরি যোগাযোগ ও সার্ভিস' : 'Priority Channels & Service'}
            </h4>
            
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 text-slate-300">
                <PhoneCall className="h-3.5 w-3.5 text-red-400" />
                <span className="font-mono">{profile.phone}</span>
                <span className="text-[10px] bg-red-950/80 border border-red-800/40 text-red-300 px-1.5 py-0.5 rounded">
                  24/7 Hotline
                </span>
              </p>

              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="h-3.5 w-3.5 text-sky-400" />
                <span className="font-mono">{profile.email}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={onOpenEmergency}
                className="flex items-center gap-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600/30 px-2.5 py-1.5 text-xs font-bold transition cursor-pointer"
              >
                <PhoneCall className="h-3 w-3" />
                <span>{t.nav.emergency}</span>
              </button>

              <button
                onClick={onOpenPayment}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 px-2.5 py-1.5 text-xs font-bold transition cursor-pointer"
              >
                <ShieldCheck className="h-3 w-3" />
                <span>{lang === 'bn' ? 'পেমেন্ট গেটওয়ে' : 'Pay / Hire'}</span>
              </button>

              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white px-2.5 py-1.5 text-xs font-semibold transition cursor-pointer"
              >
                <Lock className="h-3 w-3" />
                <span>{t.nav.admin}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {profile.name || 'Md. Hossen Ali'}. {t.footer.rights}.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Admin Access: <span className="font-mono text-slate-400">mhossenali740@gmail.com</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
