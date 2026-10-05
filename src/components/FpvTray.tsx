import React from 'react';
import { TrayItem } from '../types';
import { 
  Plus, 
  Minus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Send, 
  Utensils, 
  ShoppingBag
} from 'lucide-react';

interface FpvTrayProps {
  items: TrayItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearTray: () => void;
  onOpenOrderModal: () => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

export const FpvTray: React.FC<FpvTrayProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray,
  onOpenOrderModal,
  isExpanded,
  setIsExpanded
}) => {
  const totalPortions = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Backdrop overlay when fully expanded on mobile so user can focus on their tray */}
      {isExpanded && (
        <div 
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-35 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* FIXED BOTTOM ROUND ALUMINUM TRAY WRAPPER */}
      <aside 
        id="fpv-tray-anchor"
        aria-label="Yuvarlaq Alüminium Aşpaz Məcməyisi"
        className={`fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center transition-transform duration-500 ease-out pointer-events-auto select-none ${
          isExpanded ? 'translate-y-0' : 'translate-y-[48%]'
        }`}
      >
        {/* PULL / TOGGLE CONTROL BAR */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer -mb-3 z-50 flex items-center gap-2 bg-neutral-900 text-white hover:bg-black px-4 py-2 rounded-full shadow-xl border border-neutral-700 active:scale-95 transition-all text-xs font-bold"
        >
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>{isExpanded ? '▼ Məcməyini Aşağı Sal' : '▲ Yuvarlaq Məcməyini Aç'}</span>
          <span className="bg-white text-black text-[10px] font-black rounded-full px-2 py-0.5 ml-1">
            {totalPortions} porsiya
          </span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </div>

        {/* THE REALISTIC ROUND ALUMINUM TRAY (YUVARLAQ ALÜMİNİUM SİNİ) */}
        <div className="relative w-full max-w-[440px] sm:max-w-[500px] px-2 flex justify-center">
          
          {/* Circular Metallic Platter */}
          <div 
            className="aluminum-tray-round relative w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full flex flex-col items-center justify-between p-4 sm:p-6 transition-all duration-300 shadow-2xl overflow-hidden"
          >
            {/* Realistic Aluminum Concentric Grooves (Alüminium naxışları) */}
            <div className="aluminum-groove absolute inset-2.5 sm:inset-3.5 rounded-full pointer-events-none" />
            <div className="aluminum-groove absolute inset-7 sm:inset-10 rounded-full pointer-events-none opacity-60" />
            <div className="aluminum-groove absolute inset-14 sm:inset-20 rounded-full pointer-events-none opacity-40" />

            {/* Left & Right Aluminum Metal Handles */}
            <div className="aluminum-handle absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2.5 h-16 rounded-l-md pointer-events-none" />
            <div className="aluminum-handle absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2.5 h-16 rounded-r-md pointer-events-none" />

            {/* TOP HEADER OF TRAY */}
            <div className="relative z-10 w-full pt-1 flex items-center justify-end px-3 text-neutral-800">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={onClearTray}
                  title="Məcməyini təmizlə"
                  className="p-1.5 rounded-full bg-white/80 hover:bg-red-50 text-neutral-600 hover:text-red-600 transition-colors shadow-xs ml-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* PLATED FOODS INSIDE THE ROUND TRAY */}
            <div className="relative z-10 w-full flex-1 flex items-center justify-center py-2 px-1">
              {items.length === 0 ? (
                /* Empty Tray State */
                <div className="text-center px-4 max-w-[220px]">
                  <div className="w-12 h-12 rounded-full bg-white/80 border border-neutral-300 mx-auto flex items-center justify-center text-neutral-500 mb-1.5 shadow-xs">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h4 className="font-sans font-bold text-xs text-neutral-800 mb-0.5">
                    Məcməyi Boşdur
                  </h4>
                  <p className="text-[10px] text-neutral-600 leading-tight">
                    Yuxarıdakı bufetdən yemək seçib məcməyiyə atın.
                  </p>
                </div>
              ) : (
                /* Plated Dishes inside circular platter */
                <div className="w-full max-h-[220px] sm:max-h-[270px] overflow-y-auto no-scrollbar grid grid-cols-2 sm:grid-cols-3 gap-2 px-2">
                  {items.map((item) => (
                    <div
                      key={item.dish.id}
                      className="animate-tray-drop relative bg-white/95 backdrop-blur-xs border border-neutral-300 rounded-xl p-2 flex flex-col items-center justify-between shadow-sm"
                    >
                      {/* Delete X */}
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.dish.id)}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white hover:bg-red-600 text-[10px] font-bold flex items-center justify-center shadow z-20"
                        title="Sil"
                      >
                        ✕
                      </button>

                      {/* Real Plated Photo */}
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-300 mb-1 shadow-xs shrink-0">
                        <img
                          src={item.dish.imageUrl}
                          alt={item.dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h5 className="text-[10px] font-bold text-neutral-900 truncate max-w-full text-center leading-tight">
                        {item.dish.name}
                      </h5>

                      <span className="text-[9px] text-neutral-500 font-semibold mb-1">
                        {item.quantity} porsiya
                      </span>

                      {/* Stepper (+ / -) */}
                      <div className="flex items-center justify-between w-full bg-neutral-100 rounded-lg p-0.5 text-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.dish.id, -1)}
                          className="w-5 h-5 flex items-center justify-center text-neutral-700 hover:text-black font-bold"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-mono text-[10px] font-black text-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.dish.id, 1)}
                          className="w-5 h-5 flex items-center justify-center text-neutral-700 hover:text-black font-bold"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* BOTTOM TRAY ACTIONS & ORDER BUTTON */}
            <div className="relative z-10 w-full pb-1 flex flex-col items-center gap-1.5">
              <button
                type="button"
                onClick={onOpenOrderModal}
                disabled={items.length === 0}
                className="w-full max-w-[280px] sm:max-w-[320px] flex items-center justify-center gap-2 py-2.5 px-4 bg-black hover:bg-neutral-800 active:scale-95 text-white font-extrabold rounded-xl text-xs shadow-lg disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Sifarişi Ver (WhatsApp)</span>
              </button>

              <span className="text-[10px] text-neutral-600 font-medium">
                {totalPortions > 0 ? `${totalPortions} porsiya seçilib` : 'Məcməyi boşdur'}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
