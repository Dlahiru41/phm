import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService, UserWithDetails } from '../services/AuthService';
import { dataService } from '../services/DataService';
import { ParentLayout } from '../components/ParentLayout';
import { TranslationService } from '../services/TranslationService';
import type { Child } from '../types/models';

type TabType = 'profile' | 'password' | 'mobile' | 'children' | 'activity';

export const ParentProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserWithDetails | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Profile editing
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  // Mobile number change with OTP
  const [mobileChangeStep, setMobileChangeStep] = useState<'request' | 'verify'>('request');
  const [newMobileNumber, setNewMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [maskedDestination, setMaskedDestination] = useState('');
  const [otpExpiresIn, setOtpExpiresIn] = useState(0);

  // Password change
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Children list
  const [children, setChildren] = useState<Child[]>([]);

  // Load user profile
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const currentUser = AuthService.getCurrentUser();
        if (!cancelled && currentUser) {
          setUser(currentUser);
          setFormData({
            name: currentUser.name || '',
            email: currentUser.email || '',
            phoneNumber: currentUser.phoneNumber || '',
            address: currentUser.address || '',
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load children when tab changes
  useEffect(() => {
    if (activeTab === 'children') {
      let cancelled = false;
      (async () => {
        try {
          const res = await dataService.getChildrenByParent(user?.userId || '');
          if (!cancelled) setChildren(Array.isArray(res) ? res : (res.data || []));
        } catch {
          if (!cancelled) setChildren([]);
        }
      })();
      return () => {
        cancelled = true;
      };
    }
  }, [activeTab, user?.userId]);

  const handleProfileUpdate = async () => {
    setSaving(true);
    try {
      await AuthService.updateProfile({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });
      const updated = await AuthService.refreshProfile();
      if (updated) {
        setUser(updated);
        setEditMode(false);
        setMessage({ type: 'success', text: TranslationService.t('profile.updateSuccess') });
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: TranslationService.t('profile.updateError') });
    } finally {
      setSaving(false);
    }
  };

  const handleRequestMobileChange = async () => {
    if (!newMobileNumber.trim()) {
      setMessage({ type: 'error', text: 'Please enter a new mobile number' });
      return;
    }
    setSaving(true);
    try {
      const response = await dataService.requestMobileNumberChange(newMobileNumber);
      setMaskedDestination(response.maskedDestination);
      setOtpExpiresIn(response.expiresInSeconds);
      setOtpSent(true);
      setMobileChangeStep('verify');
      setMessage({ type: 'success', text: `OTP sent to ${response.maskedDestination}` });

      // Start countdown timer
      let remainingTime = response.expiresInSeconds;
      const timer = setInterval(() => {
        remainingTime--;
        setOtpExpiresIn(remainingTime);
        if (remainingTime <= 0) {
          clearInterval(timer);
          setOtpSent(false);
          setMobileChangeStep('request');
          setMessage({ type: 'error', text: 'OTP has expired. Please request a new one.' });
        }
      }, 1000);

      return () => clearInterval(timer);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  const handleVerifyMobileOtp = async () => {
    if (!otpCode.trim()) {
      setMessage({ type: 'error', text: TranslationService.t('forgotPassword.invalidOTP') });
      return;
    }
    if (otpCode.length !== 6) {
      setMessage({ type: 'error', text: TranslationService.t('forgotPassword.invalidOTP') });
      return;
    }
    setSaving(true);
    try {
      const response = await dataService.verifyMobileNumberChange(newMobileNumber, otpCode);
      const updated = await AuthService.refreshProfile();
      if (updated) {
        setUser(updated);
      }
      setOtpCode('');
      setNewMobileNumber('');
      setOtpSent(false);
      setMobileChangeStep('request');
      setMaskedDestination('');
      setOtpExpiresIn(0);
      setMessage({ type: 'success', text: TranslationService.t('profile.mobileUpdateSuccess') });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : TranslationService.t('profile.mobileVerifyError');
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: TranslationService.t('profile.fillAllFields') });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: TranslationService.t('profile.passwordMismatch') });
      return;
    }
    setSaving(true);
    try {
      await AuthService.changePassword(passwordForm.oldPassword, passwordForm.newPassword, passwordForm.confirmPassword);
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setMessage({ type: 'success', text: TranslationService.t('profile.passwordSuccess') });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: TranslationService.t('profile.passwordError') });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ParentLayout activeNav="profile">
        <div className="flex items-center justify-center h-96">
          <p className="text-[#4c739a]">{TranslationService.t('common.loading')}</p>
        </div>
      </ParentLayout>
    );
  }

  return (
    <ParentLayout activeNav="profile">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">
            {TranslationService.t('profile.title')}
          </h1>
          <p className="text-[#4c739a] dark:text-slate-400">
            {TranslationService.t('profile.subtitle')}
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#e7edf3] dark:border-slate-700 overflow-x-auto">
          {(['profile', 'mobile', 'password', 'children'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-[#4c739a] dark:text-slate-400 hover:text-primary'
              }`}
            >
              {tab === 'profile' && TranslationService.t('profile.details')}
              {tab === 'mobile' && TranslationService.t('profile.changeMobile')}
              {tab === 'password' && TranslationService.t('profile.changePassword')}
              {tab === 'children' && TranslationService.t('profile.linkedChildrenTab')}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8">
          {/* Profile Details Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {!editMode ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-1">
                        {TranslationService.t('profile.fullName')}
                      </p>
                      <p className="text-[#0d141b] dark:text-white text-lg font-semibold">{user?.name || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-1">
                        {TranslationService.t('profile.nic')}
                      </p>
                      <p className="text-[#0d141b] dark:text-white text-lg font-semibold">{user?.nic || '—'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-1">
                        {TranslationService.t('profile.email')}
                      </p>
                      <p className="text-[#0d141b] dark:text-white text-lg font-semibold">{user?.email || '—'}</p>
                    </div>
                    <div>
                      <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-1">
                        {TranslationService.t('profile.mobileNumber')}
                      </p>
                      <p className="text-[#0d141b] dark:text-white text-lg font-semibold">{user?.phoneNumber || '—'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-1">
                      {TranslationService.t('profile.address')}
                    </p>
                    <p className="text-[#0d141b] dark:text-white text-lg font-semibold">{user?.address || '—'}</p>
                  </div>
                    <button
                      onClick={() => setEditMode(true)}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      <span className="material-symbols-outlined">edit</span>
                      {TranslationService.t('profile.editProfile')}
                    </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-2">
                      {TranslationService.t('profile.fullName')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-[#e7edf3] dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-2">
                      {TranslationService.t('profile.email')}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-[#e7edf3] dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-2">
                      {TranslationService.t('profile.mobileNumber')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      disabled
                      className="w-full px-4 py-2 border border-[#e7edf3] dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-700 text-[#0d141b] dark:text-white opacity-60"
                    />
                    <p className="text-xs text-[#4c739a] dark:text-slate-400 mt-1">{TranslationService.t('profile.mobileChangeHint')}</p>
                  </div>
                  <div>
                    <label className="block text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-2">
                      {TranslationService.t('profile.address')}
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-[#e7edf3] dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleProfileUpdate}
                      disabled={saving}
                      className="flex-1 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {saving ? TranslationService.t('profile.saving') : TranslationService.t('common.save')}
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setFormData({
                          name: user?.name || '',
                          email: user?.email || '',
                          phoneNumber: user?.phoneNumber || '',
                          address: user?.address || '',
                        });
                      }}
                      className="flex-1 px-6 py-2 bg-slate-200 dark:bg-slate-700 text-[#0d141b] dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      {TranslationService.t('common.cancel')}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Change Mobile Tab */}
          {activeTab === 'mobile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0d141b] dark:text-white mb-4">
                  {TranslationService.t('profile.changeMobile.title')}
                </h3>
                <p className="text-[#4c739a] dark:text-slate-400 text-sm mb-6">
                  Your mobile number is protected with OTP verification for security
                </p>
              </div>

              {mobileChangeStep === 'request' && !otpSent ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-2">
                      {TranslationService.t('profile.changeMobile.enterNew')}
                    </label>
                    <input
                      type="tel"
                      value={newMobileNumber}
                      onChange={(e) => setNewMobileNumber(e.target.value)}
                      placeholder="+94XXXXXXXXX"
                      className="w-full px-4 py-2 border border-[#e7edf3] dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white"
                    />
                    <p className="text-xs text-[#4c739a] dark:text-slate-400 mt-2">Format: +94 followed by your number</p>
                  </div>
                  <button
                    onClick={handleRequestMobileChange}
                    disabled={saving}
                    className="w-full px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </div>
              ) : mobileChangeStep === 'verify' && otpSent ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      OTP sent to <strong>{maskedDestination}</strong>
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 text-xs mt-2">
                      Expires in: <strong>{otpExpiresIn} seconds</strong>
                    </p>
                  </div>
                  <div>
                    <label className="block text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-2">
                      {TranslationService.t('profile.changeMobile.enterOtp')}
                    </label>
                    <input
                      type="text"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-4 py-2 border border-[#e7edf3] dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white text-center text-2xl tracking-widest"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleVerifyMobileOtp}
                      disabled={saving || otpExpiresIn <= 0}
                      className="flex-1 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {saving ? 'Verifying...' : TranslationService.t('profile.changeMobile.verify')}
                    </button>
                    <button
                      onClick={() => {
                        setMobileChangeStep('request');
                        setOtpCode('');
                        setOtpSent(false);
                        setNewMobileNumber('');
                        setMaskedDestination('');
                        setOtpExpiresIn(0);
                      }}
                      className="flex-1 px-6 py-2 bg-slate-200 dark:bg-slate-700 text-[#0d141b] dark:text-white rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      {TranslationService.t('common.cancel')}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* Change Password Tab */}
          {activeTab === 'password' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#0d141b] dark:text-white">{TranslationService.t('profile.changePassword')}</h3>
              <div>
                <label className="block text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-2">
                  {TranslationService.t('profile.oldPassword')}
                </label>
                <input
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e7edf3] dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-2">
                  {TranslationService.t('profile.newPassword')}
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e7edf3] dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[#4c739a] dark:text-slate-400 text-sm font-medium mb-2">
                  {TranslationService.t('profile.confirmPassword')}
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border border-[#e7edf3] dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                disabled={saving}
                className="w-full px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving ? TranslationService.t('profile.saving') : TranslationService.t('profile.changePassword')}
              </button>
            </div>
          )}

          {/* Linked Children Tab */}
          {activeTab === 'children' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-[#0d141b] dark:text-white mb-4">
                {TranslationService.t('profile.linkedChildren')}
              </h3>
              {children.length === 0 ? (
                <div className="text-center py-12">
                  <span className="material-symbols-outlined text-5xl text-[#4c739a] dark:text-slate-400 mb-4 block">
                    child_care
                  </span>
                  <p className="text-[#4c739a] dark:text-slate-400">
                    {TranslationService.t('profile.noLinkedChildren')}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {children.map((child) => (
                    <div
                      key={child.childId}
                      className="p-4 border border-[#e7edf3] dark:border-slate-600 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-[#0d141b] dark:text-white">
                          {child.firstName} {child.lastName}
                        </p>
                        <p className="text-sm text-[#4c739a] dark:text-slate-400">
                          Registration: {child.registrationNumber}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ParentLayout>
  );
};

