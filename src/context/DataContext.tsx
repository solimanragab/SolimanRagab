import React, { createContext, useContext, useState, useEffect } from 'react';
import initialData from '../data/website_data.json';

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
  gitSettings?: {
    enabled: boolean;
    owner: string;
    repo: string;
    branch: string;
    path: string;
  };
}

const defaultData = initialData as WebsiteData;

export interface GitSettings {
  enabled: boolean;
  owner: string;
  repo: string;
  branch: string;
  path: string;
}

interface DataContextType {
  data: WebsiteData;
  isLoading: boolean;
  isSaving: boolean;
  gitError: string | null;
  updateHero: (heroData: Partial<WebsiteData['hero']>) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateAbout: (aboutData: Partial<WebsiteData['about']>) => void;
  updateSocialProof: (socialProofData: Partial<WebsiteData['socialProof']>) => void;
  updatePricing: (pricing: PricingPlan[]) => void;
  updateContact: (contactData: Partial<WebsiteData['contact']>) => void;
  updateAdminSettings: (username: string, passwordHash: string) => void;
  updateGitSettings: (gitSettings: GitSettings) => void;
  addInquiry: (name: string, email: string, subject: string, message: string) => void;
  markInquiryRead: (id: string, isRead: boolean) => void;
  deleteInquiry: (id: string) => void;
  clearAllInquiries: () => void;
  resetToDefault: () => void;
  importBackup: (backup: WebsiteData) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<WebsiteData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [gitError, setGitError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/get-data')
      .then((res) => {
        if (!res.ok) throw new Error('API not available (could be production)');
        return res.json();
      })
      .then((serverData) => {
        setData(serverData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('Using bundled static website data as fallback:', err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const save = async () => {
      setIsSaving(true);
      setGitError(null);

      const isGitEnabled = data.gitSettings?.enabled;
      const pat = localStorage.getItem('github_pat');

      if (isGitEnabled && pat) {
        try {
          const owner = data.gitSettings?.owner || 'solimanragab';
          const repo = data.gitSettings?.repo || 'SolimanElsenoty';
          const branch = data.gitSettings?.branch || 'main';
          const filePath = data.gitSettings?.path || 'src/data/website_data.json';

          const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

          const getRes = await fetch(`${url}?ref=${branch}`, {
            headers: {
              Authorization: `Bearer ${pat}`,
              Accept: 'application/vnd.github+json',
            },
          });

          let sha: string | undefined;
          if (getRes.ok) {
            const fileMeta = await getRes.json();
            sha = fileMeta.sha;
          } else if (getRes.status !== 404) {
            throw new Error(`Failed to read file from GitHub: ${getRes.statusText}`);
          }

          const utf8Bytes = new TextEncoder().encode(JSON.stringify(data, null, 2));
          let binary = '';
          for (let i = 0; i < utf8Bytes.length; i++) {
            binary += String.fromCharCode(utf8Bytes[i]);
          }
          const base64Content = btoa(binary);

          const putRes = await fetch(url, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${pat}`,
              Accept: 'application/vnd.github+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: 'Update website content via Admin CMS',
              content: base64Content,
              sha,
              branch,
            }),
          });

          if (!putRes.ok) {
            const errData = await putRes.json();
            throw new Error(errData.message || `Failed to commit to GitHub: ${putRes.statusText}`);
          }

          console.log('Pushed content update to GitHub repository successfully!');
        } catch (err) {
          console.error('Git CMS error:', err);
          setGitError((err as Error).message);
        } finally {
          setIsSaving(false);
        }
      } else {
        try {
          const res = await fetch('/api/save-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
          if (!res.ok) {
            throw new Error('Local dev server failed to save');
          }
        } catch (err) {
          console.error('Local save error:', err);
        } finally {
          setIsSaving(false);
        }
      }
    };

    save();
  }, [data, isLoading]);

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

  const updateGitSettings = (gitSettings: GitSettings) => {
    setData((prev) => ({
      ...prev,
      gitSettings
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
        isLoading,
        isSaving,
        gitError,
        updateHero,
        updateProjects,
        updateServices,
        updateAbout,
        updateSocialProof,
        updatePricing,
        updateContact,
        updateAdminSettings,
        updateGitSettings,
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

