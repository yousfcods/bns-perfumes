import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, HelpCircle, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function InspiredDisclaimer() {
  const { t, language, dir } = useLanguage();

  return (
    <div className="relative py-8 sm:py-12 bg-[#080808] border-b border-[#C8A96A]/10 overflow-hidden" style={{ direction: dir }}>
      {/* Background soft ambient glowing circle */}
      <div className="absolute right-10 bottom-0 w-72 h-72 bg-[#C8A96A]/2 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute left-10 top-0 w-64 h-64 bg-[#C8A96A]/1 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#111111]/90 border border-[#C8A96A]/15 p-5 sm:p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.8)] overflow-hidden gpu-layer"
        >
          {/* Internal corner gold highlights */}
          <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#C8A96A]/40" />
          <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-[#C8A96A]/40" />
          <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-[#C8A96A]/40" />
          <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#C8A96A]/40" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left/Main Column: Scent Philosophy statement */}
            <div className={`lg:col-span-8 space-y-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="inline-flex items-center gap-2 bg-[#C8A96A]/10 border border-[#C8A96A]/20 py-1.5 px-3 rounded-none mb-2">
                <ShieldCheck size={14} className="text-[#C8A96A]" />
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A96A] font-sans font-medium">
                  {t('inspired_disclaimer_badge')}
                </span>
              </div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-white tracking-wide font-light">
                {t('inspired_disclaimer_title')}
              </h3>

              <p className="text-sm md:text-base text-gray-300 font-sans font-light leading-relaxed">
                {t('inspired_disclaimer_text')}
              </p>

              <p className="text-[11px] text-[#C8A96A]/80 font-sans font-light tracking-wide italic">
                {t('inspired_disclaimer_tagline')}
              </p>
            </div>

            {/* Right Column: Key Trust Pillars */}
            <div className={`lg:col-span-4 space-y-4 border-t lg:border-t-0 ${dir === 'rtl' ? 'lg:border-r lg:pr-8' : 'lg:border-l lg:pl-8'} border-[#C8A96A]/10 pt-6 lg:pt-0 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-black border border-gray-900 mt-1 rounded-none flex-shrink-0">
                  <Sparkles size={16} className="text-[#C8A96A]" />
                </div>
                <div>
                  <h4 className="text-xs font-serif uppercase tracking-wider text-white">
                    {language === 'ar' ? 'تركيزات فرنسية نقية' : language === 'fr' ? 'Concentration Exceptionnelle' : 'Extrait de Parfum'}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans font-light mt-0.5">
                    {language === 'ar' 
                      ? 'نسبة زيوت فرنسية فاخرة تضمن ثباتاً يتجاوز ١٢ ساعة وانتشاراً مهيباً.'
                      : language === 'fr' 
                        ? 'Formulé avec des huiles précieuses pour une tenue remarquable de plus de 12h.'
                        : 'Infused with precious French oil reserves for excellent projection and 12+ hour longevity.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-black border border-gray-900 mt-1 rounded-none flex-shrink-0">
                  <HeartHandshake size={16} className="text-[#C8A96A]" />
                </div>
                <div>
                  <h4 className="text-xs font-serif uppercase tracking-wider text-white">
                    {language === 'ar' ? 'شفافية كاملة وصدق' : language === 'fr' ? 'Transparence Totale' : 'Transparent Honesty'}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans font-light mt-0.5">
                    {language === 'ar'
                      ? 'لسنا وكلاء للعلامات التجارية الأصلية، بل نقدم بدائلنا الخاصة المصممة بحرفية.'
                      : language === 'fr'
                        ? 'Nous ne vendons pas de parfums originaux, mais des alternatives recréées avec passion.'
                        : 'We explicitly guide you to our own crafted creations without pretending to sell original brands.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
