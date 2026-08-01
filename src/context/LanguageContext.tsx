import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav & General
    nav_home: 'Home',
    nav_shop: 'Shop',
    nav_collections: 'Collections',
    nav_brands: 'Brands',
    nav_alternative_brands: 'Alternative Brands',
    nav_bestsellers: 'Best Sellers',
    nav_about: 'About Us',
    nav_contact: 'Contact',
    nav_my_account: 'My Account',
    nav_wishlist: 'Wishlist',
    nav_cart: 'Cart',
    copyright: '© 2026 BNS. ALL RIGHTS RESERVED.',
    free_shipping_bar: 'COMPLIMENTARY SHIPPING ON ORDERS OVER 10,000 DA',

    // Scent Philosophy & Inspired Disclaimer
    inspired_disclaimer_title: 'Our Perfumery Philosophy',
    inspired_disclaimer_badge: 'TRUST & AUTHENTICITY',
    inspired_disclaimer_text: 'We offer premium inspired fragrances that capture the scent of luxury designer perfumes. These are not original brand products, but carefully crafted alternatives with excellent quality and long-lasting performance.',
    inspired_disclaimer_tagline: 'High-end alternative perfumery at a fraction of the cost, with no compromise on quality.',
    alternative_brands_subtitle: 'ELITE RECREATIONS',
    alternative_brands_title: 'ALTERNATIVE BRANDS',
    alternative_brands_desc: 'Explore the legendary perfume houses of the Middle East and alternative perfumery, renowned for their incredible oil concentrations, projection, and luxurious scent profiles.',
    available_perfumes_count: 'Available Perfumes',
    explore_brand_perfumes: 'Explore Brand',

    // Hero Section
    hero_subtitle: 'PREMIUM INSPIRED FRAGRANCES',
    hero_title: 'BNS',
    hero_desc: "Discover high-quality inspired fragrances crafted to capture the essence of the world's most iconic perfumes—offering exceptional quality, long-lasting performance, and affordable luxury.",
    hero_cta: 'EXPLORE COLLECTION',

    // Scent Finder / Filter Bar
    finder_title: 'BNS Scent Finder',
    finder_reset: 'Reset Selections',
    finder_search_label: 'Search Fragrance',
    finder_search_placeholder: 'Search perfumes...',
    finder_brand_label: 'Fashion House',
    finder_brand_all: 'All Brands',
    finder_gender_label: 'Aura / Gender',
    finder_gender_all: 'All Genders',
    finder_price_label: 'Price Range',
    finder_price_all: 'All Prices',
    finder_price_under: 'Under',
    finder_notes_label: 'Scent Accords',
    finder_notes_all: 'All Notes',
    finder_discover: 'Discover',

    // Product Card / Grid
    selection_maison: 'BNS Selection',
    quick_view: 'Quick View',
    add_to_bag: 'Add to Bag',
    out_of_stock: 'Out of Stock',
    best_seller: 'Best Seller',
    new_arrival: 'New Arrival',
    in_stock: 'In Stock',
    products_found: 'PRODUCTS FOUND',
    sort_by: 'SORT BY',
    sort_best_selling: 'Best Selling',
    sort_price_low: 'Price: Low to High',
    sort_price_high: 'Price: High to Low',
    sort_rating: 'Customer Rating',
    no_results: 'No exquisite fragrances found matching your selected aura.',

    // Sections
    bestsellers_subtitle: 'EXQUISITE FLACONS',
    bestsellers_title: 'THE BEST SELLERS',
    bestsellers_desc: 'A collection of our most coveted haute perfumes, hand-selected for ultimate distinction.',
    showcase_subtitle: 'PRESTIGE HOUSES',
    showcase_title: 'CURATED DESIGNERS',
    pledge_subtitle: 'THE BNS PLEDGE',
    pledge_title: 'WHY CHOOSE BNS',

    // Newsletter
    news_subtitle: 'JOIN BNS',
    news_title: 'STAY INFORMED',
    news_desc: 'Subscribe to receive special offers, private sales, and new collection previews directly in your inbox.',
    news_placeholder: 'Enter your email address...',
    news_cta: 'Join',

    // Footer columns
    footer_shop: 'SHOP',
    footer_service: 'CUSTOMER SERVICE',
    footer_about: 'ABOUT US',
    footer_newsletter: 'NEWSLETTER',

    // Product detail modal
    scent_story: 'The Scent Story',
    scent_notes: 'Scent Notes',
    top_notes: 'Top Notes',
    heart_notes: 'Heart Notes',
    base_notes: 'Base Notes',
    specifications: 'Specifications',
    origin: 'Origin',
    concentration: 'Concentration',
    guarantee: 'Authenticity Guarantee',
    close_details: 'Close Details',
    added_to_cart: 'Added to your BNS Bag!',

    // Genders
    Men: 'Men',
    Women: 'Women',
    Unisex: 'Unisex',

    // Notes
    Woody: 'Woody',
    Amber: 'Amber',
    Vanilla: 'Vanilla',
    Citrus: 'Citrus',
    Floral: 'Floral',
    Fresh: 'Fresh',
    Musky: 'Musky',
    Leather: 'Leather',
    Oriental: 'Oriental',

    // Dynamic brand titles and values
    Sospiro: 'Sospiro',
    Dior: 'Dior',
    'Tom Ford': 'Tom Ford',
    Chanel: 'Chanel',
    Creed: 'Creed',
    YSL: 'YSL',
    Xerjoff: 'Xerjoff',
    Initio: 'Initio',
    Amouage: 'Amouage',
    'Parfums de Marly': 'Parfums de Marly',
    
    // Core features
    shipping_title: 'FREE SHIPPING',
    shipping_desc: 'On orders over 10,000 DA',
    authentic_title: 'PREMIUM INSPIRED SCENTS',
    authentic_desc: 'High-quality, long-lasting recreation',
    secure_title: 'SECURE PAYMENT',
    secure_desc: 'Safe & encrypted checkout',
    support_title: 'PREMIUM SUPPORT',
    support_desc: '24/7 customer service',

    // Cart Drawer Keys
    cart_drawer_title: 'Private Coffret Bag',
    cart_empty: 'Your Coffret is Empty',
    cart_empty_desc: 'There are currently no luxury fragrances in your cart. Discover our signature collections to find your olfactory aura.',
    shop_collection: 'Shop Collection',
    subtotal: 'Subtotal',
    tax: 'Luxury Sales Tax (8%)',
    shipping: 'White-Glove Delivery',
    complimentary: 'COMPLIMENTARY',
    gift_wrapping: 'Includes custom black velvet gift wrapping',
    total_invoice: 'Total Invoice',
    secure_checkout: 'Checkout via WhatsApp',
    processing: 'Preparing WhatsApp...',
    purchase_completed: 'Purchase Completed',
    order_id: 'Order: BNS-7264-91',
    order_success_desc: 'Your luxury order has been registered successfully. Our white-glove courier is preparing your temperature-controlled sample coffret. A tracking signature dispatch link has been forwarded to your registered email.',
    continue_exploring: 'Continue Exploring',
    wishlist_drawer_title: 'My Wishlist',
  },
  fr: {
    // Nav & General
    nav_home: 'Accueil',
    nav_shop: 'Boutique',
    nav_collections: 'Collections',
    nav_brands: 'Marques',
    nav_alternative_brands: 'Marques Alternatives',
    nav_bestsellers: 'Meilleures Ventes',
    nav_about: 'À Propos',
    nav_contact: 'Contact',
    nav_my_account: 'Mon Compte',
    nav_wishlist: 'Favoris',
    nav_cart: 'Panier',
    copyright: '© 2026 BNS. TOUS DROITS RÉSERVÉS.',
    free_shipping_bar: 'LIVRAISON OFFERTE SUR TOUTES LES COMMANDES DE PLUS DE 10 000 DA',

    // Scent Philosophy & Inspired Disclaimer
    inspired_disclaimer_title: 'Notre Philosophie de Parfumerie',
    inspired_disclaimer_badge: 'CONFIANCE & AUTHENTICITÉ',
    inspired_disclaimer_text: 'Nous proposons des parfums d\'inspiration haut de gamme qui capturent l\'essence des parfums de créateurs de luxe. Ce ne sont pas des produits de marque originaux, mais des alternatives soigneusement élaborées, d\'une qualité excellente et d\'une longue tenue.',
    inspired_disclaimer_tagline: 'Une parfumerie alternative haut de gamme à une fraction du prix, sans aucun compromis sur la qualité.',
    alternative_brands_subtitle: 'RECRÉATIONS D\'ÉLITE',
    alternative_brands_title: 'MARQUES ALTERNATIVES',
    alternative_brands_desc: 'Découvrez les maisons de parfumerie légendaires du Moyen-Orient et de la parfumerie alternative, réputées pour leurs concentrations exceptionnelles, leur sillage et leurs accords somptueux.',
    available_perfumes_count: 'Parfums Disponibles',
    explore_brand_perfumes: 'Explorer la Marque',

    // Hero Section
    hero_subtitle: 'PARFUMS D\'INSPIRATION HAUT DE GAMME',
    hero_title: 'BNS',
    hero_desc: 'Découvrez des parfums d\'inspiration de haute qualité conçus pour capturer l\'essence des parfums les plus iconiques au monde, offrant une qualité exceptionnelle, une tenue longue durée et un luxe accessible.',
    hero_cta: 'EXPLORER LA COLLECTION',

    // Scent Finder / Filter Bar
    finder_title: 'Découverte de Parfum',
    finder_reset: 'Réinitialiser',
    finder_search_label: 'Rechercher un Parfum',
    finder_search_placeholder: 'Rechercher des parfums...',
    finder_brand_label: 'Maison de Couture',
    finder_brand_all: 'Toutes les Marques',
    finder_gender_label: 'Aura / Genre',
    finder_gender_all: 'Tous les Genres',
    finder_price_label: 'Gamme de Prix',
    finder_price_all: 'Tous les Prix',
    finder_price_under: 'Moins de',
    finder_notes_label: 'Accords Olfactifs',
    finder_notes_all: 'Toutes les Notes',
    finder_discover: 'Découvrir',

    // Product Card / Grid
    selection_maison: 'Sélection BNS',
    quick_view: 'Aperçu Rapide',
    add_to_bag: 'Ajouter au Panier',
    out_of_stock: 'Rupture de Stock',
    best_seller: 'Best Seller',
    new_arrival: 'Nouveauté',
    in_stock: 'En Stock',
    products_found: 'PRODUITS TROUVÉS',
    sort_by: 'TRIER PAR',
    sort_best_selling: 'Meilleures Ventes',
    sort_price_low: 'Prix : Du plus bas au plus haut',
    sort_price_high: 'Prix : Du plus haut au plus bas',
    sort_rating: 'Évaluation Clients',
    no_results: 'Aucun parfum d\'exception ne correspond à votre sélection.',

    // Sections
    bestsellers_subtitle: 'FLACONS EXQUIS',
    bestsellers_title: 'LES MEILLEURES VENTES',
    bestsellers_desc: 'Une sélection de nos parfums de haute couture les plus convoités, choisis pour leur distinction ultime.',
    showcase_subtitle: 'MAISONS DE PRESTIGE',
    showcase_title: 'CRÉATEURS SÉLECTIONNÉS',
    pledge_subtitle: 'L\'ENGAGEMENT DE BNS',
    pledge_title: 'POURQUOI CHOISIR BNS',

    // Newsletter
    news_subtitle: 'REJOINDRE BNS',
    news_title: 'RESTER INFORMÉ',
    news_desc: 'Inscrivez-vous pour recevoir nos offres spéciales, ventes privées et avant-premières de nouvelles collections directement dans votre boîte de réception.',
    news_placeholder: 'Entrez votre adresse e-mail...',
    news_cta: 'S\'abonner',

    // Footer columns
    footer_shop: 'BOUTIQUE',
    footer_service: 'SERVICE CLIENT',
    footer_about: 'À PROPOS DE NOUS',
    footer_newsletter: 'LETTRE D\'INFORMATION',

    // Product detail modal
    scent_story: 'L\'Histoire du Parfum',
    scent_notes: 'Notes de Parfum',
    top_notes: 'Notes de Tête',
    heart_notes: 'Notes de Cœur',
    base_notes: 'Notes de Fond',
    specifications: 'Spécifications',
    origin: 'Origine',
    concentration: 'Concentration',
    guarantee: 'Garantie d\'Authenticité',
    close_details: 'Fermer',
    added_to_cart: 'Ajouté à votre panier BNS !',

    // Genders
    Men: 'Hommes',
    Women: 'Femmes',
    Unisex: 'Unisexe',

    // Notes
    Woody: 'Boisé',
    Amber: 'Ambré',
    Vanilla: 'Vanille',
    Citrus: 'Hespéridé',
    Floral: 'Floral',
    Fresh: 'Frais',
    Musky: 'Musqué',
    Leather: 'Cuir',
    Oriental: 'Oriental',

    // Dynamic brand titles and values
    Sospiro: 'Sospiro',
    Dior: 'Dior',
    'Tom Ford': 'Tom Ford',
    Chanel: 'Chanel',
    Creed: 'Creed',
    YSL: 'Yves Saint Laurent',
    Xerjoff: 'Xerjoff',
    Initio: 'Initio',
    Amouage: 'Amouage',
    'Parfums de Marly': 'Parfums de Marly',
    
    // Core features
    shipping_title: 'LIVRAISON GRATUITE',
    shipping_desc: 'Dès 10 000 DA d\'achats',
    authentic_title: 'INSPIRATIONS PREMIUM',
    authentic_desc: 'Eaux de parfum de haute qualité et tenue',
    secure_title: 'PAIEMENT SÉCURISÉ',
    secure_desc: 'Transactions sûres & cryptées',
    support_title: 'ASSISTANCE PRESTIGE',
    support_desc: 'Service client haut de gamme 24h/24',

    // Cart Drawer Keys French
    cart_drawer_title: 'Coffret de Ventes Privées',
    cart_empty: 'Votre Coffret est Vide',
    cart_empty_desc: 'Il n’y a actuellement aucun parfum de luxe dans votre panier. Découvrez nos collections emblématiques pour trouver votre signature.',
    shop_collection: 'Découvrir la Collection',
    subtotal: 'Sous-total',
    tax: 'TVA de Luxe (8%)',
    shipping: 'Livraison Gants Blancs',
    complimentary: 'OFFERT',
    gift_wrapping: 'Comprend un emballage cadeau en velours noir fait main',
    total_invoice: 'Facture Totale',
    secure_checkout: 'Commander via WhatsApp',
    processing: 'Préparation WhatsApp...',
    purchase_completed: 'Achat Réussi',
    order_id: 'Numéro d’ordre: BNS-7264-91',
    order_success_desc: 'Votre commande prestigieuse a été enregistrée avec succès. Notre service de conciergerie prépare votre coffret à température contrôlée. Un lien de suivi sécurisé vous a été envoyé.',
    continue_exploring: 'Continuer l’exploration',
    wishlist_drawer_title: 'Mes Favoris',
  },
  ar: {
    // Nav & General
    nav_home: 'الرئيسية',
    nav_shop: 'المتجر',
    nav_collections: 'المجموعات',
    nav_brands: 'العلامات التجارية',
    nav_alternative_brands: 'العطور البديلة',
    nav_bestsellers: 'الأكثر مبيعاً',
    nav_about: 'عن دارنا',
    nav_contact: 'اتصل بنا',
    nav_my_account: 'حسابي',
    nav_wishlist: 'المفضلة',
    nav_cart: 'حقيبة التسوق',
    copyright: '© ٢٠٢٦ عطور BNS. جميع الحقوق محفوظة.',
    free_shipping_bar: 'توصيل مجاني فاخر لكافة الولايات للطلبات الأكثر من ١٠,٠٠٠ د.ج',

    // Scent Philosophy & Inspired Disclaimer
    inspired_disclaimer_title: 'فلسفتنا في عالم العطور',
    inspired_disclaimer_badge: 'الثقة والأصالة',
    inspired_disclaimer_text: 'نحن نقدم عطورًا مستوحاة فاخرة تحاكي روائح مصممي عطور النخبة. هذه ليست المنتجات الأصلية للعلامات التجارية، ولكنها بدائل تم تركيبها بعناية فائقة بجودة ممتازة وثبات طويل الأمد.',
    inspired_disclaimer_tagline: 'عطور بديلة راقية بجزء بسيط من التكلفة، دون أي مساومة على الجودة والثبات.',
    alternative_brands_subtitle: 'بدائل نخبوية فاخرة',
    alternative_brands_title: 'دور العطور البديلة والشرقية',
    alternative_brands_desc: 'اكتشف دور العطور الشرقية والبديلة الأشهر في العالم العربي والعالم، والمعروفة بتركيزاتها الزيتية الهائلة، ثباتها الخارق، وفخامة هالتها العطرية.',
    available_perfumes_count: 'العطور المتوفرة',
    explore_brand_perfumes: 'استكشف الماركة',

    // Hero Section
    hero_subtitle: 'عطور مستوحاة فاخرة',
    hero_title: 'BNS',
    hero_desc: 'اكتشف عطورًا مستوحاة عالية الجودة تم تركيبها بعناية لمحاكاة جوهر أشهر العطور العالمية—لتقدم لك جودة استثنائية، ثباتًا طويل الأمد، ورفاهية بأسعار مناسبة.',
    hero_cta: 'استكشف المجموعة',

    // Scent Finder / Filter Bar
    finder_title: 'مستكشف عطور BNS',
    finder_reset: 'إعادة تعيين الاختيارات',
    finder_search_label: 'ابحث عن عطر',
    finder_search_placeholder: 'ابحث في عطورنا الفاخرة...',
    finder_brand_label: 'دار الأزياء',
    finder_brand_all: 'كافة الماركات',
    finder_gender_label: 'الهالة / الجنس',
    finder_gender_all: 'كافة الفئات',
    finder_price_label: 'نطاق السعر',
    finder_price_all: 'كافة الأسعار',
    finder_price_under: 'أقل من',
    finder_notes_label: 'نغمات العطور',
    finder_notes_all: 'كافة النوتات',
    finder_discover: 'اكتشف الآن',

    // Product Card / Grid
    selection_maison: 'اختيار BNS الخاص',
    quick_view: 'عرض سريع',
    add_to_bag: 'إضافة إلى الحقيبة',
    out_of_stock: 'نفذت الكمية',
    best_seller: 'الأكثر مبيعاً',
    new_arrival: 'وصل حديثاً',
    in_stock: 'متوفر بالدار',
    products_found: 'عطور متميزة تم العثور عليها',
    sort_by: 'ترتيب حسب',
    sort_best_selling: 'الأكثر مبيعاً أولاً',
    sort_price_low: 'السعر: من الأقل إلى الأعلى',
    sort_price_high: 'السعر: من الأعلى إلى الأقل',
    sort_rating: 'تقييم النخبة',
    no_results: 'لم نعثر على عطور فاخرة تطابق الهالة المختارة.',

    // Sections
    bestsellers_subtitle: 'زجاجات عطرية مذهلة',
    bestsellers_title: 'العطور الأكثر طلباً',
    bestsellers_desc: 'باقة من عطورنا الأكثر فخامة وجاذبية، منتقاة بعناية لتميز استثنائي لا يُنسى.',
    showcase_subtitle: 'دور عطور النخبة',
    showcase_title: 'مصممون منتقون',
    pledge_subtitle: 'عهد BNS',
    pledge_title: 'لماذا تختار BNS؟',

    // Newsletter
    news_subtitle: 'انضم إلى BNS',
    news_title: 'كن على علم دائم',
    news_desc: 'سجل بريدك الإلكتروني للحصول على عروض حصرية، مبيعات خاصة، والاطلاع الأول على مجموعاتنا القادمة.',
    news_placeholder: 'أدخل عنوان بريدك الإلكتروني...',
    news_cta: 'انضمام',

    // Footer columns
    footer_shop: 'المتجر',
    footer_service: 'خدمة العملاء',
    footer_about: 'معلومات عن الدار',
    footer_newsletter: 'النشرة البريدية',

    // Product detail modal
    scent_story: 'قصة العطر',
    scent_notes: 'النغمات العطرية',
    top_notes: 'نوتات القمة',
    heart_notes: 'نوتات القلب',
    base_notes: 'نوتات القاعدة',
    specifications: 'المواصفات الفنية',
    origin: 'بلد المنشأ',
    concentration: 'التركيز العطري',
    guarantee: 'ضمان الأصالة المطلق',
    close_details: 'إغلاق التفاصيل',
    added_to_cart: 'تمت إضافته بنجاح إلى حقيبة التسوق الخاصة بك!',

    // Genders
    Men: 'رجالي',
    Women: 'نسائي',
    Unisex: 'للجنسين',

    // Notes
    Woody: 'خشبي',
    Amber: 'عنبري',
    Vanilla: 'فانيليا',
    Citrus: 'حمضي',
    Floral: 'زهري',
    Fresh: 'منعش',
    Musky: 'مسكي',
    Leather: 'جلدي',
    Oriental: 'شرقي',

    // Dynamic brand titles and values
    Sospiro: 'سوسبيرو',
    Dior: 'ديور',
    'Tom Ford': 'توم فورد',
    Chanel: 'شانيل',
    Creed: 'كريد',
    YSL: 'إيف سان لوران',
    Xerjoff: 'سيرجوف',
    Initio: 'إنيشيو',
    Amouage: 'أمواج',
    'Parfums de Marly': 'بارفيومز دي مارلي',
    
    // Core features
    shipping_title: 'توصيل مجاني فاخر',
    shipping_desc: 'للطلبات الأكثر من ١٠,٠00 د.ج',
    authentic_title: 'عطور مستوحاة فاخرة',
    authentic_desc: 'بدائل عالية الثبات بجودة تليق بنخبة الجزائر',
    secure_title: 'دفع مشفر آمن',
    secure_desc: 'عمليات دفع آمنة ومحمية بالكامل',
    support_title: 'دعم النخبة على مدار الساعة',
    support_desc: 'خدمة عملاء راقية على مدار ٢٤ ساعة',

    // Cart Drawer Keys Arabic
    cart_drawer_title: 'حقيبة المقتنيات الخاصة',
    cart_empty: 'حقيبتك العطرية فارغة',
    cart_empty_desc: 'لا توجد حالياً أي عطور فاخرة في حقيبتك. تفضل باستكشاف عطورنا الملكية الساحرة لتكتشف هالتك العطرية الخاصة.',
    shop_collection: 'تسوق المجموعة',
    subtotal: 'المجموع الفرعي',
    tax: 'ضريبة المبيعات الفاخرة (٨٪)',
    shipping: 'توصيل ملكي فاخر',
    complimentary: 'مجاني بالكامل',
    gift_wrapping: 'تشتمل على تغليف مخملي أسود خاص بالهدايا',
    total_invoice: 'إجمالي الفاتورة',
    secure_checkout: 'إتمام الطلب عبر الواتساب',
    processing: 'جاري فتح الواتساب...',
    purchase_completed: 'تم الشراء بنجاح',
    order_id: 'رقم الطلب المرجعي: BNS-7264-91',
    order_success_desc: 'تم تسجيل طلبك الفاخر بنجاح في عطور BNS. يقوم خبراؤنا بتحضير العلبة المخملية الخاصة بك تحت درجة حرارة مثالية ومحكمة. سنرسل لك رابط التتبع مباشرة عبر البريد.',
    continue_exploring: 'مواصلة الاستكشاف',
    wishlist_drawer_title: 'قائمة الأمنيات الخاصة',
  },
};

