import React from 'react';

export const ParentDashboardMobilePage: React.FC = () => {
    return (
        <>
            <header
                className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a2632] border-b border-[#e7edf3] dark:border-slate-700">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                    <h1 className="text-lg font-bold tracking-tight">SuwaCare LK</h1>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-[#4c739a] dark:text-slate-400">
                        <span className="material-symbols-outlined text-2xl">notifications</span>
                        <span
                            className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a2632]"></span>
                    </button>
                    <button className="p-2 text-[#4c739a] dark:text-slate-400">
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>
                </div>
            </header>
            <main className="flex flex-col gap-6 p-4">
                <section className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black">Hi, Amara</h2>
                        <p className="text-[#4c739a] dark:text-slate-400 text-sm">Welcome back to your dashboard</p>
                    </div>
                    <div
                        className="flex h-10 items-center justify-start rounded-lg bg-[#e7edf3] dark:bg-slate-700 p-1 w-fit">
                        <label
                            className="flex cursor-pointer h-full items-center justify-center rounded px-4 bg-white dark:bg-slate-600 shadow-sm text-primary text-xs font-bold">
                            <span>EN</span>
                            <input checked="" className="hidden" name="lang" type="radio" value="English"/>
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
                        <span className="text-primary text-sm font-bold">3 Children</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar -mx-4 px-4 snap-x">
                        <div
                            className="min-w-[85vw] bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-5 flex flex-col gap-4 shadow-sm snap-center">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-14 w-14 rounded-2xl bg-cover bg-center border border-[#e7edf3] dark:border-slate-700"
                                        style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4FqStuncYHDJVcXV1eGHedFHQNexdh-MCkH4enpMPrCnTsk0IwQp5ruXfUf0sQXx0swbm63qNcZogz0yK58ifP2EaW-62Ry5mSSBLUVFSSeCifAJGSbzw6jpqliEyGHT5aXWUn-65Y6kP4TpSah5Dau1aaXhcuaEkYGBQf0vvA5oOYtV4nwvv8x5yQQBhgocoJYZFc1blfhIVTGsTFeuerCyMOL6-Y6LNa8RsgCTiHu1GsPQhujFARmIbdXxhOcSTnG4FaH9T6syW')"}}
                                    ></div>
                                    <div>
                                        <h4 className="font-bold text-base">Kavindu Perera</h4>
                                        <p className="text-[#4c739a] dark:text-slate-400 text-xs">4 yrs, 2 months</p>
                                    </div>
                                </div>
                                <div className="relative h-12 w-12 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle className="text-[#e7edf3] dark:text-slate-700" cx="24" cy="24"
                                                fill="transparent" r="20" stroke="currentColor"
                                                stroke-width="4"></circle>
                                        <circle className="text-primary" cx="24" cy="24" fill="transparent" r="20"
                                                stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="18.8"
                                                stroke-width="4"></circle>
                                    </svg>
                                    <span className="absolute text-[10px] font-bold">85%</span>
                                </div>
                            </div>
                            <div className="bg-primary text-white rounded-xl p-3 shadow-lg shadow-primary/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-sm">event_upcoming</span>
                                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-90">Next Dose
                                        Alert</p>
                                </div>
                                <p className="font-bold text-sm leading-tight">DTP Booster (4th Dose)</p>
                                <p className="text-xs font-medium mt-1 opacity-90">Due: Oct 28, 2023 (In 5 days)</p>
                            </div>
                        </div>
                        <div
                            className="min-w-[85vw] bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-5 flex flex-col gap-4 shadow-sm snap-center">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-14 w-14 rounded-2xl bg-cover bg-center border border-[#e7edf3] dark:border-slate-700"
                                        style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4FqStuncYHDJVcXV1eGHedFHQNexdh-MCkH4enpMPrCnTsk0IwQp5ruXfUf0sQXx0swbm63qNcZogz0yK58ifP2EaW-62Ry5mSSBLUVFSSeCifAJGSbzw6jpqliEyGHT5aXWUn-65Y6kP4TpSah5Dau1aaXhcuaEkYGBQf0vvA5oOYtV4nwvv8x5yQQBhgocoJYZFc1blfhIVTGsTFeuerCyMOL6-Y6LNa8RsgCTiHu1GsPQhujFARmIbdXxhOcSTnG4FaH9T6syW')"}}
                                    ></div>
                                    <div>
                                        <h4 className="font-bold text-base">Nimasha Perera</h4>
                                        <p className="text-[#4c739a] dark:text-slate-400 text-xs">8 months</p>
                                    </div>
                                </div>
                                <div className="relative h-12 w-12 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle className="text-[#e7edf3] dark:text-slate-700" cx="24" cy="24"
                                                fill="transparent" r="20" stroke="currentColor"
                                                stroke-width="4"></circle>
                                        <circle className="text-primary" cx="24" cy="24" fill="transparent" r="20"
                                                stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="75.4"
                                                stroke-width="4"></circle>
                                    </svg>
                                    <span className="absolute text-[10px] font-bold">40%</span>
                                </div>
                            </div>
                            <div className="bg-yellow-500 text-white rounded-xl p-3 shadow-lg shadow-yellow-500/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-sm">pending_actions</span>
                                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-90">Appointment
                                        Pending</p>
                                </div>
                                <p className="font-bold text-sm leading-tight">Measles (1st Dose)</p>
                                <p className="text-xs font-medium mt-1 opacity-90">Book for early November</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-700 rounded-2xl active:bg-slate-50">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-primary">person_add</span>
                            </div>
                            <span className="text-xs font-bold text-center">Add Child</span>
                        </button>
                        <button
                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-700 rounded-2xl active:bg-slate-50">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-600">calendar_add_on</span>
                            </div>
                            <span className="text-xs font-bold text-center">Book Appointment</span>
                        </button>
                        <button
                            className="flex flex-col items-center justify-center gap-3 p-6 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-700 rounded-2xl active:bg-slate-50 col-span-2">
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
                        <div
                            className="flex items-center justify-between p-4 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-700 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">vaccines</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Polio (OPV)</p>
                                    <p className="text-[11px] text-[#4c739a] dark:text-slate-400">Kavindu • Sep 15,
                                        2023</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-[#4c739a] text-sm">chevron_right</span>
                        </div>
                        <div
                            className="flex items-center justify-between p-4 bg-white dark:bg-[#1a2632] border border-[#e7edf3] dark:border-slate-700 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary">vaccines</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Pentavalent (3rd)</p>
                                    <p className="text-[11px] text-[#4c739a] dark:text-slate-400">Nimasha • Aug 22,
                                        2023</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-[#4c739a] text-sm">chevron_right</span>
                        </div>
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
        <Link to="/settings" className="flex flex-col items-center gap-1 text-[#4c739a] dark:text-slate-400">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
            </nav>
        </>
    );
};
