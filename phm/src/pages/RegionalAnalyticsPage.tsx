import React from 'react';

export const RegionalAnalyticsPage: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
          Regional Analytics
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
          Vaccination coverage and performance metrics by region and district.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Western Province</p>
          <p className="text-slate-900 dark:text-white text-2xl font-bold">94.2%</p>
          <p className="text-green-500 text-xs font-medium mt-1">Coverage</p>
        </div>
        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Central Province</p>
          <p className="text-slate-900 dark:text-white text-2xl font-bold">91.8%</p>
          <p className="text-green-500 text-xs font-medium mt-1">Coverage</p>
        </div>
        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Southern Province</p>
          <p className="text-slate-900 dark:text-white text-2xl font-bold">89.5%</p>
          <p className="text-amber-500 text-xs font-medium mt-1">Coverage</p>
        </div>
        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Northern Province</p>
          <p className="text-slate-900 dark:text-white text-2xl font-bold">87.1%</p>
          <p className="text-amber-500 text-xs font-medium mt-1">Coverage</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Regional Comparison</h3>
        <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400 text-sm">Regional comparison chart (placeholder)</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold">District Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">District</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Province</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Coverage %</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 dark:border-slate-800">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Colombo</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Western</td>
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">96.1%</td>
                <td className="py-3 px-4 text-green-500 text-sm">+1.2%</td>
              </tr>
              <tr className="border-b border-slate-50 dark:border-slate-800">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Gampaha</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Western</td>
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">93.4%</td>
                <td className="py-3 px-4 text-green-500 text-sm">+0.8%</td>
              </tr>
              <tr className="border-b border-slate-50 dark:border-slate-800">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Kandy</td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Central</td>
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">91.8%</td>
                <td className="py-3 px-4 text-green-500 text-sm">+0.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
