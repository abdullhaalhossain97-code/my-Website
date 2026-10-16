import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  MessageSquare, 
  Send, 
  Mail, 
  Copy, 
  Check, 
  ShieldAlert, 
  Clock, 
  Radio,
  ExternalLink
} from 'lucide-react';
import { Language, ProfileInfo } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_PROFILE } from '../data/initialData';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  profile?: ProfileInfo;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  lang,
  profile: propProfile
}) => {
  const profile = propProfile && propProfile.name ? propProfile : INITIAL_PROFILE;
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl border-2 border-red-500/60 bg-slate-950 p-6 sm:p-8 shadow-2xl shadow-red-950/50">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:text-white hover:bg-slate-900 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header with SOS indicator */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/20 text-red-400 border border-red-500/40 emergency-pulse">
            <PhoneCall className="h-6 w-6 text-red-500 animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400">
              <Radio className="h-3.5 w-3.5" />
              <span>{t.emergency.badge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t.emergency.bannerTitle}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          {t.emergency.bannerSubtitle}
        </p>

        {/* Primary Phone Display & Copy */}
        <div className="flex items-center justify-between rounded-xl border border-red-500/30 bg-red-950/30 p-3.5 mb-6">
          <div>
            <p className="text-[11px] font-semibold text-red-300 uppercase tracking-wider">
              {lang === 'bn' ? 'সরাসরি জরুরি ফোন নম্বর' : 'Priority Emergency Hotline'}
            </p>
            <p className="text-lg sm:text-xl font-bold font-mono text-white tracking-wide">
              {profile.phone}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-500 px-3 py-2 text-xs font-bold text-white transition shadow"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied!') : (lang === 'bn' ? 'কপি করুন' : 'Copy')}</span>
          </button>
        </div>

        {/* Quick Action Channels Grid */}
        <div className="space-y-3">
          {/* Direct Phone Dial */}
          <a
            href={`tel:${profile.phone}`}
            className="flex items-center justify-between rounded-xl bg-red-600 hover:bg-red-500 p-3.5 text-sm font-bold text-white shadow-lg shadow-red-700/30 transition group"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="h-5 w-5" />
              <div>
                <p>{t.emergency.directCall}</p>
                <p className="text-[11px] text-red-200 font-normal">
                  {lang === 'bn' ? 'সরাসরি মোবাইল নেটওয়ার্কে কল করুন' : 'Instant mobile network phone call'}
                </p>
              </div>
            </div>
            <span className="text-xs bg-red-700 px-2.5 py-1 rounded-lg">
              {t.emergency.callAction}
            </span>
          </a>

          {/* WhatsApp Direct Chat */}
          <a
            href={`https://wa.me/8801876357998?text=${encodeURIComponent(
              lang === 'bn' 
                ? 'হ্যালো মোঃ হোসেন আলী, আমি জরুরি কারণে আপনার সাথে হোয়াটসঅ্যাপে যোগাযোগ করছি।' 
                : 'Hello Md. Hossen Ali, I have an urgent high-priority project / server matter.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-emerald-700/80 hover:bg-emerald-600 p-3.5 text-sm font-bold text-white transition group border border-emerald-600/40"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-emerald-300" />
              <div>
                <p>{t.emergency.whatsappTitle}</p>
                <p className="text-[11px] text-emerald-200 font-normal">
                  +8801876357998
                </p>
              </div>
            </div>
            <span className="text-xs bg-emerald-800 px-2.5 py-1 rounded-lg">
              {t.emergency.whatsappAction}
            </span>
          </a>

          {/* Telegram Direct */}
          <a
            href={profile.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-sky-700/80 hover:bg-sky-600 p-3.5 text-sm font-bold text-white transition group border border-sky-600/40"
          >
            <div className="flex items-center gap-3">
              <Send className="h-5 w-5 text-sky-300" />
              <div>
                <p>{t.emergency.telegramTitle}</p>
                <p className="text-[11px] text-sky-200 font-normal">
                  @mhossenali740 / +8801876357998
                </p>
              </div>
            </div>
            <span className="text-xs bg-sky-800 px-2.5 py-1 rounded-lg">
              {t.emergency.telegramAction}
            </span>
          </a>

          {/* Imo / Hotline */}
          <a
            href={`tel:${profile.phone}`}
            className="flex items-center justify-between rounded-xl bg-blue-700/80 hover:bg-blue-600 p-3.5 text-sm font-bold text-white transition group border border-blue-600/40"
          >
            <div className="flex items-center gap-3">
              <Radio className="h-5 w-5 text-blue-300" />
              <div>
                <p>{t.emergency.imoTitle}</p>
                <p className="text-[11px] text-blue-200 font-normal">
                  {lang === 'bn' ? 'ইমু অ্যাপে সার্চ করুন: +৮৮০১৮৭৬৩৫৭৯৯৮' : 'Search in Imo app: +8801876357998'}
                </p>
              </div>
            </div>
            <span className="text-xs bg-blue-800 px-2.5 py-1 rounded-lg">
              {t.emergency.imoAction}
            </span>
          </a>

          {/* Email to mhossenali740@gmail.com */}
          <a
            href={`mailto:${profile.email}?subject=${encodeURIComponent('[EMERGENCY PRIORITY] Critical Server/Project Alert')}`}
            className="flex items-center justify-between rounded-xl bg-slate-800/80 hover:bg-slate-800 p-3.5 text-sm font-bold text-white transition group border border-slate-700"
          >
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-amber-400" />
              <div>
                <p>{t.emergency.emailTitle}</p>
                <p className="text-[11px] text-slate-300 font-mono">
                  {profile.email}
                </p>
              </div>
            </div>
            <span className="text-xs bg-slate-700 px-2.5 py-1 rounded-lg">
              {lang === 'bn' ? 'মেইল পাঠান' : 'Send Mail'}
            </span>
          </a>
        </div>

        {/* Footer response guarantee */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Clock className="h-4 w-4 text-emerald-400" />
          <span>{lang === 'bn' ? 'জরুরি কলে গড় রেসপন্স টাইম: ৩-৫ মিনিট' : 'Guaranteed average incident response: 3-5 mins'}</span>
        </div>

      </div>
    </div>
  );
};
