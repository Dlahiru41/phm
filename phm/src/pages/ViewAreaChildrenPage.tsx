import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Child, Gender } from '../types/models';
import { dataService } from '../services/DataService';
import { AuthService } from '../services/AuthService';
import { PhmLayout } from '../components/PhmLayout';

type NewlyRegisteredState = {
  childId: string;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

// Extended Child interface for display purposes
interface ChildWithStatus extends Child {
  vaccinationStatus: 'on-track' | 'behind' | 'up-to-date';
  lastVaccination?: Date;
  nextDue?: Date;
  // Human-readable area label for MOH filtering
  areaLabel?: string;
}

function parseDoB(val: string): Date {
  if (!val) return new Date(0);
  const d = new Date(val);
  return isNaN(d.getTime()) ? new Date(0) : d;
}

export const ViewAreaChildrenPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [children, setChildren] = useState<ChildWithStatus[]>([]);
  const [isPHM, setIsPHM] = useState(false);
  const [isMOH, setIsMOH] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);

  const newlyRegisteredFromState = location.state?.newlyRegistered as NewlyRegisteredState | undefined;

  useEffect(() => {
    let cancelled = false;
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) return;

    const userIsPHM = AuthService.isPHM();
    const userIsMOH = AuthService.isMOH();
    setIsPHM(userIsPHM);
    setIsMOH(userIsMOH);

    (async () => {
      let baseChildren: Child[] = [];
      if (userIsPHM) {
        baseChildren = await dataService.getMyChildren();
      } else if (userIsMOH) {
        const res = await dataService.getAllChildren({ limit: 500 });
        baseChildren = res.data;
      } else {
        baseChildren = await dataService.getChildrenByParent(currentUser.userId);
      }
      if (cancelled) return;

      const childrenWithStatus: ChildWithStatus[] = await Promise.all(
        baseChildren.map(async (child) => {
          const [records, schedules] = await Promise.all([
            dataService.getVaccinationRecordsByChild(child.childId),
            dataService.getScheduleItemsByChild(child.childId),
          ]);
          const upcomingSchedule = schedules.find(
            (s) => s.status === 'pending' || s.status === 'scheduled'
          );
          let status: 'on-track' | 'behind' | 'up-to-date' = 'on-track';
          if (records.length === 0 && schedules.length > 0) status = 'behind';
          else if (records.length > 0 && schedules.length === 0) status = 'up-to-date';
          return {
            ...child,
            vaccinationStatus: status,
            lastVaccination: records.length > 0 ? records[records.length - 1].administeredDate : undefined,
            nextDue: upcomingSchedule ? upcomingSchedule.dueDate : undefined,
            areaLabel: child.areaName,
          };
        })
      );
      if (cancelled) return;

      let merged = childrenWithStatus;
      if (newlyRegisteredFromState?.registrationNumber && newlyRegisteredFromState?.firstName) {
        const nr = newlyRegisteredFromState;
        const existingIds = new Set(childrenWithStatus.map((c) => c.childId));
        const existingRegNums = new Set(childrenWithStatus.map((c) => c.registrationNumber));
        const alreadyInList =
          (nr.childId && existingIds.has(nr.childId)) || existingRegNums.has(nr.registrationNumber);
        if (!alreadyInList) {
          const newChild: ChildWithStatus = {
            childId: nr.childId || `new-${nr.registrationNumber}`,
            registrationNumber: nr.registrationNumber,
            firstName: nr.firstName,
            lastName: nr.lastName,
            dateOfBirth: parseDoB(nr.dateOfBirth),
            gender: Gender.MALE,
            bloodGroup: '',
            birthWeight: 0,
            birthHeight: 0,
            parentId: '',
            registeredBy: '',
            areaCode: '',
            areaName: '',
            vaccinationStatus: 'on-track',
            areaLabel: '',
          };
          merged = [newChild, ...childrenWithStatus];
        }
      }
      setChildren(merged);
      if (userIsMOH) {
        const areas = Array.from(
          new Set(childrenWithStatus.map((c) => c.areaLabel).filter(Boolean) as string[])
        ).sort();
        setAvailableAreas(areas);
      }
    })();
    return () => { cancelled = true; };
  }, [newlyRegisteredFromState?.registrationNumber]);

  const filteredChildren = children.filter(child => {
    const fullName = `${child.firstName} ${child.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      child.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || child.vaccinationStatus === filterStatus;

    const matchesArea =
      !isMOH || selectedArea === 'all' || child.areaLabel === selectedArea;

    return matchesSearch && matchesStatus && matchesArea;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up-to-date':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'on-track':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'behind':
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'up-to-date':
        return 'Up to Date';
      case 'on-track':
        return 'On Track';
      case 'behind':
        return 'Behind Schedule';
      default:
        return status;
    }
  };

  const content = (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        {!isPHM && (
          <button
            type="button"
            onClick={() => navigate(isMOH ? '/moh-analytics-dashboard' : '/phm-dashboard')}
            className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
        )}
        <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">
                {isMOH ? 'Children by Area' : 'Children in My Area'}
              </h1>
              <p className="text-[#4c739a] dark:text-slate-400">
                {isMOH
                  ? 'View and filter all registered children across PHM areas'
                  : 'View and manage children registered in your assigned area'}
              </p>
            </div>
            {isPHM && (
              <button
                onClick={() => navigate('/baby-registration')}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                <span className="material-symbols-outlined">person_add</span>
                Register New Child
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4c739a] dark:text-slate-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search by name or registration number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-lg border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="up-to-date">Up to Date</option>
              <option value="on-track">On Track</option>
              <option value="behind">Behind Schedule</option>
            </select>
            {isMOH && (
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-4 py-3 rounded-lg border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
              >
                <option value="all">All Areas</option>
                {availableAreas.map(area => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f6f7f8] dark:bg-slate-800 border-b border-[#e7edf3] dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Child Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Registration Number</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Date of Birth</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Next Due</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7edf3] dark:divide-slate-700">
                {filteredChildren.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#4c739a] dark:text-slate-400">
                      No children found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredChildren.map((child) => (
                  <tr key={child.childId} className="hover:bg-[#f6f7f8] dark:hover:bg-slate-800 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-bold text-[#0d141b] dark:text-white">
                            {child.firstName} {child.lastName}
                          </p>
                          <p className="text-xs text-[#4c739a] dark:text-slate-400">
                            {child.gender === Gender.MALE ? 'Male' : 'Female'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#0d141b] dark:text-white font-mono">{child.registrationNumber}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#0d141b] dark:text-white">
                          {child.dateOfBirth.toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(child.vaccinationStatus)}`}>
                          {getStatusLabel(child.vaccinationStatus)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#0d141b] dark:text-white">
                          {child.nextDue ? child.nextDue.toLocaleDateString() : 'N/A'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to="/child-profile-schedule"
                            state={{ childId: child.childId }}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title="View Profile"
                          >
                            <span className="material-symbols-outlined text-lg">visibility</span>
                          </Link>
                          <button
                            onClick={() => navigate('/record-vaccination', { state: { childId: child.childId } })}
                            className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Record Vaccination"
                          >
                            <span className="material-symbols-outlined text-lg">vaccines</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-[#4c739a] dark:text-slate-400">
          <p>Showing {filteredChildren.length} of {children.length} children</p>
        </div>
      </div>
  );

  if (isPHM) {
    return (
      <PhmLayout activeNav="view-area-children" showBackToDashboard={true}>
        {content}
      </PhmLayout>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {content}
    </div>
  );
};
