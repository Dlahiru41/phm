import React from 'react';

export const MohPhmManagementPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
          PHM Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
          Manage PHM areas, officers, and assignments under your region.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">location_city</span>
            <p className="text-slate-900 dark:text-white font-bold">PHM Areas</p>
          </div>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">24</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Active in region</p>
        </div>
        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">person</span>
            <p className="text-slate-900 dark:text-white font-bold">PHM Officers</p>
          </div>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">28</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Registered</p>
        </div>
        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">child_care</span>
            <p className="text-slate-900 dark:text-white font-bold">Children in Region</p>
          </div>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">45,892</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Under PHM coverage</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold">PHM Areas in Your Region</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Area / PHM Zone</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Assigned Officer</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Children</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Coverage %</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Colombo 01</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">PHM Officer</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">12,180</td>
                <td className="py-3 px-4 font-bold text-green-500">98%</td>
              </tr>
              <tr className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Dehiwala</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">PHM Officer</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">8,206</td>
                <td className="py-3 px-4 font-bold text-primary">92%</td>
              </tr>
              <tr className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Ratmalana</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">PHM Officer</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">8,602</td>
                <td className="py-3 px-4 font-bold text-amber-500">85%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
