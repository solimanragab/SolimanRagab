import { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUploader from './ImageUploader';

interface HeroManagerProps {
  showToast: (msg: string) => void;
}

export default function HeroManager({ showToast }: HeroManagerProps) {
  const { data, updateHero, updateContact } = useData();
  const hero = data.hero;
  const contact = data.contact;

  const [availabilityText, setAvailabilityText] = useState(hero.availabilityText);
  const [mainTitlePrefix, setMainTitlePrefix] = useState(hero.mainTitlePrefix);
  const [mainTitleAccent, setMainTitleAccent] = useState(hero.mainTitleAccent);
  const [mainTitleSuffix, setMainTitleSuffix] = useState(hero.mainTitleSuffix);
  const [description, setDescription] = useState(hero.description);
  const [linkedinUrl, setLinkedinUrl] = useState(hero.linkedinUrl);
  const [githubUrl, setGithubUrl] = useState(hero.githubUrl);
  const [cvUrl, setCvUrl] = useState(hero.cvUrl);
  const [imageUrl, setImageUrl] = useState(hero.imageUrl);
  const [badgeReact, setBadgeReact] = useState(hero.badgeReact);
  const [badgeTypeScript, setBadgeTypeScript] = useState(hero.badgeTypeScript);
  const [badgeTailwind, setBadgeTailwind] = useState(hero.badgeTailwind);

  // Contact Info states
  const [contactEmail, setContactEmail] = useState(contact.email);
  const [contactLocation, setContactLocation] = useState(contact.location);
  const [contactLinkedin, setContactLinkedin] = useState(contact.linkedinUrl);
  const [contactGithub, setContactGithub] = useState(contact.githubUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero({
      availabilityText,
      mainTitlePrefix,
      mainTitleAccent,
      mainTitleSuffix,
      description,
      linkedinUrl,
      githubUrl,
      cvUrl,
      imageUrl,
      badgeReact,
      badgeTypeScript,
      badgeTailwind
    });
    updateContact({
      email: contactEmail,
      location: contactLocation,
      linkedinUrl: contactLinkedin,
      githubUrl: contactGithub
    });
    showToast('Website banner & contact info updated successfully!');
  };

  return (
    <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8">
      <div className="mb-6 border-b border-dark/5 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-dark font-heading">
          Edit Hero & Intro Section
        </h2>
        <p className="text-sm text-dark/60">
          Modify the top intro banner elements, text headings, profile image, and social handles.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Availability & Image */}
        <div className="grid sm:grid-cols-2 gap-5 items-start">
          <div>
            <label className="block text-sm font-semibold text-dark/70 mb-1.5">
              Availability Status Text
            </label>
            <input
              type="text"
              required
              value={availabilityText}
              onChange={(e) => setAvailabilityText(e.target.value)}
              className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
              placeholder="e.g. Available for freelance work"
            />
          </div>

          <div>
            <ImageUploader
              label="Portrait Image"
              value={imageUrl}
              onChange={(base64) => setImageUrl(base64)}
            />
            <div className="mt-2">
              <label className="block text-[10px] font-semibold text-dark/50 mb-1">
                Or paste Image URL manually:
              </label>
              <input
                type="text"
                value={imageUrl.startsWith('data:') ? '' : imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2 bg-cream/20 border border-dark/10 rounded-xl text-dark text-xs focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        {/* Header Headings */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-dark/40 uppercase tracking-wider block">
            Main Title Builder
          </span>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark/60 mb-1">
                Title Prefix
              </label>
              <input
                type="text"
                value={mainTitlePrefix}
                onChange={(e) => setMainTitlePrefix(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="e.g. Turning Ideas Into"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark/60 mb-1 text-accent">
                Accent Highlight Text
              </label>
              <input
                type="text"
                required
                value={mainTitleAccent}
                onChange={(e) => setMainTitleAccent(e.target.value)}
                className="w-full px-4 py-2.5 bg-accent/5 border border-accent/30 rounded-xl text-accent font-semibold text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="e.g. Interactive"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark/60 mb-1">
                Title Suffix
              </label>
              <input
                type="text"
                value={mainTitleSuffix}
                onChange={(e) => setMainTitleSuffix(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="e.g. Web Experiences"
              />
            </div>
          </div>
        </div>

        {/* Hero Bio Description */}
        <div>
          <label className="block text-sm font-semibold text-dark/70 mb-1.5">
            Hero Intro Description
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all resize-none"
            placeholder="Introduce yourself..."
          />
        </div>

        {/* Portrait Image Live Preview */}
        <div className="p-4 bg-cream/15 rounded-2xl border border-dark/5 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
            <img src={imageUrl} alt="Profile Preview" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-xs font-bold text-dark/40 uppercase block">Portrait Image Preview</span>
            <p className="text-xs text-dark/55 mt-0.5">Will display in the circular ring on the landing page.</p>
          </div>
        </div>

        {/* Social Links & CV */}
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-dark/70 mb-1.5">
              LinkedIn Handle Link
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark/70 mb-1.5">
              GitHub Handle Link
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark/70 mb-1.5">
              CV / Resume PDF Link
            </label>
            <input
              type="text"
              required
              value={cvUrl}
              onChange={(e) => setCvUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
              placeholder="e.g. #about or a Google Drive link"
            />
          </div>
        </div>

        {/* Contact Page Settings */}
        <div className="space-y-4 pt-4 border-t border-dark/5">
          <span className="text-xs font-bold text-dark/40 uppercase tracking-wider block">
            Footer / Contact Info Page settings
          </span>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                Contact Email Address
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="e.g. hello@domain.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                Work Location / Remote availability
              </label>
              <input
                type="text"
                required
                value={contactLocation}
                onChange={(e) => setContactLocation(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="e.g. Available Remotely"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                Contact Page LinkedIn Url
              </label>
              <input
                type="url"
                required
                value={contactLinkedin}
                onChange={(e) => setContactLinkedin(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="https://linkedin.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-dark/70 mb-1.5">
                Contact Page GitHub Url
              </label>
              <input
                type="url"
                required
                value={contactGithub}
                onChange={(e) => setContactGithub(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>

        {/* Portrait Badges */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-dark/40 uppercase tracking-wider block">
            Floating Portrait Tech Badges
          </span>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark/60 mb-1">
                Badge 1 (Left Top)
              </label>
              <input
                type="text"
                value={badgeReact}
                onChange={(e) => setBadgeReact(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="React"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark/60 mb-1">
                Badge 2 (Right Bottom)
              </label>
              <input
                type="text"
                value={badgeTypeScript}
                onChange={(e) => setBadgeTypeScript(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="TypeScript"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark/60 mb-1">
                Badge 3 (Right Top)
              </label>
              <input
                type="text"
                value={badgeTailwind}
                onChange={(e) => setBadgeTailwind(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="Tailwind"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-dark/5 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3.5 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-sm transition-all shadow-md shadow-accent/15"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
