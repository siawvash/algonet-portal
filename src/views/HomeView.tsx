import React, { useState } from 'react';
import { UserInfoCard } from '../components/home/UserInfoCard';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { NewsDetailModal } from '../components/home/NewsDetailModal';
import { NewsItem } from '../components/home/NewsSlider';

interface HomeViewProps {
  searchQuery?: string;
  onNavigate?: (navId: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ searchQuery = '', onNavigate }) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/*
        اطلاعات کاربر به صورت افقی بالای سرویس‌های من
        (اخبار فعلاً به درخواست کاربر مخفی شده است)
      */}
      <div className="w-full">
        <UserInfoCard onNavigateProfile={() => onNavigate && onNavigate('profile')} />
      </div>

      {/*
        سرویس‌های من (Services Grid)
      */}
      <ServicesGrid searchQuery={searchQuery} />

      {/* News Full Detail Modal (در صورت نیاز به باز شدن) */}
      {selectedNews && (
        <NewsDetailModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </div>
  );
};
