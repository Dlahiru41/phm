import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export type ParentNavKey = 'dashboard' | 'health-records' | 'notifications' | 'growth-chart' | 'settings';

export const ParentSidebar: React.FC<{ activeNav?: ParentNavKey }> = ({ activeNav }) => {
  const navigate = useNavigate();
  const navClass = (key: ParentNavKey) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeNav === key ? 'bg-primary text-white' : 'text-[#4c739a] hover:bg-primary/10'}`;
  return (
    <aside className="w-72 bg-white dark:bg-[#1a2632] border-r border-[#e7edf3] dark:border-slate-700 flex flex-col justify-between p-6 shrink-0">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-2 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl">child_care</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#0d141b] dark:text-slate-50 text-base font-bold leading-none">Parent Portal</h1>
            <p className="text-[#4c739a] dark:text-slate-400 text-xs mt-1">Vaccination Management</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <Link to="/parent-dashboard-desktop" className={navClass('dashboard')}>
            <span className="material-symbols-outlined">dashboard</span>
            <p className="text-sm font-medium">Dashboard</p>
          </Link>
          <Link to="/child-profile-schedule" className={navClass('health-records')}>
            <span className="material-symbols-outlined">history_edu</span>
            <p className="text-sm font-medium">Health Records</p>
          </Link>
          <Link to="/notifications" className={navClass('notifications')}>
            <span className="material-symbols-outlined">notifications</span>
            <p className="text-sm font-medium">Notifications</p>
          </Link>
          <Link to="/growth-chart" className={navClass('growth-chart')}>
            <span className="material-symbols-outlined">monitoring</span>
            <p className="text-sm font-medium">Growth Chart</p>
          </Link>
          <Link to="/settings" className={navClass('settings')}>
            <span className="material-symbols-outlined">settings</span>
            <p className="text-sm font-medium">Settings</p>
          </Link>
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined">help</span>
          <p className="text-sm font-medium">Help Center</p>
        </Link>
        <button
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

interface ParentLayoutProps {
  activeNav: ParentNavKey;
  children: React.ReactNode;
  showBackToDashboard?: boolean;
}

export const ParentLayout: React.FC<ParentLayoutProps> = ({
  activeNav,
  children,
  showBackToDashboard = true,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen">
      <ParentSidebar activeNav={activeNav} />
      <div className="flex-1 overflow-y-auto min-w-0 bg-background-light dark:bg-background-dark">
        {showBackToDashboard && (
          <div className="w-full max-w-4xl mx-auto px-6 pt-6">
            <button
              onClick={() => navigate('/parent-dashboard-desktop')}
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
