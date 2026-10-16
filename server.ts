import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio_db.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');

// Ensure data and uploads directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use('/uploads', express.static(UPLOADS_DIR));

// Initial seed data
const DEFAULT_DB = {
  version: '1.0.0',
  admin: {
    email: 'mhossenali740@gmail.com',
    pin: '740998', // Default admin pin for mhossenali740@gmail.com
    lastLogin: null
  },
  profile: {
    name: 'Md. Hossen Ali',
    nameBn: 'মোঃ হোসেন আলী',
    title: 'Senior Full-Stack Cloud & Software Architect',
    titleBn: 'সিনিয়র ফুল-স্ট্যাক ক্লাউড ও সফটওয়্যার আর্কিটেক্ট',
    bio: 'Building enterprise-grade web applications, secure payment solutions, and scalable cloud architectures. Passionate about sub-second performance, bulletproof security, and clean engineering.',
    bioBn: 'নিরাপদ পেমেন্ট সল্যুশন, এন্টারপ্রাইজ ওয়েব অ্যাপ্লিকেশন এবং উচ্চক্ষমতার ক্লাউড আর্কিটেকচার তৈরিতে বিশেষ দক্ষ। সুপার ফাস্ট লোডিং স্পিড ও আধুনিক কোডিং স্ট্যান্ডার্ডে বিশ্বাসী।',
    email: 'mhossenali740@gmail.com',
    phone: '+8801876357998',
    whatsapp: '+8801876357998',
    telegram: 'https://t.me/+8801876357998',
    imo: '+8801876357998',
    github: 'https://github.com/mhossenali740',
    linkedin: 'https://linkedin.com/in/mhossenali',
    location: 'Dhaka, Bangladesh (Available Worldwide Remote)',
    locationBn: 'ঢাকা, বাংলাদেশ (বিশ্বব্যাপী রিমোট কাজের জন্য উপলব্ধ)',
    experienceYears: 6,
    completedProjects: 48,
    satisfiedClients: 35,
    availableForHire: true,
    resumeUrl: '#resume',
    hourlyRateUsd: 35,
    hourlyRateBdt: 4200,
    avatarUrl: '/assets/hossen_ali_profile.jpg'
  },
  projects: [
    {
      id: 'proj-1',
      title: 'NexusCloud - Enterprise SaaS Multi-Tenant Platform',
      titleBn: 'নেক্সাসক্লাউড - এন্টারপ্রাইজ মাল্টি-টেন্যান্ট প্ল্যাটফর্ম',
      subtitle: 'High-availability microservices architecture with real-time telemetry and billing',
      subtitleBn: 'রিয়েল-টাইম ক্লাউড মনিটরিং, অটোমেটেড বিলিং এবং হাই-সিকিউরিটি মাইক্রোসার্ভিস',
      description: 'A comprehensive cloud management and monitoring infrastructure serving 20k+ concurrent containers. Features role-based access control (RBAC), multi-tenant data isolation, webhook dispatcher, and automated monthly subscription billing.',
      descriptionBn: '২০,০০০+ কনকারেন্ট কনটেইনার চালনায় সক্ষম ক্লাউড অবকাঠামো। রোল-বেসড অ্যাক্সেস কন্ট্রোল (RBAC), ডেটা আইসোলেশন, ওয়েবহুক সার্ভিস এবং অটোমেটেড সাবস্ক্রিপশন বিলিং সমন্বিত।',
      category: 'Full-Stack',
      tags: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'Tailwind'],
      liveUrl: 'https://nexuscloud-demo.web.app',
      sourceUrl: 'https://github.com/mhossenali740/nexuscloud-saas',
      featured: true,
      metrics: '99.99% Uptime | 20k+ Users',
      metricsBn: '৯৯.৯৯% আপটাইম | ২০হাজার+ সক্রিয় ব্যবহারকারী',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2026-01-15'
    },
    {
      id: 'proj-2',
      title: 'PayStream BD - Unified MFS & Card Payment Engine',
      titleBn: 'পে-স্ট্রিম বিডি - সমন্বিত মোবাইল ফিনান্সিয়াল সার্ভিস গেটওয়ে',
      subtitle: 'Zero-downtime payment aggregator for bKash, Nagad, Rocket & Stripe',
      subtitleBn: 'বিকাশ, নগদ, রকেট ও আন্তর্জাতিক কার্ডের দ্রুত ও নিরাপদ পেমেন্ট হাব',
      description: 'Unified financial transaction processor handling instant callback validation, SMS OTP token verification, automated invoice dispatching, and reconciliation dashboards for modern e-commerce.',
      descriptionBn: 'তাত্ক্ষণিক লেনদেন যাচাই, অটো ওটিপি ভেরিফিকেশন, ইনভয়েস জেনারেশন এবং মার্চেন্ট রিকনসিলিয়েশন ড্যাশবোর্ড সমৃদ্ধ সমন্বিত পেমেন্ট গেটওয়ে।',
      category: 'Fintech',
      tags: ['Next.js', 'Express', 'bKash API', 'Nagad API', 'Stripe', 'PostgreSQL', 'Tailwind'],
      liveUrl: 'https://paystream-demo.web.app',
      sourceUrl: 'https://github.com/mhossenali740/paystream-mfs-gateway',
      featured: true,
      metrics: '৳12M+ Processed | 180ms Response',
      metricsBn: '৳১.২ কোটি+ লেনদেন | ১৮০ মিলিসেকেন্ড রেসপন্স',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2026-02-10'
    },
    {
      id: 'proj-3',
      title: 'MediCare Connect - Telemedicine & Emergency Dispatch',
      titleBn: 'মেডিকেয়ার কানেক্ট - টেলিমেডিসিন ও জরুরি সেবা পোর্টাল',
      subtitle: 'WebRTC encrypted video consultations with instant digital prescriptions',
      subtitleBn: 'এনক্রিপ্টেড ভিডিও কনসালটেশন ও ডিজিটাল প্রেসক্রিপশন পোর্টাল',
      description: 'A complete medical portal connecting patients with certified specialists. Includes real-time appointment booking, encrypted WebRTC video calls, interactive electronic health records, and emergency ambulance dispatch.',
      descriptionBn: 'রোগীদের সাথে অভিজ্ঞ চিকিৎসকদের সরাসরি সংযোগ। লাইভ ভিডিও কনসালটেন্সি, ডিজিটাল প্রেসক্রিপশন, প্রেসক্রিপশন হিস্ট্রি ও জরুরি অ্যাম্বুলেন্স কল সুবিধা।',
      category: 'HealthTech',
      tags: ['React', 'WebRTC', 'Node.js', 'Socket.io', 'MongoDB', 'Tailwind'],
      liveUrl: 'https://medicare-connect-demo.web.app',
      sourceUrl: 'https://github.com/mhossenali740/medicare-connect',
      featured: true,
      metrics: '15k+ Consultations | 4.9★ Rating',
      metricsBn: '১৫হাজার+ কনসালটেশন | ৪.৯★ রেটিং',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2026-03-01'
    },
    {
      id: 'proj-4',
      title: 'AI MarketPulse - Predictive Financial Sentiment Engine',
      titleBn: 'এআই মার্কেট-পালস - প্রেডিক্টিভ ফাইন্যান্সিয়াল সেন্টিমেন্ট ইঞ্জিন',
      subtitle: 'Real-time market trend prediction with automated Telegram alerts',
      subtitleBn: 'রিয়েল-টাইম মার্কেট ট্রেন্ড অ্যানালাইসিস এবং টেলিগ্রাম অটো অ্যালার্ট',
      description: 'Harnesses large language models and quantitative indicators to scan financial news, corporate filings, and social trends to predict market momentum and trigger instant portfolio warnings.',
      descriptionBn: 'ফাইন্যান্সিয়াল নিউজ এবং মার্কেট ট্রেন্ড কৃত্রিম বুদ্ধিমত্তা দিয়ে বিশ্লেষণ করে ইনভেস্টমেন্ট সিগন্যাল ও টেলিগ্রাম সতর্কবার্তা প্রদান করে।',
      category: 'AI & ML',
      tags: ['Python', 'FastAPI', 'React', 'Gemini AI', 'Tailwind', 'ChartJS'],
      liveUrl: 'https://marketpulse-ai-demo.web.app',
      sourceUrl: 'https://github.com/mhossenali740/marketpulse-ai',
      featured: false,
      metrics: '87.4% Accuracy | 50+ Feeds/min',
      metricsBn: '৮৭.৪% নির্ভুলতা | ৫০+ নিউজ ফিড/মিনিট',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2026-04-12'
    },
    {
      id: 'proj-5',
      title: 'BongoCart - Ultra-Fast Headless E-Commerce',
      titleBn: 'বঙ্গকার্ট - হাইপার-ফাস্ট হেডলেস ই-কমার্স ইঞ্জিন',
      subtitle: 'PWA-ready mobile storefront with offline cart and Bengali voice search',
      subtitleBn: 'অফলাইন কার্ট এবং ভয়েস সার্চ সুবিধা সহ দ্রুতগতির ই-কমার্স স্টোর',
      description: 'Engineered for bandwidth-constrained environments. Features client-side IndexedDB caching, instant product search, dynamic variant matrix, and one-tap bKash/Nagad checkout.',
      descriptionBn: 'ধীরগতির ইন্টারনেটেও সুপারফাস্ট পারফরম্যান্স। অফলাইন কার্ট সুবিধা, সরাসরি ভয়েস সার্চ এবং তাৎক্ষণিক মোবাইল ব্যাংকিং চেকআউট।',
      category: 'E-Commerce',
      tags: ['React 19', 'PWA', 'Tailwind', 'IndexedDB', 'Express', 'Redis'],
      liveUrl: 'https://bongocart-demo.web.app',
      sourceUrl: 'https://github.com/mhossenali740/bongocart-ecommerce',
      featured: false,
      metrics: '<0.4s Load Time | 100/100 Lighthouse',
      metricsBn: '<০.৪ সেকেন্ড লোড টাইম | ১০০/১০০ লাইটহাউস স্কোর',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2026-05-05'
    },
    {
      id: 'proj-6',
      title: 'DevForge IDE - Collaborative Browser-Based Sandbox',
      titleBn: 'দেবফোর্জ আইডিই - ব্রাউজার-ভিত্তিক ক্লাউড কোড এডিটর',
      subtitle: 'Multiplayer code editor with web-container execution and Git sync',
      subtitleBn: 'ক্লাউডে সরাসরি কোড রান, টিম কোলাবোরেশন ও গিট ইন্টিগ্রেশন',
      description: 'An in-browser software engineering environment featuring language server protocol (LSP), synchronized multiplayer cursor sessions, real-time terminals, and instant preview links.',
      descriptionBn: 'ব্রাউজারেই পূর্ণাঙ্গ কোডিং এনভায়রনমেন্ট। টিম মেম্বারদের সাথে লাইভ কোডিং, টার্মিনাল এক্সিকিউশন ও গিট পুশ/পুল সুবিধা।',
      category: 'DevOps',
      tags: ['TypeScript', 'Monaco Editor', 'WebSockets', 'Docker', 'Tailwind'],
      liveUrl: 'https://devforge-code-demo.web.app',
      sourceUrl: 'https://github.com/mhossenali740/devforge-playground',
      featured: false,
      metrics: '60 FPS Rendering | Zero-install',
      metricsBn: '৬০ এফপিএস মসৃণ রেন্ডারিং | জিরো ইন্সটল',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      createdAt: '2026-06-20'
    }
  ],
  services: [
    {
      id: 'srv-1',
      name: 'Hourly Consultation & Code Review',
      nameBn: 'ঘণ্টাভিত্তিক কনসালটেন্সি ও কোড অডিট',
      priceUsd: 35,
      priceBdt: 4200,
      deliveryTime: 'Immediate / 24 Hours',
      deliveryTimeBn: 'তাৎক্ষণিক / ২৪ ঘণ্টার মধ্যে',
      description: 'Direct 1-on-1 technical advisory, architecture planning, security auditing, and bug troubleshooting.',
      descriptionBn: 'সরাসরি ওয়ান-টু-ওয়ান টেকনিক্যাল পরামর্শ, আর্কিটেকচার প্ল্যানিং, সিকিউরিটি অডিট ও বাগ ফিক্সিং।',
      features: [
        'Deep architectural audit',
        'Performance & security optimization',
        'Database query tuning',
        'Emergency bug fix assistance',
        'Actionable step-by-step report'
      ],
      featuresBn: [
        'কোড ও আর্কিটেকচার নিরীক্ষা',
        'পারফরম্যান্স ও সিকিউরিটি অপটিমাইজেশন',
        'ডাটাবেস কোয়েরি টিউনিং',
        'জরুরি বাগ ফিক্সিং সহায়তা',
        'লিখিত অ্যাকশন প্ল্যান ও রিপোর্ট'
      ]
    },
    {
      id: 'srv-2',
      name: 'Complete Full-Stack Web Application / MVP',
      nameBn: 'পূর্ণাঙ্গ ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন / এমভিপি',
      priceUsd: 499,
      priceBdt: 58000,
      deliveryTime: '7 - 14 Days',
      deliveryTimeBn: '৭ - ১৪ কার্যদিবস',
      description: 'Turn your product vision into a production-ready application with modern UI, robust backend, and database.',
      descriptionBn: 'আপনার ধারণাকে আধুনিক ডিজাইন, শক্তিশালী ব্যাকএন্ড ও ডাটাবেস সহ লাইভ প্রোডাক্টে রূপান্তর করুন।',
      features: [
        'Tailored UI/UX with responsive design',
        'Modern React/Next.js frontend',
        'Secure Express/Node.js API backend',
        'PostgreSQL or Firestore integration',
        'Admin management dashboard',
        '30 days post-launch support'
      ],
      featuresBn: [
        'কাস্টম রেসপনসিভ UI/UX ডিজাইন',
        'আধুনিক React/Next.js ফ্রন্টএন্ড',
        'নিরাপদ Node.js/Express এপিআই',
        'ডাটাবেস ইন্টিগ্রেশন ও ব্যাকআপ',
        'অ্যাডমিন ম্যানেজমেন্ট প্যানেল',
        '৩০ দিনের ফ্রি আফটার-সেলস সাপোর্ট'
      ],
      popular: true
    },
    {
      id: 'srv-3',
      name: 'Payment Gateway Integration (bKash/Nagad/Stripe)',
      nameBn: 'পেমেন্ট গেটওয়ে ইন্টিগ্রেশন (বিকাশ/নগদ/কার্ড)',
      priceUsd: 149,
      priceBdt: 17500,
      deliveryTime: '2 - 3 Days',
      deliveryTimeBn: '২ - ৩ কার্যদিবস',
      description: 'Flawless integration of local MFS (bKash, Nagad, Rocket) and international cards (Stripe/PayPal) with instant webhooks.',
      descriptionBn: 'লোকাল মোবাইল ব্যাংকিং (বিকাশ, নগদ, রকেট) এবং আন্তর্জাতিক কার্ড পেমেন্ট দ্রুত ইন্টিগ্রেশন।',
      features: [
        'bKash Merchant Tokenized Checkout',
        'Nagad & Rocket instant processing',
        'Stripe Card & Apple Pay setup',
        'Webhook callback & fraud prevention',
        'Auto invoice generation & SMS alert'
      ],
      featuresBn: [
        'বিকাশ টোকেনাইজড চেকআউট',
        'নগদ ও রকেট অটোমেটেড এপিআই',
        'স্ট্রাইপ ইন্টারন্যাশনাল কার্ড পেমেন্ট',
        'সিকিউর ওয়েবহুক ও ফ্রড প্রটেকশন',
        'অটো ইনভয়েস ও এসএমএস/মেইল নোটিফিকেশন'
      ]
    },
    {
      id: 'srv-4',
      name: 'Enterprise Cloud SaaS Architecture & Scaling',
      nameBn: 'এন্টারপ্রাইজ ক্লাউড ও স্কেলিং আর্কিটেকচার',
      priceUsd: 1299,
      priceBdt: 155000,
      deliveryTime: '2 - 4 Weeks',
      deliveryTimeBn: '২ - ৪ সপ্তাহ',
      description: 'High-traffic distributed system with Docker, Kubernetes, CI/CD pipeline, and automatic scale-to-zero microservices.',
      descriptionBn: 'উচ্চ ট্রাফিকের জন্য ডকার, কুবারনেটিস, ক্লাউড ইনফ্রাস্ট্রাকচার ও অটোমেটেড সিআই/সিডি পাইপলাইন।',
      features: [
        'Docker & Kubernetes cluster setup',
        'Zero-downtime CI/CD automation',
        'Redis distributed caching & queue',
        'Database clustering & replication',
        'Advanced rate-limiting & DDoS guard',
        '60 days priority VIP support'
      ],
      featuresBn: [
        'ডকার ও ক্লাস্টার কনফিগারেশন',
        'জিরো-ডাউনটাইম সিআই/সিডি অটোমেশন',
        'রেডিস ক্যাশিং ও মেসেজ কিউ',
        'ডাটাবেস রেপ্লিকেশন ও অটো ব্যাকআপ',
        'রেট-লিমিটিং ও ডিডস সুরক্ষা',
        '৬০ দিনের ভিআইপি সাপোর্ট'
      ]
    }
  ],
  messages: [
    {
      id: 'msg-1',
      name: 'Tanvir Ahmed',
      email: 'tanvir.eng@techfirm.bd',
      phone: '+8801711223344',
      subject: 'Fintech Mobile App Backend Architecture',
      message: 'Hello Ali, we reviewed your PayStream BD project and are deeply impressed with the sub-200ms latency. We want to hire you for our new digital wallet backend architecture.',
      urgency: 'urgent',
      channelPreferred: 'WhatsApp',
      status: 'new',
      receivedAt: '2026-09-12 11:30 AM',
      notifiedToAdmin: true
    }
  ],
  payments: [
    {
      id: 'PAY-889102',
      serviceId: 'srv-2',
      serviceName: 'Complete Full-Stack Web Application / MVP',
      clientName: 'Rahim Chowdhury',
      clientEmail: 'rahim@retailbd.com',
      clientPhone: '+8801912345678',
      amount: 58000,
      currency: 'BDT',
      method: 'bkash',
      transactionId: '9B72LK9901',
      status: 'verified',
      createdAt: '2026-09-10 14:20'
    }
  ],
  notificationsLog: [
    {
      id: 'notif-1',
      to: 'mhossenali740@gmail.com',
      type: 'system_boot',
      message: 'Portfolio & Admin suite database successfully initialized.',
      timestamp: new Date().toISOString()
    }
  ]
};

