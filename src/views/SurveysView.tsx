import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { SurveyItem } from '../types';
import { toPersianDigits } from '../utils/formatters';
import { ClipboardList, CheckCircle2, Clock, ChevronLeft, Sparkles, X, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurveysViewProps {
  surveys: SurveyItem[];
  onCompleteSurvey: (id: string) => void;
}

export const SurveysView: React.FC<SurveysViewProps> = ({
  surveys,
  onCompleteSurvey
}) => {
  const [activeSurvey, setActiveSurvey] = useState<SurveyItem | null>(null);
  const [surveyRating, setSurveyRating] = useState<number>(5);
  const [feedback, setFeedback] = useState<string>('');

  const handleStartSurvey = (srv: SurveyItem) => {
    setActiveSurvey(srv);
    setSurveyRating(5);
    setFeedback('');
  };

  const handleSubmitSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSurvey) return;

    onCompleteSurvey(activeSurvey.id);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    setActiveSurvey(null);
  };

  const pendingCount = surveys.filter((s) => !s.completed).length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.35)]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[100px] bg-[#666cff]/15 border border-[#666cff]/30 text-[#666cff] text-xs font-['Vazirmatn'] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>صدای همکاران و سنجش کیفیت فرآیندها</span>
          </div>
          <h2 className="font-['Vazirmatn'] font-bold text-xl text-[#eaeafb] mt-2">
            پرسشنامه‌ها و نظرسنجی‌های سازمانی
          </h2>
          <p className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-1">
            مشارکت در ارتقای کیفیت محیط کار، رفاه پرسنل و ابزارهای توسعه الگونت
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs px-3 py-1 rounded-[100px] bg-[#34364d] border border-[#3d3f59] text-[#8386a1] font-['Vazirmatn']">
            {pendingCount === 0
              ? 'تمامی پرسشنامه‌ها تکمیل شده‌اند'
              : `${toPersianDigits(pendingCount)} پرسشنامه نیازمند تکمیل`}
          </span>
        </div>
      </div>

      {/* Surveys List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {surveys.map((survey) => {
          const isDone = survey.completed;

          return (
            <div
              key={survey.id}
              className={`p-6 rounded-[24px] border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                isDone
                  ? 'bg-[#30334e]/60 border-[#3d3f59] opacity-75'
                  : 'bg-[#30334e] border-[#3d3f59] hover:border-[#42455f] shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.3)]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-[100px] bg-[#34364d] border border-[#42455f] text-[#8386a1] font-['Vazirmatn']">
                    {survey.department}
                  </span>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-xs text-[#28c76f] font-['Vazirmatn'] font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      تکمیل شده
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-[#ff9f43] font-['Vazirmatn']">
                      <Clock className="w-3.5 h-3.5" />
                      در انتظار تکمیل
                    </span>
                  )}
                </div>

                <h3 className="font-['Vazirmatn'] font-bold text-base text-[#eaeafb]">
                  {survey.title}
                </h3>
                <p className="font-['Vazirmatn'] text-xs text-[#8386a1] leading-relaxed">
                  تعداد سوالات: {toPersianDigits(survey.questionsCount)} سوال · زمان تقریبی: {toPersianDigits(survey.estimatedMinutes)} دقیقه
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#3d3f59]">
                <span className="text-[11px] text-[#585b74] font-['Vazirmatn']">
                  مهلت: {survey.deadline}
                </span>

                {!isDone ? (
                  <button
                    onClick={() => handleStartSurvey(survey)}
                    className="px-4 py-2 rounded-[100px] bg-[#666cff] hover:bg-[#7c82ff] text-[#282a42] font-['Vazirmatn'] font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-md"
                  >
                    <span>پاسخ به سوالات</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs text-[#585b74] font-['Vazirmatn']">ثبت شده در سامانه</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Survey Answer Modal */}
      {activeSurvey && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg rounded-[32px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 shadow-[0_20px_60px_-15px_rgba(50,50,93,0.15)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] relative text-right font-['Vazirmatn'] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
              <h3 className="font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb]">
                {activeSurvey.title}
              </h3>
              <button
                onClick={() => setActiveSurvey(null)}
                className="size-9 rounded-full bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-[#eaeafb] hover:bg-[#eceef7] dark:hover:bg-[#383b59] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitSurvey} className="pt-4 space-y-5">
              <div>
                <label className="block text-xs font-medium text-[#62657a] dark:text-[#8386a1] mb-2">
                  میزان رضایت کلی شما از فرآیند (از ۱ تا ۵):
                </label>
                <div className="flex items-center justify-center gap-3 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setSurveyRating(star)}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`size-7 ${
                          star <= surveyRating
                            ? 'text-[#ff9f43] fill-[#ff9f43]'
                            : 'text-[#d0d2e0] dark:text-[#42455f]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#62657a] dark:text-[#8386a1] mb-2">
                  پیشنهادات یا توضیحات تکمیلی:
                </label>
                <textarea
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="نقطه نظرات ارزشمند خود را بنویسید..."
                  className="w-full p-3 rounded-[16px] bg-[#f4f5fa] dark:bg-[#282a42] border border-[#e0e2ec] dark:border-[#3d3f59] focus:border-2 focus:border-[#666cff] text-xs text-[#1e1e2d] dark:text-[#eaeafb] placeholder:text-[#a0a2b1] dark:placeholder-[#585b74] outline-none transition-all resize-none font-['Vazirmatn']"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#e0e2ec] dark:border-[#3d3f59]">
                <button
                  type="button"
                  onClick={() => setActiveSurvey(null)}
                  className="px-5 py-2 rounded-[100px] bg-[#f4f5fa] dark:bg-[#34364d] hover:bg-[#eceef7] dark:hover:bg-[#383b59] border border-[#e0e2ec] dark:border-[#42455f] text-xs text-[#62657a] dark:text-[#eaeafb] cursor-pointer transition-colors font-medium"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-[100px] bg-[#666cff] hover:bg-[#575ce6] text-white font-medium text-xs cursor-pointer shadow-md transition-colors"
                >
                  ثبت نظر و امتیاز
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
