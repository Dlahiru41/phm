import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { dataService } from '../services/DataService';
import { AuthService } from '../services/AuthService';
import { Child, Vaccine } from '../types/models';

export const RecordVaccinationPage: React.FC = () => {
  const location = useLocation();
  const childIdFromState = location.state?.childId || null;
  const navigate = useNavigate();

  const [children, setChildren] = useState<Child[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
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
    notes: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const phmId = (user as any)?.phmId || user?.userId || '';
    dataService.getChildrenByPHM(phmId).then(setChildren);
    dataService.getAllVaccines().then(setVaccines);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!formData.childId || !formData.vaccineId || !formData.dateGiven) {
      setError('Please fill in all required fields');
      return;
    }
    setSubmitting(true);
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
        setTimeout(() => navigate('/view-area-children'), 2000);
      } else {
        setError('Failed to record vaccination. Please try again.');
      }
    } catch {
      setError('Failed to record vaccination. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (success) {
    return (
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-6">
            <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
          </div>
          <h2 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-2">Vaccination Recorded!</h2>
          <p className="text-[#4c739a] dark:text-slate-400 mb-6">The vaccination has been successfully recorded in the system.</p>
          <button
            onClick={() => navigate('/phm-dashboard')}
            className="inline-flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate('/phm-dashboard')}
            className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">Record Vaccination</h1>
          <p className="text-[#4c739a] dark:text-slate-400">Record vaccination details for a registered child.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Select Child *</p>
                <select
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  name="childId"
                  value={formData.childId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a child</option>
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
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Vaccine *</p>
                <select
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  name="vaccineId"
                  value={formData.vaccineId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select vaccine</option>
                  {vaccines.map((v) => (
                    <option key={v.vaccineId} value={v.vaccineId}>{v.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Dose Number *</p>
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
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Date Given *</p>
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
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Batch Number</p>
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
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Administered By *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="text"
                  name="administeredBy"
                  value={formData.administeredBy}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Injection Site</p>
                <select
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  name="site"
                  value={formData.site}
                  onChange={handleChange}
                >
                  <option value="">Select site</option>
                  <option value="left-arm">Left Arm</option>
                  <option value="right-arm">Right Arm</option>
                  <option value="left-thigh">Left Thigh</option>
                  <option value="right-thigh">Right Thigh</option>
                  <option value="oral">Oral</option>
                </select>
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Next Due Date</p>
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
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Notes</p>
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
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined">save</span>
              Save Vaccination Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
