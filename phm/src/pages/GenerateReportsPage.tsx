import React, { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { mohService } from '../services/MohService';
import { AuthService } from '../services/AuthService';

export const GenerateReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const embeddedInMoh = location.pathname.startsWith('/moh');
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [gnDivision, setGnDivision] = useState('');
  const [role, setRole] = useState('');
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [generateError, setGenerateError] = useState('');

  const reportTypes = [
    { value: 'phm-performance', label: 'PHM Performance Report', icon: 'assignment' },
    { value: 'audit', label: 'Audit Report', icon: 'history' },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGenerateError('');
    setGenerating(true);
    try {
      let reportData = null;
      const params = {
        startDate: dateRange.startDate || undefined,
        endDate: dateRange.endDate || undefined,
        gnDivision: gnDivision || undefined,
        role: reportType === 'audit' ? (role || undefined) : undefined,
      };

      if (reportType === 'phm-performance') {
        reportData = await mohService.getPHMPerformanceReport(params);
      } else if (reportType === 'audit') {
        reportData = await mohService.getAuditReport(params as any);
      }

      if (reportData) {
        setReportGenerated(true);
      } else {
        setGenerateError('Failed to generate report.');
      }
    } catch (err) {
      console.error('Error generating report:', err);
      setGenerateError('Failed to generate report. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async (format: 'pdf' | 'csv') => {
    const token = AuthService.getToken();

    if (!reportType) {
      alert('Invalid report type');
      return;
    }

    const params = {
      startDate: dateRange.startDate || undefined,
      endDate: dateRange.endDate || undefined,
      gnDivision: gnDivision || undefined,
      role: reportType === 'audit' ? (role || undefined) : undefined,
      format,
    };

    const url = mohService.downloadReport(reportType as any, params);
    try {
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `report-${reportType}.${format}`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      alert(`Download as ${format.toUpperCase()} failed.`);
    }
  };

  if (reportGenerated) {
    return (
      <div className={embeddedInMoh ? '' : 'flex min-h-screen bg-background-light dark:bg-background-dark'}>
        <div className="w-full max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="mb-6">
                <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
              </div>
              <h2 className="text-3xl font-bold text-[#0d141b] dark:text-white mb-2">Report Generated!</h2>
              <p className="text-[#4c739a] dark:text-slate-400">Your report has been successfully generated.</p>
            </div>

            <div className="bg-[#f0f9ff] dark:bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Report Type:</span>
                  <span className="text-base font-bold text-[#0d141b] dark:text-white">
                    {reportTypes.find(r => r.value === reportType)?.label}
                  </span>
                </div>
                {generateError && <p className="text-sm text-red-600 dark:text-red-400 mb-2">{generateError}</p>}
                {dateRange.startDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Date Range:</span>
                    <span className="text-base font-bold text-[#0d141b] dark:text-white">
                      {new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {gnDivision && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">GN Division:</span>
                    <span className="text-base font-bold text-[#0d141b] dark:text-white">{gnDivision}</span>
                  </div>
                )}
                {role && reportType === 'audit' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">User Role:</span>
                    <span className="text-base font-bold text-[#0d141b] dark:text-white">{role}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => handleDownload('pdf')}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors"
              >
                <span className="material-symbols-outlined">picture_as_pdf</span>
                Download PDF
              </button>
              <button
                onClick={() => handleDownload('csv')}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                <span className="material-symbols-outlined">file_download</span>
                Download CSV
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setReportGenerated(false);
                  setReportType('');
                  setDateRange({ startDate: '', endDate: '' });
                  setGnDivision('');
                  setRole('');
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Generate Another Report
              </button>
              <button
                onClick={() => navigate(embeddedInMoh ? '/moh' : '/moh-analytics-dashboard')}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={embeddedInMoh ? '' : 'flex min-h-screen bg-background-light dark:bg-background-dark'}>
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        {!embeddedInMoh && (
          <div className="mb-8">
            <button
              onClick={() => navigate('/moh')}
              className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">Generate Reports</h1>
          <p className="text-[#4c739a] dark:text-slate-400">
            Generate comprehensive SuwaCare LK vaccination reports for analysis and record-keeping.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-8 shadow-sm">
          <div className="mb-6">
            <label className="flex flex-col">
              <p className="text-[#0d141b] dark:text-white text-base font-medium mb-4">Select Report Type *</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setReportType(type.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      reportType === type.value
                        ? 'border-primary bg-primary/10'
                        : 'border-[#cfdbe7] dark:border-slate-700 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-2xl ${
                        reportType === type.value ? 'text-primary' : 'text-[#4c739a] dark:text-slate-400'
                      }`}>
                        {type.icon}
                      </span>
                      <span className={`text-sm font-bold ${
                        reportType === type.value
                          ? 'text-primary'
                          : 'text-[#0d141b] dark:text-white'
                      }`}>
                        {type.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">Start Date</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">End Date</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  min={dateRange.startDate}
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">GN Division</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="text"
                  value={gnDivision}
                  onChange={(e) => setGnDivision(e.target.value)}
                  placeholder="All Divisions"
                />
              </label>
            </div>

            {reportType === 'audit' && (
              <div>
                <label className="flex flex-col">
                  <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">User Role</p>
                  <select
                    className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="moh">MOH</option>
                    <option value="phm">PHM</option>
                    <option value="parent">Parent</option>
                  </select>
                </label>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(embeddedInMoh ? '/moh' : '/moh-analytics-dashboard')}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!reportType || generating}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <span className="material-symbols-outlined animate-spin">refresh</span>
                  Generating...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">description</span>
                  Generate Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