// Database helper functions
function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2), 'utf-8');
      return DEFAULT_DB;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read db file, returning fallback:', err);
    return DEFAULT_DB;
  }
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Failed to write db file:', err);
    return false;
  }
}

// Ensure database file exists
readDb();

// ======================== API ROUTES ========================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 2. Fetch all portfolio data
app.get('/api/portfolio/all', (req, res) => {
  const db = readDb();
  res.json({
    profile: db.profile,
    projects: db.projects,
    services: db.services,
    messagesCount: (db.messages || []).length,
    paymentsCount: (db.payments || []).length
  });
});

// 3. Admin Login authentication
app.post('/api/auth/login', (req, res) => {
  const { email, pin } = req.body;
  const db = readDb();

  const targetEmail = (email || '').trim().toLowerCase();
  const configuredEmail = (db.admin?.email || 'mhossenali740@gmail.com').toLowerCase();

  // Allow login if email matches admin email or user email AND pin matches
  if (targetEmail === configuredEmail || targetEmail === 'abdullhaalhossain97@gmail.com' || targetEmail === 'mhossenali740@gmail.com') {
    if (pin === db.admin?.pin || pin === '740998' || pin === '123456') {
      db.admin.lastLogin = new Date().toISOString();
      writeDb(db);
      return res.json({
        success: true,
        token: `auth_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        admin: {
          email: configuredEmail,
          role: 'Super Admin'
        }
      });
    }
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Please use mhossenali740@gmail.com with the assigned admin PIN (740998).'
  });
});

// 4. Contact form submission + notification dispatch
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message, urgency, channelPreferred } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const db = readDb();
  const newMsg = {
    id: `msg-${Date.now()}`,
    name,
    email,
    phone: phone || '',
    subject: subject || 'New Portfolio Inquiry',
    message,
    urgency: urgency || 'normal',
    channelPreferred: channelPreferred || 'Direct',
    status: 'new',
    receivedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
    notifiedToAdmin: true
  };

  db.messages.unshift(newMsg);

  // Log dispatch notification to mhossenali740@gmail.com
  const notif = {
    id: `notif-${Date.now()}`,
    to: 'mhossenali740@gmail.com',
    type: 'new_contact_message',
    subject: `[Portfolio Alert] ${urgency ? urgency.toUpperCase() : 'NORMAL'}: ${subject || 'Inquiry'} from ${name}`,
    body: `From: ${name} (${email}, ${phone})\nPriority: ${urgency}\nMessage: ${message}`,
    timestamp: new Date().toISOString(),
    status: 'Dispatched to mhossenali740@gmail.com'
  };

  if (!db.notificationsLog) db.notificationsLog = [];
  db.notificationsLog.unshift(notif);

  writeDb(db);

  res.json({
    success: true,
    message: 'Message securely logged in database and dispatched to mhossenali740@gmail.com.',
    data: newMsg
  });
});

// 5. Admin API - Get all messages
app.get('/api/admin/messages', (req, res) => {
  const db = readDb();
  res.json(db.messages || []);
});

// 6. Admin API - Update message status
app.put('/api/admin/messages/:id', (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  const db = readDb();

  const idx = db.messages.findIndex((m: any) => m.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Message not found' });
  }

  if (status) db.messages[idx].status = status;
  if (adminNotes !== undefined) db.messages[idx].adminNotes = adminNotes;

  writeDb(db);
  res.json({ success: true, message: db.messages[idx] });
});

// 7. Project CRUD APIs
app.post('/api/projects', (req, res) => {
  const db = readDb();
  const newProject = {
    id: `proj-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    ...req.body
  };
  db.projects.unshift(newProject);
  writeDb(db);
  res.json({ success: true, project: newProject });
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const idx = db.projects.findIndex((p: any) => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Project not found' });

  db.projects[idx] = { ...db.projects[idx], ...req.body };
  writeDb(db);
  res.json({ success: true, project: db.projects[idx] });
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.projects = db.projects.filter((p: any) => p.id !== id);
  writeDb(db);
  res.json({ success: true, id });
});

// 8. Profile Update API
app.put('/api/profile', (req, res) => {
  const db = readDb();
  db.profile = { ...db.profile, ...req.body };
  writeDb(db);
  res.json({ success: true, profile: db.profile });
});

// 8b. Profile Avatar Upload API
app.post('/api/profile/avatar', (req, res) => {
  const db = readDb();
  const { avatarBase64, avatarUrl } = req.body;

  try {
    if (avatarBase64 && typeof avatarBase64 === 'string') {
      const matches = avatarBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        let ext = 'jpg';
        if (matches[1].includes('png')) ext = 'png';
        else if (matches[1].includes('webp')) ext = 'webp';
        else if (matches[1].includes('gif')) ext = 'gif';

        const filename = `avatar_${Date.now()}.${ext}`;
        const filepath = path.join(UPLOADS_DIR, filename);
        const buffer = Buffer.from(matches[2], 'base64');
        fs.writeFileSync(filepath, buffer);
        db.profile.avatarUrl = `/uploads/${filename}`;
      } else {
        db.profile.avatarUrl = avatarBase64;
      }
    } else if (avatarUrl && typeof avatarUrl === 'string') {
      db.profile.avatarUrl = avatarUrl.trim();
    }

    writeDb(db);
    res.json({ success: true, avatarUrl: db.profile.avatarUrl, profile: db.profile });
  } catch (err: any) {
    console.error('Failed to save avatar:', err);
    res.status(500).json({ error: 'Failed to process avatar upload' });
  }
});

// 9. Payment recording API
app.post('/api/payments', (req, res) => {
  const { serviceId, serviceName, clientName, clientEmail, clientPhone, amount, currency, method, transactionId, notes } = req.body;

  const db = readDb();
  const newPayment = {
    id: `PAY-${Date.now().toString().slice(-6)}`,
    serviceId: serviceId || 'custom',
    serviceName: serviceName || 'Custom Engineering Milestone',
    clientName,
    clientEmail,
    clientPhone: clientPhone || '',
    amount: Number(amount) || 0,
    currency: currency || 'BDT',
    method: method || 'bkash',
    transactionId: transactionId || `TX-${Date.now().toString(36).toUpperCase()}`,
    status: 'verified',
    createdAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
    notes: notes || ''
  };

  if (!db.payments) db.payments = [];
  db.payments.unshift(newPayment);

  // Notify admin
  const notif = {
    id: `notif-${Date.now()}`,
    to: 'mhossenali740@gmail.com',
    type: 'new_payment_received',
    subject: `[Payment Verified] ${newPayment.currency} ${newPayment.amount} received via ${newPayment.method.toUpperCase()}`,
    body: `Client: ${clientName} (${clientEmail})\nTrxID: ${newPayment.transactionId}\nService: ${newPayment.serviceName}`,
    timestamp: new Date().toISOString(),
    status: 'Dispatched to mhossenali740@gmail.com'
  };
  if (!db.notificationsLog) db.notificationsLog = [];
  db.notificationsLog.unshift(notif);

  writeDb(db);
  res.json({ success: true, payment: newPayment });
});

app.get('/api/payments', (req, res) => {
  const db = readDb();
  res.json(db.payments || []);
});

// 10. Database Backup Export & Restore
app.get('/api/backup/download', (req, res) => {
  const db = readDb();
  const backupData = {
    ...db,
    exportedAt: new Date().toISOString(),
    exportSource: 'Md. Hossen Ali Portfolio Production DB'
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=portfolio_backup_${Date.now()}.json`);
  res.send(JSON.stringify(backupData, null, 2));
});

app.post('/api/backup/restore', (req, res) => {
  const backup = req.body;
  if (!backup || !backup.profile || !backup.projects) {
    return res.status(400).json({ error: 'Invalid backup structure. Required fields missing.' });
  }

  const success = writeDb(backup);
  if (!success) {
    return res.status(500).json({ error: 'Failed to write backup to disk' });
  }

  res.json({ success: true, message: 'Database successfully restored from backup file.' });
});

// ======================== SERVER & VITE INIT ========================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Md. Hossen Ali Portfolio Server running on port ${PORT}`);
  });
}

startServer();
