import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../services/DataService';
import { AuthService } from '../services/AuthService';
import { PhmLayout } from '../components/PhmLayout';
import { Child } from '../types/models';

export const RecordGrowthDataPage: React.FC = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState<Child[]>([]);
  const [formData, setFormData] = useState({
    childId: '',
    dateOfVisit: '',
    height: '',
    weight: '',
    headCircumference: '',
    recordedBy: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const registeredBy = (user as any)?.phmId || user?.userId || '';
    if (registeredBy) dataService.getChildrenByPHM(registeredBy).then(setChildren);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!formData.childId || !formData.dateOfVisit || !formData.height || !formData.weight) {
      setError('Please fill in all required fields');
      return;
    }
    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    if (height <= 0 || height > 200) {
      setError('Please enter a valid height (0-200 cm)');
      return;
    }
    if (weight <= 0 || weight > 100) {
      setError('Please enter a valid weight (0-100 kg)');
      return;
    }
    setSubmitting(true);
    try {
      const res = await dataService.createGrowthRecord({
        childId: formData.childId,
        recordedDate: formData.dateOfVisit,
        height,
        weight: parseFloat(formData.weight),
        headCircumference: formData.headCircumference ? parseFloat(formData.headCircumference) : undefined,
        recordedBy: formData.recordedBy || undefined,
        notes: formData.notes || undefined,
      });
      if (res?.recordId) {
        setSuccess(true);
        setTimeout(() => navigate('/phm-dashboard'), 2000);
      } else {
        setError('Failed to record growth data. Please try again.');
      }
    } catch {
      setError('Failed to record growth data. Please try again.');
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
      <PhmLayout activeNav="record-growth" showBackToDashboard={true}>
        <div className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="mb-6">
              <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-2">Growth Data Recorded!</h2>
            <p className="text-[#4c739a] dark:text-slate-400 mb-6">The growth measurements have been successfully recorded.</p>
            <button
              type="button"
              onClick={() => navigate('/phm-dashboard')}
              className="inline-flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </PhmLayout>
    );
  }

  return (
    <PhmLayout activeNav="record-growth" showBackToDashboard={true}>
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">Record Growth Data</h1>
          <p className="text-[#4c739a] dark:text-slate-400">Record height and weight measurements during clinic visits.</p>
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
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Date of Visit *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="date"
                  name="dateOfVisit"
                  value={formData.dateOfVisit}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Height (cm) *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="number"
                  step="0.1"
                  min="0"
                  max="200"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g., 95.5"
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Weight (kg) *</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 15.2"
                  required
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Head Circumference (cm)</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  name="headCircumference"
                  value={formData.headCircumference}
                  onChange={handleChange}
                  placeholder="e.g., 48.5"
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
                  placeholder="Additional observations or notes..."
                />
              </label>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-xl">info</span>
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">Growth Chart Information</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  These measurements will be automatically plotted on the child's growth chart according to WHO standards.
                </p>
              </div>
            </div>
          </div>

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
              Save Growth Data
            </button>
          </div>
        </form>
      </div>
    </PhmLayout>
  );
};
