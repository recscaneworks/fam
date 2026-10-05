import React, { useState, useRef } from 'react';
import { Dish, Partner, CategoryId } from '../types';
import { compressImageFile } from '../utils/imageUpload';
import { 
  X, 
  Plus, 
  Trash2, 
  Check, 
  RefreshCw, 
  ToggleLeft, 
  ToggleRight, 
  Building2, 
  Utensils, 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  LogOut,
  Camera,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: Dish[];
  partners: Partner[];
  onAddDish: (newDish: Dish) => void;
  onToggleDishActive: (dishId: string) => void;
  onDeleteDish: (dishId: string) => void;
  onAddPartner: (newPartner: Partner) => void;
  onDeletePartner: (partnerId: string) => void;
  onResetDefaults: () => void;
}

const PRESET_FOOD_PHOTOS = [
  { label: 'Brusketta', url: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80' },
  { label: 'Somon Roll', url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80' },
  { label: 'Mini Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Qril Şiş', url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80' },
  { label: 'Quzu Qabırğa', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { label: 'Qızılbalıq Steyk', url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80' },
  { label: 'Meyvəli Tartelet', url: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80' },
  { label: 'Şokolad Mousse', url: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80' },
  { label: 'Fransız Makaron', url: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80' }
];

const PRESET_PARTNER_LOGOS = [
  { label: 'Aviasiya / AZAL', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80' },
  { label: 'Motorsport / F1', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80' },
  { label: 'Eko Sammit / COP', url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80' },
  { label: 'Ticarət Mərkəzi / Mall', url: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=400&q=80' },
  { label: 'Biznes Qüllə', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' },
  { label: 'Sərgi / Expo Zalı', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80' }
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  dishes,
  partners,
  onAddDish,
  onToggleDishActive,
  onDeleteDish,
  onAddPartner,
  onDeletePartner,
  onResetDefaults
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'dishes' | 'partners'>('dishes');

  // Quick Dish Add State
  const [dishName, setDishName] = useState('');
  const [dishCat, setDishCat] = useState<CategoryId>('hot');
  const [dishImg, setDishImg] = useState('');
  const [dishDesc, setDishDesc] = useState('');
  const [dishPortion, setDishPortion] = useState('1 porsiya');
  const [isDishUploading, setIsDishUploading] = useState(false);

  // Hidden file inputs for Dish
  const dishGalleryInputRef = useRef<HTMLInputElement>(null);
  const dishCameraInputRef = useRef<HTMLInputElement>(null);

  // Partner Add State with Logo Image
  const [partnerName, setPartnerName] = useState('');
  const [partnerType, setPartnerType] = useState('');
  const [partnerHighlight, setPartnerHighlight] = useState('');
  const [partnerLogoUrl, setPartnerLogoUrl] = useState('');
  const [isPartnerUploading, setIsPartnerUploading] = useState(false);

  // Hidden file inputs for Partner Logo
  const partnerGalleryInputRef = useRef<HTMLInputElement>(null);
  const partnerCameraInputRef = useRef<HTMLInputElement>(null);

  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  // Password verification: exact password 'fam12345'
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'fam12345') {
      setIsAuthenticated(true);
      setPasswordError(null);
      setPasswordInput('');
    } else {
      setPasswordError('Yanlış şifrə! Şifrə: fam12345 olmalıdır.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setPasswordError(null);
  };

  // Handle Dish Image File (Gallery or Camera)
  const handleDishFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsDishUploading(true);
      const compressed = await compressImageFile(file, 800, 0.82);
      setDishImg(compressed);
      showNotice('Şəkil uğurla yükləndi!');
    } catch {
      alert('Şəkil yüklənərkən xəta baş verdi. Zəhmət olmasa başqa şəkil seçin.');
    } finally {
      setIsDishUploading(false);
      e.target.value = '';
    }
  };

  // Handle Partner Logo File (Gallery or Camera)
  const handlePartnerFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsPartnerUploading(true);
      const compressed = await compressImageFile(file, 400, 0.85);
      setPartnerLogoUrl(compressed);
      showNotice('Loqo şəkli uğurla yükləndi!');
    } catch {
      alert('Loqo şəkli yüklənərkən xəta baş verdi. Zəhmət olmasa başqa şəkil seçin.');
    } finally {
      setIsPartnerUploading(false);
      e.target.value = '';
    }
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    const newDish: Dish = {
      id: `dish-custom-${Date.now()}`,
      name: dishName.trim(),
      category: dishCat,
      description: dishDesc.trim() || 'Şefin bu gün üçün xüsusi hazırladığı ziyafət təamı.',
      portionSize: dishPortion.trim() || '1 porsiya',
      tags: ['Günün Təamı'],
      imageUrl: dishImg.trim() || PRESET_FOOD_PHOTOS[2].url,
      fallbackEmoji: '🍽️',
      isActive: true
    };

    onAddDish(newDish);
    setDishName('');
    setDishDesc('');
    setDishImg('');
    showNotice(`"${newDish.name}" günün menyusuna əlavə edildi!`);
  };

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim()) return;

    const newPartner: Partner = {
      id: `partner-custom-${Date.now()}`,
      name: partnerName.trim(),
      type: partnerType.trim() || 'Tərəfdaş Şirkət',
      highlight: partnerHighlight.trim() || 'Rəsmi Keyterinq Əməkdaşlığı',
      logoUrl: partnerLogoUrl.trim() || PRESET_PARTNER_LOGOS[0].url
    };

    onAddPartner(newPartner);
    setPartnerName('');
    setPartnerType('');
    setPartnerHighlight('');
    setPartnerLogoUrl('');
    showNotice(`"${newPartner.name}" və loqosu əməkdaşlıqlara əlavə edildi!`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-neutral-300 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans text-base sm:text-lg font-black text-black flex items-center gap-2">
                <span>FAM FOOD İdarəetmə Paneli</span>
                {isAuthenticated && (
                  <span className="bg-[#25D366] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Aktivdir
                  </span>
                )}
              </h3>
              <p className="text-xs text-neutral-500">
                {isAuthenticated ? 'Günün menyusu və əməkdaşlıq loqoları' : 'Giriş üçün şifrə tələb olunur'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                title="Paneldən çıxış"
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-neutral-700 bg-neutral-200 hover:bg-neutral-300 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Çıxış</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PASSWORD LOGIN SCREEN (If not authenticated) */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-black mb-4 shadow-xs">
              <KeyRound className="w-7 h-7" />
            </div>
            <h4 className="font-display text-xl font-bold text-neutral-900 mb-1">
              Admin Girişi
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs mb-6">
              Günün yeməklərini və ya şirkət loqolarını redaktə etmək üçün zəhmət olmasa təyin olunmuş şifrəni daxil edin.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="Şifrə: fam12345"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-neutral-900 focus:outline-none focus:border-black pr-10 text-center tracking-widest font-mono font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passwordError && (
                <div className="text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">
                  {passwordError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-[0.98]"
              >
                Daxil Ol
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN PANEL CONTENT */
          <>
            {/* Notification Toast */}
            {notification && (
              <div className="bg-green-50 border-b border-green-200 text-green-800 text-xs px-4 py-2 flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 text-green-600" />
                <span>{notification}</span>
              </div>
            )}

            {/* Tab Controls */}
            <div className="flex border-b border-neutral-200 bg-neutral-50 px-4 pt-2">
              <button
                onClick={() => setActiveTab('dishes')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                  activeTab === 'dishes'
                    ? 'border-black text-black bg-white rounded-t-xl'
                    : 'border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Günün Yeməkləri ({dishes.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                  activeTab === 'partners'
                    ? 'border-black text-black bg-white rounded-t-xl'
                    : 'border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Əməkdaşlıqlar & Loqolar ({partners.length})</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {activeTab === 'dishes' ? (
                <>
                  {/* FAST 10-SECOND ADD NEW DISH FORM */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-1.5">
                      <Plus className="w-4 h-4" />
                      <span>10 Saniyəyə Yeni Yemək Əlavə Et</span>
                    </h4>

                    {/* HIDDEN FILE INPUTS FOR CAMERA & GALLERY */}
                    <input
                      type="file"
                      ref={dishGalleryInputRef}
                      accept="image/*"
                      onChange={handleDishFileSelect}
                      className="hidden"
                    />
                    <input
                      type="file"
                      ref={dishCameraInputRef}
                      accept="image/*"
                      capture="environment"
                      onChange={handleDishFileSelect}
                      className="hidden"
                    />

                    <form onSubmit={handleCreateDish} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                            Yeməyin Adı *
                          </label>
                          <input
                            type="text"
                            required
                            value={dishName}
                            onChange={e => setDishName(e.target.value)}
                            placeholder="məs: Şişdə Qril Somon"
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                            Kateqoriya *
                          </label>
                          <select
                            value={dishCat}
                            onChange={e => setDishCat(e.target.value as CategoryId)}
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black font-medium"
                          >
                            <option value="canapes">Soyuq Qəlyanaltılar & Kanapelər</option>
                            <option value="hot">İsti Yeməklər & Qril</option>
                            <option value="desserts">Desertlər & Meyvə</option>
                            <option value="drinks">İçkilər & Təravət</option>
                          </select>
                        </div>
                      </div>

                      {/* PHOTO UPLOAD & CAMERA SECTION */}
                      <div className="bg-white border border-neutral-200 rounded-xl p-3">
                        <label className="block text-[11px] font-bold text-neutral-800 mb-2">
                          Yeməyin Şəkli (Kamera və ya Qalereyadan)
                        </label>

                        {/* Camera & Gallery Buttons */}
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          <button
                            type="button"
                            onClick={() => dishCameraInputRef.current?.click()}
                            disabled={isDishUploading}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-xs"
                          >
                            {isDishUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                            <span>Kameradan Çək</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => dishGalleryInputRef.current?.click()}
                            disabled={isDishUploading}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300 rounded-xl text-xs font-bold transition-all active:scale-95"
                          >
                            {isDishUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-black" /> : <ImageIcon className="w-3.5 h-3.5" />}
                            <span>Qalereyadan Yüklə</span>
                          </button>
                        </div>

                        {/* Photo Preview if loaded */}
                        {dishImg ? (
                          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-neutral-300 bg-neutral-100 mb-2">
                            <img
                              src={dishImg}
                              alt="Yemək önbaxış"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setDishImg('')}
                              className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/80 text-white text-[10px] font-bold shadow"
                            >
                              Şəkli Sil
                            </button>
                          </div>
                        ) : null}

                        {/* Optional URL input fallback */}
                        <div>
                          <input
                            type="url"
                            value={dishImg}
                            onChange={e => setDishImg(e.target.value)}
                            placeholder="və ya şəkil linki yapışdırın (https://...)"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-[11px] text-neutral-800 focus:outline-none focus:border-black mb-1.5"
                          />

                          {/* Quick Preset Photo Picker */}
                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                            <span className="text-[10px] text-neutral-400 font-bold shrink-0">Hazır fotolar:</span>
                            {PRESET_FOOD_PHOTOS.map(p => (
                              <button
                                key={p.label}
                                type="button"
                                onClick={() => setDishImg(p.url)}
                                className={`px-2 py-0.5 rounded-lg border text-[10px] shrink-0 font-medium ${
                                  dishImg === p.url ? 'border-black bg-black text-white' : 'border-neutral-200 bg-white text-neutral-700 hover:border-black'
                                }`}
                              >
                                {p.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                            Porsiya Ölçüsü
                          </label>
                          <input
                            type="text"
                            value={dishPortion}
                            onChange={e => setDishPortion(e.target.value)}
                            placeholder="məs: 2 ədəd (100 q)"
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                            Qısa Təsvir / İnqrediyentlər
                          </label>
                          <input
                            type="text"
                            value={dishDesc}
                            onChange={e => setDishDesc(e.target.value)}
                            placeholder="məs: Təzə reyhan, limonlu sous..."
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all active:scale-[0.98]"
                      >
                        + Yeməyi Bufetə Əlavə Et
                      </button>
                    </form>
                  </div>

                  {/* DISHES LIST: 1-CLICK TOGGLE TODAY'S AVAILABILITY */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-black">
                        Mövcud Yeməklər (Bugün üçün Aktiv / Deaktiv et)
                      </h4>
                      <span className="text-[11px] text-neutral-500">
                        Aktiv: {dishes.filter(d => d.isActive !== false).length} / {dishes.length}
                      </span>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {dishes.map(dish => {
                        const isActive = dish.isActive !== false;
                        return (
                          <div
                            key={dish.id}
                            className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                              isActive ? 'bg-white border-neutral-200' : 'bg-neutral-100 border-neutral-200 opacity-60'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={dish.imageUrl}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover border border-neutral-200 shrink-0"
                              />
                              <div className="min-w-0">
                                <h5 className="text-xs font-bold text-neutral-900 truncate">
                                  {dish.name}
                                </h5>
                                <span className="text-[10px] text-neutral-500 block truncate">
                                  {dish.portionSize}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {/* Toggle Active Button */}
                              <button
                                type="button"
                                onClick={() => onToggleDishActive(dish.id)}
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                                  isActive
                                    ? 'bg-black text-white hover:bg-neutral-800'
                                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                                }`}
                              >
                                {isActive ? <ToggleRight className="w-4 h-4 text-green-400" /> : <ToggleLeft className="w-4 h-4" />}
                                <span>{isActive ? 'Bugün Var' : 'Bugün Yoxdur'}</span>
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => onDeleteDish(dish.id)}
                                title="Menyudan tam sil"
                                className="p-1 text-neutral-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* ADD PARTNER FORM WITH REAL LOGO CAMERA & GALLERY */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      <span>Yeni Əməkdaşlıq & Loqo Əlavə Et</span>
                    </h4>

                    {/* HIDDEN FILE INPUTS FOR PARTNER LOGO */}
                    <input
                      type="file"
                      ref={partnerGalleryInputRef}
                      accept="image/*"
                      onChange={handlePartnerFileSelect}
                      className="hidden"
                    />
                    <input
                      type="file"
                      ref={partnerCameraInputRef}
                      accept="image/*"
                      capture="environment"
                      onChange={handlePartnerFileSelect}
                      className="hidden"
                    />

                    <form onSubmit={handleCreatePartner} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                            Şirkət və ya Tədbir Adı *
                          </label>
                          <input
                            type="text"
                            required
                            value={partnerName}
                            onChange={e => setPartnerName(e.target.value)}
                            placeholder="məs: SOCAR, Formula 1, Paşa Holdinq"
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                            Format / Növ
                          </label>
                          <input
                            type="text"
                            value={partnerType}
                            onChange={e => setPartnerType(e.target.value)}
                            placeholder="məs: Dövlət Tədbiri, Mall, Forum, Holdinq"
                            className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>

                      {/* PARTNER LOGO CAMERA & GALLERY UPLOAD */}
                      <div className="bg-white border border-neutral-200 rounded-xl p-3">
                        <label className="block text-[11px] font-bold text-neutral-800 mb-2">
                          Şirkət Loqosu (Kamera və ya Qalereyadan)
                        </label>

                        {/* Camera & Gallery Buttons */}
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          <button
                            type="button"
                            onClick={() => partnerCameraInputRef.current?.click()}
                            disabled={isPartnerUploading}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-xs"
                          >
                            {isPartnerUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
                            <span>Kameradan Çək</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => partnerGalleryInputRef.current?.click()}
                            disabled={isPartnerUploading}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300 rounded-xl text-xs font-bold transition-all active:scale-95"
                          >
                            {isPartnerUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin text-black" /> : <ImageIcon className="w-3.5 h-3.5" />}
                            <span>Qalereyadan Yüklə</span>
                          </button>
                        </div>

                        {/* Logo Preview if loaded */}
                        {partnerLogoUrl ? (
                          <div className="flex items-center gap-3 bg-neutral-50 p-2 rounded-xl border border-neutral-200 mb-2">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-300 bg-white p-0.5 shrink-0">
                              <img
                                src={partnerLogoUrl}
                                alt="Loqo önbaxış"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-bold text-black block truncate">Seçilmiş Loqo</span>
                              <span className="text-[10px] text-green-600 font-semibold">Uğurla əlavə edildi</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setPartnerLogoUrl('')}
                              className="px-2 py-1 rounded-lg bg-neutral-200 hover:bg-red-50 hover:text-red-600 text-[10px] font-bold"
                            >
                              Sil
                            </button>
                          </div>
                        ) : null}

                        {/* Optional URL input fallback */}
                        <div>
                          <input
                            type="url"
                            value={partnerLogoUrl}
                            onChange={e => setPartnerLogoUrl(e.target.value)}
                            placeholder="və ya loqo şəkil linki yapışdırın (https://...)"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-[11px] text-neutral-800 focus:outline-none focus:border-black mb-1.5"
                          />

                          {/* Quick Logo presets */}
                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                            <span className="text-[10px] text-neutral-400 font-bold shrink-0">Nümunə loqolar:</span>
                            {PRESET_PARTNER_LOGOS.map(p => (
                              <button
                                key={p.label}
                                type="button"
                                onClick={() => setPartnerLogoUrl(p.url)}
                                className={`px-2 py-0.5 rounded-lg border text-[10px] shrink-0 font-medium ${
                                  partnerLogoUrl === p.url ? 'border-black bg-black text-white' : 'border-neutral-200 bg-white text-neutral-700 hover:border-black'
                                }`}
                              >
                                {p.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                          Xidmət Növü / Qeyd
                        </label>
                        <input
                          type="text"
                          value={partnerHighlight}
                          onChange={e => setPartnerHighlight(e.target.value)}
                          placeholder="məs: Rəsmi VIP Ziyafət və Furşet Xidməti"
                          className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all active:scale-[0.98]"
                      >
                        + Əməkdaşlığı və Loqonu Əlavə Et
                      </button>
                    </form>
                  </div>

                  {/* EXISTING PARTNERS LIST WITH REAL LOGOS */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-black mb-2">
                      Mövcud Əməkdaşlıqlar və Loqolar ({partners.length})
                    </h4>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {partners.map(partner => (
                        <div
                          key={partner.id}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200 bg-white shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Logo Thumbnail */}
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 p-0.5 shrink-0 flex items-center justify-center">
                              {partner.logoUrl ? (
                                <img
                                  src={partner.logoUrl}
                                  alt=""
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <span className="font-bold text-xs">{partner.name.slice(0, 2)}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-xs font-bold text-black truncate">{partner.name}</h5>
                              <span className="text-[10px] text-neutral-500 font-medium block truncate">
                                {partner.type}
                              </span>
                              {partner.highlight && (
                                <span className="text-[9px] text-neutral-400 block truncate">
                                  {partner.highlight}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => onDeletePartner(partner.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onResetDefaults}
                className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-black font-semibold"
                title="Standart ilkin siyahını bərpa et"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>İlkin Menyunu Bərpa Et</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs shadow-sm"
              >
                Tamamlandı
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
