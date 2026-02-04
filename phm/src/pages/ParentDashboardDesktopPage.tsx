import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export const ParentDashboardDesktopPage: React.FC = () => {
    const navigate = useNavigate();
    
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
                            </Link>
                            <Link to="/growth-chart" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined">monitoring</span>
                                <p className="text-sm font-medium">Growth Chart</p>
                            </Link>
                            <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#4c739a] hover:bg-primary/10 transition-colors">
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
                            onClick={() => {
                                AuthService.logout();
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
                                <Link to="/settings" className="text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">
                                    Contact Support
                                </Link>
                                <Link to="/moh-analytics-dashboard" className="text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">
                                    MOH Finder
                                </Link>
                            </div>
                            <div className="h-6 w-px bg-[#e7edf3] dark:bg-slate-700"></div>
                            <div className="flex items-center gap-4">

                                <div
                                    className="flex h-9 items-center justify-center rounded-lg bg-[#e7edf3] dark:bg-slate-700 p-1">
                                    <label
                                        className="flex cursor-pointer h-full items-center justify-center rounded px-3 bg-white dark:bg-slate-600 shadow-sm text-primary text-xs font-bold">
                                        <span>EN</span>
                                        <input checked="" className="hidden" name="lang" type="radio" value="English"/>
                                    </label>
                                    <label
                                        className="flex cursor-pointer h-full items-center justify-center rounded px-3 text-[#4c739a] dark:text-slate-400 text-xs font-bold">
                                        <span>සිං</span>
                                        <input className="hidden" name="lang" type="radio" value="Sinhala"/>
                                    </label>
                                    <label
                                        className="flex cursor-pointer h-full items-center justify-center rounded px-3 text-[#4c739a] dark:text-slate-400 text-xs font-bold">
                                        <span>தமிழ்</span>
                                        <input className="hidden" name="lang" type="radio" value="Tamil"/>
                                    </label>
                                </div>
                                <div className="flex items-center gap-3 pl-2">
                                    <div className="text-right">
                                        <p className="text-sm font-bold leading-none">Amara Perera</p>
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
                            <button
                                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined">person_add</span>
                                <span>Register New Child</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-2xl font-bold">Linked Children</h2>
                            <span className="bg-primary/10 text-primary text-sm font-bold px-2 py-0.5 rounded-full">3 Registered</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            <div
                                className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-2xl bg-cover bg-center"
                                             data-alt="Small boy smiling portrait"
                                             style={{"backgroundImage": "url('https://via.placeholder.com/150')"}}></div>
                                        <div>
                                            <h3 className="text-lg font-bold">Kavindu Perera</h3>
                                            <p className="text-[#4c739a] dark:text-slate-400 text-sm">Age: 4 years, 2
                                                months</p>
                                        </div>
                                    </div>
                                    <span
                                        className="material-symbols-outlined text-[#4c739a] cursor-pointer hover:text-primary">more_vert</span>
                                </div>
                                <div
                                    className="bg-[#f0f9ff] dark:bg-primary/10 border border-primary/20 rounded-xl p-4">
                                    <div className="flex items-center gap-3 text-primary mb-2">
                                        <span className="material-symbols-outlined text-xl">event_upcoming</span>
                                        <p className="text-sm font-bold uppercase tracking-wider">Next Dose</p>
                                    </div>
                                    <p className="text-[#0d141b] dark:text-slate-50 font-bold text-lg leading-tight">DTP
                                        Booster (4th Dose)</p>
                                    <p className="text-primary font-medium text-sm mt-1">Due in 5 days (Oct 28,
                                        2023)</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div
                                        className="flex justify-between text-xs font-bold uppercase text-[#4c739a] dark:text-slate-400">
                                        <span>Vaccination Progress</span>
                                        <span>85%</span>
                                    </div>
                                    <div
                                        className="w-full bg-[#e7edf3] dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-[85%] rounded-full"></div>
                                    </div>
                                </div>
                                <button
                                    className="w-full py-3 bg-[#e7edf3] dark:bg-slate-700 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary font-bold rounded-lg transition-colors">
                                    View Full History
                                </button>
                            </div>

                            <div
                                className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 rounded-2xl bg-cover bg-center"
                                             data-alt="Baby girl portrait"
                                             style={{"backgroundImage": "url('https://via.placeholder.com/150')"}}></div>
                                        <div>
                                            <h3 className="text-lg font-bold">Nimasha Perera</h3>
                                            <p className="text-[#4c739a] dark:text-slate-400 text-sm">Age: 8 months</p>
                                        </div>
                                    </div>
                                    <span
                                        className="material-symbols-outlined text-[#4c739a] cursor-pointer hover:text-primary">more_vert</span>
                                </div>
                                <div
                                    className="bg-[#fffbeb] dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700/50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 text-yellow-600 dark:text-yellow-500 mb-2">
                                        <span className="material-symbols-outlined text-xl">pending_actions</span>
                                        <p className="text-sm font-bold uppercase tracking-wider">Appointment
                                            Pending</p>
                                    </div>
                                    <p className="text-[#0d141b] dark:text-slate-50 font-bold text-lg leading-tight">Measles
                                        (1st Dose)</p>
                                    <p className="text-yellow-600 dark:text-yellow-500 font-medium text-sm mt-1">Book
                                        for early November</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div
                                        className="flex justify-between text-xs font-bold uppercase text-[#4c739a] dark:text-slate-400">
                                        <span>Vaccination Progress</span>
                                        <span>40%</span>
                                    </div>
                                    <div
                                        className="w-full bg-[#e7edf3] dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full w-[40%] rounded-full"></div>
                                    </div>
                                </div>
                                <button
                                    className="w-full py-3 bg-[#e7edf3] dark:bg-slate-700 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary font-bold rounded-lg transition-colors">
                                    View Full History
                                </button>
                            </div>

                            <div
                                className="bg-white dark:bg-[#1a2632] border-2 border-dashed border-[#e7edf3] dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary transition-colors">
                                <div
                                    className="h-16 w-16 rounded-full bg-[#e7edf3] dark:bg-slate-700 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <span
                                        className="material-symbols-outlined text-3xl text-[#4c739a] group-hover:text-primary">add_circle</span>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">Add
                                        another child</h3>
                                    <p className="text-[#4c739a] dark:text-slate-400 text-sm">Using Registration
                                        Number</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-6">Recent Records</h2>
                            <div
                                className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead
                                        className="bg-[#f8fafc] dark:bg-slate-800 text-xs font-bold uppercase text-[#4c739a] dark:text-slate-400">
                                    <tr>
                                        <th className="px-6 py-4">Child Name</th>
                                        <th className="px-6 py-4">Vaccine</th>
                                        <th className="px-6 py-4">Date Administered</th>
                                        <th className="px-6 py-4">Officer/PHM</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#e7edf3] dark:divide-slate-700">
                                    <tr className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors">
                                        <td className="px-6 py-4 font-medium">Kavindu Perera</td>
                                        <td className="px-6 py-4">Polio (OPV)</td>
                                        <td className="px-6 py-4">Sep 15, 2023</td>
                                        <td className="px-6 py-4 text-[#4c739a] dark:text-slate-400">Sisira Jayasekara
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-primary font-bold text-sm hover:underline">Download
                                                Card
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-[#f8fafc] dark:hover:bg-slate-800 transition-colors">
                                        <td className="px-6 py-4 font-medium">Nimasha Perera</td>
                                        <td className="px-6 py-4">Pentavalent (3rd)</td>
                                        <td className="px-6 py-4">Aug 22, 2023</td>
                                        <td className="px-6 py-4 text-[#4c739a] dark:text-slate-400">Sisira Jayasekara
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-primary font-bold text-sm hover:underline">Download
                                                Card
                                            </button>
                                        </td>
                                    </tr>
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
