import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuditLog as AuditLogType } from '../types/models';
import { dataService } from '../services/DataService';
import { AuthService } from '../services/AuthService';

export const AuditLogsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const embeddedInMoh = location.pathname.startsWith('/moh');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [auditLogs, setAuditLogs] = useState<AuditLogType[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const params: Record<string, string> = { page: String(page), limit: '50' };
    if (filterRole !== 'all') params.userRole = filterRole;
    if (filterAction !== 'all') params.action = filterAction;
    if (searchTerm.trim()) params.search = searchTerm.trim();
    dataService.getAuditLogs(params).then((res) => {
      if (!cancelled) {
        setAuditLogs(res.data);
        setTotal(res.total);
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [page, filterRole, filterAction, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [filterRole, filterAction, searchTerm]);

  const displayLogs = auditLogs;

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
    <div className={embeddedInMoh ? '' : 'flex min-h-screen bg-background-light dark:bg-background-dark'}>
      <div className="w-full max-w-7xl mx-auto px-6 py-12">
        {!embeddedInMoh && (
          <div className="mb-8">
            <button
              onClick={() => navigate('/moh')}
              className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="text-sm font-medium">Back to Dashboard</span>
            </button>
          </div>
        )}
        <div className="mb-8">
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
                {displayLogs.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[#4c739a] dark:text-slate-400">
                      No audit logs found matching your search criteria.
                    </td>
                  </tr>
                ) : (
                  displayLogs.map((log) => (
                    <tr key={log.logId} className="hover:bg-[#f6f7f8] dark:hover:bg-slate-800 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#0d141b] dark:text-white">
                          {log.timestamp instanceof Date ? log.timestamp.toLocaleString() : new Date(log.timestamp as any).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-bold text-[#0d141b] dark:text-white">{log.userName || log.userId}</p>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${getRoleColor(log.userRole || '')}`}>
                            {(log.userRole || '').toUpperCase()}
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
                        <p className="text-sm text-[#0d141b] dark:text-white">{log.details || ''}</p>
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
          <p>{loading ? 'Loading...' : `Showing ${displayLogs.length} of ${total} audit logs`}</p>
          <a
            href={dataService.getAuditLogExportUrl({
              userRole: filterRole !== 'all' ? filterRole : '',
              action: filterAction !== 'all' ? filterAction : '',
              search: searchTerm,
              format: 'csv',
            })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            onClick={(e) => {
              const token = AuthService.getToken();
              if (token) {
                e.preventDefault();
                const url = (e.currentTarget as HTMLAnchorElement).href;
                fetch(url, { headers: { Authorization: `Bearer ${token}` } })
                  .then((r) => r.blob())
                  .then((blob) => {
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = 'audit-logs.csv';
                    a.click();
                    URL.revokeObjectURL(a.href);
                  });
              }
            }}
          >
            <span className="material-symbols-outlined">download</span>
            Export Logs
          </a>
        </div>
      </div>
    </div>
  );
};
