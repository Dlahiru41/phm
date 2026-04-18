import React, { useEffect, useState } from 'react';
import { dataService } from '../services/DataService';
import type { Child } from '../types/models';

interface ChildDetailsModalProps {
  isOpen: boolean;
  childId: string;
  onClose: () => void;
}

export const ChildDetailsModal: React.FC<ChildDetailsModalProps> = ({
  isOpen,
  childId,
  onClose,
}) => {
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !childId) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await dataService.getChild(childId);
        if (!cancelled) {
          if (result) {
            setChild(result);
          } else {
            setError('Failed to load child details');
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError('Error fetching child details');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, childId]);

  if (!isOpen) return null;

  const calculateAge = (dateOfBirth: Date): string => {
    const now = new Date();
    let years = now.getFullYear() - dateOfBirth.getFullYear();
    let months = now.getMonth() - dateOfBirth.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${months} mo`;
    }
    return `${months} mo`;
  };

  const dobStr =
    child?.dateOfBirth instanceof Date
      ? child.dateOfBirth.toLocaleDateString()
      : child?.dateOfBirth
        ? (child.dateOfBirth as unknown as string)
        : '—';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between bg-white dark:bg-slate-900">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Child Details</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <span className="material-symbols-outlined text-4xl text-primary animate-spin">
                hourglass_top
              </span>
              <p className="text-slate-500 dark:text-slate-400">Loading child details...</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}

          {child && !loading && (
            <div className="space-y-6">
              {/* Basic Info Header */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 text-white flex items-center justify-center font-bold text-2xl shrink-0">
                  {[child.firstName, child.lastName]
                    .map((n) => (n || '').charAt(0))
                    .join('')
                    .toUpperCase() || '—'}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {child.firstName} {child.lastName}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Registration #: {child.registrationNumber || '—'}
                  </p>
                </div>
              </div>

              {/* Essential Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Date of Birth
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{dobStr}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Age: {child.dateOfBirth ? calculateAge(child.dateOfBirth) : '—'}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Gender
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                    {child.gender || '—'}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Parent WhatsApp Contact
                </h5>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {child.parentWhatsappNumber || '—'}
                  </p>
                </div>
              </div>

              {/* Area Information */}
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Area Information
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Area Name
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {child.areaName || '—'}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      Area Code
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {child.areaCode || '—'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-slate-200 dark:border-slate-800 px-6 py-4 bg-white dark:bg-slate-900 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



