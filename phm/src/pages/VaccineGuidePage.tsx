import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { ParentLayout } from '../components/ParentLayout';
import { TranslationService } from '../services/TranslationService';
import { sriLankaVaccineSchedule } from '../config/vaccineSchedule';
import type { Vaccine } from '../types/models';

function formatAge(recommendedAge: number): string {
  if (recommendedAge === 0) return 'At birth';
  if (recommendedAge < 12) return `${recommendedAge} month${recommendedAge !== 1 ? 's' : ''}`;
  const years = Math.floor(recommendedAge / 12);
  const months = recommendedAge % 12;
  return months === 0 ? `${years} year${years !== 1 ? 's' : ''}` : `${years}y ${months}m`;
}

export const VaccineGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const isParent = AuthService.isParent();
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always use the corrected local vaccine schedule
    setVaccines(sriLankaVaccineSchedule as unknown as Vaccine[]);
    setLoading(false);
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
          <span className="text-sm font-medium">{isParent ? TranslationService.t('common.backToDashboard') : TranslationService.t('common.back')}</span>
        </button>
        <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">
          {TranslationService.t('vaccine.title')}
        </h1>
        <p className="text-[#4c739a] dark:text-slate-400">
          {TranslationService.t('vaccine.guide')}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#4c739a] dark:text-slate-400">{TranslationService.t('common.loading')}</div>
      ) : vaccines.length === 0 ? (
        <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-[#4c739a] dark:text-slate-400 mb-4 block">
            vaccines
          </span>
          <p className="text-[#0d141b] dark:text-white font-medium">{TranslationService.t('vaccine.noData') || 'No vaccine information available at the moment.'}</p>
        </div>
      ) : (
        <div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>📋 {TranslationService.t('vaccine.guide')}</strong> {TranslationService.t('vaccine.scheduleDescription') || 'This schedule follows Sri Lanka\'s official vaccination guidelines.'}
            </p>
          </div>

          {/* Simple Table View */}
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f8fafc] dark:bg-slate-800 border-b border-[#e7edf3] dark:border-slate-700">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase text-[#4c739a] dark:text-slate-400">{TranslationService.t('vaccine.name')}</th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase text-[#4c739a] dark:text-slate-400">{TranslationService.t('vaccine.recommendedAge')}</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.map((vaccine, idx) => (
                  <tr
                    key={vaccine.vaccineId}
                    className={`border-b border-[#e7edf3] dark:border-slate-700 ${
                      idx % 2 === 0 ? 'bg-white dark:bg-[#1a2632]' : 'bg-[#f8fafc] dark:bg-slate-800/50'
                    } hover:bg-[#f0f9ff] dark:hover:bg-slate-700/50 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-[#0d141b] dark:text-white text-sm">{vaccine.name}</p>
                        {vaccine.description && (
                          <p className="text-xs text-[#4c739a] dark:text-slate-400 mt-1">{vaccine.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                        <span className="material-symbols-outlined text-base">schedule</span>
                        {vaccine.notes || formatAge(vaccine.recommendedAge)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  if (isParent) {
    return <ParentLayout activeNav="dashboard" showBackToDashboard={false}>{content}</ParentLayout>;
  }

  return <div className="flex min-h-screen bg-background-light dark:bg-background-dark">{content}</div>;
};
