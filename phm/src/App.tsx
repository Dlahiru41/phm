import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ParentDashboardMobilePage } from './pages/ParentDashboardMobilePage';
import { ParentDashboardDesktopPage } from './pages/ParentDashboardDesktopPage';
import { ParentProfilePage } from './pages/ParentProfilePage';
import { PhmDashboardPage } from './pages/PhmDashboardPage';
import { ClinicSchedulingPage } from './pages/ClinicSchedulingPage';
import { VaccinationClinicSchedulePage } from './pages/VaccinationClinicSchedulePage';
import { ChildProfileSchedulePage } from './pages/ChildProfileSchedulePage';
import { GrowthChartPage } from './pages/GrowthChartPage';
import VaccinationCardPage from './pages/VaccinationCardPage';
import { MohLayout } from './components/MohLayout';
import { MohPhmManagementPage } from './pages/MohPhmManagementPage';
import { BabyRegistrationPage } from './pages/BabyRegistrationPage';
import { AddChildPage } from './pages/AddChildPage';
import { RecordVaccinationPage } from './pages/RecordVaccinationPage';
import { EditVaccinationPage } from './pages/EditVaccinationPage';
import { RecordGrowthDataPage } from './pages/RecordGrowthDataPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ViewAreaChildrenPage } from './pages/ViewAreaChildrenPage';
import { GenerateReportsPage } from './pages/GenerateReportsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { SettingsPage } from './pages/SettingsPage';
import { VaccineGuidePage } from './pages/VaccineGuidePage';
import { MohProfilePage } from './pages/MohProfilePage';
import { MohSystemOverviewReportPage } from './pages/MohSystemOverviewReportPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />

      {/* Parent Routes */}
      <Route path="/parent-dashboard-mobile" element={<ParentDashboardMobilePage />} />
      <Route path="/parent-dashboard-desktop" element={<ParentDashboardDesktopPage />} />
      <Route path="/parent-profile" element={<ParentProfilePage />} />
      <Route path="/add-child" element={<AddChildPage />} />
      <Route path="/child-profile-schedule" element={<ChildProfileSchedulePage />} />
      <Route path="/growth-chart/:childId" element={<GrowthChartPage />} />
      <Route path="/vaccination-card/:childId" element={<VaccinationCardPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/vaccine-guide" element={<VaccineGuidePage />} />
      
      {/* PHM Routes */}
      <Route path="/phm-dashboard" element={<PhmDashboardPage />} />
      <Route path="/clinic-scheduling" element={<ClinicSchedulingPage />} />
      <Route path="/vaccination-clinic-schedule" element={<VaccinationClinicSchedulePage />} />
      <Route path="/baby-registration" element={<BabyRegistrationPage />} />
      <Route path="/record-vaccination" element={<RecordVaccinationPage />} />
      <Route path="/edit-vaccination" element={<EditVaccinationPage />} />
      <Route path="/record-growth-data" element={<RecordGrowthDataPage />} />
      <Route path="/view-area-children" element={<ViewAreaChildrenPage />} />
      
      {/* MOH Routes: layout keeps sidebar visible for all MOH pages */}
      <Route path="/moh-analytics-dashboard" element={<Navigate to="/moh/system-overview" replace />} />
      <Route path="/moh" element={<MohLayout />}>
        <Route index element={<Navigate to="/moh/system-overview" replace />} />
        <Route path="system-overview" element={<MohSystemOverviewReportPage />} />
        <Route path="reports" element={<GenerateReportsPage />} />
        <Route path="audit-logs" element={<AuditLogsPage />} />
        <Route path="phm-management" element={<MohPhmManagementPage />} />
        <Route path="profile" element={<MohProfilePage />} />
      </Route>
      <Route path="/generate-reports" element={<GenerateReportsPage />} />
      <Route path="/audit-logs" element={<AuditLogsPage />} />
    </Routes>
  );
};

export default App;
