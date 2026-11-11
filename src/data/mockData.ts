import {
  PortalService,
  WorkLogEntry,
  PortalProject,
  CalendarEvent,
  NotificationItem,
  SurveyItem,
  PolicyItem
} from '../types';

export const INITIAL_SERVICES: PortalService[] = [
  {
    id: "mail",
    code: "#SRV-101",
    title: "وب‌میل سازمانی الگونت (Mail)",
    englishName: "Algonet Mail",
    shortTitle: "وب‌میل سازمانی",
    category: "comm",
    categoryTitle: "ارتباطات و همکاری",
    description: "سامانه پست الکترونیک رسمی، پیام‌های داخلی و تقویم سازمانی",
    badgeText: "۴ نامه جدید",
    unreadCount: 4,
    pinned: true,
    needsAttention: true,
    uptime: "۹۹.۹۸٪",
    responseTime: "۱۸ms",
    ownerTeam: "واحد ارتباطات و امنیت شبکه",
    leadName: "مهندس سارا فرهمند",
    leadRole: "مدیر سرویس‌های پیام‌رسان",
    url: "https://mail.algonet.ir",
    accentColor: "#CFFF04",
    primaryMetric: { label: "نامه‌های خوانده‌نشده", value: "۴ پیام" },
    secondaryMetric: { label: "دعوت‌نامه‌های تقویم", value: "۳ جلسه امروز" },
    tertiaryMetric: { label: "فضای صندوق پستی", value: "۱۲.۴ از ۵۰ GB" },
    ctaLabel: "باز کردن وب‌میل",
    subItems: [
      {
        id: "m1",
        title: "گزارش معماری اسپرینت ۱۴ و بررسی امنیت",
        subtitle: "از: دکتر آرش رادمنش · ۲۰ دقیقه پیش",
        metric: "فوری",
        statusLabel: "نیاز به پاسخ",
        accent: "lime"
      },
      {
        id: "m2",
        title: "هماهنگی دیپلوی نسخه 4.2 پورتال الگونت",
        subtitle: "از: تیم DevOps · ۱ ساعت پیش",
        metric: "پیوست دارد",
        statusLabel: "خوانده‌نشده",
        accent: "indigo"
      },
      {
        id: "m3",
        title: "تأییدیه تایم‌شیت مهرماه ۱۴۰۵",
        subtitle: "از: واحد منابع انسانی · دیروز",
        metric: "تأیید شده",
        statusLabel: "آرشیو",
        accent: "neutral"
      }
    ]
  },
  {
    id: "chat",
    code: "#SRV-102",
    title: "پیام‌رسان مترموست / چت (Chat)",
    englishName: "Mattermost Chat",
    shortTitle: "پیام‌رسان مترموست",
    category: "comm",
    categoryTitle: "ارتباطات و همکاری",
    description: "کانال‌های ارتباط تیمی، گفتگوی درون سازمانی بین همکاران (Mattermost)",
    badgeText: "۷ منشن جدید",
    unreadCount: 7,
    pinned: true,
    needsAttention: true,
    uptime: "۹۹.۹۵٪",
    responseTime: "۱۲ms",
    ownerTeam: "پلتفرم همکاری تیمی الگونت",
    leadName: "کاوه شریفی",
    leadRole: "سرپرست زیرساخت همکاری",
    url: "https://chat.algonet.ir",
    accentColor: "#5F5CE1",
    primaryMetric: { label: "پیام‌های مستقیم و منشن", value: "۷ پیام" },
    secondaryMetric: { label: "کانال‌های فعال شما", value: "۱۸ کانال" },
    tertiaryMetric: { label: "همکاران آنلاین", value: "۶۴ نفر حاضر" },
    ctaLabel: "ورود به مترموست",
    subItems: [
      {
        id: "c1",
        title: "#core-platform-dev · بررسی کش ردیس",
        subtitle: "@s.bakhtiari لطفا PR شماره ۴۰۲ رو بررسی کن",
        metric: "۳ پیام جدید",
        statusLabel: "منشن مستقیم",
        accent: "lime"
      },
      {
        id: "c2",
        title: "#devops-alerts · وضعیت کلاستر پروداکشن",
        subtitle: "تمامی نودهای استیجینگ پایدار هستند",
        metric: "پایدار",
        statusLabel: "کانال فنی",
        accent: "indigo"
      },
      {
        id: "c3",
        title: "#town-square · اطلاعیه رویداد فصلی الگونت",
        subtitle: "ثبت‌نام کارگاه طراحی سیستم باز شد",
        metric: "همگانی",
        statusLabel: "اطلاعیه",
        accent: "orange"
      }
    ]
  },
  {
    id: "meet",
    code: "#SRV-103",
    title: "جلسات آنلاین و ویدئو کنفرانس (Meet)",
    englishName: "Algonet Meet",
    shortTitle: "جلسات آنلاین (Meet)",
    category: "comm",
    categoryTitle: "ارتباطات و همکاری",
    description: "اتاق‌های جلسه مجازی، اشتراک‌گذاری تصویر و وبینارهای آنلاین",
    badgeText: "جلسه ساعت ۱۷:۰۰",
    unreadCount: 1,
    pinned: false,
    needsAttention: false,
    uptime: "۹۹.۹۰٪",
    responseTime: "۲۴ms",
    ownerTeam: "واحد ارتباطات صوتی و تصویری",
    leadName: "نگار تابش",
    leadRole: "مهندس شبکه و استریم",
    url: "https://meet.algonet.ir",
    accentColor: "#FA5A14",
    primaryMetric: { label: "جلسه بعدی امروز", value: "۱۷:۰۰ عصر" },
    secondaryMetric: { label: "اتاق‌های فعال فعلی", value: "۵ اتاق زنده" },
    tertiaryMetric: { label: "کیفیت استریم WebRTC", value: "1080p HD" },
    ctaLabel: "پیوستن به اتاق جلسه",
    subItems: [
      {
        id: "mt1",
        title: "سینک روزانه تیم پلتفرم و فرانت‌اند",
        subtitle: "ساعت ۱۷:۰۰ · اتاق مجازی شماره ۳",
        metric: "۸ شرکت‌کننده",
        statusLabel: "آماده شروع",
        accent: "lime"
      },
      {
        id: "mt2",
        title: "دموی بازطراحی پورتال سازمانی الگونت",
        subtitle: "فردا ساعت ۱۱:۰۰ · اتاق اصلی طراحی",
        metric: "ارائه‌دهنده: شما",
        statusLabel: "رزرو شده",
        accent: "indigo"
      },
      {
        id: "mt3",
        title: "ضبط جلسه معماری میکروسرویس‌ها",
        subtitle: "برگزار شده در ۲ آبان ۱۴۰۵",
        metric: "۴۸ دقیقه",
        statusLabel: "ضبط شده",
        accent: "neutral"
      }
    ]
  },
  {
    id: "wiki",
    code: "#SRV-104",
    title: "ویکی و پایگاه دانش فنی (Wiki)",
    englishName: "Algonet Technical Wiki",
    shortTitle: "ویکی و پایگاه دانش",
    category: "comm",
    categoryTitle: "ارتباطات و همکاری",
    description: "مرجع مستندات، راهنماهای آنبوردینگ، فرآیندها و استانداردهای سازمان",
    badgeText: "۱۲۸ سند فنی",
    unreadCount: 0,
    pinned: false,
    needsAttention: false,
    uptime: "۱۰۰٪",
    responseTime: "۱۴ms",
    ownerTeam: "کمیته معماری و مستندسازی فنی",
    leadName: "سیاوش بختیاری",
    leadRole: "مشارکت‌کننده ارشد مستندات",
    url: "https://wiki.algonet.ir",
    accentColor: "#CFFF04",
    primaryMetric: { label: "مستندات به‌روزرسانی شده", value: "۱۲۸ مقاله" },
    secondaryMetric: { label: "مشارکت‌های شما", value: "۱۹ ویرایش" },
    tertiaryMetric: { label: "راهنمای دیزاین سیستم", value: "نسخه ۳.۰" },
    ctaLabel: "مشاهده پایگاه دانش",
    subItems: [
      {
        id: "w1",
        title: "استاندارد دیزاین سیستم الگونت (Diodrum & Palette)",
        subtitle: "کدهای رنگی #CFFF04، #5F5CE1، #FA5A14 و شعاع ۲۵px",
        metric: "مرجع طراحی",
        statusLabel: "تأیید شده",
        accent: "lime"
      },
      {
        id: "w2",
        title: "راهنمای استقرار سرویس‌ها روی DevSlot",
        subtitle: "مستندات کامل تنظیمات Docker و متغیرهای محیطی",
        metric: "فنی",
        statusLabel: "به‌روز",
        accent: "indigo"
      },
      {
        id: "w3",
        title: "چک‌لیست آنبوردینگ همکاران فنی جدید",
        subtitle: "دسترسی‌های GitLab، Mattermost و OpenProject",
        metric: "عمومی",
        statusLabel: "مرجع",
        accent: "neutral"
      }
    ]
  },
  {
    id: "pm",
    code: "#SRV-201",
    title: "مدیریت پروژه‌ها و تسک‌ها (PM)",
    englishName: "OpenProject PM",
    shortTitle: "مدیریت پروژه‌ها (PM)",
    category: "mgmt",
    categoryTitle: "مدیریت و امور سازمانی",
    description: "برنامه‌ریزی اسپرینت‌ها، بورد کانبان، پیگیری وظایف و کنترل پیشرفت پروژه (OpenProject)",
    badgeText: "۵ تسک در اسپرینت",
    unreadCount: 5,
    pinned: true,
    needsAttention: true,
    uptime: "۹۹.۹۴٪",
    responseTime: "۲۱ms",
    ownerTeam: "دفتر مدیریت پروژه (PMO)",
    leadName: "مهندس مونا کاظمی",
    leadRole: "اسکرام مستر ارشد",
    url: "https://pm.algonet.ir",
    accentColor: "#5F5CE1",
    primaryMetric: { label: "تسک‌های باز اسپرینت جاری", value: "۵ تسک فعال" },
    secondaryMetric: { label: "پیشرفت اسپرینت ۱۴", value: "۷۸٪ تکمیل" },
    tertiaryMetric: { label: "سرعت تیم (Velocity)", value: "۴۲ امتیاز" },
    ctaLabel: "باز کردن بورد OpenProject",
    subItems: [
      {
        id: "p1",
        title: "ALG-427 · بازطراحی رابط کاربری داشبورد پورتال",
        subtitle: "اسپرینت ۱۴ · اولویت بالا · زمان تخمینی: ۸ ساعت",
        metric: "در حال انجام",
        statusLabel: "برندینگ جدید",
        accent: "lime"
      },
      {
        id: "p2",
        title: "ALG-419 · یکپارچه‌سازی SSO با سرویس DevSlot",
        subtitle: "اسپرینت ۱۴ · در مرحله Code Review",
        metric: "۹۰٪",
        statusLabel: "در انتظار مرج",
        accent: "indigo"
      },
      {
        id: "p3",
        title: "ALG-408 · بهینه‌سازی کوئری‌های گزارش تایم‌شیت",
        subtitle: "اسپرینت ۱۴ · تست نهایی انجام شد",
        metric: "تکمیل",
        statusLabel: "انجام شده",
        accent: "neutral"
      }
    ]
  },
  {
    id: "time",
    code: "#SRV-202",
    title: "حضور و غیاب و تایم‌شیت (Time)",
    englishName: "Algonet Timesheet",
    shortTitle: "حضور و غیاب و تایم‌شیت",
    category: "mgmt",
    categoryTitle: "مدیریت و امور سازمانی",
    description: "ثبت ساعات کاری، درخواست مرخصی و مأموریت، گزارش کارکرد روزانه",
    badgeText: "۰۷:۴۵ امروز",
    unreadCount: 0,
    pinned: true,
    needsAttention: false,
    uptime: "۹۹.۹۹٪",
    responseTime: "۱۵ms",
    ownerTeam: "سرمایه انسانی و امور اداری",
    leadName: "بهرام توکلی",
    leadRole: "مسئول سیستم‌های کارکرد",
    url: "https://time.algonet.ir",
    accentColor: "#CFFF04",
    primaryMetric: { label: "کارکرد ثبت‌شده این ماه", value: "۱۴۸:۳۰ ساعت" },
    secondaryMetric: { label: "ورود امروز (۴ آبان)", value: "۰۸:۳۶ صبح" },
    tertiaryMetric: { label: "مانده مرخصی سالانه", value: "۱۱.۵ روز" },
    ctaLabel: "ثبت ساعت کاری جدید",
    subItems: [
      {
        id: "t1",
        title: "کارکرد امروز · دوشنبه ۴ آبان ۱۴۰۵",
        subtitle: "ورود: ۰۸:۳۶ · وضعیت: حاضر در شرکت",
        metric: "۰۷:۴۵ ساعت",
        statusLabel: "فعال",
        accent: "lime"
      },
      {
        id: "t2",
        title: "مجموع کارکرد هفته اول آبان ۱۴۰۵",
        subtitle: "۳۸ ساعت و ۱۵ دقیقه ثبت شده روی پروژه‌های فنی",
        metric: "۹۶٪ هدف",
        statusLabel: "تأیید شده",
        accent: "indigo"
      },
      {
        id: "t3",
        title: "سهمیه دورکاری ماه آبان",
        subtitle: "۲ روز استفاده شده از ۶ روز مجاز ماهانه",
        metric: "۴ روز باقی‌مانده",
        statusLabel: "قابل ثبت",
        accent: "orange"
      }
    ]
  },
  {
    id: "desk",
    code: "#SRV-203",
    title: "میز خدمت و پشتیبانی فنی (Desk)",
    englishName: "Algonet Service Desk",
    shortTitle: "میز خدمت و پشتیبانی (Desk)",
    category: "mgmt",
    categoryTitle: "مدیریت و امور سازمانی",
    description: "ثبت تیکت، درخواست‌های تجهیزات، شبکه و پشتیبانی سخت‌افزاری/نرم‌افزاری",
    badgeText: "۲ تیکت باز",
    unreadCount: 2,
    pinned: false,
    needsAttention: true,
    uptime: "۹۹.۹۲٪",
    responseTime: "۱۹ms",
    ownerTeam: "پشتیبانی فناوری اطلاعات (IT Helpdesk)",
    leadName: "پویا رستگار",
    leadRole: "سرپرست پشتیبانی فنی",
    url: "https://desk.algonet.ir",
    accentColor: "#FA5A14",
    primaryMetric: { label: "تیکت‌های باز شما", value: "۲ درخواست" },
    secondaryMetric: { label: "میانگین زمان رسیدگی", value: "۴۵ دقیقه" },
    tertiaryMetric: { label: "رضایت کاربران سرویس", value: "۹۸.۲٪" },
    ctaLabel: "ثبت تیکت پشتیبانی",
    subItems: [
      {
        id: "d1",
        title: "#DSK-904 · ارتقای رم و مانیتور دوم ایستگاه کاری",
        subtitle: "ثبت شده در ۲ آبان · در حال تأیید مدیر واحد",
        metric: "در جریان",
        statusLabel: "تجهیزات",
        accent: "orange"
      },
      {
        id: "d2",
        title: "#DSK-891 · تمدید گواهی VPN دسترسی خارج از شبکه",
        subtitle: "پاسخ داده شده توسط واحد امنیت شبکه",
        metric: "آماده تحویل",
        statusLabel: "پاسخ جدید",
        accent: "lime"
      },
      {
        id: "d3",
        title: "#DSK-840 · اختصاص دسترسی دیتابیس استیجینگ",
        subtitle: "بسته شده در ۲۸ مهر ۱۴۰۵",
        metric: "انجام شده",
        statusLabel: "بسته شده",
        accent: "neutral"
      }
    ]
  },
  {
    id: "git",
    code: "#SRV-301",
    title: "مخزن کد و گیت‌لب (Git)",
    englishName: "GitLab Enterprise",
    shortTitle: "مخزن کد و گیت‌لب (Git)",
    category: "devops",
    categoryTitle: "دوآپس و زیرساخت",
    description: "کنترل نسخه سورس کد، مرج رکوئست‌ها، بازبینی کد و مدیریت برنچ‌ها",
    badgeText: "۳ مرج ریکوئست",
    unreadCount: 3,
    pinned: true,
    needsAttention: true,
    uptime: "۹۹.۹۷٪",
    responseTime: "۱۱ms",
    ownerTeam: "مهندسی پلتفرم و DevOps",
    leadName: "سیاوش بختیاری",
    leadRole: "Maintainer ارشد مخازن",
    url: "https://git.algonet.ir",
    accentColor: "#FA5A14",
    primaryMetric: { label: "مرج ریکوئست‌های منتظر بازبینی", value: "۳ MR باز" },
    secondaryMetric: { label: "کامیت‌های این هفته شما", value: "۳۴ کامیت" },
    tertiaryMetric: { label: "مخازن فعال سازمانی", value: "۴۶ ریپازیتوری" },
    ctaLabel: "مشاهده مرج ریکوئست‌ها",
    subItems: [
      {
        id: "g1",
        title: "!402 · feat(portal): پیاده‌سازی دیزاین سیستم جدید الگونت",
        subtitle: "algonet/employee-portal · برنچ feature/redesign-v3",
        metric: "+۱,۴۲۰ -۳۱۰",
        statusLabel: "آماده مرج",
        accent: "lime"
      },
      {
        id: "g2",
        title: "!399 · fix(auth): بهینه‌سازی توکن‌های رفرش OAuth2",
        subtitle: "algonet/sso-gateway · منتظر تأیید شما",
        metric: "۲ تأییدیه",
        statusLabel: "نیاز به Review",
        accent: "orange"
      },
      {
        id: "g3",
        title: "!395 · chore(infra): ارتقای ایمیج پایه نود ۲۲",
        subtitle: "algonet/devops-templates · مرج شده در main",
        metric: "Merged",
        statusLabel: "منتشر شده",
        accent: "indigo"
      }
    ]
  },
  {
    id: "jenkins",
    code: "#SRV-302",
    title: "پایپ‌لاین CI/CD و اتوماسیون (Jenkins)",
    englishName: "Jenkins CI/CD Automation",
    shortTitle: "پایپ‌لاین CI/CD (Jenkins)",
    category: "devops",
    categoryTitle: "دوآپس و زیرساخت",
    description: "اتوماسیون بیلد، تست اتوماتیک و انتشار خودکار پروژه‌ها در محیط‌ها",
    badgeText: "۱۲ بیلد موفق",
    unreadCount: 0,
    pinned: false,
    needsAttention: false,
    uptime: "۹۹.۹۱٪",
    responseTime: "۲۸ms",
    ownerTeam: "تیم اتوماسیون و زیرساخت ابری",
    leadName: "امیرحسین نادری",
    leadRole: "مهندس ارشد SRE",
    url: "https://jenkins.algonet.ir",
    accentColor: "#CFFF04",
    primaryMetric: { label: "نرخ موفقیت بیلدهای امروز", value: "۹۶.۴٪ (۱۲/۱۲)" },
    secondaryMetric: { label: "میانگین زمان پایپ‌لاین", value: "۳ دقیقه و ۴۰ ثانیه" },
    tertiaryMetric: { label: "ورکرهای فعال بیلد", value: "۸ نود آماده" },
    ctaLabel: "اجرای پایپ‌لاین جدید",
    subItems: [
      {
        id: "j1",
        title: "Build #1772 · algonet-portal-production",
        subtitle: "تست‌های واحد، بیلد داکر و استقرار در کلاستر اصلی",
        metric: "۲ دقیقه و ۱۵ ثانیه",
        statusLabel: "موفق (SUCCESS)",
        accent: "lime"
      },
      {
        id: "j2",
        title: "Build #1771 · sso-gateway-staging",
        subtitle: "اجرای تست‌های یکپارچه‌سازی و اسکن امنیتی Sonar",
        metric: "۴ دقیقه و ۱۰ ثانیه",
        statusLabel: "موفق (SUCCESS)",
        accent: "indigo"
      },
      {
        id: "j3",
        title: "Build #1769 · billing-microservice-nightly",
        subtitle: "تست بار ترافیکی شبانه (Load Test)",
        metric: "۶ دقیقه",
        statusLabel: "پایدار",
        accent: "neutral"
      }
    ]
  },
  {
    id: "devslot",
    code: "#SRV-303",
    title: "محیط‌های توسعه و استیجینگ (DevSlot)",
    englishName: "Algonet DevSlot Cloud",
    shortTitle: "محیط‌های توسعه (DevSlot)",
    category: "devops",
    categoryTitle: "دوآپس و زیرساخت",
    description: "اسلات‌های ابری توسعه‌دهندگان، محیط‌های پیش‌نمایش و سرورهای تست",
    badgeText: "۳ اسلات فعال",
    unreadCount: 1,
    pinned: false,
    needsAttention: false,
    uptime: "۹۹.۹۶٪",
    responseTime: "۱۶ms",
    ownerTeam: "مهندسی ابر خصوصی الگونت",
    leadName: "سیاوش بختیاری",
    leadRole: "معمار زیرساخت ابری",
    url: "https://devslot.algonet.ir",
    accentColor: "#5F5CE1",
    primaryMetric: { label: "اسلات‌های ابری فعال شما", value: "۳ محیط روشن" },
    secondaryMetric: { label: "مصرف منابع کلاستر", value: "۱۲ هسته / ۳۲ GB" },
    tertiaryMetric: { label: "محیط پیش‌نمایش فعلی", value: "slot-siavash-01" },
    ctaLabel: "مدیریت اسلات‌های ابری",
    subItems: [
      {
        id: "ds1",
        title: "slot-siavash-portal-v3.devslot.local",
        subtitle: "محیط پیش‌نمایش زنده بازطراحی پورتال الگونت · Node 22",
        metric: "CPU 24% · RAM 1.8GB",
        statusLabel: "آنلاین (Running)",
        accent: "lime"
      },
      {
        id: "ds2",
        title: "slot-siavash-api-gateway.devslot.local",
        subtitle: "محیط تست میکروسرویس احراز هویت و Redis 7",
        metric: "CPU 12% · RAM 1.1GB",
        statusLabel: "آنلاین (Running)",
        accent: "indigo"
      },
      {
        id: "ds3",
        title: "staging-qa-cluster-04.devslot.local",
        subtitle: "محیط مشترک تست تیم QA برای اسپرینت ۱۴",
        metric: "CPU 41% · RAM 6.4GB",
        statusLabel: "پایدار",
        accent: "orange"
      }
    ]
  }
];

