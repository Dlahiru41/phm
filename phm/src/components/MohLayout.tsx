import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
    isActive
      ? 'bg-primary text-white shadow-md shadow-primary/20'
      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
  }`;

export const MohLayout: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();
  const displayName = currentUser?.name ?? currentUser?.email ?? 'MOH Officer';

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-primary">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">health_and_safety</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">
                SuwaCare LK
              </h2>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                National Child Vaccination Analytics
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/moh"
              end
              className={({ isActive }) =>
                `text-sm leading-normal py-1 ${
                  isActive
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-slate-500 dark:text-slate-400 font-medium hover:text-primary transition-colors'
                }`
              }
            >
              Overview
            </NavLink>
            <Link
              to="/moh/reports"
              className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors"
            >
              Reports
            </Link>
            <Link
              to="/moh/audit-logs"
              className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors"
            >
              Audit Logs
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-end gap-4 items-center">
          <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="text-slate-400 flex bg-slate-50 dark:bg-slate-800 items-center justify-center px-3 border-r-0">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-0 h-full placeholder:text-slate-400 text-sm"
                placeholder="Search data points..."
                value=""
                readOnly
              />
            </div>
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
            data-alt="MOH Officer profile photo"
            style={{ backgroundImage: "url('https://via.placeholder.com/150')" }}
          />
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between p-4 sticky top-[65px] h-[calc(100vh-65px)] shrink-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 px-2">
              <h1 className="text-slate-900 dark:text-white text-base font-bold">{displayName}</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Regional Medical Officer</p>
            </div>
            <nav className="flex flex-col gap-1">
              <NavLink to="/moh" end className={navLinkClass}>
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-sm font-semibold">Dashboard</span>
              </NavLink>
              <NavLink to="/moh/regional-analytics" className={navLinkClass}>
                <span className="material-symbols-outlined">bar_chart</span>
                <span className="text-sm font-medium">Regional Analytics</span>
              </NavLink>
              <NavLink to="/moh/reports" className={navLinkClass}>
                <span className="material-symbols-outlined">description</span>
                <span className="text-sm font-medium">PHM Reports</span>
              </NavLink>
              <NavLink to="/moh/audit-logs" className={navLinkClass}>
                <span className="material-symbols-outlined">history</span>
                <span className="text-sm font-medium">Audit Logs</span>
              </NavLink>
              <NavLink to="/moh/phm-management" className={navLinkClass}>
                <span className="material-symbols-outlined">groups</span>
                <span className="text-sm font-medium">PHM Management</span>
              </NavLink>
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                System Health
              </p>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-600 dark:text-slate-300">Data live: Colombo District</span>
              </div>
            </div>
            <Link
              to="/moh/reports"
              className="w-full flex items-center justify-center gap-2 rounded-lg h-11 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">ios_share</span>
              <span>Generate Report</span>
            </Link>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
