import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Notification, NotificationType } from '../types/models';
import { dataService } from '../services/DataService';
import { AuthService } from '../services/AuthService';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      const userNotifications = dataService.getNotificationsByRecipient(currentUser.userId);
      setNotifications(userNotifications);
    }
  }, []);

  const markAsRead = (notificationId: string) => {
    dataService.markNotificationAsRead(notificationId);
    setNotifications(notifications.map(n => 
      n.notificationId === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      dataService.markAllNotificationsAsRead(currentUser.userId);
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.UPCOMING:
      case NotificationType.VACCINATION_DUE:
        return 'event_upcoming';
      case NotificationType.MISSED:
        return 'warning';
      case NotificationType.REMINDER:
        return 'notifications_active';
      case NotificationType.GROWTH_RECORD:
        return 'monitoring';
      default:
        return 'info';
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case NotificationType.UPCOMING:
      case NotificationType.VACCINATION_DUE:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case NotificationType.MISSED:
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case NotificationType.REMINDER:
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case NotificationType.GROWTH_RECORD:
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800';
    }
  };

  const getNotificationTitle = (type: NotificationType): string => {
    switch (type) {
      case NotificationType.UPCOMING:
        return 'Upcoming Vaccination';
      case NotificationType.MISSED:
        return 'Missed Vaccination';
      case NotificationType.REMINDER:
        return 'Vaccination Reminder';
      case NotificationType.VACCINATION_DUE:
        return 'Vaccination Due';
      case NotificationType.GROWTH_RECORD:
        return 'Growth Record Update';
      default:
        return 'Notification';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400 hover:text-primary transition-colors mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-[#0d141b] dark:text-white mb-1">Notifications</h1>
              <p className="text-xs font-medium text-[#4c739a] dark:text-slate-400 mb-1">
                SuwaCare LK alerts for vaccinations, growth updates, and reminders.
              </p>
              <p className="text-[#4c739a] dark:text-slate-400">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#cfdbe7] dark:border-slate-700 text-[#4c739a] dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">done_all</span>
                Mark all as read
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white dark:bg-[#1a2632] rounded-2xl border border-[#e7edf3] dark:border-slate-700 p-12 text-center">
              <span className="material-symbols-outlined text-6xl text-[#4c739a] dark:text-slate-400 mb-4">notifications_off</span>
              <p className="text-lg font-medium text-[#0d141b] dark:text-white mb-2">No notifications</p>
              <p className="text-sm text-[#4c739a] dark:text-slate-400">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.notificationId}
                className={`bg-white dark:bg-[#1a2632] rounded-xl border ${getNotificationColor(notification.type)} p-6 cursor-pointer transition-all hover:shadow-md ${
                  !notification.isRead ? 'ring-2 ring-primary/20' : ''
                }`}
                onClick={() => {
                  markAsRead(notification.notificationId);
                  if (notification.relatedChildId) {
                    navigate(`/child-profile-schedule?childId=${notification.relatedChildId}`);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    notification.type === NotificationType.UPCOMING || notification.type === NotificationType.VACCINATION_DUE ? 'bg-blue-100 dark:bg-blue-900/30' :
                    notification.type === NotificationType.MISSED ? 'bg-red-100 dark:bg-red-900/30' :
                    notification.type === NotificationType.REMINDER ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    notification.type === NotificationType.GROWTH_RECORD ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-slate-100 dark:bg-slate-800'
                  }`}>
                    <span className={`material-symbols-outlined text-xl ${
                      notification.type === NotificationType.UPCOMING || notification.type === NotificationType.VACCINATION_DUE ? 'text-blue-600 dark:text-blue-400' :
                      notification.type === NotificationType.MISSED ? 'text-red-600 dark:text-red-400' :
                      notification.type === NotificationType.REMINDER ? 'text-yellow-600 dark:text-yellow-400' :
                      notification.type === NotificationType.GROWTH_RECORD ? 'text-green-600 dark:text-green-400' :
                      'text-slate-600 dark:text-slate-400'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-base font-bold text-[#0d141b] dark:text-white mb-1">
                          {getNotificationTitle(notification.type)}
                          {!notification.isRead && (
                            <span className="ml-2 w-2 h-2 bg-primary rounded-full inline-block"></span>
                          )}
                        </h3>
                        <p className="text-sm text-[#4c739a] dark:text-slate-400 mb-2">
                          {notification.message}
                        </p>
                        {notification.relatedChildId && (
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
                          day: 'numeric'
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
};
