import React, { useEffect, useState } from 'react';
import { dataService } from '../services/DataService';

interface AreaPerf {
  areaCode: string;
  areaName: string;
  phmId?: string;
  phmName?: string;
  totalChildren: number;
  vaccinated: number;
  missed: number;
  coveragePercentage: number;
}

function coverageTextColor(pct: number): string {
  if (pct >= 90) return 'text-green-500';
  if (pct >= 75) return 'text-primary';
  return 'text-amber-500';
}

export const MohPhmManagementPage: React.FC = () => {
  const [areas, setAreas] = useState<AreaPerf[]>([]);
  const [totalChildren, setTotalChildren] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      dataService.getAreaPerformance(),
      dataService.getMOHDashboard(),
    ]).then(([areaList, dash]) => {
      if (Array.isArray(areaList)) setAreas(areaList as AreaPerf[]);
      if (dash) setTotalChildren(dash.totalChildren);
    }).finally(() => setLoading(false));
  }, []);

  const fmt = (n: number) => n.toLocaleString();

  // Count distinct PHM officers (those with a phmId)
  const phmOfficerCount = areas.filter((a) => a.phmId).length;

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

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">location_city</span>
            <p className="text-slate-900 dark:text-white font-bold">PHM Areas</p>
          </div>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">
            {loading ? '—' : fmt(areas.length)}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Active in region</p>
        </div>

        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">person</span>
            <p className="text-slate-900 dark:text-white font-bold">PHM Officers</p>
          </div>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">
            {loading ? '—' : fmt(phmOfficerCount || areas.length)}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Registered</p>
        </div>

        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">child_care</span>
            <p className="text-slate-900 dark:text-white font-bold">Children in Region</p>
          </div>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">
            {loading ? '—' : fmt(totalChildren ?? 0)}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Under PHM coverage</p>
        </div>
      </div>

      {/* PHM Areas table */}
      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold">PHM Areas in Your Region</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Area / PHM Zone</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Assigned Officer</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Children</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Vaccinated</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Missed</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Coverage %</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">Loading...</td>
                </tr>
              ) : areas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">No PHM areas found.</td>
                </tr>
              ) : (
                areas.map((area, idx) => (
                  <tr
                    key={area.areaCode}
                    className={`${idx < areas.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}
                  >
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{area.areaName}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{area.phmName ?? '—'}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{fmt(area.totalChildren)}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{fmt(area.vaccinated)}</td>
                    <td className={`py-3 px-4 font-bold text-sm ${area.missed > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {fmt(area.missed)}
                    </td>
                    <td className={`py-3 px-4 font-bold ${coverageTextColor(area.coveragePercentage)}`}>
                      {area.coveragePercentage.toFixed(1)}%
                    </td>
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
