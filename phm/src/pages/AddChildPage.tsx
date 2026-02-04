import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddChildPage: React.FC = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [childInfo, setChildInfo] = useState<any>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validate registration number format (NCVMS-YYYY-MMDD-XXXX)
    const regNumberPattern = /^NCVMS-\d{4}-\d{4}-\d{4}$/;
    if (!regNumberPattern.test(registrationNumber)) {
      setError('Invalid registration number format. Please check and try again.');
      return;
    }

    // Simulate fetching child info
    // In a real app, this would call an API
    const mockChildInfo = {
      name: 'Kavindu Perera',
      dateOfBirth: '2019-08-15',
      gender: 'Male',
      registrationNumber: registrationNumber
    };

    setChildInfo(mockChildInfo);
    setSuccess(true);
  };

  const handleConfirm = () => {
    // In a real app, this would link the child to the parent's account
    navigate('/parent-dashboard-desktop');
  };

  if (success && childInfo) {
    return (
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
        <div className="w-full max-w-2xl mx-auto px-6 py-12">
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="mb-6">
                <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
              </div>
              <h2 className="text-3xl font-bold text-[#0d141b] dark:text-white mb-2">Child Found!</h2>
              <p className="text-[#4c739a] dark:text-slate-400">Please verify the child information below.</p>
            </div>

            <div className="bg-[#f0f9ff] dark:bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Child Name:</span>
                  <span className="text-base font-bold text-[#0d141b] dark:text-white">{childInfo.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Date of Birth:</span>
                  <span className="text-base font-bold text-[#0d141b] dark:text-white">{new Date(childInfo.dateOfBirth).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Gender:</span>
                  <span className="text-base font-bold text-[#0d141b] dark:text-white">{childInfo.gender}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Registration Number:</span>
                  <span className="text-base font-bold text-primary">{childInfo.registrationNumber}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSuccess(false);
                  setChildInfo(null);
                  setRegistrationNumber('');
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined">check</span>
                Confirm & Add Child
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-2xl mx-auto px-6 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate('/parent-dashboard-desktop')}
            className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">Add Child to Account</h1>
          <p className="text-[#4c739a] dark:text-slate-400">Enter the registration number provided by the PHM to link a child to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-sm">
          <div className="mb-6">
            <label className="flex flex-col">
              <p className="text-[#0d141b] dark:text-white text-base font-medium mb-2">Registration Number *</p>
              <input
                className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-14 px-4 text-base font-normal"
                type="text"
                placeholder="NCVMS-YYYY-MMDD-XXXX"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                required
              />
              <p className="text-xs text-[#4c739a] dark:text-slate-400 mt-2">
                Format: NCVMS-YYYY-MMDD-XXXX (e.g., NCVMS-2024-0815-1234)
              </p>
            </label>
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
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">Where to find your registration number?</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  The registration number is provided by the Public Health Midwife (PHM) when your child is registered in the system. 
                  It should be in the format shown above.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/parent-dashboard-desktop')}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined">search</span>
              Search Child
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
