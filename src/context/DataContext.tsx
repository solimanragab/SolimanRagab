import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  repoUrl: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ValueItem {
  icon: string;
  label: string;
}

export interface MetricItem {
  icon: string;
  value: string;
  label: string;
  color: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
}

export interface FeatureItem {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: FeatureItem[];
  featured: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface WebsiteData {
  hero: {
    availabilityText: string;
    mainTitlePrefix: string;
    mainTitleAccent: string;
    mainTitleSuffix: string;
    description: string;
    linkedinUrl: string;
    githubUrl: string;
    cvUrl: string;
    imageUrl: string;
    badgeReact: string;
    badgeTypeScript: string;
    badgeTailwind: string;
  };
  projects: ProjectItem[];
  services: ServiceItem[];
  about: {
    badge: string;
    title: string;
    description: string;
    values: ValueItem[];
    credentials: string[];
    stats: {
      projectsCount: string;
      coursesCount: string;
      experienceCount: string;
    };
  };
  socialProof: {
    metrics: MetricItem[];
    testimonials: TestimonialItem[];
  };
  pricing: PricingPlan[];
  contact: {
    email: string;
    location: string;
    linkedinUrl: string;
    githubUrl: string;
  };
  adminSettings: {
    username: string;
    passwordHash: string; // Stored simple plaintext/hash for client demo
  };
  inquiries: Inquiry[];
}

const defaultData: WebsiteData = {
  hero: {
    availabilityText: 'Available for freelance work',
    mainTitlePrefix: 'Turning Ideas Into ',
    mainTitleAccent: 'Interactive',
    mainTitleSuffix: ' Web Experiences',
    description: 'Frontend developer crafting pixel-perfect, responsive web applications that combine thoughtful design with clean, performant code.',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    cvUrl: '#about',
    imageUrl: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    badgeReact: 'React',
    badgeTypeScript: 'TypeScript',
    badgeTailwind: 'Tailwind'
  },
  projects: [
    {
      id: '1',
      title: 'E-Commerce Dashboard',
      description: 'A full-stack dashboard with real-time analytics, inventory management, and order tracking built with React and Supabase.',
      tags: ['React', 'Supabase', 'TypeScript'],
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
      liveUrl: '#',
      repoUrl: '#'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative task board with drag-and-drop, real-time updates, and team workspace features.',
      tags: ['Next.js', 'PostgreSQL', 'Tailwind'],
      image: 'https://images.pexels.com/photos/316466/pexels-photo-316466.jpeg?auto=compress&cs=tinysrgb&w=600',
      liveUrl: '#',
      repoUrl: '#'
    },
    {
      id: '3',
      title: 'Weather Forecast App',
      description: 'Beautiful weather application with location-based forecasts, animated backgrounds, and 7-day predictions.',
      tags: ['React', 'API', 'CSS Animations'],
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
      liveUrl: '#',
      repoUrl: '#'
    },
    {
      id: '4',
      title: 'Portfolio Website',
      description: 'Modern portfolio with smooth animations, contact form, and CMS-powered project showcases.',
      tags: ['React', 'Framer Motion', 'Supabase'],
      image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600',
      liveUrl: '#',
      repoUrl: '#'
    }
  ],
  services: [
    {
      id: '1',
      icon: 'Monitor',
      title: 'Responsive Design',
      description: 'Pixel-perfect layouts that adapt seamlessly across every screen size, from mobile to ultrawide displays.'
    },
    {
      id: '2',
      icon: 'Layout',
      title: 'Landing Pages',
      description: 'High-converting landing pages engineered for performance, with clear calls-to-action and fast load times.'
    },
    {
      id: '3',
      icon: 'Palette',
      title: 'UI Redesigns',
      description: 'Modernizing outdated interfaces with clean design systems, improved usability, and fresh visual identity.'
    },
    {
      id: '4',
      icon: 'Plug',
      title: 'API Integration',
      description: 'Connecting frontends to backends and third-party services with clean data flows, error handling, and caching.'
    }
  ],
  about: {
    badge: 'About Me',
    title: 'Building the Web, One Pixel at a Time',
    description: "I'm Soliman Elsenoty, a frontend developer passionate about crafting interactive web experiences that balance aesthetics with functionality. I focus on writing clean, accessible code and creating interfaces that genuinely help people accomplish their goals. Every project is an opportunity to learn something new and raise the bar for quality.",
    values: [
      { icon: 'Target', label: 'Attention to detail' },
      { icon: 'Lightbulb', label: 'Continuous learning' },
      { icon: 'Users', label: 'Collaboration' }
    ],
    credentials: [
      '4 university-level web projects delivered',
      '2 professional development courses completed',
      'Proficient in React, TypeScript, and modern CSS',
      'Strong foundation in software engineering principles',
      'Experience with Supabase and RESTful APIs'
    ],
    stats: {
      projectsCount: '4',
      coursesCount: '2',
      experienceCount: '0.5+'
    }
  },
  socialProof: {
    metrics: [
      { icon: 'GraduationCap', value: '4', label: 'University Projects', color: 'bg-olive' },
      { icon: 'BookOpen', value: '2', label: 'Professional Courses', color: 'bg-olive' },
      { icon: 'Clock', value: '0.5+', label: 'Years Experience', color: 'bg-olive' }
    ],
    testimonials: [
      {
        quote: 'Soliman delivered a React dashboard that exceeded our expectations — clean code, fast, and easy to maintain.',
        name: 'Ahmed K.',
        role: 'Project Supervisor'
      },
      {
        quote: 'His attention to responsive detail is remarkable. The site looked flawless on every device we tested.',
        name: 'Sarah M.',
        role: 'UX Designer'
      },
      {
        quote: 'Quick turnaround, great communication, and the API integration worked perfectly on the first try.',
        name: 'Omar R.',
        role: 'Backend Developer'
      }
    ]
  },
  pricing: [
    {
      id: '1',
      name: 'Basic',
      price: 250,
      description: 'Perfect for a simple landing page that converts visitors into leads.',
      features: [
        { text: 'Single-page landing design', included: true },
        { text: 'Responsive layout', included: true },
        { text: 'Contact form', included: true },
        { text: 'Basic SEO setup', included: true },
        { text: '1 revision round', included: true },
        { text: 'React/Next.js build', included: false },
        { text: 'API integrations', included: false },
        { text: 'Ongoing support', included: false }
      ],
      featured: false
    },
    {
      id: '2',
      name: 'Standard',
      price: 500,
      description: 'Ideal for a multi-page React site with polished interactions and modern tooling.',
      features: [
        { text: 'Up to 5 pages', included: true },
        { text: 'Responsive layout', included: true },
        { text: 'React / Next.js build', included: true },
        { text: 'Animations & micro-interactions', included: true },
        { text: 'Contact form + email setup', included: true },
        { text: 'SEO optimization', included: true },
        { text: '2 revision rounds', included: true },
        { text: '2 week delivery', included: true },
        { text: 'Custom API integrations', included: false },
        { text: 'Ongoing maintenance', included: false }
      ],
      featured: true
    },
    {
      id: '3',
      name: 'Premium',
      price: 800,
      description: 'Full architecture with backend integration, custom features, and ongoing support.',
      features: [
        { text: 'Unlimited pages', included: true },
        { text: 'Responsive layout', included: true },
        { text: 'React / Next.js build', included: true },
        { text: 'Animations & micro-interactions', included: true },
        { text: 'Custom API integrations', included: true },
        { text: 'Database / Supabase setup', included: true },
        { text: 'Authentication system', included: true },
        { text: '3 revision rounds', included: true },
        { text: '4 week delivery', included: true },
        { text: '1 month post-launch support', included: true }
      ],
      featured: false
    }
  ],
  contact: {
    email: 'soliman@example.com',
    location: 'Available Remotely',
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com'
  },
  adminSettings: {
    username: 'admin',
    passwordHash: 'admin123'
  },
  inquiries: []
};

interface DataContextType {
  data: WebsiteData;
  updateHero: (heroData: Partial<WebsiteData['hero']>) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateAbout: (aboutData: Partial<WebsiteData['about']>) => void;
  updateSocialProof: (socialProofData: Partial<WebsiteData['socialProof']>) => void;
  updatePricing: (pricing: PricingPlan[]) => void;
  updateContact: (contactData: Partial<WebsiteData['contact']>) => void;
  updateAdminSettings: (username: string, passwordHash: string) => void;
  addInquiry: (name: string, email: string, subject: string, message: string) => void;
  markInquiryRead: (id: string, isRead: boolean) => void;
  deleteInquiry: (id: string) => void;
  clearAllInquiries: () => void;
  resetToDefault: () => void;
  importBackup: (backup: WebsiteData) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<WebsiteData>(() => {
    const saved = localStorage.getItem('website_content_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with default data to make sure any new keys exist
        return {
          ...defaultData,
          ...parsed,
          hero: { ...defaultData.hero, ...parsed.hero },
          about: { ...defaultData.about, ...parsed.about },
          socialProof: { ...defaultData.socialProof, ...parsed.socialProof },
          contact: { ...defaultData.contact, ...parsed.contact },
          adminSettings: { ...defaultData.adminSettings, ...parsed.adminSettings },
          // Keep inquiries as is
          inquiries: parsed.inquiries || []
        };
      } catch (e) {
        console.error('Failed to parse saved website content, resetting to default.', e);
        return defaultData;
      }
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('website_content_data', JSON.stringify(data));
  }, [data]);

