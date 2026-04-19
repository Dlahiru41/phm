import React, {useState, FormEvent} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {AuthService} from '../services/AuthService';
import { useTranslation } from '../i18n/I18nProvider';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

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
            setError(t('login.errors.invalidCredentials'));
            setPassword('');
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
                    <h1 className="text-5xl font-black leading-tight tracking-[-0.033em] mb-6 whitespace-pre-line">
                        {t('login.heroTitle')}
                    </h1>
                    <p className="text-lg font-normal leading-relaxed text-white/90 max-w-md">
                        {t('login.heroDescription')}
                    </p>
                    <div className="mt-12 flex items-center gap-4">
                        <div className="h-1 w-12 bg-white rounded-full"></div>
                        <p className="text-sm font-bold tracking-wider uppercase">{t('login.heroTag')}</p>
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
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-[#0d141b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em]">
                                {t('login.title')}
                            </h2>
                            <LanguageSwitcher className="border border-[#cfdbe7] dark:border-slate-700 rounded-lg px-2 py-1 text-sm bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white" />
                        </div>
                        <p className="text-[#4c739a] dark:text-slate-400 mt-2">{t('login.subtitle')}</p>
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">{t('login.testCredentials')}</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">Admin: admin@moh.lk / pass | PHM: dlahiru412@outlook.com / dilshan123 | Parent: parent/parent123 | MOH: moh/moh123</p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">{t('login.usernameLabel')}</p>
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] text-base font-normal leading-normal"
                                    placeholder={t('login.usernamePlaceholder')}
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">{t('login.passwordLabel')}</p>
                                <div className="flex w-full flex-1 items-stretch rounded-lg">
                                    <input
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                                        placeholder={t('login.passwordPlaceholder')}
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
                            <label className="flex items-center gap-2 cursor-pointer">
                                 <input className="rounded border-[#cfdbe7] text-primary focus:ring-primary"
                                        type="checkbox"/>
                                 <span className="text-sm text-[#4c739a] dark:text-slate-400">{t('login.rememberMe')}</span>
                             </label>
                             <p className="text-primary text-sm font-semibold leading-normal underline cursor-pointer">{t('login.forgotPassword')}</p>
                         </div>

                        <div className="px-4 py-3">
                            <button
                                className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                                type="submit"
                            >
                                 <span className="truncate">{t('login.signIn')}</span>
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
                                 <span className="bg-background-light dark:bg-background-dark px-2 text-[#4c739a]">{t('login.newToPlatform')}</span>
                             </div>
                         </div>
                         <p className="text-[#4c739a] dark:text-slate-400 text-sm mt-4">
                             {t('login.createAccountPrompt')}
                         </p>
                        <div className="mt-4">
                            <Link
                                to="/register"
                                className="flex w-full items-center justify-center rounded-lg h-12 border-2 border-primary text-primary text-sm font-bold hover:bg-primary/5 transition-colors">
                                 {t('login.createAccount')}
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
                         <p className="text-[10px] text-center text-[#4c739a]/60 uppercase tracking-widest font-bold">{t('login.copyright')}</p>
                     </div>
                </div>
            </div>
        </div>
    );
};
