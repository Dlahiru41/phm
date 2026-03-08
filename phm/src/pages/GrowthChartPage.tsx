import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { dataService } from '../services/DataService';
import { ParentLayout } from '../components/ParentLayout';
import type { Child, GrowthRecord } from '../types/models';

function formatDate(d: Date): string {
  return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function ageFromDob(dob: Date): string {
  if (isNaN(dob.getTime())) return '—';
  const now = new Date();
  const months = (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const m = months % 12;
  return m === 0 ? `${years} year${years !== 1 ? 's' : ''}` : `${years}y ${m}m`;
}

type GrowthChartMainContentProps = {
  child?: Child | null;
  growthRecords?: GrowthRecord[];
};

const GrowthChartMainContent: React.FC<GrowthChartMainContentProps> = ({ child, growthRecords = [] }) => {
  const sortedRecords = [...growthRecords].sort((a, b) => b.recordedDate.getTime() - a.recordedDate.getTime());
  const latest = sortedRecords[0];
  const childName = child ? `${child.firstName} ${child.lastName}`.trim() : '—';
  const lastVisitStr = latest ? formatDate(latest.recordedDate) : '—';

  return (
    <div className="max-w-[1200px] mx-auto p-8">
        <nav className="flex flex-wrap gap-2 mb-4">
            <Link to="/parent-dashboard-desktop" className="text-[#4c739a] text-sm font-medium hover:underline">Home</Link>
            <span className="text-[#4c739a] text-sm font-medium">/</span>
            <Link to="/child-profile-schedule" className="text-[#4c739a] text-sm font-medium hover:underline">Children List</Link>
            <span className="text-[#4c739a] text-sm font-medium">/</span>
            <span className="text-[#0d141b] dark:text-slate-300 text-sm font-medium">Growth Progress</span>
        </nav>

        <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-[#0d141b] dark:text-slate-50 text-3xl font-black leading-tight tracking-tight">WHO Growth Standards</h1>
                <p className="text-[#4c739a] dark:text-slate-400 text-base font-normal">
                  {childName !== '—' ? `${childName}'s` : 'Child\'s'} progress against global pediatric benchmarks. Last visit: {lastVisitStr}
                </p>
            </div>
                                <div className="flex gap-3">
                                    <button
                                        className="flex items-center gap-2 rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-800 text-[#0d141b] dark:text-slate-50 text-sm font-bold border border-slate-200 dark:border-slate-700">
                                        <span className="material-symbols-outlined text-lg">download</span>
                                        <span>Export CSV</span>
                                    </button>
                                    <button
                                        className="flex items-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-slate-900 text-[#0d141b] dark:text-slate-50 text-sm font-bold border border-slate-200 dark:border-slate-700">
                                        <span className="material-symbols-outlined text-lg">print</span>
                                        <span>Print Record</span>
                                    </button>
                                </div>
                            </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start">
                    <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium">Current Weight</p>
                    <span className="material-symbols-outlined text-primary">scale</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <p className="text-[#0d141b] dark:text-slate-50 text-3xl font-bold">{latest ? `${latest.weight} kg` : '—'}</p>
                </div>
                <p className="text-xs text-[#4c739a] dark:text-slate-500">From latest record</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start">
                    <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium">Current Height</p>
                    <span className="material-symbols-outlined text-primary">straighten</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <p className="text-[#0d141b] dark:text-slate-50 text-3xl font-bold">{latest ? `${latest.height} cm` : '—'}</p>
                </div>
                <p className="text-xs text-[#4c739a] dark:text-slate-500">From latest record</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start">
                    <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium">Head Circumference</p>
                    <span className="material-symbols-outlined text-primary">analytics</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <p className="text-[#0d141b] dark:text-slate-50 text-3xl font-bold">{latest && latest.headCircumference != null ? `${latest.headCircumference} cm` : '—'}</p>
                </div>
                <p className="text-xs text-[#4c739a] dark:text-slate-500">From latest record</p>
            </div>
        </div>

                            <div
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 mb-8 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-[#0d141b] dark:text-slate-50">Weight-for-Age
                                        (0-2 Years)</h3>
                                    <div className="flex items-center gap-4 text-xs font-medium">
                                        <div className="flex items-center gap-1"><span
                                            className="w-3 h-0.5 bg-red-400"></span> +3 SD
                                        </div>
                                        <div className="flex items-center gap-1"><span
                                            className="w-3 h-0.5 bg-green-500"></span> Median
                                        </div>
                                        <div className="flex items-center gap-1"><span
                                            className="w-3 h-0.5 bg-red-400"></span> -3 SD
                                        </div>
                                        <div className="flex items-center gap-1 ml-2"><span
                                            className="w-2 h-2 rounded-full bg-primary"></span> Patient
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="relative w-full h-[400px] bg-slate-50 dark:bg-slate-950 rounded-lg border border-dashed border-slate-200 dark:border-slate-800 overflow-hidden">

                                    <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-30">
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-r border-b border-slate-300 dark:border-slate-700"></div>
                                        <div className="border-b border-slate-300 dark:border-slate-700"></div>
                                    </div>

                                    <svg className="absolute inset-0 w-full h-full" preserveaspectratio="none"
                                         viewbox="0 0 1000 400">

                                        <path d="M0,350 Q250,300 500,250 T1000,100" fill="none" stroke="#f87171"
                                              stroke-dasharray="4" stroke-width="2"></path>
                                        <path d="M0,380 Q250,340 500,300 T1000,180" fill="none" stroke="#10b981"
                                              stroke-width="3"></path>
                                        <path d="M0,395 Q250,380 500,360 T1000,300" fill="none" stroke="#f87171"
                                              stroke-dasharray="4" stroke-width="2"></path>

                                        <polyline fill="none" points="50,380 150,370 250,355 400,320 550,295"
                                                  stroke="#137fec" stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="4"></polyline>
                                        <circle cx="50" cy="380" fill="#137fec" r="5"></circle>
                                        <circle cx="150" cy="370" fill="#137fec" r="5"></circle>
                                        <circle cx="250" cy="355" fill="#137fec" r="5"></circle>
                                        <circle cx="400" cy="320" fill="#137fec" r="5"></circle>
                                        <circle cx="550" cy="295" fill="#137fec" r="5"></circle>
                                    </svg>

                                    <div className="absolute bottom-2 left-4 text-[10px] text-[#4c739a]">Age (Months)
                                    </div>
                                    <div
                                        className="absolute top-4 left-2 -rotate-90 text-[10px] text-[#4c739a] origin-top-left">Weight
                                        (kg)
                                    </div>
                                </div>
                            </div>

                            <div
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                                <div
                                    className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-[#0d141b] dark:text-slate-50">Recent
                                        Measurements</h3>
                                    <button className="text-primary text-sm font-bold hover:underline">View All
                                        Records
                                    </button>
                                </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                        <th className="px-6 py-3 text-[#4c739a] text-xs font-bold uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-[#4c739a] text-xs font-bold uppercase tracking-wider">Weight (kg)</th>
                        <th className="px-6 py-3 text-[#4c739a] text-xs font-bold uppercase tracking-wider">Height (cm)</th>
                        <th className="px-6 py-3 text-[#4c739a] text-xs font-bold uppercase tracking-wider">Head Circ.</th>
                        <th className="px-6 py-3 text-[#4c739a] text-xs font-bold uppercase tracking-wider">Recorded By</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {sortedRecords.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-[#4c739a] dark:text-slate-400">No growth records yet.</td>
                        </tr>
                    ) : (
                        sortedRecords.map((rec) => (
                            <tr key={rec.recordId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="px-6 py-4 text-sm font-medium">{formatDate(rec.recordedDate)}</td>
                                <td className="px-6 py-4 text-sm font-bold">{rec.weight}</td>
                                <td className="px-6 py-4 text-sm">{rec.height}</td>
                                <td className="px-6 py-4 text-sm">{rec.headCircumference != null ? rec.headCircumference : '—'}</td>
                                <td className="px-6 py-4 text-sm text-[#4c739a]">{rec.recordedBy || '—'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
    </div>
  );
};

export const GrowthChartPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const childIdParam = searchParams.get('childId');
    const isParent = AuthService.isParent();

    const [children, setChildren] = useState<Child[]>([]);
    const [selectedChild, setSelectedChild] = useState<Child | null>(null);
    const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        if (!isParent || !currentUser?.userId) {
            setLoading(false);
            return;
        }
        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const list = await dataService.getChildrenByParent(currentUser.userId);
                if (cancelled) return;
                setChildren(list);
                const childId = childIdParam || (list.length === 1 ? list[0].childId : null);
                if (childId) {
                    const child = await dataService.getChild(childId);
                    const records = await dataService.getGrowthRecordsByChild(childId);
                    if (cancelled) return;
                    setSelectedChild(child ?? null);
                    setGrowthRecords(records);
                } else {
                    setSelectedChild(null);
                    setGrowthRecords([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
    }, [isParent, currentUser?.userId, childIdParam]);

    if (isParent) {
        const content = loading ? (
            <div className="max-w-[1200px] mx-auto p-8 text-center text-[#4c739a] dark:text-slate-400">Loading…</div>
        ) : children.length === 0 ? (
            <div className="max-w-[1200px] mx-auto p-8 text-center">
                <p className="text-[#4c739a] dark:text-slate-400 mb-4">No linked children yet.</p>
                <button type="button" onClick={() => navigate('/add-child')} className="text-primary font-bold hover:underline">Add a child to your account</button>
            </div>
        ) : children.length > 1 && !selectedChild ? (
            <div className="max-w-[1200px] mx-auto p-8">
                <h2 className="text-xl font-bold mb-4">Select a child</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {children.map((c) => (
                        <button
                            key={c.childId}
                            type="button"
                            onClick={() => navigate(`/growth-chart?childId=${c.childId}`)}
                            className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e7edf3] dark:border-slate-700 p-6 text-left hover:border-primary transition-colors"
                        >
                            <p className="font-bold text-lg">{c.firstName} {c.lastName}</p>
                            <p className="text-sm text-[#4c739a] dark:text-slate-400 mt-1">{ageFromDob(c.dateOfBirth)}</p>
                        </button>
                    ))}
                </div>
            </div>
        ) : (
            <GrowthChartMainContent child={selectedChild} growthRecords={growthRecords} />
        );
        return (
            <ParentLayout activeNav="growth-chart">
                {content}
            </ParentLayout>
        );
    }

    return (
        <>
            <div className="layout-container flex flex-col min-h-screen">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-3 sticky top-0 z-50">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-primary">
                            <div className="size-6">
                                <span className="material-symbols-outlined text-3xl">vaccines</span>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-[#0d141b] dark:text-slate-50 text-lg font-bold leading-tight tracking-[-0.015em]">SuwaCare LK</h2>
                                <p className="text-[11px] font-medium text-[#4c739a] dark:text-slate-400">National Child Vaccination Management System</p>
                            </div>
                        </div>
                        <label className="flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-[#4c739a] flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg" data-icon="search">
                                    <span className="material-symbols-outlined text-lg">search</span>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 rounded-lg text-[#0d141b] dark:text-slate-50 focus:outline-0 focus:ring-0 border-none bg-slate-100 dark:bg-slate-800 h-full placeholder:text-[#4c739a] px-4 rounded-l-none pl-2 text-sm font-normal" placeholder="Search children, clinics..." value="" />
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        <nav className="flex items-center gap-9">
                            <Link to="/parent-dashboard-desktop" className="text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
                            <Link to="/child-profile-schedule" className="text-[#0d141b] dark:text-slate-50 text-sm font-bold border-b-2 border-primary py-1">Children</Link>
                            <Link to="/phm-dashboard" className="text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Clinics</Link>
                            <Link to="/generate-reports" className="text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Reports</Link>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.015em]">
                                <span className="truncate">PHM Profile</span>
                            </button>
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200" data-alt="User avatar" style={{ backgroundImage: "url('https://via.placeholder.com/150')" }} />
                        </div>
                    </div>
                </header>
                <div className="flex flex-1">
                    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col border-b border-slate-100 dark:border-slate-800 pb-4">
                                <h1 className="text-[#0d141b] dark:text-slate-50 text-base font-bold leading-normal">Samadhi Perera</h1>
                                <p className="text-[#4c739a] dark:text-slate-500 text-xs font-medium">ID: CV-89234 • 14 Months</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Link to="/parent-dashboard-desktop" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined text-xl">grid_view</span>
                                    <p className="text-sm font-medium">Overview</p>
                                </Link>
                                <Link to="/child-profile-schedule" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined text-xl">medical_information</span>
                                    <p className="text-sm font-medium">Vaccination Card</p>
                                </Link>
                                <Link to="/growth-chart" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: 'FILL 1' }}>monitoring</span>
                                    <p className="text-sm font-bold">Growth Chart</p>
                                </Link>
                                <Link to="/notifications" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined text-xl">calendar_month</span>
                                    <p className="text-sm font-medium">Clinic Visits</p>
                                </Link>
                                <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <span className="material-symbols-outlined text-xl">menu_book</span>
                                    <p className="text-sm font-medium">Parent Resources</p>
                                </Link>
                            </div>
                        </div>
                        <button className="flex w-full items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm shadow-primary/20">
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            <span className="truncate">Add Measurement</span>
                        </button>
                    </aside>
                    <main className="flex-1 overflow-y-auto">
                        <GrowthChartMainContent />
                    </main>
                </div>
            </div>
        </>
    );
};
