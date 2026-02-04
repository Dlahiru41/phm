import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const GrowthChartPage: React.FC = () => {
    return (
        <>
            <div className="layout-container flex flex-col min-h-screen">

                <header
                    className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-3 sticky top-0 z-50">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-primary">
                            <div className="size-6">
                                <span className="material-symbols-outlined text-3xl">vaccines</span>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-[#0d141b] dark:text-slate-50 text-lg font-bold leading-tight tracking-[-0.015em]">
                                    SuwaCare LK
                                </h2>
                                <p className="text-[11px] font-medium text-[#4c739a] dark:text-slate-400">
                                    National Child Vaccination Management System
                                </p>
                            </div>
                        </div>
                        <label className="flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div
                                    className="text-[#4c739a] flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg"
                                    data-icon="search">
                                    <span className="material-symbols-outlined text-lg">search</span>
                                </div>
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 rounded-lg text-[#0d141b] dark:text-slate-50 focus:outline-0 focus:ring-0 border-none bg-slate-100 dark:bg-slate-800 h-full placeholder:text-[#4c739a] px-4 rounded-l-none pl-2 text-sm font-normal"
                                    placeholder="Search children, clinics..." value=""/>
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-1 justify-end gap-8">
                        <nav className="flex items-center gap-9">
                            <Link to="/parent-dashboard-desktop" className="text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">
                                Dashboard
                            </Link>
                            <Link to="/child-profile-schedule" className="text-[#0d141b] dark:text-slate-50 text-sm font-bold border-b-2 border-primary py-1">
                                Children
                            </Link>
                            <Link to="/phm-dashboard" className="text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">
                                Clinics
                            </Link>
                            <Link to="/generate-reports" className="text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">
                                Reports
                            </Link>
                        </nav>
                        <div className="flex items-center gap-4">
                            <button
                                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-[0.015em]">
                                <span className="truncate">PHM Profile</span>
                            </button>
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200"
                                data-alt="User avatar of healthcare professional"
                                style={{"backgroundImage": "url('https://via.placeholder.com/150')"}}></div>
                        </div>
                    </div>
                </header>
                <div className="flex flex-1">

                    <aside
                        className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col border-b border-slate-100 dark:border-slate-800 pb-4">
                                <h1 className="text-[#0d141b] dark:text-slate-50 text-base font-bold leading-normal">Samadhi
                                    Perera</h1>
                                <p className="text-[#4c739a] dark:text-slate-500 text-xs font-medium">ID: CV-89234 • 14
                                    Months</p>
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
                                    <span className="material-symbols-outlined text-xl"
                                          style={{"fontVariationSettings": "FILL 1"}}>monitoring</span>
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
                        <button
                            className="flex w-full items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm shadow-primary/20">
                            <span className="material-symbols-outlined text-lg">add_circle</span>
                            <span className="truncate">Add Measurement</span>
                        </button>
                    </aside>

                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-[1200px] mx-auto p-8">

                            <nav className="flex flex-wrap gap-2 mb-4">
                                <Link to="/parent-dashboard-desktop" className="text-[#4c739a] text-sm font-medium hover:underline">Home</Link>
                                <span className="text-[#4c739a] text-sm font-medium">/</span>
                                <Link to="/child-profile-schedule" className="text-[#4c739a] text-sm font-medium hover:underline">Children
                                    List</Link>
                                <span className="text-[#4c739a] text-sm font-medium">/</span>
                                <span
                                    className="text-[#0d141b] dark:text-slate-300 text-sm font-medium">Growth Progress</span>
                            </nav>

                            <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-[#0d141b] dark:text-slate-50 text-3xl font-black leading-tight tracking-tight">WHO
                                        Growth Standards</h1>
                                    <p className="text-[#4c739a] dark:text-slate-400 text-base font-normal">Samadhi's
                                        progress against global pediatric benchmarks. Last visit: Oct 24, 2023</p>
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
                                <div
                                    className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium">Current
                                            Weight</p>
                                        <span className="material-symbols-outlined text-primary">scale</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-[#0d141b] dark:text-slate-50 text-3xl font-bold">12.5 kg</p>
                                        <p className="text-[#078838] text-sm font-bold">+0.4kg</p>
                                    </div>
                                    <p className="text-xs text-[#4c739a] dark:text-slate-500">Above 50th percentile</p>
                                </div>
                                <div
                                    className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium">Current
                                            Height</p>
                                        <span className="material-symbols-outlined text-primary">straighten</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-[#0d141b] dark:text-slate-50 text-3xl font-bold">88.2 cm</p>
                                        <p className="text-[#078838] text-sm font-bold">+1.2cm</p>
                                    </div>
                                    <p className="text-xs text-[#4c739a] dark:text-slate-500">Within normal range</p>
                                </div>
                                <div
                                    className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <p className="text-[#4c739a] dark:text-slate-400 text-sm font-medium">BMI
                                            Z-Score</p>
                                        <span className="material-symbols-outlined text-primary">analytics</span>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-[#0d141b] dark:text-slate-50 text-3xl font-bold">+0.5</p>
                                        <p className="text-[#4c739a] text-sm font-medium">Optimal</p>
                                    </div>
                                    <p className="text-xs text-[#4c739a] dark:text-slate-500">Standard deviation from
                                        median</p>
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
                                            <th className="px-6 py-3 text-[#4c739a] text-xs font-bold uppercase tracking-wider">Age</th>
                                            <th className="px-6 py-3 text-[#4c739a] text-xs font-bold uppercase tracking-wider">Weight
                                                (kg)
                                            </th>
                                            <th className="px-6 py-3 text-[#4c739a] text-xs font-bold uppercase tracking-wider">Height
                                                (cm)
                                            </th>
                                            <th className="px-6 py-3 text-[#4c739a] text-xs font-bold uppercase tracking-wider">BMI
                                                Z-Score
                                            </th>
                                            <th className="px-6 py-3 text-[#4c739a] text-xs font-bold uppercase tracking-wider">Recorded
                                                By
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="px-6 py-4 text-sm font-medium">Oct 24, 2023</td>
                                            <td className="px-6 py-4 text-sm">14m 10d</td>
                                            <td className="px-6 py-4 text-sm font-bold">12.5</td>
                                            <td className="px-6 py-4 text-sm">88.2</td>
                                            <td className="px-6 py-4 text-sm"><span
                                                className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">+0.5</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#4c739a]">Mrs. Silva (PHM)</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="px-6 py-4 text-sm font-medium">Aug 12, 2023</td>
                                            <td className="px-6 py-4 text-sm">12m 0d</td>
                                            <td className="px-6 py-4 text-sm font-bold">12.1</td>
                                            <td className="px-6 py-4 text-sm">87.0</td>
                                            <td className="px-6 py-4 text-sm"><span
                                                className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">+0.3</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#4c739a]">Mrs. Silva (PHM)</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                            <td className="px-6 py-4 text-sm font-medium">May 05, 2023</td>
                                            <td className="px-6 py-4 text-sm">8m 22d</td>
                                            <td className="px-6 py-4 text-sm font-bold">10.8</td>
                                            <td className="px-6 py-4 text-sm">82.5</td>
                                            <td className="px-6 py-4 text-sm"><span
                                                className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-bold">+1.2</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#4c739a]">Mrs. Silva (PHM)</td>
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
