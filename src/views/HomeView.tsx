import React, { useState, useEffect } from 'react';
import { UserInfoCard } from '../components/home/UserInfoCard';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { NewsDetailModal } from '../components/home/NewsDetailModal';
import { ChangeAvatarModal } from '../components/modals/ChangeAvatarModal';
import { ChangeLocationModal } from '../components/modals/ChangeLocationModal';
import { NewsItem } from '../components/home/NewsSlider';

interface HomeViewProps {
  searchQuery?: string;
  onNavigate?: (navId: any) => void;
  favorites?: string[];
  onToggleFavorite?: (serviceId: string) => void;
  onOpenSearch?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  searchQuery = '',
  onNavigate,
  favorites,
  onToggleFavorite,
  onOpenSearch
}) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const [currentLocation, setCurrentLocation] = useState<string>(() => {
    try {
      return localStorage.getItem('algonet_user_location') || 'دفتر مرکزی (تهران) · طبقه ۲';
    } catch {
      return 'دفتر مرکزی (تهران) · طبقه ۲';
    }
  });

  const [currentAvatar, setCurrentAvatar] = useState<string | null>(() => {
    try {
      return localStorage.getItem('algonet_user_avatar');
    } catch {
      return null;
    }
  });

  // Sync cross-component avatar & location updates
  useEffect(() => {
    const handleAvatarUpdate = () => {
      try {
        setCurrentAvatar(localStorage.getItem('algonet_user_avatar'));
      } catch {}
    };
    const handleLocationUpdate = () => {
      try {
        setCurrentLocation(localStorage.getItem('algonet_user_location') || 'دفتر مرکزی (تهران) · طبقه ۲');
      } catch {}
    };

    window.addEventListener('user-avatar-updated', handleAvatarUpdate);
    window.addEventListener('user-location-updated', handleLocationUpdate);
    return () => {
      window.removeEventListener('user-avatar-updated', handleAvatarUpdate);
      window.removeEventListener('user-location-updated', handleLocationUpdate);
    };
  }, []);

  const handleSaveLocation = (newLoc: string) => {
    setCurrentLocation(newLoc);
    try {
      localStorage.setItem('algonet_user_location', newLoc);
      window.dispatchEvent(new Event('user-location-updated'));
    } catch {}
  };

  const handleSaveAvatar = (newAvatar: string | null) => {
    setCurrentAvatar(newAvatar);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/*
        اطلاعات کاربر به صورت افقی بالای سرویس‌های من
      */}
      <div className="w-full">
        <UserInfoCard
          onNavigateProfile={() => onNavigate && onNavigate('profile')}
          onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
          onOpenLocationModal={() => setIsLocationModalOpen(true)}
          currentLocation={currentLocation}
        />
      </div>

      {/*
        سرویس‌های من (Services Grid)
      */}
      <ServicesGrid
        searchQuery={searchQuery}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        onOpenSearch={onOpenSearch}
      />

      {/* News Full Detail Modal (در صورت نیاز به باز شدن) */}
      {selectedNews && (
        <NewsDetailModal
          news={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}

      {/* 
        MODAL: تغییر تصویر آواتار در وسط صفحه اصلی با بلور پس‌زمینه
      */}
      <ChangeAvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatar={currentAvatar}
        onSaveAvatar={handleSaveAvatar}
      />

      {/* 
        MODAL: تغییر موقعیت مکانی در وسط صفحه اصلی با بلور پس‌زمینه
      */}
      <ChangeLocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSaveLocation={handleSaveLocation}
      />
    </div>
  );
};
