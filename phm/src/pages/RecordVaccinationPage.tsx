import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { dataService } from '../services/DataService';
import { AuthService } from '../services/AuthService';
import { PhmLayout } from '../components/PhmLayout';
import { TranslationService } from '../services/TranslationService';
import { Child, Vaccine, VaccinationDueRecord } from '../types/models';

export const RecordVaccinationPage: React.FC = () => {
  const location = useLocation();
  const childIdFromState = location.state?.childId || null;
  const navigate = useNavigate();

  const [children, setChildren] = useState<Child[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [records, setRecords] = useState<VaccinationDueRecord[]>([]);
  const [formData, setFormData] = useState({
    childId: childIdFromState || '',
    vaccineId: '',
    doseNumber: '',
    dateGiven: '',
    batchNumber: '',
    administeredBy: '',
    location: '',
    site: '',
    nextDueDate: '',
    notes: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submittingForm, setSubmittingForm] = useState(false);

  useEffect(() => {
    if (!AuthService.isPHM()) {
      navigate('/');
      return;
    }

    const user = AuthService.getCurrentUser();
    const registeredBy = (user as any)?.phmId || user?.userId || '';
    if (registeredBy) dataService.getChildrenByPHM(registeredBy).then(setChildren);
    dataService.getAllVaccines().then(setVaccines);
    loadDueRecords();
  }, [navigate]);

  const loadDueRecords = async () => {
    setLoading(true);
    setError('');
    try {
      const list = await dataService.getVaccinationRecordsDuePHM();
      setRecords(list);
    } catch {
      setError(TranslationService.t('recordVac.errorMsg'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSubmittingForm(true);

    if (!formData.childId || !formData.vaccineId || !formData.dateGiven || !formData.administeredBy) {
      setError(TranslationService.t('profile.fillAllFields'));
      setSubmittingForm(false);
      return;
    }

    try {
      const res = await dataService.createVaccinationRecord({
        childId: formData.childId,
        vaccineId: formData.vaccineId,
        administeredDate: formData.dateGiven,
        batchNumber: formData.batchNumber || undefined,
        administeredBy: formData.administeredBy || undefined,
        location: formData.location || undefined,
        site: formData.site || undefined,
        doseNumber: formData.doseNumber ? parseInt(formData.doseNumber, 10) : undefined,
        nextDueDate: formData.nextDueDate || undefined,
        status: 'administered',
        notes: formData.notes || undefined,
      });

      if (res?.recordId) {
        setSuccess(true);
        setTimeout(() => navigate('/phm-dashboard'), 2000);
      } else {
        setError(TranslationService.t('recordVac.errorMsg'));
      }
    } catch {
      setError(TranslationService.t('recordVac.errorMsg'));
    } finally {
      setSubmittingForm(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTrack = async (record: VaccinationDueRecord, status: 'completed' | 'not_attended') => {
    setSubmittingId(record.scheduleId);
    setError('');
    setActionMessage('');

    const previous = records;
    const optimisticStatus = status === 'completed' ? 'completed' : 'missed';
    setRecords((prev) =>
      prev.map((item) =>
        item.scheduleId === record.scheduleId
          ? { ...item, status: optimisticStatus as any, missedNotified: status === 'not_attended' ? true : item.missedNotified }
          : item
      )
    );

    try {
      const result = await dataService.trackVaccinationRecord({
        scheduleId: record.scheduleId,
        status,
      });
      if (result !== null) {
        setActionMessage(status === 'completed' ? 'Vaccination marked completed.' : 'Vaccination marked as not attended.');
        await loadDueRecords();
      } else {
        setRecords(previous);
        setError('Failed to update vaccination status.');
      }
    } catch {
      setRecords(previous);
      setError('Failed to update vaccination status.');
    } finally {
      setSubmittingId(null);
    }
  };

  const formatDate = (value: Date) => value.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <PhmLayout activeNav="record-vaccination" showBackToDashboard={true}>
      <div className="w-full max-w-6xl mx-auto px-6 py-12 space-y-10">
        <div className="mb-2">
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">{TranslationService.t('recordVac.title')}</h1>
          <p className="text-[#4c739a] dark:text-slate-400">{TranslationService.t('recordVac.subtitle')}</p>
        </div>

        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
            {TranslationService.t('recordVac.successMsg')}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">{TranslationService.t('recordVac.selectChild')} *</p>
                <select
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  name="childId"
                  value={formData.childId}
                  onChange={handleChange}
                  required
                >
                  <option value="">{TranslationService.t('recordVac.selectChild')}</option>
                  {children.map((c) => (
                    <option key={c.childId} value={c.childId}>
                      {c.firstName} {c.lastName} - {c.registrationNumber}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">{TranslationService.t('recordVac.selectVaccine')} *</p>
                <select
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  name="vaccineId"
                  value={formData.vaccineId}
                  onChange={handleChange}
                  required
                >
                  <option value="">{TranslationService.t('recordVac.selectVaccine')}</option>
                  {vaccines.map((v) => (
                    <option key={v.vaccineId} value={v.vaccineId}>{v.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">{TranslationService.t('recordVac.doseNumber')} *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="number"
                  min="1"
                  name="doseNumber"
                  value={formData.doseNumber}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">{TranslationService.t('recordVac.dateGiven')} *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="date"
                  name="dateGiven"
                  value={formData.dateGiven}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">{TranslationService.t('recordVac.batchNumber')}</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">{TranslationService.t('recordVac.administeredBy')} *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="text"
                  name="administeredBy"
                  value={formData.administeredBy}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">{TranslationService.t('recordVac.site')}</p>
                <select
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  name="site"
                  value={formData.site}
                  onChange={handleChange}
                >
                  <option value="">{TranslationService.t('recordVac.site')}</option>
                  <option value="left-arm">{TranslationService.t('recordVac.site.leftArm') || 'Left Arm'}</option>
                  <option value="right-arm">{TranslationService.t('recordVac.site.rightArm') || 'Right Arm'}</option>
                  <option value="left-thigh">{TranslationService.t('recordVac.site.leftThigh') || 'Left Thigh'}</option>
                  <option value="right-thigh">{TranslationService.t('recordVac.site.rightThigh') || 'Right Thigh'}</option>
                  <option value="oral">{TranslationService.t('recordVac.site.oral') || 'Oral'}</option>
                </select>
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">{TranslationService.t('recordVac.nextDueDate')}</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="date"
                  name="nextDueDate"
                  value={formData.nextDueDate}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">{TranslationService.t('recordVac.notes')}</p>
                <textarea
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-24 px-4 py-3 text-sm resize-none"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Additional notes or observations..."
                />
              </label>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/phm-dashboard')}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {TranslationService.t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={submittingForm}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              <span className="material-symbols-outlined">save</span>
              {submittingForm ? TranslationService.t('profile.saving') : TranslationService.t('recordVac.submitBtn')}
            </button>
          </div>
        </form>

        <div className="overflow-hidden rounded-2xl border border-[#e7edf3] dark:border-slate-700 bg-white dark:bg-[#1a2632] shadow-sm">
          <div className="border-b border-[#e7edf3] dark:border-slate-700 px-6 py-4">
            <h2 className="text-xl font-bold text-[#0d141b] dark:text-white">{TranslationService.t('recordVac.dueTitle')}</h2>
            <p className="text-sm text-[#4c739a] dark:text-slate-400">{TranslationService.t('recordVac.reviewDueLabel') || 'Review due and missed vaccinations, then mark the outcome.'}</p>
          </div>
          {loading ? (
            <div className="p-10 text-center text-[#4c739a] dark:text-slate-400">{TranslationService.t('common.loading')}</div>
          ) : records.length === 0 ? (
            <div className="p-10 text-center text-[#4c739a] dark:text-slate-400">{TranslationService.t('recordVac.noDue')}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#e7edf3] dark:divide-slate-700">
                <thead className="bg-slate-50 dark:bg-slate-800/60">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{TranslationService.t('recordVac.table.childName') || 'Child name'}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{TranslationService.t('recordVac.table.regNo') || 'Registration no'}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{TranslationService.t('recordVac.table.vaccine') || 'Vaccine'}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{TranslationService.t('recordVac.table.dueDate') || 'Due date'}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{TranslationService.t('recordVac.table.status') || 'Current status'}</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{TranslationService.t('recordVac.table.actions') || 'Actions'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7edf3] dark:divide-slate-700">
                  {records.map((record) => (
                    <tr key={record.scheduleId} className={record.status === 'missed' ? 'bg-red-50/60 dark:bg-red-900/10' : ''}>
                      <td className="px-6 py-4 text-sm font-medium text-[#0d141b] dark:text-white">{record.childName}</td>
                      <td className="px-6 py-4 text-sm text-[#4c739a] dark:text-slate-400">{record.registrationNumber}</td>
                      <td className="px-6 py-4 text-sm text-[#4c739a] dark:text-slate-400">{record.vaccineName}</td>
                      <td className="px-6 py-4 text-sm text-[#4c739a] dark:text-slate-400">{formatDate(record.dueDate)}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${record.status === 'missed' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : record.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                            {record.status}
                          </span>
                          {record.reminderSent && <span className="text-xs text-amber-600 dark:text-amber-400">{TranslationService.t('recordVac.reminderSent') || 'Reminder sent'}</span>}
                          {record.missedNotified && <span className="text-xs text-red-600 dark:text-red-400">{TranslationService.t('recordVac.missedNotified') || 'Missed notification sent'}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={submittingId === record.scheduleId}
                            onClick={() => handleTrack(record, 'completed')}
                            className="rounded-lg bg-green-600 px-3 py-2 text-white text-xs font-semibold hover:bg-green-700 disabled:opacity-50"
                          >
                            {TranslationService.t('recordVac.markCompleted') || 'Mark Completed'}
                          </button>
                          <button
                            type="button"
                            disabled={submittingId === record.scheduleId}
                            onClick={() => handleTrack(record, 'not_attended')}
                            className="rounded-lg bg-red-600 px-3 py-2 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-50"
                          >
                            {TranslationService.t('recordVac.markNotAttended') || 'Mark Not Attended'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PhmLayout>
  );
};
