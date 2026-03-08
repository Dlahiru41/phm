import React, { useEffect, useState } from 'react';
import { dataService } from '../services/DataService';

interface AreaCoverage {
  areaCode: string;
  areaName: string;
  totalChildren: number;
  vaccinatedCount: number;
  coveragePercentage: number;
}

interface AreaPerf {
  areaCode: string;
  areaName: string;
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


export const RegionalAnalyticsPage: React.FC = () => {
  const [byArea, setByArea] = useState<AreaCoverage[]>([]);
  const [areaPerf, setAreaPerf] = useState<AreaPerf[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      dataService.getVaccinationCoverage(),
      dataService.getAreaPerformance(),
    ]).then(([coverage, perf]) => {
      if (coverage?.byArea) setByArea(coverage.byArea as AreaCoverage[]);
      if (Array.isArray(perf)) setAreaPerf(perf as AreaPerf[]);
    }).finally(() => setLoading(false));
  }, []);

  const fmt = (n: number) => n.toLocaleString();

  // Show up to 4 areas as "province" summary cards
  const summaryCards = byArea.slice(0, 4);

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

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
                <div className="h-7 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
              </div>
            ))
          : summaryCards.length > 0
          ? summaryCards.map((area) => (
              <div key={area.areaCode} className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 truncate">{area.areaName}</p>
                <p className={`text-2xl font-bold ${coverageTextColor(area.coveragePercentage)}`}>
                  {area.coveragePercentage.toFixed(1)}%
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-1">
                  {fmt(area.vaccinatedCount)} / {fmt(area.totalChildren)} children
                </p>
              </div>
            ))
          : (
              <div className="col-span-4 text-center text-slate-400 text-sm py-6">No regional data available.</div>
            )
        }
      </div>

      {/* Regional comparison bar chart (visual only — driven by data) */}
      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Regional Comparison</h3>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
          </div>
        ) : byArea.length === 0 ? (
          <div className="h-32 flex items-center justify-center">
            <p className="text-slate-400 text-sm">No data available.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-2">
            {byArea.map((area) => (
              <div key={area.areaCode} className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-36 shrink-0 truncate">{area.areaName}</span>
                <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      area.coveragePercentage >= 90 ? 'bg-green-500' : area.coveragePercentage >= 75 ? 'bg-primary' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(area.coveragePercentage, 100)}%` }}
                  />
                </div>
                <span className={`text-sm font-bold w-12 text-right ${coverageTextColor(area.coveragePercentage)}`}>
                  {area.coveragePercentage.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* District Breakdown table */}
      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold">District Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Area / Zone</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Assigned PHM</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total Children</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Vaccinated</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Coverage %</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Missed</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">Loading...</td>
                </tr>
              ) : areaPerf.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">No district data available.</td>
                </tr>
              ) : (
                areaPerf.map((area, idx) => (
                  <tr key={area.areaCode} className={`${idx < areaPerf.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{area.areaName}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{area.phmName ?? '—'}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{fmt(area.totalChildren)}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{fmt(area.vaccinated)}</td>
                    <td className={`py-3 px-4 font-bold ${coverageTextColor(area.coveragePercentage)}`}>
                      {area.coveragePercentage.toFixed(1)}%
                    </td>
                    <td className={`py-3 px-4 font-bold text-sm ${area.missed > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {fmt(area.missed)}
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
