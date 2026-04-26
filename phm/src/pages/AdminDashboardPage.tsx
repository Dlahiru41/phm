import React, { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { AdminService, MohAccountCreateResponse } from '../services/AdminService';
import { TranslationService } from '../services/TranslationService';

interface MohUser {
  userId: string;
  employeeId: string;
  name: string;
  email: string;
  nic: string;
  assignedArea: string;
  phoneNumber: string;
  createdAt: string;
  firstLogin: boolean;
}

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'create-moh' | 'moh-users'>('dashboard');
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mohUsers, setMohUsers] = useState<MohUser[]>([]);


  // Create MOH Account Form State
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<MohAccountCreateResponse | null>(null);

  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    nic: '',
    email: '',
    phoneNumber: '',
    assignedArea: '',
  });


  // Check if user is admin
  useEffect(() => {
    if (!AuthService.isAdmin()) {
      navigate('/login');
    }
    loadMohUsers();
  }, [navigate]);

  const loadMohUsers = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const users = await AdminService.getMohUsers();
      console.log('Loaded MOH users:', users);
      setMohUsers(users || []);
    } catch (err: any) {
      console.error('Failed to load MOH users:', err);
      setLoadError(err?.message || 'Failed to load MOH users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load MOH users when switching to moh-users tab
  const handleMohUsersTab = () => {
    setActiveTab('moh-users');
    loadMohUsers();
  };

  const handleCreateMohAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateError(null);
    setCreateSuccess(null);
    setCreating(true);

    try {
      const response = await AdminService.createMohAccount(formData);
      setCreateSuccess(response);

      // Reset form
      setFormData({
        employeeId: '',
        name: '',
        nic: '',
        email: '',
        phoneNumber: '',
        assignedArea: '',
      });

      // Reload MOH users list
      setTimeout(() => loadMohUsers(), 1500);
    } catch (err: any) {
      setCreateError(err?.message || 'Failed to create MOH account. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{TranslationService.t('adminDashboard.title')}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">{TranslationService.t('adminDashboard.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            {TranslationService.t('common.logout')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto p-6 md:p-8">
        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{TranslationService.t('adminDashboard.dashboard.title')}</h2>
              <p className="text-slate-600 dark:text-slate-400">{TranslationService.t('adminDashboard.dashboard.subtitle')}</p>
            </div>



            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{TranslationService.t('adminDashboard.dashboard.quickActions')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('create-moh')}
                  className="p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition flex items-center gap-3 text-left"
                >
                  <span className="material-symbols-outlined text-primary text-2xl">person_add</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{TranslationService.t('adminDashboard.dashboard.createMohAccount')}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{TranslationService.t('adminDashboard.dashboard.createMohAccountSubtitle')}</p>
                  </div>
                </button>
                <button
                  onClick={handleMohUsersTab}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-3 text-left"
                >
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-2xl">group</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{TranslationService.t('adminDashboard.dashboard.viewMohUsers')}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{TranslationService.t('adminDashboard.dashboard.viewMohUsersSubtitle')}</p>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Create MOH Account Tab */}
        {activeTab === 'create-moh' && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{TranslationService.t('adminDashboard.createMoh.title')}</h2>
              <p className="text-slate-600 dark:text-slate-400">
                {TranslationService.t('adminDashboard.createMoh.subtitle')}
              </p>
            </div>

            <form onSubmit={handleCreateMohAccount} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{TranslationService.t('adminDashboard.createMoh.employeeIdLabel')} *</label>
                  <input
                    type="text"
                    placeholder={TranslationService.t('adminDashboard.createMoh.employeeIdPlaceholder')}
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{TranslationService.t('adminDashboard.createMoh.fullNameLabel')} *</label>
                  <input
                    type="text"
                    placeholder={TranslationService.t('adminDashboard.createMoh.fullNamePlaceholder')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{TranslationService.t('adminDashboard.createMoh.nicLabel')} *</label>
                  <input
                    type="text"
                    placeholder={TranslationService.t('adminDashboard.createMoh.nicPlaceholder')}
                    value={formData.nic}
                    onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{TranslationService.t('adminDashboard.createMoh.emailLabel')} *</label>
                  <input
                    type="email"
                    placeholder={TranslationService.t('adminDashboard.createMoh.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{TranslationService.t('adminDashboard.createMoh.phoneLabel')} *</label>
                  <input
                    type="tel"
                    placeholder={TranslationService.t('adminDashboard.createMoh.phonePlaceholder')}
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{TranslationService.t('adminDashboard.createMoh.assignedAreaLabel')} *</label>
                  <input
                    type="text"
                    placeholder={TranslationService.t('adminDashboard.createMoh.assignedAreaPlaceholder')}
                    value={formData.assignedArea}
                    onChange={(e) => setFormData({ ...formData, assignedArea: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {createError && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 font-medium">{createError}</p>
                </div>
              )}

              {createSuccess && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                    <p className="text-green-600 dark:text-green-400 font-bold">{TranslationService.t('adminDashboard.createMoh.successTitle')}</p>
                  </div>
                  <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <p><strong>{TranslationService.t('adminDashboard.createMoh.successUserId')}:</strong> {createSuccess.mohUserId}</p>
                    <p><strong>{TranslationService.t('adminDashboard.createMoh.successEmail')}:</strong> {createSuccess.email}</p>
                    <p><strong>{TranslationService.t('adminDashboard.createMoh.successTempPassword')}:</strong> <code className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded">{createSuccess.tempPassword}</code></p>
                    <p><strong>{TranslationService.t('adminDashboard.createMoh.successSentTo')}:</strong> {createSuccess.maskedDestination}</p>
                    <p className="text-xs italic pt-2 border-t border-green-300 dark:border-green-700 pt-3">
                      ✓ {TranslationService.t('adminDashboard.createMoh.successNote1')}
                      <br/>
                      ✓ {TranslationService.t('adminDashboard.createMoh.successNote2')}
                      <br/>
                      ✓ {TranslationService.t('adminDashboard.createMoh.successNote3')}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  {creating ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">hourglass_top</span>
                      {TranslationService.t('common.creating')}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">check_circle</span>
                      {TranslationService.t('adminDashboard.createMoh.createButton')}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('dashboard');
                    setCreateSuccess(null);
                    setCreateError(null);
                  }}
                  className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                >
                  {TranslationService.t('common.backToDashboard')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MOH Users Tab */}
        {activeTab === 'moh-users' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{TranslationService.t('adminDashboard.mohUsers.title')}</h2>
              <p className="text-slate-600 dark:text-slate-400">{TranslationService.t('adminDashboard.mohUsers.subtitle')}</p>
            </div>

            {loadError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
                  <p className="text-red-600 dark:text-red-400 font-medium">{loadError}</p>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-4xl text-slate-400 animate-spin">hourglass_top</span>
                <p className="text-slate-600 dark:text-slate-400 mt-4">{TranslationService.t('adminDashboard.mohUsers.loading')}</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                {mohUsers.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <p className="text-slate-600 dark:text-slate-400">{TranslationService.t('adminDashboard.mohUsers.noUsers')}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">{TranslationService.t('adminDashboard.mohUsers.table.employeeId')}</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">{TranslationService.t('adminDashboard.mohUsers.table.name')}</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">{TranslationService.t('adminDashboard.mohUsers.table.email')}</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">{TranslationService.t('adminDashboard.mohUsers.table.assignedArea')}</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">{TranslationService.t('adminDashboard.mohUsers.table.status')}</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">{TranslationService.t('adminDashboard.mohUsers.table.created')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mohUsers.map((user) => (
                          <tr key={user.userId} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{user.employeeId}</td>
                            <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{user.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{user.email}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{user.assignedArea}</td>
                            <td className="px-6 py-4 text-sm">
                              {user.firstLogin ? (
                                <span className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-medium">
                                  {TranslationService.t('adminDashboard.mohUsers.status.pending')}
                                </span>
                              ) : (
                                <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                                  {TranslationService.t('adminDashboard.mohUsers.status.active')}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setActiveTab('dashboard')}
              className="mt-6 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition"
            >
              {TranslationService.t('common.backToDashboard')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

