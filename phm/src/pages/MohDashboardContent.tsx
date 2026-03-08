import React from 'react';

export const MohDashboardContent: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
            Officer Analytics Dashboard
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
            Real-time vaccination coverage and PHM performance across the Western Province.
          </p>
        </div>
        <div className="flex gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <button type="button" className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
            Daily
          </button>
          <button type="button" className="px-4 py-2 text-xs font-bold rounded-lg text-slate-500 dark:text-slate-400">
            Weekly
          </button>
          <button type="button" className="px-4 py-2 text-xs font-bold rounded-lg bg-primary text-white">
            Monthly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Coverage %</p>
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>
          <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">94.2%</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="material-symbols-outlined text-green-500 text-[18px]">trending_up</span>
            <p className="text-green-500 text-sm font-semibold">+2.1% from last month</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Missed Vaccinations</p>
            <span className="material-symbols-outlined text-red-500">warning</span>
          </div>
          <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">1,204</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="material-symbols-outlined text-red-500 text-[18px]">trending_down</span>
            <p className="text-red-500 text-sm font-semibold">-5.4% improvement</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Registered</p>
            <span className="material-symbols-outlined text-blue-500">how_to_reg</span>
          </div>
          <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">45,892</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="material-symbols-outlined text-green-500 text-[18px]">add_circle</span>
            <p className="text-green-500 text-sm font-semibold">+842 new entries</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-900 dark:text-white text-xl font-bold">Regional Coverage Heatmap</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Low</span>
              <div className="h-2 w-24 bg-gradient-to-r from-red-200 via-yellow-200 to-green-500 rounded-full" />
              <span className="text-xs text-slate-500 font-medium">High</span>
            </div>
          </div>
          <div className="relative bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden min-h-[450px] shadow-lg border border-slate-200 dark:border-slate-700">
            <div
              className="absolute inset-0 bg-cover bg-center"
              data-alt="Heatmap of Colombo district vaccination coverage"
              style={{ backgroundImage: "url('https://via.placeholder.com/150')" }}
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <div className="flex flex-col min-w-[240px]">
                <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg shadow-xl px-3 py-2 border border-slate-200 dark:border-slate-700">
                  <span className="material-symbols-outlined text-slate-400 mr-2 text-[20px]">location_on</span>
                  <input
                    className="bg-transparent border-none text-sm p-0 focus:ring-0 w-full text-slate-900 dark:text-white"
                    placeholder="Search PHM zone..."
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col rounded-lg bg-white dark:bg-slate-900 shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <button type="button" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <button type="button" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                </div>
                <button type="button" className="p-2 rounded-lg bg-white dark:bg-slate-900 shadow-xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                  <span className="material-symbols-outlined">my_location</span>
                </button>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-[220px]">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                Selected Area
              </p>
              <h4 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">
                Colombo Municipal Council
              </h4>
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Coverage</span>
                  <span className="font-bold text-green-500">97.8%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[97%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Vaccination Type Distribution</h3>
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              <div className="relative size-48">
                <svg className="size-full" viewBox="0 0 36 36">
                  <circle className="dark:stroke-slate-800" cx="18" cy="18" fill="transparent" r="15.9" stroke="#e2e8f0" strokeDasharray="100" strokeDashoffset="0" strokeWidth="3" />
                  <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#137fec" strokeDasharray="70 100" strokeDashoffset="0" strokeWidth="3" />
                  <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#0ea5e9" strokeDasharray="15 100" strokeDashoffset="-70" strokeWidth="3" />
                  <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#f43f5e" strokeDasharray="15 100" strokeDashoffset="-85" strokeWidth="3" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold dark:text-white">45k</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Total doses</span>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">BCG (70%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-sky-500" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">OPV (15%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-rose-500" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">DTP (15%)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Trend Highlights</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="text-sm font-bold dark:text-white">Polio Coverage Up</p>
                  <p className="text-xs text-slate-500">Maharagama PHM reported 99% coverage this week.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="text-sm font-bold dark:text-white">Backlog Warning</p>
                  <p className="text-xs text-slate-500">Nugegoda area has 45 pending BCG registrations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">PHM Area Performance Comparison</h3>
          <button type="button" className="text-primary text-sm font-bold flex items-center gap-1">
            <span>View Detailed Report</span>
            <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">PHM Zone</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Population</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Vaccinated</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Coverage %</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-sm">Colombo 01</td>
                <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">12,450</td>
                <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">12,180</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full w-[98%]" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">98%</span>
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
                    <div className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[92%]" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">92%</span>
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
                    <div className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[85%]" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">85%</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-red-500 text-sm font-bold">-2.4%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