  const updateHero = (heroData: Partial<WebsiteData['hero']>) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroData }
    }));
  };

  const updateProjects = (projects: ProjectItem[]) => {
    setData((prev) => ({
      ...prev,
      projects
    }));
  };

  const updateServices = (services: ServiceItem[]) => {
    setData((prev) => ({
      ...prev,
      services
    }));
  };

  const updateAbout = (aboutData: Partial<WebsiteData['about']>) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, ...aboutData }
    }));
  };

  const updateSocialProof = (socialProofData: Partial<WebsiteData['socialProof']>) => {
    setData((prev) => ({
      ...prev,
      socialProof: { ...prev.socialProof, ...socialProofData }
    }));
  };

  const updatePricing = (pricing: PricingPlan[]) => {
    setData((prev) => ({
      ...prev,
      pricing
    }));
  };

  const updateContact = (contactData: Partial<WebsiteData['contact']>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactData }
    }));
  };

  const updateAdminSettings = (username: string, passwordHash: string) => {
    setData((prev) => ({
      ...prev,
      adminSettings: { username, passwordHash }
    }));
  };

  const addInquiry = (name: string, email: string, subject: string, message: string) => {
    const newInquiry: Inquiry = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
      isRead: false
    };
    setData((prev) => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries]
    }));
  };

  const markInquiryRead = (id: string, isRead: boolean) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq) =>
        inq.id === id ? { ...inq, isRead } : inq
      )
    }));
  };

  const deleteInquiry = (id: string) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((inq) => inq.id !== id)
    }));
  };

  const clearAllInquiries = () => {
    setData((prev) => ({
      ...prev,
      inquiries: []
    }));
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all content to the original defaults? This will erase all edits but keep contact messages.')) {
      setData((prev) => ({
        ...defaultData,
        inquiries: prev.inquiries // Preserve inquiries when resetting content
      }));
    }
  };

  const importBackup = (backup: WebsiteData): boolean => {
    try {
      if (backup && typeof backup === 'object' && backup.hero && backup.projects && backup.services && backup.about) {
        setData(backup);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import website backup.', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        updateHero,
        updateProjects,
        updateServices,
        updateAbout,
        updateSocialProof,
        updatePricing,
        updateContact,
        updateAdminSettings,
        addInquiry,
        markInquiryRead,
        deleteInquiry,
        clearAllInquiries,
        resetToDefault,
        importBackup
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