export const CURRENT_USER = {
  name: "سیاوش بختیاری",
  englishName: "Siavash Bakhtiari",
  username: "s.bakhtiari",
  personnelCode: "ALG-1402-89",
  role: "مهندس ارشد نرم‌افزار، زیرساخت و معمار سیستم",
  department: "فناوری اطلاعات و پلتفرم ابری الگونت",
  email: "s.bakhtiari@algonet.ir",
  phone: "۰۲۱-۸۸۹۴۲۱۰۰ (داخلی ۴۱۲)",
  location: "تهران، ساختمان مرکزی الگونت · طبقه ۴",
  manager: "دکتر آرش رادمنش",
  joinDate: "۱۴ شهریور ۱۴۰۱",
  initials: "S",
  avatarColor: "#666cff"
};

export const INITIAL_WORKLOGS: WorkLogEntry[] = [
  {
    id: "wl-1",
    date: "۱۴۰۵/۰۸/۰۴",
    projectTitle: "بازطراحی داشبورد پورتال الگونت (ALG-427)",
    hours: 7.75,
    status: "approved",
    description: "پیاده‌سازی سیستم طراحی جدید با پالت رنگی #CFFF04 و کامپوننت‌های تعاملی"
  },
  {
    id: "wl-2",
    date: "۱۴۰۵/۰۸/۰۳",
    projectTitle: "بهینه‌سازی گیت‌لب و پایپ‌لاین CI/CD",
    hours: 8.50,
    status: "approved",
    description: "کاهش زمان بیلد داکر و تنظیم کش لایه‌ها در Jenkins"
  },
  {
    id: "wl-3",
    date: "۱۴۰۵/۰۸/۰۲",
    projectTitle: "معماری اسلات‌های ابری DevSlot",
    hours: 8.00,
    status: "approved",
    description: "تنظیم روتینگ داینامیک برای محیط‌های پیش‌نمایش توسعه‌دهندگان"
  }
];

