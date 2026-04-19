import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Notification, NotificationType, VaccinationDue } from '../types/models';
import { dataService } from '../services/DataService';
import { AuthService } from '../services/AuthService';
import { TranslationService } from '../services/TranslationService';
import { ParentLayout } from '../components/ParentLayout';
import { PhmLayout } from '../components/PhmLayout';

interface CombinedNotification extends Notification {
  source?: 'notification' | 'vaccination_due';
  vaccinationDueData?: VaccinationDue;
}

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const isParent = AuthService.isParent();
  const isPHM = AuthService.isPHM();
  const [notifications, setNotifications] = useState<CombinedNotification[]>([]);
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Fetch regular notifications
      const notifRes = await dataService.getNotifications();
      let allNotifications: CombinedNotification[] = notifRes.data.map((n) => ({
        ...n,
        source: 'notification',
      }));

      // If parent, also fetch due vaccinations and convert them to notifications
      if (isParent) {
        try {
          const dueVaccinations = await dataService.getDueVaccinations();
          const vaccinationNotifications: CombinedNotification[] = dueVaccinations.map((due) => ({
            notificationId: `due-vaccination-${due.childId}-${due.vaccineName}`,
            recipientId: AuthService.getCurrentUser()?.userId || '',
            type: NotificationType.VACCINATION_DUE,
            message: due.clinicReminder,
            relatedChildId: due.childId,
            sentDate: new Date(),
            isRead: false,
            source: 'vaccination_due',
            vaccinationDueData: due,
          }));
          allNotifications = [...allNotifications, ...vaccinationNotifications];
          // Sort by sentDate descending (most recent first)
          allNotifications.sort((a, b) => b.sentDate.getTime() - a.sentDate.getTime());
        } catch (error) {
          console.error('Error fetching due vaccinations:', error);
        }
      }

      if (!cancelled) setNotifications(allNotifications);
    })();
    return () => {
      cancelled = true;
    };
  }, [isParent]);

  const markAsRead = async (notificationId: string) => {
    const ok = await dataService.markNotificationAsRead(notificationId);
    if (ok) {
      setNotifications((prev) =>
        prev.map((n) => (n.notificationId === notificationId ? { ...n, isRead: true } : n))
      );
    }
  };


  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.UPCOMING:
      case NotificationType.VACCINATION_DUE:
      case NotificationType.VACCINATION_CLINIC:
        return 'event_upcoming';
      case NotificationType.MISSED:
      case NotificationType.MISSED_VACCINATION:
      case NotificationType.MISSED_CLINIC:
        return 'warning';
      case NotificationType.CANCELLED_CLINIC:
      case NotificationType.CANCELLED_VACCINATION:
        return 'event_busy';
      case NotificationType.REMINDER:
        return 'notifications_active';
      case NotificationType.GROWTH_RECORD:
        return 'monitoring';
      case NotificationType.CLINIC_REMINDER:
      case NotificationType.NORMAL_CLINIC:
        return 'local_hospital';
      case 'child_linked' as any:
        return 'person_add';
      default:
        return 'info';
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case NotificationType.UPCOMING:
      case NotificationType.VACCINATION_DUE:
      case NotificationType.VACCINATION_CLINIC:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case NotificationType.MISSED:
      case NotificationType.MISSED_VACCINATION:
      case NotificationType.MISSED_CLINIC:
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case NotificationType.CANCELLED_CLINIC:
      case NotificationType.CANCELLED_VACCINATION:
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case NotificationType.REMINDER:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case NotificationType.GROWTH_RECORD:
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case NotificationType.CLINIC_REMINDER:
      case NotificationType.NORMAL_CLINIC:
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      case 'child_linked' as any:
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800';
    }
  };

  const getNotificationTitle = (type: NotificationType): string => {
    switch (type) {
      case NotificationType.UPCOMING:
        return 'Upcoming Vaccination';
      case NotificationType.MISSED:
        return 'Missed Vaccine Sessions';
      case NotificationType.MISSED_VACCINATION:
        return 'Missed Vaccine Sessions';
      case NotificationType.MISSED_CLINIC:
        return 'Missed Clinic Sessions';
      case NotificationType.CANCELLED_CLINIC:
        return 'Cancelled Clinic Sessions Notification';
      case NotificationType.CANCELLED_VACCINATION:
        return 'Cancelled Vaccination Sessions Notifications';
      case NotificationType.REMINDER:
        return 'Vaccination Reminder';
      case NotificationType.VACCINATION_DUE:
        return 'Scheduled Vaccination Sessions';
      case NotificationType.VACCINATION_CLINIC:
        return 'Scheduled Vaccination Sessions';
      case NotificationType.NORMAL_CLINIC:
        return 'Scheduled Clinic Sessions';
      case NotificationType.GROWTH_RECORD:
        return 'Growth Record Update';
      case NotificationType.CLINIC_REMINDER:
        return 'Scheduled Clinic Sessions';
      case NotificationType.CHILD_LINKED:
        return 'Child Account Linked';
      case NotificationType.VACCINATION_COMPLETED:
        return 'Vaccination Completed';
      default:
        return 'Notification';
    }
  };

  const filteredNotifications = (() => {
    if (filter === 'all') return notifications;

    const filterType = filter as NotificationType; // Explicitly cast to NotificationType after 'all' check

    // If filtering for Vaccination Sessions, show both VACCINATION_DUE and VACCINATION_CLINIC
    if (filterType === NotificationType.VACCINATION_DUE) {
      return notifications.filter((n): n is CombinedNotification =>
        n.type === NotificationType.VACCINATION_DUE || n.type === NotificationType.VACCINATION_CLINIC
      );
    }

    // If filtering for Clinic Sessions, show both CLINIC_REMINDER and NORMAL_CLINIC
    if (filterType === NotificationType.CLINIC_REMINDER) {
      return notifications.filter((n): n is CombinedNotification =>
        n.type === NotificationType.CLINIC_REMINDER || n.type === NotificationType.NORMAL_CLINIC
      );
    }

    // For all other filters, only show exact matches
    return notifications.filter((n): n is CombinedNotification => n.type === filterType);
  })();

  const unreadCount = filteredNotifications.filter((n) => !n.isRead).length;

  const content = (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        {!(isParent || isPHM) && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back</span>
          </button>
        )}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-1">
              {TranslationService.t('notification.title')}
            </h1>
            <p className="text-[#4c739a] dark:text-slate-400">
              {unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                : 'All caught up!'}
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-[#e7edf3] dark:border-slate-700">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-[#0d141b] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All
          </button>
          {[NotificationType.VACCINATION_DUE, NotificationType.CLINIC_REMINDER, NotificationType.MISSED_VACCINATION, NotificationType.MISSED_CLINIC, NotificationType.CANCELLED_CLINIC, NotificationType.CANCELLED_VACCINATION].map(
            (type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === type
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-[#0d141b] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {getNotificationTitle(type)}
              </button>
            )
          )}
        </div>

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-[#4c739a] dark:text-slate-400 mb-4">
                notifications_off
              </span>
              <p className="text-lg font-medium text-[#0d141b] dark:text-white mb-2">
                {TranslationService.t('notification.noNotifications')}
              </p>
              <p className="text-sm text-[#4c739a] dark:text-slate-400">You're all caught up!</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.notificationId}
                className={`bg-white dark:bg-[#1a2632] rounded-xl border ${getNotificationColor(notification.type)} p-6 cursor-pointer transition-all hover:shadow-md ${
                  !notification.isRead ? 'ring-2 ring-primary/20' : ''
                }`}
                onClick={() => {
                  // Only mark as read if it's from the notification system
                  if (notification.source === 'notification') {
                    markAsRead(notification.notificationId);
                  }
                  if (notification.relatedChildId) {
                    navigate(`/child-profile-schedule?childId=${notification.relatedChildId}`);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                      notification.type === NotificationType.UPCOMING || notification.type === NotificationType.VACCINATION_DUE || notification.type === NotificationType.VACCINATION_CLINIC
                        ? 'bg-blue-100 dark:bg-blue-900/30'
                        : notification.type === NotificationType.MISSED || notification.type === NotificationType.MISSED_VACCINATION || notification.type === NotificationType.MISSED_CLINIC
                        ? 'bg-red-100 dark:bg-red-900/30'
                        : notification.type === NotificationType.CANCELLED_CLINIC || notification.type === NotificationType.CANCELLED_VACCINATION
                        ? 'bg-orange-100 dark:bg-orange-900/30'
                        : notification.type === NotificationType.REMINDER
                        ? 'bg-yellow-100 dark:bg-yellow-900/30'
                        : notification.type === NotificationType.GROWTH_RECORD
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : notification.type === NotificationType.CLINIC_REMINDER || notification.type === NotificationType.NORMAL_CLINIC
                        ? 'bg-purple-100 dark:bg-purple-900/30'
                        : 'bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-xl ${
                        notification.type === NotificationType.UPCOMING || notification.type === NotificationType.VACCINATION_DUE || notification.type === NotificationType.VACCINATION_CLINIC
                          ? 'text-blue-600 dark:text-blue-400'
                          : notification.type === NotificationType.MISSED || notification.type === NotificationType.MISSED_VACCINATION || notification.type === NotificationType.MISSED_CLINIC
                          ? 'text-red-600 dark:text-red-400'
                          : notification.type === NotificationType.CANCELLED_CLINIC || notification.type === NotificationType.CANCELLED_VACCINATION
                          ? 'text-orange-600 dark:text-orange-400'
                          : notification.type === NotificationType.REMINDER
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : notification.type === NotificationType.GROWTH_RECORD
                          ? 'text-green-600 dark:text-green-400'
                          : notification.type === NotificationType.CLINIC_REMINDER || notification.type === NotificationType.NORMAL_CLINIC
                          ? 'text-purple-600 dark:text-purple-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-[#0d141b] dark:text-white mb-1">
                          {getNotificationTitle(notification.type)}
                          {!notification.isRead && (
                            <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block"></span>
                          )}
                        </h3>
                        <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-2">{notification.message}</p>

                        {/* Display vaccination due specific details */}
                        {notification.source === 'vaccination_due' && notification.vaccinationDueData && (
                          <div className="mt-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg text-xs text-[#4c739a] dark:text-slate-400 space-y-1">
                            <p>
                              <strong>Vaccine:</strong> {notification.vaccinationDueData.vaccineName}
                            </p>
                            <p>
                              <strong>Due Date:</strong> {notification.vaccinationDueData.nextDueDate.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                            <p>
                              <strong>Clinic Location:</strong> {notification.vaccinationDueData.clinicLocation}
                            </p>
                            <p>
                              <strong>Clinic Date:</strong> {notification.vaccinationDueData.clinicDate.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        )}

                        {notification.relatedChildId && !notification.vaccinationDueData && (
                          <p className="text-xs text-[#4c739a] dark:text-slate-400">
                            Child ID: {notification.relatedChildId}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-[#4c739a] dark:text-slate-400">
                        {notification.sentDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      {notification.relatedChildId && (
                        <Link
                          to={`/child-profile-schedule?childId=${notification.relatedChildId}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                        >
                          View Details
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  if (isParent) {
    return <ParentLayout activeNav="notifications">{content}</ParentLayout>;
  }

  if (isPHM) {
    return (
      <PhmLayout activeNav="notifications" showBackToDashboard={true}>
        {content}
      </PhmLayout>
    );
  }

  return <div className="flex min-h-screen bg-background-light dark:bg-background-dark">{content}</div>;
};

