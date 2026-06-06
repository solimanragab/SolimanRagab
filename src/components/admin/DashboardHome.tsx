import { useData } from '../../context/DataContext';
import { Briefcase, Cpu, Mail, DollarSign, Calendar, ArrowRight, Shield } from 'lucide-react';

interface DashboardHomeProps {
  setActiveTab: (tab: string) => void;
}

export default function DashboardHome({ setActiveTab }: DashboardHomeProps) {
  const { data } = useData();

  const totalProjects = data.projects.length;
  const totalServices = data.services.length;
  const totalPlans = data.pricing.length;
  const unreadInquiries = data.inquiries.filter((inq) => !inq.isRead).length;
  const recentInquiries = data.inquiries.slice(0, 3);

  // Format date helper
  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-dark font-heading">
          Welcome back, Admin
        </h2>
        <p className="text-sm text-dark/60">
          Here is a quick overview of your website content and customer inquiries.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-dark/5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
            <Briefcase size={22} />
          </div>
          <div>
            <div className="text-2xl font-bold text-dark font-heading">{totalProjects}</div>
            <div className="text-xs text-dark/50 font-semibold">Projects</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-dark/5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
            <Cpu size={22} />
          </div>
          <div>
            <div className="text-2xl font-bold text-dark font-heading">{totalServices}</div>
            <div className="text-xs text-dark/50 font-semibold">Services</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-dark/5 shadow-sm flex items-center gap-4 relative">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
            <Mail size={22} />
          </div>
          <div>
            <div className="text-2xl font-bold text-dark font-heading">{unreadInquiries}</div>
            <div className="text-xs text-dark/50 font-semibold">New Messages</div>
          </div>
          {unreadInquiries > 0 && (
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          )}
        </div>

        <div className="bg-white p-5 rounded-2xl border border-dark/5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
            <DollarSign size={22} />
          </div>
          <div>
            <div className="text-2xl font-bold text-dark font-heading">{totalPlans}</div>
            <div className="text-xs text-dark/50 font-semibold">Pricing Plans</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Messages Inbox */}
        <div className="bg-white rounded-2xl border border-dark/5 shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-base sm:text-lg font-bold text-dark font-heading">
              Recent Messages
            </h3>
            <button
              onClick={() => setActiveTab('inbox')}
              className="text-xs font-semibold text-accent hover:text-accent-dark flex items-center gap-1 transition-colors"
            >
              View Inbox <ArrowRight size={14} />
            </button>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="text-center py-12 bg-cream/10 rounded-xl border border-dashed border-dark/5">
              <Mail className="mx-auto text-dark/20 mb-3" size={32} />
              <p className="text-sm font-semibold text-dark/55">No messages yet</p>
              <p className="text-xs text-dark/40 mt-1">Inquiries submitted on the contact form will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setActiveTab('inbox')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-start hover:border-accent/30 ${
                    inq.isRead
                      ? 'bg-cream/5 border-dark/5'
                      : 'bg-accent/5 border-accent/20 font-medium'
                  }`}
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-dark font-bold">{inq.name}</span>
                      {!inq.isRead && (
                        <span className="px-1.5 py-0.5 bg-accent text-cream rounded-full text-[10px] uppercase font-bold">
                          New
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-dark/50 font-medium">{inq.subject}</div>
                    <p className="text-xs text-dark/70 line-clamp-1 italic mt-1">
                      "{inq.message}"
                    </p>
                  </div>
                  <div className="text-[10px] text-dark/40 font-semibold flex items-center gap-1 whitespace-nowrap">
                    <Calendar size={10} />
                    {formatDate(inq.date)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CMS Configuration Health */}
        <div className="bg-white rounded-2xl border border-dark/5 shadow-sm p-6 space-y-5">
          <h3 className="text-base sm:text-lg font-bold text-dark font-heading">
            System Checklist
          </h3>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-olive/10 text-olive flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-dark">CMS Local Sync Active</div>
                <p className="text-xs text-dark/55 mt-0.5">Content changes automatically backup to client storage.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-olive/10 text-olive flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-dark">Portfolios Listed</div>
                <p className="text-xs text-dark/55 mt-0.5">{totalProjects} active project items currently showcased.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-olive/10 text-olive flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-dark">Services Integrated</div>
                <p className="text-xs text-dark/55 mt-0.5">{totalServices} core services visible on frontpage.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <Shield size={12} />
              </div>
              <div>
                <div className="text-sm font-semibold text-dark">Default Credentials Protected</div>
                <p className="text-xs text-dark/55 mt-0.5">Consider modifying admin password under Settings for deployment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
