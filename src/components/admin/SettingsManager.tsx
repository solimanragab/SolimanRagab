import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Download, Upload, RefreshCw, Key, UserCheck, Eye, EyeOff } from 'lucide-react';

interface SettingsManagerProps {
  showToast: (msg: string) => void;
}

export default function SettingsManager({ showToast }: SettingsManagerProps) {
  const { data, updateAdminSettings, resetToDefault, importBackup } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Credentials fields
  const [username, setUsername] = useState(data.adminSettings.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentPassword !== data.adminSettings.passwordHash) {
      alert('The current password you entered is incorrect.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    if (!newPassword.trim()) {
      alert('New password cannot be empty.');
      return;
    }

    updateAdminSettings(username.trim(), newPassword.trim());
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Admin login credentials updated successfully!');
  };

  // Export CMS content as JSON backup download
  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_cms_backup_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Backup JSON file exported successfully!');
  };

  // Import JSON file reader
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const success = importBackup(parsed);
        if (success) {
          showToast('Backup imported and applied successfully!');
          setTimeout(() => {
            window.location.reload(); // Refresh to ensure all states load correctly
          }, 800);
        } else {
          alert('Import failed: JSON file structure is invalid or corrupt.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    // Reset file input value
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* General & Security */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Credentials Editor */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8">
          <div className="mb-5 border-b border-dark/5 pb-3">
            <h3 className="text-base sm:text-lg font-bold text-dark font-heading flex items-center gap-2">
              <Key size={18} className="text-accent" /> Security Credentials
            </h3>
            <p className="text-xs text-dark/50 mt-1">
              Modify the username and password required to sign in to the Admin Portal.
            </p>
          </div>

          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-dark/70 mb-1.5">
                Portal Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="Enter login username"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-dark/70 mb-1.5">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                placeholder="Required to confirm changes"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-dark/70 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                    placeholder="At least 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark/30 hover:text-dark transition-colors"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-dark/70 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/35 border border-dark/10 rounded-xl text-dark text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent focus:outline-none transition-all"
                  placeholder="Retype new password"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-cream font-semibold rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-accent/15"
              >
                Change Credentials
              </button>
            </div>
          </form>
        </div>

        {/* Backup & System Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Data Actions */}
          <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-dark font-heading flex items-center gap-2">
              <UserCheck size={18} className="text-accent" /> Data Backup & Migration
            </h3>
            <p className="text-xs text-dark/50 leading-relaxed font-normal">
              Download your complete content layouts as a JSON package to save, publish or migrate later.
            </p>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              <button
                onClick={handleExport}
                className="px-4 py-3 bg-accent hover:bg-accent-dark text-cream font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Download size={15} /> Export Site Data
              </button>

              <button
                onClick={handleImportClick}
                className="px-4 py-3 border border-dark/15 text-dark/80 hover:bg-dark/5 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all bg-white"
              >
                <Upload size={15} /> Import Backup File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </div>
          </div>

          {/* Hard Reset */}
          <div className="bg-white rounded-3xl border border-dark/5 shadow-sm p-6 sm:p-8 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-red-600 font-heading flex items-center gap-2">
              Danger Zone
            </h3>
            <p className="text-xs text-dark/50 leading-relaxed font-normal">
              Restore the original copy elements, services and plans that shipped with the template.
            </p>

            <button
              onClick={resetToDefault}
              className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <RefreshCw size={14} /> Reset Site to Factory Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
