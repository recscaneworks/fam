import React from 'react';
import { Phone, ShoppingBag, Settings, Award } from 'lucide-react';
import { FamFoodLogo } from './FamFoodLogo';

interface NavbarProps {
  trayCount: number;
  onOpenTray: () => void;
  onOpenExportModal: () => void;
  onOpenOrderModal: () => void;
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  trayCount,
  onOpenTray,
  onOpenOrderModal,
  onOpenAdminModal
}) => {
  const scrollToPartners = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('emekdasliqlar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-neutral-200 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Wordmark & Logo */}
        <a href="#buffet" className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg shrink-0">
          <FamFoodLogo className="h-9 w-9 sm:h-11 sm:w-11" variant="circle" />
          <div className="flex flex-col">
            <span className="font-sans text-lg sm:text-2xl font-black tracking-tight text-black block leading-none">
              FAM <span className="font-serif italic font-normal">FOOD</span>
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold block mt-0.5 sm:mt-1">
              Keyterinq & Bufet
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <a href="#buffet" className="hover:text-black transition-colors">
            Açıq Bufet
          </a>
          <button 
            onClick={scrollToPartners}
            className="hover:text-black transition-colors font-medium cursor-pointer"
          >
            Əməkdaşlıqlar
          </button>
          <a href="#haqqimizda" className="hover:text-black transition-colors">
            Xidmətlər
          </a>
          <a href="#elaqe" className="hover:text-black transition-colors">
            Əlaqə
          </a>
        </nav>

        {/* Primary Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quick "Əməkdaşlıqlar" button on mobile & desktop */}
          <button
            onClick={scrollToPartners}
            title="Əməkdaşlıqlara keç"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg transition-colors whitespace-nowrap"
          >
            <Award className="w-3.5 h-3.5 text-black" />
            <span>Əməkdaşlıqlar</span>
          </button>

          {/* Admin / Şef Menyu İdarəetmə Düyməsi */}
          <button
            onClick={onOpenAdminModal}
            title="Şef və Admin İdarəetmə Paneli"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-black bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg transition-colors whitespace-nowrap"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Şef Paneli</span>
          </button>

          {/* Direct WhatsApp Call */}
          <a
            href="https://wa.me/994105282632"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-black bg-white hover:bg-neutral-50 border border-neutral-300 rounded-lg transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#25D366]" />
            <span>+994 10 528 26 32</span>
          </a>

          {/* Tray Trigger Button */}
          <button
            onClick={onOpenTray}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white bg-black hover:bg-neutral-800 rounded-xl shadow-xs transition-all active:scale-95 whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[2.2]" />
            <span className="hidden xs:inline">Sini:</span>
            {trayCount > 0 ? (
              <span className="bg-white text-black text-[10px] font-black rounded-full px-1.5 py-0.2">
                {trayCount}
              </span>
            ) : (
              <span className="text-neutral-400 text-[10px] font-normal">0</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
