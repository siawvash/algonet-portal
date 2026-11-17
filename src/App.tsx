import React, { useState, useEffect } from 'react';
import { PortalNavId, UserPresenceStatus } from './types';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { SearchModal } from './components/home/SearchModal';
import { HomeView } from './views/HomeView';
import { ProfileView } from './views/ProfileView';
import { PortfolioView } from './views/PortfolioView';
import { ProjectsView } from './views/ProjectsView';
import { CalendarView } from './views/CalendarView';
import { NotificationsView } from './views/NotificationsView';
import { SurveysView } from './views/SurveysView';
import { PoliciesView } from './views/PoliciesView';
import { HandoffView } from './views/HandoffView';
import { HandoffDockButton } from './components/common/HandoffDockButton';
import { INITIAL_NOTIFICATIONS, INITIAL_SURVEYS, INITIAL_POLICIES } from './data/mockData';

export const App: React.FC = () => {
  // Theme state (Dark by default, as per Figma Component Theme, persisted in localStorage)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('algonet-portal-theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Sidebar collapse state (desktop)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Mobile navigation drawer open state (< lg screens)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Responsive desktop detection (lg breakpoint: 1024px)
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  // Navigation state (Default to 'home' workspace)
  const [activeNav, setActiveNav] = useState<PortalNavId>('home');

  // User presence status
  const [presence, setPresence] = useState<UserPresenceStatus>('present');

  // Favorites state (persisted in localStorage)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('algonet-portal-favorites');
      return saved ? JSON.parse(saved) : ['mail', 'mattermost', 'nextcloud'];
    } catch {
      return ['mail', 'mattermost', 'nextcloud'];
    }
  });

  const toggleFavorite = (serviceId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
      try {
        localStorage.setItem('algonet-portal-favorites', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Search Modal state (Command Palette / Ctrl+K)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Global Ctrl + K / Cmd + K Shortcut Listener (مقاوم در برابر کیبورد فارسی و با اولویت بالا)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        // e.code === 'KeyK' برای تشخیص فیزیکی کلید K بدون وابستگی به زبان کیبورد (فارسی/انگلیسی)
        const isK =
          e.code === 'KeyK' ||
          e.key === 'k' ||
          e.key === 'K' ||
          e.key === 'ن';

        if (isK) {
          e.preventDefault();
          e.stopPropagation();
          setIsSearchModalOpen((prev) => !prev);
        }
      }
    };

    // استفاده از capture: true برای جلوگیری کامل از سرچ پیش‌فرض مرورگر در کروم
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  // Live Search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Notifications, Surveys & Policies State
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [surveys, setSurveys] = useState(INITIAL_SURVEYS);
  const [policies, setPolicies] = useState(INITIAL_POLICIES);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const pendingSurveysCount = surveys.filter((s) => !s.completed).length;
  const pendingPoliciesCount = policies.filter((p) => !p.acknowledged).length;

  // Window resize listener for responsive layout
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure browser tab title is always set correctly
  useEffect(() => {
    document.title = 'پورتال الگونت';
  }, []);

  // Sync theme class to document & localStorage
  useEffect(() => {
    try {
      localStorage.setItem('algonet-portal-theme', theme);
    } catch {
      // ignore
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Smooth Morph Navigation Handler (native ViewTransition when supported + morph keyframe fallback)
  const navigateWithTransition = (navId: PortalNavId) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        setActiveNav(navId);
      });
    } else {
      setActiveNav(navId);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200 relative selection:bg-[var(--brand-primary)] selection:text-black overflow-x-hidden">
      {/* 
        Sidebar:
        - Fixed desktop sidebar on lg+ screens
        - Animated slide-over drawer with backdrop on mobile/tablet screens
      */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        activeNav={activeNav}
        onNavigate={navigateWithTransition}
        unreadNotifsCount={unreadNotifsCount}
        pendingSurveysCount={pendingSurveysCount}
        pendingPoliciesCount={pendingPoliciesCount}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* 
        Fixed Topbar Container:
        - On desktop (lg+): offset by sidebar width (304px / 118px)
        - On mobile (< lg): no inline paddingRight, so px-4 sm:px-6 md:px-8 creates symmetrical margins from both edges
      */}
      <div
        style={
          isDesktop
            ? { paddingRight: isSidebarCollapsed ? '118px' : '304px' }
            : undefined
        }
        className="fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 select-none"
      >
        <div className="w-full max-w-7xl mx-auto">
          <Topbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            theme={theme}
            onToggleTheme={toggleTheme}
            unreadNotificationsCount={unreadNotifsCount}
            onNavigate={navigateWithTransition}
            presence={presence}
            onPresenceChange={setPresence}
            onOpenMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </div>
      </div>

      {/* 
        Main Content Area:
        - Symmetrical margins on mobile: px-4 sm:px-6 md:px-8 applies equally on right and left (NEVER sticks to right!)
        - Desktop offset: paddingRight set to sidebar width only on >= 1024px screens
        - Top padding to fit underneath the Topbar
        - Bottom padding (pb-28 on mobile) to provide clearance above Mobile Bottom Navigation
      */}
      <div
        style={
          isDesktop
            ? { paddingRight: isSidebarCollapsed ? '118px' : '304px' }
            : undefined
        }
        className="min-h-screen px-4 sm:px-6 md:px-8 pt-[82px] sm:pt-[90px] pb-28 lg:pb-12 transition-all duration-300 ease-in-out flex flex-col"
      >
        <main className="flex-1 w-full max-w-7xl mx-auto">
          <div key={activeNav} className="view-morph-container">
            {activeNav === 'home' ? (
              <HomeView
                searchQuery={searchQuery}
                onNavigate={navigateWithTransition}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onOpenSearch={() => setIsSearchModalOpen(true)}
              />
            ) : activeNav === 'profile' ? (
              <ProfileView onNavigate={navigateWithTransition} />
            ) : activeNav === 'portfolio' ? (
              <PortfolioView onNavigate={navigateWithTransition} />
            ) : activeNav === 'projects' ? (
              <ProjectsView onNavigate={navigateWithTransition} />
            ) : activeNav === 'calendar' ? (
              <CalendarView onNavigate={navigateWithTransition} />
            ) : activeNav === 'notifications' ? (
              <NotificationsView
                notifications={notifications}
                onMarkAllAsRead={() =>
                  setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
                }
                onToggleRead={(id) =>
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
                  )
                }
              />
            ) : activeNav === 'surveys' ? (
              <SurveysView
                surveys={surveys}
                onCompleteSurvey={(id) =>
                  setSurveys((prev) =>
                    prev.map((s) => (s.id === id ? { ...s, completed: true } : s))
                  )
                }
              />
            ) : activeNav === 'policies' ? (
              <PoliciesView
                policies={policies}
                onAcknowledgePolicy={(id) =>
                  setPolicies((prev) =>
                    prev.map((p) => (p.id === id ? { ...p, acknowledged: true } : p))
                  )
                }
              />
            ) : activeNav === 'handoff' ? (
              <HandoffView onNavigate={navigateWithTransition} />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 rounded-2xl bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] p-8 sm:p-12 shadow-sm">
                <div className="size-16 rounded-2xl bg-[#f4f5fa] dark:bg-[#34364d] border border-[#e0e2ec] dark:border-[#42455f] flex items-center justify-center text-[#666cff]">
                  <span className="size-3 rounded-full bg-[#666cff] shadow-[0_0_12px_#666cff]" />
                </div>
                <h3 className="font-['Vazirmatn'] font-bold text-lg text-[#1e1e2d] dark:text-[#eaeafb]">
                  بخش انتخاب شده در حال آماده‌سازی است
                </h3>
                <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] max-w-md">
                  برای بازگشت به صفحه اصلی و مشاهده ماژول‌های اخبار، اطلاعات کاربری و سرویس‌ها روی دکمه زیر کلیک کنید.
                </p>
                <button
                  onClick={() => navigateWithTransition('home')}
                  className="px-5 py-2.5 rounded-full bg-[#666cff] text-white font-['Vazirmatn'] font-bold text-xs hover:bg-[#5b60e6] transition-colors cursor-pointer shadow-lg"
                >
                  بازگشت به صفحه اصلی
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 
        Mobile Bottom Navigation Bar:
        Quick thumb-accessible navigation on mobile/tablet screens (< lg)
      */}
      <BottomNavigation
        activeNav={activeNav}
        onNavigate={navigateWithTransition}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        unreadNotifsCount={unreadNotifsCount}
      />

      {/* 
        Global Search Modal (Command Palette / Ctrl+K)
        جستجوی سریع میان تمام سامانه‌ها و سرویس‌های الگونت
      */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      {/* 
        Figma Handoff Docked Left Button (Hover to slide out)
        دکمه دسترسی سریع هندآف فیگما چسبیده به دیواره سمت چپ
      */}
      <HandoffDockButton
        isActive={activeNav === 'handoff'}
        onToggle={() => navigateWithTransition(activeNav === 'handoff' ? 'home' : 'handoff')}
      />
    </div>
  );
};
