import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export const MohAnalyticsDashboardPage: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <div className="flex flex-col min-h-screen">

                <header
                    className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 sticky top-0 z-50">
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
                            <Link to="/moh-analytics-dashboard" className="text-primary text-sm font-semibold leading-normal border-b-2 border-primary py-1">
                                Overview
                            </Link>
                            <Link to="/generate-reports" className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors">
                                Reports
                            </Link>
                            <Link to="/audit-logs" className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors">
                                Audit Logs
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-end gap-4 items-center">
                        <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
                            <div
                                className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden border border-slate-200 dark:border-slate-700">
                                <div
                                    className="text-slate-400 flex bg-slate-50 dark:bg-slate-800 items-center justify-center px-3 border-r-0">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </div>
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-0 h-full placeholder:text-slate-400 text-sm"
                                    placeholder="Search data points..." value=""/>
                            </div>
                        </label>
                        <div className="flex gap-2">
                            <button
                                className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button
                                className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined">settings</span>
                            </button>
                        </div>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                            data-alt="MOH Officer profile photo"
                            style={{"backgroundImage": "url('https://via.placeholder.com/150')"}}></div>
                    </div>
                </header>
                <div className="flex flex-1">

                    <aside
                        className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col justify-between p-4 sticky top-[65px] h-[calc(100vh-65px)]">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-1 px-2">
                                <h1 className="text-slate-900 dark:text-white text-base font-bold">Dr. Sarah
                                    Johnson</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Regional Medical
                                    Officer</p>
                            </div>
                            <nav className="flex flex-col gap-1">
                                <Link to="/moh-analytics-dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white shadow-md shadow-primary/20">
                                    <span className="material-symbols-outlined">dashboard</span>
                                    <span className="text-sm font-semibold">Dashboard</span>
                                </Link>
                                <Link to="/moh-analytics-dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                                    <span className="material-symbols-outlined">bar_chart</span>
                                    <span className="text-sm font-medium">Regional Analytics</span>
                                </Link>
                                <Link to="/generate-reports" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                                    <span className="material-symbols-outlined">description</span>
                                    <span className="text-sm font-medium">PHM Reports</span>
                                </Link>
                                <Link to="/audit-logs" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                                    <span className="material-symbols-outlined">history</span>
                                    <span className="text-sm font-medium">Audit Logs</span>
                                </Link>
                                <Link to="/phm-dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                                    <span className="material-symbols-outlined">groups</span>
                                    <span className="text-sm font-medium">PHM Management</span>
                                </Link>
                            </nav>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div
                                className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                                <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">System
                                    Health</p>
                                <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs text-slate-600 dark:text-slate-300">Data live: Colombo District</span>
                                </div>
                            </div>
                            <button
                                className="w-full flex items-center justify-center gap-2 rounded-lg h-11 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all">
                                <span className="material-symbols-outlined text-[20px]">ios_share</span>
                                <span>Generate Report</span>
                            </button>
                        </div>
                    </aside>

                    <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
                        <div className="max-w-[1200px] mx-auto p-6 md:p-8 flex flex-col gap-8">

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                                <div className="flex flex-col gap-2">
                                    <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Officer
                                        Analytics Dashboard</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Real-time
                                        vaccination coverage and PHM performance across the Western Province.</p>
                                </div>
                                <div
                                    className="flex gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                                    <button
                                        className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">Daily
                                    </button>
                                    <button
                                        className="px-4 py-2 text-xs font-bold rounded-lg text-slate-500 dark:text-slate-400">Weekly
                                    </button>
                                    <button
                                        className="px-4 py-2 text-xs font-bold rounded-lg bg-primary text-white">Monthly
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div
                                    className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Coverage
                                            %</p>
                                        <span className="material-symbols-outlined text-primary">analytics</span>
                                    </div>
                                    <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">94.2%</p>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span
                                            className="material-symbols-outlined text-green-500 text-[18px]">trending_up</span>
                                        <p className="text-green-500 text-sm font-semibold">+2.1% from last month</p>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Missed
                                            Vaccinations</p>
                                        <span className="material-symbols-outlined text-red-500">warning</span>
                                    </div>
                                    <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">1,204</p>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span
                                            className="material-symbols-outlined text-red-500 text-[18px]">trending_down</span>
                                        <p className="text-red-500 text-sm font-semibold">-5.4% improvement</p>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total
                                            Registered</p>
                                        <span className="material-symbols-outlined text-blue-500">how_to_reg</span>
                                    </div>
                                    <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">45,892</p>
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span
                                            className="material-symbols-outlined text-green-500 text-[18px]">add_circle</span>
                                        <p className="text-green-500 text-sm font-semibold">+842 new entries</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                <div className="xl:col-span-2 flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-slate-900 dark:text-white text-xl font-bold">Regional
                                            Coverage Heatmap</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-slate-500 font-medium">Low</span>
                                            <div
                                                className="h-2 w-24 bg-gradient-to-r from-red-200 via-yellow-200 to-green-500 rounded-full"></div>
                                            <span className="text-xs text-slate-500 font-medium">High</span>
                                        </div>
                                    </div>
                                    <div
                                        className="relative bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden min-h-[450px] shadow-lg border border-slate-200 dark:border-slate-700">
                                        <div className="absolute inset-0 bg-cover bg-center"
                                             data-alt="Heatmap of Colombo district vaccination coverage"
                                             data-location="Colombo"
                                             style={{"backgroundImage": "url('https://via.placeholder.com/150')"}}></div>

                                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>

                                        <div className="absolute top-4 left-4 right-4 flex justify-between">
                                            <div className="flex flex-col min-w-[240px]">
                                                <div
                                                    className="flex items-center bg-white dark:bg-slate-900 rounded-lg shadow-xl px-3 py-2 border border-slate-200 dark:border-slate-700">
                                                    <span
                                                        className="material-symbols-outlined text-slate-400 mr-2 text-[20px]">location_on</span>
                                                    <input
                                                        className="bg-transparent border-none text-sm p-0 focus:ring-0 w-full text-slate-900 dark:text-white"
                                                        placeholder="Search PHM zone..."/>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div
                                                    className="flex flex-col rounded-lg bg-white dark:bg-slate-900 shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                                    <button
                                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">
                                                        <span className="material-symbols-outlined">add</span>
                                                    </button>
                                                    <button
                                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white">
                                                        <span className="material-symbols-outlined">remove</span>
                                                    </button>
                                                </div>
                                                <button
                                                    className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                                                    <span className="material-symbols-outlined">my_location</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div
                                            className="absolute bottom-4 left-4 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-[220px]">
                                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Selected
                                                Area</p>
                                            <h4 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">Colombo
                                                Municipal Council</h4>
                                            <div className="mt-3 flex flex-col gap-2">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-slate-500">Coverage</span>
                                                    <span className="font-bold text-green-500">97.8%</span>
                                                </div>
                                                <div
                                                    className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-green-500 h-full w-[97%]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div
                                        className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
                                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Vaccination
                                            Type Distribution</h3>
                                        <div className="flex-1 flex flex-col items-center justify-center py-4">

                                            <div className="relative size-48">
                                                <svg className="size-full" viewbox="0 0 36 36">
                                                    <circle className="dark:stroke-slate-800" cx="18" cy="18"
                                                            fill="transparent" r="15.9" stroke="#e2e8f0"
                                                            stroke-dasharray="100" stroke-dashoffset="0"
                                                            stroke-width="3"></circle>
                                                    <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#137fec"
                                                            stroke-dasharray="70 100" stroke-dashoffset="0"
                                                            stroke-width="3"></circle>
                                                    <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#0ea5e9"
                                                            stroke-dasharray="15 100" stroke-dashoffset="-70"
                                                            stroke-width="3"></circle>
                                                    <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#f43f5e"
                                                            stroke-dasharray="15 100" stroke-dashoffset="-85"
                                                            stroke-width="3"></circle>
                                                </svg>
                                                <div
                                                    className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-2xl font-bold dark:text-white">45k</span>
                                                    <span className="text-[10px] text-slate-500 font-bold uppercase">Total doses</span>
                                                </div>
                                            </div>
                                            <div className="w-full grid grid-cols-2 gap-4 mt-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="size-2 rounded-full bg-primary"></div>
                                                    <span className="text-xs text-slate-600 dark:text-slate-400">BCG (70%)</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="size-2 rounded-full bg-sky-500"></div>
                                                    <span className="text-xs text-slate-600 dark:text-slate-400">OPV (15%)</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="size-2 rounded-full bg-rose-500"></div>
                                                    <span className="text-xs text-slate-600 dark:text-slate-400">DTP (15%)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Trend
                                            Highlights</h3>
                                        <div className="flex flex-col gap-4">
                                            <div
                                                className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                                <div
                                                    className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                                                    <span className="material-symbols-outlined">trending_up</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold dark:text-white">Polio Coverage
                                                        Up</p>
                                                    <p className="text-xs text-slate-500">Maharagama PHM reported 99%
                                                        coverage this week.</p>
                                                </div>
                                            </div>
                                            <div
                                                className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                                <div
                                                    className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                                                    <span className="material-symbols-outlined">schedule</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold dark:text-white">Backlog Warning</p>
                                                    <p className="text-xs text-slate-500">Nugegoda area has 45 pending
                                                        BCG registrations.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">PHM Area
                                        Performance Comparison</h3>
                                    <button className="text-primary text-sm font-bold flex items-center gap-1">
                                        <span>View Detailed Report</span>
                                        <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">PHM
                                                Zone
                                            </th>
                                            <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Population</th>
                                            <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Vaccinated</th>
                                            <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Coverage
                                                %
                                            </th>
                                            <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Growth</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-sm">Colombo
                                                01
                                            </td>
                                            <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">12,450</td>
                                            <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">12,180</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                        <div className="bg-green-500 h-full w-[98%]"></div>
                                                    </div>
                                                    <span
                                                        className="text-sm font-bold text-slate-900 dark:text-white">98%</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-green-500 text-sm font-bold">+1.2%</td>
                                        </tr>
                                        <tr className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-sm">Dehiwala</td>
                                            <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">8,920</td>
                                            <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">8,206</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                        <div className="bg-primary h-full w-[92%]"></div>
                                                    </div>
                                                    <span
                                                        className="text-sm font-bold text-slate-900 dark:text-white">92%</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-green-500 text-sm font-bold">+0.8%</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-sm">Ratmalana</td>
                                            <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">10,120</td>
                                            <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">8,602</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                        <div className="bg-amber-500 h-full w-[85%]"></div>
                                                    </div>
                                                    <span
                                                        className="text-sm font-bold text-slate-900 dark:text-white">85%</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-red-500 text-sm font-bold">-2.4%</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};
