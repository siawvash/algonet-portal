import React, { useState } from 'react';
import {
  Layers,
  Code2,
  Palette,
  Type,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Download,
  Terminal,
  Maximize2,
  Box,
  Compass,
  ArrowRight,
  ChevronLeft,
  FileSpreadsheet,
  ArrowUpRight,
  Video,
  Users,
  Clock,
  Star,
  CornerDownLeft,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Monitor
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface HandoffViewProps {
  onNavigate: (viewId: any) => void;
}

type HandoffTab = 'components' | 'tokens' | 'typography' | 'motion' | 'guidelines';

export const HandoffView: React.FC<HandoffViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<HandoffTab>('components');
  const [selectedComponent, setSelectedComponent] = useState<string>('project-card');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [codeLanguage, setCodeLanguage] = useState<'tsx' | 'tailwind' | 'css'>('tsx');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2000);
  };

  const downloadTokensJson = () => {
    const tokens = {
      name: 'Algonet Portal Design Tokens',
      version: '3.0.0',
      lastUpdated: '1405-08-27',
      colors: {
        brand: {
          primary: '#666cff',
          primaryHover: '#5b60e6',
          primaryActive: '#555ae6',
          tintLight: '#f0eaff',
          tintDark: '#282a3f'
        },
        surfaces: {
          dark: {
            background: '#1e1e2d',
            surface: '#30334e',
            card: '#34364d',
            border: '#3d3f59',
            textHigh: '#eaeafb',
            textMuted: '#8386a1'
          },
          light: {
            background: '#f8f9fd',
            surface: '#ffffff',
            card: '#ffffff',
            border: '#e0e2ec',
            textHigh: '#19191f',
            textMuted: '#62657a'
          }
        },
        semantic: {
          success: '#28c76f',
          warning: '#ff9f43',
          danger: '#ea5455',
          info: '#00bad1',
          star: '#ffb800'
        }
      },
      radii: {
        pill: '100px',
        cardLarge: '28px',
        cardMedium: '20px',
        badge: '14px',
        input: '12px',
        tag: '8px'
      },
      typography: {
        fonts: {
          primary: 'DiodrumArabic',
          secondary: 'Vazirmatn',
          mono: 'monospace'
        }
      }
    };

    const blob = new Blob([JSON.stringify(tokens, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'algonet-design-tokens.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12 select-text" dir="rtl">
      {/* 
        ========================================================
        1. FIGMA DEV MODE HEADER BAR (برگرفته از رابط فیگما Dev Mode)
        ======================================================== */}
      <div className="rounded-[28px] bg-[#1e1e2d] text-white p-5 sm:p-7 border border-[#3d3f59] shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-32 bg-[#666cff]/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-80 h-28 bg-[#00bad1]/15 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Right Section: Figma Branding + Document Meta */}
          <div className="flex items-start sm:items-center gap-4">
            {/* Official Figma 5-Color Vector Logo */}
            <div className="size-13 rounded-2xl bg-[#11111a] border border-white/10 flex items-center justify-center shrink-0 shadow-lg p-2.5">
              <svg
                className="size-full"
                viewBox="0 0 38 57"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
                  fill="#1ABCFE"
                />
                <path
                  d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
                  fill="#0ACF83"
                />
                <path
                  d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
                  fill="#FF7262"
                />
                <path
                  d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
                  fill="#F24E1E"
                />
                <path
                  d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
                  fill="#A259FF"
                />
              </svg>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl text-white">
                  فایل هندآف دیزاین سیستم پورتال الگونت
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#34d399] text-xs font-mono font-bold">
                  <span className="size-2 rounded-full bg-[#10b981] animate-pulse" />
                  Ready for Dev
                </span>
                <span className="text-xs font-mono text-white/50 bg-white/10 px-2 py-0.5 rounded-md">
                  v3.0.0 · Handoff
                </span>
              </div>
              <p className="text-xs sm:text-sm font-['Vazirmatn'] text-[#8386a1] leading-relaxed">
                مستندات و اسپک‌های دقیق فیگما برای تیم فرانت‌اند · شامل توکن‌های CSS، مشخصات باکس‌مدل، کدهای React و رفتار تعاملی
              </p>
            </div>
          </div>

          {/* Left Section: Action Buttons */}
          <div className="flex items-center gap-2.5 self-end lg:self-center flex-wrap">
            <button
              onClick={downloadTokensJson}
              className="flex items-center gap-2 bg-[#2c2d3c] hover:bg-[#34364d] text-white border border-[#42455f] rounded-full px-4 py-2 text-xs font-['Vazirmatn'] font-semibold transition-all cursor-pointer hover:border-[#666cff]"
            >
              <Download className="size-3.5 text-[#666cff]" />
              <span>دانلود Tokens JSON</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 bg-[#666cff] hover:bg-[#5b60e6] text-white rounded-full px-5 py-2 text-xs font-['Vazirmatn'] font-bold transition-all shadow-[0_4px_16px_rgba(102,108,255,0.4)] cursor-pointer active:scale-95"
            >
              <span>بازگشت به پورتال</span>
              <ArrowRight className="size-3.5 rotate-180" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar inside Figma Header */}
        <div className="mt-6 pt-4 border-t border-[#3d3f59]/80 flex items-center gap-2 overflow-x-auto scrollbar-none font-['Vazirmatn']">
          {[
            { id: 'components', label: 'مشخصات کامپوننت‌ها (Component Specs)', icon: Box },
            { id: 'tokens', label: 'توکن‌ها و رنگ‌ها (Design Tokens)', icon: Palette },
            { id: 'typography', label: 'تایپوگرافی و فاصله‌ها (Typography & Spacing)', icon: Type },
            { id: 'motion', label: 'موشن و انیمیشن‌ها (Motion Specs)', icon: Sparkles },
            { id: 'guidelines', label: 'چک‌لیست و راهنمای فرانت‌اند (Guidelines)', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as HandoffTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#666cff] text-white shadow-md'
                    : 'text-[#8386a1] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        ========================================================
        TAB 1: COMPONENT SPECS & FIGMA CODE CONNECT
        ======================================================== */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          {/* Component Selection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {[
              { id: 'project-card', label: 'کارت پروژه‌های من (Project Card)' },
              { id: 'service-card', label: 'کارت سرویس سامانه (Service Card)' },
              { id: 'calendar-meeting-card', label: 'کارت جلسه تقویم (Day Meeting Card)' },
              { id: 'primary-button', label: 'دکمه‌های اصلی بنفش (Pill Button)' },
              { id: 'search-modal-row', label: 'سطر جستجوی سریع (Spotlight Row)' }
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedComponent(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-['Vazirmatn'] font-semibold transition-all cursor-pointer border ${
                  selectedComponent === c.id
                    ? 'bg-[#666cff] text-white border-[#666cff] shadow-md'
                    : 'bg-white dark:bg-[#30334e] text-[#62657a] dark:text-[#8386a1] border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff]/50'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Component Inspector View (Figma Dev Mode Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Live Interactive Figma Canvas Preview (7 cols) */}
            <div className="lg:col-span-7 rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#e0e2ec] dark:border-[#3d3f59]">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-[#ff5f56]" />
                  <span className="size-3 rounded-full bg-[#ffbd2e]" />
                  <span className="size-3 rounded-full bg-[#27c93f]" />
                  <span className="font-mono text-xs text-[#8386a1] mr-2">
                    Figma Canvas Preview
                  </span>
                </div>
                <span className="text-[11px] font-['Vazirmatn'] text-[#666cff] bg-[#666cff]/10 dark:bg-[#666cff]/20 px-2.5 py-0.5 rounded-full font-semibold">
                  روی کامپوننت هاور کنید تا رفتار زنده را ببینید
                </span>
              </div>

              {/* Interactive Preview Canvas */}
              <div className="py-8 flex items-center justify-center bg-[#f8f9fd] dark:bg-[#25263a] rounded-2xl my-4 border border-dashed border-[#cacede] dark:border-[#42455f] min-h-[380px] p-4">
                {selectedComponent === 'project-card' && (
                  <div className="w-full max-w-sm rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 shadow-md group hover:border-[#666cff]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative select-none">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="size-13 rounded-2xl bg-gradient-to-br from-[#00bad1] to-[#666cff] p-0.5 shadow-md flex items-center justify-center">
                        <div className="size-full rounded-[14px] bg-black/20 flex items-center justify-center text-white font-bold">
                          APP
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-['Vazirmatn'] font-semibold bg-[#28c76f]/15 text-[#28c76f] border border-[#28c76f]/30">
                        در حال توسعه
                      </span>
                    </div>

                    <div className="space-y-1 mb-4 text-right">
                      <h3 className="font-['Vazirmatn'] font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb] group-hover:text-[#666cff] transition-colors">
                        Annotopia Dev
                      </h3>
                      <p className="text-xs font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] line-clamp-2">
                        پلتفرم پردازش و یادداشت‌گذاری هوشمند داده‌ها برای آموزش مدل‌های زبانی
                      </p>
                    </div>

                    <div className="space-y-2 py-3 border-y border-[#e0e2ec] dark:border-[#3d3f59]/80 text-xs font-['Vazirmatn']">
                      <div className="flex items-center justify-between text-[#62657a] dark:text-[#8386a1]">
                        <span>مسئول اصلی:</span>
                        <span className="font-bold text-[#1e1e2d] dark:text-[#eaeafb]">کاوه شریفی</span>
                      </div>
                      <div className="flex items-center justify-between text-[#62657a] dark:text-[#8386a1]">
                        <span>پیشرفت اسپریت:</span>
                        <span className="font-mono font-bold text-[#28c76f]">۶۸٪</span>
                      </div>
                      <div className="w-full bg-[#f4f5fa] dark:bg-[#34364d] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#28c76f] h-full rounded-full w-[68%]" />
                      </div>
                    </div>

                    {/* Bottom Action Button with Perfect Hover Reveal */}
                    <div className="pt-3">
                      <button className="project-card-btn w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#f4f5fa] dark:bg-[#34364d] text-[#121217] dark:text-[#eaeafb] border border-[#e0e2ec] dark:border-[#42455f] group-hover:bg-[#666cff] group-hover:border-[#666cff] group-hover:!text-white text-xs font-['Vazirmatn'] font-bold transition-all duration-200 cursor-pointer">
                        <FileSpreadsheet className="size-4" />
                        <span>کارنامه پروژه</span>
                        <ArrowUpRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}

                {selectedComponent === 'service-card' && (
                  <div className="w-full max-w-sm rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-5 shadow-sm hover:border-[#666cff] hover:shadow-lg transition-all group cursor-pointer text-right">
                    <div className="flex items-center justify-between mb-3">
                      <div className="size-11 rounded-2xl bg-[#f0eaff] dark:bg-[#34364d] flex items-center justify-center text-[#666cff]">
                        <Layers className="size-6" />
                      </div>
                      <span className="text-[11px] font-['Vazirmatn'] font-semibold px-2.5 py-0.5 rounded-full bg-[#666cff]/10 text-[#666cff]">
                        عمومی
                      </span>
                    </div>
                    <h4 className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb] group-hover:text-[#666cff] transition-colors">
                      Nextcloud
                    </h4>
                    <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] mt-1">
                      اشتراک‌گذاری امن فایل‌ها، مستندات و دایرکتوری شرکتی
                    </p>
                  </div>
                )}

                {selectedComponent === 'calendar-meeting-card' && (
                  <div
                    style={{ '--meet-color': '#3b82f6' } as React.CSSProperties}
                    className="meeting-day-card w-full max-w-md rounded-[20px] bg-white dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#3d3f59] p-4.5 cursor-pointer space-y-3 text-right"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-[100px] text-[11px] font-bold border bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]">
                        جلسه: تست استندآپ
                      </span>
                      <span className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] dir-ltr flex items-center gap-1.5 font-medium">
                        <Clock className="size-3.5" />
                        ۱۰:۰۰ – ۱۰:۳۰
                      </span>
                    </div>
                    <h4 className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb]">
                      جلسه استندآپ روزانه تیم پلتفرم
                    </h4>
                    <div className="flex items-center justify-between text-xs text-[#62657a] dark:text-[#8386a1] pt-2 border-t border-[#e0e2ec] dark:border-[#3d3f59]/60">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[#1e1e2d] dark:text-[#eaeafb]">
                          <Video className="size-3.5 text-[#666cff]" />
                          Meet #1
                        </span>
                        <span>۶ نفر</span>
                      </div>
                      <span className="px-4 py-1.5 rounded-[100px] bg-[#666cff] text-white text-xs font-semibold">
                        ورود به Meet
                      </span>
                    </div>
                  </div>
                )}

                {selectedComponent === 'primary-button' && (
                  <div className="flex flex-col items-center gap-4">
                    <button className="flex items-center gap-2 bg-[#666cff] hover:bg-[#5b60e6] active:bg-[#555ae6] text-white rounded-[100px] h-[42px] px-8 text-xs font-['Vazirmatn'] font-bold transition-all shadow-[0_4px_16px_rgba(102,108,255,0.35)] cursor-pointer">
                      <span>دکمه اکشن اصلی (+ ایجاد جلسه)</span>
                    </button>
                    <span className="text-[11px] font-mono text-[#8386a1]">
                      Height: 42px | Radius: 100px | Text: #ffffff !important
                    </span>
                  </div>
                )}

                {selectedComponent === 'search-modal-row' && (
                  <div className="w-full max-w-md flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#666cff]/10 dark:bg-[#666cff]/20 text-[#666cff] dark:text-white cursor-pointer select-none">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-xl bg-[#f0f1f7] dark:bg-[#25263a] flex items-center justify-center shrink-0 border border-[#e0e2ec]/60 dark:border-[#3d3f59]/60">
                        <Layers className="size-5" />
                      </div>
                      <div className="text-right">
                        <span className="font-['Vazirmatn'] font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb] ml-2">
                          Airflow
                        </span>
                        <span className="text-xs text-[#8386a1]">
                          ارکستراسیون ایرفلو
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#8386a1]">Data & ML</span>
                      <kbd className="px-2 py-0.5 rounded-md bg-[#666cff] text-white text-[10px] font-mono font-medium">
                        Enter ↵
                      </kbd>
                    </div>
                  </div>
                )}
              </div>

              {/* Dimensions Box Model Callouts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-['Vazirmatn']">
                <div className="p-2.5 rounded-xl bg-[#f4f5fa] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59]">
                  <span className="text-[10px] text-[#8386a1] block">Border Radius</span>
                  <span className="text-xs font-mono font-bold text-[#666cff]">
                    {selectedComponent === 'primary-button' ? '100px (Pill)' : '28px'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f4f5fa] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59]">
                  <span className="text-[10px] text-[#8386a1] block">Padding</span>
                  <span className="text-xs font-mono font-bold text-[#666cff]">
                    {selectedComponent === 'primary-button' ? 'px-8 py-2.5' : 'p-6 (24px)'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f4f5fa] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59]">
                  <span className="text-[10px] text-[#8386a1] block">Primary Accent</span>
                  <span className="text-xs font-mono font-bold text-[#666cff]">#666cff</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f4f5fa] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59]">
                  <span className="text-[10px] text-[#8386a1] block">Easing</span>
                  <span className="text-xs font-mono font-bold text-[#28c76f]">spring (0.16, 1, 0.3, 1)</span>
                </div>
              </div>
            </div>

            {/* Code Connect Panel (5 cols) */}
            <div className="lg:col-span-5 rounded-[28px] bg-[#1a1b26] text-white p-6 border border-[#2f314c] flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#2f314c]">
                  <div className="flex items-center gap-2">
                    <Code2 className="size-4 text-[#666cff]" />
                    <span className="font-mono text-xs font-bold text-white">
                      Figma Code Connect
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-[#11121c] p-0.5 rounded-lg border border-white/5 font-mono text-[11px]">
                    {(['tsx', 'tailwind', 'css'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setCodeLanguage(lang)}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          codeLanguage === lang
                            ? 'bg-[#666cff] text-white font-bold'
                            : 'text-[#8386a1] hover:text-white'
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Code Snippet Box */}
                <div className="mt-4 relative group/code">
                  <button
                    onClick={() => {
                      const snippet =
                        codeLanguage === 'tsx'
                          ? `// Algonet Portal - Component Spec\nexport const ProjectCard: React.FC<ProjectProps> = ({\n  project,\n  onScorecard\n}) => {\n  return (\n    <div className="rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 group hover:border-[#666cff] hover:shadow-xl transition-all duration-300">\n      {/* Emblem & Status */}\n      <h3 className="font-['Vazirmatn'] font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb]">\n        {project.name}\n      </h3>\n      <button className="project-card-btn w-full mt-4 py-2.5 px-4 rounded-xl bg-[#f4f5fa] dark:bg-[#34364d] text-[#121217] dark:text-[#eaeafb] group-hover:bg-[#666cff] group-hover:!text-white font-bold transition-all">\n        کارنامه پروژه ↗\n      </button>\n    </div>\n  );\n};`
                          : codeLanguage === 'tailwind'
                          ? `rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 shadow-sm hover:border-[#666cff]/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-['Vazirmatn']`
                          : `.project-card {\n  border-radius: 28px;\n  background: var(--surface);\n  border: 1px solid var(--border);\n  padding: 24px;\n  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);\n}\n.project-card:hover {\n  border-color: #666cff;\n  box-shadow: 0 12px 32px rgba(102, 108, 255, 0.15);\n  transform: translateY(-4px);\n}`;
                      copyToClipboard(snippet, 'code-box');
                    }}
                    className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-[#666cff] text-white text-xs font-mono transition-colors cursor-pointer"
                  >
                    {copiedKey === 'code-box' ? (
                      <>
                        <Check className="size-3 text-[#10b981]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <pre className="p-4 rounded-xl bg-[#11121c] text-[#a5b4fc] text-xs font-mono overflow-x-auto max-h-[340px] leading-relaxed dir-ltr text-left border border-white/5">
                    {codeLanguage === 'tsx' && (
                      <code>{`// Algonet Portal - Component Spec
export const ProjectCard: React.FC<ProjectProps> = ({
  project,
  onScorecard
}) => {
  return (
    <div className="rounded-[28px] bg-white dark:bg-[#30334e]
      border border-[#e0e2ec] dark:border-[#3d3f59] p-6
      group hover:border-[#666cff] hover:shadow-xl transition-all">
      {/* Emblem & Status */}
      <h3 className="font-['Vazirmatn'] font-bold text-lg
        text-[#1e1e2d] dark:text-[#eaeafb]">
        {project.name}
      </h3>
      <button className="project-card-btn w-full mt-4
        py-2.5 px-4 rounded-xl bg-[#f4f5fa] dark:bg-[#34364d]
        text-[#121217] dark:text-[#eaeafb]
        group-hover:bg-[#666cff] group-hover:!text-white
        font-bold transition-all">
        کارنامه پروژه ↗
      </button>
    </div>
  );
};`}</code>
                    )}
                    {codeLanguage === 'tailwind' && (
                      <code>{`// Tailwind Utility Classes
className="
  rounded-[28px]
  bg-white dark:bg-[#30334e]
  border border-[#e0e2ec] dark:border-[#3d3f59]
  p-6 shadow-sm
  hover:border-[#666cff]/60
  hover:shadow-xl hover:-translate-y-1
  transition-all duration-300
  font-['Vazirmatn']
"`}</code>
                    )}
                    {codeLanguage === 'css' && (
                      <code>{`.project-card {
  border-radius: 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover {
  border-color: #666cff;
  box-shadow: 0 12px 32px rgba(102, 108, 255, 0.15);
  transform: translateY(-4px);
}`}</code>
                    )}
                  </pre>
                </div>
              </div>

              {/* Developer Implementation Checklist */}
              <div className="mt-4 pt-4 border-t border-[#2f314c] space-y-2 text-xs font-['Vazirmatn'] text-[#8386a1]">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="size-4 text-[#10b981]" />
                  <span>متن دکمه در هاور حتماً سفید (`#ffffff !important`) باشد.</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="size-4 text-[#10b981]" />
                  <span>در وضعیت عادی نوشته دکمه مشکی پررنگ (`#121217`) باشد.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================
        TAB 2: DESIGN TOKENS & COLOR PALETTE
        ======================================================== */}
      {activeTab === 'tokens' && (
        <div className="space-y-6">
          {/* Brand Colors */}
          <div className="rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 shadow-sm">
            <h3 className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb] mb-4 flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#666cff]" />
              <span>پالت رنگ‌های اصلی برند (Primary Brand Colors)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Brand Primary', hex: '#666cff', role: 'دکمه‌های اصلی، تب فعال، اکشن‌ها', tw: 'bg-[#666cff]' },
                { name: 'Brand Hover', hex: '#5b60e6', role: 'وضعیت هاور دکمه‌ها', tw: 'hover:bg-[#5b60e6]' },
                { name: 'Brand Active', hex: '#555ae6', role: 'وضعیت فشرده شدن دکمه', tw: 'active:bg-[#555ae6]' },
                { name: 'Brand Tint Light', hex: '#f0eaff', role: 'پس‌زمینه بج و هایلایت در لایت', tw: 'bg-[#f0eaff]' }
              ].map((c) => (
                <div
                  key={c.name}
                  onClick={() => copyToClipboard(c.hex, c.name)}
                  className="rounded-2xl p-4 bg-[#f8f9fd] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff] transition-all cursor-pointer group"
                >
                  <div
                    style={{ backgroundColor: c.hex }}
                    className="w-full h-16 rounded-xl shadow-inner mb-3 border border-black/5"
                  />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#1e1e2d] dark:text-[#eaeafb]">{c.name}</span>
                    <span className="font-mono text-xs text-[#666cff] font-semibold">{c.hex}</span>
                  </div>
                  <p className="text-[11px] font-['Vazirmatn'] text-[#8386a1] mt-1">{c.role}</p>
                  <span className="text-[10px] font-mono text-[#8386a1] opacity-0 group-hover:opacity-100 transition-opacity block mt-2">
                    {copiedKey === c.name ? 'کپی شد! ✓' : 'کلیک برای کپی کد HEX'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Neutral & Surfaces */}
          <div className="rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 shadow-sm">
            <h3 className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb] mb-4 flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#8386a1]" />
              <span>رنگ‌های زمینه و سطوح (Surfaces & Neutral Tokens)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: 'Dark Bg', hex: '#1e1e2d' },
                { name: 'Dark Surface', hex: '#30334e' },
                { name: 'Dark Card', hex: '#34364d' },
                { name: 'Dark Border', hex: '#3d3f59' },
                { name: 'Dark Text', hex: '#eaeafb' },
                { name: 'Dark Muted', hex: '#8386a1' },
                { name: 'Light Bg', hex: '#f8f9fd' },
                { name: 'Light Surface', hex: '#ffffff' },
                { name: 'Light Card', hex: '#f4f5fa' },
                { name: 'Light Border', hex: '#e0e2ec' },
                { name: 'Light Text', hex: '#19191f' },
                { name: 'Light Muted', hex: '#62657a' }
              ].map((c) => (
                <div
                  key={c.name}
                  onClick={() => copyToClipboard(c.hex, c.name)}
                  className="p-3 rounded-xl bg-[#f8f9fd] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59] text-center cursor-pointer hover:border-[#666cff] transition-all"
                >
                  <div
                    style={{ backgroundColor: c.hex }}
                    className="w-full h-10 rounded-lg shadow-xs mb-2 border border-black/10"
                  />
                  <span className="text-[11px] font-['Vazirmatn'] font-semibold text-[#1e1e2d] dark:text-[#eaeafb] block">
                    {c.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#8386a1]">{c.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Semantic Accents */}
          <div className="rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 shadow-sm">
            <h3 className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb] mb-4 flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#28c76f]" />
              <span>رنگ‌های وضعیت و سمانتیک (Semantic Status Tokens)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 font-['Vazirmatn']">
              {[
                { name: 'موفقیت (Success)', hex: '#28c76f', desc: 'تکمیل شده، آنلاین، فعال' },
                { name: 'هشدار (Warning)', hex: '#ff9f43', desc: 'در انتظار، تایم‌اوت' },
                { name: 'خطا (Danger)', hex: '#ea5455', desc: 'عدم دسترسی، رد شده' },
                { name: 'اطلاعات (Info)', hex: '#00bad1', desc: 'آبی فیروزه‌ای، تگ‌ها' },
                { name: 'ستاره (Favorite)', hex: '#ffb800', desc: 'علاقه‌مندی‌ها و امضاها' }
              ].map((c) => (
                <div
                  key={c.name}
                  onClick={() => copyToClipboard(c.hex, c.name)}
                  className="p-4 rounded-2xl bg-[#f8f9fd] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59] cursor-pointer hover:border-[#666cff]"
                >
                  <div
                    style={{ backgroundColor: c.hex }}
                    className="w-full h-12 rounded-xl mb-3 shadow-sm"
                  />
                  <span className="font-bold text-xs text-[#1e1e2d] dark:text-[#eaeafb] block">{c.name}</span>
                  <span className="font-mono text-xs font-semibold text-[#666cff] block mt-0.5">{c.hex}</span>
                  <p className="text-[11px] text-[#8386a1] mt-1">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================
        TAB 3: TYPOGRAPHY & SPACING SYSTEM
        ======================================================== */}
      {activeTab === 'typography' && (
        <div className="space-y-6">
          {/* Typography Scale Table */}
          <div className="rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 shadow-sm overflow-hidden">
            <h3 className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb] mb-4">
              مقیاس و استانداردهای تایپوگرافی فارسی (DiodrumArabic & Vazirmatn)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-right font-['Vazirmatn'] text-xs">
                <thead>
                  <tr className="border-b border-[#e0e2ec] dark:border-[#3d3f59] text-[#8386a1]">
                    <th className="py-3 px-4">نام سطح (Role)</th>
                    <th className="py-3 px-4">سایز / ارتفاع خط</th>
                    <th className="py-3 px-4">وزن (Weight)</th>
                    <th className="py-3 px-4">کلاس Tailwind</th>
                    <th className="py-3 px-4">پیش‌نمایش فارسی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0e2ec] dark:divide-[#3d3f59]/60">
                  {[
                    { role: 'Display Hero', size: '32px / 40px', weight: 'Bold (700)', tw: "text-2xl sm:text-3xl font-bold font-['DiodrumArabic']", sample: 'پورتال سازمانی الگونت' },
                    { role: 'Heading 1', size: '24px / 32px', weight: 'Bold (700)', tw: "text-xl sm:text-2xl font-bold font-['Vazirmatn']", sample: 'فهرست سامانه‌ها و سرویس‌ها' },
                    { role: 'Heading 2', size: '20px / 28px', weight: 'Bold (700)', tw: "text-lg sm:text-xl font-bold font-['Vazirmatn']", sample: 'مدیریت و آرشیو پروژه‌ها' },
                    { role: 'Heading 3', size: '16px / 24px', weight: 'SemiBold (600)', tw: "text-base font-semibold font-['Vazirmatn']", sample: 'جلسه استندآپ روزانه پلتفرم' },
                    { role: 'Body Text', size: '14px / 20px', weight: 'Regular (400)', tw: "text-sm font-normal font-['Vazirmatn']", sample: 'متن اصلی کارت‌ها، توضیحات و فرم‌ها' },
                    { role: 'Caption Muted', size: '12px / 18px', weight: 'Medium (500)', tw: "text-xs font-medium font-['Vazirmatn']", sample: 'مهلت پاسخگویی: ۱۰ آبان ۱۴۰۵' },
                    { role: 'Micro Badge', size: '11px / 16px', weight: 'SemiBold (600)', tw: "text-[11px] font-semibold font-['Vazirmatn']", sample: 'در حال توسعه' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#f8f9fd] dark:hover:bg-[#25263a]/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#1e1e2d] dark:text-[#eaeafb]">{row.role}</td>
                      <td className="py-3 px-4 font-mono text-[#666cff]">{row.size}</td>
                      <td className="py-3 px-4 text-[#8386a1]">{row.weight}</td>
                      <td className="py-3 px-4 font-mono text-[#00bad1]">{row.tw}</td>
                      <td className="py-3 px-4 text-[#1e1e2d] dark:text-[#eaeafb]">{row.sample}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Border Radius Hierarchy */}
          <div className="rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 shadow-sm">
            <h3 className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb] mb-4">
              سیستم گوشه‌ها (Border Radius System)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-['Vazirmatn']">
              {[
                { radius: '100px (Pill)', desc: 'دکمه‌های اصلی اکشن، بج‌های وضعیت، تگ‌ها', tw: 'rounded-[100px]', ex: 'rounded-[100px]' },
                { radius: '28px (Large)', desc: 'کارت‌های پروژه‌ها، سرویس‌ها و مودال‌ها', tw: 'rounded-[28px]', ex: 'rounded-[28px]' },
                { radius: '20px (Medium)', desc: 'کارت‌های روز تقویم، نوارهای فوتر', tw: 'rounded-[20px]', ex: 'rounded-[20px]' },
                { radius: '12px / 14px', desc: 'لوگوهای امبلم، دراپ‌داون‌ها، اینپوت‌ها', tw: 'rounded-xl', ex: 'rounded-xl' }
              ].map((r) => (
                <div key={r.radius} className="p-4 rounded-2xl bg-[#f8f9fd] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59]">
                  <div className={`w-full h-14 bg-[#666cff]/15 border-2 border-[#666cff] mb-3 flex items-center justify-center font-mono text-xs font-bold text-[#666cff] ${r.ex}`}>
                    {r.radius}
                  </div>
                  <span className="font-bold text-xs text-[#1e1e2d] dark:text-[#eaeafb] block">{r.radius}</span>
                  <p className="text-[11px] text-[#8386a1] mt-1">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================
        TAB 4: MOTION & INTERACTION SPECS
        ======================================================== */}
      {activeTab === 'motion' && (
        <div className="rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 shadow-sm space-y-6">
          <h3 className="font-['Vazirmatn'] font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb] flex items-center gap-2">
            <Sparkles className="size-5 text-[#666cff]" />
            <span>مشخصات انیمیشن و موشن (Figma Easing & Micro-interactions)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-['Vazirmatn']">
            {/* Spring Morph Curve */}
            <div className="p-5 rounded-2xl bg-[#f8f9fd] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59] space-y-3">
              <span className="font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb] block">
                منحنی جهش نرم (Spring Pop Curve)
              </span>
              <p className="text-xs text-[#8386a1]">
                مورد استفاده در باز شدن مدال‌ها، منوهای کشویی و افکت هاور کارت‌ها
              </p>
              <div className="p-2.5 rounded-lg bg-[#1a1b26] text-[#34d399] font-mono text-xs dir-ltr text-left">
                cubic-bezier(0.16, 1, 0.3, 1)
              </div>
              <span className="text-xs text-[#8386a1] block">مدت زمان: 300ms</span>
            </div>

            {/* Standard Smooth Transition */}
            <div className="p-5 rounded-2xl bg-[#f8f9fd] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59] space-y-3">
              <span className="font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb] block">
                تغییر رنگ و استیت دکمه‌ها (Color Morph)
              </span>
              <p className="text-xs text-[#8386a1]">
                تغییر نرم رنگ پس‌زمینه و متون هنگام قرار گرفتن موس
              </p>
              <div className="p-2.5 rounded-lg bg-[#1a1b26] text-[#38bdf8] font-mono text-xs dir-ltr text-left">
                ease-in-out · duration-200
              </div>
              <span className="text-xs text-[#8386a1] block">مدت زمان: 200ms</span>
            </div>

            {/* Confetti & Particle Celebration */}
            <div className="p-5 rounded-2xl bg-[#f8f9fd] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59] space-y-3">
              <span className="font-bold text-sm text-[#1e1e2d] dark:text-[#eaeafb] block">
                کانفتی افزودن به ستاره‌ها (Favorite Pop)
              </span>
              <p className="text-xs text-[#8386a1]">
                جرقه‌های طلایی و ستاره‌ای هنگام کلیک روی علاقه‌مندی‌ها
              </p>
              <div className="p-2.5 rounded-lg bg-[#1a1b26] text-[#fbbf24] font-mono text-xs dir-ltr text-left">
                canvas-confetti (16 particles)
              </div>
              <span className="text-xs text-[#8386a1] block">رنگ‌ها: طلایی و بنفش برند</span>
            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================
        TAB 5: FRONTEND DEV GUIDELINES & CHECKLIST
        ======================================================== */}
      {activeTab === 'guidelines' && (
        <div className="space-y-6 font-['Vazirmatn']">
          <div className="rounded-[28px] bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#1e1e2d] dark:text-[#eaeafb] flex items-center gap-2">
              <ShieldCheck className="size-5 text-[#28c76f]" />
              <span>قوانین حیاتی پیاده‌سازی فرانت‌اند (Frontend Engineering Rules)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '۱. قانون کنتراست دکمه‌های بنفش', desc: 'هر دکمه یا بج با پس‌زمینه bg-[#666cff] باید الزماً دارای نوشته سفید خالص (#ffffff !important) باشد تا در هر دو حالت لایت و دارک خوانا بماند.' },
                { title: '۲. پشتیبانی کامل از راست‌چین (RTL)', desc: 'تمامی المان‌ها تحت dir="rtl" طراحی شده‌اند. از margin/padding قرینه استفاده شود و در موبایل فاصله‌های راست و چپ یکسان باشند.' },
                { title: '۳. فرمت ارقام فارسی', desc: 'تمامی اعداد، ساعت‌ها و تاریخ‌ها از طریق تابع toPersianDigits به ارقام زیبای فارسی تبدیل شوند.' },
                { title: '۴. رفتار دکمه کارنامه پروژه در هاور', desc: 'در حالت عادی دکمه پروژه به رنگ خاکستری روشن با نوشته مشکی پررنگ (#121217) است و در هاور کلیک به بنفش با نوشته کاملاً سفید تبدیل می‌شود.' },
                { title: '۵. کارت جلسات تقویم', desc: 'کارت‌های روز تقویم فاقد خط عمودی ضخیم در لبه راست هستند و در عوض یک شدوی رنگی ملایم (color-mix با ۱۲٪ شفافیت) در زیر کارت دارند.' },
                { title: '۶. سادگی سرچ مودال (Spotlight)', desc: 'ردیف‌های جستجو بسیار خلوت، در یک سطر شیک و بدون پاراگراف‌های طولانی و دکمه‌های تکراری پیاده‌سازی شوند.' }
              ].map((rule, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#f8f9fd] dark:bg-[#25263a] border border-[#e0e2ec] dark:border-[#3d3f59]">
                  <span className="font-bold text-xs text-[#666cff] block mb-1">{rule.title}</span>
                  <p className="text-xs text-[#62657a] dark:text-[#8386a1] leading-relaxed">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
