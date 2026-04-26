import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/DataService';
import { TranslationService } from '../services/TranslationService';
import type { Child } from '../types/models';
import { ParentLayout } from '../components/ParentLayout';
import type { ApiError } from '../services/apiClient';

type LinkStep = 'search' | 'confirm' | 'otp' | 'linked';

function messageForOtpError(
  code: string | undefined,
  statusCode: number | undefined,
  fallbackMessage: string
): string {
  const c = code?.toUpperCase?.() ?? '';
  if (c === 'INVALID_OTP') return TranslationService.t('addChild.errorOtpInvalid');
  if (c === 'EXPIRED' || statusCode === 410) return TranslationService.t('addChild.errorOtpExpired');
  if (c === 'MAX_ATTEMPTS_REACHED' || statusCode === 429) return TranslationService.t('addChild.errorOtpMaxAttempts');
  if (c === 'ALREADY_CONSUMED' || statusCode === 409) return TranslationService.t('addChild.errorAlreadyConsumed');
  if (statusCode === 404) return TranslationService.t('addChild.errorNotFound');
  if (statusCode === 400) return TranslationService.t('addChild.errorOtpInvalid');
  return fallbackMessage;
}

export const AddChildPage: React.FC = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [error, setError] = useState('');
  const [childInfo, setChildInfo] = useState<Child | null>(null);
  const [step, setStep] = useState<LinkStep>('search');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpMeta, setOtpMeta] = useState<{ expires_at?: string; attempt_count?: number; max_attempts?: number }>({});
  const navigate = useNavigate();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setChildInfo(null);
    const trimmed = registrationNumber.trim();
    if (!trimmed) {
      setError(TranslationService.t('addChild.regNumLabel'));
      return;
    }
    setLoading(true);
    try {
      const child = await dataService.searchChildByRegistration(trimmed);
      if (child) {
        setChildInfo(child);
        setStep('confirm');
      } else {
        setError(TranslationService.t('addChild.errorNoChild'));
      }
    } catch {
      setError(TranslationService.t('addChild.errorSearch'));
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!childInfo) return;
    const regNum = registrationNumber.trim();
    if (!regNum) {
      setError(TranslationService.t('addChild.regNumLabel'));
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await dataService.requestLinkOtp(childInfo.childId, {
        registrationNumber: regNum,
      }) as { expires_at?: string; attempt_count?: number; max_attempts?: number };
      if (res) {
        setOtpMeta({
          expires_at: res.expires_at,
          attempt_count: res.attempt_count,
          max_attempts: res.max_attempts,
        });
      }
      setStep('otp');
      setOtp('');
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setError(apiErr?.message ?? TranslationService.t('addChild.errorSearch'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!childInfo) return;
    const code = otp.trim();
    const regNum = registrationNumber.trim();
    if (!code) {
      setError(TranslationService.t('addChild.otpText'));
      return;
    }
    if (!regNum) {
      setError(TranslationService.t('addChild.regNumLabel'));
      return;
    }
    setError('');
    setLoading(true);
    try {
      await dataService.verifyLinkOtp(childInfo.childId, {
        registrationNumber: regNum,
        otpCode: code,
      });
      setStep('linked');
      window.dispatchEvent(new CustomEvent('children:linked'));
      navigate('/parent-dashboard-desktop');
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      const message = messageForOtpError(
        apiErr?.code,
        apiErr?.statusCode,
        apiErr?.message ?? TranslationService.t('addChild.errorOtpInvalid')
      );
      setError(message);
      const codeUpper = apiErr?.code?.toUpperCase?.() ?? '';
      if (
        codeUpper === 'MAX_ATTEMPTS_REACHED' ||
        codeUpper === 'ALREADY_CONSUMED' ||
        apiErr?.statusCode === 429 ||
        apiErr?.statusCode === 409
      ) {
        setStep('confirm');
        setOtp('');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackFromConfirm = () => {
    setStep('search');
    setChildInfo(null);
    setRegistrationNumber('');
    setError('');
  };

  const handleBackFromOtp = () => {
    setStep('confirm');
    setOtp('');
    setError('');
  };

  const childName =
    childInfo && (childInfo.firstName || childInfo.lastName)
      ? `${childInfo.firstName ?? ''} ${childInfo.lastName ?? ''}`.trim() || '—'
      : '—';
  const rawDob = childInfo?.dateOfBirth;
  const dobDate = rawDob != null ? new Date(rawDob as string | number | Date) : null;
  const childDob = dobDate != null && !isNaN(dobDate.getTime()) ? dobDate.toLocaleDateString() : '—';
  const childGender = childInfo?.gender ? (String(childInfo.gender) === 'female' ? 'Female' : 'Male') : '—';

  const childSummaryBlock = childInfo && (
    <div className="bg-[#f0f9ff] dark:bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Child Name:</span>
          <span className="text-base font-bold text-[#0d141b] dark:text-white">{childName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Date of Birth:</span>
          <span className="text-base font-bold text-[#0d141b] dark:text-white">{childDob}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Gender:</span>
          <span className="text-base font-bold text-[#0d141b] dark:text-white">{childGender}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Registration Number:</span>
          <span className="text-base font-bold text-primary">{childInfo.registrationNumber || registrationNumber}</span>
        </div>
      </div>
    </div>
  );

  const errorBlock = error && (
    <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
      <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
    </div>
  );

  const attemptExpiryBlock =
    step === 'otp' &&
    (otpMeta.attempt_count != null || otpMeta.max_attempts != null || otpMeta.expires_at) && (
      <div className="mb-4 text-sm text-[#4c739a] dark:text-slate-400">
        {otpMeta.attempt_count != null && otpMeta.max_attempts != null && (
          <p>{TranslationService.t('addChild.attempts').replace('{count}', String(otpMeta.attempt_count)).replace('{total}', String(otpMeta.max_attempts))}</p>
        )}
        {otpMeta.expires_at && (
          <p>{TranslationService.t('addChild.codeExpires').replace('{time}', new Date(otpMeta.expires_at).toLocaleString())}</p>
        )}
      </div>
    );

  let content: React.ReactNode;

  if (step === 'confirm' && childInfo) {
    content = (
      <div className="w-full max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-lg">
          <div className="text-center mb-8">
            <span className="material-symbols-outlined text-6xl text-green-500 block mb-6">check_circle</span>
            <h2 className="text-3xl font-bold text-[#0d141b] dark:text-white mb-2">{TranslationService.t('addChild.foundTitle')}</h2>
            <p className="text-[#4c739a] dark:text-slate-400">{TranslationService.t('addChild.foundText')}</p>
          </div>
          {errorBlock}
          {childSummaryBlock}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBackFromConfirm}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-70"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              {TranslationService.t('common.back')}
            </button>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
            >
              <span className="material-symbols-outlined">sms</span>
              {loading ? TranslationService.t('addChild.searching') : TranslationService.t('addChild.sendOtp')}
            </button>
          </div>
        </div>
      </div>
    );
  } else if (step === 'otp' && childInfo) {
    content = (
      <div className="w-full max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-2">{TranslationService.t('addChild.otpTitle')}</h2>
            <p className="text-[#4c739a] dark:text-slate-400 text-sm">
              {TranslationService.t('addChild.otpText')}
            </p>
          </div>
          {errorBlock}
          {attemptExpiryBlock}
          <div className="mb-6">
            <label className="flex flex-col">
              <p className="text-[#0d141b] dark:text-white text-base font-medium mb-2">{TranslationService.t('addChild.otpTitle')} *</p>
              <input
                className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 px-4 text-base font-normal tracking-widest"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
              />
            </label>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBackFromOtp}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-70"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              {TranslationService.t('common.back')}
            </button>
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
            >
              <span className="material-symbols-outlined">check</span>
              {loading ? TranslationService.t('profile.verifying') : TranslationService.t('addChild.verifyBtn')}
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="text-primary text-sm font-medium hover:underline"
            >
              {TranslationService.t('addChild.resendCode')}
            </button>
          </div>
        </div>
      </div>
    );
  } else if (step === 'linked') {
    content = (
      <div className="w-full max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-lg text-center">
          <span className="material-symbols-outlined text-6xl text-green-500 block mb-4">check_circle</span>
          <h2 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">{TranslationService.t('addChild.successTitle')}</h2>
          <p className="text-[#4c739a] dark:text-slate-400">{TranslationService.t('addChild.redirecting')}</p>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="w-full max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate('/parent-dashboard-desktop')}
            className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">{TranslationService.t('common.backToDashboard')}</span>
          </button>
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">{TranslationService.t('addChild.title')}</h1>
          <p className="text-[#4c739a] dark:text-slate-400">
            {TranslationService.t('addChild.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-sm">
          <div className="mb-6">
            <label className="flex flex-col">
              <p className="text-[#0d141b] dark:text-white text-base font-medium mb-2">{TranslationService.t('addChild.regNumLabel')} *</p>
              <input
                className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 px-4 text-base font-normal"
                type="text"
                placeholder={TranslationService.t('addChild.regNumPlaceholder')}
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                autoCapitalize="off"
                autoComplete="off"
                style={{ textTransform: 'none' }}
                required
              />
              <p className="text-xs text-[#4c739a] dark:text-slate-400 mt-2">
                {TranslationService.t('addChild.formatHint')}
              </p>
            </label>
          </div>

          {errorBlock}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">info</span>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">{TranslationService.t('addChild.whereToFind')}</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  {TranslationService.t('addChild.whereToFindText')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/parent-dashboard-desktop')}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {TranslationService.t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
            >
              <span className="material-symbols-outlined">search</span>
              {loading ? TranslationService.t('addChild.searching') : TranslationService.t('addChild.searchBtn')}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <ParentLayout activeNav="dashboard" showBackToDashboard={false}>
      {content}
    </ParentLayout>
  );
};
