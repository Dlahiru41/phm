import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { ParentSidebar } from '../components/ParentLayout';

export const ChildProfileSchedulePage: React.FC = () => {
    const navigate = useNavigate();
    const isParent = AuthService.isParent();

    const content = (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="layout-container flex h-full grow flex-col">
                    {!isParent && (
                    <header
                        className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-background-dark px-10 py-3 sticky top-0 z-50">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-4 text-primary">
                                <div className="size-8">
                                    <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <path clip-rule="evenodd"
                                              d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                                              fill="currentColor" fill-rule="evenodd"></path>
                                        <path clip-rule="evenodd"
                                              d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                                              fill="currentColor" fill-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <h2 className="text-[#0d141b] dark:text-slate-100 text-lg font-bold leading-tight tracking-[-0.015em]">SuwaCare LK</h2>
                            </div>
                            <label className="flex flex-col min-w-40 !h-10 max-w-64">
                                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                    <div
                                        className="text-[#4c739a] flex border-none bg-[#e7edf3] dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                                        <span className="material-symbols-outlined text-xl">search</span>
                                    </div>
                                    <input
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d141b] dark:text-slate-100 focus:outline-0 focus:ring-0 border-none bg-[#e7edf3] dark:bg-slate-800 focus:border-none h-full placeholder:text-[#4c739a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal"
                                        placeholder="Search children or clinics" value=""/>
                                </div>
                            </label>
                        </div>
                        <div className="flex flex-1 justify-end gap-8">
                            <div className="flex items-center gap-9">
                                <Link to="/parent-dashboard-desktop" className="text-[#0d141b] dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                                <Link to="/child-profile-schedule" className="text-primary text-sm font-bold leading-normal">
                                    Children
                                </Link>
                                <Link to="/phm-dashboard" className="text-[#0d141b] dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors">
                                    Clinics
                                </Link>
                                <Link to="/generate-reports" className="text-[#0d141b] dark:text-slate-200 text-sm font-medium leading-normal hover:text-primary transition-colors">
                                    Reports
                                </Link>
                            </div>
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                                data-alt="User profile avatar of a health officer"
                                style={{"backgroundImage": "url('https://via.placeholder.com/150')"}}></div>
                        </div>
                    </header>
                    )}
                    <main className="flex-1 flex flex-col items-center py-8">
                        {isParent && (
                            <div className="w-full max-w-[1200px] px-6 mb-4">
                                <button
                                    onClick={() => navigate('/parent-dashboard-desktop')}
                                    className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined">arrow_back</span>
                                    <span className="text-sm font-medium">Back to Dashboard</span>
                                </button>
                            </div>
                        )}
                        <div className="flex w-full max-w-[1200px] gap-8 px-6">
                            {!isParent && (
                            <aside className="hidden lg:flex flex-col w-64 gap-2 shrink-0">
                                <div
                                    className="flex flex-col gap-2 p-2 bg-white dark:bg-slate-900 rounded-xl border border-[#e7edf3] dark:border-slate-800">
                                    <div
                                        className="flex items-center gap-3 px-3 py-2 text-[#4c739a] hover:bg-background-light dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
                                        <span className="material-symbols-outlined">dashboard</span>
                                        <p className="text-sm font-medium">Overview</p>
                                    </div>
                                    <div
                                        className="flex items-center gap-3 px-3 py-2 bg-primary/10 text-primary rounded-lg cursor-pointer">
                                        <span className="material-symbols-outlined">calendar_today</span>
                                        <p className="text-sm font-bold">Schedules</p>
                                    </div>
                                    <div
                                        className="flex items-center gap-3 px-3 py-2 text-[#4c739a] hover:bg-background-light dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
                                        <span className="material-symbols-outlined">trending_up</span>
                                        <p className="text-sm font-medium">Growth Monitoring</p>
                                    </div>
                                    <div
                                        className="flex items-center gap-3 px-3 py-2 text-[#4c739a] hover:bg-background-light dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-all">
                                        <span className="material-symbols-outlined">history</span>
                                        <p className="text-sm font-medium">Medical History</p>
                                    </div>
                                    <div
                                        className="flex items-center gap-3 px-3 py-2 text-[#4c739a] hover:bg-background-light dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-all mt-4 border-t border-[#e7edf3] dark:border-slate-800 pt-4">
                                        <span className="material-symbols-outlined">settings</span>
                                        <p className="text-sm font-medium">Settings</p>
                                    </div>
                                </div>
                            </aside>
                            )}
                            <div className="flex-1 flex flex-col gap-6 min-w-0">
                                <div
                                    className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#e7edf3] dark:border-slate-800">
                                    <div className="flex @container">
                                        <div
                                            className="flex w-full flex-col gap-6 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                                            <div className="flex gap-6 items-center">
                                                <div
                                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 ring-4 ring-primary/10 shadow-lg"
                                                    data-alt="Portrait of infant Arjun Perera"
                                                    style={{"backgroundImage": "url('https://via.placeholder.com/150')"}}></div>
                                                <div className="flex flex-col justify-center">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h1 className="text-[#0d141b] dark:text-white text-3xl font-extrabold leading-tight tracking-[-0.015em]">Arjun
                                                            Perera</h1>
                                                        <span
                                                            className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full">ACTIVE</span>
                                                    </div>
                                                    <p className="text-[#4c739a] dark:text-slate-400 text-base font-semibold">Reg
                                                        ID: <span
                                                            className="text-[#0d141b] dark:text-slate-200">2023-SL-04592</span>
                                                    </p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <p className="text-[#4c739a] dark:text-slate-400 text-sm flex items-center gap-1">
                                                            <span
                                                                className="material-symbols-outlined text-lg">cake</span> 12th
                                                            May 2023
                                                        </p>
                                                        <p className="text-[#4c739a] dark:text-slate-400 text-sm flex items-center gap-1 border-l border-[#cfdbe7] dark:border-slate-700 pl-4">
                                                            <span
                                                                className="material-symbols-outlined text-lg">male</span> Male
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex w-full max-w-[480px] gap-3 @[480px]:w-auto">
                                                <button
                                                    className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-[#e7edf3] dark:bg-slate-800 text-[#0d141b] dark:text-slate-200 text-sm font-bold transition-all hover:bg-slate-200 dark:hover:bg-slate-700">
                                                    <span
                                                        className="material-symbols-outlined mr-2 text-xl">edit</span> Edit
                                                    Profile
                                                </button>
                                                <button
                                                    className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold shadow-md shadow-primary/20 transition-all hover:brightness-110">
                                                    <span
                                                        className="material-symbols-outlined mr-2 text-xl">badge</span> Print
                                                    Card
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7edf3] dark:border-slate-800 overflow-hidden">
                                    <div className="px-4 bg-background-light/50 dark:bg-slate-800/50">
                                        <div className="flex border-b border-[#cfdbe7] dark:border-slate-700 gap-8">
                                            <button className="flex flex-col items-center justify-center border-b-[3px] border-primary text-primary pb-[13px] pt-4">
                                                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Vaccination
                                                    Schedule</p>
                                            </button>
                                            <button 
                                                onClick={() => navigate('/growth-chart')}
                                                className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-[#4c739a] dark:text-slate-400 pb-[13px] pt-4 hover:text-[#0d141b] dark:hover:text-slate-200 transition-colors">
                                                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Growth
                                                    Charts</p>
                                            </button>
                                            <button 
                                                onClick={() => navigate('/child-profile-schedule')}
                                                className="flex flex-col items-center justify-center border-b-[3px] border-transparent text-[#4c739a] dark:text-slate-400 pb-[13px] pt-4 hover:text-[#0d141b] dark:hover:text-slate-200 transition-colors">
                                                <p className="text-sm font-bold leading-normal tracking-[0.015em]">History</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white flex items-center gap-2">
                                                <span
                                                    className="material-symbols-outlined text-primary">event_note</span>
                                                Immunization Timeline
                                            </h3>
                                            <div className="flex gap-4">
                                                <div className="flex items-center gap-1">
                                                    <span className="size-2 rounded-full bg-green-500"></span>
                                                    <span
                                                        className="text-xs text-[#4c739a] dark:text-slate-400 font-medium">Done</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="size-2 rounded-full bg-primary"></span>
                                                    <span
                                                        className="text-xs text-[#4c739a] dark:text-slate-400 font-medium">Upcoming</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="size-2 rounded-full bg-red-500"></span>
                                                    <span
                                                        className="text-xs text-[#4c739a] dark:text-slate-400 font-medium">Missed</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-[48px_1fr] gap-x-4">
                                            <div className="flex flex-col items-center pt-1">
                                                <div
                                                    className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full p-1 ring-4 ring-green-50 dark:ring-green-950">
                                                    <span
                                                        className="material-symbols-outlined block">check_circle</span>
                                                </div>
                                                <div
                                                    className="w-[2px] bg-green-200 dark:bg-green-900/50 h-16 grow"></div>
                                            </div>
                                            <div className="flex flex-1 flex-col pb-10">
                                                <div
                                                    className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                                                    <p className="text-[#0d141b] dark:text-white text-base font-bold">BCG
                                                        Vaccine (Birth Dose)</p>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <p className="text-green-700 dark:text-green-400 text-sm font-semibold flex items-center gap-1">
                                                            Status: Administered
                                                        </p>
                                                        <p className="text-[#4c739a] dark:text-slate-400 text-sm flex items-center gap-1">
                                                            <span
                                                                className="material-symbols-outlined text-base">calendar_month</span> 12/05/2023
                                                        </p>
                                                        <p className="text-[#4c739a] dark:text-slate-400 text-sm flex items-center gap-1">
                                                            <span
                                                                className="material-symbols-outlined text-base">location_on</span> Colombo
                                                            MOH
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-[2px] bg-green-200 dark:bg-green-900/50 h-4"></div>
                                                <div
                                                    className="bg-primary/10 text-primary rounded-full p-1 ring-4 ring-primary/5">
                                                    <span className="material-symbols-outlined block">schedule</span>
                                                </div>
                                                <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-16 grow"></div>
                                            </div>
                                            <div className="flex flex-1 flex-col pb-10">
                                                <div
                                                    className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-[#e7edf3] dark:border-slate-800 shadow-sm">
                                                    <p className="text-[#0d141b] dark:text-white text-base font-bold">Pentavalent
                                                        1 & OPV 1 (2 Months)</p>
                                                    <div className="flex items-center gap-4 mt-1">
                                                        <p className="text-primary text-sm font-semibold flex items-center gap-1">
                                                            Status: Upcoming
                                                        </p>
                                                        <p className="text-[#4c739a] dark:text-slate-400 text-sm flex items-center gap-1">
                                                            <span
                                                                className="material-symbols-outlined text-base">event</span> 12/07/2023
                                                        </p>
                                                        <p className="text-[#4c739a] dark:text-slate-400 text-sm italic">Expected
                                                            in 3 days</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-4"></div>
                                                <div
                                                    className="bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full p-1 ring-4 ring-red-50 dark:ring-red-950">
                                                    <span className="material-symbols-outlined block">warning</span>
                                                </div>
                                                <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-16 grow"></div>
                                            </div>
                                            <div className="flex flex-1 flex-col pb-10">
                                                <div
                                                    className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-[#0d141b] dark:text-white text-base font-bold">Vitamin
                                                                A (6 Months)</p>
                                                            <div className="flex items-center gap-4 mt-1">
                                                                <p className="text-red-600 dark:text-red-400 text-sm font-semibold">Status:
                                                                    Missed</p>
                                                                <p className="text-[#4c739a] dark:text-slate-400 text-sm">Scheduled:
                                                                    12/11/2023</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="text-xs font-bold px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">Reschedule
                                                            Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="w-[2px] bg-slate-200 dark:bg-slate-700 h-4"></div>
                                                <div
                                                    className="bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-full p-1">
                                                    <span
                                                        className="material-symbols-outlined block">radio_button_unchecked</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 flex-col py-2">
                                                <div className="p-4">
                                                    <p className="text-slate-400 dark:text-slate-600 text-base font-medium">Measles
                                                        & Rubella 1 (9 Months)</p>
                                                    <p className="text-slate-400 dark:text-slate-600 text-sm mt-1">Scheduled:
                                                        12/02/2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
    );

    return isParent ? (
        <div className="flex min-h-screen">
            <ParentSidebar activeNav="health-records" />
            <div className="flex-1 overflow-y-auto min-w-0">
                {content}
            </div>
        </div>
    ) : content;
};
