import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { dataService } from '../services/DataService';
import { PhmLayout } from '../components/PhmLayout';
import type { ClinicSchedule, DueChild } from '../types/models';

type CreateClinicState = {
  clinicDate: string;
  gnDivision: string;
  location: string;
  description: string;
};

type DueChildWithInfo = DueChild & {
  fullName: string;
  ageInDays: number;
};

export const ClinicSchedulingPage: React.FC = () => {
  const navigate = useNavigate();

  // Authorization check
  if (!AuthService.isPHM()) {
    navigate('/');
    return null;
  }

  const [view, setView] = useState<'list' | 'create' | 'details'>('list');
  const [clinics, setClinics] = useState<ClinicSchedule[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<ClinicSchedule | null>(null);
  const [dueChildren, setDueChildren] = useState<DueChildWithInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateClinicState>({
    clinicDate: '',
    gnDivision: '',
    location: '',
    description: '',
  });

  // Load clinics on mount
  useEffect(() => {
    loadClinics();
  }, []);

  const loadClinics = async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await dataService.getMyClinicList();
      setClinics(list);
    } catch (err: any) {
      setError(err?.message || 'Failed to load clinics');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClinic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.clinicDate || !formData.gnDivision || !formData.location) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const result = await dataService.createClinic({
        clinicDate: formData.clinicDate,
        gnDivision: formData.gnDivision,
        location: formData.location,
        description: formData.description || undefined,
      });

      if (result) {
        setSuccessMessage(`Clinic created successfully! ${result.childCount} children identified as due.`);
        setFormData({ clinicDate: '', gnDivision: '', location: '', description: '' });
        setTimeout(() => {
          setSuccessMessage(null);
          setView('list');
          loadClinics();
        }, 2000);
      } else {
        setError('Failed to create clinic');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to create clinic');
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
      setDueChildren(enriched);
      setView('details');
    } catch (err: any) {
      setError(err?.message || 'Failed to load clinic details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status: string) => {
    if (!selectedClinic) return;
    setLoading(true);
    setError(null);

    try {
      const updated = await dataService.updateClinicStatus(
        selectedClinic.clinicId,
        status as any
      );

      if (updated) {
        setSelectedClinic(updated);
        setSuccessMessage(`Clinic status updated to ${status}`);
        setTimeout(() => {
          setSuccessMessage(null);
          setView('list');
          loadClinics();
        }, 2000);
      } else {
        setError('Failed to update clinic status');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to update clinic status');
    } finally {
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
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return badges[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <PhmLayout activeNav="clinic-scheduling">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Clinic Scheduling
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage clinic schedules and track immunization due children
            </p>
          </div>

          {/* Messages */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200">{successMessage}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* View: List */}
          {view === 'list' && (
            <div>
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => {
                    setView('create');
                    setError(null);
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  + New Clinic
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-slate-600 dark:text-slate-400">Loading clinics...</p>
                </div>
              ) : clinics.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 text-center">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">No clinics scheduled yet</p>
                  <button
                    onClick={() => setView('create')}
                    className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Schedule Your First Clinic
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
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                              {clinic.gnDivision}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(clinic.status)}`}>
                              {clinic.status}
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
                            <p className="text-slate-500 dark:text-slate-500 mt-2 text-sm italic">
                              {clinic.description}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleViewDetails(clinic)}
                          className="px-6 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                          View Details
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Schedule New Clinic</h2>

              <form onSubmit={handleCreateClinic} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Clinic Date *
                  </label>
                  <input
                    type="date"
                    value={formData.clinicDate}
                    onChange={(e) => setFormData({ ...formData, clinicDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    GN Division *
                  </label>
                  <input
                    type="text"
                    value={formData.gnDivision}
                    onChange={(e) => setFormData({ ...formData, gnDivision: e.target.value })}
                    placeholder="e.g., Galle 01"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Galle Primary Health Center"
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g., Routine immunization clinic"
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
                    {loading ? 'Creating...' : 'Create Clinic'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setView('list');
                      setFormData({ clinicDate: '', gnDivision: '', location: '', description: '' });
                    }}
                    className="flex-1 px-6 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* View: Details */}
          {view === 'details' && selectedClinic && (
            <div>
              <div className="mb-6">
                <button
                  onClick={() => {
                    setView('list');
                    setSelectedClinic(null);
                    setDueChildren([]);
                  }}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  <span className="material-symbols-outlined mr-1" style={{ fontSize: '20px' }}>
                    arrow_back
                  </span>
                  Back to Clinics
                </button>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 md:p-8 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {selectedClinic.gnDivision}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      <span className="material-icons-outlined inline text-sm mr-1" style={{ verticalAlign: 'text-bottom' }}>
                        location_on
                      </span>
                      {selectedClinic.location}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      <span className="material-icons-outlined inline text-sm mr-1" style={{ verticalAlign: 'text-bottom' }}>
                        calendar_today
                      </span>
                      {formatDate(selectedClinic.clinicDate)}
                    </p>
                    {selectedClinic.description && (
                      <p className="text-slate-500 dark:text-slate-500 mt-2 text-sm italic">
                        {selectedClinic.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {selectedClinic.status === 'scheduled' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate('completed')}
                          disabled={loading}
                          className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors"
                        >
                          Mark Complete
                        </button>
                        <button
                          onClick={() => handleStatusUpdate('cancelled')}
                          disabled={loading}
                          className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors"
                        >
                          Cancel Clinic
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-blue-900 dark:text-blue-200">
                    <strong>Status:</strong> <span className={`px-2 py-1 rounded text-sm ${getStatusBadge(selectedClinic.status)}`}>{selectedClinic.status}</span>
                  </p>
                </div>
              </div>

              {/* Due Children */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 md:p-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Children Due for Vaccination ({dueChildren.length})
                </h3>

                {loading ? (
                  <p className="text-slate-600 dark:text-slate-400">Loading due children...</p>
                ) : dueChildren.length === 0 ? (
                  <p className="text-slate-600 dark:text-slate-400">No children due for vaccination on this clinic date.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                            Child Name
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                            Registration
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                            Age
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                            Vaccine
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                            Due Date
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">
                            Parent Contact
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dueChildren.map((child) => (
                          <tr
                            key={child.childId}
                            className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                          >
                            <td className="py-3 px-4 text-slate-900 dark:text-white">{child.fullName}</td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-sm">
                              {child.registrationNumber}
                            </td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-sm">
                              {Math.floor(child.ageInDays / 30)} months
                            </td>
                            <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">
                              {child.vaccineName}
                            </td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-sm">
                              {formatDate(child.nextDueDate)}
                            </td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400 text-sm">
                              {child.parentPhone ? (
                                <a
                                  href={`tel:${child.parentPhone}`}
                                  className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  {child.parentPhone}
                                </a>
                              ) : (
                                <span className="text-slate-400">Not linked</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PhmLayout>
  );
};