export const INITIAL_PROJECTS: PortalProject[] = [
  {
    id: "p-1",
    code: "ALG-PORTAL-V3",
    name: "پورتال جامع سازمانی الگونت (نسخه ۳)",
    role: "معمار فرانت‌اند و سیستم طراحی",
    progress: 86,
    sprint: "اسپرینت ۱۴ (آبان ۱۴۰۵)",
    openTasks: 3,
    completedTasks: 24,
    status: "on-track",
    teamMembers: [
      { name: "سیاوش بختیاری", initials: "سب", color: "#CFFF04" },
      { name: "مونا کاظمی", initials: "مک", color: "#5F5CE1" },
      { name: "کاوه شریفی", initials: "کش", color: "#FA5A14" }
    ]
  },
  {
    id: "p-2",
    code: "ALG-DEVSLOT-CLOUD",
    name: "زیرساخت اسلات‌های ابری توسعه‌دهندگان (DevSlot)",
    role: "مهندس ارشد زیرساخت و DevOps",
    progress: 92,
    sprint: "اسپرینت ۱۴ (آبان ۱۴۰۵)",
    openTasks: 2,
    completedTasks: 31,
    status: "review",
    teamMembers: [
      { name: "سیاوش بختیاری", initials: "سب", color: "#CFFF04" },
      { name: "امیرحسین نادری", initials: "ان", color: "#5F5CE1" }
    ]
  },
  {
    id: "p-3",
    code: "ALG-SSO-CORE",
    name: "درگاه احراز هویت یکپارچه سازمانی (CAS / OAuth2)",
    role: "توسعه‌دهنده بک‌اند و امنیت",
    progress: 74,
    sprint: "اسپرینت ۱۴ (آبان ۱۴۰۵)",
    openTasks: 5,
    completedTasks: 18,
    status: "on-track",
    teamMembers: [
      { name: "سیاوش بختیاری", initials: "سب", color: "#CFFF04" },
      { name: "سارا فرهمند", initials: "سف", color: "#FA5A14" },
      { name: "پویا رستگار", initials: "پر", color: "#5F5CE1" }
    ]
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "ev-1",
    title: "جلسه روزانه استندآپ تیم پلتفرم الگونت",
    time: "۱۰:۰۰ - ۱۰:۳۰",
    dateLabel: "امروز · ۴ آبان ۱۴۰۵",
    room: "اتاق مجازی Meet #3",
    type: "sprint",
    organizer: "مونا کاظمی"
  },
  {
    id: "ev-2",
    title: "بازبینی طراحی رابط کاربری جدید پورتال (UI Review)",
    time: "۱۷:۰۰ - ۱۸:۰۰",
    dateLabel: "امروز · ۴ آبان ۱۴۰۵",
    room: "اتاق کنفرانس طبقه ۴ / Meet #1",
    type: "review",
    organizer: "سیاوش بختیاری"
  },
  {
    id: "ev-3",
    title: "انتشار نسخه ۴.۲ روی کلاستر پروداکشن",
    time: "۲۱:۰۰ - ۲۲:۰۰",
    dateLabel: "چهارشنبه · ۶ آبان ۱۴۰۵",
    room: "کانال #devops-release در Mattermost",
    type: "deployment",
    organizer: "امیرحسین نادری"
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "مرج ریکوئست !402 در گیت‌لب تأیید شد",
    serviceName: "مخزن کد و گیت‌لب (Git)",
    timeAgo: "۱۰ دقیقه پیش",
    read: false,
    priority: "high",
    description: "کاوه شریفی تغییرات برنچ feature/redesign-v3 را تأیید کرد و پایپ‌لاین بیلد #1772 با موفقیت اجرا شد."
  },
  {
    id: "notif-2",
    title: "پاسخ جدید روی تیکت #DSK-891 (گواهی VPN)",
    serviceName: "میز خدمت و پشتیبانی فنی (Desk)",
    timeAgo: "۴۵ دقیقه پیش",
    read: false,
    priority: "high",
    description: "پروفایل دسترسی امن شما برای ۳ ماه آینده تمدید شد."
  },
  {
    id: "notif-3",
    title: "یادآوری ثبت تایم‌شیت هفته اول آبان",
    serviceName: "حضور و غیاب و تایم‌شیت (Time)",
    timeAgo: "۲ ساعت پیش",
    read: true,
    priority: "normal",
    description: "کارکرد روزانه شما تا ساعت ۱۶:۲۰ به میزان ۰۷:۴۵ ساعت ثبت شده است."
  }
];

