import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { dataService } from '../services/DataService';
import { PhmLayout } from '../components/PhmLayout';
import { ChildDetailsModal } from '../components/ChildDetailsModal';
import type { Child } from '../types/models';

type PhmDashboardStats = {
    totalChildrenInArea: number;
    vaccinatedCount: number;
    missedVaccinations: number;
    upcomingVaccinations: number;
    growthRecordsThisMonth: number;
    recentRegistrations: number;
};

type ChildRow = Child & {
    lastVaccinationText?: string;
    statusDisplay: 'completed' | 'upcoming' | 'missed' | 'on-track';
};

const CHILDREN_PAGE_SIZE = 10;

export const PhmDashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();
    const [stats, setStats] = useState<PhmDashboardStats | null>(null);
    const [children, setChildren] = useState<ChildRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalChildren, setTotalChildren] = useState(0);
    const [passwordJustChanged, setPasswordJustChanged] = useState(false);
    const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
    const [nextClinic, setNextClinic] = useState<any>(null);
    const [clinicDueChildren, setClinicDueChildren] = useState<number>(0);

    const phmId = (currentUser as { phmId?: string })?.phmId ?? currentUser?.userId ?? '';
    const areaName = (currentUser as { assignedRegion?: string; areaCode?: string })?.assignedRegion
        ?? (currentUser as { assignedRegion?: string; areaCode?: string })?.areaCode
        ?? 'My Area';

    const totalPages = Math.max(1, Math.ceil(totalChildren / CHILDREN_PAGE_SIZE));
    const startItem = totalChildren === 0 ? 0 : (page - 1) * CHILDREN_PAGE_SIZE + 1;
    const endItem = Math.min(page * CHILDREN_PAGE_SIZE, totalChildren);

    useEffect(() => {
        if (sessionStorage.getItem('passwordChanged') === 'true') {
            setPasswordJustChanged(true);
            sessionStorage.removeItem('passwordChanged');
        }
    }, []);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const clinics = await dataService.getMyClinicList();
                if (!cancelled && clinics.length > 0) {
                    // Get the next upcoming clinic (sorted by date)
                    const upcoming = clinics.filter(c => new Date(c.clinicDate) >= new Date()).sort((a, b) => new Date(a.clinicDate).getTime() - new Date(b.clinicDate).getTime());
                    if (upcoming.length > 0) {
                        const clinic = upcoming[0];
                        setNextClinic(clinic);
                        // Get due children count for the clinic
                        const dueChildren = await dataService.getClinicDueChildren(clinic.clinicId);
                        if (!cancelled) {
                            setClinicDueChildren(dueChildren.length);
                        }
                    }
                }
            } catch (err) {
                console.error('Failed to fetch clinic data:', err);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const dashboardPromise = dataService.getPHMDashboard();
                const childrenPromise = phmId
                    ? dataService.getChildrenByPHMPaginated(phmId, page, CHILDREN_PAGE_SIZE)
                    : Promise.resolve({ total: 0, page: 1, limit: CHILDREN_PAGE_SIZE, data: [] });
                const [dashboardRes, childrenRes] = await Promise.all([dashboardPromise, childrenPromise]);
                if (cancelled) return;
                setStats(dashboardRes ?? null);
                setTotalChildren(childrenRes.total);
                const withLastVacc: ChildRow[] = await Promise.all(
                    childrenRes.data.map(async (c) => {
                        const [records, schedules] = await Promise.all([
                            dataService.getVaccinationRecordsByChild(c.childId),
                            dataService.getScheduleItemsByChild(c.childId),
                        ]);
                        const lastRec = records.length > 0
                            ? records.sort((a, b) => b.administeredDate.getTime() - a.administeredDate.getTime())[0]
                            : null;
                        const hasMissed = schedules.some((s) => s.status === 'missed');
                        const hasUpcoming = schedules.some((s) => s.status === 'pending' || s.status === 'scheduled');
                        let statusDisplay: ChildRow['statusDisplay'] = 'on-track';
                        if (hasMissed) statusDisplay = 'missed';
                        else if (hasUpcoming && records.length > 0) statusDisplay = 'upcoming';
                        else if (records.length > 0) statusDisplay = 'completed';
                        return {
                            ...c,
                            lastVaccinationText: lastRec
                                ? `${lastRec.vaccineName ?? 'Vaccine'} (${lastRec.administeredDate.toLocaleDateString()})`
                                : undefined,
                            statusDisplay,
                        };
                    })
                );
                if (!cancelled) setChildren(withLastVacc);
            } catch {
                if (!cancelled) setError('Failed to load dashboard.');
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [phmId, page]);

    // All stat values from GET /analytics/phm-dashboard (no mock fallbacks)
    const vaccinationRate = stats && stats.totalChildrenInArea > 0
        ? Math.round((stats.vaccinatedCount / stats.totalChildrenInArea) * 100)
        : null;

    return (
        <PhmLayout activeNav="overview" showBackToDashboard={false}>
            <div className="max-w-[1200px] mx-auto w-full p-4 lg:p-6 space-y-6">
                {passwordJustChanged && (
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 text-emerald-800 dark:text-emerald-200 text-sm flex items-start gap-2">
                        <span className="material-symbols-outlined text-base mt-0.5">check_circle</span>
                        <div>
                            <p className="font-semibold">Password changed successfully</p>
                            <p className="text-xs">
                                Your new password is now active. Please keep it confidential to protect children&apos;s health records.
                            </p>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 text-red-700 dark:text-red-300 text-sm">
                        {error}
                    </div>
                )}
                <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Overview</h2>
                    <div className="flex items-center gap-3">
                        <div className="relative hidden sm:block">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                            <input
                                className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary"
                                placeholder="Search children or parents..."
                                type="text"
                                aria-label="Search"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[140px] sm:max-w-[180px]" title={currentUser?.name || currentUser?.email || ''}>
                                {currentUser?.name || currentUser?.email || 'PHM User'}
                            </span>
                            <div
                                className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0 border border-slate-200 dark:border-slate-700"
                                role="img"
                                aria-label={currentUser?.name ? `Profile: ${currentUser.name}` : 'Profile'}
                            >
                                {currentUser?.name
                                    ? currentUser.name.trim().split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase()
                                    : currentUser?.email
                                        ? currentUser.email.slice(0, 2).toUpperCase()
                                        : '—'}
                            </div>
                        </div>
                    </div>
                </header>
                <main className="space-y-6">

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Assigned Area: {areaName}</h2>
                            <p className="text-slate-500 dark:text-slate-400">Manage child registrations and vaccination
                                progress.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/baby-registration')}
                                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sm">
                                <span className="material-symbols-outlined text-[20px]">person_add</span>
                                <span>Register New Baby</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div
                            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming Vaccinations</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">{loading || !stats ? '—' : stats.upcomingVaccinations}</span>
                            </div>
                            <div
                                className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full" style={{ width: stats && stats.totalChildrenInArea > 0 ? `${Math.min(100, (stats.upcomingVaccinations / stats.totalChildrenInArea) * 100)}%` : '0%' }}></div>
                            </div>
                        </div>
                        <div
                            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Recent Registrations</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">{loading || !stats ? '—' : stats.recentRegistrations}</span>
                            </div>
                            <div
                                className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-rose-500 h-full" style={{ width: stats && stats.totalChildrenInArea > 0 ? `${Math.min(100, (stats.recentRegistrations / stats.totalChildrenInArea) * 100)}%` : '0%' }}></div>
                            </div>
                        </div>
                        <div
                            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                            <span
                                className="text-sm font-medium text-slate-500 dark:text-slate-400">Vaccination Rate</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">{loading || vaccinationRate === null ? '—' : `${vaccinationRate}%`}</span>
                            </div>
                            <div
                                className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-primary h-full" style={{ width: vaccinationRate !== null ? `${vaccinationRate}%` : '0%' }}></div>
                            </div>
                        </div>
                        <div
                            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                            <span
                                className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Records</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">{loading || !stats ? '—' : stats.totalChildrenInArea}</span>
                                <span className="text-xs font-bold text-slate-400">Total</span>
                            </div>
                            <div
                                className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-slate-400 h-full" style={{ width: stats && stats.totalChildrenInArea > 0 ? `${Math.min(100, (stats.vaccinatedCount / stats.totalChildrenInArea) * 100)}%` : '0%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

                        <div
                            className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h3 className="font-bold text-lg">Children Overview</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                    <span className="material-symbols-outlined">filter_list</span>
                                </button>
                                <button
                                    className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                    <span className="material-symbols-outlined">download</span>
                                </button>
                                <div className="h-8 w-px bg-slate-200 dark:border-slate-700 mx-1"></div>
                                <button
                                    onClick={() => navigate('/view-area-children')}
                                    className="px-4 py-2 text-sm font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    View All Records
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto @container">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Child
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Parent
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">DOB</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last
                                        Vaccination
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                                            Loading…
                                        </td>
                                    </tr>
                                ) : children.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                                            No children in your area yet.
                                        </td>
                                    </tr>
                                ) : (
                                    children.map((c) => {
                                        const initials = [c.firstName, c.lastName].map((n) => (n || '').charAt(0)).join('').toUpperCase() || '—';
                                        const dobStr = c.dateOfBirth instanceof Date ? c.dateOfBirth.toLocaleDateString() : (c.dateOfBirth as unknown as string);
                                        const statusConfig = {
                                            completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', dot: 'bg-emerald-600' },
                                            upcoming: { label: 'Upcoming', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', dot: 'bg-amber-600' },
                                            missed: { label: 'Missed', className: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400', dot: 'bg-rose-600' },
                                            'on-track': { label: 'On track', className: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400', dot: 'bg-sky-600' },
                                        };
                                        const sc = statusConfig[c.statusDisplay];
                                        return (
                                            <tr key={c.childId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs">
                                                            {initials}
                                                        </div>
                                                        <span className="font-semibold text-slate-900 dark:text-slate-200">{c.firstName} {c.lastName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm">—</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm italic">{dobStr}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm">{c.lastVaccinationText ?? '—'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${sc.className}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                                                        {sc.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button
                                                        onClick={() => setSelectedChildId(c.childId)}
                                                        className={c.statusDisplay === 'missed' ? 'text-rose-600 hover:underline text-sm font-semibold' : 'text-primary hover:underline text-sm font-semibold'}
                                                    >
                                                        {c.statusDisplay === 'missed' ? 'Call Parent' : 'Details'}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                                </tbody>
                            </table>
                        </div>

                        <div
                            className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                                {loading ? 'Loading…' : totalChildren === 0 ? 'No records' : `Showing ${startItem}-${endItem} of ${totalChildren} records`}
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    disabled={page <= 1 || loading}
                                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none"
                                    aria-label="Previous page"
                                >
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let p: number;
                                    if (totalPages <= 5) p = i + 1;
                                    else if (page <= 3) p = i + 1;
                                    else if (page >= totalPages - 2) p = totalPages - 4 + i;
                                    else p = page - 2 + i;
                                    return (
                                        <button
                                            key={p}
                                            type="button"
                                            onClick={() => setPage(p)}
                                            disabled={loading}
                                            className={`px-3 py-1 text-sm font-medium rounded transition-colors disabled:opacity-50 ${page === p ? 'bg-primary text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                        >
                                            {p}
                                        </button>
                                    );
                                })}
                                {totalPages > 5 && page < totalPages - 2 && (
                                    <>
                                        <span className="px-1 text-slate-400">…</span>
                                        <button
                                            type="button"
                                            onClick={() => setPage(totalPages)}
                                            disabled={loading}
                                            className={`px-3 py-1 text-sm font-medium rounded transition-colors disabled:opacity-50 ${page === totalPages ? 'bg-primary text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages || loading}
                                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none"
                                    aria-label="Next page"
                                >
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        <div
                            className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">calendar_month</span>
                                    Next Clinic Day
                                </h4>
                            </div>
                            {nextClinic ? (
                                <div className="space-y-4">
                                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 border border-primary/20">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Scheduled Date</p>
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                                            {new Date(nextClinic.clinicDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Location</p>
                                            <p className="text-sm text-slate-900 dark:text-white font-medium">{nextClinic.location}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Area</p>
                                            <p className="text-sm text-slate-900 dark:text-white font-medium">{nextClinic.gnDivision}</p>
                                        </div>
                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800">
                                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">Due Children</p>
                                            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{clinicDueChildren}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => navigate('/clinic-scheduling')}
                                        className="w-full mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                                    >
                                        View Clinic Details
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">No upcoming clinics scheduled. Create one to get started.</p>
                                    <button
                                        onClick={() => navigate('/clinic-scheduling')}
                                        className="mt-4 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                                    >
                                        Schedule Clinic
                                    </button>
                                </div>
                            )}
                        </div>

                        <div
                            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                            <h4 className="font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">trending_up</span>
                                Area Activity Summary
                            </h4>
                            {stats ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
                                        <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-2">Recent Registrations</p>
                                        <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{stats.recentRegistrations}</p>
                                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">New children registered this month</p>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                        <p className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2">Growth Records</p>
                                        <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{stats.growthRecordsThisMonth}</p>
                                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Growth measurements recorded</p>
                                    </div>
                                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                                        <p className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2">Missed Vaccinations</p>
                                        <p className="text-3xl font-bold text-amber-700 dark:text-amber-300">{stats.missedVaccinations}</p>
                                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">Require immediate follow-up</p>
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                                        <p className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2">Upcoming Vaccinations</p>
                                        <p className="text-3xl font-bold text-purple-700 dark:text-purple-300">{stats.upcomingVaccinations}</p>
                                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">Scheduled for next 30 days</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Activity data will appear here once data is loaded.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
                <footer className="mt-auto py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-xl">
                    <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                            <span>© 2026 Ministry of Health Sri Lanka</span>
                            <span className="hidden md:block">•</span>
                            <span  className="hover:text-primary">Data Protection Policy</span>
                            <span className="hidden md:block">•</span>
                            <span className="hover:text-primary">Help Center</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden />
                                <span className="text-xs font-bold text-slate-500">SYSTEM ONLINE</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                <span className="material-symbols-outlined text-lg">language</span>
                                <span className="text-xs font-bold">ENGLISH</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            <ChildDetailsModal
                isOpen={!!selectedChildId}
                childId={selectedChildId || ''}
                onClose={() => setSelectedChildId(null)}
            />
        </PhmLayout>
    );
};
