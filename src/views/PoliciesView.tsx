import React from 'react';
import { PolicyItem } from '../types';
import { ShieldCheck, CheckCircle2, FileSignature, AlertCircle, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PoliciesViewProps {
  policies: PolicyItem[];
  onAcknowledgePolicy: (id: string) => void;
}

export const PoliciesView: React.FC<PoliciesViewProps> = ({
  policies,
  onAcknowledgePolicy
}) => {
  const handleSign = (id: string) => {
    onAcknowledgePolicy(id);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const pendingCount = policies.filter((p) => !p.acknowledged).length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="rounded-[24px] bg-[#30334e] border border-[#3d3f59] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.35)]">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-[100px] font-['Vazirmatn'] font-bold ${
                pendingCount === 0
                  ? 'bg-[#28c76f]/15 border border-[#28c76f]/30 text-[#28c76f]'
                  : 'bg-[#666cff] text-[#282a42]'
              }`}
            >
              {pendingCount === 0 ? 'کلیه اسناد تایید شده' : `${pendingCount} آیین‌نامه در انتظار امضا`}
            </span>
            <span className="text-xs text-[#8386a1] font-['Vazirmatn']">آیین‌نامه‌های رسمی حقوقی، امنیتی و فنی</span>
          </div>
          <h2 className="font-['Vazirmatn'] font-bold text-xl text-[#eaeafb] mt-2">
            قوانین، خط‌مشی‌ها و استانداردهای سازمانی الگونت
          </h2>
          <p className="font-['Vazirmatn'] text-xs text-[#8386a1] mt-1">
            الزام مطالعه و ثبت امضای دیجیتال برای دسترسی‌های حساس کلاستر و ریپازیتوری‌ها
          </p>
        </div>
      </div>

      {/* Policies List */}
      <div className="space-y-4">
        {policies.map((pol) => (
          <div
            key={pol.id}
            className={`p-6 rounded-[24px] border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
              pol.acknowledged
                ? 'bg-[#30334e]/60 border-[#3d3f59] opacity-80'
                : 'bg-[#30334e] border-[#3d3f59] hover:border-[#42455f] shadow-[0px_8px_24px_-4px_rgba(0,0,0,0.3)]'
            }`}
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-[100px] bg-[#34364d] border border-[#42455f] text-[#8386a1] font-mono">
                  {pol.code}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-[100px] bg-[#34364d] border border-[#3d3f59] text-[#666cff] font-['Vazirmatn']">
                  {pol.category}
                </span>
                <span className="text-xs text-[#585b74] font-['Vazirmatn']">
                  تاریخ به‌روزرسانی: {pol.updatedAt}
                </span>
              </div>

              <h3 className="font-['Vazirmatn'] font-bold text-base text-[#eaeafb]">
                {pol.title}
              </h3>
              <p className="font-['Vazirmatn'] text-xs text-[#8386a1] leading-relaxed max-w-3xl">
                {pol.summary}
              </p>
            </div>

            <div className="flex-shrink-0 flex items-center justify-end">
              {pol.acknowledged ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-[100px] bg-[#28c76f]/10 border border-[#28c76f]/20 text-[#28c76f] text-xs font-['Vazirmatn'] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تایید و امضا شده</span>
                </div>
              ) : (
                <button
                  onClick={() => handleSign(pol.id)}
                  className="px-5 py-2.5 rounded-[100px] bg-[#666cff] hover:bg-[#7c82ff] text-[#282a42] font-['Vazirmatn'] font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileSignature className="w-4 h-4" />
                  <span>مطالعه کردم و می‌پذیرم</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
