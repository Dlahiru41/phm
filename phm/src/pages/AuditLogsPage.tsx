import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: 'parent' | 'phm' | 'moh';
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress: string;
}

export const AuditLogsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterAction, setFilterAction] = useState<string>('all');

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00',
      user: 'Dr. Perera',
      userRole: 'phm',
      action: 'Record Vaccination',
      entityType: 'Vaccination',
      entityId: 'VAC-001',
      details: 'Recorded Pentavalent (3rd Dose) for Kavindu Perera',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2024-01-15T09:15:00',
      user: 'Amara Perera',
      userRole: 'parent',
      action: 'View Records',
      entityType: 'Child Profile',
      entityId: 'CHILD-001',
      details: 'Viewed vaccination records for Kavindu Perera',
      ipAddress: '192.168.1.101'
    },
    {
      id: '3',
      timestamp: '2024-01-14T16:45:00',
      user: 'Dr. Silva',
      userRole: 'moh',
      action: 'Generate Report',
      entityType: 'Report',
      entityId: 'RPT-2024-001',
      details: 'Generated Vaccination Coverage Report for Colombo District',
      ipAddress: '192.168.1.102'
    },
    {
      id: '4',
      timestamp: '2024-01-14T14:20:00',
      user: 'Dr. Perera',
      userRole: 'phm',
      action: 'Register Baby',
      entityType: 'Child',
      entityId: 'CHILD-003',
      details: 'Registered new baby: Arjun Perera',
      ipAddress: '192.168.1.100'
    },
    {
      id: '5',
      timestamp: '2024-01-14T11:10:00',
      user: 'Dr. Perera',
      userRole: 'phm',
      action: 'Update Vaccination',
      entityType: 'Vaccination',
      entityId: 'VAC-002',
      details: 'Updated vaccination record for Nimasha Perera',
      ipAddress: '192.168.1.100'
    }
  ]);

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || log.userRole === filterRole;
    const matchesAction = filterAction === 'all' || log.action.toLowerCase().includes(filterAction.toLowerCase());
    return matchesSearch && matchesRole && matchesAction;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'phm':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'parent':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'moh':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Record') || action.includes('Register')) return 'add';
    if (action.includes('Update') || action.includes('Edit')) return 'edit';
    if (action.includes('Delete')) return 'delete';
    if (action.includes('View')) return 'visibility';
    if (action.includes('Generate') || action.includes('Report')) return 'description';
    return 'history';
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate('/moh-analytics-dashboard')}
            className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-2">Audit Logs</h1>
          <p className="text-[#4c739a] dark:text-slate-400">
            View SuwaCare LK system activity and user actions for security and compliance.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-[#4c739a] dark:text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search by user, action, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 rounded-lg border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="all">All Roles</option>
            <option value="phm">PHM</option>
            <option value="parent">Parent</option>
            <option value="moh">MOH Officer</option>
          </select>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-4 py-3 rounded-lg border border-[#cfdbe7] dark:border-slate-700 bg-white dark:bg-background-dark text-[#0d141b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="all">All Actions</option>
            <option value="record">Record</option>
            <option value="update">Update</option>
            <option value="view">View</option>
            <option value="generate">Generate</option>
            <option value="register">Register</option>
          </select>
        </div>

        <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f6f7f8] dark:bg-slate-800 border-b border-[#e7edf3] dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[#4c739a] dark:text-slate-400 uppercase tracking-wider">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7edf3] dark:divide-slate-700">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[#4c739a] dark:text-slate-400">
                      No audit logs found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#f6f7f8] dark:hover:bg-slate-800 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#0d141b] dark:text-white">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-bold text-[#0d141b] dark:text-white">{log.user}</p>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${getRoleColor(log.userRole)}`}>
                            {log.userRole.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-lg text-[#4c739a] dark:text-slate-400">
                            {getActionIcon(log.action)}
                          </span>
                          <p className="text-sm text-[#0d141b] dark:text-white">{log.action}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#0d141b] dark:text-white">{log.details}</p>
                        <p className="text-xs text-[#4c739a] dark:text-slate-400 mt-1">
                          {log.entityType} - {log.entityId}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#0d141b] dark:text-white font-mono">{log.ipAddress}</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-[#4c739a] dark:text-slate-400">
          <p>Showing {filteredLogs.length} of {auditLogs.length} audit logs</p>
          <button
            onClick={() => {
              // In a real app, this would export the audit logs
              alert('Exporting audit logs...');
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined">download</span>
            Export Logs
          </button>
        </div>
      </div>
    </div>
  );
};
