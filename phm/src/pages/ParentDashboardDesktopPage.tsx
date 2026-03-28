import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { dataService } from '../services/DataService';
import type { VaccinationRecord } from '../types/models';

type ParentDashboardChild = {
    childId: string;
    name: string;
    age: string;
    nextVaccinationDate: string | null;
    nextVaccineName: string | null;
    vaccinationStatus: string;
    upcomingCount: number;
    missedCount: number;
};

type ParentDashboard = {
    children: ParentDashboardChild[];
    unreadNotifications: number;
};

function formatDate(dateStr: string | null): string {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function daysUntil(dateStr: string | null): number | null {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
}

function progressFromStatus(status: string): number {
    switch (status) {
        case 'up-to-date': return 100;
        case 'on-track': return 85;
        case 'behind': return 40;
        default: return 60;
    }
}

type RecentRecordRow = VaccinationRecord & { childName: string };

export const ParentDashboardDesktopPage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name?: string } | null>(AuthService.getCurrentUser());
    const [dashboard, setDashboard] = useState<ParentDashboard | null>(null);
    const [recentRecords, setRecentRecords] = useState<RecentRecordRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setLoading(true);
            setError(null);
            try {
                const [profile, data] = await Promise.all([
                    AuthService.refreshProfile(),
                    dataService.getParentDashboard(),
                ]);
                if (cancelled) return;
                if (profile) setUser(profile);
                if (data) {
                    setDashboard(data);
                    const childNames = Object.fromEntries(data.children.map((c) => [c.childId, c.name]));
                    const allRecords: RecentRecordRow[] = [];
                    for (const child of data.children) {
                        const records = await dataService.getVaccinationRecordsByChild(child.childId);
                        for (const r of records) {
                            allRecords.push({ ...r, childName: childNames[r.childId] ?? child.name });
                        }
                    }
                    allRecords.sort((a, b) => b.administeredDate.getTime() - a.administeredDate.getTime());
                    setRecentRecords(allRecords.slice(0, 10));
                } else {
                    setDashboard({ children: [], unreadNotifications: 0 });
                }
            } catch (e) {
                if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load dashboard');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    const handleRegisterChild = () => navigate('/add-child');

    if (loading && !dashboard) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#1a2632]">
                <p className="text-[#4c739a] dark:text-slate-400">Loading dashboard…</p>
            </div>
        );
    }

    const children = dashboard?.children ?? [];
    const unreadNotifications = dashboard?.unreadNotifications ?? 0;

    return (
        <>
            <div className="flex min-h-screen">

                <aside
                    className="w-72 bg-white dark:bg-[#1a2632] border-r border-[#e7edf3] dark:border-slate-700 flex flex-col justify-between p-6">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 rounded-full p-2 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary text-2xl">child_care</span>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-[#0d141b] dark:text-slate-50 text-base font-bold leading-none">Parent
                                    Portal</h1>
                                <p className="text-[#4c739a] dark:text-slate-400 text-xs mt-1">Vaccination
                                    Management</p>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-2">
                            <Link to="/parent-dashboard-desktop" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary text-white">
                                <span className="material-symbols-outlined">dashboard</span>
                                <p className="text-sm font-medium">Dashboard</p>
                            </Link>
                            <Link to="/child-profile-schedule" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">history_edu</span>
                                <p className="text-sm font-medium">Health Records</p>
                            </Link>
                            <Link to="/notifications" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                                <p className="text-sm font-medium">Notifications</p>
                                {unreadNotifications > 0 && (
                                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full min-w-[1.25rem] h-5 flex items-center justify-center px-1">{unreadNotifications}</span>
                                )}
                            </Link>
                            <Link to="/growth-chart" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">monitoring</span>
                                <p className="text-sm font-medium">Growth Chart</p>
                            </Link>
                            <Link to="/parent-profile" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">person</span>
                                <p className="text-sm font-medium">Profile</p>
                            </Link>
                            <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">settings</span>
                                <p className="text-sm font-medium">Settings</p>
                            </Link>
                        </nav>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button 
                            onClick={async () => {
                                await AuthService.logout();
                                navigate('/login');
                            }}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left w-full">
                            <span className="material-symbols-outlined">logout</span>
                            <p className="text-sm font-medium">Logout</p>
                        </button>
                    </div>
                </aside>

                <main className="flex-1 overflow-y-auto">

                    <header
                        className="flex items-center justify-between border-b border-[#e7edf3] dark:border-slate-700 px-8 py-4 bg-white dark:bg-[#1a2632]">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">verified</span>
                            <h2 className="text-lg font-bold tracking-tight">SuwaCare LK</h2>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-6">
                                <Link to="/vaccine-guide" className="text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">
                                    Vaccine Guide
                                </Link>
                            </div>
                            <div className="h-6 w-px bg-[#e7edf3] dark:bg-slate-700"></div>
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex h-9 items-center justify-center rounded-lg bg-[#e7edf3] dark:bg-slate-700 p-1">
                                    <label className="flex cursor-pointer h-full items-center justify-center rounded px-3 bg-white dark:bg-slate-600 shadow-sm text-primary text-xs font-bold">
                                        <span>EN</span>
                                        <input checked="" className="hidden" name="lang" type="radio" value="English"/>
                                    </label>
                                    <label className="flex cursor-pointer h-full items-center justify-center rounded px-3 text-[#4c739a] dark:text-slate-400 text-xs font-bold">
                                        <span>සිං</span>
                                        <input className="hidden" name="lang" type="radio" value="Sinhala"/>
                                    </label>
                                    <label className="flex cursor-pointer h-full items-center justify-center rounded px-3 text-[#4c739a] dark:text-slate-400 text-xs font-bold">
                                        <span>தமிழ்</span>
                                        <input className="hidden" name="lang" type="radio" value="Tamil"/>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3 pl-2">
                                    <div className="text-right">
                                        <p className="text-sm font-bold leading-none">{user?.name ?? 'Parent'}</p>
                                        <p className="text-xs text-[#4c739a] dark:text-slate-400 mt-1">Parent
                                            Account</p>
                                    </div>
                                    <div
                                        className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-primary/20"
                                        data-alt="Portrait of a female user"
                                        style={{"backgroundImage": "url('https://via.placeholder.com/150')"}}></div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="p-8">

                        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-4xl font-black tracking-tight">Parent Dashboard</h1>
                                <p className="text-[#4c739a] dark:text-slate-400 text-lg max-w-xl">Monitor your
                                    children's vaccination status and upcoming health milestones.</p>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-2xl font-bold">Linked Children</h2>
                            <span className="bg-primary/10 text-primary text-sm font-bold px-2 py-0.5 rounded-full">{children.length} Registered</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {children.map((child) => {
                                const progress = progressFromStatus(child.vaccinationStatus);
                                const days = daysUntil(child.nextVaccinationDate);
                                const hasNextDue = child.nextVaccinationDate && child.nextVaccineName;
                                const isPending = !hasNextDue || (days !== null && days < 0);
                                return (
                                    <div
                                        key={child.childId}
                                        className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-16 rounded-2xl bg-cover bg-center"
                                                     data-alt={`${child.name} portrait`}
                                                     style={{ backgroundImage: "url('https://via.placeholder.com/150')" }}></div>
                                                <div>
                                                    <h3 className="text-lg font-bold">{child.name}</h3>
                                                    <p className="text-[#4c739a] dark:text-slate-400 text-sm">Age: {child.age}</p>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-[#4c739a] cursor-pointer hover:text-primary">more_vert</span>
                                        </div>
                                        <div
                                            className={isPending
                                                ? "bg-[#fffbeb] dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-4"
                                                : "bg-[#f0f9ff] dark:bg-primary/10 border border-primary/20 rounded-xl p-4"}>
                                            <div className={`flex items-center gap-3 mb-2 ${isPending ? 'text-yellow-600 dark:text-yellow-500' : 'text-primary'}`}>
                                                <span className="material-symbols-outlined text-xl">{isPending ? 'pending_actions' : 'event_upcoming'}</span>
                                                <p className="text-sm font-bold uppercase tracking-wider">{isPending ? 'Appointment Pending' : 'Next Dose'}</p>
                                            </div>
                                            <p className="text-[#0d141b] dark:text-slate-50 font-bold text-lg leading-tight">{child.nextVaccineName ?? '—'}</p>
                                            <p className={`font-medium text-sm mt-1 ${isPending ? 'text-yellow-600 dark:text-yellow-500' : 'text-primary'}`}>
                                                {hasNextDue && days !== null
                                                    ? (days < 0 ? `Overdue (${formatDate(child.nextVaccinationDate)})` : `Due in ${days} days (${formatDate(child.nextVaccinationDate)})`)
                                                    : 'Book next appointment'}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between text-xs font-bold uppercase text-[#4c739a] dark:text-slate-400">
                                                <span>Vaccination Progress</span>
                                                <span>{progress}%</span>
                                            </div>
                                            <div className="w-full bg-[#e7edf3] dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                                <div className="bg-primary h-full rounded-full" style={{ width: `${progress}%` }}></div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/child-profile-schedule?childId=${child.childId}`)}
                                            className="w-full py-3 bg-[#e7edf3] dark:bg-slate-700 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary font-bold rounded-lg transition-colors">
                                            View Full History
                                        </button>
                                    </div>
                                );
                            })}
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={handleRegisterChild}
                                onKeyDown={(e) => e.key === 'Enter' && handleRegisterChild()}
                                className="bg-white dark:bg-[#1a2632] border-2 border-dashed border-[#e7edf3] dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary transition-colors">
                                <div className="h-16 w-16 rounded-full bg-[#e7edf3] dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <span className="material-symbols-outlined text-3xl text-[#4c739a] group-hover:text-primary">add_circle</span>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">Add another child</h3>
                                    <p className="text-[#4c739a] dark:text-slate-400 text-sm">Using Registration Number</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6">Recent Records</h2>
                            <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-[#f8fafc] dark:bg-slate-800 text-xs font-bold uppercase text-[#4c739a] dark:text-slate-400">
                                        <tr>
                                            <th className="px-6 py-4">Child Name</th>
                                            <th className="px-6 py-4">Vaccine</th>
                                            <th className="px-6 py-4">Date Administered</th>
                                            <th className="px-6 py-4">Officer/PHM</th>
                                            <th className="px-6 py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e7edf3] dark:divide-slate-700">
                                        {recentRecords.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-8 text-center text-[#4c739a] dark:text-slate-400">
                                                    No vaccination records yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            recentRecords.map((rec) => (
                                                <tr key={rec.recordId} className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors">
                                                    <td className="px-6 py-4 font-medium">{rec.childName}</td>
                                                    <td className="px-6 py-4">{rec.vaccineName ?? '—'}</td>
                                                    <td className="px-6 py-4">{formatDate(rec.administeredDate ? (typeof rec.administeredDate === 'string' ? rec.administeredDate : rec.administeredDate.toISOString()) : null)}</td>
                                                    <td className="px-6 py-4 text-[#4c739a] dark:text-slate-400">{rec.administeredBy || '—'}</td>
                                                    <td className="px-6 py-4">
                                                        <Link to={`/child-profile-schedule?childId=${rec.childId}`} className="text-primary font-bold text-sm hover:underline">
                                                            View
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};
