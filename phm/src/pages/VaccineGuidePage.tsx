import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { dataService } from '../services/DataService';
import { ParentLayout } from '../components/ParentLayout';
import { TranslationService } from '../services/TranslationService';
import { sriLankaVaccineSchedule } from '../config/vaccineSchedule';
import type { Vaccine } from '../types/models';

function formatRecommendedAge(months: number): string {
  if (months === 0) return 'At birth';
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''}`;
  const years = Math.floor(months / 12);
  const m = months % 12;
  return m === 0 ? `${years} year${years !== 1 ? 's' : ''}` : `${years}y ${m}m`;
}

export const VaccineGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const isParent = AuthService.isParent();
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'schedule' | 'detailed'>('schedule');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let list = await dataService.getAllVaccines();
        if ((!list || list.length === 0) && !cancelled) {
          // Fallback to local vaccine schedule if API returns empty
          list = sriLankaVaccineSchedule as unknown as Vaccine[];
        }
        if (!cancelled) setVaccines(list ? list.filter((v) => v.isActive) : []);
      } catch {
        // Fallback to local vaccine schedule on error
        if (!cancelled) {
          setVaccines(sriLankaVaccineSchedule as unknown as Vaccine[]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const scheduleByAge = vaccines.reduce(
    (acc, vaccine) => {
      const age = formatRecommendedAge(vaccine.recommendedAge);
      if (!acc[age]) acc[age] = [];
      acc[age].push(vaccine);
      return acc;
    },
    {} as Record<string, Vaccine[]>
  );

  const sortedAges = Object.keys(scheduleByAge).sort((a, b) => {
    const aMonths = a === 'At birth' ? 0 : parseInt(a.split(' ')[0]);
    const bMonths = b === 'At birth' ? 0 : parseInt(b.split(' ')[0]);
    return aMonths - bMonths;
  });

  const content = (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <button
          type="button"
          onClick={() => (isParent ? navigate('/parent-dashboard-desktop') : navigate(-1))}
          className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="text-sm font-medium">{isParent ? 'Back to Dashboard' : 'Back'}</span>
        </button>
        <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">
          {TranslationService.t('vaccine.title')}
        </h1>
        <p className="text-[#4c739a] dark:text-slate-400">
          {TranslationService.t('vaccine.guide')} - Overview of vaccines recommended for your child's health and
          development.
        </p>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setViewMode('schedule')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            viewMode === 'schedule'
              ? 'bg-primary text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-[#0d141b] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined">schedule</span>
            Schedule View
          </span>
        </button>
        <button
          onClick={() => setViewMode('detailed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            viewMode === 'detailed'
              ? 'bg-primary text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-[#0d141b] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <span className="material-symbols-outlined">info</span>
            Detailed View
          </span>
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#4c739a] dark:text-slate-400">Loading vaccines…</div>
      ) : vaccines.length === 0 ? (
        <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-[#4c739a] dark:text-slate-400 mb-4 block">
            vaccines
          </span>
          <p className="text-[#0d141b] dark:text-white font-medium">No vaccine information available at the moment.</p>
        </div>
      ) : viewMode === 'schedule' ? (
        // Schedule View - Group by age
        <div className="space-y-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>📋 Sri Lanka National Immunization Schedule:</strong> This schedule is based on WHO recommendations
              and adapted for Sri Lankan public health guidelines.
            </p>
          </div>

          {sortedAges.map((age) => (
            <div key={age}>
              <h3 className="text-lg font-semibold text-[#0d141b] dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">schedule</span>
                Age: {age}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scheduleByAge[age]?.map((vaccine) => (
                  <div
                    key={vaccine.vaccineId}
                    className="bg-white dark:bg-[#1a2632] rounded-xl border border-[#e7edf3] dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-bold text-[#0d141b] dark:text-white mb-2">{vaccine.name}</h4>
                    {vaccine.dosageInfo && (
                      <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-2">
                        <strong>Dosage:</strong> {vaccine.dosageInfo}
                      </p>
                    )}
                    {vaccine.description && (
                      <p className="text-sm text-[#4c739a] dark:text-slate-400">{vaccine.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Detailed View - All vaccines with full details
        <div className="space-y-4">
          {vaccines.map((v) => (
            <div
              key={v.vaccineId}
              className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-[#0d141b] dark:text-white mb-1">{v.name}</h2>
                  {v.description && (
                    <p className="text-[#4c739a] dark:text-slate-400 text-sm mb-4">{v.description}</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <span className="inline-flex items-center gap-2 text-[#4c739a] dark:text-slate-400">
                      <span className="material-symbols-outlined text-base">schedule</span>
                      <strong>Age:</strong> {formatRecommendedAge(v.recommendedAge)}
                    </span>
                    {v.dosageInfo && (
                      <span className="inline-flex items-center gap-2 text-[#4c739a] dark:text-slate-400">
                        <span className="material-symbols-outlined text-base">science</span>
                        <strong>Dosage:</strong> {v.dosageInfo}
                      </span>
                    )}
                    {v.manufacturer && (
                      <span className="text-[#4c739a] dark:text-slate-400">
                        <strong>Manufacturer:</strong> {v.manufacturer}
                      </span>
                    )}
                    {v.intervalDays > 0 && (
                      <span className="text-[#4c739a] dark:text-slate-400">
                        <strong>Interval:</strong> {v.intervalDays} days from previous dose
                      </span>
                    )}
                  </div>
                </div>
                <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">vaccines</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isParent) {
    return <ParentLayout activeNav="dashboard">{content}</ParentLayout>;
  }

  return <div className="flex min-h-screen bg-background-light dark:bg-background-dark">{content}</div>;
};
