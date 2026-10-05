import React, { useState } from 'react';
import { TrayItem, OrderDetails } from '../types';
import { X, Send, Copy, Check, Calendar, MapPin, User, Phone, Users, FileText, Sparkles } from 'lucide-react';
import { FamFoodLogo } from './FamFoodLogo';

interface OrderModalProps {
  items: TrayItem[];
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted?: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  items,
  isOpen,
  onClose,
  onOrderCompleted
}) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerName: '',
    phone: '',
    eventDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    guestCount: 20,
    eventType: 'Korporativ Furşet',
    address: '',
    notes: ''
  });

  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalPortions = items.reduce((sum, item) => sum + item.quantity, 0);

  // Formatted WhatsApp message WITHOUT PRICES
  const generateWhatsAppMessage = () => {
    let msg = `Salam! FAM FOOD saytından yeni keyterinq sifarişim var:\n`;
    
    items.forEach(item => {
      msg += `- ${item.dish.name} x ${item.quantity} porsiya\n`;
    });

    msg += `------------------\n`;
    msg += `Ümumi Porsiya: ${totalPortions} porsiya\n`;
    msg += `Tarix: ${orderDetails.eventDate || 'Göstərilməyib'}\n`;
    msg += `Ünvan: ${orderDetails.address.trim() ? orderDetails.address.trim() : 'Təyin ediləcək'}\n`;
    
    if (orderDetails.customerName.trim()) {
      msg += `Sifarişçi: ${orderDetails.customerName.trim()}\n`;
    }
    if (orderDetails.phone.trim()) {
      msg += `Əlaqə: ${orderDetails.phone.trim()}\n`;
    }
    if (orderDetails.guestCount) {
      msg += `Qonaq Sayı: təxminən ${orderDetails.guestCount} nəfər\n`;
    }
    if (orderDetails.eventType) {
      msg += `Tədbir Formatı: ${orderDetails.eventType}\n`;
    }
    if (orderDetails.notes.trim()) {
      msg += `Xüsusi Qeyd: ${orderDetails.notes.trim()}\n`;
    }

    return msg;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderDetails.customerName.trim()) {
      setFormError('Zəhmət olmasa, adınızı qeyd edin.');
      return;
    }
    if (!orderDetails.phone.trim()) {
      setFormError('Zəhmət olmasa, əlaqə nömrənizi daxil edin.');
      return;
    }

    setFormError(null);
    const message = generateWhatsAppMessage();
    const phone = '994105282632'; // +994 10 528 26 32
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    
    if (onOrderCompleted) {
      onOrderCompleted();
    }
  };

  const handleCopyMessage = () => {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-neutral-300 rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FamFoodLogo className="h-8 w-8" variant="circle" />
            <div>
              <h3 className="font-sans text-lg font-black text-black">
                FAM FOOD — Sifarişi Tamamla
              </h3>
              <p className="text-xs text-neutral-500">
                Məlumatları daxil edin və sifariş birbaşa WhatsApp koordinatoruna göndərilsin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-200 transition-colors"
            title="Bağla"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSendWhatsApp} className="p-5 sm:p-7 space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {formError}
            </div>
          )}

          {/* Customer Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 mb-1">
                <User className="w-3.5 h-3.5 text-black" />
                <span>Adınız və Soyadınız *</span>
              </label>
              <input
                type="text"
                required
                value={orderDetails.customerName}
                onChange={e => setOrderDetails({ ...orderDetails, customerName: e.target.value })}
                placeholder="məs: Fərid Məmmədov"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 mb-1">
                <Phone className="w-3.5 h-3.5 text-black" />
                <span>Əlaqə Nömrəsi (WhatsApp) *</span>
              </label>
              <input
                type="tel"
                required
                value={orderDetails.phone}
                onChange={e => setOrderDetails({ ...orderDetails, phone: e.target.value })}
                placeholder="məs: +994 50 123 45 67"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 mb-1">
                <Calendar className="w-3.5 h-3.5 text-black" />
                <span>Tədbir Tarixi *</span>
              </label>
              <input
                type="date"
                required
                value={orderDetails.eventDate}
                onChange={e => setOrderDetails({ ...orderDetails, eventDate: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 mb-1">
                <Users className="w-3.5 h-3.5 text-black" />
                <span>Qonaq Sayı (Nəfər)</span>
              </label>
              <input
                type="number"
                min="1"
                value={orderDetails.guestCount}
                onChange={e => setOrderDetails({ ...orderDetails, guestCount: e.target.value ? parseInt(e.target.value) : '' })}
                placeholder="məs: 25 nəfər"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Tədbir Formatı</span>
              </label>
              <select
                value={orderDetails.eventType}
                onChange={e => setOrderDetails({ ...orderDetails, eventType: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              >
                <option value="Korporativ Furşet">Korporativ Furşet</option>
                <option value="Ad Günü & Yubiley">Ad Günü & Yubiley</option>
                <option value="Toy & Nişan Ziyafəti">Toy & Nişan Ziyafəti</option>
                <option value="Konfrans & Kofe-breyk">Konfrans & Kofe-breyk</option>
                <option value="Xüsusi Şəxsi Ziyafət">Xüsusi Şəxsi Ziyafət</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 mb-1">
                <MapPin className="w-3.5 h-3.5 text-black" />
                <span>Çatdırılma / Tədbir Ünvanı</span>
              </label>
              <input
                type="text"
                value={orderDetails.address}
                onChange={e => setOrderDetails({ ...orderDetails, address: e.target.value })}
                placeholder="məs: Bakı ş., Nizami küç. 45"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 mb-1">
              <FileText className="w-3.5 h-3.5 text-black" />
              <span>Əlavə Qeydlər və ya Xüsusi Tələblər (İstəyə bağlı)</span>
            </label>
            <textarea
              rows={2}
              value={orderDetails.notes}
              onChange={e => setOrderDetails({ ...orderDetails, notes: e.target.value })}
              placeholder="Ofisiant xidməti, qab-qacaq tələbi, isti saxlanma qabları və s..."
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Order Summary (NO PRICES) */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-neutral-200">
              <span className="text-xs font-bold text-black uppercase tracking-wider">
                Məcməyidəki Təamlar
              </span>
              <span className="text-xs font-bold text-black">
                {totalPortions} porsiya
              </span>
            </div>

            <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {items.map(item => (
                <div key={item.dish.id} className="flex items-center justify-between text-neutral-700">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <img 
                      src={item.dish.imageUrl} 
                      alt="" 
                      className="w-6 h-6 rounded-full object-cover shrink-0 border border-neutral-300" 
                    />
                    <span className="truncate">{item.dish.name}</span>
                  </div>
                  <span className="font-semibold text-black shrink-0">
                    {item.quantity} porsiya
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2.5 border-t border-neutral-200 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">
                WhatsApp: <strong className="text-black">+994 10 528 26 32</strong>
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="flex items-center gap-1 text-[11px] text-black font-semibold hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı!' : 'Mesajı kopyala'}</span>
              </button>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:text-black rounded-xl hover:bg-neutral-100 transition-colors"
            >
              Məcməyiyə Qayıt
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-black hover:bg-neutral-800 active:scale-[0.98] text-white font-bold rounded-xl text-sm shadow-lg transition-all"
            >
              <Send className="w-4 h-4 stroke-[2.4]" />
              <span>WhatsApp ilə Sifarişi Göndər (+994 10 528 26 32)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
