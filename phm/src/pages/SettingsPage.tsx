import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { api } from '../services/apiClient';
import { TranslationService, type Language } from '../services/TranslationService';
import { ParentLayout } from '../components/ParentLayout';
import { PhmLayout } from '../components/PhmLayout';

const langToCode: Record<string, Language> = { english: 'en', sinhala: 'si', tamil: 'ta' };
const codeToLang: Record<Language, string> = { en: 'english', si: 'sinhala', ta: 'tamil' };

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const isParent = AuthService.isParent();
  const isPHM = AuthService.isPHM();
  const [language, setLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const user = await AuthService.refreshProfile();
        if (cancelled || !user) return;
        const pref = (user.languagePreference || 'en').toLowerCase() as Language;
        const lang = codeToLang[pref] || 'english';
        setLanguage(lang);
        TranslationService.setLanguage(pref);
      } catch {
        // keep defaults
      }
    })();
    const storedDark = localStorage.getItem('darkMode') === 'true';
    const storedNotif = localStorage.getItem('notifications');
    setDarkMode(storedDark);
    if (storedNotif) {
      try {
        setNotifications(JSON.parse(storedNotif));
      } catch {}
    }
    return () => {
      cancelled = true;
    };
  }, []);

  const languages = [
    { value: 'english', label: 'English', flag: '🇬🇧' },
    { value: 'sinhala', label: 'සිංහල', flag: '🇱🇰' },
    { value: 'tamil', label: 'தமிழ்', flag: '🇱🇰' }
  ];

  const handleSave = async () => {
    localStorage.setItem('language', language);
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.setItem('notifications', JSON.stringify(notifications));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Update TranslationService
    const langCode = langToCode[language] || 'en';
    TranslationService.setLanguage(langCode);

    setLoading(true);
    try {
      await api.put('/users/me/settings', {
        languagePreference: langCode,
        notifications: { email: notifications.email, sms: notifications.sms, push: notifications.push },
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    navigate('/login');
  };

  const content = (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        {!isParent && !isPHM && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back</span>
          </button>
        )}
        <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">Settings</h1>
        <p className="text-[#4c739a] dark:text-slate-400">Manage your SuwaCare LK account settings and preferences.</p>
        {isParent && (
          <Link
            to="/parent-profile"
            className="inline-flex items-center gap-2 text-primary text-sm font-medium mt-4 hover:underline"
          >
            <span className="material-symbols-outlined">person</span>
            Go to Profile Management
          </Link>
        )}
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
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
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
  );

  if (isParent) {
    return (
      <ParentLayout activeNav="settings">
        {content}
      </ParentLayout>
    );
  }

  if (isPHM) {
    return (
      <PhmLayout activeNav="settings" showBackToDashboard={true}>
        {content}
      </PhmLayout>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {content}
    </div>
  );
};
