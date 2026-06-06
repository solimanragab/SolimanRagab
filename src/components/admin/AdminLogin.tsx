import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lock, User, Eye, EyeOff, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const { data } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulate small latency for realistic loading experience
    setTimeout(() => {
      const targetUser = data.adminSettings.username;
      const targetPass = data.adminSettings.passwordHash;

      if (username === targetUser && password === targetPass) {
        onLogin();
      } else {
        setError('Invalid username or password. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] flex items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#3AAFB9]/10 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#90A955]/10 blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <a
          href="#home"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-dark/50 hover:text-accent mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Landing Page
        </a>

        {/* Card Panel */}
        <div className="bg-white rounded-3xl border border-dark/5 shadow-2xl p-8 sm:p-10 backdrop-blur-sm bg-white/95">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3AAFB9]/10 text-accent mb-4">
              <ShieldCheck size={36} className="animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-dark">
              Admin Portal
            </h1>
            <p className="text-sm text-dark/50 mt-1">
              Sign in to manage your website content.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-start gap-2.5 text-sm border border-red-100 animate-shake">
                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-dark/70 mb-1.5"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-dark/30">
                  <User size={18} />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-cream/30 border border-dark/10 rounded-xl text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm"
                  placeholder="Enter username"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-dark/70 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-dark/30">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-cream/30 border border-dark/10 rounded-xl text-dark placeholder:text-dark/30 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-sm"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark/40 hover:text-dark transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl transition-all duration-300 shadow-md shadow-accent/15 focus:outline-none focus:ring-2 focus:ring-accent/40 active:scale-[0.99] flex justify-center items-center ${
                loading ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Quick Info Box */}
          <div className="mt-8 p-4 bg-accent/5 rounded-2xl border border-accent/10 text-center">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1">
              Demo Credentials
            </span>
            <code className="text-xs text-dark/70 bg-white px-2 py-0.5 rounded border border-dark/5 shadow-sm">
              username: <span className="font-bold">admin</span> / password: <span className="font-bold">admin123</span>
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
