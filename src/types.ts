export type Language = 'en' | 'bn';

export interface ProfileInfo {
  name: string;
  nameBn: string;
  title: string;
  titleBn: string;
  bio: string;
  bioBn: string;
  email: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  imo: string;
  github: string;
  linkedin: string;
  location: string;
  locationBn: string;
  experienceYears: number;
  completedProjects: number;
  satisfiedClients: number;
  availableForHire: boolean;
  resumeUrl: string;
  hourlyRateUsd: number;
  hourlyRateBdt: number;
  avatarUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  description: string;
  descriptionBn: string;
  category: 'Full-Stack' | 'Fintech' | 'HealthTech' | 'AI & ML' | 'E-Commerce' | 'DevOps';
  tags: string[];
  liveUrl: string;
  sourceUrl: string;
  featured: boolean;
  metrics: string;
  metricsBn: string;
  image: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  urgency: 'normal' | 'urgent' | 'emergency';
  channelPreferred?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  receivedAt: string;
  notifiedToAdmin: boolean;
  adminNotes?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  nameBn: string;
  priceUsd: number;
  priceBdt: number;
  deliveryTime: string;
  deliveryTimeBn: string;
  description: string;
  descriptionBn: string;
  features: string[];
  featuresBn: string[];
  popular?: boolean;
}

export interface PaymentRecord {
  id: string;
  serviceId: string;
  serviceName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  amount: number;
  currency: 'USD' | 'BDT';
  method: 'bkash' | 'nagad' | 'rocket' | 'stripe' | 'paypal';
  transactionId: string;
  status: 'pending' | 'verified' | 'completed';
  createdAt: string;
  notes?: string;
}

export interface DatabaseBackup {
  version: string;
  exportedAt: string;
  profile: ProfileInfo;
  projects: ProjectItem[];
  services: ServicePackage[];
  messages: ContactMessage[];
  payments: PaymentRecord[];
}
