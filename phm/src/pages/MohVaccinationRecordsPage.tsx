import React, { useEffect, useMemo, useState } from 'react';
import { mohService, VaccinationRecordListItem } from '../services/MohService';
import { TranslationService } from '../services/TranslationService';

const DEFAULT_LIMIT = 20;

export const MohVaccinationRecordsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<VaccinationRecordListItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(DEFAULT_LIMIT);
  const [total, setTotal] = useState(0);
  // filters removed — UI no longer displays filter controls per request

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use the raw absolute endpoint (no client-side query parameters) as requested
      const response = await mohService.listMOHVaccinationRecordsRaw();

      if (response) {
        setRecords(response.items ?? []);
        setTotal(response.total ?? (response.items ? response.items.length : 0));
        setPage(response.page ?? 1);
      } else {
        setRecords([]);
        setTotal(0);
        setError(TranslationService.t('common.error'));
      }
    } catch (err) {
      console.error('Error fetching MOH vaccination records:', err);
      setError(TranslationService.t('common.error'));
      setRecords([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (recordId: string) => {
    const confirmed = window.confirm(TranslationService.t('moh.records.deleteConfirm'));
    if (!confirmed) return;

    setDeletingId(recordId);
    try {
      const success = await mohService.deleteMOHVaccinationRecord(recordId);
      if (success) {
        await fetchRecords();
      } else {
        setError(TranslationService.t('moh.records.deleteFailed'));
      }
    } catch (err) {
      console.error('Error deleting record:', err);
      setError(TranslationService.t('moh.records.deleteFailed'));
    } finally {
      setDeletingId(null);
    }
  };

  const goToPage = async (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return;
    await fetchRecords();
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
          {TranslationService.t('moh.records.title')}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
          {TranslationService.t('moh.records.subtitle')}
        </p>
      </div>

      {/* filters removed per request */}

      {error && (
        <div className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <div className="animate-spin inline-block mb-2">
              <span className="material-symbols-outlined text-4xl">hourglass_top</span>
            </div>
            <p>{TranslationService.t('common.loading')}</p>
          </div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <p className="font-medium">{TranslationService.t('moh.records.empty')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800/60">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{TranslationService.t('moh.records.table.child')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{TranslationService.t('moh.records.table.vaccine')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{TranslationService.t('moh.records.table.status')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{TranslationService.t('moh.records.table.date')}</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{TranslationService.t('moh.records.table.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {records.map((record) => (
                  <tr key={record.recordId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-4 text-sm text-slate-900 dark:text-slate-100">{record.childName ?? record.childId ?? '-'}</td>
                    <td className="px-4 py-4 text-sm text-slate-900 dark:text-slate-100">{record.vaccineName ?? record.vaccineId ?? '-'}</td>
                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300 capitalize">{record.status ?? '-'}</td>
                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{record.administeredDate ?? record.dueDate ?? '-'}</td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(record.recordId)}
                        disabled={deletingId === record.recordId}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 text-white px-3 py-2 text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                        {deletingId === record.recordId ? TranslationService.t('common.loading') : TranslationService.t('common.delete')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap text-sm text-slate-600 dark:text-slate-300">
        <div>
          {TranslationService.t('moh.records.pagination')
            .replace('{page}', String(page))
            .replace('{totalPages}', String(totalPages))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={loading || page <= 1}
            className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
          >
            {TranslationService.t('moh.records.previous')}
          </button>
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={loading || page >= totalPages}
            className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
          >
            {TranslationService.t('moh.records.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

