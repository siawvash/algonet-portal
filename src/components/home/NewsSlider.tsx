import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Tag, ArrowLeft, Maximize2 } from 'lucide-react';
import { toPersianDigits } from '../../utils/formatters';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  category: string;
  date: string;
  imageUrl: string;
  readTime: string;
  author: string;
}

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'راه‌اندازی پلتفرم ابری نسل ۴ الگونت با زیرساخت توزیع‌شده',
    summary: 'ارتقای ۳ برابری توان پردازشی و استقرار کلاسترهای جدید سازمانی بر بستر فناوری Kubernetes با آپ‌تایم ۹۹.۹۹٪ جهت تسریع بیلدها و تست‌های خودکار.',
    fullContent: `تیم زیرساخت و پلتفرم ابری الگونت با افتخار استقرار موفقیت‌آمیز فاز اول پلتفرم ابری نسل ۴ را اعلام می‌نماید. در این معماری جدید، توان پردازش هم‌زمان میکروسرویس‌ها بیش از ۳۰۰٪ افزایش یافته و تمامی خطوط ارتباطی به ذخیره‌سازهای پرسرعت NVMe مجهز شده‌اند.

اهداف اصلی این به‌روزرسانی:
۱. کاهش چشمگیر زمان اجرای پایپ‌لاین‌های CI/CD از ۲۰ دقیقه به زیر ۵ دقیقه
۲. مقیاس‌پذیری خودکار (Auto-scaling) در ساعات اوج بار ترافیکی سازمان
۳. پشتیبان‌گیری چندلایه‌ای زنده با قابلیت بازیابی در کمتر از ۶۰ ثانیه

از کلیه تیم‌های توسعه دعوت می‌شود برای انتقال سرویس‌های خود به کلاستر جدید، مستندات منتشرشده در سامانه ویکی را مطالعه فرمایند.`,
    category: 'زیرساخت و پلتفرم',
    date: '۱۱ آبان ۱۴۰۵',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    readTime: '۴ دقیقه',
    author: 'واحد مهندسی زیرساخت'
  },
  {
    id: 'news-2',
    title: 'انتشار نسخه ۳.۰ دیزاین سیستم سازمانی الگونت',
    summary: 'رونمایی از سیستم طراحی هماهنگ، توکن‌های رنگی رسمی و مؤلفه‌های کامپوننتی استاندارد برای تمامی ابزارها و پنل‌های داخلی سازمان.',
    fullContent: `نسخه ۳.۰ دیزاین سیستم الگونت پس از ۶ ماه تحقیق و تست کاربری توسط تیم طراحی محصول و تجربه کاربری (UI/UX) منتشر شد. این نسخه تمرکز ویژه‌ای بر دسترسی‌پذیری (Accessibility)، خط کرسی استاندارد متون زبان فارسی و یکپارچگی حالت روز و شب دارد.

ویژگی‌های کلیدی:
• پشتیبانی ۱۰۰٪ از استانداردهای WCAG 2.1 سطح AA
• استفاده از تایپ‌فیس وزیرمتن برای هندسه خوانا و بدون بریدگی حروف
• کامپوننت‌های بهینه‌سازی‌شده برای فریم‌ورک‌های مدرن وب و برنامه‌های داخلی

تمام بسته‌های کامپوننتی از طریق مخزن داخلی Nexus در دسترس تیم‌های فنی قرار گرفته است.`,
    category: 'طراحی محصول',
    date: '۹ آبان ۱۴۰۵',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    readTime: '۳ دقیقه',
    author: 'شورای طراحی الگونت'
  },
  {
    id: 'news-3',
    title: 'برگزاری رویداد سالانه فناوری و نوآوری الگونت (TechDay 1405)',
    summary: 'گردهمایی تمامی مدیران و متخصصان فنی سازمان در سالن همایش‌های مرکزی جهت ارائه دستاوردهای سالانه و نقشه راه پروژه‌های هوش مصنوعی.',
    fullContent: `رویداد سالانه فناوری الگونت در تاریخ ۲۵ آبان‌ماه برگزار خواهد شد. در این نشست، راهکارهای نوین سازمان در حوزه اتوماسیون هوشمند، معماری داده‌های سازمانی و امنیت سامانه‌های ارتباطی ارائه خواهد شد.

محورهای سخنرانی‌ها:
• کاربرد مدل‌های زبانی بزرگ (LLM) در پردازش مستندات حقوقی و مالی
• تجارب پیاده‌سازی متدولوژی‌های چابک در تیم‌های مقیاس‌بزرگ
• پنل گفتگو با معماران ارشد سیستم در خصوص چالش‌های مقیاس‌پذیری

همکاران گرامی می‌توانند از طریق تقویم سازمانی، رزرو نشست‌ها و کارگاه‌های جانبی را ثبت نمایند.`,
    category: 'رویدادهای سازمانی',
    date: '۶ آبان ۱۴۰۵',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop',
    readTime: '۵ دقیقه',
    author: 'روابط عمومی و برند'
  },
  {
    id: 'news-4',
    title: 'ارتقای امنیت سازمانی با فعال‌سازی احراز هویت دوعاملی سخت‌افزاری',
    summary: 'پروتکل‌های جدید احراز هویت تک‌ورودی (SSO) مبتنی بر کلیدهای امنیتی FIDO2 جهت افزایش ضریب ایمنی دسترسی به محیط‌های حساس.',
    fullContent: `در راستای انطباق با بالاترین سطوح استانداردهای امنیت سایبری، فرآیند احراز هویت دو مرحله‌ای برای تمامی کاربران با سطوح دسترسی مدیر و توسعه‌دهنده به کلیدهای سخت‌افزاری و پروتکل FIDO2 ارتقا یافت.

مراحل فعال‌سازی:
۱. مراجعه به بخش تنظیمات امنیتی پروفایل کاربری
۲. ثبت کلید امنیتی یوبیکی (YubiKey) یا احراز هویت از طریق Passkey
۳. آزمایش ورود دومرحله‌ای به مخازن کد و پنل‌های مدیریتی

پشتیبانی ۲۴ ساعته تیم Desk آماده پاسخگویی به سؤالات و تجهیز همکاران جدید می‌باشد.`,
    category: 'امنیت اطلاعات',
    date: '۳ آبان ۱۴۰۵',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    readTime: '۲ دقیقه',
    author: 'تیم امنیت سایبری'
  },
  {
    id: 'news-5',
    title: 'برنامه تشویقی و توسعه فردی کارکنان در سه‌ماهه سوم سال',
    summary: 'آغاز دور جدید تسهیلات آموزشی، شرکت در دوره‌های بین‌المللی و گواهی‌نامه‌های تخصصی فناوری اطلاعات با حمایت ۱۰۰ درصدی سازمان.',
    fullContent: `واحد سرمایه انسانی الگونت با هدف تقویت دانش تخصصی همکاران، بسته جدید توسعه حرفه‌ای را راه‌اندازی کرده است. بر این اساس، همکاران در تمامی رده‌های شغلی می‌توانند در دوره‌های آموزشی معتبر شرکت کرده و هزینه‌های مربوط به آزمون‌های بین‌المللی را دریافت نمایند.

مزایای طرح:
• پوشش ۱۰۰٪ هزینه آزمون‌های ابری AWS، Kubernetes و امنیت
• اختصاص ۴ ساعت زمان مطالعه در هفته در برنامه کاری رسمی
• دسترسی نامحدود به پلتفرم‌های یادگیری آنلاین نظیر Coursera و O'Reilly

جهت ثبت درخواست، از بخش پرسشنامه‌ها و فرم‌های منابع انسانی اقدام فرمایید.`,
    category: 'منابع انسانی',
    date: '۱ آبان ۱۴۰۵',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    readTime: '۳ دقیقه',
    author: 'سرمایه‌های انسانی'
  }
];

