import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { dataService } from '../services/DataService';
import { VaccinationCardButton } from '../components/VaccinationCardButton';
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
    return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

type RecentRecordRow = VaccinationRecord & { childName: string };

export const ParentDashboardMobilePage: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name?: string } | null>(AuthService.getCurrentUser());
    const [dashboard, setDashboard] = useState<ParentDashboard | null>(null);
    const [recentRecords, setRecentRecords] = useState<RecentRecordRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setLoading(true);
            try {
                const [profile, data] = await Promise.all([
                    AuthService.refreshProfile(),
                    dataService.getParentDashboard(),
                ]);
                if (cancelled) return;
                if (profile) setUser(profile);
                if (data) {
                    setDashboard(data);
                    const allRecords: RecentRecordRow[] = [];
                    for (const child of data.children) {
                        const records = await dataService.getVaccinationRecordsByChild(child.childId);
                        for (const r of records) {
                            allRecords.push({ ...r, childName: child.name });
                        }
                    }
                    allRecords.sort((a, b) => b.administeredDate.getTime() - a.administeredDate.getTime());
                    setRecentRecords(allRecords.slice(0, 5));
                } else {
                    setDashboard({ children: [], unreadNotifications: 0 });
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    const firstName = user?.name?.split(' ')[0] ?? 'User';
    const children = dashboard?.children ?? [];
    const unreadNotifications = dashboard?.unreadNotifications ?? 0;

    if (loading && !dashboard) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#1a2632]">
                <p className="text-[#4c739a] dark:text-slate-400">Loading…</p>
            </div>
        );
    }

    return (
        <>
            <header
                className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a2632] border-b border-[#e7edf3] dark:border-slate-700">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                    <h1 className="text-lg font-bold tracking-tight">SuwaCare LK</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/notifications" className="relative p-2 text-[#4c739a] dark:text-slate-400">
                        <span className="material-symbols-outlined text-2xl">notifications</span>
                        {unreadNotifications > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a2632]" aria-label={`${unreadNotifications} unread`}></span>
                        )}
                    </Link>
                    <button type="button" className="p-2 text-[#4c739a] dark:text-slate-400" aria-label="Menu">
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>
                </div>
            </header>
            <main className="flex flex-col gap-6 p-4">
                <section className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black">Hi, {firstName}</h2>
                        <p className="text-[#4c739a] dark:text-slate-400 text-sm">Welcome back to your dashboard</p>
                    </div>
                    <div
                        className="flex h-10 items-center justify-start rounded-lg bg-[#e7edf3] dark:bg-slate-700 p-1 w-fit">
                        <label
                            className="flex cursor-pointer h-full items-center justify-center rounded px-4 bg-white dark:bg-slate-600 shadow-sm text-primary text-xs font-bold">
                            <span>EN</span>
                            <input defaultChecked className="hidden" name="lang" type="radio" value="English"/>
                        </label>
                        <label
                            className="flex cursor-pointer h-full items-center justify-center rounded px-4 text-[#4c739a] dark:text-slate-400 text-xs font-bold">
                            <span>සිං</span>
                            <input className="hidden" name="lang" type="radio" value="Sinhala"/>
                        </label>
                        <label
                            className="flex cursor-pointer h-full items-center justify-center rounded px-4 text-[#4c739a] dark:text-slate-400 text-xs font-bold">
                            <span>தமிழ்</span>
                            <input className="hidden" name="lang" type="radio" value="Tamil"/>
                        </label>
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Linked Children</h3>
                        <span className="text-primary text-sm font-bold">{children.length} Children</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4 snap-x">
                        {children.map((child) => {
                            const days = daysUntil(child.nextVaccinationDate);
                            const hasNextDue = child.nextVaccinationDate && child.nextVaccineName;
                            const isPending = !hasNextDue || (days !== null && days < 0);
                            return (
                                <div
                                    key={child.childId}
                                    className="min-w-[85vw] bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-5 flex flex-col gap-4 shadow-sm snap-center">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="h-14 w-14 rounded-2xl bg-cover bg-center border border-[#e7edf3] dark:border-slate-700"
                                                style={{ backgroundImage: "url('https://via.placeholder.com/150')" }}
                                            />
                                            <div>
                                                <h4 className="font-bold text-base">{child.name}</h4>
                                                <p className="text-[#4c739a] dark:text-slate-400 text-xs">{child.age}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`rounded-xl p-3 shadow-lg ${isPending ? 'bg-yellow-500 text-white shadow-yellow-500/20' : 'bg-primary text-white shadow-primary/20'}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="material-symbols-outlined text-sm">{isPending ? 'pending_actions' : 'event_upcoming'}</span>
                                            <p className="text-[10px] font-bold uppercase tracking-wider opacity-90">{isPending ? 'Appointment Pending' : 'Next Dose Alert'}</p>
                                        </div>
                                        <p className="font-bold text-sm leading-tight">{child.nextVaccineName ?? '—'}</p>
                                        <p className="text-xs font-medium mt-1 opacity-90">
                                            {hasNextDue && days !== null
                                                ? (days < 0 ? `Overdue: ${formatDate(child.nextVaccinationDate)}` : `Due: ${formatDate(child.nextVaccinationDate)} (In ${days} days)`)
                                                : 'Book next appointment'}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/child-profile-schedule?childId=${child.childId}`)}
                                        className="text-left text-primary text-xs font-bold hover:underline"
                                    >
                                        View full history
                                    </button>
                                    <VaccinationCardButton
                                        childId={child.childId}
                                        childName={child.name}
                                        variant="secondary"
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section>
                    <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/add-child')}
                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-700 rounded-2xl active:bg-slate-50">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">person_add</span>
                            </div>
                            <span className="text-xs font-bold text-center">Add Child</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/child-profile-schedule')}
                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-700 rounded-2xl active:bg-slate-50">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-600">calendar_add_on</span>
                            </div>
                            <span className="text-xs font-bold text-center">Book Appointment</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => children.length > 0 && navigate(`/growth-chart/${children[0].childId}`)}
                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-700 rounded-2xl active:bg-slate-50 col-span-2"
                            disabled={children.length === 0}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-purple-600">monitoring</span>
                                </div>
                                <span className="text-sm font-bold">Growth Charts & Milestones</span>
                            </div>
                        </button>
                    </div>
                </section>
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Recent Records</h3>
                        <Link to="/child-profile-schedule" className="text-primary text-sm font-bold">View All</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {recentRecords.length === 0 ? (
                            <p className="text-[#4c739a] dark:text-slate-400 text-sm py-4">No vaccination records yet.</p>
                        ) : (
                            recentRecords.map((rec) => {
                                const dateStr = rec.administeredDate ? (typeof rec.administeredDate === 'string' ? rec.administeredDate : rec.administeredDate.toISOString()) : null;
                                return (
                                    <button
                                        key={rec.recordId}
                                        type="button"
                                        onClick={() => navigate(`/child-profile-schedule?childId=${rec.childId}`)}
                                        className="flex items-center justify-between p-4 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-700 rounded-xl text-left w-full active:bg-slate-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary">vaccines</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{rec.vaccineName ?? '—'}</p>
                                                <p className="text-[11px] text-[#4c739a] dark:text-slate-400">{rec.childName} • {formatDate(dateStr)}</p>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-[#4c739a] text-sm">chevron_right</span>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </section>
            </main>
            <nav
                className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1a2632] border-t border-[#e7edf3] dark:border-slate-700 flex justify-around items-center py-2 px-4 z-50">
                <Link to="/parent-dashboard-mobile" className="flex flex-col items-center gap-1 text-primary">
                    <span className="material-symbols-outlined fill-1">home</span>
                    <span className="text-[10px] font-bold">Home</span>
                </Link>
        <Link to="/child-profile-schedule" className="flex flex-col items-center gap-1 text-[#4c739a] dark:text-slate-400">
          <span className="material-symbols-outlined">history_edu</span>
          <span className="text-[10px] font-medium">Records</span>
        </Link>
        <Link to="/notifications" className="flex flex-col items-center gap-1 text-[#4c739a] dark:text-slate-400">
          <span className="material-symbols-outlined">calendar_month</span>
          <span className="text-[10px] font-medium">Appointments</span>
        </Link>
        <Link to="/parent-profile" className="flex flex-col items-center gap-1 text-[#4c739a] dark:text-slate-400">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
            </nav>
        </>
    );
};
