import React, { useState } from 'react';
import { 
  Mail, 
  PhoneCall, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Radio, 
  ShieldCheck, 
  AlertTriangle,
  Clock,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Language, ProfileInfo, ContactMessage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_PROFILE } from '../data/initialData';

interface ContactSectionProps {
  lang: Language;
  profile?: ProfileInfo;
  onSubmitMessage: (msg: Omit<ContactMessage, 'id' | 'receivedAt' | 'notifiedToAdmin' | 'status'>) => Promise<{ success: boolean; message: string }>;
  onOpenEmergency: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  lang,
  profile: propProfile,
  onSubmitMessage,
  onOpenEmergency
}) => {
  const profile = propProfile && propProfile.name ? propProfile : INITIAL_PROFILE;
  const t = TRANSLATIONS[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'emergency'>('normal');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    try {
      const res = await onSubmitMessage({
        name,
        email,
        phone,
        urgency,
        subject: subject || (lang === 'bn' ? 'পোর্টফোলিও বার্তা' : 'General Portfolio Inquiry'),
        message,
        channelPreferred: 'Email & WhatsApp'
      });

      if (res.success) {
        setSentSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 border-t border-slate-900 bg-slate-950/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-3">
            <Mail className="h-3.5 w-3.5" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t.contact.title}
          </h2>
          <p className="mt-2 text-base text-slate-400">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
            
            {sentSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {t.contact.successTitle}
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  {t.contact.successDetail}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSentSuccess(false)}
                    className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-xs font-bold text-white transition cursor-pointer"
                  >
                    {lang === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone & Urgency Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.phone}
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder={t.contact.phonePlaceholder}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      {t.contact.urgencyLabel}
                    </label>
                    <select
                      value={urgency}
                      onChange={e => setUrgency(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="normal">{t.contact.urgencyNormal}</option>
                      <option value="urgent">{t.contact.urgencyUrgent}</option>
                      <option value="emergency">{t.contact.urgencyEmergency}</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.contact.subject}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder={t.contact.subjectPlaceholder}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.contact.message} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none resize-none"
                  />
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 transition cursor-pointer disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{submitting ? t.contact.sending : t.contact.sendBtn}</span>
                </button>

                {/* Direct notification guarantee */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>
                    {lang === 'bn' 
                      ? 'অটোমেটিক ইমেইল অ্যালার্ট যাবে: mhossenali740@gmail.com এ' 
                      : 'Real-time alert pushed to mhossenali740@gmail.com upon submission'}
                  </span>
                </div>

              </form>
            )}

          </div>

          {/* Direct Emergency Channels Sidebar */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/30 via-slate-900/60 to-slate-900 p-6 shadow-xl space-y-5">
              
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 emergency-pulse">
                  <PhoneCall className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t.contact.directChannels}
                  </h3>
                  <p className="text-xs text-red-300">
                    {lang === 'bn' ? 'জরুরি প্রয়োজনে ১ ক্লিকে যুক্ত হন' : '1-Tap Emergency Hotline'}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {/* Phone Hotline */}
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center justify-between rounded-xl bg-red-600 hover:bg-red-500 px-4 py-3 text-xs font-bold text-white transition shadow"
                >
                  <div className="flex items-center gap-3">
                    <PhoneCall className="h-4 w-4" />
                    <div>
                      <p>{lang === 'bn' ? 'সরাসরি কল (হটলাইন)' : 'Direct Call Hotline'}</p>
                      <p className="text-[11px] font-mono text-red-100">{profile.phone}</p>
                    </div>
                  </div>
                  <span className="bg-red-700 px-2 py-0.5 rounded text-[11px]">
                    {lang === 'bn' ? 'কল দিন' : 'Call'}
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/8801876357998?text=${encodeURIComponent(
                    lang === 'bn' ? 'হ্যালো মোঃ হোসেন আলী, আমি ওয়েবসাইট থেকে মেসেজ দিচ্ছি।' : 'Hello Md. Hossen Ali, reaching out via portfolio.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-3 text-xs font-bold text-white transition shadow"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4" />
                    <div>
                      <p>WhatsApp (হোয়াটসঅ্যাপ)</p>
                      <p className="text-[11px] font-mono text-emerald-100">+8801876357998</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-emerald-200" />
                </a>

                {/* Telegram */}
                <a
                  href={profile.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-sky-600 hover:bg-sky-500 px-4 py-3 text-xs font-bold text-white transition shadow"
                >
                  <div className="flex items-center gap-3">
                    <Send className="h-4 w-4" />
                    <div>
                      <p>Telegram (টেলিগ্রাম)</p>
                      <p className="text-[11px] font-mono text-sky-100">+8801876357998</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-sky-200" />
                </a>

                {/* Imo */}
                <button
                  onClick={onOpenEmergency}
                  className="w-full flex items-center justify-between rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-3 text-xs font-bold text-white transition shadow text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Radio className="h-4 w-4" />
                    <div>
                      <p>Imo (ইমু ভিডিও ও অডিও)</p>
                      <p className="text-[11px] font-mono text-blue-100">+8801876357998</p>
                    </div>
                  </div>
                  <span className="bg-blue-700 px-2 py-0.5 rounded text-[11px]">
                    {lang === 'bn' ? 'দেখুন' : 'Open'}
                  </span>
                </button>

                {/* Email Direct */}
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-900 px-4 py-3 text-xs font-semibold text-slate-200 transition"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-amber-400" />
                    <div>
                      <p>{lang === 'bn' ? 'এডমিন ইমেইল' : 'Admin Email'}</p>
                      <p className="text-[11px] font-mono text-slate-400">{profile.email}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-sky-400">mailto</span>
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'bn'
                    ? 'জরুরি মেসেজ পেলে সিস্টেম অবিলম্বে অ্যালার্ট জেনারেট করে।'
                    : 'System dispatches push alerts directly upon message arrival.'}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
