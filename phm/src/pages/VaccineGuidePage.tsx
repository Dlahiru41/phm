import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { dataService } from '../services/DataService';
import { ParentLayout } from '../components/ParentLayout';
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

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await dataService.getAllVaccines();
        if (!cancelled) setVaccines(list.filter((v) => v.isActive));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

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
        <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">Vaccine Guide</h1>
        <p className="text-[#4c739a] dark:text-slate-400">
          Overview of vaccines in the national schedule. Use this as a reference for your child&apos;s immunization.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#4c739a] dark:text-slate-400">Loading vaccines…</div>
      ) : vaccines.length === 0 ? (
        <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-[#4c739a] dark:text-slate-400 mb-4 block">vaccines</span>
          <p className="text-[#0d141b] dark:text-white font-medium">No vaccine information available at the moment.</p>
        </div>
      ) : (
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
                    <p className="text-[#4c739a] dark:text-slate-400 text-sm mb-2">{v.description}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-1 text-[#4c739a] dark:text-slate-400">
                      <span className="material-symbols-outlined text-base">schedule</span>
                      Recommended: {formatRecommendedAge(v.recommendedAge)}
                    </span>
                    {v.dosageInfo && (
                      <span className="inline-flex items-center gap-1 text-[#4c739a] dark:text-slate-400">
                        <span className="material-symbols-outlined text-base">science</span>
                        {v.dosageInfo}
                      </span>
                    )}
                    {v.manufacturer && (
                      <span className="text-[#4c739a] dark:text-slate-400">By {v.manufacturer}</span>
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
    return (
      <ParentLayout activeNav="dashboard">
        {content}
      </ParentLayout>
    );
  }

  return <div className="flex min-h-screen bg-background-light dark:bg-background-dark">{content}</div>;
};
