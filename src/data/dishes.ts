import { Dish, Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'canapes',
    name: 'Soyuq Qəlyanaltılar & Kanapelər',
    description: 'Xırçıltılı brusketta, zərif somon rulonları və təbii pendir kanapeləri'
  },
  {
    id: 'hot',
    name: 'İsti Yeməklər & Qril',
    description: 'Şirəli qril şişləri, mini gourmet burgerlər və təndir qabırğası'
  },
  {
    id: 'desserts',
    name: 'Desertlər & Meyvə',
    description: 'Təzə giləmeyvəli mini tartoletlər, şokoladlı mousse və makaronlar'
  },
  {
    id: 'drinks',
    name: 'İçkilər & Təravət',
    description: 'Təbii soyuq sıxım şirələr, ev üsulu limonad və buzlu meşə morzesi'
  }
];

export const DISHES: Dish[] = [
  // --- 1. SOYUQ QƏLYANALTILAR & KANAPELƏR ---
  {
    id: 'canape-bruschetta',
    name: 'Klassik İtalyan Brusketta',
    category: 'canapes',
    description: 'Xırçıltılı kənd çabattası, şirəli heirloom pomidorları, təzə reyhan, sarımsaqlı sızma zeytun yağı və balzamiko qlazuru.',
    portionSize: '2 ədəd (80 q)',
    tags: ['Vegetarian', 'Populyar'],
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🥖'
  },
  {
    id: 'canape-salmon-roll',
    name: 'Tüstülənmiş Somon Rulonu',
    category: 'canapes',
    description: 'Premium Norveç qızılbalığı, kremli Philadelphia pendiri, kapers dənələri və zərif təzə şüyüd ləçəkləri.',
    portionSize: '2 ədəd (75 q)',
    tags: ['Şefin Seçimi', 'Dəniz Məhsulu'],
    isChefSpecial: true,
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🍣'
  },
  {
    id: 'canape-truffle-cheese',
    name: 'Truffel & Qozlu Pendir Topları',
    category: 'canapes',
    description: 'İtalyan rikotta və parmezan qarışığı, qara truffel yağı, xırdalanmış qızılı püstə və dağ balı damlası.',
    portionSize: '3 ədəd (70 q)',
    tags: ['Gurme', 'Vegetarian'],
    isChefSpecial: true,
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🧀'
  },
  {
    id: 'canape-prosciutto-fig',
    name: 'Prosciutto & İncirli Kanapé',
    category: 'canapes',
    description: 'Zərif dilimlənmiş Parma vetçinası, şirəli incir loxması, keçi pendiri və qatı Modena balzamiko kremi.',
    portionSize: '2 ədəd (85 q)',
    tags: ['Premium', 'Şefin Seçimi'],
    imageUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🥓'
  },
  {
    id: 'canape-prawn-avocado',
    name: 'Pələng Kreveti & Guacamole Səbəti',
    category: 'canapes',
    description: 'Kövrək mini tartolet, yetişmiş təbii avokado kreması, zərif ədviyyatlı qızardılmış pələng kreveti və küncüt.',
    portionSize: '2 ədəd (90 q)',
    tags: ['Dəniz Məhsulu', 'Ziyafət'],
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🍤'
  },

  // --- 2. İSTİ YEMƏKLƏR & QRİL ---
  {
    id: 'hot-wagyu-burger',
    name: 'Gourmet Mini Wagyu Burger',
    category: 'hot',
    description: 'Fransız kərə yağlı brioche çörəyi, közdə bişmiş Wagyu mal əti kotleti, karamelize qırmızı soğan və cheddar pendiri.',
    portionSize: '1 ədəd (110 q)',
    tags: ['Ən Çox Sifariş', 'İsti Servis'],
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🍔'
  },
  {
    id: 'hot-chicken-satay',
    name: 'Şişdə Şirəli Toyuq Satay',
    category: 'hot',
    description: 'Kokos südü və limonotu ilə marinad olunmuş toyuq filesi, qızardılmış küncüt dənələri və isti fıstıq sousu.',
    portionSize: '2 şiş (140 q)',
    tags: ['Qril', 'Şirəli Ət'],
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🍢'
  },
  {
    id: 'hot-lamb-ribs',
    name: 'Ətirli Təndir Quzu Qabırğaları',
    category: 'hot',
    description: 'Təzə dağ kəklikotu və rozmarin ilə zəif odda bişirilmiş şirəli quzu qabırğası, qatı narşərab qlazuru.',
    portionSize: '2 tikə (170 q)',
    tags: ['Premium', 'Şefin Seçimi'],
    isChefSpecial: true,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🍖'
  },
  {
    id: 'hot-salmon-skewer',
    name: 'Qril Somon Steyki Şişdə',
    category: 'hot',
    description: 'Təzə kərə yağı və laym qabığı ilə qrillənmiş Atlantik qızılbalıq loxmaları, yaşıl qulançar və limonlu sous.',
    portionSize: '1 şiş (130 q)',
    tags: ['Dəniz Məhsulu', 'Sağlam Qida'],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🐟'
  },
  {
    id: 'hot-truffle-arancini',
    name: 'Mozzarella & İspanaqlı Arancini',
    category: 'hot',
    description: 'Xırçıltılı qızılı panko çörək qabığında safranlı risotto, içində əriyən mozzarella pendiri və pomidor sousu.',
    portionSize: '2 ədəd (100 q)',
    tags: ['Vegetarian', 'İtalyan'],
    imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🧆'
  },

  // --- 3. DESERTLƏR & MEYVƏ ---
  {
    id: 'dessert-berry-tart',
    name: 'Fransız Meyvəli Mini Tartelet',
    category: 'desserts',
    description: 'Kərə yağlı kövrək qum xəmiri səbəti, vanilli Madakaskar maskarpone kremi, təzə moruq, böyürtkən və nanə.',
    portionSize: '1 ədəd (85 q)',
    tags: ['Şefin Seçimi', 'Şirin Masa'],
    isChefSpecial: true,
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🥧'
  },
  {
    id: 'dessert-chocolate-mousse',
    name: 'Belçika Şokoladlı Mousse',
    category: 'desserts',
    description: '70% tünd Callebaut şokoladından hazırlanmış zərif hava moussu, zərif qızıl vərəq və xırda portağal zesti.',
    portionSize: '1 stəkan (95 q)',
    tags: ['Premium Desert', 'Şokolad'],
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🍨'
  },
  {
    id: 'dessert-macarons',
    name: 'Parisienne Makaron Triosu',
    category: 'desserts',
    description: 'Badam unundan ənənəvi fransız makaronları: fıstıqlı qanaş, duzlu kərə yağlı karamel və təbii moruq cemi.',
    portionSize: '3 ədəd (55 q)',
    tags: ['Rəngarəng', 'Gluten-Free'],
    imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🧁'
  },
  {
    id: 'dessert-panna-cotta',
    name: 'Zərif Giləmeyvəli Panna Cotta',
    category: 'desserts',
    description: 'Qaymaq və təbii vanil çubuğundan zərif italyan deserti, meşə giləmeyvələri konfisi ilə şüşə qədəhdə.',
    portionSize: '1 stəkan (100 q)',
    tags: ['Klassik', 'Yüngül'],
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🍮'
  },
  {
    id: 'dessert-fruit-skewer',
    name: 'Egzotik Təbii Meyvə Şişləri',
    category: 'desserts',
    description: 'Təzə kəsilmiş Kosta-Rika ananası, yetişmiş şirin manqo, kivi, çiyələk və təravətləndirici təbii nanə şirəsi.',
    portionSize: '2 şiş (120 q)',
    tags: ['Təbii Vitamin', 'Vegan'],
    imageUrl: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🍓'
  },

  // --- 4. İÇKİLƏR & TƏRAVƏT ---
  {
    id: 'drink-pomegranate-juice',
    name: 'Quba Alma & Göyçay Nar Şirəsi',
    category: 'drinks',
    description: '100% təbii meyvə, heç bir şəkər və su əlavə edilmədən birbaşa soyuq sıxılmış vitamin zənginliyi.',
    portionSize: '250 ml şüşə',
    tags: ['100% Təbii', 'Şəkərsiz'],
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🍷'
  },
  {
    id: 'drink-mint-lemonade',
    name: 'Ev Üsulu Nanəli Laym Limonadı',
    category: 'drinks',
    description: 'Təzə sıxılmış sarı limon və laym şirəsi, əzilmiş bağ nanəsi yarpaqları, dağ balı və bulaq suyu.',
    portionSize: '300 ml stəkan',
    tags: ['Təravətləndirici', 'Populyar'],
    isPopular: true,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🍋'
  },
  {
    id: 'drink-berry-morse',
    name: 'Ənənəvi Meşə Giləmeyvəsi Morzesi',
    category: 'drinks',
    description: 'Dağ zoğalı, meşə böyürtkəni və qara qarağat dəmləməsi, yüngül darçın ətri və buz kristalları ilə.',
    portionSize: '300 ml stəkan',
    tags: ['Ənənəvi', 'Antioksidant'],
    imageUrl: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🧃'
  },
  {
    id: 'drink-green-detox',
    name: 'Zəncəfilli Yaşıl Detoks Kokteyli',
    category: 'drinks',
    description: 'Yaşıl Granny Smith alması, xiyar, təzə kərəviz, zəncəfil kökü və chia toxumları ilə zəngin qarışıq.',
    portionSize: '250 ml şüşə',
    tags: ['Sağlamlıq', 'Detoks'],
    isChefSpecial: true,
    imageUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🥬'
  },
  {
    id: 'drink-lenkeran-tea',
    name: 'Kəklikotulu Ətirli Lənkəran Çayı',
    category: 'drinks',
    description: 'Seçmə Lənkəran iri yarpaqlı qara çayı, Şahdağ kəklikotu, mixək və limon dilimi ilə termos servisi.',
    portionSize: 'Termos servisi',
    tags: ['Milli İrs', 'İsti Servis'],
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80',
    fallbackEmoji: '🫖'
  }
];
