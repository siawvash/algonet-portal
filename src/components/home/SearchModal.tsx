import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { PortalServiceItem, ALL_SERVICES } from './ServicesGrid';
import { Service3DIcon } from './Service3DIcon';
import { toPersianDigits } from '../../utils/formatters';
import { Search, X, ExternalLink, Star, CornerDownLeft, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onToggleFavorite: (serviceId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onToggleFavorite
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [animatingFavId, setAnimatingFavId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleToggleFavWithAnimation = (serviceId: string, e: React.MouseEvent) => {
    const isAdding = !favorites.includes(serviceId);
    if (isAdding) {
      setAnimatingFavId(serviceId);
      setTimeout(() => {
        setAnimatingFavId((curr) => (curr === serviceId ? null : curr));
      }, 1000);
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
    onToggleFavorite(serviceId);
  };

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setSelectedCategory('all');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filter services based on query and category
  const filteredServices = ALL_SERVICES.filter((item) => {
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    if (!query.trim()) return true;

    const q = query.trim().toLowerCase();
    return (
      item.englishName.toLowerCase().includes(q) ||
      item.persianTitle.toLowerCase().includes(q) ||
      item.role.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.categoryTitle.toLowerCase().includes(q) ||
      item.url.toLowerCase().includes(q)
    );
  }).sort((a, b) => {
    // Favorited items first
    const aFav = favorites.includes(a.id) ? 1 : 0;
    const bFav = favorites.includes(b.id) ? 1 : 0;
    if (bFav !== aFav) return bFav - aFav;

    // Exact matches first if query exists
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      const aStarts = a.englishName.toLowerCase().startsWith(q) || a.persianTitle.startsWith(q);
      const bStarts = b.englishName.toLowerCase().startsWith(q) || b.persianTitle.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
    }
    return 0;
  });

  // Reset selected index when filtered list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategory]);

  // Keyboard navigation & global shortcut handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If Ctrl + K is pressed while modal is already open, toggle it closed
      if (e.ctrlKey || e.metaKey) {
        const isK =
          e.code === 'KeyK' ||
          e.key === 'k' ||
          e.key === 'K' ||
          e.key === 'ن';
        if (isK) {
          e.preventDefault();
          e.stopPropagation();
          onClose();
          return;
        }
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1 < filteredServices.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredServices.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredServices[selectedIndex];
        if (selected) {
          window.open(selected.url, '_blank');
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, filteredServices, selectedIndex, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeItem = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  if (!isOpen || typeof document === 'undefined') return null;

  const categories = [
    { id: 'all', label: 'همه سامانه‌ها' },
    { id: 'general-services', label: 'سرویس‌های عمومی' },
    { id: 'data-ml', label: 'داده و هوش مصنوعی' },
    { id: 'company-projects', label: 'پروژه‌های سازمانی' },
    { id: 'idp', label: 'IDP' }
  ];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-4 select-none animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="جستجوی سرویس‌ها"
    >
      {/* Dark Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Spotlight Command Modal Container */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#30334e] border border-[#e0e2ec] dark:border-[#3d3f59] rounded-[28px] shadow-[0_24px_60px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col max-h-[82vh] z-10 popover-morph"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-[#e0e2ec] dark:border-[#3d3f59] bg-[#fbfbfe] dark:bg-[#2b2d44]">
          <Search className="size-5 sm:size-6 text-[#666cff] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در میان تمام سامانه‌ها و سرویس‌های الگونت..."
            className="flex-1 bg-transparent text-[#1e1e2d] dark:text-[#eaeafb] text-sm sm:text-base font-['Vazirmatn'] placeholder:text-[#8386a1] focus:outline-none text-right"
            dir="rtl"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="size-8 rounded-full flex items-center justify-center text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="پاک کردن"
            >
              <X className="size-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-mono text-[#8386a1] bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md border border-black/5 dark:border-white/10">
              <span>ESC</span>
            </div>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 overflow-x-auto border-b border-[#e0e2ec]/60 dark:border-[#3d3f59]/60 bg-[#f7f8fc] dark:bg-[#282a3f] scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-['Vazirmatn'] px-3 py-1 rounded-full whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#666cff] text-white font-bold shadow-sm'
                    : 'bg-white dark:bg-[#34364d] text-[#62657a] dark:text-[#8386a1] hover:text-[#1e1e2d] dark:hover:text-white border border-[#e0e2ec] dark:border-[#42455f]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 max-h-[50vh]"
        >
          {filteredServices.length === 0 ? (
            <div className="py-12 text-center text-[#62657a] dark:text-[#8386a1] space-y-3 font-['Vazirmatn']">
              <Sparkles className="size-8 mx-auto text-[#8386a1]/50" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-[#1e1e2d] dark:text-[#eaeafb]">
                  سرویسی با عنوان «{query}» یافت نشد
                </p>
                <p className="text-xs text-[#8386a1]">
                  می‌توانید نام انگلیسی، فارسی یا نقش سرویس را جستجو کنید
                </p>
              </div>
              {(query || selectedCategory !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSelectedCategory('all');
                    inputRef.current?.focus();
                  }}
                  className="px-4 py-1.5 rounded-xl bg-[#666cff]/10 text-[#666cff] dark:text-[#8c90ff] hover:bg-[#666cff]/20 text-xs font-semibold transition-colors cursor-pointer"
                >
                  پاک کردن جستجو و نمایش همه
                </button>
              )}
            </div>
          ) : (
            filteredServices.map((service, index) => {
              const isSelected = index === selectedIndex;
              const isFavorite = favorites.includes(service.id);

              return (
                <div
                  key={service.id}
                  data-index={index}
                  onClick={() => {
                    window.open(service.url, '_blank');
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[#666cff]/10 dark:bg-[#666cff]/20 border border-[#666cff]/40 shadow-sm'
                      : 'hover:bg-[#f4f5fa] dark:hover:bg-[#34364d]/60 border border-transparent'
                  }`}
                >
                  {/* Right side: 3D Icon + Titles */}
                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                    <div className="size-11 sm:size-12 rounded-xl bg-[#f0f1f7] dark:bg-[#25263a] flex items-center justify-center shrink-0 border border-[#e0e2ec] dark:border-[#3d3f59]">
                      <Service3DIcon
                        iconName={service.iconName}
                        id={service.id}
                        variant="on-purple"
                        className="size-8 sm:size-9"
                      />
                    </div>

                    <div className="min-w-0 flex-1 text-right">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-['Vazirmatn'] font-bold text-sm sm:text-base text-[#1e1e2d] dark:text-[#eaeafb]">
                          {service.englishName}
                        </span>
                        <span className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1]">
                          ({service.persianTitle})
                        </span>
                        <span className="text-[10px] font-['Vazirmatn'] px-2 py-0.5 rounded-md bg-[#666cff]/10 text-[#666cff] dark:text-[#8c90ff] font-medium">
                          {service.categoryTitle}
                        </span>
                      </div>
                      <p className="font-['Vazirmatn'] text-xs text-[#62657a] dark:text-[#8386a1] truncate mt-0.5">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Left side: Favorite Star + Open Button */}
                  <div className="flex items-center gap-1 sm:gap-2 shrink-0 mr-2">
                    {/* Star Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavWithAnimation(service.id, e);
                      }}
                      className={`relative size-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isFavorite
                          ? 'text-[#ffb800] bg-[#ffb800]/15 border border-[#ffb800]/30 shadow-sm'
                          : 'text-[#8386a1]/50 hover:text-[#ffb800] hover:bg-black/5 dark:hover:bg-white/10'
                      } ${animatingFavId === service.id ? 'scale-110 shadow-[0_0_14px_#ffb800]' : 'active:scale-75'}`}
                      title={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                    >
                      {animatingFavId === service.id && (
                        <span className="absolute inset-0 rounded-xl border-2 border-[#ffb800] animate-star-ring pointer-events-none" />
                      )}
                      <Star
                        className={`size-4 transition-transform duration-200 ${
                          isFavorite ? 'fill-[#ffb800] text-[#ffb800]' : ''
                        } ${animatingFavId === service.id ? 'animate-star-pop' : ''}`}
                      />
                    </button>

                    {/* Open External Link Arrow */}
                    <div
                      className={`size-9 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#666cff] text-white shadow-md'
                          : 'text-[#8386a1] group-hover:text-[#666cff]'
                      }`}
                      title="ورود به سامانه"
                    >
                      {isSelected ? (
                        <CornerDownLeft className="size-4" />
                      ) : (
                        <ExternalLink className="size-4" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer with Shortcuts */}
        <div className="px-4 sm:px-6 py-3 border-t border-[#e0e2ec] dark:border-[#3d3f59] bg-[#fbfbfe] dark:bg-[#2b2d44] flex items-center justify-between text-xs text-[#62657a] dark:text-[#8386a1] font-['Vazirmatn']">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 font-mono text-[10px]">
                ↑↓
              </kbd>
              <span>پیمایش</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 font-mono text-[10px]">
                Enter
              </kbd>
              <span>ورود به سامانه</span>
            </span>
            <span className="flex items-center gap-1 hidden sm:inline-flex">
              <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 font-mono text-[10px]">
                Esc
              </kbd>
              <span>بستن</span>
            </span>
          </div>

          <div className="text-[11px] font-semibold text-[#666cff] dark:text-[#8c90ff]">
            {toPersianDigits(filteredServices.length)} سامانه
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
