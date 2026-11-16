import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { toPersianDigits } from '../../utils/formatters';
import { Service3DIcon } from './Service3DIcon';
import { Layers, X, ChevronDown, ChevronUp, Filter, Star, Search } from 'lucide-react';

export type ServiceCategory =
  | 'all'
  | 'general-services'
  | 'company-projects'
  | 'idp'
  | 'data-ml';

export interface PortalServiceItem {
  id: string;
  englishName: string;
  persianTitle: string;
  role: string;
  category: Exclude<ServiceCategory, 'all'>;
  categoryTitle: string;
  description: string;
  url: string;
  iconName: string;
}

export interface CategorySectionDef {
  id: Exclude<ServiceCategory, 'all'>;
  title: string;
  persianSub: string;
}

// Portal Services Definitions - Algonet (Order matches the official portal view)
export const CATEGORY_SECTIONS: CategorySectionDef[] = [
  { id: 'data-ml', title: 'Data & ML Platform', persianSub: 'پلتفرم داده و هوش مصنوعی' },
  { id: 'company-projects', title: 'Company Projects', persianSub: 'پروژه‌های سازمانی' },
  { id: 'general-services', title: 'General Services', persianSub: 'سرویس‌های عمومی' },
  { id: 'idp', title: 'Internal Development Platform (IDP)', persianSub: 'پلتفرم توسعه داخلی' }
];