// Dynamic product translation dictionary
const productTranslations: Record<Language, Record<string, { name: string; desc: string; story: string }>> = {
  en: {}, // Fallback directly to original
  fr: {
    'tf-oud-wood': {
      name: 'Oud Wood Intense',
      desc: 'L’un des ingrédients les plus rares, précieux et coûteux de l’arsenal d’un parfumeur, le bois de oud est souvent brûlé dans les temples. Le bois de rose exotique et la cardamome cèdent la place à un mélange fumé de bois de oud rare, de bois de santal et de vétiver.',
      story: 'Conçu sur le concept d’un contraste saisissant de chaleur et de luxe sombre, Oud Wood Intense représente une échappée sensorielle fumée et profonde dans des chambres privées.',
    },
    'dior-sauvage': {
      name: 'Sauvage Elixir',
      desc: 'Sauvage Elixir est une fragrance à la concentration extraordinaire, gorgée de la fraîcheur emblématique de Sauvage avec un cœur enivrant d’épices, une essence de lavande "sur mesure" et un mélange de bois riches et fumants.',
      story: 'Repoussant les limites de la concentration, Sauvage Elixir redéfinit l’intensité masculine. Un ciel de minuit au-dessus de falaises de roches sèches, crépitant de la chaleur d’un feu de joie.',
    },
    'chanel-bleu': {
      name: 'Bleu de Parfum',
      desc: 'Un hymne à la liberté masculine exprimé dans un parfum boisé aromatique au sillage captivant. Une fragrance intemporelle logée dans un flacon d’un bleu profond et mystérieux.',
      story: 'Conçu pour l’homme indépendant qui défie les conventions. Bleu de Parfum représente la brise fraîche et sophistiquée qui se heurte à des résines de bois riches et fumantes.',
    },
    'creed-aventus': {
      name: 'Aventus Imperial',
      desc: 'L’exceptionnel Aventus Imperial célèbre la force, le pouvoir et le succès. Introduit en 2010, il est devenu le parfum le plus couronné de succès dans l’histoire de la Maison Creed.',
      story: 'Inspiré par la vie dramatique d’un empereur historique qui a mené la guerre, la paix et la romance avec la même grandeur. Fabriqué à la main avec des ingrédients précieux.',
    },
    'ysl-tuxedo': {
      name: 'Tuxedo Signature',
      desc: 'Tuxedo marie la brillance sombre du patchouli avec l’éclat sensuel de l’ambre. Hautement structuré, il impose le respect avec une élégance naturelle et sophistiquée de tenue de soirée.',
      story: 'Faisant partie de la collection Le Vestiaire des Parfums d’YSL, Tuxedo capture le contraste de la coupe masculine et féminine dans un sillage unique et envoûtant.',
    },
    'xerjoff-erba': {
      name: 'Erba Gold Royale',
      desc: 'Une combinaison luxueuse d’agrumes de la Méditerranée et de fruits doux reposant sur une fondation d’ambre et de musc blanc. Chaud, séduisant et infiniment opulent.',
      story: 'Un hommage au luxe classique. Présenté dans un cristal enveloppé de velours sur mesure, Erba Gold Royale représente un pur rayon de soleil olfactif fusionné avec des matières royales et dorées.',
    },
    'initio-oud': {
      name: 'Oud for Greatness',
      desc: 'Initio tire sa force de la géométrie sacrée. Oud for Greatness exhale une force de la nature, la formule du Oud dans son expression la plus majestueuse et envoûtante.',
      story: 'Un parfum hautement sacré. Il canalise les vibrations brutes du cosmos pour créer un champ magnétique protecteur d’une présence et d’une assurance inégalées.',
    },
    'amouage-interlude': {
      name: 'Interlude Black Iris',
      desc: 'Un parfum boisé et épicé créé pour évoquer un sentiment d’ordre au milieu du chaos. Interlude Black Iris utilise une palette raffinée pour adoucir les facettes sauvages du chef-d’œuvre original.',
      story: 'Conçu à Oman, ce parfum utilise le précieux béton d’Iris pour apporter un raffinement velouté et beurré à une base légendaire de bois et de résines fumantes.',
    },
    'pdm-layton': {
      name: 'Layton Royal',
      desc: 'Un sillage signature addictif, plein d’élégance et de noblesse. Layton Royal est un délice sensoriel qui s’ouvre sur la fraîcheur de la pomme avant de s’enfoncer dans des notes de bois précieux.',
      story: 'Célébrant la cour équestre royale de Louis XV, Parfums de Marly fusionne l’élégance du patrimoine français avec des ingrédients modernes très intenses.',
    },
    'dior-j-adore': {
      name: 'L’Or de J’adore',
      desc: 'Un chef-d’œuvre d’or liquide. L’Or de J’adore est le parfum dans lequel Francis Kurkdjian, directeur de la création des parfums Dior, exalte la beauté des fleurs de J’adore en jouant sur leurs nuances.',
      story: 'Une traduction sensorielle de l’or fondu. Un bouquet floral hautement raffiné à la texture lumineuse et sensuelle qui épouse la silhouette féminine.',
    },
    'tf-lost-cherry': {
      name: 'Lost Cherry Extrait',
      desc: 'Lost Cherry est un voyage corsé dans ce qui était autrefois interdit ; un parfum contrasté qui révèle une dichotomie séduisante de lueur enjouée et sucrée à l’extérieur et de chair pulpeuse à l’intérieur.',
      story: 'Indulgent, séducteur et sombre. Lost Cherry capture l’équilibre parfait et insaisissable de la douceur acidulée, de la chaleur alcoolisée et des bois lourds.',
    },
    'chanel-no5': {
      name: 'N°5 L’Eau Impériale',
      desc: 'L’essence même du luxe. Un bouquet de fleurs abstraites, une signature légendaire qui a révolutionné la parfumerie française. Une interprétation fraîche et moderne du classique ultime.',
      story: 'Créé en 1921 par Ernest Beaux à la demande de Gabrielle Chanel, qui voulait "un parfum de femme au parfum de femme". Il reste le parfum le plus reconnaissable au monde.',
    },
    'creed-wind-flowers': {
      name: 'Wind Flowers Royal',
      desc: 'Inspiré par une force et une grâce uniques en mouvement. Wind Flowers Royal est un parfum floral, frais et sensuel qui s’ouvre sur le jasmin doux, enveloppé de fleur d’oranger tunisienne zestée.',
      story: 'Féminin, gracieux et athlétique. Un hommage sensoriel au pouvoir du vent, de la brise marine et du mouvement de haute couture.',
    },
  },
  ar: {
    'tf-oud-wood': {
      name: 'عود وود إنتنس',
      desc: 'أحد أندر المكونات وأكثرها قيمة وفخامة وثمناً في ترسانة صانع العطور، حيث يتم حرق خشب العود غالباً في المعابد المليئة بالبخور. يفسح خشب الورد الغريب والهيل الطريق لمزيج مدخن من العود النادر وخشب الصندل والنجيل الهندي.',
      story: 'صُمم هذا العطر على مفهوم التباين العالي بين الدفء والفخامة الداكنة، ليمثل هروباً حسياً عميقاً ومداعباً للروح في غرف الدار الخاصة.',
    },
    'dior-sauvage': {
      name: 'سوفاج إكسير',
      desc: 'سوفاج إكسير هو عطر بتركيز استثنائي منبثق من الانتعاش الأيقوني لعطر سوفاج مع قلب غني بالتوابل، وجرعة لافندر مصممة خصيصاً، ومزيج من الأخشاب الفاخرة المشتعلة.',
      story: 'يتجاوز الحدود المألوفة للتركيز، ليعيد تعريف الجاذبية الذكورية المكثفة. سماء ليلية مرصعة بالنجوم فوق تلال صخرية جافة، تشتعل بدفء نار دافئة.',
    },
    'chanel-bleu': {
      name: 'بلو دي بارفام',
      desc: 'عزف منفرد على أوتار الحرية الذكورية، يتجسد في عطر خشبي عطري يأسر الحواس. عطر خالد يأتي في زجاجة ذات لون أزرق غامق وساحر.',
      story: 'صُمم خصيصاً للرجل المستقل الذي يتحدى القيود. يمثل بلو دي بارفام نسيم النهار المنعش ممتزجاً بالراتنجات الخشبية الدافئة والعميقة.',
    },
    'creed-aventus': {
      name: 'أفينتوس إمبيريال',
      desc: 'يجسد عطر أفينتوس إمبيريال الاستثنائي معاني القوة والنفوذ والنجاح. تم إطلاقه في عام ٢٠١٠ ليصبح العطر الأكثر نجاحاً وشهرة في تاريخ دار كريد العريقة.',
      story: 'مستوحى من الحياة الدرامية لإمبراطور تاريخي قاد معارك الحرب والسلام والرومانسية بنفس القوة والمهابة. صُنع يدوياً بالكامل من مكونات فاخرة للغاية.',
    },
    'ysl-tuxedo': {
      name: 'توكسيدو سيجنتشر',
      desc: 'يمزج عطر توكسيدو بين الغموض الأخاذ لعشب الباتشولي والوهج الحسي للعنبر الفاخر. عطر ذو هيكلية راقية تفرض الهيبة والوقار بأناقة تليق بالسهرات الملكية.',
      story: 'جزء من مجموعة عطور توكسيدو الخاصة بدار إيف سان لوران، يجسد التباين الساحر بين الخياطة الذكورية والأنثوية الفاخرة في عبير موحد غامض.',
    },
    'xerjoff-erba': {
      name: 'إربا جولد رويال',
      desc: 'مزيج فاخر من حمضيات البحر الأبيض المتوسط والفواكه الحلوة المنعشة ترتكز على قاعدة ملكية من العنبر والمسك الأبيض الأصيل. دافئ وجذاب وفخم بلا حدود.',
      story: 'تحية للأناقة والترف الكلاسيكي. يقدم العطر في زجاجة من الكريستال المكسو بالمخمل الطبيعي، ليمثل أشعة الشمس الذهبية ممتزجة مع المكونات الملكية الفخمة.',
    },
    'initio-oud': {
      name: 'عود فور جريتنس',
      desc: 'تستمد إنيشيو هيبتها العميقة من الهندسة المقدسة للكون. عود فور جريتنس ينبض بقوة الطبيعة، مقدماً صيغة خشب العود المهيب في أبهى وأكثر تمثيل ساحر له.',
      story: 'عبير يتجاوز الحواس. إنه يجسد الاهتزازات الخام لملكوت الطبيعة ليصنع هالة مغناطيسية واقية تمنح حضوراً فريداً وثقة مطلقة لا تهتز.',
    },
    'amouage-interlude': {
      name: 'إنترلود بلاك أيريس',
      desc: 'عطر خشبي حار صُمم ليعطي إحساساً بالنظام والسكينة وسط ضجيج الحياة وفوضاها. يستعين إنترلود بلاك أيريس بنوتات السوسن الفاخرة لتنعيم حدة النسخة الأصلية.',
      story: 'صُنع بمهارة بالغة في سلطنة عمان، حيث يعزز من فخامته زبد السوسن النادر ليضفي ملمساً مخملياً ناعماً على قاعدة من الأخشاب الراتنجية المدخنة.',
    },
    'pdm-layton': {
      name: 'لايتون رويال',
      desc: 'توقيع عطري مسبب للإدمان، مفعم بالرقي والملكية والشهامة. لايتون رويال هو بهجة حسية تفتتح بعبير التفاح الطازج واللافندر قبل الغوص في أعماق الأخشاب الفاخرة.',
      story: 'يحتفي العطر بالبلاط الملكي للخيول الفاخرة في عهد الملك لويس الخامس عشر، دامجاً بين الأناقة التاريخية الفرنسية والجرأة العصرية الأخاذة.',
    },
    'dior-j-adore': {
      name: 'لور دي جادور',
      desc: 'تحفة فنية تصوغ الذهب السائل في زجاجة عطرة. عطر "لور دي جادور" يبرز فيه فرانسيس كوركديجان، مدير الإبداع العطري في ديور، جمال زهور جادور المتفتحة.',
      story: 'ترجمة حسية للذهب المنصهر. باقة زهور مكررة للغاية ذات ملمس مشع وحسي يحتضن جسد وروح المرأة الراقية.',
    },
    'tf-lost-cherry': {
      name: 'لوست شيري إكستري',
      desc: 'رحلة جريئة ومليئة بالمتعة في عالم العطور الفريدة والمحرمة؛ عطر متباين يكشف عن ثنائية مغرية من البريق الخارجي الحلو واللب الداكن الغني والدافئ بالداخل.',
      story: 'مترف، مغرٍ، وغامض للغاية. يجسد لوست شيري التوازن المثالي النادر بين حلاوة الكرز الحامض، ودفء المشروب الفاخر والروائح الخشبية الدافئة.',
    },
    'chanel-no5': {
      name: 'شانيل رقم ٥ لو إمبيريال',
      desc: 'الجوهر الحقيقي والتمثيل المطلق للرفاهية والترف. باقة من زهور الألدهيدات السحرية، توقيع أسطوري أحدث ثورة كبرى في عالم العطور الفرنسية العريقة.',
      story: 'ابتكره إرنست بو عام ١٩٢١ بطلب من غابرييل شانيل، التي أرادت "عطراً للمرأة برائحة المرأة الحقيقية". ولا يزال حتى اليوم العطر الأكثر شهرة وشعبية بالعالم.',
    },
    'creed-wind-flowers': {
      name: 'ويند فلاورز رويال',
      desc: 'مستوحى من القوة الفريدة والنعومة الأخاذة للحركة. ويند فلاورز هو عبير زهري منعش وحسي يفتتح بالياسمين الحلو، ويلتف حول زهر البرتقال التونسي المنعش واللاذع.',
      story: 'أنثوي، رشيق، ورياضي بامتياز. تكريم حسي لقوة الرياح ونسيم البحر العذب وحركات الأزياء الراقية الراقصة.',
    },
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bns_language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bns_language', lang);
  };

  useEffect(() => {
    // Set text direction based on Arabic vs others
    const html = document.documentElement;
    if (language === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
      html.classList.add('font-arabic');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', language);
      html.classList.remove('font-arabic');
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div style={{ direction: dir }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper function to translate perfume object fields dynamically on the fly
export function getTranslatedPerfume(perfume: any, language: Language) {
  if (!perfume) return perfume;
  const overrides = productTranslations[language]?.[perfume.id];
  
  // Also translate notes
  const translatedNotes = perfume.notes.map((note: string) => {
    return translations[language]?.[note] || note;
  });

  const translatedTopNotes = perfume.topNotes?.map((note: string) => {
    return translations[language]?.[note] || note;
  });

  const translatedHeartNotes = perfume.heartNotes?.map((note: string) => {
    return translations[language]?.[note] || note;
  });

  const translatedBaseNotes = perfume.baseNotes?.map((note: string) => {
    return translations[language]?.[note] || note;
  });

  return {
    ...perfume,
    brand: perfume.brand,
    name: perfume.name,
    description: overrides?.desc || perfume.description,
    story: overrides?.story || perfume.story,
    notes: translatedNotes,
    topNotes: translatedTopNotes || perfume.topNotes,
    heartNotes: translatedHeartNotes || perfume.heartNotes,
    baseNotes: translatedBaseNotes || perfume.baseNotes,
    availability: translations[language]?.[perfume.availability] || perfume.availability,
  };
}
