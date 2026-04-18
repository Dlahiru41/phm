import { Route } from './Router';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ParentDashboardMobilePage } from '../pages/ParentDashboardMobilePage';
import { ParentDashboardDesktopPage } from '../pages/ParentDashboardDesktopPage';
import { PhmDashboardPage } from '../pages/PhmDashboardPage';
import { ChildProfileSchedulePage } from '../pages/ChildProfileSchedulePage';
import { GrowthChartPage } from '../pages/GrowthChartPage';
import { MohAnalyticsDashboardPage } from '../pages/MohAnalyticsDashboardPage';
import VaccinationCardPage from '../pages/VaccinationCardPage';

export const routes: Route[] = [
  {
    path: '/',
    name: 'Home',
    component: async () => HomePage(),
  },
  {
    path: '/login',
    name: 'Login',
    component: async () => LoginPage(),
  },
  {
    path: '/parent-dashboard-mobile',
    name: 'Parent Dashboard (Mobile)',
    component: async () => ParentDashboardMobilePage(),
  },
  {
    path: '/parent-dashboard-desktop',
    name: 'Parent Dashboard (Desktop)',
    component: async () => ParentDashboardDesktopPage(),
  },
  {
    path: '/phm-dashboard',
    name: 'PHM Dashboard',
    component: async () => PhmDashboardPage(),
  },
  {
    path: '/child-profile-schedule',
    name: 'Child Profile & Schedule',
    component: async () => ChildProfileSchedulePage(),
  },
  {
    path: '/growth-chart/:childId',
    name: 'Growth Chart',
    component: async () => GrowthChartPage(),
  },
  {
    path: '/vaccination-card/:childId',
    name: 'Vaccination Card',
    component: async () => VaccinationCardPage(),
  },
  {
    path: '/moh-analytics-dashboard',
    name: 'MOH Analytics Dashboard',
    component: async () => MohAnalyticsDashboardPage(),
  },
];
