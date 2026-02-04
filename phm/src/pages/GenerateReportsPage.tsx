import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export const GenerateReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [district, setDistrict] = useState('');
  const [dsDivision, setDsDivision] = useState('');
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const reportTypes = [
    { value: 'vaccination-coverage', label: 'Vaccination Coverage Report', icon: 'bar_chart' },
    { value: 'vaccination-status', label: 'Vaccination Status Report', icon: 'assignment' },
    { value: 'missed-vaccinations', label: 'Missed Vaccinations Report', icon: 'warning' },
    { value: 'upcoming-vaccinations', label: 'Upcoming Vaccinations Report', icon: 'event_upcoming' },
    { value: 'demographics', label: 'Demographics Report', icon: 'people' },
    { value: 'audit', label: 'Audit Report', icon: 'history' }
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      setGenerating(false);
      setReportGenerated(true);
    }, 2000);
  };

  const handleDownload = (format: 'pdf' | 'excel' | 'csv') => {
    // In a real app, this would download the report
    alert(`Downloading report as ${format.toUpperCase()}...`);
  };

  if (reportGenerated) {
    return (
      <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
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
                {dateRange.startDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">Date Range:</span>
                    <span className="text-base font-bold text-[#0d141b] dark:text-white">
                      {new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {district && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#4c739a] dark:text-slate-400">District:</span>
                    <span className="text-base font-bold text-[#0d141b] dark:text-white">{district}</span>
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
                onClick={() => handleDownload('excel')}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors"
              >
                <span className="material-symbols-outlined">table_chart</span>
                Download Excel
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
                  setDistrict('');
                  setDsDivision('');
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg h-12 border-2 border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Generate Another Report
              </button>
              <button
                onClick={() => navigate('/moh-analytics-dashboard')}
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
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate('/moh-analytics-dashboard')}
            className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
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
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">District</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="All Districts"
                />
              </label>
            </div>

            <div>
              <label className="flex flex-col">
                <p className="text-[#0d141b] dark:text-white text-sm font-medium mb-2">DS Division</p>
                <input
                  className="w-full rounded-lg text-[#0d141b] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark focus:border-primary h-12 px-4 text-sm"
                  type="text"
                  value={dsDivision}
                  onChange={(e) => setDsDivision(e.target.value)}
                  placeholder="All DS Divisions"
                />
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/moh-analytics-dashboard')}
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
