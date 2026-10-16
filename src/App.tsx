import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, WifiOff, ArrowUp, Sparkles } from 'lucide-react';
import { usePortfolioData } from './hooks/usePortfolioData';
import { usePWA, useOnlineStatus } from './hooks/usePWA';
import { Language, ProjectItem, ServicePackage } from './types';
import { INITIAL_PROFILE } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';
import { PaymentModal } from './components/PaymentModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { ProfilePhotoModal } from './components/ProfilePhotoModal';

export default function App() {
  const [lang, setLang] = useState<Language>('bn'); // Bengali default as requested by user prompt
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);

  const isOnline = useOnlineStatus();
  const { isInstallable, install } = usePWA();

  const {
    profile,
    projects,
    services,
    messages,
    payments,
    saveProject,
    deleteProject,
    updateProfile,
    updateAvatar,
    submitMessage,
    submitPayment,
    updateMessageStatus,
    exportDatabaseJson,
    restoreDatabaseJson
  } = usePortfolioData();

  const safeProfile = profile && profile.name ? profile : INITIAL_PROFILE;

  const handleBookService = (service: ServicePackage) => {
    setSelectedService(service);
    setIsPaymentOpen(true);
  };

  const handleOpenGeneralPayment = () => {
    setSelectedService(null);
    setIsPaymentOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white">
      
      {/* Offline Status Bar */}
      {!isOnline && (
        <div className="bg-amber-600 px-4 py-2 text-center text-xs font-semibold text-white flex items-center justify-center gap-2 sticky top-0 z-50">
          <WifiOff className="h-4 w-4" />
          <span>
            {lang === 'bn' 
              ? 'আপনি বর্তমানে অফলাইনে আছেন। সাইটের অফলাইন মোড ও লোকাল ক্যাশ সক্রিয় রয়েছে।' 
              : 'You are currently offline. Full offline PWA caching is active.'}
          </span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        lang={lang}
        profile={safeProfile}
        onOpenPayment={handleOpenGeneralPayment}
        onToggleLang={() => setLang(prev => (prev === 'en' ? 'bn' : 'en'))}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero & Verified Identity */}
        <Hero
          lang={lang}
          profile={safeProfile}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onOpenPayment={handleOpenGeneralPayment}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        />

        {/* 2. Projects (Live Demo & Source Code) */}
        <ProjectsSection
          projects={projects}
          lang={lang}
          onSelectProject={project => setSelectedProject(project)}
        />

        {/* 3. Technical Mastery & Skills */}
        <SkillsSection lang={lang} />

        {/* 4. Services & Pricing Packages */}
        <ServicesSection
          services={services}
          lang={lang}
          onBookService={handleBookService}
        />

        {/* 5. Contact & Real-time Notification to mhossenali740@gmail.com */}
        <ContactSection
          lang={lang}
          profile={safeProfile}
          onSubmitMessage={submitMessage}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        profile={safeProfile}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenPayment={handleOpenGeneralPayment}
      />

      {/* Floating Emergency Action Button (Always Accessible) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Emergency SOS Button */}
        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-500 text-white px-4 py-3 shadow-2xl shadow-red-900/60 transition-transform active:scale-95 border-2 border-red-400 emergency-pulse cursor-pointer"
          title="24/7 Emergency Contact Hotline"
        >
          <PhoneCall className="h-5 w-5 animate-bounce" />
          <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
            {lang === 'bn' ? 'জরুরি যোগাযোগ (+৮৮০১৮৭৬)' : 'Emergency SOS (+8801876)'}
          </span>
        </button>
      </div>

      {/* MODALS */}
      {/* 1. Emergency Modal with WhatsApp, Telegram, Imo, and Direct Call */}
      {isEmergencyOpen && (
        <EmergencyModal
          isOpen={isEmergencyOpen}
          onClose={() => setIsEmergencyOpen(false)}
          lang={lang}
          profile={safeProfile}
        />
      )}

      {/* 2. Secure Payment Gateway Modal (bKash, Nagad, Rocket, Stripe) */}
      {isPaymentOpen && (
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          lang={lang}
          services={services}
          profile={safeProfile}
          selectedService={selectedService}
          onSubmitPayment={submitPayment}
        />
      )}

      {/* 3. Project Detail Architecture Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          lang={lang}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* 4. Merchant & Admin Dashboard Modal (mhossenali740@gmail.com) */}
      {isAdminOpen && (
        <AdminDashboardModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          lang={lang}
          profile={safeProfile}
          projects={projects}
          messages={messages}
          payments={payments}
          onSaveProject={saveProject}
          onDeleteProject={deleteProject}
          onUpdateProfile={updateProfile}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
          onUpdateMessageStatus={updateMessageStatus}
          onExportBackup={exportDatabaseJson}
          onRestoreBackup={restoreDatabaseJson}
        />
      )}

      {/* 5. Profile Picture & Portrait Customizer Modal */}
      {isPhotoModalOpen && (
        <ProfilePhotoModal
          isOpen={isPhotoModalOpen}
          onClose={() => setIsPhotoModalOpen(false)}
          currentAvatar={safeProfile.avatarUrl}
          onSaveAvatar={updateAvatar}
          lang={lang}
        />
      )}

    </div>
  );
}
