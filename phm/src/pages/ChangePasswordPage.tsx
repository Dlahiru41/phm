import React, { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { TranslationService } from '../services/TranslationService';
import type { ApiError } from '../services/apiClient';

export const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!AuthService.isLoggedIn()) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError(TranslationService.t('forgotPassword.passwordTooShort'));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(TranslationService.t('forgotPassword.passwordMismatch'));
      return;
    }

    setLoading(true);
    try {
      await AuthService.changePassword(oldPassword, newPassword, confirmPassword);
      setSuccess(TranslationService.t('profile.passwordSuccess'));
      setTimeout(() => {
        const dashboardPath = AuthService.getDashboardPath();
        navigate(dashboardPath);
      }, 1500);
    } catch (err) {
      const apiErr = err as ApiError;
      setError(apiErr?.message || TranslationService.t('profile.passwordError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAt_GEXvmOkzvfsplaYSnzXoNx86M57EjXBZBckE2q1wqwrsWZWhycvKeMiKQzJYr8u6Ak9mpB316SFdU6MvLdU61qAH5deeF-SS4bs32HMF5qu_g7OSqAKUCLqi9ZH2Atv32GV68_XsRKOuRkU6Mtpy-BvB2n11tN-R-ub-VMeFhk_hhuZzP-76g6QhpBhpDYwcbsDvw4vKK8MNm_ABBW_vT-M0KV3syTk7KBVXMnblqo-3s8d0RTfjl4OTxcnomEvTk3GpFWu8lsg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10"></div>
        <div className="relative z-20 px-20 text-white">
          <div className="mb-8">
            <span className="material-symbols-outlined text-6xl text-white">lock_reset</span>
          </div>
          <h1 className="text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
            {TranslationService.t('login.hero.title').split(' ').slice(0, 2).join(' ')}<br/>{TranslationService.t('login.hero.title').split(' ').slice(2).join(' ')}
          </h1>
          <p className="text-lg font-normal leading-relaxed text-white/90 max-w-md">
            As a Public Health Midwife, please change your temporary password to complete your first login and keep
            children&apos;s health data secure.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-[480px]">
          <div className="mb-10 px-4">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <span className="material-symbols-outlined text-primary text-3xl">shield_with_heart</span>
              <span className="font-bold text-xl text-[#0d141b] dark:text-white">{TranslationService.t('app.title')}</span>
            </div>
            <h2 className="text-[#0d141b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
              {TranslationService.t('profile.changePassword')}
            </h2>
            <p className="text-[#4c739a] dark:text-slate-400 mt-2">
              {TranslationService.t('profile.passwordChangeHint')}
            </p>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                For security, PHM accounts must change their temporary password on first login.
              </p>
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="px-4">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">
                  {TranslationService.t('profile.oldPassword')}
                </p>
                <div className="flex w-full items-stretch rounded-lg">
                  <input
                    className="flex w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal"
                    placeholder={TranslationService.t('profile.enterCurrentPassword')}
                    type={showOld ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <div
                    className="text-[#4c739a] flex border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark items-center justify-center pr-[15px] rounded-r-lg border-l-0 cursor-pointer"
                    onClick={() => setShowOld(!showOld)}
                  >
                    <span className="material-symbols-outlined">{showOld ? 'visibility_off' : 'visibility'}</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="px-4">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">{TranslationService.t('profile.newPassword')}</p>
                <div className="flex w-full items-stretch rounded-lg">
                  <input
                    className="flex w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal"
                    placeholder={TranslationService.t('profile.enterNewPassword')}
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <div
                    className="text-[#4c739a] flex border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark items-center justify-center pr-[15px] rounded-r-lg border-l-0 cursor-pointer"
                    onClick={() => setShowNew(!showNew)}
                  >
                    <span className="material-symbols-outlined">{showNew ? 'visibility_off' : 'visibility'}</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="px-4">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">
                  {TranslationService.t('profile.confirmPassword')}
                </p>
                <div className="flex w-full items-stretch rounded-lg">
                  <input
                    className="flex w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal"
                    placeholder={TranslationService.t('profile.reEnterNewPassword')}
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div
                    className="text-[#4c739a] flex border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark items-center justify-center pr-[15px] rounded-r-lg border-l-0 cursor-pointer"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    <span className="material-symbols-outlined">{showConfirm ? 'visibility_off' : 'visibility'}</span>
                  </div>
                </div>
              </label>
            </div>

            {error && (
              <div className="px-4 py-2 mx-4 mb-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}
            {success && (
              <div className="px-4 py-2 mx-4 mb-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-700 dark:text-green-300 text-sm font-medium">{success}</p>
              </div>
            )}

            <div className="px-4 py-3">
              <button
                className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
                type="submit"
                disabled={loading}
              >
                <span className="truncate">{loading ? TranslationService.t('profile.updating') : TranslationService.t('profile.updatePassword')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

