import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PhmLayout } from '../components/PhmLayout';

export const PhmDashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <PhmLayout activeNav="overview" showBackToDashboard={false}>
            <div className="max-w-[1200px] mx-auto w-full p-4 lg:p-6 space-y-6">
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
                        <Link
                            to="/notifications"
                            className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" aria-hidden />
                        </Link>
                        <div
                            className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 overflow-hidden border border-slate-200 dark:border-slate-700"
                            role="img"
                            aria-label="Profile"
                        >
                            <img
                                alt=""
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfiEgUgExs6o58pFxf8BPZ12k4tOgZ-kRYSl72nvDv9-8aTNr9HClzWBIle7Pw1IvH0ZuCSm7QdO6EWiOYWzb3MC4RmiUv6lDb_9nswc5XbPl9c_WIi5ZO98zF9MuqDx6zPAGt_9bQvICDF2EeD1VjhSxQ-odsQHPUgHbURdQbTplZ04eVTRswhaOSZkRA2NgpLly1UwHWNr7VOR5GQoId2z4kJilJyn-xPpoax_stCfJWgPMsrPISOZL9G0kAjdr9fkTE6Qq0TKOf"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </header>
                <main className="space-y-6">

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Assigned Area: Wattala
                                West</h2>
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
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Today's Appointments</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">24</span>
                                <span className="text-xs font-bold text-emerald-600">+5%</span>
                            </div>
                            <div
                                className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[70%]"></div>
                            </div>
                        </div>
                        <div
                            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Registrations</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">08</span>
                                <span className="text-xs font-bold text-rose-500">-2%</span>
                            </div>
                            <div
                                className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-rose-500 h-full w-[20%]"></div>
                            </div>
                        </div>
                        <div
                            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                            <span
                                className="text-sm font-medium text-slate-500 dark:text-slate-400">Vaccination Rate</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">92%</span>
                                <span className="text-xs font-bold text-emerald-600">+1.2%</span>
                            </div>
                            <div
                                className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[92%]"></div>
                            </div>
                        </div>
                        <div
                            className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col gap-1">
                            <span
                                className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Records</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold">412</span>
                                <span className="text-xs font-bold text-slate-400">Total</span>
                            </div>
                            <div
                                className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-slate-400 h-full w-[85%]"></div>
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

                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">AP
                                            </div>
                                            <span className="font-semibold text-slate-900 dark:text-slate-200">Arjun Perera</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm">Sunil
                                        Perera
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm italic">2023-05-12</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm">BCG
                                        (at Birth)
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
      <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                              Completed
                                          </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-primary hover:underline text-sm font-semibold">Details
                                        </button>
                                    </td>
                                </tr>

                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">SK
                                            </div>
                                            <span
                                                className="font-semibold text-slate-900 dark:text-slate-200">Sana Khan</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm">M.
                                        Khan
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm italic">2023-11-02</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm">OPV
                                        1 (Pending)
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
      <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                                              Upcoming
                                          </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-primary hover:underline text-sm font-semibold">Details
                                        </button>
                                    </td>
                                </tr>

                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">LS
                                            </div>
                                            <span className="font-semibold text-slate-900 dark:text-slate-200">Lara Silva</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm">D.
                                        Silva
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm italic">2023-08-15</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm">Pentavalent
                                        1
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
      <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                                              Missed
                                          </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-rose-600 hover:underline text-sm font-semibold">Call
                                            Parent
                                        </button>
                                    </td>
                                </tr>

                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xs">MA
                                            </div>
                                            <span
                                                className="font-semibold text-slate-900 dark:text-slate-200">Minu Abey</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm">G.
                                        Abey
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm italic">2024-01-10</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400 text-sm">BCG
                                        (at Birth)
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
      <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                              Completed
                                          </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-primary hover:underline text-sm font-semibold">Details
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div
                            className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Showing 1-10 of 412 records</span>
                            <div className="flex items-center gap-1">
                                <button
                                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"
                                    disabled="">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="px-3 py-1 text-sm font-bold bg-primary text-white rounded">1</button>
                                <button
                                    className="px-3 py-1 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">2
                                </button>
                                <button
                                    className="px-3 py-1 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">3
                                </button>
                                <span className="px-2">...</span>
                                <button
                                    className="px-3 py-1 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">42
                                </button>
                                <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700">
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
                                <span className="text-xs font-bold text-slate-400">IN 2 DAYS</span>
                            </div>
                            <div className="bg-primary/10 rounded-lg p-4">
                                <p className="text-primary font-bold text-lg">Thursday, Oct 24</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Wattala Community Center</p>
                                <p className="text-xs mt-2 text-slate-500 font-medium">8:30 AM — 12:30 PM</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Expected Attendance:</span>
                                    <span className="font-bold">24 Children</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>Inventory Check:</span>
                                    <span className="font-bold text-emerald-600 flex items-center gap-1">
      <span className="material-symbols-outlined text-[16px]">check_circle</span> Ready
                                  </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                            <h4 className="font-bold mb-4">Recent Area Activity</h4>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div
                                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-blue-500">add_reaction</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            <span className="font-bold">New Baby Registered:</span> K. V. Wickramasinghe
                                        </p>
                                        <p className="text-xs text-slate-400">2 hours ago • By Midwife Perera</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div
                                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-emerald-500">verified</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            <span className="font-bold">Vaccination Updated:</span> 3 Pentavalent
                                            completed for S. Jayawardena
                                        </p>
                                        <p className="text-xs text-slate-400">Yesterday at 4:30 PM</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div
                                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                        <span
                                            className="material-symbols-outlined text-rose-500">notification_important</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">
                                            <span className="font-bold">Follow-up Required:</span> Missed OPV-1 for T.
                                            Kumara
                                        </p>
                                        <p className="text-xs text-slate-400">Oct 21, 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="mt-auto py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-b-xl">
                    <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                            <span>© 2026 Ministry of Health Sri Lanka</span>
                            <span className="hidden md:block">•</span>
                            <Link to="/settings" className="hover:text-primary">Data Protection Policy</Link>
                            <span className="hidden md:block">•</span>
                            <Link to="/settings" className="hover:text-primary">Help Center</Link>
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
        </PhmLayout>
    );
};
