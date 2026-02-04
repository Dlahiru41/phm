import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });
  const [saved, setSaved] = useState(false);

  const languages = [
    { value: 'english', label: 'English', flag: '🇬🇧' },
    { value: 'sinhala', label: 'සිංහල', flag: '🇱🇰' },
    { value: 'tamil', label: 'தமிழ்', flag: '🇱🇰' }
  ];

  const handleSave = () => {
    // In a real app, this would save settings to backend
    localStorage.setItem('language', language);
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.setItem('notifications', JSON.stringify(notifications));
    
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">Settings</h1>
          <p className="text-[#4c739a] dark:text-slate-400">Manage your SuwaCare LK account settings and preferences.</p>
        </div>

        <div className="space-y-6">
          {/* Language Settings */}
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">language</span>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Language Settings</h2>
            </div>
            <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-4">Select your preferred language for the interface.</p>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                    language === lang.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-[#cfdbe7] dark:border-slate-700 text-[#0d141b] dark:text-white hover:border-primary/50'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">palette</span>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Appearance</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#0d141b] dark:text-white mb-1">Dark Mode</p>
                <p className="text-xs text-[#4c739a] dark:text-slate-400">Switch between light and dark themes</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  darkMode ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">notifications</span>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Notification Preferences</h2>
            </div>
            <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-4">Choose how you want to receive notifications.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0d141b] dark:text-white mb-1">Email Notifications</p>
                  <p className="text-xs text-[#4c739a] dark:text-slate-400">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications.email ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      notifications.email ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0d141b] dark:text-white mb-1">SMS Notifications</p>
                  <p className="text-xs text-[#4c739a] dark:text-slate-400">Receive notifications via SMS</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications.sms ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      notifications.sms ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0d141b] dark:text-white mb-1">Push Notifications</p>
                  <p className="text-xs text-[#4c739a] dark:text-slate-400">Receive push notifications in browser</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications.push ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      notifications.push ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Account</h2>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <span className="material-symbols-outlined">logout</span>
                Log Out
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              {saved ? (
                <>
                  <span className="material-symbols-outlined">check</span>
                  Settings Saved!
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">save</span>
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
