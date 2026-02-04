import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="material-symbols-outlined text-primary text-5xl">shield_with_heart</span>
          <h1 className="text-4xl font-black text-[#0d141b] dark:text-white">SuwaCare LK</h1>
        </div>
        <p className="text-xl text-[#4c739a] dark:text-slate-400">National Child Vaccination Management System</p>
        <p className="text-sm text-[#4c739a] dark:text-slate-400 mt-2">Frontend Pages Navigation</p>
        <div className="mt-6 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white mb-4">Test User Flows</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-2">👤 Parent</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Username: parent</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Password: parent123</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm font-bold text-green-700 dark:text-green-300 mb-2">👩‍⚕️ PHM (Midwife)</p>
                <p className="text-xs text-green-600 dark:text-green-400 mb-1">Username: phm</p>
                <p className="text-xs text-green-600 dark:text-green-400">Password: phm123</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-2">🏛️ MOH Officer</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Username: moh</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Password: moh123</p>
              </div>
            </div>
            <Link
              to="/login"
              className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              <span className="material-symbols-outlined">login</span>
              Go to Login
            </Link>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Link to="/login" className="page-card bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">login</span>
              </div>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Login & Authentication</h2>
            </div>
            <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-4">User login page with authentication form</p>
            <div className="flex items-center text-primary text-sm font-semibold">
              <span>View Page</span>
              <span className="material-symbols-outlined text-lg ml-2">arrow_forward</span>
            </div>
          </Link>
          
          <Link to="/parent-dashboard-desktop" className="page-card bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">dashboard</span>
              </div>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Parent Dashboard (Desktop)</h2>
            </div>
            <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-4">Desktop view of parent dashboard with children overview</p>
            <div className="flex items-center text-primary text-sm font-semibold">
              <span>View Page</span>
              <span className="material-symbols-outlined text-lg ml-2">arrow_forward</span>
            </div>
          </Link>
          
          <Link to="/parent-dashboard-mobile" className="page-card bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">phone_iphone</span>
              </div>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Parent Dashboard (Mobile)</h2>
            </div>
            <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-4">Mobile-responsive parent dashboard view</p>
            <div className="flex items-center text-primary text-sm font-semibold">
              <span>View Page</span>
              <span className="material-symbols-outlined text-lg ml-2">arrow_forward</span>
            </div>
          </Link>
          
          <Link to="/phm-dashboard" className="page-card bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">health_and_safety</span>
              </div>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">PHM Dashboard</h2>
            </div>
            <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-4">Public Health Midwife dashboard for managing children</p>
            <div className="flex items-center text-primary text-sm font-semibold">
              <span>View Page</span>
              <span className="material-symbols-outlined text-lg ml-2">arrow_forward</span>
            </div>
          </Link>
          
          <Link to="/child-profile-schedule" className="page-card bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">child_care</span>
              </div>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Child Profile & Schedule</h2>
            </div>
            <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-4">Individual child profile with vaccination schedule</p>
            <div className="flex items-center text-primary text-sm font-semibold">
              <span>View Page</span>
              <span className="material-symbols-outlined text-lg ml-2">arrow_forward</span>
            </div>
          </Link>
          
          <Link to="/growth-chart" className="page-card bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">monitoring</span>
              </div>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">Growth Chart View</h2>
            </div>
            <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-4">WHO growth standards chart and measurements</p>
            <div className="flex items-center text-primary text-sm font-semibold">
              <span>View Page</span>
              <span className="material-symbols-outlined text-lg ml-2">arrow_forward</span>
            </div>
          </Link>
          
          <Link to="/moh-analytics-dashboard" className="page-card bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">analytics</span>
              </div>
              <h2 className="text-lg font-bold text-[#0d141b] dark:text-white">MOH Analytics Dashboard</h2>
            </div>
            <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-4">Ministry of Health officer analytics and reporting</p>
            <div className="flex items-center text-primary text-sm font-semibold">
              <span>View Page</span>
              <span className="material-symbols-outlined text-lg ml-2">arrow_forward</span>
            </div>
          </Link>
        </div>

        <footer className="mt-16 text-center">
          <p className="text-sm text-[#4c739a] dark:text-slate-400">
            © 2026 Ministry of Health. All Rights Reserved.
          </p>
        </footer>
    </div>
  );
};
