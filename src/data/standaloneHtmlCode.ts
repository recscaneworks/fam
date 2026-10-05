export const STANDALONE_HTML_CODE = `<!DOCTYPE html>
<html lang="az">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>FAM FOOD — Keyterinq & Açıq Bufet</title>
  <meta name="description" content="FAM FOOD: Mobil üçün tam uyğunlaşdırılmış, sağa-sola sürüşən açıq bufet və yuvarlaq alüminium məcməyi ilə interaktiv keyterinq platforması.">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background-color: #ffffff;
      color: #111111;
      -webkit-tap-highlight-color: transparent;
    }
    .font-serif-brand {
      font-family: 'Playfair Display', Georgia, serif;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    /* Brushed Aluminum Round Tray */
    .aluminum-tray-round {
      background: radial-gradient(circle at 50% 50%, #f9fafb 0%, #e5e7eb 30%, #d1d5db 55%, #9ca3af 80%, #6b7280 95%, #4b5563 100%);
      box-shadow: 
        0 -12px 35px rgba(0, 0, 0, 0.22),
        inset 0 0 35px rgba(255, 255, 255, 0.8),
        inset 0 0 12px rgba(0, 0, 0, 0.25);
      border: 4px solid #cbd5e1;
    }
    .aluminum-groove {
      border: 2px solid rgba(156, 163, 175, 0.4);
      box-shadow: 
        inset 0 1px 2px rgba(255, 255, 255, 0.7),
        0 1px 2px rgba(0, 0, 0, 0.15);
    }
    .aluminum-handle {
      background: linear-gradient(180deg, #f3f4f6 0%, #d1d5db 50%, #9ca3af 100%);
      box-shadow: 0 2px 5px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.9);
      border: 1px solid #9ca3af;
    }
    /* Flying photo keyframe */
    @keyframes flyToTray {
      0% {
        transform: translate(0, 0) scale(1) rotate(0deg);
        opacity: 1;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
      }
      45% {
        transform: translate(var(--tw-fly-x, 0px), var(--tw-fly-y-mid, 120px)) scale(0.9) rotate(8deg);
        opacity: 0.98;
      }
      100% {
        transform: translate(var(--tw-fly-x, 0px), var(--tw-fly-y, 350px)) scale(0.45) rotate(0deg);
        opacity: 0;
      }
    }
    .animate-fly {
      animation: flyToTray 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      pointer-events: none;
      position: fixed;
      z-index: 9999;
    }
    @keyframes dropBounce {
      0% { transform: translateY(-20px) scale(0.8); opacity: 0; }
      70% { transform: translateY(3px) scale(1.05); opacity: 1; }
      100% { transform: translateY(0) scale(1); opacity: 1; }
    }
    .animate-drop-bounce {
      animation: dropBounce 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
  </style>
</head>
<body class="min-h-screen pb-56 sm:pb-64 antialiased selection:bg-black selection:text-white bg-white">

  <!-- MOBILE-OPTIMIZED TOP BAR -->
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-neutral-200">
    <div class="max-w-xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
      <a href="#buffet" class="flex items-center gap-2.5">
        <svg class="h-9 w-9 aspect-square" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="185" stroke="#111111" stroke-width="14" />
          <rect x="110" y="115" width="180" height="90" stroke="#111111" stroke-width="10" fill="none" />
          <g fill="#111111">
            <path d="M128 140 H158 V152 H142 V162 H155 V174 H142 V195 H128 Z" />
            <path d="M185 140 L204 195 H166 Z M185 160 L176 185 H194 Z" fill-rule="evenodd" />
            <path d="M216 140 H230 L240 170 L250 140 H264 V195 H252 V164 L244 188 H236 L228 164 V195 H216 Z" />
            <path d="M112 235 H138 V244 H123 V254 H135 V263 H123 V285 H112 Z" />
            <path d="M165 234 C152 234 142 245 142 260 C142 275 152 286 165 286 C178 286 188 275 188 260 C188 245 178 234 165 234 Z M165 244 C172 244 177 251 177 260 C177 269 172 276 165 276 Z" />
            <path d="M214 234 C201 234 191 245 191 260 C191 275 201 286 214 286 C227 286 237 275 237 260 C237 245 227 234 214 234 Z M214 244 C221 244 226 251 226 260 C226 269 221 276 214 276 Z" />
            <path d="M245 235 H264 C277 235 287 245 287 260 C287 275 277 285 264 285 H245 Z M256 245 V275 H264 C271 275 276 269 276 260 C276 251 271 245 264 245 Z" />
          </g>
        </svg>
        <div>
          <span class="font-sans text-lg font-black tracking-tight text-black block leading-none">
            FAM <span class="font-serif italic font-normal">FOOD</span>
          </span>
          <span class="text-[9px] uppercase tracking-wider text-neutral-500 font-bold block mt-0.5">
            Keyterinq & Bufet
          </span>
        </div>
      </a>

      <div class="flex items-center gap-1.5 sm:gap-2">
        <a href="#emekdasliqlar" class="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-black bg-neutral-100 border border-neutral-300 rounded-lg">
          <span>Əməkdaşlıqlar</span>
        </a>
        <a href="https://wa.me/994105282632" target="_blank" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-black bg-neutral-100 border border-neutral-300 rounded-lg">
          <span class="w-2 h-2 rounded-full bg-[#25D366]"></span>
          <span>WhatsApp</span>
        </a>
        <button onclick="toggleTray()" class="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-black rounded-lg">
          <span>Sini:</span>
          <span id="nav-tray-count" class="bg-white text-black text-[10px] font-black rounded-full px-1.5 py-0.2">0</span>
        </button>
      </div>
    </div>
  </header>

  <!-- MAIN MOBILE CONTENT -->
  <main class="max-w-xl mx-auto px-4 py-6">
    <div class="text-center mb-5">
      <span class="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase tracking-wider mb-2">
        Günün Yeməkləri
      </span>
      <h1 class="font-display text-2xl font-bold tracking-tight text-neutral-950 mb-1">
        Açıq Ziyafət Bufeti
      </h1>
      <p class="text-xs text-neutral-600 leading-snug">
        Təamları <strong class="text-black">sağa və sola sürüşdürərək</strong> seçin və yuvarlaq alüminium məcməyiyə yığın.
      </p>
    </div>

    <!-- Category Tabs -->
    <div class="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 no-scrollbar" id="category-tabs">
      <button onclick="setCategory('all')" id="tab-all" class="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-black text-white shrink-0">
        Hamısı (19)
      </button>
      <button onclick="setCategory('canapes')" id="tab-canapes" class="px-3.5 py-1.5 text-xs font-semibold rounded-xl text-neutral-600 hover:bg-neutral-100 shrink-0">
        Kanapelər
      </button>
      <button onclick="setCategory('hot')" id="tab-hot" class="px-3.5 py-1.5 text-xs font-semibold rounded-xl text-neutral-600 hover:bg-neutral-100 shrink-0">
        İsti Yeməklər
      </button>
      <button onclick="setCategory('desserts')" id="tab-desserts" class="px-3.5 py-1.5 text-xs font-semibold rounded-xl text-neutral-600 hover:bg-neutral-100 shrink-0">
        Desertlər
      </button>
      <button onclick="setCategory('drinks')" id="tab-drinks" class="px-3.5 py-1.5 text-xs font-semibold rounded-xl text-neutral-600 hover:bg-neutral-100 shrink-0">
        İçkilər
      </button>
    </div>

    <!-- HORIZONTAL SWIPEABLE DISH CAROUSEL (SAĞA-SOLA SÜRÜŞƏN) -->
    <div class="relative mb-8">
      <div id="dishes-carousel" class="flex items-stretch gap-3.5 overflow-x-auto snap-x snap-mandatory py-2 px-1 no-scrollbar touch-pan-x"></div>
      <div class="text-center text-[10px] text-neutral-400 font-medium mt-1.5">
        ← Barmağınızla sağa və sola sürüşdürün →
      </div>
    </div>

    <!-- RƏSMİ ƏMƏKDAŞLIQLAR BÖLMƏSİ -->
    <section id="emekdasliqlar" class="pt-8 pb-4 border-t border-neutral-200">
      <div class="text-center mb-5">
        <span class="inline-block px-3 py-1 rounded-full bg-neutral-100 text-black text-[10px] font-bold uppercase tracking-wider mb-1.5">
          Etibar və Əməkdaşlıq
        </span>
        <h2 class="font-display text-xl sm:text-2xl font-bold text-neutral-950">
          Rəsmi Əməkdaşlıqlarımız
        </h2>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div class="bg-white border border-neutral-200 rounded-xl p-3 text-center flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=200&q=80" alt="AZAL" class="w-10 h-10 rounded-full object-cover mb-1.5 border border-neutral-200">
          <div class="font-black text-xs text-black">AZAL Airlines</div>
          <div class="text-[10px] text-neutral-500">Milli Aviaşirkət</div>
        </div>
        <div class="bg-white border border-neutral-200 rounded-xl p-3 text-center flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=200&q=80" alt="F1" class="w-10 h-10 rounded-full object-cover mb-1.5 border border-neutral-200">
          <div class="font-black text-xs text-black">Formula 1</div>
          <div class="text-[10px] text-neutral-500">Baku City Circuit</div>
        </div>
        <div class="bg-white border border-neutral-200 rounded-xl p-3 text-center flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=200&q=80" alt="COP29" class="w-10 h-10 rounded-full object-cover mb-1.5 border border-neutral-200">
          <div class="font-black text-xs text-black">COP 29</div>
          <div class="text-[10px] text-neutral-500">İqlim Sammiti (Bakı)</div>
        </div>
        <div class="bg-white border border-neutral-200 rounded-xl p-3 text-center flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=200&q=80" alt="Absheron Mall" class="w-10 h-10 rounded-full object-cover mb-1.5 border border-neutral-200">
          <div class="font-black text-xs text-black">Absheron Mall</div>
          <div class="text-[10px] text-neutral-500">Ticarət Mərkəzi</div>
        </div>
        <div class="bg-white border border-neutral-200 rounded-xl p-3 text-center flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80" alt="WUF13" class="w-10 h-10 rounded-full object-cover mb-1.5 border border-neutral-200">
          <div class="font-black text-xs text-black">WUF 13</div>
          <div class="text-[10px] text-neutral-500">Şəhərsalma Forumu</div>
        </div>
        <div class="bg-white border border-neutral-200 rounded-xl p-3 text-center flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=200&q=80" alt="Baku Expo" class="w-10 h-10 rounded-full object-cover mb-1.5 border border-neutral-200">
          <div class="font-black text-xs text-black">Baku Expo Center</div>
          <div class="text-[10px] text-neutral-500">Sərgi Ziyafətləri</div>
        </div>
      </div>
    </section>
  </main>

  <!-- FIXED BOTTOM ROUND ALUMINUM TRAY (YUVARLAQ ALÜMİNİUM SİNİ) -->
  <aside id="fpv-tray" class="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center transition-transform duration-500 ease-out select-none translate-y-[50%]">
    
    <!-- PULL / EXPAND TOGGLE BAR -->
    <div onclick="toggleTray()" class="cursor-pointer -mb-3 z-50 flex items-center gap-2 bg-neutral-900 text-white hover:bg-black px-4 py-2 rounded-full shadow-xl border border-neutral-700 active:scale-95 text-xs font-bold">
      <span class="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
      <span id="tray-toggle-label">▲ Yuvarlaq Məcməyini Aç</span>
      <span id="tray-badge-portions" class="bg-white text-black text-[10px] font-black rounded-full px-2 py-0.5 ml-1">0 porsiya</span>
    </div>

    <!-- REALISTIC ROUND ALUMINUM TRAY -->
    <div class="relative w-full max-w-[420px] px-2 flex justify-center">
      <div class="aluminum-tray-round relative w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] rounded-full flex flex-col items-center justify-between p-4 shadow-2xl overflow-hidden">
        
        <!-- Concentric Grooves -->
        <div class="aluminum-groove absolute inset-2.5 rounded-full pointer-events-none"></div>
        <div class="aluminum-groove absolute inset-8 rounded-full pointer-events-none opacity-60"></div>
        <div class="aluminum-groove absolute inset-16 rounded-full pointer-events-none opacity-40"></div>

        <!-- Handles -->
        <div class="aluminum-handle absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2.5 h-14 rounded-l-md pointer-events-none"></div>
        <div class="aluminum-handle absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2.5 h-14 rounded-r-md pointer-events-none"></div>

        <!-- Tray Top Header -->
        <div class="relative z-10 w-full pt-1 flex items-center justify-end px-3 text-neutral-800">
          <button onclick="clearTray()" title="Təmizlə" class="p-1.5 rounded-full bg-white/80 text-neutral-600 hover:text-red-600 text-xs ml-auto shadow-xs">
            🗑️
          </button>
        </div>

        <!-- Plated Food Inside Circle -->
        <div class="relative z-10 w-full flex-1 flex items-center justify-center py-2 px-1">
          <div id="tray-items-container" class="w-full max-h-[210px] overflow-y-auto no-scrollbar grid grid-cols-2 gap-2 px-2"></div>
        </div>

        <!-- Tray Bottom Order Button -->
        <div class="relative z-10 w-full pb-1 flex flex-col items-center gap-1">
          <button onclick="openOrderModal()" id="btn-submit-order" disabled class="w-full max-w-[260px] py-2 px-3 bg-black hover:bg-neutral-800 active:scale-95 text-white font-black rounded-xl text-xs shadow-md disabled:opacity-40 disabled:pointer-events-none">
            Sifarişi Ver (WhatsApp)
          </button>
          <span id="tray-portions-count" class="text-[9px] text-neutral-600 font-semibold">0 porsiya seçilib</span>
        </div>
      </div>
    </div>
  </aside>

  <!-- WHATSAPP ORDER MODAL (NO PRICES) -->
  <div id="order-modal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs hidden items-center justify-center p-3 overflow-y-auto">
    <div class="relative w-full max-w-sm bg-white border border-neutral-300 rounded-3xl shadow-2xl overflow-hidden my-auto">
      <div class="px-5 py-3.5 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between">
        <h3 class="font-sans text-base font-black text-black">FAM FOOD — Sifariş</h3>
        <button onclick="closeOrderModal()" class="text-neutral-400 hover:text-black font-bold">✕</button>
      </div>

      <form onsubmit="handleSendWhatsApp(event)" class="p-4 space-y-3">
        <div>
          <label class="block text-[11px] text-neutral-700 mb-0.5 font-bold">Ad və Soyad *</label>
          <input type="text" id="cust-name" required placeholder="məs: Fərid Məmmədov" class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black">
        </div>
        <div>
          <label class="block text-[11px] text-neutral-700 mb-0.5 font-bold">Əlaqə Nömrəsi (WhatsApp) *</label>
          <input type="tel" id="cust-phone" required placeholder="məs: +994 50 123 45 67" class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black">
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-[11px] text-neutral-700 mb-0.5 font-bold">Tədbir Tarixi *</label>
            <input type="date" id="cust-date" required class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-2 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black">
          </div>
          <div>
            <label class="block text-[11px] text-neutral-700 mb-0.5 font-bold">Qonaq Sayı</label>
            <input type="number" id="cust-guests" placeholder="məs: 20 nəfər" class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-2 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black">
          </div>
        </div>
        <div>
          <label class="block text-[11px] text-neutral-700 mb-0.5 font-bold">Tədbir Ünvanı</label>
          <input type="text" id="cust-address" placeholder="məs: Bakı ş., Nizami küç. 45" class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-black">
        </div>

        <div class="bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-xs">
          <div class="flex justify-between font-bold text-black mb-1 border-b border-neutral-200 pb-1">
            <span>Seçilmiş Təamlar:</span>
            <span id="modal-summary-portions">0 porsiya</span>
          </div>
          <div id="modal-items-list" class="max-h-24 overflow-y-auto space-y-1 text-neutral-700 text-[11px]"></div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-1">
          <button type="button" onclick="closeOrderModal()" class="px-3 py-2 text-xs font-semibold text-neutral-600">Geri</button>
          <button type="submit" class="px-4 py-2.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-xs shadow-md">
            WhatsApp ilə Göndər
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- JAVASCRIPT LOGIC -->
  <script>
    const DISHES = [
      { id: '1', name: 'Klassik İtalyan Brusketta', cat: 'canapes', img: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80', desc: 'Xırçıltılı kənd çabattası, şirəli pomidorlar, təzə reyhan və sızma zeytun yağı.' },
      { id: '2', name: 'Tüstülənmiş Somon Rulonu', cat: 'canapes', img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80', desc: 'Premium Norveç qızılbalığı, kremli Philadelphia pendiri və təzə şüyüd.' },
      { id: '3', name: 'Truffel Pendir Topları', cat: 'canapes', img: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80', desc: 'Rikotta və parmezan qarışığı, qara truffel yağı və xırdalanmış qızılı püstə.' },
      { id: '4', name: 'Prosciutto & İncir Qanapesi', cat: 'canapes', img: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=600&q=80', desc: 'Parma vetçinası, mövsümi şirəli incir dilimi və Modena balzamiko kremi.' },
      { id: '5', name: 'Pələng Kreveti & Guacamole', cat: 'canapes', img: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=600&q=80', desc: 'Kövrək mini tartolet, yetişmiş avokado kreması və qızardılmış pələng kreveti.' },
      { id: '6', name: 'Gourmet Mini Wagyu Burger', cat: 'hot', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', desc: 'Fransız brioche çörəyi, közdə bişmiş Wagyu mal əti kotleti, karamelize soğan.' },
      { id: '7', name: 'Şişdə Şirəli Toyuq Satay', cat: 'hot', img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80', desc: 'Limonotu ilə marinad olunmuş toyuq filesi, qızardılmış küncüt və isti fıstıq sousu.' },
      { id: '8', name: 'Ətirli Təndir Quzu Qabırğaları', cat: 'hot', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', desc: 'Təzə kəklikotu və rozmarin ilə zəif odda bişirilmiş quzu qabırğası, narşərab.' },
      { id: '9', name: 'Qril Somon Steyki Şişdə', cat: 'hot', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80', desc: 'Limonlu kərə yağı sousu və yaşıl qulançar ilə qrillənmiş Atlantik qızılbalıq.' },
      { id: '10', name: 'Mozzarella & İspanaqlı Arancini', cat: 'hot', img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80', desc: 'Qızılı panko çörək qabığında kremli risotto və əriyən mozzarella pendiri.' },
      { id: '11', name: 'Fransız Meyvəli Mini Tartelet', cat: 'desserts', img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80', desc: 'Kərə yağlı kövrək səbət, vanilli maskarpone kremi, təzə moruq və çiyələk.' },
      { id: '12', name: 'Belçika Şokoladlı Mousse', cat: 'desserts', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80', desc: '70% tünd Callebaut şokoladından hazırlanmış zərif hava moussu.' },
      { id: '13', name: 'Parisienne Makaron Triosu', cat: 'desserts', img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80', desc: 'Püstəli qanaş, duzlu kərə yağlı karamel və təbii moruq cemi.' },
      { id: '14', name: 'Zərif Giləmeyvəli Panna Cotta', cat: 'desserts', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', desc: 'Madakaskar vanili ilə zərif italyan deserti və meşə giləmeyvələri konfisi.' },
      { id: '15', name: 'Egzotik Təbii Meyvə Şişləri', cat: 'desserts', img: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=600&q=80', desc: 'Təzə ananas, şirin manqo, kivi, çiyələk və nanə siropu.' },
      { id: '16', name: 'Quba Alma & Göyçay Nar Şirəsi', cat: 'drinks', img: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80', desc: '100% təbii meyvə, soyuq sıxılmış vitamin deposu, şəkərsiz.' },
      { id: '17', name: 'Ev Üsulu Nanəli Laym Limonadı', cat: 'drinks', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80', desc: 'Təzə laym şirəsi, əzilmiş bağ nanəsi yarpaqları, dağ balı.' },
      { id: '18', name: 'Ənənəvi Meşə Giləmeyvəsi Morzesi', cat: 'drinks', img: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80', desc: 'Dağ zoğalı, meşə böyürtkəni və qara qarağat dəmləməsi.' },
      { id: '19', name: 'Kəklikotulu Ətirli Lənkəran Çayı', cat: 'drinks', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80', desc: 'Seçmə Lənkəran iri yarpaqlı çayı, Şahdağ kəklikotu ilə termos servisi.' }
    ];

    let currentCategory = 'all';
    let tray = [];
    let isTrayExpanded = false;

    const d = new Date();
    d.setDate(d.getDate() + 2);
    document.getElementById('cust-date').value = d.toISOString().split('T')[0];

    function renderDishes() {
      const carousel = document.getElementById('dishes-carousel');
      const filtered = DISHES.filter(d => currentCategory === 'all' || d.cat === currentCategory);

      carousel.innerHTML = filtered.map(dish => {
        const inTray = tray.find(t => t.id === dish.id);
        const count = inTray ? inTray.qty : 0;
        return \`
          <div class="w-[260px] shrink-0 snap-center bg-white border border-neutral-200 rounded-2xl p-3 flex flex-col justify-between shadow-xs">
            <div>
              <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-2.5 border border-neutral-200">
                <img src="\${dish.img}" alt="\${dish.name}" class="w-full h-full object-cover">
                \${count > 0 ? \`<span class="absolute bottom-1.5 right-1.5 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-md">\${count} porsiya</span>\` : ''}
              </div>
              <h3 class="font-sans text-sm font-bold text-neutral-900 mb-0.5 leading-snug">\${dish.name}</h3>
              <p class="text-[11px] text-neutral-500 line-clamp-2 leading-tight mb-2.5">\${dish.desc}</p>
            </div>
            <button onclick="addToTray('\${dish.id}', event)" class="w-full py-2 px-3 text-xs font-bold text-white bg-black hover:bg-neutral-800 rounded-xl shadow-xs active:scale-95 transition-all">
              + Məcməyiyə At
            </button>
          </div>
        \`;
      }).join('');
    }

    function setCategory(cat) {
      currentCategory = cat;
      const tabs = ['all', 'canapes', 'hot', 'desserts', 'drinks'];
      tabs.forEach(t => {
        const btn = document.getElementById('tab-' + t);
        if (btn) {
          if (t === cat) {
            btn.className = 'px-3.5 py-1.5 text-xs font-bold rounded-xl bg-black text-white shrink-0';
          } else {
            btn.className = 'px-3.5 py-1.5 text-xs font-semibold rounded-xl text-neutral-600 hover:bg-neutral-100 shrink-0';
          }
        }
      });
      renderDishes();
    }

    function addToTray(dishId, event) {
      const dish = DISHES.find(d => d.id === dishId);
      if (!dish) return;

      if (event && event.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect();
        const trayAnchor = document.getElementById('fpv-tray');
        const trayRect = trayAnchor ? trayAnchor.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight - 80 };

        const flyEl = document.createElement('div');
        flyEl.className = 'animate-fly w-14 h-14 rounded-full overflow-hidden border-2 border-white ring-2 ring-black shadow-2xl bg-white';
        flyEl.innerHTML = \`<img src="\${dish.img}" class="w-full h-full object-cover">\`;
        flyEl.style.left = rect.left + 'px';
        flyEl.style.top = rect.top + 'px';
        flyEl.style.setProperty('--tw-fly-x', (trayRect.left + 80 - rect.left) + 'px');
        flyEl.style.setProperty('--tw-fly-y', (trayRect.top + 30 - rect.top) + 'px');
        flyEl.style.setProperty('--tw-fly-y-mid', ((trayRect.top - rect.top) * 0.45 - 50) + 'px');

        document.body.appendChild(flyEl);
        setTimeout(() => flyEl.remove(), 750);
      }

      const existing = tray.find(t => t.id === dishId);
      if (existing) {
        existing.qty += 1;
      } else {
        tray.push({ id: dish.id, name: dish.name, img: dish.img, qty: 1 });
      }

      renderDishes();
      renderTray();
    }

    function updateQty(dishId, delta) {
      const item = tray.find(t => t.id === dishId);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) {
        tray = tray.filter(t => t.id !== dishId);
      }
      renderDishes();
      renderTray();
    }

    function removeFromTray(dishId) {
      tray = tray.filter(t => t.id !== dishId);
      renderDishes();
      renderTray();
    }

    function clearTray() {
      tray = [];
      renderDishes();
      renderTray();
    }

    function toggleTray() {
      isTrayExpanded = !isTrayExpanded;
      const trayEl = document.getElementById('fpv-tray');
      const label = document.getElementById('tray-toggle-label');
      if (isTrayExpanded) {
        trayEl.classList.remove('translate-y-[50%]');
        trayEl.classList.add('translate-y-0');
        label.innerText = '▼ Məcməyini Aşağı Sal';
      } else {
        trayEl.classList.remove('translate-y-0');
        trayEl.classList.add('translate-y-[50%]');
        label.innerText = '▲ Yuvarlaq Məcməyini Aç';
      }
    }

    function renderTray() {
      const totalCount = tray.reduce((sum, item) => sum + item.qty, 0);

      document.getElementById('nav-tray-count').innerText = totalCount;
      document.getElementById('tray-badge-portions').innerText = totalCount + ' porsiya';
      document.getElementById('tray-portions-count').innerText = totalCount > 0 ? totalCount + ' porsiya seçilib' : 'Məcməyi boşdur';

      const btnSubmit = document.getElementById('btn-submit-order');
      if (tray.length === 0) {
        btnSubmit.setAttribute('disabled', 'true');
      } else {
        btnSubmit.removeAttribute('disabled');
      }

      const container = document.getElementById('tray-items-container');
      if (tray.length === 0) {
        container.innerHTML = \`
          <div class="col-span-2 py-6 text-center text-neutral-500">
            <p class="font-sans font-bold text-xs text-neutral-800">Məcməyi Boşdur</p>
            <p class="text-[10px]">Bufetdən yemək seçib əlavə edin.</p>
          </div>
        \`;
        return;
      }

      container.innerHTML = tray.map(item => \`
        <div class="animate-drop-bounce relative bg-white/95 border border-neutral-300 rounded-xl p-1.5 flex flex-col items-center justify-between shadow-xs">
          <button onclick="removeFromTray('\${item.id}')" class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold flex items-center justify-center">✕</button>
          <div class="w-10 h-10 rounded-full overflow-hidden border border-neutral-300 mb-1 shadow-2xs">
            <img src="\${item.img}" class="w-full h-full object-cover">
          </div>
          <h4 class="text-[10px] font-bold text-neutral-900 truncate max-w-full leading-tight">\${item.name}</h4>
          <span class="text-[9px] text-neutral-500 font-semibold mb-1">\${item.qty} porsiya</span>
          <div class="flex items-center justify-between w-full bg-neutral-100 rounded-lg p-0.5 text-xs">
            <button onclick="updateQty('\${item.id}', -1)" class="w-4 h-4 flex items-center justify-center text-neutral-700 hover:text-black font-bold">-</button>
            <span class="font-mono text-[9px] font-black text-black">\${item.qty}</span>
            <button onclick="updateQty('\${item.id}', 1)" class="w-4 h-4 flex items-center justify-center text-neutral-700 hover:text-black font-bold">+</button>
          </div>
        </div>
      \`).join('');
    }

    function openOrderModal() {
      if (tray.length === 0) return;
      const modal = document.getElementById('order-modal');
      const list = document.getElementById('modal-items-list');
      const totalCount = tray.reduce((sum, item) => sum + item.qty, 0);

      document.getElementById('modal-summary-portions').innerText = totalCount + ' porsiya';

      list.innerHTML = tray.map(item => \`
        <div class="flex items-center justify-between">
          <span>\${item.name}</span>
          <span class="font-bold text-black">\${item.qty} porsiya</span>
        </div>
      \`).join('');

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeOrderModal() {
      const modal = document.getElementById('order-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    function handleSendWhatsApp(e) {
      e.preventDefault();
      const name = document.getElementById('cust-name').value.trim();
      const phone = document.getElementById('cust-phone').value.trim();
      const date = document.getElementById('cust-date').value;
      const guests = document.getElementById('cust-guests').value.trim();
      const address = document.getElementById('cust-address').value.trim();

      const totalCount = tray.reduce((sum, item) => sum + item.qty, 0);

      let msg = "Salam! FAM FOOD saytından yeni keyterinq sifarişim var:\\n";
      tray.forEach(item => {
        msg += \`- \${item.name} x \${item.qty} porsiya\\n\`;
      });
      msg += "------------------\\n";
      msg += \`Ümumi Porsiya: \${totalCount} porsiya\\n\`;
      msg += \`Tarix: \${date || 'Göstərilməyib'}\\n\`;
      msg += \`Ünvan: \${address || 'Təyin ediləcək'}\\n\`;
      if (name) msg += \`Sifarişçi: \${name}\\n\`;
      if (phone) msg += \`Əlaqə: \${phone}\\n\`;
      if (guests) msg += \`Qonaq Sayı: \${guests} nəfər\\n\`;

      const targetPhone = "994105282632";
      const waUrl = \`https://wa.me/\${targetPhone}?text=\${encodeURIComponent(msg)}\`;
      window.open(waUrl, '_blank');
      closeOrderModal();
    }

    // Initialize
    renderDishes();
    renderTray();
  </script>
</body>
</html>
`;
