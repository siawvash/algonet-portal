# پورتال سازمانی یکپارچه الگونت ۳.۰ (Algonet Enterprise Portal v3.0)
## مستند جامع بریف، نیازمندی‌ها و ساختار داده‌ها (Brief, Requirements & Data Structure)

> **نسخه سند:** ۳.۳.۰  
> **تاریخ نگارش:** آبان ۱۴۰۵ / نوامبر ۲۰۲۶  
> **وضعیت سند:** تصویب‌شده و منطبق با کدهای اجرایی React + TypeScript + Tailwind CSS  
> **مخزن سورس‌کد:** [github.com/siawvash/algonet-portal](https://github.com/siawvash/algonet-portal.git)  

---

## 📑 فهرست مطالب
1. [بخش اول: خلاصه اجرایی و بریف پروژه (Project Brief)](#۱-بخش-اول-خلاصه-اجرایی-و-بریف-پروژه-project-brief)
   - [۱.۱ چشم‌انداز و مأموریت](#۱۱-چشمانداز-و-مأموریت-vision--mission)
   - [۱.۲ پرسونای کاربران و ذی‌نفعان](#۱۲-پرسونای-کاربران-و-ذینفعان-personas)
   - [۱.۳ مسئله و ارزش پیشنهادی پورتال](#۱۳-مسئله-و-ارزش-پیشنهادی-value-proposition)
   - [۱.۴ اصول و فلسفه طراحی بصری](#۱۴-اصول-و-فلسفه-طراحی-بصری-design-philosophy)
2. [بخش دوم: مشخصات نیازمندی‌های سیستم (System Requirements - SRS)](#۲-بخش-دوم-مشخصات-نیازمندیهای-سیستم-system-requirements---srs)
   - [۲.۱ نیازمندی‌های عملکردی (Functional Requirements)](#۲۱-نیازمندیهای-عملکردی-functional-requirements)
     - [FR-01: نوار ناوبری بالا (Topbar) و تقویم زنده](#fr-01-نوار-ناوبری-بالا-topbar-و-تقویم-زنده)
     - [FR-02: ترنزیشن انیمیشنی تغییر تم (Circular Reveal)](#fr-02-ترنزیشن-انیمیشنی-تغییر-تم-circular-reveal)
     - [FR-03: سایدبار ناوبری و تغییر وضعیت حضور (Presence Status)](#fr-03-سایدبار-ناوبری-و-تغییر-وضعیت-حضور-presence-status)
     - [FR-04: پنجره جستجوی سراسری ۲۶ سرویس (Quick Search Modal)](#fr-04-پنجره-جستجوی-سراسری-۲۶-سرویس-quick-search-modal)
     - [FR-05: تقویم جلالی و لیست کارت‌های جلسات](#fr-05-تقویم-جلالی-و-لیست-کارتهای-جلسات)
     - [FR-06: مدیریت پروژه‌ها و نوار صفحه‌بندی چسبنده (Sticky Pagination)](#fr-06-مدیریت-پروژهها-و-نوار-صفحهبندی-چسبنده-sticky-pagination)
     - [FR-07: کارنامه تفصیلی پروژه‌ها (Project Scorecard Modal)](#fr-07-کارنامه-تفصیلی-پروژهها-project-scorecard-modal)
     - [FR-08: ماژول‌های اطلاع‌رسانی، نظرسنجی و آیین‌نامه‌ها](#fr-08-ماژولهای-اطلاعرسی-نظرسنجی-و-آییننامهها)
     - [FR-09: ناوبری موبایل (Mobile Bottom Dock)](#fr-09-ناوبری-موبایل-mobile-bottom-dock)
   - [۲.۲ نیازمندی‌های غیرعملکردی (Non-Functional Requirements)](#۲۲-نیازمندیهای-غیرعملکردی-non-functional-requirements)
     - [NFR-01: کارایی و سرعت لود (Performance)](#nfr-01-کارایی-و-سرعت-لود-performance)
     - [NFR-02: دسترس‌پذیری و استانداردهای کیبورد (Accessibility)](#nfr-02-دسترسپذیری-و-استانداردهای-کیبورد-accessibility)
     - [NFR-03: بومی‌سازی فارسی و راست‌به‌چپ (RTL & Localization)](#nfr-03-بومیسازی-فارسی-و-راستبهچپ-rtl--localization)
     - [NFR-04: بسته مستقل تک‌فایلی (Standalone Single-File Bundle)](#nfr-04-بسته-مستقل-تکفایلی-standalone-single-file-bundle)
3. [بخش سوم: معماری و ساختار داده‌ها (Data Structure & Type Schemas)](#۳-بخش-سوم-معماری-و-ساختار-دادهها-data-structure--type-schemas)
   - [۳.۱ مدل‌های کاربری و احراز هویت (User & Presence)](#۳۱-مدلهای-کاربری-و-احراز-هویت-user--presence)
   - [۳.۲ کاتالوگ ۲۶ سرویس تخصصی (Services Catalog)](#۳۲-کاتالوگ-۲۶-سرویس-تخصصی-services-catalog)
   - [۳.۳ مدل‌های تقویم و نشست‌ها (Calendar & Meetings)](#۳۳-مدلهای-تقویم-و-نشستها-calendar--meetings)
   - [۳.۴ مدل‌های اطلاعاتی پروژه‌ها (Projects & Scorecard)](#۳۴-مدلهای-اطلاعاتی-پروژهها-projects--scorecard)
   - [۳.۵ مدل‌های نوتیفیکیشن‌ها، نظرسنجی‌ها و خط‌مشی‌ها](#۳۵-مدلهای-نوتیفیکیشنها-نظرسنجیها-و-خطمشیها)
   - [۳.۶ ساختار توکن‌های دیزاین سیستم (Design System Tokens)](#۳۶-ساختار-توکنهای-دیزاین-سیستم-design-system-tokens)
4. [بخش چهارم: نگاشت نیازمندی‌ها به کامپوننت‌های فرانت‌اند](#۴-بخش-چهارم-نگاشت-نیازمندیها-به-کامپوننتهای-فرانتاند)

---

## ۱. بخش اول: خلاصه اجرایی و بریف پروژه (Project Brief)

### ۱.۱ چشم‌انداز و مأموریت (Vision & Mission)
پورتال الگونت ۳.۰ سکوی مرکزی دیجیتال برای بیش از صدها متخصص، مهندس هوش مصنوعی، دانشمند داده و مدیران پروژه در اکوسیستم الگونت است. هدف پورتال از بین بردن پراکندگی در ابزارها و ایجاد یک **داشبورد هماهنگ، یکدست و فوق‌سریع** است که تمام ۲۶ سامانه و سرویس عملیاتی سازمان را در یک رابط کاربری مدرن، زیبا و بدون پیچیدگی زائد گرد هم می‌آورد.

### ۱.۲ پرسونای کاربران و ذی‌نفعان (Personas)
1. **مهندسان هوش مصنوعی و کلان‌داده (ML/Data Engineers):** نیازمند دسترسی سریع به کلاسترهای کوبرنتیز (Headlamp)، پایپ‌لاین‌های یادگیری ماشین (Kubeflow, MLflow)، دیتالیک (Iceberg, Nessie) و مدیریت دسترسی (Apache Ranger).
2. **توسعه‌دهندگان نرم‌افزار و دواپس (Dev & Cloud Engineers):** استفاده روزانه از گیت‌لب (GitLab)، رجیستری (Nexus)، محیط‌های توسعه (DevSlot) و سرورهای بیلد.
3. **مدیران پروژه و اسکرام‌مسترها (Project Leads & PMs):** رصد عملکرد و درصد پیشرفت پروژه‌ها (Project Scorecard)، برنامه‌ریزی جلسات کاری (Meet / Jitsi) و پیگیری ددلاین‌ها.
4. **پرسنل و کارشناسان عمومی (Enterprise Staff):** مدیریت کارکرد روزانه، سیستم ثبت مرخصی/تردد، سیستم تغذیه سازمانی (Algoteria)، مستندات فنی (Wiki.js) و پیام‌رسان تیمی (Mattermost).

### ۱.۳ مسئله و ارزش پیشنهادی (Value Proposition)
- **مسئله:** ورود جداگانه به ده‌ها URL مختلف، ناهماهنگی تقویم‌های میلادی و شمسی سازمانی، رابط‌های کاربری ناهمگون و اتلاف زمان در پیدا کردن سامانه‌ها.
- **ارزش پیشنهادی الگونت:**
  - **Single Sign-On (SSO) یکپارچه** با هویت متمرکز سازمانی.
  - **جستجوی آنی (Instant Finder)** میان تمام ۲۶ سرویس تخصصی با کلید میانبر `ESC`/کلیک.
  - **تقویم بومی شمسی (Jalali Calendar)** متصل به فضاهای مجازی Google Meet و Jitsi.
  - **طراحی Dark-First** با ارگونومی بالا جهت جلوگیری از خستگی چشم در شیفت‌های طولانی برنامه‌نویسی.

### ۱.۴ اصول و فلسفه طراحی بصری (Design Philosophy)
- **رویکرد Dark-First با پالت Component Theme فیگما:** پس‌زمینه عمیق `#121217` و سطوح کارتی `#1B1C2B` و `#30334e` با حاشیه‌های ظریف `#2E3148`.
- **رنگ سازمانی بنفش نئونی الگونت (`#666cff`):** نماد هوش، تکنولوژی و پیشگامی که در دکمه‌ها، درخشش فوکوس و انیمیشن‌ها نقش شاخص دارد.
- **عدم استفاده از کادربندی‌های شلوغ و خطوط زائد:** استفاده از سایه‌های محو رنگی (Ambient Glow) به‌جای بوردرهای ضخیم.
- **میکرواینتراکشن‌های روان (Spring Easing):** انیمیشن تغییر تم به صورت دایره گسترش‌یابنده (Circular Reveal) و حرکت فنری ترنزیشن‌ها.

---

## ۲. بخش دوم: مشخصات نیازمندی‌های سیستم (System Requirements - SRS)

### ۲.۱ نیازمندی‌های عملکردی (Functional Requirements)

#### FR-01: نوار ناوبری بالا (Topbar) و تقویم زنده
- **شرح:** نوار بالای صفحه هویت سازمانی، زمان زنده، تقویم شمسی جلالی و میلادی، سوئیچر تغییر تم و زنگوله اعلان‌ها را به نمایش می‌گذارد.
- **جزئیات:**
  - سمت راست (در چیدمان فارسی): لوگوی وکتور نماد الگونت همراه با عنوان رسمی.
  - کپسول زمان و تاریخ: نمایش زنده ثانیه‌شمار با ارقام فارسی (`۱۲:۲۶:۰۰`) همراه با تاریخ شمسی جاری (`۱۹ آبان ۱۴۰۵`) و برچسب تاریخ میلادی.
  - سمت چپ: سوئیچر تغییر حالت تم (Dark/Light) و زنگوله نوتیفیکیشن با شمارشگر پیام‌های خوانده‌نشده.

#### FR-02: ترنزیشن انیمیشنی تغییر تم (Circular Reveal)
- **شرح:** تغییر تم میان حالت دارک و لایت (و بالعکس) نباید با فلیکر یا پرش رنگ ناگهانی انجام شود؛ بلکه با انیمیشن دایره‌ای شتاب‌یافته از سمت چپ بالا گسترش می‌یابد.
- **جزئیات:**
  - نقطه مبدا دایره: مختصات دقیق مرکز دکمه سوئیچر در تاپ‌بار (گوشه بالا-چپ).
  - جهت انیمیشن: در هر دو حالت دارک‌به‌لایت و لایت‌به‌دارک، تم جدید مانند دایره‌ای از نقطه مبدا رشد کرده و تمام دید صفحه را می‌پوشاند (`circle(0px) -> circle(endRadius)`).
  - پیاده‌سازی فنی: بهره‌گیری از View Transitions API مرورگر همراه با `flushSync` برای همگام‌سازی همزمان رندر ری‌اکت و کلس دارک HTML.
  - ریزتعامل دکمه: چرخش ۹۰ درجه آیکون‌های ماه و خورشید با افکت فنری.

#### FR-03: سایدبار ناوبری و تغییر وضعیت حضور (Presence Status)
- **شرح:** سایدبار عمودی دسکتاپ امکان دسترسی سریع به بخش‌های اصلی پورتال را فراهم کرده و وضعیت کاربری را منعکس می‌کند.
- **جزئیات:**
  - قابلیت تاشوندگی (Collapse): فشرده شدن از عرض ۲۶۰ پیکسل به ۷۸ پیکسل همراه با جابه‌جایی نرم محتوای اصلی.
  - ویجت وضعیت پرسنل (Presence Selector): انتخاب بین ۴ حالت «حاضر در شرکت (سبز)»، «در جلسه (بنفش)»، «دورکاری (آبی)» و «مرخصی (زرد)».
  - آیتم‌های منو: خانه، پروژه‌ها، تقویم و جلسات، پورتفولیو، اطلاعیه‌ها، نظرسنجی‌ها، آیین‌نامه‌ها و پروفایل.

#### FR-04: پنجره جستجوی سراسری ۲۶ سرویس (Quick Search Modal)
- **شرح:** دسترسی کیبوردی و آنی به تمامی سامانه‌های زیرمجموعه بدون نیاز به اسکرول.
- **جزئیات:**
  - کلید میانبر: باز شدن با کلیک روی باکس جستجو یا کلید `Esc` / کلیک پس‌زمینه جهت بستن.
  - دسته‌بندی‌ها: «همه سامانه‌ها»، «سرویس‌های عمومی»، «داده و هوش مصنوعی»، «پروژه‌های سازمانی»، «IDP».
  - فیلتر بلادرنگ: جستجوی همزمان در عنوان فارسی، نام انگلیسی، مخفف و توضیحات سرویس.
  - هدایت مستقیم: دکمه اینتر یا کلیک، کاربر را با تب جدید به سامانه مقصد هدایت می‌کند.

#### FR-05: تقویم جلالی و لیست کارت‌های جلسات
- **شرح:** ساماندهی زمان‌بندی جلسات کاری و پیوند مستقیم به بستر ویدئوکنفرانس.
- **جزئیات:**
  - تب‌های فیلتر بازه زمانی: روز، هفته، ماه، برنامه و سال.
  - کنترل‌های عملیاتی: دو دکمه هم‌اندازه و متقارن «ایجاد جلسه» (`#666cff`) و «تنظیمات یادآوری» (`#1b1c2b`).
  - فیلد جستجوی جلسه: با پس‌زمینه تیره و حاشیه ظریف متناسب با سرچ صفحه اصلی.
  - کارت‌های جلسات: بدون خطوط تیز حاشیه‌ای راست، مجهز به سایه محو رنگی ملایم (Ambient Glow) که در حالت هاور تقویت می‌شود.
  - دکمه ورود به جلسه: دکمه بنفش برجسته «ورود به Meet» یا «ورود به Jitsi» متناسب با اتاق مجازی تعریف‌شده.

#### FR-06: مدیریت پروژه‌ها و نوار صفحه‌بندی چسبنده (Sticky Pagination)
- **شرح:** صفحه نمایش وضعیت پروژه‌های سازمانی همراه با نوار کنترل صفحه‌بندی شناور در پایین.
- **جزئیات:**
  - فیلترها: فیلتر متنی نام پروژه، مسئول اصلی (مهدیه ماندنی و...) و وضعیت (فعال، در حال اجرا، تست).
  - نوار صفحه‌بندی چسبنده (Sticky):
    - با ساختار انعطاف‌پذیر، در تعداد اقلام کم نیز در پایین صفحه می‌نشیند (`mt-auto`).
    - هنگام اسکرول محتوا در ارتفاع‌های مختلف، با استایل `sticky bottom-4 z-20` همواره در پایین پنجره در دسترس است.
    - پس‌زمینه نیمه‌شفاف شیشه‌ای (`backdrop-blur-md`) با سایه شناور نرم.
    - دراپ‌داون انتخاب تعداد در صفحه (۵، ۱۰، ۲۰، ۵۰ مورد) با کلیک روی رقم تعداد.
    - دکمه‌های قبلی و بعدی با غیرفعال‌سازی هوشمند در صفحات ابتدا و انتها.

#### FR-07: کارنامه تفصیلی پروژه‌ها (Project Scorecard Modal)
- **شرح:** نمایش جزئیات فنی و عملکردی هر پروژه با کلیک روی دکمه «کارنامه پروژه».
- **جزئیات:**
  - متغیرهای سلامت فنی: شاخص سلامت (Health Score)، رتبه کیفی (Quality Rating)، سرعت اسپرینت (Velocity).
  - آمار مخزن کد: تعداد کامیت‌های انجام‌شده، ایشوهای باز، درصد پوشش تست‌ها.
  - لیست هم‌تیمی‌ها: نام و آواتار نقش‌های توسعه‌دهنده فرانت، بک‌اند، دیتا و مدیر محصول.

#### FR-08: ماژول‌های اطلاع‌رسانی، نظرسنجی و آیین‌نامه‌ها
- **شرح:** یکپارچگی فرآیندهای منابع انسانی و ارتباطات درون‌سازمانی.
- **جزئیات:**
  - اطلاعیه‌ها: دسته‌بندی بر اساس اولویت بالا و عادی، با دکمه علامت‌گذاری همه به عنوان خوانده‌شده.
  - نظرسنجی‌ها: ثبت نظر با زمان تقریبی و درصد مشارکت همکاران.
  - آیین‌نامه‌ها: مطالعه اسناد و ثبت دکمه تأیید مطالعه (Acknowledge) توسط پرسنل.

#### FR-09: ناوبری موبایل (Mobile Bottom Dock)
- **شرح:** دسترسی ارگونومیک انگشت شست به صفحات کلیدی در نمایشگرهای لمسی کوچکتر از سایز `lg`.
- **جزئیات:**
  - موقعیت ثابت در پایین صفحه (`fixed bottom-3 inset-x-4`).
  - افکت فیدبک لمسی لایت (Haptic Feedback) در دستگاه‌های پشتیبانی‌کننده.
  - نشانگر متحرک کپسولی برای صفحه فعال.

---

### ۲.۲ نیازمندی‌های غیرعملکردی (Non-Functional Requirements)

#### NFR-01: کارایی و سرعت لود (Performance)
- **معیار:** Largest Contentful Paint (LCP) کمتر از ۸۰۰ میلی‌ثانیه.
- **شاخص CLS:** نمره صفر (بدون هرگونه پرش المان هنگام لود فونت یا رندر کامپوننت‌ها).
- **نرخ فریم:** حفظ نرخ ۶۰ تا ۱۲۰ فریم بر ثانیه در انیمیشن‌های ترنزیشن تم و مدال‌ها.

#### NFR-02: دسترس‌پذیری و استانداردهای کیبورد (Accessibility)
- رعایت کنتراست رنگی مطابق با سطح **WCAG 2.1 AA** (حداقل نسبت ۴.۵:۱ برای متون عادی).
- ناوبری کامل با کیبورد: فوکوس مشخص با رینگ بنفش `#666cff` روی تمامی دکمه‌ها، ورودی‌ها و کارت‌ها.
- بسته شدن تمامی مدال‌ها و دراپ‌داون‌ها با فشردن کلید `Escape`.

#### NFR-03: بومی‌سازی فارسی و راست‌به‌چپ (RTL & Localization)
- جهت کامل بدنه سند: `dir="rtl"`.
- فونت استاندارد: خانواده ایران‌یکان ایکس با ارقام کاملاً فارسی (`IRANYekanXFaNum`).
- ساختار تاریخ و ساعت: تبدیل اتوماتیک ارقام انگلیسی به ارقام فارسی در تمام ویجت‌ها و جداول.

#### NFR-04: بسته مستقل تک‌فایلی (Standalone Single-File Bundle)
- کل پروژه قابلیت بسته‌بندی در قالب یک فایل `portal.html` مستقل را داراست؛ به‌طوری‌که تمامی کدهای JavaScript، استایل‌های CSS، آیکون‌های وکتور SVG و فونت‌ها به‌صورت اینلاین قرار گرفته و حتی بدون اینترنت یا وب‌سرور قابل اجراست.

---

## ۳. بخش سوم: معماری و ساختار داده‌ها (Data Structure & Type Schemas)

### ۳.۱ مدل‌های کاربری و احراز هویت (User & Presence)

```typescript
/** وضعیت حضور پرسنل در سازمان */
export type UserPresenceStatus = 'present' | 'meeting' | 'remote' | 'leave';

/** مهارت‌های تخصصی پرسنل */
export interface SkillItem {
  id: string;
  name: string;
  level: number; // 0 تا 100 درصد
  category: 'frontend' | 'backend' | 'ai' | 'devops' | 'design';
}

/** ثبت گزارش کار روزانه */
export interface WorkLogEntry {
  id: string;
  date: string;          // تاریخ جلالی مثلاً ۱۴۰۵/۰۸/۱۹
  projectTitle: string;  // عنوان پروژه
  hours: number;         // مدت زمان به ساعت
  status: 'approved' | 'pending';
  description: string;   // شرح کار انجام‌شده
}

/** پروفایل جامع پرسنل الگونت */
export interface UserProfile {
  id: string;
  fullName: string;
  englishName: string;
  email: string;
  avatarUrl?: string;
  initials: string;
  role: string;
  department: string;
  presence: UserPresenceStatus;
  statusMessage?: string;
  joinDate: string;
  skills: SkillItem[];
  recentWorklogs: WorkLogEntry[];
}
```

---

### ۳.۲ کاتالوگ ۲۶ سرویس تخصصی (Services Catalog)

```typescript
/** دسته‌بندی‌های کلان سرویس‌ها */
export type ServiceCategoryId = 
  | 'all' 
  | 'comm'       // عمومی و ارتباطی
  | 'mgmt'       // مدیریت و پروژه‌ها
  | 'devops'     // زیرساخت و دواپس
  | 'data-ml';   // کلان‌داده و هوش مصنوعی

/** متریک‌های کلیدی عملکردی سرویس */
export interface ServiceMetric {
  label: string; // برچسب متریک (مانند زمان پاسخ، نرخ آپ‌تایم)
  value: string; // مقدار مثلاً 99.98% یا 42ms
}

/** زیرآیتم‌ها و قابلیت‌های داخلی هر سرویس */
export interface ServiceSubItem {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  statusLabel: string;
  accent: 'lime' | 'indigo' | 'orange' | 'neutral';
}

/** ساختار کامل هر یک از ۲۶ سرویس تخصصی الگونت */
export interface PortalService {
  id: string;                                    // شناسه منحصر‌به‌فرد مثل kubeflow, mlflow, gitlab
  code: string;                                  // کد اختصاصی مثلاً ALG-KUBE
  title: string;                                 // عنوان فارسی سرویس
  englishName: string;                           // نام انگلیسی رسمی
  shortTitle: string;
  category: Exclude<ServiceCategoryId, 'all'>;
  categoryTitle: string;
  description: string;                           // شرح عملکرد سامانه
  badgeText: string;                             // برچسب وضعیت
  unreadCount: number;
  pinned: boolean;                               // آیا پین شده است؟
  needsAttention: boolean;
  uptime: string;                                // درصد پایداری
  responseTime: string;                          // میانگین پاسخ‌دهی
  ownerTeam: string;                             // تیم متولی
  leadName: string;                              // مسئول فنی
  leadRole: string;
  url: string;                                   // آدرس وب سرویس
  accentColor: '#CFFF04' | '#5F5CE1' | '#FA5A14' | '#666CFF';
  primaryMetric: ServiceMetric;
  secondaryMetric: ServiceMetric;
  tertiaryMetric: ServiceMetric;
  ctaLabel: string;
  subItems: ServiceSubItem[];
  svgIcon?: string;                              // وکتور خام SVG برای رندر بلادرنگ
}
```

#### فهرست ۲۶ سرویس ثبت‌شده در کاتالوگ پورتال:
1. **Airflow:** مدیریت و ارکستراسیون پایپ‌لاین‌های داده و جریانات کاری ETL.
2. **Algoteria:** سامانه هوشمند رزرو ناهار و تغذیه پرسنل.
3. **بازآفرینی:** سامانه ملی بازآفرینی بافت‌های ناکارآمد شهری.
4. **Desk:** میز کار یکپارچه سازمانی الگونت.
5. **DevSlot:** سکوی مدیریت محیط‌های تست و توسعه.
6. **سرویس‌های عمومی:** میان‌بر سامانه‌های اداری عمومی.
7. **GitLab:** مخزن سورس‌کدها، کدریویو و پایپ‌لاین‌های CI/CD.
8. **Headlamp:** داشبورد مدیریت و رصد کلاسترهای Kubernetes.
9. **Iceberg:** مدیریت فرمت پیشرفته جداول دریاچه داده (Lakehouse).
10. **Jitsi Meet:** پلتفرم اختصاصی جلسات آنلاین و تماس تصویری امن.
11. **Kubeflow:** پلتفرم تخصصی آموزش و اجرای مدل‌های یادگیری ماشین.
12. **Label Studio:** سکوی برچسب‌گذاری و آماده‌سازی داده‌های هوش مصنوعی.
13. **LakeFS:** کنترل نسخه مشابه Git برای فایل‌ها و دیتاست‌های عظیم.
14. **سامانه لیلی:** سیستم اختصاصی تحلیل آماری و رفتار داده‌ها.
15. **پست الکترونیک:** ایمیل امن سازمانی با پروتکل‌های IMAP/SMTP.
16. **Mattermost:** پیام‌رسان فوری تیمی با کانال‌های گفتگو و یکپارچه‌سازی وب‌هوک.
17. **MLflow:** رصد چرخه حیات، آزمایش‌ها و استقرار مدل‌های AI.
18. **Nessie:** کاتالوگ تراکنشی دیتاست‌های دیتالیک بدون تداخل.
19. **Nextcloud:** فضای ابری امن اشتراک اسناد و همگام‌سازی فایل‌ها.
20. **Nexus:** ریپازیتوری نگهداری آرتیفکت‌ها و پکیج‌های بیلد.
21. **OpenMetadata:** حاکمیت داده، مستندات تبار و کاتالوگ سازمانی داده.
22. **OpenProject:** مدیریت تسک‌ها، زمان‌بندی گانت و مسیر بحرانی پروژه.
23. **Apache Ranger:** امنیت داده، پالیسی‌های دسترسی ریزدانه و آدیت.
24. **Apache Spark:** موتور پردازش موازی سریع کلان‌داده‌ها.
25. **حضور و غیاب:** ثبت تردد پرسنل، درخواست مرخصی و مأموریت.
26. **Wiki.js:** پایگاه دانش جامع، دانشنامه داخلی و مستندات معماری.

---

### ۳.۳ مدل‌های تقویم و نشست‌ها (Calendar & Meetings)

```typescript
/** بستر ویدئوکنفرانس جلسه */
export type MeetingPlatform = 'google-meet' | 'jitsi' | 'in-person';

/** دسته‌بندی موضوعی جلسه */
export type MeetingCategory = 'tech' | 'standup' | 'review' | 'all-hands' | 'planning';

/** تب‌های فیلتر زمانی تقویم */
export type CalendarFilterTab = 'day' | 'week' | 'month' | 'schedule' | 'year';

/** مدل نشست کاری و رویداد تقویم */
export interface CalendarMeeting {
  id: string;
  title: string;              // عنوان نشست (مثلاً استندآپ روزانه پلتفرم)
  subtitle?: string;          // زیرعنوان
  startTime: string;          // ساعت شروع مثلاً "۱۰:۰۰"
  endTime: string;            // ساعت پایان مثلاً "۱۰:۳۰"
  dateLabel: string;          // برچسب تاریخ شمسی مثلاً "چهارشنبه، ۱۹ آبان"
  organizer: string;          // نام برگزارکننده
  attendeesCount: number;     // تعداد حاضرین مدعو
  roomName: string;           // نام اتاق (مثلاً سالن کنفرانس شیشه‌ای، اتاق مجازی ۱)
  platform: MeetingPlatform;  // پلتفرم برگزاری
  meetingUrl: string;         // لینک مستقیم اتصال به جلسه
  category: MeetingCategory;
  accentColor: string;        // کد رنگ سایه محو (مثلاً #666cff یا #00d2d3)
  description?: string;
}

/** تنظیمات یادآوری و نوتیفیکیشن نشست‌ها */
export interface ReminderConfig {
  enabled: boolean;
  minutesBefore: number;      // چند دقیقه قبل یادآوری شود (۵، ۱۵، ۳۰)
  notificationChannel: 'browser' | 'mattermost' | 'email' | 'all';
  soundEnabled: boolean;
}
```

---

### ۳.۴ مدل‌های اطلاعاتی پروژه‌ها (Projects & Scorecard)

```typescript
/** وضعیت سلامت و پیشرفت پروژه */
export type ProjectProgressStatus = 'active' | 'in-progress' | 'testing' | 'completed' | 'blocked';

/** عضو تیم پروژه */
export interface ProjectMember {
  name: string;
  initials: string;
  role: string;
  avatarColor?: string;
}

/** کارنامه تفصیلی و شاخص‌های فنی پروژه */
export interface ProjectScorecard {
  healthScore: number;         // نمره سلامت از ۱۰۰
  qualityRating: 'A+' | 'A' | 'B' | 'C';
  totalCommits: number;        // مجموع کامیت‌ها
  openIssues: number;          // تعداد ایشوهای حل‌نشده
  lastSprintProgress: string;  // درصد تحقق اسپرینت اخیر
  velocity: string;            // سرعت تیمی بر حسب Story Point
  testCoverage: number;        // درصد پوشش تست
  summary: string;             // گزارش خلاصه مدیر فنی
}

/** مدل جامع هر پروژه در سیستم */
export interface ProjectItem {
  id: string;                  // شناسه پروژه
  code: string;                // شناسه کوتاه پروژه مثلاً ANNOTOPIA-DEV
  persianName: string;         // نام فارسی پروژه
  englishName: string;         // نام انگلیسی پروژه
  leadName: string;            // سرپرست یا مسئول اصلی
  memberCount: number;         // تعداد اعضای اختصاص‌یافته
  deadline: string;            // موعد تحویل نهایی
  category: string;            // دسته‌بندی موضوعی
  description: string;         // شرح مأموریت
  logoColor: string;           // رنگ نماد
  gradientBg: string;          // گرادیانت کاور کارت
  accentGlow: string;          // درخشش رنگی کارت
  progress: number;            // درصد کلی پیشرفت (۰ تا ۱۰۰)
  openTasks: number;           // تسک‌های باز
  completedTasks: number;      // تسک‌های پایان‌یافته
  worklogHours: number;        // مجموع ساعات کار ثبت‌شده
  status: ProjectProgressStatus;
  statusLabel: string;         // متن فارسی وضعیت
  statusBadgeColor: string;
  iconType: 'brain' | 'sparkles' | 'portal';
  members: ProjectMember[];
  scorecard: ProjectScorecard; // کارنامه تفصیلی
}
```

---

### ۳.۵ مدل‌های نوتیفیکیشن‌ها، نظرسنجی‌ها و خط‌مشی‌ها

```typescript
/** اولویت اطلاع‌رسانی */
export type NotificationPriority = 'critical' | 'high' | 'normal' | 'low';

/** اعلان سیستمی */
export interface NotificationItem {
  id: string;
  title: string;
  serviceName: string;
  timeAgo: string;
  read: boolean;
  priority: NotificationPriority;
  description: string;
  actionUrl?: string;
}

/** پرسشنامه و نظرسنجی سازمانی */
export interface SurveyItem {
  id: string;
  title: string;
  deadline: string;
  questionsCount: number;
  estimatedMinutes: number;
  completed: boolean;
  department: string;
}

/** آیین‌نامه‌ها و قوانین سازمانی */
export interface PolicyItem {
  id: string;
  code: string;
  title: string;
  category: string;
  updatedAt: string;
  summary: string;
  acknowledged: boolean;
}
```

---

### ۳.۶ ساختار توکن‌های دیزاین سیستم (Design System Tokens)

```typescript
export interface AlgonetDesignTokens {
  colors: {
    brand: {
      primary: '#666CFF';      // بنفش شاخص الگونت
      primaryHover: '#5A5FE0';
      primaryGlow: 'rgba(102, 108, 255, 0.35)';
      limeAccent: '#CFFF04';
    };
    dark: {
      bgMain: '#121217';       // پس‌زمینه ریشه
      bgSurface: '#171822';    // سطح سایدبار و نوار بالا
      bgCard: '#1B1C2B';       // سطح کارت‌های جلسه و سرویس
      bgCardHover: '#24263A';
      borderSubtle: '#232530';
      borderCard: '#2E3148';
      textPrimary: '#FFFFFF';
      textSecondary: '#E1E2E6';
      textMuted: '#8A8D93';
    };
    light: {
      bgMain: '#F4F5FA';
      bgSurface: '#FFFFFF';
      bgCard: '#FFFFFF';
      borderSubtle: '#E0E2EC';
      textPrimary: '#1E1E2D';
      textSecondary: '#62657A';
    };
  };
  radius: {
    sm: '8px';
    md: '12px';
    lg: '16px';
    xl: '20px';
    capsule: '9999px';
  };
  shadows: {
    cardAmbient: '0 4px 18px 0 rgba(102, 108, 255, 0.12)';
    cardAmbientHover: '0 8px 26px 0 rgba(102, 108, 255, 0.22)';
    modalBackdrop: '0 20px 60px -15px rgba(0, 0, 0, 0.5)';
    stickyBar: '0 8px 30px rgba(0, 0, 0, 0.35)';
  };
  transitions: {
    themeCircularDuration: '700ms';
    themeEasing: 'cubic-bezier(0.22, 1, 0.36, 1)';
    springHover: 'cubic-bezier(0.34, 1.56, 0.64, 1)';
  };
}
```

---

## ۴. بخش چهارم: نگاشت نیازمندی‌ها به کامپوننت‌های فرانت‌اند

| شناسه نیازمندی | عنوان قابلیت | ماژول فرانت‌اند | وضعیت پیاده‌سازی |
| :--- | :--- | :--- | :---: |
| **FR-01** | هدر و ساعت زنده | `src/components/layout/Topbar.tsx` | ✔ تکمیل و عملیاتی |
| **FR-02** | ترنزیشن دایره‌ای تغییر تم | `src/App.tsx` + `src/index.css` | ✔ Native View Transition |
| **FR-03** | سایدبار جمع‌شونده | `src/components/layout/Sidebar.tsx` | ✔ انیمیشن ۷۸px / ۲۶۰px |
| **FR-04** | جستجوی سریع ۲۶ سرویس | `src/components/home/SearchModal.tsx` | ✔ با شورت‌کات کیبورد |
| **FR-05** | تقویم و کارت‌های جلسات | `src/views/CalendarView.tsx` | ✔ سایه محو + دکمه متقارن |
| **FR-06** | نوار صفحه‌بندی استیکی | `src/views/ProjectsView.tsx` | ✔ چسبنده پایین + منوی پاپ‌اور |
| **FR-07** | مدال کارنامه پروژه | `src/views/ProjectsView.tsx` | ✔ نمرات کیفیت و گیت |
| **FR-08** | اعلان‌ها و خط‌مشی‌ها | `src/views/NotificationsView.tsx` | ✔ مدیریت استیت خوانده‌شده |
| **FR-09** | ناوبری داک موبایل | `src/components/layout/BottomNavigation.tsx` | ✔ بهینه لمسی + Haptic |
| **NFR-04** | خروجی مستقل تک‌فایلی | `portal.html` | ✔ بیلد اینلاین ۷۹۰KB |

---

> این سند به عنوان مرجع رسمی فنی، معماری و ساختار داده پورتال الگونت ۳.۰ تدوین شده و در مخزن پروژه نگهداری می‌شود.