export const ALL_SERVICES: PortalServiceItem[] = [
  // =========================================================================
  // ۱. Data & ML Platform (پلتفرم داده و هوش مصنوعی - ۱۰ سرویس)
  // =========================================================================
  {
    id: 'airflow',
    englishName: 'Airflow',
    persianTitle: 'ارکستراسیون ایرفلو',
    role: 'Data Pipeline Orchestration',
    category: 'data-ml',
    categoryTitle: 'Data & ML Platform',
    description: 'سامانه مدیریت و ارکستراسیون پایپ‌لاین‌های داده و جریان‌های کاری ETL',
    url: 'https://airflow.algonet.ir',
    iconName: 'airflow.svg'
  },
  {
    id: 'iceberg',
    englishName: 'Iceberg',
    persianTitle: 'کاتالوگ داده آیسبرگ',
    role: 'Data Lake Table Format',
    category: 'data-ml',
    categoryTitle: 'Data & ML Platform',
    description: 'مدیریت فرمت جداول دریاچه داده (Lakehouse)، متادیتا و ذخیره‌سازی',
    url: 'https://iceberg.algonet.ir',
    iconName: 'iceberg.svg'
  },
  {
    id: 'kubeflow',
    englishName: 'Kubeflow',
    persianTitle: 'پلتفرم یادگیری ماشین کیوب‌فلو',
    role: 'ML Workflow & Model Training',
    category: 'data-ml',
    categoryTitle: 'Data & ML Platform',
    description: 'پلتفرم تخصصی جریان‌های یادگیری ماشین و آموزش مدل‌های هوش مصنوعی',
    url: 'https://kubeflow.algonet.ir',
    iconName: 'general.svg'
  },
  {
    id: 'labelstudio',
    englishName: 'Labelstudio',
    persianTitle: 'برچسب‌گذاری داده',
    role: 'Data Labeling',
    category: 'data-ml',
    categoryTitle: 'Data & ML Platform',
    description: 'سکوی برچسب‌گذاری داده‌ها و آماده‌سازی برای مدل‌های یادگیری ماشین',
    url: 'https://labelstudio.algonet.ir',
    iconName: 'labelstudio.svg'
  },
  {
    id: 'mlflow',
    englishName: 'Mlflow',
    persianTitle: 'مدیریت مدل ام‌ال‌فلو',
    role: 'ML Lifecycle Management',
    category: 'data-ml',
    categoryTitle: 'Data & ML Platform',
    description: 'مدیریت چرخه حیات مدل‌های هوش مصنوعی، رهگیری آزمایش‌ها و استقرار',
    url: 'https://mlflow.algonet.ir',
    iconName: 'general.svg'
  },
  {
    id: 'nessie',
    englishName: 'Nessie',
    persianTitle: 'کاتالوگ لیک‌هاوس نسی',
    role: 'Data Lakehouse Catalog',
    category: 'data-ml',
    categoryTitle: 'Data & ML Platform',
    description: 'کاتالوگ تراکنشی و گیت‌مانند برای جداول آیسبرگ و دریاچه‌های داده',
    url: 'https://nessie.algonet.ir',
    iconName: 'general.svg'
  },
  {
    id: 'openmetadata',
    englishName: 'Openmetadata',
    persianTitle: 'کاتالوگ متادیتا',
    role: 'Data Catalog & Metadata',
    category: 'data-ml',
    categoryTitle: 'Data & ML Platform',
    description: 'کاتالوگ جامع داده، حاکمیت، تبارشناسی (Lineage) و کشف متادیتا',
    url: 'https://datahub.algonet.ir',
    iconName: 'openmetadata.svg'
  },
  {
    id: 'ranger',
    englishName: 'Ranger',
    persianTitle: 'امنیت و پالیسی داده',
    role: 'Data Access Governance',
    category: 'data-ml',
    categoryTitle: 'Data & ML Platform',
    description: 'مدیریت دسترسی‌های امنیتی، کنترل مجوزها و حاکمیت داده سازمانی',
    url: 'https://ranger.algonet.ir',
    iconName: 'ranger.svg'
  },
  {
    id: 'spark',
    englishName: 'Spark',
    persianTitle: 'پردازش توزیع‌شده اسپارک',
    role: 'Distributed Data Processing',
    category: 'data-ml',
    categoryTitle: 'Data & ML Platform',
    description: 'موتور محاسباتی مقیاس‌پذیر برای پردازش توزیع‌شده کلان‌داده‌ها',
    url: 'https://spark.algonet.ir',
    iconName: 'spark.svg'
  },
  {
    id: 'lakefs',
    englishName: 'lakeFS',
    persianTitle: 'کنترل نسخه داده لیک‌اف‌اس',
    role: 'Data Version Control',
    category: 'data-ml',
    categoryTitle: 'Data & ML Platform',
    description: 'کنترل نسخه به سبک گیت برای دریاچه‌های کلان‌داده و مدیریت تغییرات آبجکت‌ها',
    url: 'https://lakefs.algonet.ir',
    iconName: 'lakefs.svg'
  },

  // =========================================================================
  // ۲. Company Projects (پروژه‌های سازمانی - ۱۱ سرویس)
  // =========================================================================
  {
    id: 'algoagent',
    englishName: 'Algoagent',
    persianTitle: 'الگوایجنت',
    role: 'AI Agent Platform',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'پلتفرم پیشرفته توسعه، مدیریت و اجرای عامل‌های هوشمند الگونت',
    url: 'https://agent.aix2atlas.com',
    iconName: 'general.svg'
  },
  {
    id: 'annotopia',
    englishName: 'Annotopia',
    persianTitle: 'آناتوپیا',
    role: 'Annotation service',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'سرویس جامع برچسب‌گذاری، انوتیشن و غنی‌سازی داده‌های هوش مصنوعی',
    url: 'https://annotopia.ir',
    iconName: 'general.svg'
  },
  {
    id: 'arzyab',
    englishName: 'Arzyab',
    persianTitle: 'ارزیاب',
    role: 'Company Project',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'سامانه هوشمند ارزیابی و سنجش عملکرد پروژه‌های سازمانی',
    url: 'https://arzyab.algonet.ir',
    iconName: 'general.svg'
  },
  {
    id: 'asr-datalake',
    englishName: 'Asr-Datalake',
    persianTitle: 'دریاچه داده گفتار',
    role: 'ASR Data Lake',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'دریاچه داده گفتار و آرشیو پردازش داده‌های صوتی الگونت',
    url: 'https://asr-datalake.algonet.ir',
    iconName: 'general.svg'
  },
  {
    id: 'asr-service',
    englishName: 'Asr-Service',
    persianTitle: 'سرویس بازشناسی گفتار',
    role: 'Speech Recognition Service',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'سرویس هوشمند بازشناسی گفتار به متن و پردازش صوت',
    url: 'https://asr-service.algonet.ir',
    iconName: 'general.svg'
  },
  {
    id: 'bazafarini',
    englishName: 'Bazafarini',
    persianTitle: 'بازآفرینی',
    role: 'Company Project',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'سامانه مدیریت و بازآفرینی شهری و بافت‌های فرسوده الگونت',
    url: 'https://bazafariniyar.algonet.ir',
    iconName: 'bazafarini.svg'
  },
  {
    id: 'codal-price',
    englishName: 'Codal-price',
    persianTitle: 'کدال پرایس',
    role: 'Codal Price',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'سامانه تحلیل و پایش قیمت‌ها و اطلاعیه‌های سامانه کدال',
    url: 'https://codal-price.algonet.ir',
    iconName: 'general.svg'
  },
  {
    id: 'leili',
    englishName: 'Leili',
    persianTitle: 'لیلی',
    role: 'Company Project',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'سامانه و پروژه سازمانی اختصاصی پلتفرم الگونت',
    url: 'https://leili.test.algonet.ir',
    iconName: 'leili.svg'
  },
  {
    id: 'pmo',
    englishName: 'Pmo',
    persianTitle: 'دفتر مدیریت پروژه',
    role: 'PMO',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'پورتال پایش عملکرد و مدیریت پورتفولیوی پروژه‌های سازمانی (PMO)',
    url: 'https://pmo.algonet.ir',
    iconName: 'general.svg'
  },
  {
    id: 'sanjeh',
    englishName: 'Sanjeh',
    persianTitle: 'سنجه',
    role: 'Company Project',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'سامانه هوشمند سنجه و معیارهای ارزیابی عملکرد سازمانی',
    url: 'https://sanjeh.algonet.ir',
    iconName: 'general.svg'
  },
  {
    id: 'word-monitor',
    englishName: 'Word Monitor',
    persianTitle: 'مانیتورینگ واژگان',
    role: 'Company Project',
    category: 'company-projects',
    categoryTitle: 'Company Projects',
    description: 'سامانه پایش هوشمند اخبار، رسانه‌ها و مانیتورینگ کلیدواژه‌ها',
    url: 'https://monitor.algonet.ir',
    iconName: 'general.svg'
  },

  // =========================================================================
  // ۳. General Services (سرویس‌های عمومی - ۹ سرویس)
  // =========================================================================
  {
    id: 'algoteria',
    englishName: 'Algoteria',
    persianTitle: 'الگوتریا',
    role: 'Company Project',
    category: 'general-services',
    categoryTitle: 'General Services',
    description: 'سامانه پذیرایی، سفارش ناهار، رزرو غذا و تشریفات سازمانی',
    url: 'https://teria.algonet.ir',
    iconName: 'algoteria.svg'
  },
  {
    id: 'mail',
    englishName: 'Mail',
    persianTitle: 'وب‌میل سازمانی',
    role: 'Email Service',
    category: 'general-services',
    categoryTitle: 'General Services',
    description: 'سامانه پست الکترونیک رسمی، پیام‌های داخلی و مکاتبات اداری',
    url: 'https://mail.algonet.ir',
    iconName: 'mail.svg'
  },
  {
    id: 'nextcloud',
    englishName: 'Nextcloud',
    persianTitle: 'فضای ابری درایو',
    role: 'File Sharing & Collaboration',
    category: 'general-services',
    categoryTitle: 'General Services',
    description: 'سامانه ذخیره‌سازی ابری، اشتراک‌گذاری فایل و مدیریت اسناد سازمانی',
    url: 'https://drive.algonet.ir',
    iconName: 'nextcloud.svg'
  },
  {
    id: 'mattermost',
    englishName: 'Mattermost',
    persianTitle: 'پیام‌رسان متراست',
    role: 'Team Communication',
    category: 'general-services',
    categoryTitle: 'General Services',
    description: 'کانال‌های گفتگوی تیمی، چت‌های مستقیم و ارتباطات داخلی سازمان',
    url: 'https://chat.algonet.ir',
    iconName: 'mattermost.svg'
  },
  {
    id: 'meet',
    englishName: 'Meet',
    persianTitle: 'جلسات آنلاین',
    role: 'Video Conferencing',
    category: 'general-services',
    categoryTitle: 'General Services',
    description: 'اتاق‌های کنفرانس ویدیویی امن، جلسات کاری و وبینارهای تعاملی',
    url: 'https://meet.algonet.ir',
    iconName: 'jitsi.svg'
  },
  {
    id: 'openproject',
    englishName: 'Openproject',
    persianTitle: 'مدیریت پروژه‌ها',
    role: 'Project Management',
    category: 'general-services',
    categoryTitle: 'General Services',
    description: 'برنامه‌ریزی اسپرینت‌ها، بورد کانبان و پیگیری وظایف و تسک‌ها',
    url: 'https://pm.algonet.ir',
    iconName: 'openproject.svg'
  },
  {
    id: 'time-sheet',
    englishName: 'Time-Sheet',
    persianTitle: 'حضور و غیاب',
    role: 'Time Tracking',
    category: 'general-services',
    categoryTitle: 'General Services',
    description: 'ثبت ساعات کاری، تایم‌شیت کارکرد پروژه‌ای، تردد و مرخصی‌ها',
    url: 'https://time.algonet.ir',
    iconName: 'time.svg'
  },
  {
    id: 'wiki',
    englishName: 'Wiki',
    persianTitle: 'پایگاه دانش فنی',
    role: 'Internal Documentation',
    category: 'general-services',
    categoryTitle: 'General Services',
    description: 'مستندات معماری سیستم‌ها، راهنماهای آنبوردینگ و استانداردهای سازمان',
    url: 'https://wiki.algonet.ir',
    iconName: 'wikijs.svg'
  },
  {
    id: 'algodesk',
    englishName: 'Algodesk',
    persianTitle: 'میز خدمت و تیکتینگ',
    role: 'Ticketing service',
    category: 'general-services',
    categoryTitle: 'General Services',
    description: 'ثبت تیکت، تجهیزات، شبکه و درخواست‌های پشتیبانی فنی',
    url: 'https://desk.algonet.ir',
    iconName: 'desk.svg'
  },

  // =========================================================================
  // ۴. Internal Development Platform (IDP - ۴ سرویس)
  // =========================================================================
  {
    id: 'headlamp',
    englishName: 'Headlamp',
    persianTitle: 'داشبورد کوبرنتیز',
    role: 'Kubernetes Visualization',
    category: 'idp',
    categoryTitle: 'Internal Development Platform (IDP)',
    description: 'مدیریت بصری و نظارت بر کلاسترهای Kubernetes، پادها و منابع ابری',
    url: 'https://kube.algonet.ir',
    iconName: 'headlamp.svg'
  },
  {
    id: 'gitlab',
    englishName: 'Gitlab',
    persianTitle: 'مخازن سورس‌کد',
    role: 'Git Repository & CI/CD',
    category: 'idp',
    categoryTitle: 'Internal Development Platform (IDP)',
    description: 'کنترل نسخه سورس‌کد، مرج ریکوئست‌ها، پایپ‌لاین CI/CD و بازبینی کد',
    url: 'https://git.algonet.ir',
    iconName: 'gitlab.svg'
  },
  {
    id: 'nexus',
    englishName: 'Nexus',
    persianTitle: 'مخزن آرتیفکت',
    role: 'Artifact Repository',
    category: 'idp',
    categoryTitle: 'Internal Development Platform (IDP)',
    description: 'مدیریت پکیج‌های Maven, npm, PyPI، ایمیج‌های کانتینری و وابستگی‌ها',
    url: 'https://nexus.algonet.ir',
    iconName: 'nexus.svg'
  },
  {
    id: 'devslot',
    englishName: 'Devslot',
    persianTitle: 'محیط‌های ابری توسعه',
    role: 'Development Platform',
    category: 'idp',
    categoryTitle: 'Internal Development Platform (IDP)',
    description: 'اسلات‌های ابری توسعه‌دهندگان، محیط‌های پیش‌نمایش و تست ابری',
    url: 'https://devslot.algonet.ir',
    iconName: 'devslot.svg'
  }
];

