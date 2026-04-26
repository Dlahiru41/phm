import React, { useEffect, useState } from 'react';
import { mohService } from '../services/MohService';
import { TranslationService } from '../services/TranslationService';

interface DashboardStats {
  totalChildren: number;
  vaccinatedCount: number;
  coveragePercentage: number;
  missedVaccinations: number;
  newRegistrationsThisMonth: number;
}

interface AreaPerf {
  areaCode?: string;
  areaName: string;
  phmName?: string;
  totalChildren: number;
  vaccinated: number;
  missed?: number;
  coveragePercentage: number;
}

interface VaccineBreakdown {
  vaccineId: string;
  vaccineName: string;
  administered: number;
  coveragePercentage: number;
}

const DONUT_COLORS = ['#137fec', '#0ea5e9', '#f43f5e', '#f59e0b', '#10b981', '#8b5cf6'];

function coverageColor(pct: number): string {
  if (pct >= 90) return 'bg-green-500';
  if (pct >= 75) return 'bg-primary';
  return 'bg-amber-500';
}


export const MohDashboardContent: React.FC = () => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [areas, setAreas] = useState<AreaPerf[]>([]);
  const [vaccines, setVaccines] = useState<VaccineBreakdown[]>([]);
  const [totalDoses, setTotalDoses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch all dashboard data from real API endpoints
        const [totalChildren, coverage, missedVaccinations, phmPerformance, recentChildren, gnDistribution] = await Promise.all([
          mohService.getTotalChildren(),
          mohService.getVaccinationCoverage(),
          mohService.getMissedVaccinations(),
          mohService.getPHMPerformanceSummary(),
          mohService.getRecentChildren(),
          mohService.getGNDistribution(),
        ]);

        // Set stats
        if (coverage) {
          setStats({
            totalChildren: coverage.totalChildren,
            vaccinatedCount: coverage.vaccinatedChildren,
            coveragePercentage: coverage.coverage,
            missedVaccinations: missedVaccinations,
            newRegistrationsThisMonth: recentChildren.length,
          });
        }

        // Build area performance from PHM performance data and GN distribution
        const areaMap = new Map<string, AreaPerf>();

        // Initialize from GN distribution
        gnDistribution.forEach(gn => {
          areaMap.set(gn.gnDivision, {
            areaName: gn.gnDivision,
            totalChildren: gn.total,
            vaccinated: 0,
            missed: 0,
            coveragePercentage: 0,
          });
        });

        // Merge with PHM performance data
        phmPerformance.forEach(phm => {
          const key = phm.gnDivision;
          if (!areaMap.has(key)) {
            areaMap.set(key, {
              areaName: phm.gnDivision,
              totalChildren: phm.totalChildren,
              vaccinated: phm.vaccinated,
              missed: 0,
              coveragePercentage: phm.coverage,
              phmName: phm.phmName,
            });
          } else {
            const existing = areaMap.get(key)!;
            existing.vaccinated = phm.vaccinated;
            existing.coveragePercentage = phm.coverage;
            existing.phmName = phm.phmName;
          }
        });

        const areaList = Array.from(areaMap.values());
        setAreas(areaList);

        // Vaccine breakdown would need to come from coverage report
        // For now, we'll set empty vaccines as the endpoint structure doesn't include vaccine breakdown
        setVaccines([]);
        setTotalDoses(0);
      } catch (error) {
        console.error('Error fetching MOH dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [period]);

  // Build donut chart segments from vaccine breakdown
  const donutSegments = (() => {
    if (!vaccines.length) return [];
    const total = vaccines.reduce((s, v) => s + v.administered, 0);
    if (!total) return [];
    let offset = 0;
    return vaccines.map((v, i) => {
      const pct = (v.administered / total) * 100;
      const seg = { ...v, pct, offset, color: DONUT_COLORS[i % DONUT_COLORS.length] };
      offset += pct;
      return seg;
    });
  })();

  // Trend highlights: best performer and worst (most missed)
  const bestArea = areas.length
    ? [...areas].sort((a, b) => b.coveragePercentage - a.coveragePercentage)[0]
    : null;
  const worstArea = areas.length
    ? [...areas].sort((a, b) => b.missed - a.missed)[0]
    : null;

  const fmt = (n: number) => n.toLocaleString();

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 flex flex-col gap-8">
      {/* Header */}
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
          {(['daily', 'weekly', 'monthly'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-xs font-bold rounded-lg capitalize transition-colors ${
                period === p
                  ? 'bg-primary text-white'
                  : p === 'daily'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Coverage %</p>
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>
          <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">
            {loading ? '—' : `${stats?.coveragePercentage?.toFixed(1) ?? '—'}%`}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="material-symbols-outlined text-green-500 text-[18px]">trending_up</span>
            <p className="text-green-500 text-sm font-semibold">
              {loading ? '...' : `${fmt(stats?.vaccinatedCount ?? 0)} vaccinated`}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Missed Vaccinations</p>
            <span className="material-symbols-outlined text-red-500">warning</span>
          </div>
          <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">
            {loading ? '—' : fmt(stats?.missedVaccinations ?? 0)}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="material-symbols-outlined text-red-500 text-[18px]">trending_down</span>
            <p className="text-red-500 text-sm font-semibold">Requires follow-up</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Registered</p>
            <span className="material-symbols-outlined text-blue-500">how_to_reg</span>
          </div>
          <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold">
            {loading ? '—' : fmt(stats?.totalChildren ?? 0)}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="material-symbols-outlined text-green-500 text-[18px]">add_circle</span>
            <p className="text-green-500 text-sm font-semibold">
              {loading ? '...' : `+${fmt(stats?.newRegistrationsThisMonth ?? 0)} new this month`}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Heatmap placeholder */}
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
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/150')" }} />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            <div className="absolute top-4 left-4 right-4 flex justify-between">
              <div className="flex flex-col min-w-[240px]">
                <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg shadow-xl px-3 py-2 border border-slate-200 dark:border-slate-700">
                  <span className="material-symbols-outlined text-slate-400 mr-2 text-[20px]">location_on</span>
                  <input className="bg-transparent border-none text-sm p-0 focus:ring-0 w-full text-slate-900 dark:text-white" placeholder="Search PHM zone..." readOnly />
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
            {/* Best performing area panel */}
            {bestArea && (
              <div className="absolute bottom-4 left-4 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-[220px]">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Top Area</p>
                <h4 className="text-slate-900 dark:text-white font-bold text-lg leading-tight">{bestArea.areaName}</h4>
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Coverage</span>
                    <span className="font-bold text-green-500">{bestArea.coveragePercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${Math.min(bestArea.coveragePercentage, 100)}%` }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Vaccination type donut */}
          <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Vaccination Type Distribution</h3>
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              {loading ? (
                <div className="size-48 flex items-center justify-center">
                  <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
                </div>
              ) : vaccines.length === 0 ? (
                <p className="text-slate-500 text-sm">No data available</p>
              ) : (
                <>
                  <div className="relative size-48">
                    <svg className="size-full" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#e2e8f0" strokeDasharray="100" strokeDashoffset="0" strokeWidth="3" className="dark:stroke-slate-800" />
                      {donutSegments.map((seg) => (
                        <circle
                          key={seg.vaccineId}
                          cx="18" cy="18" fill="transparent" r="15.9"
                          stroke={seg.color}
                          strokeDasharray={`${seg.pct} 100`}
                          strokeDashoffset={`-${seg.offset}`}
                          strokeWidth="3"
                        />
                      ))}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold dark:text-white">
                        {totalDoses >= 1000 ? `${(totalDoses / 1000).toFixed(0)}k` : fmt(totalDoses)}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Total doses</span>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-3 mt-6">
                    {donutSegments.map((seg) => (
                      <div key={seg.vaccineId} className="flex items-center gap-2">
                        <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                        <span className="text-xs text-slate-600 dark:text-slate-400 truncate">
                          {seg.vaccineName} ({seg.pct.toFixed(0)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Trend highlights */}
          <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Trend Highlights</h3>
            <div className="flex flex-col gap-4">
              {loading ? (
                <p className="text-slate-400 text-sm">Loading...</p>
              ) : (
                <>
                  {bestArea && (
                    <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                        <span className="material-symbols-outlined">trending_up</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold dark:text-white">Top Performer</p>
                        <p className="text-xs text-slate-500">
                          {bestArea.areaName} {bestArea.phmName ? `(${bestArea.phmName})` : ''} has {bestArea.coveragePercentage.toFixed(1)}% coverage.
                        </p>
                      </div>
                    </div>
                  )}
                  {worstArea && worstArea.missed > 0 && (
                    <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold dark:text-white">Backlog Warning</p>
                        <p className="text-xs text-slate-500">
                          {worstArea.areaName} has {fmt(worstArea.missed)} missed vaccinations requiring follow-up.
                        </p>
                      </div>
                    </div>
                  )}
                  {!bestArea && !worstArea && (
                    <p className="text-slate-400 text-sm">No trend data available.</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PHM Area Performance Table */}
      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">PHM Area Performance Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">PHM Zone</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Assigned PHM</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Total Children</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Vaccinated</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Coverage %</th>
                <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Missed</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">Loading...</td>
                </tr>
              ) : areas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">No area data available.</td>
                </tr>
              ) : (
                areas.map((area, idx) => {
                  const barColor = coverageColor(area.coveragePercentage);
                  const isLast = idx === areas.length - 1;
                  return (
                    <tr key={area.areaCode} className={`${!isLast ? 'border-b border-slate-50 dark:border-slate-800' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}>
                      <td className="py-4 px-4 font-bold text-slate-900 dark:text-white text-sm">{area.areaName}</td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">{area.phmName ?? '—'}</td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">{fmt(area.totalChildren)}</td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400 text-sm">{fmt(area.vaccinated)}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className={`${barColor} h-full`} style={{ width: `${Math.min(area.coveragePercentage, 100)}%` }} />
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{area.coveragePercentage.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className={`py-4 px-4 text-sm font-bold ${area.missed > 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {fmt(area.missed)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
