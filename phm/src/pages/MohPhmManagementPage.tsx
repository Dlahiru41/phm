import React, { useState, FormEvent } from 'react';
import { api } from '../services/apiClient';

const GN_DIVISIONS = [
  '96 - Kumbalwella South',
  '96A - Mahamodara',
  '96B - Galwadugoda',
  '96C - Kaluwella',
  '96D - Fort',
  '96E - Richmond Hill',
  '96F - Kandewatta',
  '96G - Chinagarden',
  '96H - Minuwangoda',
  '96I - Osanagoda',
  '96J - Kumbalwella North',
  '97 - Kongaha',
  '97A - Weliwatta',
  '97B - Madapathala',
  '97C - Pokunawatta',
  '97D - Dangedara East',
  '98 - Madawalamulla North',
  '98A - Madawalamulla South',
  '98B - Bataganvila',
  '98C - Sangamittapura',
  '98D - Dangedara West',
  '99 - Magalle',
  '99A - Thalapitiya',
  '99B - Pettigalawatta',
  '99C - Makuluwa',
  '99D - Dewathura',
  '100 - Katugoda',
  '100A - Dewata',
  '101 - Maitipe',
  '101A - Deddugoda South',
  '101B - Milidduwa',
  '101C - Deddugoda North',
  '101D - Welipatha',
  '101E - Maligaspe',
  '102 - Dadella West',
  '102A - Dadella East',
  '102B - Walauwatta',
  '102C - Siyambalagahawatta',
  '103 - Gintota West',
  '103A - Gintota East',
  '105 - Welipitimodara',
  '106 - Kurunduwatta',
  '107 - Piyadigama',
  '107A - Bope North',
  '108 - Ukwattta East',
  '108A - Mahahapugala',
  '108B - Ukwatta West',
  '119 - Bope West',
  '119A - Bope East',
  '130 - Eththiligoda South',
];


export const MohPhmManagementPage: React.FC = () => {
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
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Assigned GN Division</label>
            <select
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100"
              value={phmForm.assignedArea}
              onChange={(e) => setPhmForm({ ...phmForm, assignedArea: e.target.value })}
              required
            >
              <option value="">Select GN Division</option>
              {GN_DIVISIONS.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
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

      {/* Stat cards removed */}

    </div>
  );
};
