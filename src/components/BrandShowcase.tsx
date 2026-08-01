import { motion } from 'motion/react';
import { BRANDS } from '../data/perfumes';
import { useLanguage } from '../context/LanguageContext';

interface BrandShowcaseProps {
  onBrandSelect: (brandName: string) => void;
}

export default function BrandShowcase({ onBrandSelect }: BrandShowcaseProps) {
  const { t, language, dir } = useLanguage();

  return (
    <section id="brands" className="relative py-20 bg-[#0B0B0B] border-t border-b border-[#C8A96A]/10" style={{ direction: dir }}>
      {/* Subtle gold line accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A]/20 to-transparent" />
      
      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96A] font-sans font-light">
            {t('showcase_subtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-wide font-light">
            {t('showcase_title')}
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A96A]/40 mx-auto mt-4" />
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => onBrandSelect(brand.name)}
              className="group relative bg-[#111111]/80 border border-[#C8A96A]/15 hover:border-[#C8A96A] p-8 md:p-10 text-center flex flex-col justify-between items-center transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.6)] h-56"
            >
              {/* Internal decorative gilded gold corners */}
              <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-[#C8A96A]/30 group-hover:border-[#C8A96A] transition-colors duration-500" />
              <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-[#C8A96A]/30 group-hover:border-[#C8A96A] transition-colors duration-500" />
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-[#C8A96A]/30 group-hover:border-[#C8A96A] transition-colors duration-500" />
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-[#C8A96A]/30 group-hover:border-[#C8A96A] transition-colors duration-500" />

              {/* Glowing back circle */}
              <div className="absolute w-24 h-24 rounded-full bg-[#C8A96A]/0 group-hover:bg-[#C8A96A]/3 blur-[20px] transition-all duration-700 pointer-events-none" />

              {/* Subtitle / Foundation Year */}
              <p className="text-[8px] tracking-[0.3em] uppercase text-gray-500 group-hover:text-[#C8A96A] transition-colors duration-500">
                {language === 'ar' ? 'تأسست عام' : 'Est.'} {brand.founded}
              </p>

              {/* Typographic Logo */}
              <div className="my-3 py-2">
                <span className="text-xl sm:text-2xl font-serif text-white tracking-[0.35em] font-light uppercase select-none group-hover:text-[#F0DFB2] transition-colors duration-500 block">
                  {brand.logo}
                </span>
              </div>

              {/* Geographic Heritage metadata */}
              <div className="space-y-1">
                <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 font-sans font-light">
                  {language === 'ar' 
                    ? (brand.origin.includes('France') ? 'باريس، فرنسا' : brand.origin.includes('Italy') ? 'ميلان، إيطاليا' : brand.origin.includes('Oman') ? 'مسقط، عمان' : 'المملكة المتحدة')
                    : brand.origin}
                </p>
                <span className="text-[8px] tracking-widest uppercase text-[#C8A96A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-mono">
                  {language === 'ar' ? 'تصفح الكتالوج' : 'Explore Catalogue'}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
