import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/apiClient';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'parent' as 'parent' | 'phm' | 'moh'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', {
        fullName: formData.fullName,
        nic: formData.nic,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.userType,
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err?.message || 'Registration failed. Email or NIC may already be registered.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (success) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center bg-background-light dark:bg-background-dark px-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-6">
            <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-2">Registration Successful!</h2>
          <p className="text-[#4c739a] dark:text-slate-400 mb-6">Your account has been created. Redirecting to login...</p>
        </div>
      </div>
    );
  }

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
            Join SuwaCare LK <br/>Protect Our Future
          </h1>
          <p className="text-lg font-normal leading-relaxed text-white/90 max-w-md">
            Create your account to access vaccination management services and keep track of your children's health records.
          </p>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-background-light dark:bg-background-dark px-6 py-12">
        <div className="w-full max-w-[480px]">
          <div className="mb-10 px-4">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <span className="material-symbols-outlined text-primary text-3xl">shield_with_heart</span>
              <span className="font-bold text-xl text-[#0d141b] dark:text-white">SuwaCare LK</span>
            </div>
            <h2 className="text-[#0d141b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em]">Create Your Account</h2>
            <p className="text-[#4c739a] dark:text-slate-400 mt-2">Register to access the vaccination management system.</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {loading && <p className="text-sm text-primary">Creating account...</p>}
            <div className="px-4">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">User Type</p>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 px-[15px] text-base font-normal"
                  required
                >
                  <option value="parent">Parent</option>
                  <option value="phm">Public Health Midwife (PHM)</option>
                  <option value="moh">MOH Officer</option>
                </select>
              </label>
            </div>

            <div className="px-4">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">Full Name</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] text-base font-normal"
                  placeholder="Enter your full name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="px-4">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">NIC Number</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] text-base font-normal"
                  placeholder="Enter your NIC number"
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="px-4">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">Email Address</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] text-base font-normal"
                  placeholder="Enter your email address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="px-4">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">Phone Number</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] text-base font-normal"
                  placeholder="Enter your phone number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="px-4">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">Password</p>
                <div className="flex w-full items-stretch rounded-lg">
                  <input
                    className="flex w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal"
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div
                    className="text-[#4c739a] flex border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark items-center justify-center pr-[15px] rounded-r-lg border-l-0 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="px-4">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal pb-2">Confirm Password</p>
                <div className="flex w-full items-stretch rounded-lg">
                  <input
                    className="flex w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#4c739a] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal"
                    placeholder="Confirm your password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <div
                    className="text-[#4c739a] flex border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark items-center justify-center pr-[15px] rounded-r-lg border-l-0 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <span className="material-symbols-outlined">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                  </div>
                </div>
              </label>
            </div>

            {error && (
              <div className="px-4 py-2 mx-4 mb-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="px-4 py-3">
              <button
                className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                type="submit"
              >
                <span className="truncate">Create Account</span>
              </button>
            </div>
          </form>

          <div className="mt-8 px-4 text-center">
            <p className="text-[#4c739a] dark:text-slate-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
