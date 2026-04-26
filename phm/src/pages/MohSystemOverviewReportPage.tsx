import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { mohService, SystemOverviewReportResponse } from '../services/MohService';
import { TranslationService } from '../services/TranslationService';

export const MohSystemOverviewReportPage: React.FC = () => {
    const reportRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reportData, setReportData] = useState<SystemOverviewReportResponse | null>(null);
    const [startDate, setStartDate] = useState('2026-01-01');
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [trendMonths, setTrendMonths] = useState(12);

    const fetchReport = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await mohService.getSystemOverviewReport({
                startDate,
                endDate,
                trendMonths,
            });
            if (data) {
                setReportData(data);
            } else {
                setError(TranslationService.t('common.error'));
            }
        } catch (err) {
            console.error('Error fetching report:', err);
            setError(TranslationService.t('common.error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return;

        try {
            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            const pdf = new jsPDF('p', 'mm', 'a4');
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`moh-system-overview-${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (err) {
            console.error('Error generating PDF:', err);
            alert('Failed to generate PDF');
        }
    };

    const handleRefresh = () => {
        fetchReport();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            <div className="w-full max-w-7xl mx-auto px-6 py-8">

                <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7edf3] dark:border-slate-800 p-6 mb-6">
                    <h2 className="text-lg font-bold mb-4">{TranslationService.t('report.filters')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">{TranslationService.t('report.startDate')}</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-3 py-2 border border-[#e7edf3] dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-slate-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">{TranslationService.t('report.endDate')}</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-3 py-2 border border-[#e7edf3] dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-slate-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">{TranslationService.t('report.trendMonths')}</label>
                            <input
                                type="number"
                                value={trendMonths}
                                onChange={(e) => setTrendMonths(Math.max(1, parseInt(e.target.value) || 1))}
                                min="1"
                                max="36"
                                className="w-full px-3 py-2 border border-[#e7edf3] dark:border-slate-700 rounded-lg dark:bg-slate-800 dark:text-slate-100"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={handleRefresh}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined">refresh</span>
                                {TranslationService.t('report.refresh')}
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg p-4 mb-6 text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="text-center py-12 text-[#4c739a] dark:text-slate-400">
                        <div className="animate-spin inline-block mb-2">
                            <span className="material-symbols-outlined text-4xl">hourglass_top</span>
                        </div>
                        <p>{TranslationService.t('report.loading')}</p>
                    </div>
                )}

                {reportData && !loading && (
                    <>
                        {/* Download Button */}
                        <div className="mb-6 flex justify-end gap-3">
                            <button
                                onClick={handleDownloadPDF}
                                className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:brightness-110 transition-all"
                            >
                                <span className="material-symbols-outlined">download</span>
                                {TranslationService.t('report.downloadPdf')}
                            </button>
                        </div>

                        {/* Report Content */}
                        <div
                            ref={reportRef}
                            className="bg-white dark:bg-slate-900 rounded-xl border border-[#e7edf3] dark:border-slate-800 p-12"
                        >
                            {/* Report Header */}
                            <div className="mb-8 pb-8 border-b border-[#e7edf3] dark:border-slate-800">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="size-10">
                                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                clipRule="evenodd"
                                                d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                                className="text-primary"
                                            ></path>
                                            <path
                                                clipRule="evenodd"
                                                d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                                className="text-primary"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h1 className="text-4xl font-bold text-[#0d141b] dark:text-white">{TranslationService.t('report.title')}</h1>
                                </div>
                                <p className="text-[#4c739a] dark:text-slate-400 text-sm mb-2">
                                    {TranslationService.t('report.period')}: {formatDate(reportData.filters.startDate)} to {formatDate(reportData.filters.endDate)}
                                </p>
                                <p className="text-[#4c739a] dark:text-slate-400 text-sm">
                                    {TranslationService.t('report.generated')}: {new Date(reportData.generatedAt).toLocaleString()}
                                </p>
                            </div>

                            {/* Executive Summary */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-6 text-[#0d141b] dark:text-white">{TranslationService.t('report.summary')}</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <SummaryCard
                                        label={TranslationService.t('report.totalChildren')}
                                        value={reportData.summary.totalChildren}
                                        icon="child_care"
                                    />
                                    <SummaryCard
                                        label={TranslationService.t('report.linkedChildren')}
                                        value={reportData.summary.linkedChildren}
                                        icon="link"
                                    />
                                    <SummaryCard
                                        label={TranslationService.t('report.vaccinationRecords')}
                                        value={reportData.summary.totalVaccinationRecords}
                                        icon="vaccines"
                                    />
                                    <SummaryCard
                                        label={TranslationService.t('report.coverage')}
                                        value={`${reportData.summary.coveragePct}%`}
                                        icon="trending_up"
                                    />
                                    <SummaryCard
                                        label={TranslationService.t('report.administered')}
                                        value={reportData.summary.administeredRecords}
                                        icon="check_circle"
                                    />
                                    <SummaryCard
                                        label={TranslationService.t('report.pending')}
                                        value={reportData.summary.pendingRecords}
                                        icon="schedule"
                                    />
                                    <SummaryCard
                                        label={TranslationService.t('report.overdue')}
                                        value={reportData.summary.overdueRecords}
                                        icon="warning"
                                    />
                                    <SummaryCard
                                        label={TranslationService.t('report.phmUsers')}
                                        value={reportData.summary.totalPhmUsers}
                                        icon="person"
                                    />
                                </div>
                            </div>

                            {/* Key Insights */}
                            {reportData.insights.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-4 text-[#0d141b] dark:text-white">{TranslationService.t('report.insights')}</h2>
                                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-lg p-6">
                                        <ul className="space-y-3">
                                            {reportData.insights.map((insight, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm text-[#0d141b] dark:text-slate-100">
                                                    <span className="flex-shrink-0 text-blue-600 dark:text-blue-400">•</span>
                                                    <span>{insight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Coverage by GN Division */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-[#0d141b] dark:text-white">{TranslationService.t('report.coverageByGnDivision')}</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-[#f0f4f8] dark:bg-slate-800">
                                                <th className="text-left px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.gnDivision')}
                                                </th>
                                                <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.registered')}
                                                </th>
                                                <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.linkedChildren')}
                                                </th>
                                                <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.vaccinated')}
                                                </th>
                                                <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.overdue')}
                                                </th>
                                                <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.coverage')} %
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.deepDive.byGNDivision.map((gn, idx) => (
                                                <tr key={idx}>
                                                    <td className="text-left px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                        {gn.gnDivision}
                                                    </td>
                                                    <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                        {gn.registeredChildren}
                                                    </td>
                                                    <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                        {gn.linkedChildren}
                                                    </td>
                                                    <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                        {gn.vaccinatedChildren}
                                                    </td>
                                                    <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                        {gn.overdueRecords}
                                                    </td>
                                                    <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700 font-semibold">
                                                        {gn.coveragePct.toFixed(1)}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Vaccine Performance */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-[#0d141b] dark:text-white">{TranslationService.t('report.vaccinePerformance')}</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm border-collapse">
                                        <thead>
                                            <tr className="bg-[#f0f4f8] dark:bg-slate-800">
                                                <th className="text-left px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.vaccine')}
                                                </th>
                                                <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.totalDosesTitle')}
                                                </th>
                                                <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.administered')}
                                                </th>
                                                <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.pending')}
                                                </th>
                                                <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.missedTitle')}
                                                </th>
                                                <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                    {TranslationService.t('report.completionTitle')}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.deepDive.byVaccine.map((vaccine, idx) => (
                                                <tr key={idx}>
                                                    <td className="text-left px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                        {vaccine.vaccineName}
                                                    </td>
                                                    <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                        {vaccine.totalDoses}
                                                    </td>
                                                    <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                        <span className="text-green-600 dark:text-green-400 font-semibold">
                                                            {vaccine.administeredDoses}
                                                        </span>
                                                    </td>
                                                    <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                        {vaccine.pendingDoses}
                                                    </td>
                                                    <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                        {vaccine.missedDoses > 0 ? (
                                                            <span className="text-red-600 dark:text-red-400 font-semibold">
                                                                {vaccine.missedDoses}
                                                            </span>
                                                        ) : (
                                                            vaccine.missedDoses
                                                        )}
                                                    </td>
                                                    <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700 font-semibold">
                                                        {vaccine.completionRatePct.toFixed(1)}%
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Data Quality */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-[#0d141b] dark:text-white">{TranslationService.t('report.dataQuality')}</h2>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <DataQualityCard
                                        label="No GN Division"
                                        value={reportData.deepDive.dataQuality.childrenWithoutGnDivision}
                                    />
                                    <DataQualityCard
                                        label="No Linked Parent"
                                        value={reportData.deepDive.dataQuality.childrenWithoutLinkedParent}
                                    />
                                    <DataQualityCard
                                        label="No WhatsApp"
                                        value={reportData.deepDive.dataQuality.childrenWithoutWhatsAppNumber}
                                    />
                                    <DataQualityCard
                                        label="No Due Date"
                                        value={reportData.deepDive.dataQuality.pendingRecordsWithoutDueDate}
                                    />
                                    <DataQualityCard
                                        label="Overdue Pending"
                                        value={reportData.deepDive.dataQuality.overduePendingSchedules}
                                    />
                                </div>
                            </div>

                            {/* Database Footprint */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-[#0d141b] dark:text-white">{TranslationService.t('report.databaseFootprint')}</h2>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <FootprintCard
                                        label="Users"
                                        value={reportData.deepDive.databaseFootprint.users}
                                    />
                                    <FootprintCard
                                        label="Children"
                                        value={reportData.deepDive.databaseFootprint.children}
                                    />
                                    <FootprintCard
                                        label="Vaccines"
                                        value={reportData.deepDive.databaseFootprint.vaccines}
                                    />
                                    <FootprintCard
                                        label="Vac. Records"
                                        value={reportData.deepDive.databaseFootprint.vaccinationRecords}
                                    />
                                    <FootprintCard
                                        label="Clinic Schedules"
                                        value={reportData.deepDive.databaseFootprint.clinicSchedules}
                                    />
                                </div>
                            </div>

                            {/* Monthly Trend */}
                            {reportData.deepDive.monthlyTrend.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-4 text-[#0d141b] dark:text-white">{TranslationService.t('report.monthlyTrend')}</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm border-collapse">
                                            <thead>
                                                <tr className="bg-[#f0f4f8] dark:bg-slate-800">
                                                    <th className="text-left px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                        {TranslationService.t('report.month')}
                                                    </th>
                                                    <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                        {TranslationService.t('report.newChildren')}
                                                    </th>
                                                    <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                        {TranslationService.t('report.administered')}
                                                    </th>
                                                    <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                        {TranslationService.t('report.missedTitle')}
                                                    </th>
                                                    <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                        Clinics
                                                    </th>
                                                    <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                        {TranslationService.t('report.notifications')}
                                                    </th>
                                                    <th className="text-center px-4 py-2 font-semibold border border-[#e7edf3] dark:border-slate-700">
                                                        {TranslationService.t('report.auditEvents')}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reportData.deepDive.monthlyTrend.map((month, idx) => (
                                                    <tr key={idx}>
                                                        <td className="text-left px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                            {month.month}
                                                        </td>
                                                        <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                            {month.newChildren}
                                                        </td>
                                                        <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                            {month.administeredDoses}
                                                        </td>
                                                        <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                            {month.missedDoses}
                                                        </td>
                                                        <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                            {month.completedClinics}
                                                        </td>
                                                        <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                            {month.notificationsSent}
                                                        </td>
                                                        <td className="text-center px-4 py-2 border border-[#e7edf3] dark:border-slate-700">
                                                            {month.auditEvents}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="mt-12 pt-8 border-t border-[#e7edf3] dark:border-slate-800 text-center text-sm text-[#4c739a] dark:text-slate-400">
                                <p>{TranslationService.t('report.footerText')}</p>
                                <p className="mt-2">{TranslationService.t('report.generated')} on {new Date(reportData.generatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

interface SummaryCardProps {
    label: string;
    value: string | number;
    icon: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, icon }) => (
    <div className="bg-[#f0f4f8] dark:bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-[#4c739a] dark:text-slate-400">{label}</p>
            <span className="material-symbols-outlined text-primary text-lg">{icon}</span>
        </div>
        <p className="text-2xl font-bold text-[#0d141b] dark:text-white">{value}</p>
    </div>
);

interface DataQualityCardProps {
    label: string;
    value: number;
}

const DataQualityCard: React.FC<DataQualityCardProps> = ({ label, value }) => (
    <div className="bg-[#fef3c7] dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4 text-center">
        <p className="text-sm font-medium text-[#92400e] dark:text-yellow-600 mb-1">{label}</p>
        <p className="text-2xl font-bold text-[#dc2626] dark:text-red-400">{value}</p>
    </div>
);

interface FootprintCardProps {
    label: string;
    value: number;
}

const FootprintCard: React.FC<FootprintCardProps> = ({ label, value }) => (
    <div className="bg-[#e0e7ff] dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-900/30 rounded-lg p-4 text-center">
        <p className="text-sm font-medium text-[#4338ca] dark:text-indigo-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-[#0d141b] dark:text-white">{value}</p>
    </div>
);

