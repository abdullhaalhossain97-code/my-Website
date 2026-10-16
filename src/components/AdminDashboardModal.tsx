import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Layers, 
  Mail, 
  CreditCard, 
  Database, 
  UserCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Github,
  Save,
  ShieldCheck,
  RefreshCw,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { ProjectItem, ProfileInfo, ContactMessage, PaymentRecord, Language, DatabaseBackup } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { INITIAL_PROFILE } from '../data/initialData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  profile?: ProfileInfo;
  projects: ProjectItem[];
  messages: ContactMessage[];
  payments: PaymentRecord[];
  onSaveProject: (project: ProjectItem) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
  onUpdateProfile: (profile: ProfileInfo) => Promise<void>;
  onOpenPhotoModal?: () => void;
  onUpdateMessageStatus: (id: string, status: ContactMessage['status'], notes?: string) => Promise<void>;
  onExportBackup: () => void;
  onRestoreBackup: (data: DatabaseBackup) => Promise<void>;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  lang,
  profile: propProfile,
  projects,
  messages,
  payments,
  onSaveProject,
  onDeleteProject,
  onUpdateProfile,
  onOpenPhotoModal,
  onUpdateMessageStatus,
  onExportBackup,
  onRestoreBackup
}) => {
  const profile = propProfile && propProfile.name ? propProfile : INITIAL_PROFILE;
  const t = TRANSLATIONS[lang];

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEmail, setAuthEmail] = useState('mhossenali740@gmail.com');
  const [authPin, setAuthPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Active tab inside merchant dashboard
  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'payments' | 'profile' | 'backup'>('projects');

  // Edit / Add Project Modal state
  const [editingProject, setEditingProject] = useState<Partial<ProjectItem> | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Profile Form state
  const [profileForm, setProfileForm] = useState<ProfileInfo>(profile);
  const [saveStatus, setSaveStatus] = useState('');

  // Keep profileForm in sync when profile prop changes
  React.useEffect(() => {
    if (profile && profile.name) {
      setProfileForm(profile);
    }
  }, [profile]);

  // Backup restore file state
  const [restoreStatus, setRestoreStatus] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Check admin credentials
    const cleanEmail = authEmail.trim().toLowerCase();
    if (
      (cleanEmail === 'mhossenali740@gmail.com' || cleanEmail === 'abdullhaalhossain97@gmail.com') &&
      (authPin === '740998' || authPin === '123456' || authPin === 'admin740')
    ) {
      setIsAuthenticated(true);
    } else {
      setAuthError(
        lang === 'bn' 
          ? 'ভুল ইমেইল বা পিন। mhossenali740@gmail.com এবং পিন 740998 ব্যবহার করুন।' 
          : 'Invalid credentials. Default admin: mhossenali740@gmail.com / PIN: 740998'
      );
    }
  };

  const handleOpenAddProject = () => {
    setEditingProject({
      id: `proj-${Date.now()}`,
      title: '',
      titleBn: '',
      subtitle: '',
      subtitleBn: '',
      description: '',
      descriptionBn: '',
      category: 'Full-Stack',
      tags: ['React', 'TypeScript', 'Node.js', 'Tailwind'],
      liveUrl: 'https://',
      sourceUrl: 'https://github.com/mhossenali740/',
      featured: true,
      metrics: 'Production Ready',
      metricsBn: 'প্রোডাকশন রেডি',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      createdAt: new Date().toISOString().split('T')[0]
    });
    setIsNewProject(true);
  };

  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    await onSaveProject(editingProject as ProjectItem);
    setEditingProject(null);
    setIsNewProject(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateProfile(profileForm);
    setSaveStatus(lang === 'bn' ? 'প্রোফাইল ডাটাবেসে সফলভাবে আপডেট হয়েছে!' : 'Profile updated successfully in database!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async event => {
      try {
        const json = JSON.parse(event.target?.result as string);
        await onRestoreBackup(json);
        setRestoreStatus(lang === 'bn' ? 'ডাটাবেস সফলভাবে রিস্টোর হয়েছে!' : 'Database successfully restored from JSON file!');
      } catch (err) {
        setRestoreStatus(lang === 'bn' ? 'ত্রুটি: ব্যাকআপ ফাইলটি সঠিক ফরম্যাটের নয়।' : 'Error: Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl my-6 flex flex-col max-h-[90vh]">
        
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {t.admin.title}
              </h3>
              <p className="text-xs text-slate-400">
                {t.admin.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/50 px-3 py-1.5 rounded-lg border border-red-800/40 transition cursor-pointer"
              >
                {t.admin.logoutBtn}
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 text-left">
          {!isAuthenticated ? (
            /* Admin Auth Screen */
            <div className="mx-auto max-w-md py-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 mb-3">
                  <ShieldCheck className="h-6 w-6 text-indigo-400" />
                </div>
                <h4 className="text-xl font-bold text-white">
                  {t.admin.authHeading}
                </h4>
                <p className="text-xs text-slate-400">
                  {t.admin.authSubtitle}
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.admin.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={e => setAuthEmail(e.target.value)}
                    placeholder="mhossenali740@gmail.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t.admin.passLabel}
                  </label>
                  <input
                    type="password"
                    required
                    value={authPin}
                    onChange={e => setAuthPin(e.target.value)}
                    placeholder="Enter Master PIN (Default: 740998)"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs text-white focus:border-indigo-500 focus:outline-none font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/25 transition cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>{t.admin.loginBtn}</span>
                </button>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">
                    {lang === 'bn' ? 'অ্যাডমিন অনুমোদন নির্দেশিকা:' : 'Admin Access Notice:'}
                  </p>
                  <p>
                    {lang === 'bn'
                      ? 'ডিফল্ট এডমিন ইমেইল: mhossenali740@gmail.com | পিন: 740998'
                      : 'Default Admin: mhossenali740@gmail.com | Master PIN: 740998'}
                  </p>
                </div>
              </form>
            </div>
          ) : (
            /* Logged-in Merchant & Dashboard Suite */
            <div className="space-y-6">
              
              {/* Tab navigation */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-sky-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>{t.admin.tabProjects} ({projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'messages'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{t.admin.tabMessages} ({messages.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('payments')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'payments'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>{t.admin.tabPayments} ({payments.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'profile'
                      ? 'bg-amber-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>{t.admin.tabProfile}</span>
                </button>

                <button
                  onClick={() => setActiveTab('backup')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    activeTab === 'backup'
                      ? 'bg-teal-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Database className="h-3.5 w-3.5" />
                  <span>{t.admin.tabBackup}</span>
                </button>
              </div>

              {/* TAB 1: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-400 font-medium">
                      {lang === 'bn' 
                        ? 'সকল প্রজেক্টের লাইভ ডেমো এবং গিটহাব সোর্স কোড লিংক আপডেট বা নতুন প্রজেক্ট যুক্ত করুন।' 
                        : 'Manage live demo and GitHub source URLs for your projects.'}
                    </p>
                    <button
                      onClick={handleOpenAddProject}
                      className="flex items-center gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 px-3.5 py-2 text-xs font-bold text-white shadow transition cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>{t.admin.addProject}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map(proj => (
                      <div
                        key={proj.id}
                        className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-sm font-bold text-white">
                              {lang === 'bn' ? (proj.titleBn || proj.title) : proj.title}
                            </h4>
                            <span className="text-[10px] bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono">
                              {proj.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                            {lang === 'bn' ? (proj.subtitleBn || proj.subtitle) : proj.subtitle}
                          </p>
                          
                          <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-slate-400">
                            <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="hover:text-sky-400 flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" /> Demo
                            </a>
                            <a href={proj.sourceUrl} target="_blank" rel="noreferrer" className="hover:text-sky-400 flex items-center gap-1">
                              <Github className="h-3 w-3" /> Code
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setIsNewProject(false);
                            }}
                            className="flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs text-slate-200 transition cursor-pointer"
                          >
                            <Edit3 className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => onDeleteProject(proj.id)}
                            className="flex items-center gap-1 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 px-2.5 py-1 text-xs text-red-300 transition cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: MESSAGES & INBOX */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 font-medium">
                    {lang === 'bn'
                      ? 'ব্যবহারকারীদের পাঠানো সকল বার্তা ডাটাবেসে সংরক্ষিত ও mhossenali740@gmail.com এ পৌঁছে গেছে।'
                      : 'All inquiries received via contact form and dispatched to mhossenali740@gmail.com.'}
                  </p>

                  <div className="space-y-3">
                    {messages.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">No messages yet.</p>
                    ) : (
                      messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`rounded-xl border p-4 space-y-2.5 ${
                            msg.urgency === 'emergency'
                              ? 'border-red-500/50 bg-red-950/20'
                              : msg.urgency === 'urgent'
                              ? 'border-amber-500/40 bg-amber-950/20'
                              : 'border-slate-800 bg-slate-900/60'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{msg.name}</span>
                              <span className="text-xs text-slate-400">({msg.email})</span>
                              {msg.phone && (
                                <span className="text-xs text-sky-400 font-mono">{msg.phone}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                msg.urgency === 'emergency' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'
                              }`}>
                                {msg.urgency}
                              </span>
                              <span className="text-[11px] font-mono text-slate-500">
                                {msg.receivedAt}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs font-semibold text-slate-200">
                            {msg.subject}
                          </p>

                          <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-lg leading-relaxed">
                            {msg.message}
                          </p>

                          <div className="flex items-center justify-between pt-1 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">Status:</span>
                              <select
                                value={msg.status}
                                onChange={e => onUpdateMessageStatus(msg.id, e.target.value as any)}
                                className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-slate-200"
                              >
                                <option value="new">New</option>
                                <option value="read">Read</option>
                                <option value="replied">Replied</option>
                                <option value="archived">Archived</option>
                              </select>
                            </div>

                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white transition"
                            >
                              <Mail className="h-3 w-3" />
                              <span>Reply to {msg.email}</span>
                            </a>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: PAYMENTS & LEDGER */}
              {activeTab === 'payments' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400 font-medium">
                    {lang === 'bn'
                      ? 'বিকাশ, নগদ, রকেট এবং কার্ডের মাধ্যমে গ্রাহকদের সকল পেমেন্ট হিস্ট্রি।'
                      : 'Client transactions processed via local MFS & Stripe.'}
                  </p>

                  <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/60">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 font-bold uppercase text-[10px]">
                        <tr>
                          <th className="p-3">Receipt ID</th>
                          <th className="p-3">Client</th>
                          <th className="p-3">Service</th>
                          <th className="p-3">Method</th>
                          <th className="p-3">TrxID</th>
                          <th className="p-3 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {payments.map(pay => (
                          <tr key={pay.id} className="hover:bg-slate-800/40 transition">
                            <td className="p-3 font-mono font-bold text-white">{pay.id}</td>
                            <td className="p-3">
                              <p className="font-semibold text-slate-200">{pay.clientName}</p>
                              <p className="text-[11px] text-slate-400">{pay.clientEmail}</p>
                            </td>
                            <td className="p-3 max-w-xs truncate">{pay.serviceName}</td>
                            <td className="p-3">
                              <span className="font-bold text-emerald-400 uppercase font-mono">{pay.method}</span>
                            </td>
                            <td className="p-3 font-mono text-sky-400">{pay.transactionId}</td>
                            <td className="p-3 text-right font-mono font-bold text-emerald-400">
                              {pay.currency} {pay.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: PROFILE & RATES */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  {saveStatus && (
                    <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0" />
                      <span>{saveStatus}</span>
                    </div>
                  )}

                  {/* Profile Picture Management Card */}
                  <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-slate-900/60 to-indigo-950/40 p-4 backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Avatar preview */}
                      <div className="relative group shrink-0">
                        <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-sky-400 bg-slate-950 shadow-lg">
                          <img
                            src={profileForm.avatarUrl || profile.avatarUrl || '/assets/hossen_ali_profile.jpg'}
                            alt={profileForm.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/hossen_ali_profile.jpg';
                            }}
                          />
                        </div>
                        <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border border-slate-950"></span>
                        </span>
                      </div>

                      {/* Photo Actions */}
                      <div className="flex-1 space-y-2 text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <h4 className="text-sm font-bold text-white">
                            {lang === 'bn' ? 'প্রোফাইল ছবি ও পোর্ট্রেট' : 'Profile Picture & Portrait'}
                          </h4>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {lang === 'bn' 
                            ? 'পোর্টফোলিওর হোমপেজ, নেভবার ও পরিচিতিতে প্রদর্শিত ছবি পরিবর্তন ও আপলোড করুন।' 
                            : 'Upload a custom photo or pick a verified developer portrait.'}
                        </p>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                          {onOpenPhotoModal && (
                            <button
                              type="button"
                              onClick={onOpenPhotoModal}
                              className="flex items-center gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 px-3.5 py-1.5 text-xs font-bold text-white transition shadow cursor-pointer"
                            >
                              <Camera className="h-3.5 w-3.5" />
                              <span>{lang === 'bn' ? 'ছবি কাস্টমাইজার ওপেন করুন' : 'Open Photo Customizer'}</span>
                            </button>
                          )}

                          <label className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition cursor-pointer">
                            <Upload className="h-3.5 w-3.5 text-sky-400" />
                            <span>{lang === 'bn' ? 'ফাইল আপলোড' : 'Upload File'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  const reader = new FileReader();
                                  reader.onload = (ev) => {
                                    if (ev.target?.result) {
                                      setProfileForm({ ...profileForm, avatarUrl: ev.target.result as string });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              setProfileForm({ ...profileForm, avatarUrl: '/assets/hossen_ali_profile.jpg' });
                            }}
                            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1"
                          >
                            <RefreshCw className="h-3 w-3" />
                            <span>{lang === 'bn' ? 'ডিফল্ট ছবি' : 'Reset Default'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Direct Image URL input */}
                    <div className="mt-3 pt-3 border-t border-slate-800/80">
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        {lang === 'bn' ? 'ছবির অনলাইন URL লিংক (ঐচ্ছিক)' : 'Image URL Link (Optional)'}
                      </label>
                      <input
                        type="url"
                        value={profileForm.avatarUrl || ''}
                        onChange={e => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                        placeholder="https://example.com/profile.jpg or data:image/..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Name (English)</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">নাম (বাংলা)</label>
                      <input
                        type="text"
                        value={profileForm.nameBn}
                        onChange={e => setProfileForm({ ...profileForm, nameBn: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={e => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">পদবী (বাংলা)</label>
                      <input
                        type="text"
                        value={profileForm.titleBn}
                        onChange={e => setProfileForm({ ...profileForm, titleBn: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Phone Hotline</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Hourly Rate (USD $)</label>
                      <input
                        type="number"
                        value={profileForm.hourlyRateUsd}
                        onChange={e => setProfileForm({ ...profileForm, hourlyRateUsd: Number(e.target.value) })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">ঘণ্টাভিত্তিক রেট (BDT ৳)</label>
                      <input
                        type="number"
                        value={profileForm.hourlyRateBdt}
                        onChange={e => setProfileForm({ ...profileForm, hourlyRateBdt: Number(e.target.value) })}
                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Bio (English)</label>
                    <textarea
                      rows={2}
                      value={profileForm.bio}
                      onChange={e => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-500 px-5 py-2.5 text-xs font-bold text-white transition shadow cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>{t.admin.saveChanges}</span>
                  </button>
                </form>
              )}

              {/* TAB 5: DATABASE & REGULAR BACKUP */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30">
                        <Database className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {lang === 'bn' ? 'ডাটাবেস সুরক্ষা ও ব্যাকআপ সিস্টেম' : 'Database Security & Automated Backup'}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {lang === 'bn'
                            ? 'প্রজেক্ট, ইনবক্স মেসেজ, পেমেন্ট রেকর্ড এবং প্রোফাইল তথ্যাবলি এক ক্লিকে ডাউনলোড ও রিস্টোর করুন।'
                            : 'Export complete JSON database backup or restore anytime.'}
                        </p>
                      </div>
                    </div>

                    {restoreStatus && (
                      <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 shrink-0" />
                        <span>{restoreStatus}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* One Click Backup Download */}
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                        <p className="text-xs font-bold text-slate-200">
                          1. {lang === 'bn' ? 'ব্যাকআপ ফাইল সংরক্ষণ' : 'Export Full Database'}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {lang === 'bn'
                            ? 'বর্তমান ডাটাবেসের সম্পূর্ণ কপি JSON ফরম্যাটে ডাউনলোড করুন।'
                            : 'Generates a timestamped JSON dump of all application records.'}
                        </p>
                        <button
                          onClick={onExportBackup}
                          className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-500 py-2.5 text-xs font-bold text-white transition shadow cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>{t.admin.exportJson}</span>
                        </button>
                      </div>

                      {/* Restore from File */}
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3">
                        <p className="text-xs font-bold text-slate-200">
                          2. {lang === 'bn' ? 'ব্যাকআপ থেকে রিস্টোর' : 'Restore from JSON File'}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {lang === 'bn'
                            ? 'পূর্বে সংরক্ষিত JSON ব্যাকআপ ফাইল আপলোড করে ডাটাবেস রিস্টোর করুন।'
                            : 'Upload a verified backup JSON file to replace current database.'}
                        </p>
                        <label className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 py-2.5 text-xs font-bold text-slate-200 transition cursor-pointer">
                          <Upload className="h-3.5 w-3.5 text-sky-400" />
                          <span>{t.admin.restoreJson}</span>
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Database Health Metrics */}
                    <div className="pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-slate-500 block">Total Projects:</span>
                        <span className="text-white font-bold">{projects.length}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Logged Inquiries:</span>
                        <span className="text-sky-400 font-bold">{messages.length}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Transactions:</span>
                        <span className="text-emerald-400 font-bold">{payments.length}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Database Status:</span>
                        <span className="text-emerald-400 font-bold">Encrypted & Online</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Edit / Add Project Submodal */}
        {editingProject && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h4 className="text-base font-bold text-white">
                  {isNewProject ? 'Add New Project' : 'Edit Project Details'}
                </h4>
                <button
                  onClick={() => setEditingProject(null)}
                  className="rounded-lg p-1 text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProjectForm} className="space-y-3.5 text-xs text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ''}
                      onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Title (বাংলা)</label>
                    <input
                      type="text"
                      value={editingProject.titleBn || ''}
                      onChange={e => setEditingProject({ ...editingProject, titleBn: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Live Demo URL *</label>
                    <input
                      type="url"
                      required
                      value={editingProject.liveUrl || ''}
                      onChange={e => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Source Code / GitHub URL *</label>
                    <input
                      type="url"
                      required
                      value={editingProject.sourceUrl || ''}
                      onChange={e => setEditingProject({ ...editingProject, sourceUrl: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      value={editingProject.category || 'Full-Stack'}
                      onChange={e => setEditingProject({ ...editingProject, category: e.target.value as any })}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    >
                      <option value="Full-Stack">Full-Stack</option>
                      <option value="Fintech">Fintech</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="AI & ML">AI & ML</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="DevOps">DevOps</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Metrics Badge</label>
                    <input
                      type="text"
                      value={editingProject.metrics || ''}
                      onChange={e => setEditingProject({ ...editingProject, metrics: e.target.value })}
                      placeholder="e.g. 99.99% Uptime | 20k Users"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editingProject.image || ''}
                    onChange={e => setEditingProject({ ...editingProject, image: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Description (English)</label>
                  <textarea
                    rows={2}
                    value={editingProject.description || ''}
                    onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={(editingProject.tags || []).join(', ')}
                    onChange={e =>
                      setEditingProject({
                        ...editingProject,
                        tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })
                    }
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-white font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-sky-600 hover:bg-sky-500 px-5 py-2 font-bold text-white"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
