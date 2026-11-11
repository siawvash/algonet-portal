import React, { useState } from 'react';
import { NotificationItem } from '../types';
import { Bell, CheckCheck, Clock, Check, AlertCircle, Sparkles } from 'lucide-react';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onToggleRead: (id: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllAsRead,
  onToggleRead
}) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Card */}
      <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.35)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-[100px] bg-[#666cff] text-[#282a42] font-['Vazirmatn'] font-bold">
              {unreadCount} اعلان جدید
            </span>
            <span className="text-xs text-[#8386a1] font-['Vazirmatn']">تجمیع هشدارهای زنده سامانه‌ها</span>
          </div>
          <h2 className="font-['Vazirmatn'] font-bold text-xl text-[#eaeafb] mt-2">
            مرکز اعلانات و پیام‌های سازمانی
          </h2>
          <p className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-1">
            هشدارهای امنیتی، بازبینی‌های GitLab، رویدادهای تایم‌شیت و تیکت‌های میز خدمت
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="h-10 px-5 rounded-[100px] border border-[#42455f] bg-[#34364d] hover:bg-[#20212b] text-xs text-[#eaeafb] font-['Vazirmatn'] font-medium flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-[#28c76f]" />
            <span>علامت‌گذاری همه به عنوان خوانده‌شده</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 font-['Vazirmatn']">
        <button
          onClick={() => setFilter('all')}
          className={`py-1.5 px-4 rounded-[100px] text-xs font-medium transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-[#666cff] text-[#282a42] font-bold shadow-sm'
              : 'bg-[#34364d] border border-[#3d3f59] text-[#8386a1] hover:text-[#eaeafb]'
          }`}
        >
          همه اعلانات ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`py-1.5 px-4 rounded-[100px] text-xs font-medium transition-all cursor-pointer ${
            filter === 'unread'
              ? 'bg-[#666cff] text-[#282a42] font-bold shadow-sm'
              : 'bg-[#34364d] border border-[#3d3f59] text-[#8386a1] hover:text-[#eaeafb]'
          }`}
        >
          خوانده‌نشده ({unreadCount})
        </button>
      </div>

      {/* Notification Rows */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] p-12 text-center text-sm font-['Vazirmatn'] text-[#8386a1]">
            هیچ اعلانی در این بخش وجود ندارد.
          </div>
        ) : (
          filteredNotifs.map((n) => {
            const isHigh = n.priority === 'high';

            return (
              <div
                key={n.id}
                onClick={() => onToggleRead(n.id)}
                className={`p-5 rounded-[20px] border transition-all duration-200 cursor-pointer ${
                  !n.read
                    ? 'bg-[#34364d] border-[#666cff]/40 shadow-[0_4px_20px_-2px_rgba(183,154,255,0.06)]'
                    : 'bg-[#30334e] border-[#3d3f59] opacity-80 hover:opacity-100 hover:border-[#3a3b45]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {/* Unread indicator dot */}
                    {!n.read ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#666cff] mt-1.5 flex-shrink-0 animate-pulse shadow-[0_0_8px_rgba(183,154,255,0.6)]" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3d3f59] mt-1.5 flex-shrink-0" />
                    )}

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4
                          className={`text-sm font-['Vazirmatn'] ${
                            !n.read ? 'font-bold text-[#eaeafb]' : 'font-medium text-[#8386a1]'
                          }`}
                        >
                          {n.title}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-[100px] bg-[#34364d] border border-[#42455f] text-[#8386a1] font-mono">
                          {n.serviceName}
                        </span>
                        {isHigh && (
                          <span className="text-[10px] px-2.5 py-0.5 rounded-[100px] bg-[#ef4444]/15 border border-[#ef4444]/30 text-[#ea5455] font-['Vazirmatn'] font-bold">
                            اولویت بالا
                          </span>
                        )}
                      </div>

                      <p className="font-['Vazirmatn'] text-xs text-[#8386a1] leading-relaxed">
                        {n.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[11px] text-[#8386a1] font-mono dir-ltr flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {n.timeAgo}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleRead(n.id);
                      }}
                      className="w-7 h-7 rounded-full border border-[#3d3f59] bg-[#34364d] hover:bg-[#20212b] flex items-center justify-center text-[#8386a1] hover:text-[#eaeafb] transition-colors cursor-pointer"
                      title={n.read ? 'علامت‌گذاری به عنوان خوانده‌نشده' : 'علامت‌گذاری به عنوان خوانده‌شده'}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
