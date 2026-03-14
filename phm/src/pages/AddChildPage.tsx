import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/DataService';
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
  if (c === 'INVALID_OTP') return 'The code you entered is incorrect. Please check and try again.';
  if (c === 'EXPIRED' || statusCode === 410) return 'This verification code has expired. Please request a new code.';
  if (c === 'MAX_ATTEMPTS_REACHED' || statusCode === 429) return 'Maximum verification attempts reached. Please request a new code.';
  if (c === 'ALREADY_CONSUMED' || statusCode === 409) return 'This code has already been used. The child may already be linked to your account.';
  if (statusCode === 404) return 'Child or OTP session not found. Please start again.';
  if (statusCode === 400) return 'Invalid code or request. Please check and try again.';
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
      setError('Please enter a registration number.');
      return;
    }
    setLoading(true);
    try {
      const child = await dataService.searchChildByRegistration(trimmed);
      if (child) {
        setChildInfo(child);
        setStep('confirm');
      } else {
        setError('No child found with this registration number. Please check and try again.');
      }
    } catch {
      setError('Unable to search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!childInfo) return;
    const regNum = registrationNumber.trim();
    if (!regNum) {
      setError('Please enter a registration number.');
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
      setError(apiErr?.message ?? 'Could not send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!childInfo) return;
    const code = otp.trim();
    const regNum = registrationNumber.trim();
    if (!code) {
      setError('Please enter the verification code sent to your WhatsApp.');
      return;
    }
    if (!regNum) {
      setError('Registration number missing. Please start again.');
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
        apiErr?.message ?? 'Verification failed. Please try again.'
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
          <p>Attempts: {otpMeta.attempt_count} of {otpMeta.max_attempts}</p>
        )}
        {otpMeta.expires_at && (
          <p>Code expires: {new Date(otpMeta.expires_at).toLocaleString()}</p>
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
            <h2 className="text-3xl font-bold text-[#0d141b] dark:text-white mb-2">Child Found!</h2>
            <p className="text-[#4c739a] dark:text-slate-400">Request a verification code to be sent to the parent WhatsApp number on file.</p>
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
              Back
            </button>
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
            >
              <span className="material-symbols-outlined">sms</span>
              {loading ? 'Sending…' : 'Send verification code'}
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
            <h2 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-2">Enter verification code</h2>
            <p className="text-[#4c739a] dark:text-slate-400 text-sm">
              We sent a code to the parent WhatsApp number on file for this child.
            </p>
          </div>
          {errorBlock}
          {attemptExpiryBlock}
          <div className="mb-6">
            <label className="flex flex-col">
              <p className="text-[#0d141b] dark:text-white text-base font-medium mb-2">Verification code *</p>
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
              Back
            </button>
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
            >
              <span className="material-symbols-outlined">check</span>
              {loading ? 'Verifying…' : 'Verify & link child'}
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="text-primary text-sm font-medium hover:underline"
            >
              Resend code
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
          <h2 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Child linked successfully</h2>
          <p className="text-[#4c739a] dark:text-slate-400">Redirecting to dashboard…</p>
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
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">Add Child to Account</h1>
          <p className="text-[#4c739a] dark:text-slate-400">
            Enter the registration number provided by the PHM to link a child to your account. You will verify ownership via WhatsApp OTP.
          </p>
        </div>

        <form onSubmit={handleSearch} className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-sm">
          <div className="mb-6">
            <label className="flex flex-col">
              <p className="text-[#0d141b] dark:text-white text-base font-medium mb-2">Registration Number *</p>
              <input
                className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 px-4 text-base font-normal"
                type="text"
                placeholder="NCVMS-YYYY-MMDD-XXXX"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                autoCapitalize="off"
                autoComplete="off"
                style={{ textTransform: 'none' }}
                required
              />
              <p className="text-xs text-[#4c739a] dark:text-slate-400 mt-2">
                Format: NCVMS-YYYY-MMDD-XXXX (e.g., NCVMS-2024-0815-1234)
              </p>
            </label>
          </div>

          {errorBlock}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">info</span>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">Where to find your registration number?</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  The registration number is provided by the Public Health Midwife (PHM) when your child is registered in the system.
                  It should be in the format shown above. Linking is verified by a code sent to your WhatsApp number.
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
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-70"
            >
              <span className="material-symbols-outlined">search</span>
              {loading ? 'Searching…' : 'Search Child'}
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
