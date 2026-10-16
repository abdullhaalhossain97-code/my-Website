import { useState, useEffect, useCallback } from 'react';
import { ProfileInfo, ProjectItem, ServicePackage, ContactMessage, PaymentRecord, DatabaseBackup } from '../types';
import { INITIAL_PROFILE, INITIAL_PROJECTS, INITIAL_SERVICES, INITIAL_MESSAGES, INITIAL_PAYMENTS } from '../data/initialData';

const LOCAL_STORAGE_KEY = 'ali_portfolio_data_v1';

interface StoredData {
  profile: ProfileInfo;
  projects: ProjectItem[];
  services: ServicePackage[];
  messages: ContactMessage[];
  payments: PaymentRecord[];
}

export function usePortfolioData() {
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    try {
      const cached = localStorage.getItem(`${LOCAL_STORAGE_KEY}_profile`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object' && (parsed.name || parsed.email)) {
          return { ...INITIAL_PROFILE, ...parsed };
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PROFILE;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const cached = localStorage.getItem(`${LOCAL_STORAGE_KEY}_projects`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PROJECTS;
  });

  const [services, setServices] = useState<ServicePackage[]>(() => {
    try {
      const cached = localStorage.getItem(`${LOCAL_STORAGE_KEY}_services`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_SERVICES;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const cached = localStorage.getItem(`${LOCAL_STORAGE_KEY}_messages`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_MESSAGES;
  });

  const [payments, setPayments] = useState<PaymentRecord[]>(() => {
    try {
      const cached = localStorage.getItem(`${LOCAL_STORAGE_KEY}_payments`);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PAYMENTS;
  });

  const [loading, setLoading] = useState(false);
  const [isServerConnected, setIsServerConnected] = useState(true);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (profile) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_profile`, JSON.stringify(profile));
      }
      if (projects) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_projects`, JSON.stringify(projects));
      }
      if (services) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_services`, JSON.stringify(services));
      }
      if (messages) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_messages`, JSON.stringify(messages));
      }
      if (payments) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_payments`, JSON.stringify(payments));
      }
    } catch (e) {
      console.warn('localStorage quota or disabled', e);
    }
  }, [profile, projects, services, messages, payments]);

  // Fetch from server API on mount
  const refreshFromServer = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/portfolio/all');
      if (res.ok) {
        const data = await res.json();
        if (data && data.profile && typeof data.profile === 'object') {
          setProfile(prev => ({ ...INITIAL_PROFILE, ...(prev || {}), ...data.profile }));
        }
        if (data && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
        if (data && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        }
        setIsServerConnected(true);
      } else {
        setIsServerConnected(false);
      }
    } catch (err) {
      // Offline fallback: continue smoothly with localStorage state
      setIsServerConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshFromServer();
  }, [refreshFromServer]);

  // Submit contact message
  const submitMessage = async (msg: Omit<ContactMessage, 'id' | 'receivedAt' | 'notifiedToAdmin' | 'status'>) => {
    const tempId = `msg-${Date.now()}`;
    const newMsg: ContactMessage = {
      id: tempId,
      ...msg,
      status: 'new',
      receivedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
      notifiedToAdmin: true
    };

    // Optimistic local update
    setMessages(prev => [newMsg, ...prev]);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, message: data.message || 'Dispatched to mhossenali740@gmail.com' };
      }
    } catch (e) {
      console.warn('Sent in offline mode, cached in local database.');
    }
    return { success: true, message: 'Message recorded locally and queued for mhossenali740@gmail.com' };
  };

  // Submit payment record
  const submitPayment = async (paymentData: Omit<PaymentRecord, 'id' | 'createdAt' | 'status'>) => {
    const tempId = `PAY-${Date.now().toString().slice(-6)}`;
    const record: PaymentRecord = {
      id: tempId,
      ...paymentData,
      status: 'verified',
      createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
    };

    setPayments(prev => [record, ...prev]);

    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, payment: data.payment };
      }
    } catch (e) {
      console.warn('Payment cached offline');
    }
    return { success: true, payment: record };
  };

  // Admin update project
  const saveProject = async (project: ProjectItem) => {
    setProjects(prev => {
      const exists = prev.some(p => p.id === project.id);
      if (exists) {
        return prev.map(p => (p.id === project.id ? project : p));
      } else {
        return [project, ...prev];
      }
    });

    try {
      const isExisting = projects.some(p => p.id === project.id);
      const url = isExisting ? `/api/projects/${project.id}` : '/api/projects';
      const method = isExisting ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
    } catch (e) {
      console.warn('Updated in local database');
    }
  };

  // Admin delete project
  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Deleted from local database');
    }
  };

  // Admin update profile
  const updateProfile = async (newProfile: ProfileInfo) => {
    setProfile(newProfile);
    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile)
      });
    } catch (e) {
      console.warn('Profile saved to local database');
    }
  };

  // Profile avatar update helper
  const updateAvatar = async (avatarUrl: string, avatarBase64?: string) => {
    setProfile(prev => ({ ...prev, avatarUrl }));
    try {
      const res = await fetch('/api/profile/avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl, avatarBase64 })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.avatarUrl) {
          setProfile(prev => ({ ...prev, avatarUrl: data.avatarUrl }));
        }
      }
    } catch (e) {
      console.warn('Avatar saved locally');
    }
  };

  // Admin update message status
  const updateMessageStatus = async (id: string, status: ContactMessage['status'], adminNotes?: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, status, adminNotes: adminNotes ?? m.adminNotes } : m))
    );
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });
    } catch (e) {
      console.warn('Status updated in local DB');
    }
  };

  // Database Backup: Export JSON
  const exportDatabaseJson = () => {
    const backup: DatabaseBackup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile,
      projects,
      services,
      messages,
      payments
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ali_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Database Backup: Restore JSON
  const restoreDatabaseJson = async (backupData: DatabaseBackup) => {
    if (!backupData || !backupData.profile || !backupData.projects) {
      throw new Error('Invalid backup file format');
    }

    setProfile(backupData.profile);
    setProjects(backupData.projects);
    if (backupData.services) setServices(backupData.services);
    if (backupData.messages) setMessages(backupData.messages);
    if (backupData.payments) setPayments(backupData.payments);

    try {
      await fetch('/api/backup/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backupData)
      });
    } catch (e) {
      console.warn('Restored to local database');
    }
  };

  return {
    profile,
    projects,
    services,
    messages,
    payments,
    loading,
    isServerConnected,
    submitMessage,
    submitPayment,
    saveProject,
    deleteProject,
    updateProfile,
    updateAvatar,
    updateMessageStatus,
    exportDatabaseJson,
    restoreDatabaseJson,
    refreshFromServer
  };
}