interface ServicesGridProps {
  searchQuery?: string;
  favorites?: string[];
  onToggleFavorite?: (serviceId: string) => void;
  onOpenSearch?: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  searchQuery = '',
  favorites: propFavorites,
  onToggleFavorite: propToggleFavorite,
  onOpenSearch
}) => {
  const [internalFavorites, setInternalFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('algonet-portal-favorites');
      return saved ? JSON.parse(saved) : ['mail', 'mattermost', 'nextcloud'];
    } catch {
      return ['mail', 'mattermost', 'nextcloud'];
    }
  });

  const currentFavorites = propFavorites ?? internalFavorites;

  // Track which service was just added to favorites for spring & confetti animation
  const [animatingFavId, setAnimatingFavId] = useState<string | null>(null);

  const handleToggleFav = (id: string, e?: React.MouseEvent) => {
    const isAdding = !currentFavorites.includes(id);

    if (isAdding) {
      setAnimatingFavId(id);
      setTimeout(() => {
        setAnimatingFavId((curr) => (curr === id ? null : curr));
      }, 1200);

      // Micro celebratory confetti star burst from the star button position
      if (e) {
        try {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (rect.left + rect.width / 2) / window.innerWidth;
          const y = (rect.top + rect.height / 2) / window.innerHeight;
          confetti({
            particleCount: 16,
            spread: 55,
            startVelocity: 15,
            ticks: 50,
            origin: { x, y },
            colors: ['#ffb800', '#ffd043', '#ffe082', '#ff9f43', '#666cff'],
            shapes: ['star', 'circle'],
            scalar: 0.75,
            disableForReducedMotion: true
          });
        } catch {}
      }
    }

    if (propToggleFavorite) {
      propToggleFavorite(id);
    } else {
      setInternalFavorites((prev) => {
        const next = prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
        try {
          localStorage.setItem('algonet-portal-favorites', JSON.stringify(next));
        } catch {}
        return next;
      });
    }
  };

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState<boolean>(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterBoxOpen(false);
      }
    };
    if (isFilterBoxOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterBoxOpen]);

  // Toggle category active/inactive:
  // If clicking an active category, toggle it off (return to 'all')
  const handleCategoryClick = (catId: ServiceCategory) => {
    if (catId === 'all') {
      setActiveCategory('all');
    } else if (activeCategory === catId) {
      setActiveCategory('all');
    } else {
      setActiveCategory(catId);
    }
  };

  // Toggle open/close for individual section
  const toggleSection = (secId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId]
    }));
  };

  // Categories config for the top filter box (General Services first)
  const categoriesConfig: { id: ServiceCategory; label: string; count: number }[] = [
    { id: 'all', label: 'همه دسته‌ها', count: ALL_SERVICES.length },
    {
      id: 'general-services',
      label: 'General Services',
      count: ALL_SERVICES.filter((s) => s.category === 'general-services').length
    },
    {
      id: 'company-projects',
      label: 'Company Projects',
      count: ALL_SERVICES.filter((s) => s.category === 'company-projects').length
    },
    {
      id: 'idp',
      label: 'Internal Development Platform (IDP)',
      count: ALL_SERVICES.filter((s) => s.category === 'idp').length
    },
    {
      id: 'data-ml',
      label: 'Data & ML Platform',
      count: ALL_SERVICES.filter((s) => s.category === 'data-ml').length
    }
  ];

  // Search filter helper
  const matchesSearch = (item: PortalServiceItem) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.englishName.toLowerCase().includes(q) ||
      item.persianTitle.toLowerCase().includes(q) ||
      item.role.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.url.toLowerCase().includes(q)
    );
  };

  // Check whether filtering is actively restricting categories
  const isFiltering = activeCategory !== 'all';

  // Favorite services matching current search
  const favoriteServices = ALL_SERVICES.filter(
    (s) => currentFavorites.includes(s.id) && matchesSearch(s)
  );

  // Sections to render: if not filtering, show all 4 sections; otherwise show only selected
  const visibleSections = CATEGORY_SECTIONS.filter((sec) => {
    if (isFiltering && activeCategory !== sec.id) return false;
    // Check if this section has at least one service matching search
    const secServices = ALL_SERVICES.filter((s) => s.category === sec.id && matchesSearch(s));
    return secServices.length > 0;
  });

  const totalFilteredCount = ALL_SERVICES.filter(
    (s) => (!isFiltering || s.category === activeCategory) && matchesSearch(s)
  ).length;

  const currentCategoryConfig = categoriesConfig.find((c) => c.id === activeCategory);

  // Reusable Service Card Component with Top-Left Star for Favoriting
  const renderServiceCard = (service: PortalServiceItem, isFromFavoritesSection = false) => {
    const isFavorite = currentFavorites.includes(service.id);
    const isJustAdded = animatingFavId === service.id;

    return (
      <div
        key={`${isFromFavoritesSection ? 'fav-' : 'cat-'}${service.id}`}
        onClick={() => window.open(service.url, '_blank')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.open(service.url, '_blank');
          }
        }}
        title={`${service.englishName} (${service.persianTitle}) - ${service.role}\n${service.description}`}
        className={`portal-service-card group relative aspect-square w-full p-2.5 sm:p-3 flex flex-col items-center justify-between select-none cursor-pointer ${
          isJustAdded && isFromFavoritesSection ? 'favorite-card-new' : ''
        } ${isJustAdded && !isFromFavoritesSection ? 'ring-2 ring-[#ffb800]/50 shadow-[0_0_24px_rgba(255,184,0,0.3)] transition-all' : ''}`}
      >
        {/* دکمه ستاره در سمت چپ بالای کارت برای افزودن به فیوریت‌ها همراه با انیمیشن */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFav(service.id, e);
          }}
          className={`absolute top-2 left-2 z-20 size-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isFavorite
              ? 'text-[#ffb800] bg-[#ffb800]/15 border border-[#ffb800]/30 shadow-sm'
              : 'text-[#8386a1]/40 hover:text-[#ffb800] hover:bg-black/5 dark:hover:bg-white/10 opacity-70 sm:opacity-0 group-hover:opacity-100'
          } ${isJustAdded ? 'scale-110 shadow-[0_0_14px_#ffb800]' : 'active:scale-75'}`}
          title={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
          aria-label={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          {/* Expanding golden ring ripple when favorited */}
          {isJustAdded && (
            <span className="absolute inset-0 rounded-full border-2 border-[#ffb800] animate-star-ring pointer-events-none" />
          )}

          <Star
            className={`size-3.5 transition-transform duration-200 ${
              isFavorite ? 'fill-[#ffb800] text-[#ffb800] scale-110' : ''
            } ${isJustAdded ? 'animate-star-pop' : ''}`}
          />
        </button>

        {/* Top 3D Service Icon (متمرکز با ابعاد متناسب درون کارت مربع) */}
        <div className="w-full flex-1 flex items-center justify-center pt-1 overflow-visible">
          <div className="transform group-hover:scale-105 transition-transform duration-300 ease-out drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)]">
            <Service3DIcon
              iconName={service.iconName}
              id={service.id}
              variant="on-purple"
              className="size-[70px] sm:size-[78px] md:size-[84px]"
            />
          </div>
        </div>

        {/* Bottom Service Content (عنوان انگلیسی + عنوان نقش) */}
        <div className="w-full pb-1 px-1 text-center flex flex-col items-center justify-center select-none">
          <h3 className="font-['Vazirmatn'] font-medium text-[13.5px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px] text-[#1e1e2d] dark:text-[#f3f2f7] group-hover:text-[#6768ff] dark:group-hover:text-white transition-colors truncate max-w-full">
            {service.englishName}
          </h3>
          <p
            className="font-['Vazirmatn'] font-normal text-[10.5px] sm:text-[11px] md:text-[11.5px] leading-[16px] sm:leading-[18px] text-[#62657a] dark:text-[#b0afbd] truncate max-w-full mt-0.5"
            dir="ltr"
          >
            {service.role}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section aria-label="بخش سرویس‌های سازمانی الگونت" className="space-y-6 pt-2">
      {/*
        ===================================================================
        MAIN SECTION HEADER: سرویس‌های من (My Services)
        ===================================================================
      */}
      {/*
        ===================================================================
        MAIN SECTION HEADER: سرویس‌های من + دکمه فیلتر در گوشه
        ===================================================================
      */}
      <div className="flex items-center justify-between gap-3 pb-1 text-right relative">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <h2 className="font-['Vazirmatn'] font-bold text-xl sm:text-2xl md:text-3xl text-[#1e1e2d] dark:text-[#eaeafb]">
              سرویس‌های من
            </h2>
            <span className="text-[11px] sm:text-xs font-['Vazirmatn'] font-semibold tabular-nums text-[#666cff] bg-[#666cff]/10 border border-[#666cff]/25 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
              {toPersianDigits(totalFilteredCount)} سامانه فعال
            </span>
          </div>
          <p className="font-['Vazirmatn'] text-[11px] sm:text-sm text-[#62657a] dark:text-[#8386a1] hidden xs:block">
            سامانه‌های یکپارچه، ابزارها و پلتفرم‌های ابری پورتال الگونت
          </p>
        </div>

        {/* دکمه‌های گوشه چپ: جستجو (در موبایل فقط آیکون، در دسکتاپ کپسول با میانبر) و فیلتر دسته‌بندی */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className="size-9 sm:size-auto sm:h-10 sm:w-56 md:w-64 sm:px-3.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] text-[#1e1e2d] dark:text-[#eaeafb] hover:border-[#666cff] flex items-center justify-center sm:justify-between gap-2 transition-all duration-200 shadow-sm cursor-pointer select-none group shrink-0"
              title="جستجو در تمام سامانه‌ها (Ctrl + K)"
              aria-label="جستجو در سامانه‌ها (Ctrl + K)"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Search className="size-4 text-[#666cff] group-hover:scale-110 transition-transform shrink-0" />
                <span className="hidden sm:inline text-xs sm:text-sm font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] group-hover:text-[#1e1e2d] dark:group-hover:text-white transition-colors truncate">
                  جستجوی سرویس‌ها...
                </span>
              </div>
              <span
                dir="ltr"
                className="hidden sm:inline-flex items-center text-[10px] sm:text-[11px] font-mono font-medium px-1.5 sm:px-2 py-0.5 rounded-md bg-[#f0f1f7] dark:bg-[#25263a] text-[#62657a] dark:text-[#8386a1] border border-[#e0e2ec] dark:border-[#42455f] shadow-inner shrink-0"
              >
                Ctrl + K
              </span>
            </button>
          )}

          {/* دکمه فیلتر دسته‌بندی در گوشه چپ */}
          <div className="relative shrink-0" ref={filterRef}>
          <button
            type="button"
            onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}
            className={`h-9 sm:h-10 px-3 sm:px-4 rounded-xl sm:rounded-2xl flex items-center gap-2 text-xs sm:text-sm font-['Vazirmatn'] font-medium transition-all duration-200 cursor-pointer shadow-sm select-none ${
              activeCategory !== 'all' || isFilterBoxOpen
                ? 'bg-[#666cff] text-white shadow-[0_4px_14px_rgba(102,108,255,0.35)]'
                : 'bg-white dark:bg-[#30334e] text-[#1e1e2d] dark:text-[#eaeafb] border border-[#e0e2ec] dark:border-[#3d3f59] hover:border-[#666cff]'
            }`}
            title="فیلتر دسته‌بندی موضوعی"
            aria-expanded={isFilterBoxOpen}
          >
            <Filter className="size-3.5 sm:size-4 shrink-0" />
            <span>
              {activeCategory !== 'all' ? currentCategoryConfig?.label : 'فیلتر دسته‌بندی'}
            </span>
            {activeCategory !== 'all' ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCategory('all');
                }}
                className="size-4 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center mr-0.5 transition-colors"
                title="حذف فیلتر"
              >
                <X className="size-2.5 text-white" />
              </span>
            ) : (
              <ChevronDown
                className={`size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isFilterBoxOpen ? 'rotate-180' : ''
                }`}
              />
            )}
          </button>

          {/* منوی بازشونده شناور فیلتر دسته‌بندی‌ها با انیمیشن مورف فنری روان مشابه ویدیوی ارسالی */}
          {isFilterBoxOpen && (
            <div className="absolute left-0 top-full mt-2 w-72 max-w-[calc(100vw-32px)] rounded-2xl bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] shadow-[0_16px_40px_rgba(50,50,93,0.18)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] p-2.5 z-40 text-right popover-morph backdrop-blur-xl">
              <div className="flex items-center justify-between pb-2 mb-1 border-b border-[#e0e2ec] dark:border-[#3d3f59] px-2 text-xs font-['Vazirmatn'] font-bold text-[#1e1e2d] dark:text-[#eaeafb]">
                <span>انتخاب دسته‌بندی</span>
                <span className="text-[11px] font-normal text-[#62657a] dark:text-[#8386a1]">
                  {toPersianDigits(ALL_SERVICES.length)} کل سامانه‌ها
                </span>
              </div>

              <div className="space-y-1">
                {categoriesConfig.map((cat, idx) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      style={{
                        animation: `springExpandMorph 0.3s cubic-bezier(0.34, 1.35, 0.4, 1) ${idx * 35}ms backwards`
                      }}
                      onClick={() => {
                        handleCategoryClick(cat.id);
                        setIsFilterBoxOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-['Vazirmatn'] transition-all cursor-pointer active:scale-95 ${
                        isActive
                          ? 'bg-[#666cff] text-white font-bold shadow-sm'
                          : 'text-[#1e1e2d] dark:text-[#eaeafb] hover:bg-[#f4f5fa] dark:hover:bg-[#383a54]'
                      }`}
                    >
                      <span className="truncate">{cat.label}</span>
                      <span
                        className={`text-[11px] font-semibold tabular-nums px-2 py-0.5 rounded-full shrink-0 mr-2 ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-[#f0f1f7] dark:bg-[#242638] text-[#62657a] dark:text-[#8386a1]'
                        }`}
                      >
                        {toPersianDigits(cat.count)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/*
        ===================================================================
        FAVORITES SECTION (سرویس‌های برگزیده در بالاتر از همه بخش‌ها)
        ===================================================================
      */}
      {favoriteServices.length > 0 && activeCategory === 'all' && (
        <div className="space-y-3 pb-2 animate-in fade-in duration-300">
          {/* Section Header with Golden Star */}
          <div className="flex items-center gap-3.5 pt-1 select-none">
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="size-2 rounded-full bg-[#ffb800] shadow-[0_0_8px_#ffb800]" />
              <h3 className="font-['Vazirmatn'] font-bold text-sm sm:text-base text-[#1e1e2d] dark:text-[#eaeafb] flex items-center gap-2">
                <Star className="size-4 fill-[#ffb800] text-[#ffb800]" />
                <span>سرویس‌های برگزیده من</span>
                <span className="text-xs font-normal text-[#62657a] dark:text-[#8386a1]">
                  (Favorites)
                </span>
              </h3>
              <span className="text-[11px] font-['Vazirmatn'] font-semibold tabular-nums text-[#ffb800] bg-[#ffb800]/10 border border-[#ffb800]/25 px-2.5 py-0.5 rounded-full">
                {toPersianDigits(favoriteServices.length)}
              </span>
            </div>

            {/* Horizontal Divider Line */}
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#ffb800]/30 to-[#ffb800]/10" />
          </div>

          {/* Grid of Favorite Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-3.5 sm:gap-4 p-2.5 pb-4 pt-1">
            {favoriteServices.map((service) => renderServiceCard(service, true))}
          </div>
        </div>
      )}

      {/*
        ===================================================================
        CATEGORIZED SERVICES SECTIONS (سرویس‌های عمومی اول، همراه با اولویت فیوریت‌ها)
        ===================================================================
      */}
      {visibleSections.length === 0 ? (
        <div className="py-16 text-center text-[#62657a] dark:text-[#8386a1] font-['Vazirmatn'] text-sm bg-white dark:bg-[#30334e] rounded-[24px] border border-[#e0e2ec] dark:border-[#3d3f59]">
          هیچ سرویسی مطابق با جستجوی شما در این دسته‌بندی یافت نشد.
        </div>
      ) : (
        <div className="space-y-8">
          {visibleSections.map((sec) => {
            // Sort services in each category so favorites appear first
            const secServices = ALL_SERVICES.filter(
              (s) => s.category === sec.id && matchesSearch(s)
            ).sort((a, b) => {
              const aFav = currentFavorites.includes(a.id) ? 1 : 0;
              const bFav = currentFavorites.includes(b.id) ? 1 : 0;
              return bFav - aFav;
            });

            const isSectionCollapsed = !!collapsedSections[sec.id];

            return (
              <div key={sec.id} className="space-y-4">
                {/* Section Header with Divider Line (Clickable to collapse/expand) */}
                <div
                  onClick={() => toggleSection(sec.id)}
                  className="flex items-center gap-3.5 pt-2 cursor-pointer group select-none"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSection(sec.id);
                    }
                  }}
                  aria-expanded={!isSectionCollapsed}
                  title={isSectionCollapsed ? `باز کردن بخش ${sec.title}` : `بستن بخش ${sec.title}`}
                >
                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="size-2 rounded-full bg-[#666cff] shadow-[0_0_8px_#666cff] group-hover:scale-125 transition-transform" />
                    <h3 className="font-['Vazirmatn'] font-bold text-sm sm:text-base text-[#1e1e2d] dark:text-[#eaeafb] flex items-center gap-2 group-hover:text-[#666cff] dark:group-hover:text-white transition-colors">
                      <span>{sec.title}</span>
                      <span className="text-xs font-normal text-[#62657a] dark:text-[#8386a1]">
                        ({sec.persianSub})
                      </span>
                    </h3>
                    <span className="text-[11px] font-['Vazirmatn'] font-semibold tabular-nums text-[#62657a] dark:text-[#8386a1] bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] px-2.5 py-0.5 rounded-full">
                      {toPersianDigits(secServices.length)}
                    </span>
                    {isSectionCollapsed && (
                      <span className="text-[11px] font-['Vazirmatn'] text-[#62657a] dark:text-[#8386a1] bg-[#f4f5fa]/80 dark:bg-[#34364d]/60 border border-[#e0e2ec] dark:border-[#42455f]/50 px-2.5 py-0.5 rounded-full">
                        بسته شده
                      </span>
                    )}
                  </div>

                  {/* Horizontal Divider Line */}
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#e0e2ec] dark:via-[#3d3f59] to-[#e0e2ec] dark:to-[#3d3f59]" />

                  {/* Toggle Indicator Button */}
                  <div className="flex items-center gap-1.5 text-xs text-[#62657a] dark:text-[#8386a1] group-hover:text-[#666cff] shrink-0 transition-colors bg-[#f4f5fa] dark:bg-[#34364d]/70 group-hover:bg-[#eceef7] dark:group-hover:bg-[#34364d] px-2.5 py-1 rounded-full border border-[#e0e2ec] dark:border-[#42455f]">
                    <span className="text-[11px] font-['Vazirmatn'] hidden sm:inline">
                      {isSectionCollapsed ? 'باز کردن' : 'بستن'}
                    </span>
                    {isSectionCollapsed ? (
                      <ChevronDown className="size-3.5 transition-transform duration-200" />
                    ) : (
                      <ChevronUp className="size-3.5 transition-transform duration-200" />
                    )}
                  </div>
                </div>

                {/* Collapsible Grid of Cards */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isSectionCollapsed
                      ? 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
                      : 'max-h-[5000px] opacity-100 overflow-visible'
                  }`}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-3.5 sm:gap-4 p-2.5 pb-8 pt-2">
                    {secServices.map((service) => renderServiceCard(service))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