interface NewsSliderProps {
  onSelectNews: (item: NewsItem) => void;
}

export const NewsSlider: React.FC<NewsSliderProps> = ({ onSelectNews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto transition every 6 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_NEWS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MOCK_NEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MOCK_NEWS.length) % MOCK_NEWS.length);
  };

  const current = MOCK_NEWS[currentIndex];

  return (
    <section
      aria-label="اخبار و اطلاعیه‌های سازمانی"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[580px] rounded-[24px] overflow-hidden bg-[#30334e] border border-[#3d3f59] shadow-[0_12px_40px_rgba(0,0,0,0.35)] group select-none flex flex-col justify-end"
    >
      {/* Background Image Slides */}
      {MOCK_NEWS.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          }`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>
      ))}

      {/*
        Exact gradient requested by user:
        "شامل عکس روی عکس گرادیانت مشکی تا وسط که از پایین به بالاست هرچی بالاتر بیار اوپسیتی کم میشه تا محو بشه"
      */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#30334e] via-[#30334e]/80 via-45% to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#30334e]/60 via-transparent to-[#30334e]/60"
        aria-hidden="true"
      />

      {/* Top Header Badge & Maximize Button */}
      <div className="absolute top-5 inset-x-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#34364d]/90 border border-[#42455f] text-[11px] font-['Vazirmatn'] font-medium text-[#666cff] backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <Tag className="size-[12px]" />
            <span>{current.category}</span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-['Vazirmatn'] text-[#8386a1] backdrop-blur-md flex items-center gap-1">
            <Calendar className="size-[12px]" />
            <span>{current.date}</span>
          </span>
        </div>

        <button
          onClick={() => onSelectNews(current)}
          className="size-9 rounded-full bg-[#30334e]/80 border border-[#42455f] text-[#eaeafb] hover:text-[#666cff] hover:border-[#666cff] flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-lg"
          title="مشاهده متن کامل خبر در مودال"
        >
          <Maximize2 className="size-4" />
        </button>
      </div>

      {/* Center & Bottom News Text */}
      <div className="relative z-20 p-6 sm:p-8 text-center flex flex-col items-center max-w-2xl mx-auto space-y-3.5">
        {/* Title in center */}
        <h2
          onClick={() => onSelectNews(current)}
          className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl text-[#eaeafb] leading-snug hover:text-[#666cff] cursor-pointer transition-colors"
        >
          {current.title}
        </h2>

        {/* Summary below title */}
        <p className="font-['Vazirmatn'] font-normal text-xs sm:text-sm text-[#8386a1] leading-relaxed line-clamp-2 max-w-xl text-center">
          {current.summary}
        </p>

        {/* Read Full News Button */}
        <button
          onClick={() => onSelectNews(current)}
          className="mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#666cff]/15 border border-[#666cff]/35 text-[#eaeafb] hover:bg-[#666cff]/25 text-xs font-['Vazirmatn'] font-medium transition-all shadow-[0_0_12px_rgba(183,154,255,0.2)] cursor-pointer"
        >
          <span>مطالعه کامل خبر</span>
          <ArrowLeft className="size-3.5" />
        </button>
      </div>

      {/* Bottom Nav: Indicators & Arrows */}
      <div className="relative z-20 px-6 pb-5 pt-2 flex items-center justify-between border-t border-white/5">
        {/* Previous / Next buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="size-8 rounded-full bg-[#34364d]/90 border border-[#42455f] text-[#8386a1] hover:text-[#eaeafb] hover:border-[#666cff] flex items-center justify-center transition-colors cursor-pointer"
            title="خبر قبلی"
          >
            <ChevronRight className="size-4" />
          </button>
          <button
            onClick={handleNext}
            className="size-8 rounded-full bg-[#34364d]/90 border border-[#42455f] text-[#8386a1] hover:text-[#eaeafb] hover:border-[#666cff] flex items-center justify-center transition-colors cursor-pointer"
            title="خبر بعدی"
          >
            <ChevronLeft className="size-4" />
          </button>
        </div>

        {/* 5 Dots / Progress Indicators */}
        <div className="flex items-center gap-2">
          {MOCK_NEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-7 bg-[#666cff] shadow-[0_0_8px_#666cff]'
                  : 'w-2 bg-[#42455f] hover:bg-[#8386a1]'
              }`}
              title={`خبر شماره ${toPersianDigits(idx + 1)}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <span className="font-['Vazirmatn'] text-[11px] text-[#8386a1] font-mono">
          {toPersianDigits(currentIndex + 1)} / {toPersianDigits(MOCK_NEWS.length)}
        </span>
      </div>
    </section>
  );
};
