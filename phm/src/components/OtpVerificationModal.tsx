import React, { useState, FormEvent } from 'react';

interface OtpVerificationModalProps {
  isOpen: boolean;
  otpId: string;
  maskedDestination: string;
  expiresInSeconds: number;
  loading?: boolean;
  onSubmit: (otpCode: string) => Promise<void>;
  onResend: () => Promise<void>;
  onCancel: () => void;
  error?: string | null;
  title?: string;
  description?: string;
}

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  isOpen,
  otpId,
  maskedDestination,
  expiresInSeconds,
  loading = false,
  onSubmit,
  onResend,
  onCancel,
  error = null,
  title = 'Verify OTP',
  description = 'Enter the OTP code sent to your phone',
}) => {
  const [otpCode, setOtpCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(otpCode);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await onResend();
      setOtpCode('');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg max-w-md w-full shadow-lg">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <button
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>

          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
              Code sent to: <strong>{maskedDestination}</strong>
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Expires in: <strong>{expiresInSeconds}s</strong>
            </p>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">OTP Code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-center text-2xl tracking-widest font-mono"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting || loading}
              className="flex-1 px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {submitting || loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">hourglass_top</span>
                  Verifying...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  Verify
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition"
            >
              Cancel
            </button>
          </div>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full text-sm text-primary hover:text-primary/90 font-medium transition disabled:opacity-50"
          >
            {resending ? 'Resending...' : 'Resend OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

