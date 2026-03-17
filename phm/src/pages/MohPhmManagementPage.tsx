import React, { useEffect, useState, FormEvent } from 'react';
import { dataService } from '../services/DataService';
import { api } from '../services/apiClient';

interface AreaPerf {
  areaCode: string;
  areaName: string;
  phmId?: string;
  phmName?: string;
  totalChildren: number;
  vaccinated: number;
  missed: number;
  coveragePercentage: number;
}

function coverageTextColor(pct: number): string {
  if (pct >= 90) return 'text-green-500';
  if (pct >= 75) return 'text-primary';
  return 'text-amber-500';
}

export const MohPhmManagementPage: React.FC = () => {
  const [areas, setAreas] = useState<AreaPerf[]>([]);
  const [totalChildren, setTotalChildren] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<{
    employeeId: string;
    userId: string;
    temporaryPassword: string;
  } | null>(null);
  const [phmForm, setPhmForm] = useState({
    employeeId: '',
    name: '',
    nic: '',
    email: '',
    phoneNumber: '',
    assignedArea: '',
  });

  useEffect(() => {
    setLoading(true);
    Promise.all([
      dataService.getAreaPerformance(),
      dataService.getMOHDashboard(),
    ]).then(([areaList, dash]) => {
      if (Array.isArray(areaList)) setAreas(areaList as AreaPerf[]);
      if (dash) setTotalChildren(dash.totalChildren);
    }).finally(() => setLoading(false));
  }, []);

  const fmt = (n: number) => n.toLocaleString();

  // Count distinct PHM officers (those with a phmId)
  const phmOfficerCount = areas.filter((a) => a.phmId).length;

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">
          PHM Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
          Manage PHM areas, officers, and assignments under your region.
        </p>
      </div>

      {/* Create PHM account form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold">Create PHM Account</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              MOH officers can create PHM accounts for their areas. A temporary password will be generated for first
              login.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-primary text-base">verified_user</span>
            <span>MOH-only • PHM cannot self-register</span>
          </div>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setCreateError(null);
            setCreateSuccess(null);
            setCreating(true);
            try {
              const res = await api.post<{
                message: string;
                userId: string;
                employeeId: string;
                temporaryPassword: string;
              }>('/users/phm', phmForm);
              setCreateSuccess({
                employeeId: res.employeeId,
                userId: res.userId,
                temporaryPassword: res.temporaryPassword,
              });
              setPhmForm({
                employeeId: '',
                name: '',
                nic: '',
                email: '',
                phoneNumber: '',
                assignedArea: '',
              });
            } catch (err: any) {
              setCreateError(err?.message || 'Failed to create PHM account. Please check details and try again.');
            } finally {
              setCreating(false);
            }
          }}
        >
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Employee ID</label>
            <input
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              placeholder="e.g. PHM001"
              value={phmForm.employeeId}
              onChange={(e) => setPhmForm({ ...phmForm, employeeId: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Full Name</label>
            <input
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              placeholder="PHM full name"
              value={phmForm.name}
              onChange={(e) => setPhmForm({ ...phmForm, name: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">NIC</label>
            <input
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              placeholder="National ID number"
              value={phmForm.nic}
              onChange={(e) => setPhmForm({ ...phmForm, nic: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Email</label>
            <input
              type="email"
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              placeholder="PHM email address"
              value={phmForm.email}
              onChange={(e) => setPhmForm({ ...phmForm, email: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Phone Number</label>
            <input
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              placeholder="Contact number"
              value={phmForm.phoneNumber}
              onChange={(e) => setPhmForm({ ...phmForm, phoneNumber: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Assigned Area</label>
            <input
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              placeholder="e.g. Colombo District"
              value={phmForm.assignedArea}
              onChange={(e) => setPhmForm({ ...phmForm, assignedArea: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-3 mt-2">
            {createError && (
              <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-3 py-2 text-sm text-red-700 dark:text-red-300">
                {createError}
              </div>
            )}
            {createSuccess && (
              <div className="rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-200">
                <p className="font-semibold mb-1">PHM account created successfully.</p>
                <p>Employee ID: <span className="font-mono">{createSuccess.employeeId}</span></p>
                <p>User ID: <span className="font-mono">{createSuccess.userId}</span></p>
                <p className="mt-1">
                  Temporary password:{' '}
                  <span className="font-mono font-semibold">{createSuccess.temporaryPassword}</span>
                </p>
                <p className="text-xs mt-2">
                  Please share this temporary password with the PHM through a secure channel. They will be required to
                  change it on first login.
                </p>
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={creating}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                {creating ? 'Creating PHM Account…' : 'Create PHM Account'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">location_city</span>
            <p className="text-slate-900 dark:text-white font-bold">PHM Areas</p>
          </div>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">
            {loading ? '—' : fmt(areas.length)}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Active in region</p>
        </div>

        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">person</span>
            <p className="text-slate-900 dark:text-white font-bold">PHM Officers</p>
          </div>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">
            {loading ? '—' : fmt(phmOfficerCount || areas.length)}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Registered</p>
        </div>

        <div className="rounded-xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">child_care</span>
            <p className="text-slate-900 dark:text-white font-bold">Children in Region</p>
          </div>
          <p className="text-slate-900 dark:text-white text-3xl font-bold">
            {loading ? '—' : fmt(totalChildren ?? 0)}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Under PHM coverage</p>
        </div>
      </div>

      {/* PHM Areas table */}
      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold">PHM Areas in Your Region</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Area / PHM Zone</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Assigned Officer</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Children</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Vaccinated</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Missed</th>
                <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Coverage %</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">Loading...</td>
                </tr>
              ) : areas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">No PHM areas found.</td>
                </tr>
              ) : (
                areas.map((area, idx) => (
                  <tr
                    key={area.areaCode}
                    className={`${idx < areas.length - 1 ? 'border-b border-slate-50 dark:border-slate-800' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}
                  >
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{area.areaName}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{area.phmName ?? '—'}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{fmt(area.totalChildren)}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{fmt(area.vaccinated)}</td>
                    <td className={`py-3 px-4 font-bold text-sm ${area.missed > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {fmt(area.missed)}
                    </td>
                    <td className={`py-3 px-4 font-bold ${coverageTextColor(area.coveragePercentage)}`}>
                      {area.coveragePercentage.toFixed(1)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
