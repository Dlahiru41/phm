import React, { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { AdminService, MohAccountCreateResponse } from '../services/AdminService';

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
  const [mohUsers, setMohUsers] = useState<MohUser[]>([]);
  const [stats, setStats] = useState({
    totalMohUsers: 0,
    totalPhmUsers: 0,
    totalChildren: 0,
  });

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
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const users = await AdminService.getMohUsers();
      setMohUsers(users || []);

      const dash = await AdminService.getAdminDashboard();
      if (dash) {
        setStats({
          totalMohUsers: dash.totalMohUsers || 0,
          totalPhmUsers: dash.totalPhmUsers || 0,
          totalChildren: dash.totalChildren || 0,
        });
      }
    } catch (err: any) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
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
      setTimeout(() => loadData(), 1500);
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
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">System Administrator</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">NCVMS Admin Portal</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto p-6 md:p-8">
        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Dashboard</h2>
              <p className="text-slate-600 dark:text-slate-400">System overview and statistics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">MOH Officers</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.totalMohUsers}</p>
                  </div>
                  <span className="material-symbols-outlined text-4xl text-blue-500">supervised_user_circle</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">PHM Officers</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.totalPhmUsers}</p>
                  </div>
                  <span className="material-symbols-outlined text-4xl text-green-500">person</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Total Children</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.totalChildren}</p>
                  </div>
                  <span className="material-symbols-outlined text-4xl text-purple-500">child_care</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('create-moh')}
                  className="p-4 border border-primary/20 rounded-lg hover:bg-primary/5 transition flex items-center gap-3 text-left"
                >
                  <span className="material-symbols-outlined text-primary text-2xl">person_add</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Create MOH Account</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Add new MOH officer instantly</p>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('moh-users')}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-3 text-left"
                >
                  <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-2xl">group</span>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">View MOH Users</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Manage existing MOH accounts</p>
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
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Create MOH Account</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Fill in MOH officer details to create account instantly. A secure temporary password will be generated and sent via WhatsApp.
              </p>
            </div>

            <form onSubmit={handleCreateMohAccount} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Employee ID *</label>
                  <input
                    type="text"
                    placeholder="e.g., MOH-2024-001"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., Dr. Ruwan Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">National ID (NIC) *</label>
                  <input
                    type="text"
                    placeholder="e.g., 987654321V"
                    value={formData.nic}
                    onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Email *</label>
                  <input
                    type="email"
                    placeholder="e.g., rsilva@moh.lk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="e.g., +94711234567"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Assigned Area *</label>
                  <input
                    type="text"
                    placeholder="e.g., Colombo District"
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
                    <p className="text-green-600 dark:text-green-400 font-bold">MOH Account Created Successfully!</p>
                  </div>
                  <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <p><strong>User ID:</strong> {createSuccess.mohUserId}</p>
                    <p><strong>Email:</strong> {createSuccess.email}</p>
                    <p><strong>Temporary Password:</strong> <code className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded">{createSuccess.tempPassword}</code></p>
                    <p><strong>Sent to:</strong> {createSuccess.maskedDestination}</p>
                    <p className="text-xs italic pt-2 border-t border-green-300 dark:border-green-700 pt-3">
                      ✓ Temporary password sent via WhatsApp
                      <br/>
                      ✓ MOH user must change password on first login
                      <br/>
                      ✓ Password valid for 24 hours
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
                      Creating...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">check_circle</span>
                      Create MOH Account
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
                  Back to Dashboard
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MOH Users Tab */}
        {activeTab === 'moh-users' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">MOH Users</h2>
              <p className="text-slate-600 dark:text-slate-400">All MOH officers in the system</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-4xl text-slate-400 animate-spin">hourglass_top</span>
                <p className="text-slate-600 dark:text-slate-400 mt-4">Loading MOH users...</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                {mohUsers.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <p className="text-slate-600 dark:text-slate-400">No MOH users found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Employee ID</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Name</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Email</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Assigned Area</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Created</th>
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
                                  First Login Pending
                                </span>
                              ) : (
                                <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                                  Active
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
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