export const INITIAL_SURVEYS: SurveyItem[] = [
  {
    id: "srv-1",
    title: "نظرسنجی تجربه کاربری نسخه جدید پورتال سازمانی الگونت",
    deadline: "۱۰ آبان ۱۴۰۵",
    questionsCount: 8,
    estimatedMinutes: 3,
    completed: false,
    department: "تیم محصول و دیزاین سیستم"
  },
  {
    id: "srv-2",
    title: "ارزیابی کیفیت محیط‌های ابری DevSlot و سرعت پایپ‌لاین CI/CD",
    deadline: "۱۵ آبان ۱۴۰۵",
    questionsCount: 12,
    estimatedMinutes: 5,
    completed: false,
    department: "واحد دوآپس و زیرساخت"
  },
  {
    id: "srv-3",
    title: "رضایت‌سنجی خدمات رفاهی و دورکاری پاییز ۱۴۰۵",
    deadline: "۳۰ مهر ۱۴۰۵",
    questionsCount: 10,
    estimatedMinutes: 4,
    completed: true,
    department: "سرمایه انسانی"
  }
];

export const INITIAL_POLICIES: PolicyItem[] = [
  {
    id: "pol-1",
    code: "POL-SEC-01",
    title: "آیین‌نامه امنیت اطلاعات، احراز هویت دو مرحله‌ای و استفاده از VPN",
    category: "امنیت و زیرساخت",
    updatedAt: "مهر ۱۴۰۵",
    summary: "الزام استفاده از توکن سخت‌افزاری یا OTP برای دسترسی به مخازن GitLab، سرورهای Jenkins و اسلات‌های DevSlot.",
    acknowledged: true
  },
  {
    id: "pol-2",
    code: "POL-HR-04",
    title: "شیوه‌نامه ساعت کاری منعطف، دورکاری و ثبت تایم‌شیت",
    category: "منابع انسانی",
    updatedAt: "آبان ۱۴۰۵",
    summary: "ساعت حضور هسته از ۰۹:۳۰ الی ۱۶:۰۰ بوده و هر همکار مجاز به استفاده از حداکثر ۶ روز دورکاری در ماه با هماهنگی مدیر مستقیم است.",
    acknowledged: true
  },
  {
    id: "pol-3",
    code: "POL-ENG-02",
    title: "استاندارد بازبینی کد (Code Review) و استقرار مستمر در الگونت",
    category: "مهندسی نرم‌افزار",
    updatedAt: "آبان ۱۴۰۵",
    summary: "هر Merge Request پیش از ادغام در شاخه اصلی نیازمند حداقل ۱ تأییدیه فنی، عبور از تست‌های واحد و رعایت اصول دیزاین سیستم است.",
    acknowledged: false
  }
];

