import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, language, dir } = useLanguage();

  const categories = [
    { label: language === 'ar' ? 'عطور رجالية فاخرة' : language === 'fr' ? 'Parfums Homme' : 'Men Scent', href: '#' },
    { label: language === 'ar' ? 'عطور نسائية راقية' : language === 'fr' ? 'Parfums Femme' : 'Women Scent', href: '#' },
    { label: language === 'ar' ? 'عطور للجنسين' : language === 'fr' ? 'Extraits Unisexes' : 'Unisex Extract', href: '#' },
    { label: language === 'ar' ? 'مجموعات هدايا حصرية' : language === 'fr' ? 'Coffrets Cadeaux' : 'Gift Coffrets', href: '#' },
    { label: language === 'ar' ? 'الإصدارات الخاصة المحدودة' : language === 'fr' ? 'Réserves Privées' : 'Private Reserves', href: '#' }
  ];

  const services = [
    { label: language === 'ar' ? 'استشارات عطرية مخصصة' : language === 'fr' ? 'Conseil Olfactif' : 'Scent Advisory', href: '#' },
    { label: language === 'ar' ? 'توصيل سريع مميز' : language === 'fr' ? 'Livraison Gants Blancs' : 'White-Glove Delivery', href: '#' },
    { label: language === 'ar' ? 'سياسة الاستبدال والارتجاع' : language === 'fr' ? 'Retours & Échanges' : 'Returns & Exchanges', href: '#' },
    { label: language === 'ar' ? 'خدمة إعادة تعبئة الزجاجات' : language === 'fr' ? 'Recharge de Flacons' : 'Bottle Refill Service', href: '#' },
    { label: language === 'ar' ? 'حجز موعد استشارة خاصة' : language === 'fr' ? 'Rendez-vous Privé' : 'Book Private Viewing', href: '#' }
  ];

  const company = [
    { label: language === 'ar' ? 'تراثنا وقصتنا' : language === 'fr' ? 'Notre Héritage' : 'The Heritage', href: '#' },
    { label: language === 'ar' ? 'خبراء وصناع العطور لدينا' : language === 'fr' ? 'Maîtres Parfumeurs' : 'Master Perfumers', href: '#' },
    { label: language === 'ar' ? 'مصادرنا الصديقة للبيئة' : language === 'fr' ? 'Sourcing Durable' : 'Sustainable Sourcing', href: '#' },
    { label: language === 'ar' ? 'انضم إلى فريق عملنا' : language === 'fr' ? 'Carrières' : 'Careers in Haute Parfumerie', href: '#' },
    { label: language === 'ar' ? 'المركز الإعلامي' : language === 'fr' ? 'Espace Presse' : 'Press Room', href: '#' }
  ];

  return (
    <footer className="bg-[#070707] border-t border-[#C8A96A]/10 text-gray-400 py-12 sm:py-16 pb-20 sm:pb-16 px-4 sm:px-6 md:px-12 relative overflow-hidden" style={{ direction: dir }}>
      {/* Background brand watermarks */}
      <div className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} bottom-0 select-none pointer-events-none opacity-[0.02] text-white text-[120px] font-serif uppercase tracking-[0.3em] translate-x-12 translate-y-12`}>
        BNS
      </div>

      <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 ${dir === 'rtl' ? 'text-right' : 'text-left'} relative z-10`}>
        
        {/* Brand Summary column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col items-start">
            <span className="text-xl font-serif tracking-[0.25em] text-[#C8A96A] font-light">
              BNS
            </span>
            <span className="text-[6.5px] tracking-[0.4em] text-gray-500 font-sans uppercase -mt-0.5">
              {language === 'ar' ? 'دار العطور الفاخرة' : 'haute parfumerie'}
            </span>
          </div>
          
          <p className="text-xs font-sans font-light leading-relaxed max-w-sm">
            {language === 'ar' 
              ? 'تُمثل عطور BNS قمة الفخامة والتميز في عالم العطور الفنية المبتكرة. نقوم بانتقاء ومزج أندر المواد الطبيعية والزيوت الفرنسية الخام لنصنع منها قصصاً عطرية ساحرة تدوم طويلاً.'
              : language === 'fr'
                ? 'BNS représente le sommet de la parfumerie artistique. Nous sélectionnons et assemblons les matières premières les plus rares en récits liquides.'
                : 'BNS represents the pinnacle of artistic perfumery. We curate and blend the rarest raw materials into liquid stories that resonate across generations.'}
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs">
              <MapPin size={14} className="text-[#C8A96A] shrink-0" />
              <span className="font-light">{language === 'ar' ? 'ساحة فاندوم، باريس، فرنسا' : 'Place Vendôme, Paris, France'}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Phone size={14} className="text-[#C8A96A] shrink-0" />
              <span className="font-light font-mono">+33 (0) 1 45 67 89 10</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <Mail size={14} className="text-[#C8A96A] shrink-0" />
              <span className="font-light font-mono">concierge@bns.com</span>
            </div>
          </div>
        </div>

        {/* Categories column */}
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white font-sans font-medium">
            {t('footer_shop')}
          </p>
          <ul className="space-y-2 text-xs">
            {categories.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-[#C8A96A] transition-colors font-light">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services column */}
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white font-sans font-medium">
            {t('footer_service')}
          </p>
          <ul className="space-y-2 text-xs">
            {services.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-[#C8A96A] transition-colors font-light">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company column */}
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white font-sans font-medium">
            {t('footer_about')}
          </p>
          <ul className="space-y-2 text-xs">
            {company.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-[#C8A96A] transition-colors font-light">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Footer Bottom Row */}
      <div className={`max-w-7xl mx-auto mt-16 pt-8 border-t border-[#C8A96A]/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        
        {/* Copyright */}
        <div className="text-[10px] font-sans font-light tracking-wide text-gray-500 uppercase">
          {t('copyright')}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="p-2 border border-gray-900 hover:border-[#C8A96A]/30 text-gray-400 hover:text-[#C8A96A] transition-colors" aria-label="Facebook">
            <Facebook size={14} />
          </a>
          <a href="#" className="p-2 border border-gray-900 hover:border-[#C8A96A]/30 text-gray-400 hover:text-[#C8A96A] transition-colors" aria-label="Instagram">
            <Instagram size={14} />
          </a>
          <a href="#" className="p-2 border border-gray-900 hover:border-[#C8A96A]/30 text-gray-400 hover:text-[#C8A96A] transition-colors" aria-label="Twitter">
            <Twitter size={14} />
          </a>
        </div>

        {/* Stylized Payment Icons */}
        <div className="flex items-center gap-2.5">
          {['Visa', 'MC', 'Amex', 'Apple Pay', 'Cryptique'].map((pay) => (
            <span
              key={pay}
              className="px-2.5 py-1 bg-black border border-gray-900 text-[8.5px] uppercase tracking-widest text-[#C8A96A] font-mono font-medium rounded-sm select-none"
            >
              {language === 'ar' && pay === 'Apple Pay' ? 'آبل باي' : pay}
            </span>
          ))}
        </div>

      </div>
    </footer>
  );
}
