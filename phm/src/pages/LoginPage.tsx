import React, {useState, FormEvent} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {AuthService} from '../services/AuthService';

type ForgotPasswordStep = 'email' | 'otp' | 'reset';

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Forgot Password States
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordStep, setForgotPasswordStep] = useState<ForgotPasswordStep>('email');
    const [forgotEmail, setForgotEmail] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [forgotPasswordError, setForgotPasswordError] = useState('');
    const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('');
    const [isLoadingForgotPassword, setIsLoadingForgotPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const user = await AuthService.login(username, password);
        if (user) {
            const isPHM = AuthService.isPHM();
            const isMOH = AuthService.isMOH();
            const isFirstLogin = AuthService.getFirstLogin();
            if ((isPHM || isMOH) && isFirstLogin) {
                navigate('/change-password');
                return;
            }
            const dashboardPath = AuthService.getDashboardPath();
            navigate(dashboardPath);
        } else {
            setError('Invalid username or password. Please try again.');
            setPassword('');
        }
    };

    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
        setForgotPasswordStep('email');
        setForgotPasswordError('');
        setForgotPasswordSuccess('');
        setForgotEmail('');
        setOtpCode('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const closeForgotPassword = () => {
        setShowForgotPassword(false);
        setForgotPasswordStep('email');
        setForgotPasswordError('');
        setForgotPasswordSuccess('');
    };

    const handleSendOTP = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setForgotPasswordError('');
        setIsLoadingForgotPassword(true);

        try {
            if (!forgotEmail.trim()) {
                setForgotPasswordError('Please enter your email address');
                setIsLoadingForgotPassword(false);
                return;
            }

            const res = await AuthService.forgotPassword(forgotEmail.trim());
            if (res) {
                setForgotPasswordSuccess('OTP has been sent to your registered mobile number. Please enter it below.');
                setForgotPasswordStep('otp');
            }
        } catch (err: any) {
            setForgotPasswordError(err?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoadingForgotPassword(false);
        }
    };

    const handleVerifyOTPAndReset = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setForgotPasswordError('');
        setIsLoadingForgotPassword(true);

        try {
            if (!otpCode.trim()) {
                setForgotPasswordError('Please enter the OTP');
                setIsLoadingForgotPassword(false);
                return;
            }

            if (!newPassword) {
                setForgotPasswordError('Please enter a new password');
                setIsLoadingForgotPassword(false);
                return;
            }

            if (newPassword !== confirmPassword) {
                setForgotPasswordError('Passwords do not match');
                setIsLoadingForgotPassword(false);
                return;
            }

            if (newPassword.length < 6) {
                setForgotPasswordError('Password must be at least 6 characters');
                setIsLoadingForgotPassword(false);
                return;
            }

            const res = await AuthService.resetPassword(forgotEmail.trim(), otpCode.trim(), newPassword, confirmPassword);
            if (res) {
                setForgotPasswordSuccess('Password reset successfully! Redirecting to login...');
                setTimeout(() => {
                    closeForgotPassword();
                    setForgotEmail('');
                    setOtpCode('');
                    setNewPassword('');
                    setConfirmPassword('');
                }, 2000);
            }
        } catch (err: any) {
            setForgotPasswordError(err?.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoadingForgotPassword(false);
        }
    };

    return (
        <div className="flex w-full min-h-screen overflow-hidden">
            {/* Left Side: Visual/Hero */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-primary items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAt_GEXvmOkzvfsplaYSnzXoNx86M57EjXBZBckE2q1wqwrsWZWhycvKeMiKQzJYr8u6Ak9mpB316SFdU6MvLdU61qAH5deeF-SS4bs32HMF5qu_g7OSqAKUCLqi9ZH2Atv32GV68_XsRKOuRkU6Mtpy-BvB2n11tN-R-ub-VMeFhk_hhuZzP-76g6QhpBhpDYwcbsDvw4vKK8MNm_ABBW_vT-M0KV3syTk7KBVXMnblqo-3s8d0RTfjl4OTxcnomEvTk3GpFWu8lsg')"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10"></div>
                <div className="relative z-20 px-20 text-white">
                    <div className="mb-8">
                        <span className="material-symbols-outlined text-6xl text-white">shield_with_heart</span>
                    </div>
                    <h1 className="text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
                        Protecting the <br/>Next Generation
                    </h1>
                    <p className="text-lg font-normal leading-relaxed text-white/90 max-w-md">
                        The National Child Vaccination Management System (SuwaCare LK) provides a secure platform for
                        tracking, scheduling, and certifying vaccinations across the country.
                    </p>
                    <div className="mt-12 flex items-center gap-4">
                        <div className="h-1 w-12 bg-white rounded-full"></div>
                        <p className="text-sm font-bold tracking-wider uppercase">Ministry of Health Official Portal</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div
                className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-background-light dark:bg-background-dark px-6 py-12">
                <div className="w-full max-w-[480px]">
                    {/* Header */}
                    <div className="mb-10 px-4">
                        <div className="flex items-center gap-2 mb-6 lg:hidden">
                            <span className="material-symbols-outlined text-primary text-3xl">shield_with_heart</span>
                            <span className="font-bold text-xl text-[#0d141b] dark:text-white">SuwaCare LK</span>
                        </div>
                        <h2 className="text-[#0d141b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em]">Login
                            to Your Account</h2>
                        <p className="text-[#4c739a] dark:text-slate-400 mt-2">Welcome back. Please enter your
                            credentials to access the portal.</p>
                    </div>

                    {/* Form Fields */}
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">NIC
                                    or Email Address</p>
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] text-base font-normal leading-normal"
                                    placeholder="Enter your NIC or email"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">Password</p>
                                <div className="flex w-full flex-1 items-stretch rounded-lg">
                                    <input
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                                        placeholder="Enter your password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <div
                                        className="text-[#4c739a] flex border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark items-center justify-center pr-[15px] rounded-r-lg border-l-0 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <span
                                            className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </div>
                                </div>
                            </label>
                        </div>

                        {error && (
                            <div
                                className="px-4 py-2 mx-4 mb-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <div className="flex justify-between items-center px-4 mb-4">
                            <p
                                onClick={handleForgotPasswordClick}
                                className="text-primary text-sm font-semibold leading-normal underline cursor-pointer hover:text-primary/80 transition-colors"
                            >
                                Forgot Password?
                            </p>
                        </div>

                        <div className="px-4 py-3">
                            <button
                                className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                type="submit"
                            >
                                <span className="truncate">Sign In</span>
                            </button>
                        </div>
                    </form>

                    {/* Footer / Register Link */}
                    <div className="mt-8 px-4 text-center">
                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#cfdbe7] dark:border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-background-light dark:bg-background-dark px-2 text-[#4c739a]">New to the platform?</span>
                            </div>
                        </div>
                        <p className="text-[#4c739a] dark:text-slate-400 text-sm mt-4">
                            Don't have an account? Create one now.
                        </p>
                        <div className="mt-4">
                            <Link
                                to="/register"
                                className="flex w-full items-center justify-center rounded-lg h-12 border-2 border-primary text-primary text-sm font-bold hover:bg-primary/5 transition-colors">
                                Create Account
                            </Link>
                        </div>
                    </div>

                    {/* Legal/Gov Footer */}
                    <div className="mt-16 px-4 flex flex-col items-center gap-4">
                        <div className="flex gap-6 grayscale opacity-60">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                                <span
                                    className="material-symbols-outlined text-slate-500 text-sm">account_balance</span>
                            </div>
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                                <span
                                    className="material-symbols-outlined text-slate-500 text-sm">health_and_safety</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-center text-[#4c739a]/60 uppercase tracking-widest font-bold">
                            © 2026 Ministry of Health. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reset Password</h2>
                            <button
                                onClick={closeForgotPassword}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex gap-2 mb-6">
                            <div className={`h-1 flex-1 rounded-full ${forgotPasswordStep === 'email' || forgotPasswordStep === 'otp' || forgotPasswordStep === 'reset' ? 'bg-primary' : 'bg-slate-300'}`}></div>
                            <div className={`h-1 flex-1 rounded-full ${forgotPasswordStep === 'otp' || forgotPasswordStep === 'reset' ? 'bg-primary' : 'bg-slate-300'}`}></div>
                            <div className={`h-1 flex-1 rounded-full ${forgotPasswordStep === 'reset' ? 'bg-primary' : 'bg-slate-300'}`}></div>
                        </div>

                        {/* Error Message */}
                        {forgotPasswordError && (
                            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-red-600 dark:text-red-400 text-sm">{forgotPasswordError}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {forgotPasswordSuccess && (
                            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                <p className="text-green-600 dark:text-green-400 text-sm">{forgotPasswordSuccess}</p>
                            </div>
                        )}

                        {/* Step 1: Email */}
                        {forgotPasswordStep === 'email' && (
                            <form onSubmit={handleSendOTP} className="space-y-4">
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        Enter your email address and we'll send an OTP to your registered mobile number.
                                    </p>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={forgotEmail}
                                        onChange={(e) => setForgotEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoadingForgotPassword}
                                    className="w-full px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg font-medium transition-colors"
                                >
                                    {isLoadingForgotPassword ? 'Sending OTP...' : 'Send OTP'}
                                </button>
                            </form>
                        )}

                        {/* Step 2 & 3: OTP and Reset Password */}
                        {(forgotPasswordStep === 'otp' || forgotPasswordStep === 'reset') && (
                            <form onSubmit={handleVerifyOTPAndReset} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        OTP Code
                                    </label>
                                    <input
                                        type="text"
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="Enter 6-digit OTP"
                                        maxLength={6}
                                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
                                        required
                                    />
                                </div>

                                {forgotPasswordStep === 'reset' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                New Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="Enter new password"
                                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                                >
                                                    <span className="material-symbols-outlined text-sm">
                                                        {showNewPassword ? 'visibility_off' : 'visibility'}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                                Confirm Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Confirm new password"
                                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                                >
                                                    <span className="material-symbols-outlined text-sm">
                                                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (forgotPasswordStep === 'reset') {
                                                setForgotPasswordStep('otp');
                                                setNewPassword('');
                                                setConfirmPassword('');
                                                setForgotPasswordError('');
                                            } else {
                                                setForgotPasswordStep('email');
                                                setOtpCode('');
                                                setForgotPasswordError('');
                                            }
                                        }}
                                        className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoadingForgotPassword}
                                        onClick={() => {
                                            if (forgotPasswordStep === 'otp') {
                                                setForgotPasswordStep('reset');
                                                setForgotPasswordError('');
                                            }
                                        }}
                                        className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white rounded-lg font-medium transition-colors"
                                    >
                                        {isLoadingForgotPassword ? 'Processing...' : forgotPasswordStep === 'reset' ? 'Reset Password' : 'Verify OTP'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
