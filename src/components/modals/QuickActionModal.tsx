import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { WorkLogEntry, NotificationItem } from '../../types';
import { Clock, LifeBuoy, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWorklog: (log: WorkLogEntry) => void;
  onAddNotification: (notif: NotificationItem) => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  isOpen,
  onClose,
  onAddWorklog,
  onAddNotification
}) => {
  const [activeTab, setActiveTab] = useState<'worklog' | 'ticket'>('worklog');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Worklog Form State
  const [worklogForm, setWorklogForm] = useState({
    projectTitle: 'بازطراحی داشبورد پورتال الگونت (ALG-427)',
    hours: '7.75',
    date: '۱۴۰۵/۰۸/۰۴',
    description: ''
  });

  // Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    ticketCategory: 'دسترسی شبکه و VPN',
    title: '',
    description: ''
  });

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateWorklog = () => {
    const errs: Record<string, string> = {};
    if (!worklogForm.projectTitle || worklogForm.projectTitle.trim().length < 3) {
      errs.projectTitle = 'لطفاً عنوان را با حداقل ۳ کاراکتر وارد کنید.';
    }
    const h = parseFloat(worklogForm.hours);
    if (isNaN(h) || h < 0.5 || h > 16) {
      errs.hours = 'ساعت کارکرد باید عددی بین ۰.۵ تا ۱۶ ساعت باشد.';
    }
    if (!worklogForm.description || worklogForm.description.trim().length < 5) {
      errs.description = 'لطفاً توضیحات را کامل‌تر وارد کنید (حداقل ۵ کاراکتر).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateTicket = () => {
    const errs: Record<string, string> = {};
    if (!ticketForm.title || ticketForm.title.trim().length < 3) {
      errs.title = 'لطفاً موضوع تیکت را با حداقل ۳ کاراکتر وارد کنید.';
    }
    if (!ticketForm.description || ticketForm.description.trim().length < 5) {
      errs.description = 'لطفاً شرح مشکل را با حداقل ۵ کاراکتر وارد کنید.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleWorklogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateWorklog()) return;

    setLoading(true);
    setTimeout(() => {
      const newLog: WorkLogEntry = {
        id: `wl-${Date.now()}`,
        date: worklogForm.date,
        projectTitle: worklogForm.projectTitle,
        hours: parseFloat(worklogForm.hours),
        status: 'approved',
        description: worklogForm.description
      };
      onAddWorklog(newLog);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      setLoading(false);
      setSuccessMessage('کارکرد با موفقیت ثبت و به تایم‌شیت سازمانی اضافه شد.');
      setTimeout(() => {
        setSuccessMessage(null);
        setWorklogForm({
          projectTitle: 'بازطراحی داشبورد پورتال الگونت (ALG-427)',
          hours: '7.75',
          date: '۱۴۰۵/۰۸/۰۴',
          description: ''
        });
        onClose();
      }, 1200);
    }, 600);
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTicket()) return;

    setLoading(true);
    setTimeout(() => {
      const ticketId = `#DSK-${Math.floor(100 + Math.random() * 900)}`;
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: `تیکت جدید ${ticketId} در میز خدمت ثبت شد`,
        serviceName: 'میز خدمت و پشتیبانی فنی (Desk)',
        timeAgo: 'لحظاتی پیش',
        read: false,
        priority: 'high',
        description: `درخواست «${ticketForm.title}» در دسته «${ticketForm.ticketCategory}» با موفقیت ثبت گردید.`
      };
      onAddNotification(newNotif);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });

      setLoading(false);
      setSuccessMessage(`تیکت شما با کد پیگیری ${ticketId} ثبت گردید.`);
      setTimeout(() => {
        setSuccessMessage(null);
        setTicketForm({
          ticketCategory: 'دسترسی شبکه و VPN',
          title: '',
          description: ''
        });
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="اقدام سریع سازمانی"
      subtitle="ثبت مستقیم کارکرد و ارسال تیکت به سامانه‌های الگونت"
    >
      {/* Seam Tabs Header */}
      <div className="flex items-center gap-2 p-1.5 bg-[#f4f5fa] dark:bg-[#282a42] rounded-xl mb-6 border border-[#e0e2ec] dark:border-[#3d3f59]">
        <button
          type="button"
          onClick={() => { setActiveTab('worklog'); setErrors({}); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'worklog'
              ? 'bg-[#666cff] text-white shadow-sm font-bold'
              : 'text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>ثبت کارکرد / تایم‌شیت</span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab('ticket'); setErrors({}); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === 'ticket'
              ? 'bg-[#666cff] text-white shadow-sm font-bold'
              : 'text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb]'
          }`}
        >
          <LifeBuoy className="w-4 h-4" />
          <span>ثبت تیکت پشتیبانی</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {successMessage && (
        <div className="mb-4 p-4 rounded-xl bg-[#666cff]/15 border border-[#666cff] text-[#666cff] dark:text-[#9095ff] flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-[#666cff] shrink-0" />
          <span className="text-sm font-bold">{successMessage}</span>
        </div>
      )}

      {/* Tab 1: Worklog Form */}
      {activeTab === 'worklog' && (
        <form onSubmit={handleWorklogSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#1e1e2d] dark:text-[#eaeafb] mb-1.5">
              عنوان کار یا پروژه <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={worklogForm.projectTitle}
              onChange={(e) => setWorklogForm({ ...worklogForm, projectTitle: e.target.value })}
              className={`w-full h-12 px-4 rounded-xl border bg-[#f4f5fa] dark:bg-[#282a42] text-[#1e1e2d] dark:text-[#eaeafb] text-sm transition-all focus:outline-none ${
                errors.projectTitle
                  ? 'border-rose-500 ring-2 ring-rose-500/20'
                  : 'border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] focus:ring-2 focus:ring-[#666cff]/20'
              }`}
              placeholder="مثال: بازطراحی داشبورد پورتال الگونت - ALG-427"
            />
            {errors.projectTitle && (
              <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.projectTitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#1e1e2d] dark:text-[#eaeafb] mb-1.5">
                میزان ساعت کارکرد <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.25"
                min="0.5"
                max="16"
                value={worklogForm.hours}
                onChange={(e) => setWorklogForm({ ...worklogForm, hours: e.target.value })}
                className={`w-full h-12 px-4 rounded-xl border bg-[#f4f5fa] dark:bg-[#282a42] text-[#1e1e2d] dark:text-[#eaeafb] text-sm dir-ltr text-right transition-all focus:outline-none ${
                  errors.hours
                    ? 'border-rose-500 ring-2 ring-rose-500/20'
                    : 'border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] focus:ring-2 focus:ring-[#666cff]/20'
                }`}
              />
              {errors.hours && (
                <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.hours}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1e1e2d] dark:text-[#eaeafb] mb-1.5">
                تاریخ ثبت کارکرد
              </label>
              <input
                type="text"
                value={worklogForm.date}
                onChange={(e) => setWorklogForm({ ...worklogForm, date: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border border-[#e0e2ec] dark:border-[#3d3f59] bg-[#f4f5fa] dark:bg-[#282a42] text-[#1e1e2d] dark:text-[#eaeafb] text-sm dir-ltr text-right focus:border-[#666cff] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-medium text-[#1e1e2d] dark:text-[#eaeafb]">
                توضیحات انجام کار <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-[#62657a] dark:text-[#8386a1]">
                حداقل ۵ کاراکتر
              </span>
            </div>
            <textarea
              rows={3}
              value={worklogForm.description}
              onChange={(e) => setWorklogForm({ ...worklogForm, description: e.target.value })}
              className={`w-full p-4 rounded-xl border bg-[#f4f5fa] dark:bg-[#282a42] text-[#1e1e2d] dark:text-[#eaeafb] text-sm resize-none transition-all focus:outline-none ${
                errors.description
                  ? 'border-rose-500 ring-2 ring-rose-500/20'
                  : 'border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] focus:ring-2 focus:ring-[#666cff]/20'
              }`}
              placeholder="شرح جزئیات فنی تسک انجام‌شده و ارتباط آن با اسپرینت جاری..."
            />
            {errors.description && (
              <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
            <button
              type="submit"
              disabled={loading}
              className="px-6 h-12 rounded-xl bg-[#666cff] text-white font-bold text-sm hover:bg-[#5b60e5] active:scale-98 transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(102,108,255,0.35)] disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
              <span>ثبت در تایم‌شیت</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 h-12 rounded-xl border border-[#e0e2ec] dark:border-[#42455f] bg-[#f4f5fa] dark:bg-[#34364d] text-[#62657a] dark:text-[#eaeafb] hover:bg-[#e8e9f2] dark:hover:bg-[#3d3f59] text-sm transition-all cursor-pointer"
            >
              انصراف
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Ticket Form */}
      {activeTab === 'ticket' && (
        <form onSubmit={handleTicketSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#1e1e2d] dark:text-[#eaeafb] mb-1.5">
              دسته‌بندی درخواست پشتیبانی
            </label>
            <select
              value={ticketForm.ticketCategory}
              onChange={(e) => setTicketForm({ ...ticketForm, ticketCategory: e.target.value })}
              className="w-full h-12 px-4 rounded-xl border border-[#e0e2ec] dark:border-[#3d3f59] bg-[#f4f5fa] dark:bg-[#282a42] text-[#1e1e2d] dark:text-[#eaeafb] text-sm focus:border-[#666cff] focus:outline-none"
            >
              <option value="دسترسی شبکه و VPN" className="bg-white dark:bg-[#282a42]">دسترسی شبکه و VPN</option>
              <option value="تجهیزات سخت‌افزاری" className="bg-white dark:bg-[#282a42]">تجهیزات سخت‌افزاری</option>
              <option value="نرم‌افزار و اکانت" className="bg-white dark:bg-[#282a42]">نرم‌افزار و اکانت</option>
              <option value="سایر موارد فنی" className="bg-white dark:bg-[#282a42]">سایر موارد فنی</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#1e1e2d] dark:text-[#eaeafb] mb-1.5">
              موضوع تیکت <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={ticketForm.title}
              onChange={(e) => setTicketForm({ ...ticketForm, title: e.target.value })}
              className={`w-full h-12 px-4 rounded-xl border bg-[#f4f5fa] dark:bg-[#282a42] text-[#1e1e2d] dark:text-[#eaeafb] text-sm transition-all focus:outline-none ${
                errors.title
                  ? 'border-rose-500 ring-2 ring-rose-500/20'
                  : 'border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] focus:ring-2 focus:ring-[#666cff]/20'
              }`}
              placeholder="مثال: تمدید دسترسی گواهی سرور استیجینگ"
            />
            {errors.title && (
              <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-medium text-[#1e1e2d] dark:text-[#eaeafb]">
                شرح مشکل یا درخواست <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] text-[#62657a] dark:text-[#8386a1]">
                حداقل ۵ کاراکتر
              </span>
            </div>
            <textarea
              rows={3}
              value={ticketForm.description}
              onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
              className={`w-full p-4 rounded-xl border bg-[#f4f5fa] dark:bg-[#282a42] text-[#1e1e2d] dark:text-[#eaeafb] text-sm resize-none transition-all focus:outline-none ${
                errors.description
                  ? 'border-rose-500 ring-2 ring-rose-500/20'
                  : 'border-[#e0e2ec] dark:border-[#3d3f59] focus:border-[#666cff] focus:ring-2 focus:ring-[#666cff]/20'
              }`}
              placeholder="شرح دقیق مسئله، خطاهای مشاهده‌شده، شماره IP یا سامانه مورد نظر..."
            />
            {errors.description && (
              <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
            <button
              type="submit"
              disabled={loading}
              className="px-6 h-12 rounded-xl bg-[#666cff] text-white font-bold text-sm hover:bg-[#5b60e5] active:scale-98 transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(102,108,255,0.35)] disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LifeBuoy className="w-4 h-4" />}
              <span>ارسال تیکت به پشتیبانی</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 h-12 rounded-xl border border-[#e0e2ec] dark:border-[#42455f] bg-[#f4f5fa] dark:bg-[#34364d] text-[#62657a] dark:text-[#eaeafb] hover:bg-[#e8e9f2] dark:hover:bg-[#3d3f59] text-sm transition-all cursor-pointer"
            >
              انصراف
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
