import React, { useState } from 'react';
import { 
  ArrowRight, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Shield,
  Code2,
  Terminal,
  Activity,
  Copy,
  Check,
  Camera,
  MapPin,
  Clock,
  Briefcase,
  ShieldCheck,
  Upload,
  UserCheck
} from 'lucide-react';
import { Language, ProfileInfo } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_PROFILE } from '../data/initialData';

interface HeroProps {
  lang: Language;
  profile?: ProfileInfo;
  onOpenEmergency: () => void;
  onOpenPayment: () => void;
  onOpenPhotoModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  profile: propProfile,
  onOpenEmergency,
  onOpenPayment,
  onOpenPhotoModal
}) => {
  const profile = propProfile && propProfile.name ? propProfile : INITIAL_PROFILE;
  const [copied, setCopied] = useState(false);
  const [rightTab, setRightTab] = useState<'profile' | 'code'>('profile');
  const t = TRANSLATIONS[lang];
  const photoT = t.profilePhoto;

  const avatarSrc = profile.avatarUrl || '/assets/hossen_ali_profile.jpg';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Availability Pill & Quick Photo Avatar Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.hero.availableBadge}</span>
              </div>

              {/* Quick photo change trigger */}
              <button
                type="button"
                onClick={onOpenPhotoModal}
                className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-950/40 hover:bg-sky-900/50 px-3 py-1 text-xs font-semibold text-sky-300 backdrop-blur-md transition cursor-pointer group"
                title={lang === 'bn' ? 'প্রোফাইল ছবি পরিবর্তন করুন' : 'Change Profile Picture'}
              >
                <div className="relative h-4 w-4 rounded-full overflow-hidden border border-sky-400/50">
                  <img src={avatarSrc} alt="avatar" className="h-full w-full object-cover" />
                </div>
                <Camera className="h-3 w-3 text-sky-400 group-hover:scale-110 transition" />
                <span>{lang === 'bn' ? 'ছবি যোগ / পরিবর্তন' : 'Edit Photo'}</span>
              </button>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-2">
              <p className="text-sm font-semibold tracking-wider text-sky-400 uppercase">
                {t.hero.greeting}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white flex items-center gap-3 flex-wrap">
                <span>{lang === 'bn' ? profile.nameBn : profile.name}</span>
                <span className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{lang === 'bn' ? 'ভেরিফাইড' : 'Verified'}</span>
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300 leading-relaxed">
                {lang === 'bn' ? profile.titleBn : profile.title}
              </p>
            </div>

            {/* Bio */}
            <p className="text-base text-slate-400 max-w-2xl leading-relaxed">
              {lang === 'bn' ? profile.bioBn : profile.bio}
            </p>

            {/* Emergency & Direct Communication Strip */}
            <div className="p-4 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-slate-900/60 to-slate-900/80 backdrop-blur-md shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                    {lang === 'bn' ? 'জরুরি যোগাযোগ হটলাইন (২৪/৭)' : '24/7 Priority Emergency Hotline'}
                  </span>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 px-2 py-1 rounded-lg transition"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : profile.phone}</span>
                </button>
              </div>

              {/* Direct clickable channels */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Direct Dial Call */}
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-3 py-2 text-xs font-bold text-white transition shadow-md shadow-red-700/20"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>{lang === 'bn' ? 'সরাসরি কল' : 'Direct Call'}</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/8801876357998?text=${encodeURIComponent(
                    lang === 'bn' 
                      ? 'হ্যালো মোঃ হোসেন আলী, আমি আপনার পোর্টফোলিও থেকে সরাসরি জরুরি বার্তা পাঠাচ্ছি।' 
                      : 'Hello Md. Hossen Ali, I am contacting you directly from your portfolio regarding an urgent project.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-xs font-bold text-white transition shadow-md shadow-emerald-700/20"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>

                {/* Telegram */}
                <a
                  href={profile.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-500 px-3 py-2 text-xs font-bold text-white transition shadow-md shadow-sky-700/20"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Telegram</span>
                </a>

                {/* Imo / Hotline */}
                <button
                  onClick={onOpenEmergency}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-3 py-2 text-xs font-bold text-white transition shadow-md shadow-blue-700/20"
                >
                  <Activity className="h-3.5 w-3.5" />
                  <span>Imo / Hotline</span>
                </button>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition cursor-pointer"
              >
                <span>{t.hero.ctaProjects}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={onOpenPayment}
                className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 px-5 py-3 text-sm font-bold text-emerald-300 transition cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>{lang === 'bn' ? 'পেমেন্ট ও হায়ার করুন' : 'Hire Me / Pay Milestone'}</span>
              </button>

              <a
                href="#contact"
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white transition"
              >
                <Mail className="h-4 w-4 text-sky-400" />
                <span>{t.hero.ctaContact}</span>
              </a>
            </div>

            {/* Key Verified Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {profile.experienceYears}+
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {t.hero.yearsExp}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-sky-400 font-mono">
                  {profile.completedProjects}+
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {t.hero.projectsDone}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                  99.9%
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {t.hero.uptimeRate}
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                  {profile.satisfiedClients}+
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {t.hero.clientSatisfaction}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Profile Portrait & Code Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden">
              
              {/* Window Header with Tabs */}
              <div className="flex items-center justify-between border-b border-slate-800/90 pb-3.5 mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>

                {/* View Switcher Tabs */}
                <div className="flex items-center rounded-xl bg-slate-950/80 p-1 border border-slate-800 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setRightTab('profile')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                      rightTab === 'profile'
                        ? 'bg-sky-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>{lang === 'bn' ? 'প্রোফাইল ছবি' : 'Portrait'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRightTab('code')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition ${
                      rightTab === 'code'
                        ? 'bg-sky-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    <span>ali-architect.ts</span>
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800/40">
                  <Activity className="h-3 w-3 animate-pulse" />
                  <span>Online</span>
                </div>
              </div>

              {/* TAB 1: PROFILE PORTRAIT VIEW */}
              {rightTab === 'profile' && (
                <div className="space-y-5">
                  {/* Portrait Visual Container */}
                  <div className="relative flex flex-col items-center text-center">
                    
                    {/* Glowing Aura */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 opacity-30 blur-xl pointer-events-none" />

                    {/* Image Circle Frame with Interactive Hover Camera Overlay */}
                    <div className="relative group cursor-pointer" onClick={onOpenPhotoModal}>
                      <div className="relative h-44 w-44 sm:h-48 sm:w-48 rounded-full overflow-hidden border-4 border-slate-800/90 bg-slate-950 shadow-2xl transition duration-300 group-hover:scale-[1.02] group-hover:border-sky-500">
                        <img
                          src={avatarSrc}
                          alt={profile.name}
                          className="h-full w-full object-cover object-top"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/hossen_ali_profile.jpg';
                          }}
                        />

                        {/* Hover Camera Overlay */}
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center gap-1 text-white">
                          <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center shadow-lg">
                            <Camera className="h-5 w-5" />
                          </div>
                          <span className="text-xs font-bold text-sky-200">
                            {lang === 'bn' ? 'ছবি পরিবর্তন করুন' : 'Change Photo'}
                          </span>
                        </div>
                      </div>

                      {/* Online Status Dot */}
                      <span className="absolute bottom-2 right-4 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-3 border-slate-900"></span>
                      </span>

                      {/* Always-visible Camera Edit Badge */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPhotoModal?.();
                        }}
                        className="absolute bottom-1 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 hover:bg-sky-500 text-white shadow-lg border-2 border-slate-900 transition hover:scale-110"
                        title={lang === 'bn' ? 'প্রোফাইল পিক পরিবর্তন করুন' : 'Change profile picture'}
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Name & Credentials */}
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {lang === 'bn' ? profile.nameBn : profile.name}
                        </h3>
                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      </div>
                      <p className="text-xs font-medium text-sky-400">
                        {lang === 'bn' ? profile.titleBn : profile.title}
                      </p>
                      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{lang === 'bn' ? profile.locationBn : profile.location}</span>
                      </div>
                    </div>

                    {/* Quick Button to Change Photo */}
                    <div className="mt-4 w-full flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={onOpenPhotoModal}
                        className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-bold text-sky-300 border border-slate-700 transition shadow hover:border-sky-500 cursor-pointer"
                      >
                        <Camera className="h-3.5 w-3.5 text-sky-400" />
                        <span>{lang === 'bn' ? 'প্রোফাইল ছবি পরিবর্তন / আপলোড' : 'Change / Upload Profile Photo'}</span>
                      </button>
                    </div>

                    {/* Verified Credentials Pills */}
                    <div className="mt-4 w-full grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-left">
                      <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-medium">
                          {lang === 'bn' ? 'কমিউনিকেশন' : 'Communication'}
                        </span>
                        <span className="text-xs font-bold text-emerald-300">
                          WhatsApp / Direct Call
                        </span>
                      </div>
                      <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-medium">
                          {lang === 'bn' ? 'ঘণ্টাভিত্তিক রেট' : 'Hourly Rate'}
                        </span>
                        <span className="text-xs font-bold text-sky-300">
                          ${profile.hourlyRateUsd}/hr (৳{profile.hourlyRateBdt})
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: CODE & ARCHITECTURE VIEW */}
              {rightTab === 'code' && (
                <div className="font-mono text-xs space-y-2 text-slate-300 leading-relaxed overflow-x-auto">
                  <p className="text-slate-500">// Lead Engineer Profile & Contacts</p>
                  <p>
                    <span className="text-indigo-400">const</span>{' '}
                    <span className="text-sky-300">architect</span> = &#123;
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">name:</span>{' '}
                    <span className="text-emerald-300">"{profile.name}"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">primaryEmail:</span>{' '}
                    <span className="text-amber-300">"{profile.email}"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">emergencyHotline:</span>{' '}
                    <span className="text-red-400">"{profile.phone}"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">avatarPhoto:</span>{' '}
                    <span className="text-sky-300">"{avatarSrc}"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">channels:</span> [
                    <span className="text-emerald-400">"WhatsApp"</span>,{' '}
                    <span className="text-sky-400">"Telegram"</span>,{' '}
                    <span className="text-blue-400">"Imo"</span>],
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">specialization:</span> [
                    <span className="text-sky-300">"Full-Stack"</span>,{' '}
                    <span className="text-indigo-300">"Cloud"</span>,{' '}
                    <span className="text-emerald-300">"Payment MFS"</span>],
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">hourlyRate:</span> &#123;{' '}
                    <span className="text-slate-400">usd:</span>{' '}
                    <span className="text-emerald-400">${profile.hourlyRateUsd}</span>,{' '}
                    <span className="text-slate-400">bdt:</span>{' '}
                    <span className="text-teal-400">৳{profile.hourlyRateBdt}</span> &#125;,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">databaseBackup:</span>{' '}
                    <span className="text-emerald-400">"Auto-Synced JSON"</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">offlinePWA:</span>{' '}
                    <span className="text-sky-400">true</span>
                  </p>
                  <p>&#125;;</p>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-indigo-400" />
                      <span>Admin: mhossenali740@gmail.com</span>
                    </div>
                    <span className="text-emerald-400 font-semibold font-mono">Status: Ready</span>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
