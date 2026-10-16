import { ProfileInfo, ProjectItem, ServicePackage, ContactMessage, PaymentRecord } from '../types';

export const INITIAL_PROFILE: ProfileInfo = {
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
};

export const INITIAL_PROJECTS: ProjectItem[] = [
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
];

export const INITIAL_SERVICES: ServicePackage[] = [
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
];

export const INITIAL_MESSAGES: ContactMessage[] = [
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
  },
  {
    id: 'msg-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@novalabs.io',
    phone: '+14155552671',
    subject: 'SaaS Platform Modernization & Cloud Migration',
    message: 'Hi Ali, we need an experienced architect to migrate our monolithic app to Dockerized GCP services. Are you open for a quick discovery call?',
    urgency: 'normal',
    channelPreferred: 'Email',
    status: 'read',
    receivedAt: '2026-09-11 04:15 PM',
    notifiedToAdmin: true
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
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
  },
  {
    id: 'PAY-889103',
    serviceId: 'srv-3',
    serviceName: 'Payment Gateway Integration',
    clientName: 'Alex Thorne',
    clientEmail: 'alex@thorne-tech.uk',
    clientPhone: '+447911123456',
    amount: 149,
    currency: 'USD',
    method: 'stripe',
    transactionId: 'ch_3N9xKl2eZvKYlo2C09zL',
    status: 'completed',
    createdAt: '2026-09-11 18:45'
  }
];

export const TECH_SKILLS = [
  {
    category: 'Frontend Engineering',
    categoryBn: 'ফ্রন্টএন্ড ইঞ্জিনিয়ারিং',
    items: [
      { name: 'React 19 / Next.js', level: 96 },
      { name: 'TypeScript', level: 94 },
      { name: 'Tailwind CSS', level: 98 },
      { name: 'Motion / Animations', level: 92 },
      { name: 'State Management (Redux/Zustand)', level: 90 },
      { name: 'PWA & Offline Web Apps', level: 95 }
    ]
  },
  {
    category: 'Backend & Cloud APIs',
    categoryBn: 'ব্যাকএন্ড ও ক্লাউড এপিআই',
    items: [
      { name: 'Node.js / Express', level: 95 },
      { name: 'Python / FastAPI', level: 88 },
      { name: 'REST & GraphQL Architecture', level: 94 },
      { name: 'WebSockets & Real-time (Socket.io)', level: 92 },
      { name: 'Microservices & JWT/OAuth', level: 90 }
    ]
  },
  {
    category: 'Databases & Storage',
    categoryBn: 'ডাটাবেস ও স্টোরেজ',
    items: [
      { name: 'PostgreSQL / SQL', level: 92 },
      { name: 'MongoDB / Mongoose', level: 90 },
      { name: 'Redis In-Memory Caching', level: 88 },
      { name: 'Firebase Firestore', level: 94 },
      { name: 'Database Backup & Automation', level: 96 }
    ]
  },
  {
    category: 'Payment, Security & DevOps',
    categoryBn: 'পেমেন্ট গেটওয়ে, সিকিউরিটি ও ডেভঅপস',
    items: [
      { name: 'bKash / Nagad / Rocket MFS API', level: 98 },
      { name: 'Stripe / PayPal Gateway', level: 96 },
      { name: 'Docker & Containerization', level: 88 },
      { name: 'Google Cloud Platform (GCP)', level: 90 },
      { name: 'Linux Server Administration', level: 89 }
    ]
  }
];
