import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export type PhmNavKey =
  | 'overview'
  | 'view-area-children'
  | 'register-baby'
  | 'record-vaccination'
  | 'record-growth'
  | 'clinic-scheduling';

export const PhmSidebar: React.FC<{ activeNav?: PhmNavKey }> = ({ activeNav }) => {
  const navigate = useNavigate();
  const navClass = (key: PhmNavKey) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeNav === key ? 'bg-primary text-white' : 'text-[#4c739a] dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-slate-800'}`;

  return (
    <aside className="w-72 bg-white dark:bg-[#1a2632] border-r border-[#e7edf3] dark:border-slate-700 flex flex-col justify-between p-6 shrink-0">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <span className="material-symbols-outlined text-2xl">health_and_safety</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#0d141b] dark:text-slate-50 text-base font-bold leading-none">PHM Dashboard</h1>
            <p className="text-[#4c739a] dark:text-slate-400 text-xs mt-1">SuwaCare LK</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link to="/phm-dashboard" className={navClass('overview')}>
            <span className="material-symbols-outlined">dashboard</span>
            <p className="text-sm font-medium">Overview</p>
          </Link>
          <Link to="/view-area-children" className={navClass('view-area-children')}>
            <span className="material-symbols-outlined">groups</span>
            <p className="text-sm font-medium">View Area Children</p>
          </Link>
          <Link to="/clinic-scheduling" className={navClass('clinic-scheduling')}>
            <span className="material-symbols-outlined">local_hospital</span>
            <p className="text-sm font-medium">Clinic Scheduling</p>
          </Link>
          <Link to="/baby-registration" className={navClass('register-baby')}>
            <span className="material-symbols-outlined">person_add</span>
            <p className="text-sm font-medium">Register Baby</p>
          </Link>
          <Link to="/record-vaccination" className={navClass('record-vaccination')}>
            <span className="material-symbols-outlined">vaccines</span>
            <p className="text-sm font-medium">Record Vaccination</p>
          </Link>
          <Link to="/record-growth-data" className={navClass('record-growth')}>
            <span className="material-symbols-outlined">monitoring</span>
            <p className="text-sm font-medium">Record Growth</p>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={async () => {
            await AuthService.logout();
            navigate('/login');
          }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left w-full"
        >
          <span className="material-symbols-outlined">logout</span>
          <p className="text-sm font-medium">Logout</p>
        </button>
      </div>
    </aside>
  );
};

interface PhmLayoutProps {
  activeNav: PhmNavKey;
  children: React.ReactNode;
  showBackToDashboard?: boolean;
}

export const PhmLayout: React.FC<PhmLayoutProps> = ({
  activeNav,
  children,
  showBackToDashboard = true,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (AuthService.isPHM() && AuthService.getFirstLogin()) {
      navigate('/change-password');
    }
  }, [navigate]);
  return (
    <div className="flex min-h-screen">
      <PhmSidebar activeNav={activeNav} />
      <div className="flex-1 overflow-y-auto min-w-0 bg-slate-50 dark:bg-slate-950">
        {showBackToDashboard && (
          <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-6 pt-4">
            <button
              type="button"
              onClick={() => navigate('/phm-dashboard')}
              className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