export const PORTFOLIO_KPIS = [
  {
    id: "kpi-1",
    value: "۴۲",
    title: "مرج ریکوئست فعال",
    subtitle: "در سه ماهه پاییز ۱۴۰۵ با نرخ تأیید ۹۸٪ در Code Review",
    accent: "lime"
  },
  {
    id: "kpi-2",
    value: "نسل ۳",
    title: "معمار پورتال الگونت",
    subtitle: "طراحی و پیاده‌سازی دیزاین سیستم جدید الگونت بر اساس ۵ رنگ برند",
    accent: "indigo"
  },
  {
    id: "kpi-3",
    value: "۹۹.۹۶٪",
    title: "آپتایم زیرساخت ابری",
    subtitle: "پایداری اسلات‌های ابری DevSlot و پایپ‌لاین‌های اتوماسیون Jenkins",
    accent: "orange"
  }
];

export const SKILLS_LIST = [
  { name: "Architecture & Microservices", category: "arch", level: "Senior / Lead" },
  { name: "TypeScript / React / Node.js", category: "frontend", level: "Expert" },
  { name: "Kubernetes & GitLab CI/CD", category: "devops", level: "Advanced" },
  { name: "Distributed Systems & Redis", category: "arch", level: "Advanced" },
  { name: "Cloud Infrastructure (DevSlot)", category: "devops", level: "Architect" },
  { name: "Keycloak SSO & OAuth2 / OpenID", category: "security", level: "Specialist" }
];
