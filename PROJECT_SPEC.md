# پورتال یکپارچه سازمانی الگونت ۳.۰ (Algonet Enterprise Portal v3.0)
> **سند مشخصات فنی فرانت‌اند، دیزاین سیستم و هندآف توسعه‌دهندگان (Developer Handoff Specification)**
> نسخه: ۳.۲.۰ — تاریخ انتشار: ۲۷ آبان ۱۴۰۵ — تیم محصول و دیزاین سیستم الگونت

---

## 📑 فهرست مطالب
1. [معرفی و اهداف پورتال](#۱-معرفی-و-اهداف-پورتال)
2. [پشته فناوری‌ها (Tech Stack)](#۲-پشته-فناوریها-tech-stack)
3. [دیزاین سیستم و توکن‌ها (Design System Tokens)](#۳-دیزاین-سیستم-و-توکنها-design-system-tokens)
4. [ماتریس کامپوننت‌ها و استیت‌ها (Component Matrix)](#۴-ماتریس-کامپوننتها-و-استیتها-component-matrix)
5. [اسپک‌های رفتاری و تعاملات (Behavioral Specs)](#۵-اسپکهای-رفتاری-و-تعاملات-behavioral-specs)
6. [بومی‌سازی فارسی و راست‌به‌چپ (RTL & Persian Localization)](#۶-بومیسازی-فارسی-و-راستبهچپ-rtl--persian-localization)
7. [فهرست ۲۶ سرویس تخصصی الگونت (Services Catalog)](#۷-فهرست-۲۶-سرویس-تخصصی-الگونت-services-catalog)
8. [فلوهای کاربری و معماری اطلاعات (User Flows & IA)](#۸-فلوهای-کاربری-و-معماری-اطلاعات-user-flows--ia)
9. [ساختار پوشه‌بندی پروژه (Folder Architecture)](#۹-ساختار-پوشهبندی-پروژه-folder-architecture)
10. [دستورات راه‌اندازی و بیلد تک‌صفحه‌ای (Scripts & Build)](#۱۰-دستورات-راهاندازی-و-بیلد-تکصفحهای-scripts--build)

---

## ۱. معرفی و اهداف پورتال
پورتال الگونت ۳.۰ درگاه متمرکز ورود و مدیریت دسترسی پرسنل سازمان، مهندسان داده، توسعه‌دهندگان و مدیران به ۲۶ سامانه تخصصی، پلتفرم‌های ابری، جلسات آنلاین، کارنامه اسپرینت‌ها، پرسشنامه‌ها و اسناد امنیتی است.

### اهداف کلیدی:
- **یکپارچه‌سازی تجربه کاربری (Unified UX):** حذف پراکندگی ابزارها و ایجاد داشبورد متمرکز با هویت بصری مدرن.
- **عملکرد سریع (Lightning Fast):** زمان لود اولیه زیر ۱ ثانیه، معماری بدون سربار و جستجوی سراسری لحظه‌ای (`⌘K` / `ESC`).
- **خوانایی و کنتراست بالا:** بوم زمینه تیره ضدخستگی چشم برای کارهای طولانی‌مدت با آیکون‌های وکتور سه‌بعدی لایه‌ای.
- **خروجی مستقل (Single-Page Standalone):** امکان بیلد کل سامانه در قالب یک فایل منفرد `portal.html` بدون وابستگی به سرور خارجی.

---

## ۲. پشته فناوری‌ها (Tech Stack)
| بخش | فناوری | نسخه | کاربرد |
| :--- | :--- | :--- | :--- |
| **Core Framework** | React | 18.3.1 | ساختار کامپوننت‌محور و مدیریت State |
| **Language** | TypeScript | 5.5+ | تایپ‌سیفتی کامل و اینترفیس‌های ساختاریافته |
| **CSS Utility** | Tailwind CSS | 3.4.1 | استایل‌دهی مدرن با توکن‌های کاستوم |
| **Build Tool** | Vite | 5.4.21 | باندلینگ پرسرعت HMR |
| **Singlefile Plugin**| vite-plugin-singlefile | 2.1.0 | اینلاین‌سازی ۱۰۰٪ اسکریپت‌ها، CSS و SVGها |
| **Icons** | Lucide React + Custom 3D SVGs | 0.460.0 | آیکون‌های سیستمی و وکتورهای ۲۶ سرویس |
| **Typography** | Vazirmatn | Variable | تایپوگرافی رسمی بهینه فارسی |

---

## ۳. دیزاین سیستم و توکن‌ها (Design System Tokens)

### ۳.۱ توکن‌های رنگی (Color Tokens)
```css
:root {
  /* Brand Primary */
  --color-primary: #666cff;        /* بنفش اصلی الگونت */
  --color-primary-hover: #5b60e6;  /* بنفش هاور */
  --color-primary-active: #555ae6; /* بنفش حالت کلیک/فشرده */
  --color-primary-tint: #f0eaff;   /* لایت تینت */
  --color-primary-dark-tint: #282a3f;

  /* Surfaces & Canvas (Dark Mode) */
  --bg-canvas: #0d0e11;            /* پس‌زمینه اصلی اپلیکیشن */
  --bg-card: #121217;              /* سطح کارت‌ها */
  --bg-secondary: #1b1c2b;         /* سطح سایدبار، پاپ‌آپ و مودال */
  --bg-elevated: #24263a;          /* سطح مرتفع در هاور */

  /* Borders */
  --border-subtle: #232530;        /* حاشیه نرم کارت‌ها */
  --border-focus: #3d4059;         /* حاشیه فوکوس فیلدها */

  /* Semantics */
  --color-success: #28c76f;        /* موفقیت / تکمیل‌شده */
  --color-warning: #ff9f43;        /* هشدار / در انتظار */
  --color-danger: #ea5455;         /* خطا / لغو */
  --color-info: #00cfe8;           /* اطلاع‌رسانی */
}
```

### ۳.۲ شعاع گوشه‌ها (Border Radius)
- `rounded-md`: **6px** — تگ‌ها، نشان‌های کوچک
- `rounded-xl`: **12px** — دکمه‌ها، فیلدهای ورودی
- `rounded-2xl`: **18px** — کارت جلسات، پاپ‌اورها
- `rounded-[28px]`: **28px** — کارت‌های پروژه‌ها و پنل‌های اصلی
- `rounded-full`: **9999px** — دکمه‌های کپسولی، چیپ وضعیت، آواتارها

### ۳.۳ سایه‌ها و درخشش رنگی (Elevation & Glow)
- **Card Ambient Glow:** `box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 0 15px -3px rgba(102, 108, 255, 0.08);`
- **Button Brand Glow:** `box-shadow: 0 8px 24px rgba(102, 108, 255, 0.35);`
- **Modal Depth:** `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);`

### ۳.۴ تایپوگرافی (Typography Scale)
- **Display:** `32px / 44px` — وزن Black (900)
- **Heading 1:** `24px / 36px` — وزن Bold (700)
- **Heading 2:** `19px / 28px` — وزن SemiBold (600)
- **Heading 3:** `16px / 24px` — وزن Medium (500)
- **Body Large:** `14px / 22px` — وزن Regular (400)
- **Caption / Meta:** `11.5px / 18px` — وزن Medium (500)
- **Code:** `12px / 18px` — Monospace ('Fira Code')

---

## ۴. ماتریس کامپوننت‌ها و استیت‌ها (Component Matrix)

### استیت‌های دکمه‌ها (Button States)
| استیت | استایل و ظاهر | کد کلاسی Tailwind |
| :--- | :--- | :--- |
| **Default** | بنفش برند با متن سفید خوانا | `bg-[#666cff] text-white shadow-md` |
| **Hover** | بنفش روشن‌تر با ترنزیشن مقیاس ۱۰۲٪ | `bg-[#5b60e6] text-white scale-[1.02]` |
| **Active / Pressed** | بنفش تیره‌تر با فشرده شدن ۹۸٪ | `bg-[#555ae6] scale-[0.98]` |
| **Loading** | اسپینر چرخشی درون‌دکمه، مکان‌نما wait | `bg-[#666cff]/80 cursor-wait` |
| **Disabled** | اوپاسیتی ۳۰٪، غیرقابل کلیک | `opacity-30 cursor-not-allowed pointer-events-none` |
| **Error / Danger** | قرمز سیستمی برای حذف یا لغو | `bg-[#ea5455] text-white` |

---

## ۵. اسپک‌های رفتاری و تعاملات (Behavioral Specs)
چیزی که فیگما به صورت ایستا نشان نمی‌دهد:

1. **حالت‌های سیستمی (System States):**
   - **Empty State:** زمان جستجوی بدون نتیجه یا تقویم بدون جلسه، آیکون خطی خنثی با راهنمای دوستانه و دکمه ترغیب‌کننده نمایش داده می‌شود.
   - **Loading State:** در حین فچ داده‌ها از اسکلتون متحرک شیمر (`animate-shimmer`) استفاده می‌شود تا از پرش صفحه جلوگیری گردد.
   - **Error State:** فیلدهای نامعتبر حاشیه قرمز `#ea5455` و خطاهای شبکه پیام Toast شناور ۴ ثانیه‌ای با دکمه Retry دارند.

2. **اعتبارسنجی فرم‌ها (Validation Rules):**
   - **عنوان جلسه:** حداقل ۳ و حداکثر ۶۰ کاراکتر.
   - **ایمیل پرسنلی:** الزامی بودن فرمت `@algonet.ir`.
   - **تاریخ و ساعت:** جلوگیری از انتخاب زمان‌های گذشته.

3. **زمان‌بندی انیمیشن‌ها (Motion Curves):**
   - میکروتعاملات هاور: `150ms ease-out`
   - ورود مودال‌ها و دراورها: `250ms cubic-bezier(0.16, 1, 0.3, 1)`
   - تغییر اندازه سایدبار: `300ms cubic-bezier(0.4, 0, 0.2, 1)`

4. **مدیریت محتوای طولانی و ریسپانسیو:**
   - عناوین کارت‌ها دارای کلاس `truncate` همراه با ویژگی `title` بومی برای نمایش کامل در هاور هستند.
   - توضیحات سرویس‌ها و پروژه‌ها محدود به دو سطر با `line-clamp-2` می‌باشند.

---

## ۶. بومی‌سازی فارسی و راست‌به‌چپ (RTL & Persian Localization)
- **چینش راست‌به‌چپ (RTL First):** استفاده از ویژگی‌های منطقی جهت در CSS (`dir="rtl"`).
- **قوانین آیکون‌های جهت‌دار:**
  - فلش‌های ناوبری قبلی/بعدی تقویم و چورون‌های بازشدن منو در RTL معکوس (Flip) می‌شوند.
  - آیکون‌های ساعت، جستجو، تیک تأیید و دانلود در هر دو حالت یکسان باقی می‌مانند.
- **تبدیل اعداد:** تمام اعداد تاریخ، درصد پیشرفت و مبالغ به ارقام رسمی فارسی تبدیل می‌گردند:
  ```js
  const toPersianDigits = (str) => String(str).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  ```
- **تقویم شمسی:** آغاز هفته از شنبه و تعطیلی روز جمعه با رنگ متمایز.

---

## ۷. فهرست ۲۶ سرویس تخصصی الگونت (Services Catalog)
| ردیف | شناسه (ID) | نام فارسی سرویس | دسته‌بندی | فرمت آیکون |
| :---: | :--- | :--- | :--- | :---: |
| ۱ | `airflow` | ایرفلو (Airflow) | داده و هوش مصنوعی | SVG / PNG |
| ۲ | `algoteria` | الگوتریا (AlgoTeria) | سرویس‌های اصلی | SVG / PNG |
| ۳ | `bazafarini` | بازآفرینی داده‌ها | سرویس‌های اصلی | SVG / PNG |
| ۴ | `desk` | الگودسک (AlgoDesk) | ارتباطی و اداری | SVG / PNG |
| ۵ | `devslot` | دواسلات (DevSlot) | دواپس و زیرساخت | SVG / PNG |
| ۶ | `general` | سرویس عمومی | سرویس‌های اصلی | SVG / PNG |
| ۷ | `gitlab` | گیت‌لب سازمانی (GitLab) | دواپس و زیرساخت | SVG / PNG |
| ۸ | `headlamp` | هدلمپ کوبرنتیز (Headlamp) | دواپس و زیرساخت | SVG / PNG |
| ۹ | `iceberg` | آیسبرگ داده (Iceberg) | داده و هوش مصنوعی | SVG / PNG |
| ۱۰ | `jitsi` | میت سازمانی (Jitsi Meet) | ارتباطی و اداری | SVG / PNG |
| ۱۱ | `kubeflow` | کیوب‌فلو (Kubeflow) | داده و هوش مصنوعی | SVG / PNG |
| ۱۲ | `labelstudio` | لیبل‌استودیو (Label Studio) | داده و هوش مصنوعی | SVG / PNG |
| ۱۳ | `lakefs` | لیک‌اف‌اس (lakeFS) | داده و هوش مصنوعی | SVG / PNG |
| ۱۴ | `leili` | سامانه لیلی (Leili) | سرویس‌های اصلی | SVG / PNG |
| ۱۵ | `mail` | ایمیل سازمانی (Webmail) | ارتباطی و اداری | SVG / PNG |
| ۱۶ | `mattermost` | پیام‌رسان مترموست (Chat) | ارتباطی و اداری | SVG / PNG |
| ۱۷ | `mlflow` | ام‌ال‌فلو (MLflow) | داده و هوش مصنوعی | SVG / PNG |
| ۱۸ | `nessie` | نسّی لیک‌هاوس (Nessie) | داده و هوش مصنوعی | SVG / PNG |
| ۱۹ | `nextcloud` | فضای ابری نکست‌کلود | ارتباطی و اداری | SVG / PNG |
| ۲۰ | `nexus` | نکسوس (Nexus Repo) | دواپس و زیرساخت | SVG / PNG |
| ۲۱ | `openmetadata` | کاتالوگ متادیتا (OpenMetadata) | داده و هوش مصنوعی | SVG / PNG |
| ۲۲ | `openproject` | مدیریت پروژه (OpenProject) | ارتباطی و اداری | SVG / PNG |
| ۲۳ | `ranger` | آپاچی رنجر (Apache Ranger) | دواپس و زیرساخت | SVG / PNG |
| ۲۴ | `spark` | آپاچی اسپارک (Apache Spark) | داده و هوش مصنوعی | SVG / PNG |
| ۲۵ | `time` | تایم‌شیت و مرخصی (TimeSheet) | ارتباطی و اداری | SVG / PNG |
| ۲۶ | `wikijs` | ویکی دانش سازمانی (Wiki.js) | ارتباطی و اداری | SVG / PNG |

---

## ۸. فلوهای کاربری و معماری اطلاعات (User Flows & IA)
```
[ احراز هویت یکپارچه SSO / 2FA ]
               │
               ▼
   [ شل و داشبورد اصلی پورتال ]
   ├── تاپ‌بار: پروفایل، وضعیت آنلاین، اعلان‌ها
   ├── سایدبار: جمع‌شونده (280px <-> 78px)
   └── پاپ‌آپ سرچ سراسری (کلید ESC / ⌘K)
               │
   ┌───────────┼───────────┬───────────┬───────────┐
   ▼           ▼           ▼           ▼           ▼
[سرویس‌ها]   [پروژه‌ها]   [تقویم]    [پرسشنامه‌ها]  [پالیسی‌ها]
۲۶ ابزار ۳D   اسپرینت     جلسات Meet    نظرسنجی     امضای دیجیتال
```

---

## ۹. ساختار پوشه‌بندی پروژه (Folder Architecture)
```text
algonet-portal/
├── public/
│   ├── assets/              # تصاویر، لوگوها و فاویکون
│   ├── fonts/               # فونت‌های Vazirmatn
│   └── icons/               # آیکون‌های وکتور dark و light
├── src/
│   ├── assets/              # دارایی‌های اینلاین بیلد
│   ├── components/
│   │   ├── common/          # AlgonetLogo, Button, Modal, Badge
│   │   ├── home/            # Service3DIcon, SearchModal, Hero
│   │   └── calendar/        # MonthGrid, CreateMeetingModal
│   ├── views/               # HomeView, CalendarView, ProjectsView
│   ├── App.tsx              # روتینگ تب‌ها و شل برنامه
│   ├── main.tsx             # مدخل رندرینگ ری‌اکت
│   └── vite-env.d.ts        # تعاریف تایپ‌های Vite و SVG
├── handoff.html             # سند اختصاصی هندآف فیگما (Dev Mode)
├── portal.html              # خروجی نهایی تک‌صفحه‌ای Standalone
├── package.json             # پکیج‌ها و اسکریپت‌ها
├── tailwind.config.js       # پیکربندی تم و رنگ‌های برند
├── tsconfig.json            # تنظیمات تایپ‌اسکریپت
└── vite.config.ts           # تنظیمات بیلد و viteSingleFile
```

---

## ۱۰. دستورات راه‌اندازی و بیلد تک‌صفحه‌ای (Scripts & Build)
```bash
# نصب پکیج‌ها
npm install

# اجرای سرور توسعه محلی (Hot Reload)
npm run dev

# ساخت بیلد تک‌صفحه‌ای مستقل (Single-Page HTML Standalone)
npm run build
```
خروجی بیلد در مسیر `dist/index.html` و `portal.html` تولید می‌شود که حاوی تمامی اسکریپت‌ها، استایل‌ها، فونت‌ها و ۲۶ آیکون به صورت Data URI بوده و بدون وب‌سرور قابل اجراست.
