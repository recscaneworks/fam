import { useState, useCallback, useEffect } from 'react';
import { Dish, TrayItem, FlyingAnimation, Partner } from './types';
import { DISHES } from './data/dishes';
import { INITIAL_PARTNERS } from './data/partners';
import { Navbar } from './components/Navbar';
import { BuffetCounter } from './components/BuffetCounter';
import { FpvTray } from './components/FpvTray';
import { OrderModal } from './components/OrderModal';
import { SingleHtmlExportModal } from './components/SingleHtmlExportModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { PartnersSection } from './components/PartnersSection';
import { FlyingDishOverlay } from './components/FlyingDishOverlay';
import { STANDALONE_HTML_CODE } from './data/standaloneHtmlCode';
import { FamFoodLogo } from './components/FamFoodLogo';
import { 
  ShieldCheck, 
  Clock, 
  Truck, 
  Phone, 
  Utensils, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export default function App() {
  // Dishes state persisted in localStorage
  const [dishes, setDishes] = useState<Dish[]>(() => {
    try {
      const saved = localStorage.getItem('fam_food_dishes');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DISHES;
  });

  // Partners state persisted in localStorage
  const [partners, setPartners] = useState<Partner[]>(() => {
    try {
      const saved = localStorage.getItem('fam_food_partners');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PARTNERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('fam_food_dishes', JSON.stringify(dishes));
    } catch {}
  }, [dishes]);

  useEffect(() => {
    try {
      localStorage.setItem('fam_food_partners', JSON.stringify(partners));
    } catch {}
  }, [partners]);

  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);
  const [flyingAnimations, setFlyingAnimations] = useState<FlyingAnimation[]>([]);
  const [isTrayExpanded, setIsTrayExpanded] = useState<boolean>(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Map of dishId -> quantity in tray
  const trayQuantities = trayItems.reduce((acc, item) => {
    acc[item.dish.id] = item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const totalPortions = trayItems.reduce((sum, item) => sum + item.quantity, 0);

  // Trigger toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Add dish to tray with real photo flying animation
  const handleAddToTray = useCallback((dish: Dish, quantity: number, sourceElement: HTMLElement) => {
    const startRect = sourceElement.getBoundingClientRect();
    const trayAnchor = document.getElementById('fpv-tray-anchor');
    const endRect = trayAnchor
      ? trayAnchor.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: window.innerHeight - 100, width: 100, height: 50 };

    const startX = startRect.left + startRect.width / 2 - 34;
    const startY = startRect.top + startRect.height / 2 - 34;
    const endX = Math.min(window.innerWidth - 70, Math.max(30, endRect.left + endRect.width / 2 - 34));
    const endY = Math.min(window.innerHeight - 60, endRect.top + 30);

    const animId = Date.now() + Math.random();
    const newAnim: FlyingAnimation = {
      id: animId,
      dish,
      startX,
      startY,
      endX,
      endY
    };

    setFlyingAnimations(prev => [...prev, newAnim]);

    setTimeout(() => {
      setFlyingAnimations(prev => prev.filter(a => a.id !== animId));
    }, 750);

    // Update Tray Items
    setTrayItems(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        return prev.map(item =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { dish, quantity }];
    });

    showToast(`"${dish.name}" (${quantity} porsiya) məcməyiyə düşdü!`);
  }, []);

  // Update item quantity on tray
  const handleUpdateQuantity = useCallback((dishId: string, delta: number) => {
    setTrayItems(prev => {
      return prev
        .map(item => {
          if (item.dish.id === dishId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is TrayItem => item !== null);
    });
  }, []);

  // Remove single item from tray
  const handleRemoveItem = useCallback((dishId: string) => {
    setTrayItems(prev => prev.filter(item => item.dish.id !== dishId));
  }, []);

  // Clear entire tray
  const handleClearTray = useCallback(() => {
    if (window.confirm('Yuvarlaq məcməyinizdəki bütün təamları təmizləmək istəyirsiniz?')) {
      setTrayItems([]);
      showToast('Məcməyi təmizləndi.');
    }
  }, []);

  // Admin Actions for Dishes
  const handleAddDish = useCallback((newDish: Dish) => {
    setDishes(prev => [newDish, ...prev]);
    showToast(`"${newDish.name}" günün menyusuna əlavə edildi!`);
  }, []);

  const handleToggleDishActive = useCallback((dishId: string) => {
    setDishes(prev => prev.map(d => {
      if (d.id === dishId) {
        const nextState = d.isActive === false ? true : false;
        return { ...d, isActive: nextState };
      }
      return d;
    }));
  }, []);

  const handleDeleteDish = useCallback((dishId: string) => {
    if (window.confirm('Bu yeməyi menyudan tamamilə silmək istəyirsiniz?')) {
      setDishes(prev => prev.filter(d => d.id !== dishId));
      setTrayItems(prev => prev.filter(item => item.dish.id !== dishId));
      showToast('Yemək menyudan silindi.');
    }
  }, []);

  // Admin Actions for Partners
  const handleAddPartner = useCallback((newPartner: Partner) => {
    setPartners(prev => [...prev, newPartner]);
    showToast(`"${newPartner.name}" əməkdaşlıqlara əlavə edildi!`);
  }, []);

  const handleDeletePartner = useCallback((partnerId: string) => {
    if (window.confirm('Bu əməkdaşlığı siyahıdan silmək istəyirsiniz?')) {
      setPartners(prev => prev.filter(p => p.id !== partnerId));
      showToast('Əməkdaşlıq silindi.');
    }
  }, []);

  // Reset to original default data
  const handleResetDefaults = useCallback(() => {
    if (window.confirm('İlkin standart menyu və əməkdaşlıqları bərpa etmək istəyirsiniz?')) {
      setDishes(DISHES);
      setPartners(INITIAL_PARTNERS);
      localStorage.removeItem('fam_food_dishes');
      localStorage.removeItem('fam_food_partners');
      showToast('Standart ilkin siyahı bərpa olundu.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-950 flex flex-col antialiased selection:bg-black selection:text-white pb-56 sm:pb-64">
      {/* Flying Real Photo Overlay */}
      <FlyingDishOverlay animations={flyingAnimations} />

      {/* Floating Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-black text-white text-xs font-semibold rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        trayCount={totalPortions}
        onOpenTray={() => setIsTrayExpanded(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* MOBILE-OPTIMIZED HERO */}
      <section className="relative overflow-hidden pt-6 pb-8 sm:pt-12 sm:pb-14 border-b border-neutral-200 bg-white">
        <div className="relative max-w-xl mx-auto px-4 text-center">
          
          {/* Logo Showcase */}
          <div className="flex justify-center mb-3">
            <FamFoodLogo className="h-16 w-16 sm:h-20 sm:w-20" variant="circle" />
          </div>

          {/* Sub-tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3">
            <span>Açıq Bufet & Keyterinq</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 mb-2 leading-snug">
            Günün Ziyafət Bufeti
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto mb-4 leading-relaxed">
            Yeməkləri <strong className="text-black font-semibold">sağa-sola sürüşdürərək</strong> seçin və aşağıdakı <strong className="text-black font-semibold">yuvarlaq alüminium məcməyiyə</strong> əlavə edin.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex items-center justify-center gap-2.5">
            <a
              href="#buffet"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Bufetə Get</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/994105282632"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-neutral-50 text-neutral-950 font-bold rounded-xl text-xs border border-neutral-300 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp: +994 10 528 26 32</span>
            </a>
          </div>
        </div>
      </section>

      {/* SWIPEABLE HORIZONTAL BUFFET CAROUSEL (GÜNÜN YEMƏKLƏRİ) */}
      <BuffetCounter
        dishes={dishes}
        onAddToTray={handleAddToTray}
        trayQuantities={trayQuantities}
      />

      {/* RƏSMİ ƏMƏKDAŞLIQLAR SECTION (AZAL, F1, COP29, ABSHERON MALL, WUF 13, və s.) */}
      <PartnersSection
        partners={partners}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* COMPACT SERVICES / TRUST ACCENTS */}
      <section id="haqqimizda" className="py-8 sm:py-12 border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-1 block">
              FAM FOOD KEYTERİNQ
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-1">
              Peşəkar Xidmət Standartları
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 shadow-2xs text-center">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-black mx-auto mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-neutral-900 mb-1">Təbii Məhsullar</h4>
              <p className="text-[11px] text-neutral-500 leading-tight">Gündəlik tədarük olunan premium ərzaqlar.</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 shadow-2xs text-center">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-black mx-auto mb-2">
                <Truck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-neutral-900 mb-1">Dəqiq Çatdırılma</h4>
              <p className="text-[11px] text-neutral-500 leading-tight">İsti qablarda və vaxtında ünvana servis.</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-xl p-3.5 shadow-2xs text-center">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-black mx-auto mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-neutral-900 mb-1">Sürətli Sifariş</h4>
              <p className="text-[11px] text-neutral-500 leading-tight">Birbaşa WhatsApp vasitəsilə təsdiqləmə.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPACT FOOTER */}
      <footer id="elaqe" className="mt-auto border-t border-neutral-200 bg-white py-8">
        <div className="max-w-xl mx-auto px-4 flex flex-col items-center text-center gap-3">
          <FamFoodLogo className="h-8 w-8" variant="circle" />
          <div>
            <span className="font-sans text-sm font-black text-black block leading-none">
              FAM FOOD CATERING
            </span>
            <span className="text-[11px] text-neutral-500">
              Bakı, Azərbaycan · +994 10 528 26 32
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-neutral-600">
            <a href="https://wa.me/994105282632" target="_blank" rel="noopener noreferrer" className="hover:text-black">
              WhatsApp
            </a>
            <span>·</span>
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-black font-bold hover:underline"
            >
              Şef / Admin Paneli
            </button>
            <span>·</span>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="text-neutral-500 underline font-medium"
            >
              Tək .HTML Kodu
            </button>
          </div>

          <div className="text-[10px] text-neutral-400">
            © {new Date().getFullYear()} FAM FOOD. Bütün hüquqlar qorunur.
          </div>
        </div>
      </footer>

      {/* FIXED BOTTOM ROUND ALUMINUM TRAY (YUVARLAQ ALÜMİNİUM SİNİ) */}
      <FpvTray
        items={trayItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        isExpanded={isTrayExpanded}
        setIsExpanded={setIsTrayExpanded}
      />

      {/* WHATSAPP ORDER MODAL */}
      <OrderModal
        items={trayItems}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onOrderCompleted={() => {
          showToast('Sifariş məlumatları WhatsApp-a göndərildi!');
        }}
      />

      {/* CHEF & ADMIN PANEL MODAL (10-Saniyəyə Menyu və Əməkdaşlıq İdarəetməsi) */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        dishes={dishes}
        partners={partners}
        onAddDish={handleAddDish}
        onToggleDishActive={handleToggleDishActive}
        onDeleteDish={handleDeleteDish}
        onAddPartner={handleAddPartner}
        onDeletePartner={handleDeletePartner}
        onResetDefaults={handleResetDefaults}
      />

      {/* SINGLE HTML EXPORT MODAL */}
      <SingleHtmlExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        singleHtmlCode={STANDALONE_HTML_CODE}
      />
    </div>
  );
}
