import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { dataService } from '../services/DataService';
import { PhmLayout } from '../components/PhmLayout';
import { TranslationService } from '../services/TranslationService';
import type { ClinicSchedule, DueChild, ClinicChild } from '../types/models';

type CreateVaccinationClinicState = {
  clinicDate: string;
  gnDivision: string;
  location: string;
  description: string;
};

type DueChildWithInfo = DueChild & {
  fullName: string;
  ageInDays: number;
};

type ClinicChildWithInfo = ClinicChild & {
  fullName: string;
  registrationNumber: string;
  attendanceStatus: 'attended' | 'not_attended' | 'pending';
};

export const VaccinationClinicSchedulePage: React.FC = () => {
  const navigate = useNavigate();

  // ...existing state declarations...
  const [view, setView] = useState<'list' | 'create' | 'details'>('list');
  const [clinics, setClinics] = useState<ClinicSchedule[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<ClinicSchedule | null>(null);
  const [dueChildren, setDueChildren] = useState<DueChildWithInfo[]>([]);
  const [clinicChildren, setClinicChildren] = useState<ClinicChildWithInfo[]>([]);
  const [missedAlertedCount, setMissedAlertedCount] = useState<number | null>(null);
  const [cancelledAlertedCount, setCancelledAlertedCount] = useState<number | null>(null);
  const [savingAttendanceId, setSavingAttendanceId] = useState<string | null>(null);
  const [closingClinic, setClosingClinic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [assignedArea, setAssignedArea] = useState<string | null>(null);


  const [formData, setFormData] = useState<CreateVaccinationClinicState>({
    clinicDate: '',
    gnDivision: '',
    location: '',
    description: '',
  });

  // Authorization check with useEffect
  useEffect(() => {
    if (!AuthService.isPHM()) {
      navigate('/');
    }
  }, [navigate]);

  // Load clinics and assigned area on mount
  useEffect(() => {
    loadClinics();
    fetchAssignedArea();
  }, []);

  const loadClinics = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await dataService.getMyClinicList({ clinicType: 'vaccination' });
      setClinics(list);
    } catch (err: any) {
      setError(err?.message || TranslationService.t('clinic.loadError'));
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignedArea = async () => {
    try {
      const area = await dataService.getAssignedArea();
      setAssignedArea(area);
      if (area) {
        setFormData((prev) => ({ ...prev, gnDivision: area }));
      }
    } catch (err: any) {
      console.error('Failed to fetch assigned area:', err);
    }
  };

  const handleCreateClinic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.clinicDate || !formData.gnDivision || !formData.location) {
        setError(TranslationService.t('clinic.createError'));
        setLoading(false);
        return;
      }

      const result = await dataService.createClinic({
        clinicDate: formData.clinicDate,
        gnDivision: formData.gnDivision,
        location: formData.location,
        description: formData.description || undefined,
        clinicType: 'vaccination',
      });

      if (result) {
        setSuccessMessage(TranslationService.t('clinic.createSuccess'));
        setFormData({ clinicDate: '', gnDivision: '', location: '', description: '' });
        setTimeout(() => {
          setSuccessMessage(null);
          setView('list');
          loadClinics();
        }, 2000);
      } else {
        setError(TranslationService.t('clinic.createError'));
      }
    } catch (err: any) {
      setError(err?.message || TranslationService.t('clinic.createError'));
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (clinic: ClinicSchedule) => {
    setSelectedClinic(clinic);
    setLoading(true);
    setError(null);

    try {
      const children = await dataService.getClinicDueChildren(clinic.clinicId);
      const enrolled = await dataService.getClinicChildren(clinic.clinicId);

      const enriched: DueChildWithInfo[] = children.map((child) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dob = new Date(child.dateOfBirth);
        dob.setHours(0, 0, 0, 0);
        const ageInDays = Math.floor((today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));

        return {
          ...child,
          fullName: `${child.firstName} ${child.lastName}`,
          ageInDays,
        };
      });

      const attendanceState: ClinicChildWithInfo[] = await Promise.all(
        enrolled.map(async (child) => {
          try {
            const fullChildData = await dataService.getChild(child.childId);
            const firstName = fullChildData?.firstName || 'Unknown';
            const lastName = fullChildData?.lastName || '';
            const registrationNumber = fullChildData?.registrationNumber || '—';
            return {
              ...child,
              fullName: `${firstName} ${lastName}`.trim(),
              registrationNumber,
              attendanceStatus: child.attended ? 'attended' : 'not_attended',
            };
          } catch {
            return {
              ...child,
              fullName: 'Unknown',
              registrationNumber: '—',
              attendanceStatus: child.attended ? 'attended' : 'not_attended',
            };
          }
        })
      );

      setDueChildren(enriched);
      setClinicChildren(attendanceState);
      setMissedAlertedCount(null);
      setCancelledAlertedCount(null);
      setView('details');
    } catch (err: any) {
      setError(err?.message || 'Failed to load vaccination clinic details');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceSubmit = async (childId: string, status: 'attended' | 'not_attended') => {
    if (!selectedClinic) return;

    setSavingAttendanceId(childId);
    setError(null);
    try {
      // Step 1: Mark attendance
      const attendanceOk = await dataService.updateClinicChildAttendance(selectedClinic.clinicId, childId, status);
      if (!attendanceOk) {
        setError(TranslationService.t('clinic.createError'));
        return;
      }

      // Step 2: If marking as attended, set next due date as null
      if (status === 'attended') {
        const nextDueDateOk = await dataService.updateVaccinationNextDueDate(childId, null);
        if (!nextDueDateOk) {
          setError(TranslationService.t('clinic.createError'));
          setSavingAttendanceId(null);
          await handleViewDetails(selectedClinic);
          return;
        }
        setSuccessMessage(TranslationService.t('clinic.attendanceSuccess'));
      }

      await handleViewDetails(selectedClinic);
    } catch (err: any) {
      setError(err?.message || TranslationService.t('clinic.createError'));
    } finally {
      setSavingAttendanceId(null);
    }
  };


  const handleStatusUpdate = async (status: string) => {
    if (!selectedClinic) return;
    setClosingClinic(status === 'completed');
    setLoading(true);
    setError(null);

    try {
      const response = await dataService.updateClinicStatus(selectedClinic.clinicId, status as any);

      if (response) {
        const { clinic, missedAlerted, cancelledAlerted } = response;
        setSelectedClinic(clinic);

        if (status === 'completed') {
          setMissedAlertedCount(missedAlerted ?? 0);
          setCancelledAlertedCount(cancelledAlerted ?? 0);
          const msg = `Vaccination clinic completed. ${missedAlerted ?? 0} missed alerts sent${cancelledAlerted && cancelledAlerted > 0 ? `, ${cancelledAlerted} cancellation alerts sent` : ''}.`;
          setSuccessMessage(msg);
          await handleViewDetails(clinic);
        } else if (status === 'cancelled') {
          setCancelledAlertedCount(cancelledAlerted ?? 0);
          const msg = `Vaccination clinic cancelled. ${cancelledAlerted ?? 0} parents notified.`;
          setSuccessMessage(msg);
        } else {
          setSuccessMessage(`Vaccination clinic status updated to ${status}`);
        }

        setTimeout(() => {
          setSuccessMessage(null);
          setView('list');
          loadClinics();
        }, 2500);
      } else {
        setError('Failed to update vaccination clinic status');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to update vaccination clinic status');
    } finally {
      setClosingClinic(false);
      setLoading(false);
    }
  };

  const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      cancelled: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  const getAttendanceBadge = (status: 'attended' | 'not_attended' | 'pending') => {
    const badges: Record<string, string> = {
      attended: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      not_attended: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    };
    return badges[status] || badges.pending;
  };

  const getAttendanceLabel = (status: 'attended' | 'not_attended' | 'pending') => {
    const labels: Record<string, string> = {
      attended: TranslationService.t('status.completed'),
      not_attended: TranslationService.t('status.missed'),
      pending: TranslationService.t('status.pending'),
    };
    return labels[status] || 'Unknown';
  };

  return (
    <PhmLayout activeNav="vaccination-clinic-schedule" showBackToDashboard={true}>
      <div className="flex flex-col min-h-screen">
        <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-6 py-12 flex-1">
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
              {successMessage}
            </div>
          )}

          {/* View: List */}
          {view === 'list' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{TranslationService.t('clinic.title')}</h1>
                  <p className="text-slate-600 dark:text-slate-400">{TranslationService.t('clinic.subtitle')}</p>
                </div>
                <button
                  onClick={() => setView('create')}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <span className="material-symbols-outlined">add</span>
                  {TranslationService.t('clinic.createClinic')}
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-slate-600 dark:text-slate-400">{TranslationService.t('common.loading')}</p>
                </div>
              ) : clinics.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 text-center">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{TranslationService.t('clinic.noClinics')}</p>
                  <button
                    onClick={() => setView('create')}
                    className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    {TranslationService.t('clinic.scheduleFirst')}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {clinics.map((clinic) => (
                    <div
                      key={clinic.clinicId}
                      className="bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{clinic.gnDivision}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(clinic.status)}`}>
                              {clinic.status}
                            </span>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                              Vaccination
                            </span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mb-2">
                            <span className="material-icons-outlined inline text-sm mr-1" style={{ verticalAlign: 'text-bottom' }}>
                              location_on
                            </span>
                            {clinic.location}
                          </p>
                          <p className="text-slate-600 dark:text-slate-400">
                            <span className="material-icons-outlined inline text-sm mr-1" style={{ verticalAlign: 'text-bottom' }}>
                              calendar_today
                            </span>
                            {formatDate(clinic.clinicDate)}
                          </p>
                          {clinic.description && (
                            <p className="text-slate-500 dark:text-slate-500 mt-2 text-sm italic">{clinic.description}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleViewDetails(clinic)}
                          className="px-6 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          {TranslationService.t('clinic.viewDetails')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* View: Create */}
          {view === 'create' && (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 md:p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{TranslationService.t('clinic.createTitle')}</h2>

              <form onSubmit={handleCreateClinic} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{TranslationService.t('clinic.date')} *</label>
                  <input
                    type="date"
                    value={formData.clinicDate}
                    onChange={(e) => setFormData({ ...formData, clinicDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{TranslationService.t('clinic.gnDivision')} *</label>
                  <input
                    type="text"
                    value={formData.gnDivision}
                    disabled
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none cursor-not-allowed opacity-70"
                    required
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{TranslationService.t('clinic.assignedArea')}: {assignedArea || 'Loading...'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{TranslationService.t('clinic.location')} *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Health Center, Community Hall"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{TranslationService.t('clinic.description')} ({TranslationService.t('clinic.optional')})</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g., Focused vaccination outreach for children 12-23 months"
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
                  >
                    {loading ? TranslationService.t('common.loading') : TranslationService.t('clinic.createClinic')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setView('list');
                      setFormData({ clinicDate: '', gnDivision: '', location: '', description: '' });
                    }}
                    className="flex-1 px-6 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    {TranslationService.t('common.cancel')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* View: Details */}
          {view === 'details' && selectedClinic && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{TranslationService.t('clinic.detailsTitle')}</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      {selectedClinic.gnDivision} • {formatDate(selectedClinic.clinicDate)}
                    </p>
                  </div>
                  {(missedAlertedCount !== null || cancelledAlertedCount !== null) && (
                    <div className="space-y-2">
                      {missedAlertedCount !== null && (
                        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-2 text-red-800 dark:text-red-200 text-sm">
                          Missed alerts sent: {missedAlertedCount}
                        </div>
                      )}
                      {cancelledAlertedCount !== null && cancelledAlertedCount > 0 && (
                        <div className="rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 px-4 py-2 text-orange-800 dark:text-orange-200 text-sm">
                          Cancellation alerts sent: {cancelledAlertedCount}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">{TranslationService.t('clinic.attendance')}</h3>
                  <div className="space-y-3">
                      {clinicChildren.map((child) => (
                        <div key={child.childId} className="rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white">{child.fullName}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{TranslationService.t('clinic.regNum')}: {child.registrationNumber}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAttendanceSubmit(child.childId, 'attended')}
                                disabled={savingAttendanceId === child.childId || selectedClinic?.status === 'completed' || selectedClinic?.status === 'cancelled' || child.attendanceStatus === 'attended'}
                                className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
                              >
                                {savingAttendanceId === child.childId ? TranslationService.t('clinic.marking') : TranslationService.t('clinic.markAttended')}
                              </button>
                              <button
                                onClick={() => handleAttendanceSubmit(child.childId, 'not_attended')}
                                disabled={savingAttendanceId === child.childId || selectedClinic?.status === 'completed' || selectedClinic?.status === 'cancelled' || child.attendanceStatus === 'not_attended'}
                                className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
                              >
                                {savingAttendanceId === child.childId ? TranslationService.t('clinic.marking') : TranslationService.t('clinic.markNotAttended')}
                              </button>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getAttendanceBadge(child.attendanceStatus)}`}>
                              {getAttendanceLabel(child.attendanceStatus)}
                            </span>
                            {child.attendanceStatus === 'pending' && (
                              <span className="text-xs text-slate-500 dark:text-slate-400">No attendance recorded yet</span>
                            )}
                          </div>
                          {child.attendanceStatus === 'not_attended' && (
                            <p className="mt-2 text-xs text-red-600 dark:text-red-400">Missed notification sent</p>
                          )}
                          {selectedClinic?.status === 'cancelled' && (
                            <p className="mt-2 text-xs text-orange-600 dark:text-orange-400">Vaccination clinic cancelled - Attendance cannot be modified</p>
                          )}
                          {selectedClinic?.status === 'completed' && (
                            <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">Vaccination clinic completed - Attendance cannot be modified</p>
                          )}
                        </div>
                      ))}
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {selectedClinic?.status !== 'completed' && selectedClinic?.status !== 'cancelled' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate('completed')}
                        disabled={closingClinic}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors"
                      >
                        {closingClinic ? 'Completing Clinic...' : 'Mark Clinic Completed'}
                      </button>
                      <button
                        onClick={() => handleStatusUpdate('cancelled')}
                        disabled={closingClinic}
                        className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white rounded-lg font-medium transition-colors"
                      >
                        {closingClinic ? 'Cancelling Clinic...' : 'Cancel Clinic'}
                      </button>
                    </>
                  )}
                  <button onClick={() => setView('list')} className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors">
                    Back
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PhmLayout>
  );
};

