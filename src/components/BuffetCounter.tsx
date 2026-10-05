import React, { useState, useRef } from 'react';
import { Dish, CategoryId } from '../types';
import { CATEGORIES, DISHES } from '../data/dishes';
import { Plus, Minus, PlusCircle, Search, ChevronLeft, ChevronRight, Sparkles, Flame, Cake, GlassWater, Utensils } from 'lucide-react';

interface BuffetCounterProps {
  dishes: Dish[];
  onAddToTray: (dish: Dish, quantity: number, sourceElement: HTMLElement) => void;
  trayQuantities: Record<string, number>;
}

export const BuffetCounter: React.FC<BuffetCounterProps> = ({
  dishes,
  onAddToTray,
  trayQuantities
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  const getQuantity = (dishId: string) => itemQuantities[dishId] || 1;

  const handleQuantityChange = (dishId: string, delta: number) => {
    setItemQuantities(prev => {
      const current = prev[dishId] || 1;
      const next = Math.max(1, Math.min(50, current + delta));
      return { ...prev, [dishId]: next };
    });
  };

  const handleAddClick = (dish: Dish, event: React.MouseEvent<HTMLButtonElement>) => {
    const qty = getQuantity(dish.id);
    onAddToTray(dish, qty, event.currentTarget);
    setItemQuantities(prev => ({ ...prev, [dish.id]: 1 }));
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Only show dishes that are marked active by the chef/admin!
  const activeDishes = dishes.filter(dish => dish.isActive !== false);

  const filteredDishes = activeDishes.filter(dish => {
    const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || dish.tags.includes(selectedTag);
    return matchesCategory && matchesSearch && matchesTag;
  });

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'canapes': return <Sparkles className="w-3.5 h-3.5" />;
      case 'hot': return <Flame className="w-3.5 h-3.5" />;
      case 'desserts': return <Cake className="w-3.5 h-3.5" />;
      case 'drinks': return <GlassWater className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="buffet" className="py-6 sm:py-10 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-black text-[11px] font-bold uppercase tracking-wider mb-2">
          <Utensils className="w-3 h-3" />
          <span>Günün Yeməkləri</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 mb-1.5">
          Açıq Bufet Menyu
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 leading-snug">
          Təamları <strong className="text-black">sağa və sola sürüşdürərək</strong> seçin və yuvarlaq məcməyiyə əlavə edin.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-2.5 sm:p-3.5 mb-5 shadow-xs">
        <div className="flex flex-col gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-black text-white shadow-xs'
                  : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
              }`}
            >
              Hamısı ({activeDishes.length})
            </button>
            {CATEGORIES.map(cat => {
              const count = activeDishes.filter(d => d.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === cat.id
                      ? 'bg-black text-white shadow-xs'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  {getCategoryIcon(cat.id)}
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Carousel Controls Bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Yemək və ya inqrediyent axtar..."
                className="w-full bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs rounded-xl pl-8 pr-3 py-2 placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Carousel navigation arrows */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-black active:scale-95 transition-all"
                title="Sola sürüşdür"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-black active:scale-95 transition-all"
                title="Sağa sürüşdür"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SWIPEABLE HORIZONTAL CAROUSEL (SAĞA VƏ SOLA SÜRÜŞƏN YEMƏKLƏR) */}
      {filteredDishes.length === 0 ? (
        <div className="text-center py-16 bg-neutral-50 border border-neutral-200 rounded-2xl">
          <p className="text-neutral-600 text-sm mb-2">Axtarışınıza uyğun təam tapılmadı.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); setSelectedTag(null); }}
            className="text-xs text-black font-bold underline"
          >
            Bütün təamları göstər
          </button>
        </div>
      ) : (
        <div className="relative">
          {/* The Swipeable Track */}
          <div
            ref={carouselRef}
            className="flex items-stretch gap-4 overflow-x-auto snap-x snap-mandatory py-2 px-1 no-scrollbar touch-pan-x scroll-smooth"
          >
            {filteredDishes.map((dish) => {
              const currentQty = getQuantity(dish.id);
              const inTrayCount = trayQuantities[dish.id] || 0;

              return (
                <div
                  key={dish.id}
                  className="w-[275px] sm:w-[310px] shrink-0 snap-center group relative flex flex-col justify-between bg-white border border-neutral-200 hover:border-black rounded-2xl p-3.5 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Real Food Photo */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-3 border border-neutral-200 shadow-inner">
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = 'w-full h-full flex items-center justify-center text-4xl bg-neutral-100';
                            fallback.innerText = dish.fallbackEmoji;
                            parent.appendChild(fallback);
                          }
                        }}
                      />

                      {/* Tag Badge */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {dish.isChefSpecial && (
                          <span className="text-[9px] font-bold text-white bg-black/90 px-2 py-0.5 rounded-md shadow-xs">
                            Şefin Seçimi
                          </span>
                        )}
                        {dish.isPopular && !dish.isChefSpecial && (
                          <span className="text-[9px] font-bold text-black bg-white/95 px-2 py-0.5 rounded-md shadow-xs border border-neutral-200">
                            Populyar
                          </span>
                        )}
                      </div>

                      {/* In-Tray Badge */}
                      {inTrayCount > 0 && (
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                          <span>Məcməyidə:</span>
                          <span className="font-mono">{inTrayCount}</span>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mb-1 font-medium">
                      <span>{dish.portionSize}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-neutral-700">{dish.tags[0]}</span>
                    </div>

                    {/* Dish Title */}
                    <h3 className="font-sans text-base font-bold text-neutral-900 leading-snug mb-1">
                      {dish.name}
                    </h3>

                    {/* Dish Description */}
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Portion Stepper & Add Button (NO PRICES) */}
                  <div className="pt-2.5 border-t border-neutral-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-neutral-500">Porsiya</span>
                      
                      {/* Stepper */}
                      <div className="flex items-center gap-1 bg-neutral-100 border border-neutral-200 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(dish.id, -1)}
                          disabled={currentQty <= 1}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-white rounded transition-colors disabled:opacity-30"
                          title="Azalt"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-mono text-xs font-bold text-black tabular-nums">
                          {currentQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(dish.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-black hover:bg-white rounded transition-colors"
                          title="Artır"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Add to Tray */}
                    <button
                      type="button"
                      onClick={(e) => handleAddClick(dish, e)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-black hover:bg-neutral-800 active:scale-[0.98] rounded-xl shadow-xs transition-all"
                    >
                      <PlusCircle className="w-3.5 h-3.5 stroke-[2.4]" />
                      <span>Məcməyiyə At ({currentQty} porsiya)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Swipe indicator hint for mobile users */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 font-medium mt-2">
            <span>← Sağa və sola sürüşdürün →</span>
          </div>
        </div>
      )}
    </section>
  );
};
