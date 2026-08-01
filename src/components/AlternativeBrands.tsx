import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { LUXURY_PERFUMES } from '../data/perfumes';
import { Sparkles, ArrowUpRight, Compass } from 'lucide-react';

interface AlternativeBrandsProps {
  onBrandSelect: (brandName: string) => void;
}

export interface BrandInfo {
  name: string;
  searchName: string;
  logo: string;
  founded: string;
  origin: string;
  desc: {
    en: string;
    fr: string;
    ar: string;
  };
}

const ALTERNATIVE_BRANDS: BrandInfo[] = [
  {
    name: 'Lattafa Perfumes',
    searchName: 'Lattafa',
    logo: 'L A T T A F A',
    founded: '1992',
    origin: 'Dubai, UAE',
    desc: {
      en: 'A premier Arabian house redefining oriental luxury with modern, high-performance formulations.',
      fr: 'Une grande maison arabe redéfinissant le luxe oriental avec des formulations modernes et performantes.',
      ar: 'دار عطور عربية رائدة تصوغ الفخامة الشرقية بلمسات عصرية وتركيزات زيتية فائقة.'
    }
  },
  {
    name: 'Ard Al Zaafaran',
    searchName: 'Ard Al Zaafaran',
    logo: 'A R D  A L  Z A A F A R A N',
    founded: '1997',
    origin: 'Dubai, UAE',
    desc: {
      en: 'Renowned for rich, traditional spices, deep ouds, and comforting royal musks.',
      fr: 'Réputée pour ses épices traditionnelles riches, ses ouds profonds et ses muscs royaux réconfortants.',
      ar: 'تشتهر بتركيباتها الغنية بالتوابل التقليدية، وأخشاب العود العميقة، والمسك الملكي النقي.'
    }
  },
  {
    name: 'Afnan Perfumes',
    searchName: 'Afnan',
    logo: 'A F N A N',
    founded: '2007',
    origin: 'Dubai, UAE',
    desc: {
      en: 'Crafting extraordinary niche alternatives with incredible sillage and gorgeous bottle presentation.',
      fr: 'Création d\'alternatives de niche extraordinaires avec un sillage et une présentation de flacon incroyables.',
      ar: 'تبدع بدائل عطرية مذهلة بنغمات ساحرة وهالات عطرية مميزة تأسر الحواس.'
    }
  },
  {
    name: 'Armaf',
    searchName: 'Armaf',
    logo: 'A R M A F',
    founded: '2010',
    origin: 'Dubai, UAE',
    desc: {
      en: 'The legendary house behind some of the most celebrated and high-performing designer inspirations in the world.',
      fr: 'La maison légendaire derrière certaines des inspirations de créateurs les plus célèbres au monde.',
      ar: 'الدار الأسطورية صاحبة أشهر وأقوى العطور المستوحاة عالمياً بجودة وثبات لا يُنافس.'
    }
  },
  {
    name: 'French Avenue',
    searchName: 'French Avenue',
    logo: 'F R E N C H  A V E N U E',
    founded: '2021',
    origin: 'Dubai, UAE',
    desc: {
      en: 'Elite niche expressions bridging French haute-couture styles with opulent Middle Eastern ingredients.',
      fr: 'Expressions de niche d\'élite associant les styles haute couture français à de somptueux ingrédients du Moyen-Orient.',
      ar: 'إصدارات متميزة تجمع بين رقي الخياطة الفرنسية الراقية وفخامة المكونات الشرقية.'
    }
  },
  {
    name: 'Rasasi',
    searchName: 'Rasasi',
    logo: 'R A S A S I',
    founded: '1979',
    origin: 'Dubai, UAE',
    desc: {
      en: 'A pioneer of modern Arabian perfumery, blending rich legacy with contemporary elegance.',
      fr: 'Un pionnier de la parfumerie arabe moderne, alliant un riche héritage à une élégance contemporaine.',
      ar: 'رائد صناعة العطور العربية الحديثة، يمزج بين الإرث العريق والأناقة العصرية.'
    }
  },
  {
    name: 'Khadlaj',
    searchName: 'Khadlaj',
    logo: 'K H A D L A J',
    founded: '1997',
    origin: 'Dubai, UAE',
    desc: {
      en: 'Artisanal concentration and pure oils designed to capture ancient oriental luxury.',
      fr: 'Concentration artisanale et huiles pures conçues pour capturer le luxe oriental ancien.',
      ar: 'تركيزات زيتية حرفية مصممة خصيصاً لتجسيد الفخامة والتقاليد الشرقية العريقة.'
    }
  },
  {
    name: 'Nusuk',
    searchName: 'Nusuk',
    logo: 'N U S U K',
    founded: '2018',
    origin: 'Dubai, UAE',
    desc: {
      en: 'Modern, sophisticated fragrance rituals representing the pure soul of desert breeze.',
      fr: 'Rituels de parfums modernes et sophistiqués représentant l\'âme pure de la brise du désert.',
      ar: 'طقوس عطرية حديثة ومبتكرة تجسد الروح النقية لنسيم الصحراء العربي.'
    }
  },
  {
    name: 'Al Rehab',
    searchName: 'Al Rehab',
    logo: 'A L  R E H A B',
    founded: '1975',
    origin: 'Jeddah, Saudi Arabia',
    desc: {
      en: 'Highly accessible, ultra long-lasting concentrated oils loved by millions worldwide.',
      fr: 'Huiles concentrées ultra-durables et très accessibles, appréciées par des millions de personnes dans le monde.',
      ar: 'زيوت عطرية مركزة فائرة الثبات والانتشار حائزة على ثقة الملايين حول العالم.'
    }
  },
  {
    name: 'Arabian Oud',
    searchName: 'Arabian Oud',
    logo: 'A R A B I A N  O U D',
    founded: '1982',
    origin: 'Riyadh, Saudi Arabia',
    desc: {
      en: 'The largest fragrance retailer in the Middle East, symbolizing pure royal luxury.',
      fr: 'Le plus grand détaillant de parfums au Moyen-Orient, symbolisant le pur luxe royal.',
      ar: 'أكبر دار للعطور في الشرق الأوسط، تمثل عنواناً للأصالة والفخامة الملكية.'
    }
  },
  {
    name: 'Abdul Samad Al Qurashi',
    searchName: 'Qurashi',
    logo: 'A S A Q',
    founded: '1932',
    origin: 'Makkah, Saudi Arabia',
    desc: {
      en: 'Centuries of heritage in sourcing the finest royal deer musk and pure aged agarwood.',
      fr: 'Des siècles d\'héritage dans la recherche du meilleur musc de cerf royal et du bois d\'agar pur et vieilli.',
      ar: 'دار عريقة تمتد لقرون في استخلاص أرقى أنواع دهن العود والمسك البري الفاخر.'
    }
  },
  {
    name: 'Ibrahim Al Qurashi',
    searchName: 'Ibrahim Al Qurashi',
    logo: 'I B R A H I M',
    founded: '1929',
    origin: 'Makkah, Saudi Arabia',
    desc: {
      en: 'Exquisite, highly potent oils and modern sprays with premium quality ingredients.',
      fr: 'Huiles exquises et hautement puissantes et sprays modernes aux ingrédients de qualité supérieure.',
      ar: 'تركيبات عطرية فاخرة مفعمة بالحيوية والجاذبية ومصممة بأعلى معايير الجودة.'
    }
  },
  {
    name: 'Reef Perfumes',
    searchName: 'Reef',
    logo: 'R E E F',
    founded: '2018',
    origin: 'Riyadh, Saudi Arabia',
    desc: {
      en: 'An innovative Saudi house combining secret eastern ingredients with Western fragrance architecture.',
      fr: 'Une maison saoudienne innovante associant des ingrédients orientaux secrets à l\'architecture des parfums occidentaux.',
      ar: 'دار عطور سعودية مبتكرة تجمع بين أسرار المكونات الشرقية وأناقة العطور الغربية.'
    }
  },
  {
    name: 'Gissah',
    searchName: 'Gissah',
    logo: 'G I S S A H',
    founded: '2018',
    origin: 'Kuwait City, Kuwait',
    desc: {
      en: 'Avante-garde Kuwaiti house telling rich historical stories through elite fragrance notes.',
      fr: 'Maison koweïtienne d\'avant-garde racontant de riches histoires à travers des notes parfumées d\'élite.',
      ar: 'دار عطور كويتية عصرية تروي فصولاً من الفخامة والجمال بأسلوب نيش فريد.'
    }
  },
  {
    name: 'Surrati',
    searchName: 'Surrati',
    logo: 'S U R R A T I',
    founded: '1918',
    origin: 'Makkah, Saudi Arabia',
    desc: {
      en: 'A century of experience in distilling pure elite perfume oils and signature musks.',
      fr: 'Un siècle d\'expérience dans la distillation d\'huiles de parfum d\'élite et de muscs emblématiques.',
      ar: 'أكثر من قرن من الخبرة في تقطير أنقى الزيوت العطرية والمسك الفاخر المتميز.'
    }
  },
  {
    name: 'Al Majed Oud',
    searchName: 'Majed',
    logo: 'A L  M A J E D',
    founded: '1956',
    origin: 'Riyadh, Saudi Arabia',
    desc: {
      en: 'Traditional Saudi heritage specializing in premium daily ouds and rich home incenses.',
      fr: 'Héritage saoudien traditionnel spécialisé dans les ouds quotidiens de qualité supérieure.',
      ar: 'عراقة سعودية أصيلة تتخصص في ابتكار أرقى عطور العود اليومية والبخور الفاخر.'
    }
  },
  {
    name: 'Laverne',
    searchName: 'Laverne',
    logo: 'L A V E R N E',
    founded: '2016',
    origin: 'Riyadh, Saudi Arabia',
    desc: {
      en: 'Combining raw desert elements with modern fashion to craft breathtaking signature collections.',
      fr: 'Associer des éléments du désert à la mode moderne pour créer des collections signatures époustouflantes.',
      ar: 'تمزج بين سحر الصحراء وروح الموضة العصرية لتقديم مجموعات عطرية خاطفة للأنفاس.'
    }
  },
  {
    name: 'Nice One Perfumes',
    searchName: 'Nice One',
    logo: 'N I C E  O N E',
    founded: '2016',
    origin: 'Riyadh, Saudi Arabia',
    desc: {
      en: 'Curated beauty-inspired creations showcasing the ultimate trendsetting fragrance experiences.',
      fr: 'Créations inspirées de la beauté mettant en valeur le meilleur des tendances de parfumerie.',
      ar: 'ابتكارات عطرية مستوحاة من الجمال والأناقة العصرية لتواكب أحدث توجهات الموضة.'
    }
  }
];

export default function AlternativeBrands({ onBrandSelect }: AlternativeBrandsProps) {
  const { t, language, dir } = useLanguage();

  const getBrandCount = (searchName: string) => {
    return LUXURY_PERFUMES.filter((perfume) => {
      const bName = perfume.brand.toLowerCase();
      const sName = searchName.toLowerCase();
      return bName === sName || bName.includes(sName) || sName.includes(bName);
    }).length;
  };

  return (
    <section id="alternative-brands" className="relative py-12 sm:py-20 md:py-24 bg-[#0B0B0B] border-b border-[#C8A96A]/10 overflow-hidden" style={{ direction: dir }}>
      {/* Background Soft Lighting Glows */}
      <div className="absolute right-1/4 top-0 w-96 h-96 bg-[#C8A96A]/2 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 w-96 h-96 bg-[#C8A96A]/2 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Top Gilded Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A]/25 to-transparent" />

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 sm:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#C8A96A]/5 border border-[#C8A96A]/20 py-1 px-3 mb-2">
            <Compass size={11} className="text-[#C8A96A]" />
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#C8A96A] font-mono">
              {t('alternative_brands_subtitle')}
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-wide font-light">
            {t('alternative_brands_title')}
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-400 font-sans font-light leading-relaxed max-w-2xl mx-auto">
            {t('alternative_brands_desc')}
          </p>
          
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent mx-auto mt-4 sm:mt-6" />
        </div>

        {/* 18 Brands Premium Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {ALTERNATIVE_BRANDS.map((brand, idx) => {
            const perfumeCount = getBrandCount(brand.searchName);
            
            return (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onBrandSelect(brand.searchName)}
                className="group relative bg-[#111111]/90 border border-[#C8A96A]/15 hover:border-[#C8A96A] p-5 sm:p-8 md:p-10 flex flex-col justify-between items-center text-center transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_45px_rgba(200,169,106,0.15)] h-auto min-h-[18rem] sm:h-[22rem] gpu-layer"
              >
                {/* Custom Internal Gilded Double Corner Borders */}
                <div className="absolute top-3.5 left-3.5 w-2.5 h-2.5 border-t border-l border-[#C8A96A]/20 group-hover:border-[#C8A96A] transition-colors duration-500" />
                <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 border-t border-r border-[#C8A96A]/20 group-hover:border-[#C8A96A] transition-colors duration-500" />
                <div className="absolute bottom-3.5 left-3.5 w-2.5 h-2.5 border-b border-l border-[#C8A96A]/20 group-hover:border-[#C8A96A] transition-colors duration-500" />
                <div className="absolute bottom-3.5 right-3.5 w-2.5 h-2.5 border-b border-r border-[#C8A96A]/20 group-hover:border-[#C8A96A] transition-colors duration-500" />

                {/* Ambient Radial Hover Lighting */}
                <div className="absolute w-40 h-40 rounded-full bg-[#C8A96A]/0 group-hover:bg-[#C8A96A]/3 blur-[35px] transition-all duration-700 pointer-events-none" />

                {/* Card Top Information */}
                <div className="space-y-2">
                  <span className="text-[7.5px] uppercase tracking-[0.25em] text-gray-500 group-hover:text-[#C8A96A] transition-colors duration-300 font-mono">
                    {language === 'ar' ? 'تأسست عام' : 'Est.'} {brand.founded} • {brand.origin}
                  </span>
                </div>

                {/* Premium Monogram Typographic Brand Logo */}
                <div className="my-6">
                  <h3 className="text-xl md:text-2xl font-serif text-white tracking-[0.25em] font-light uppercase group-hover:text-[#F0DFB2] transition-colors duration-500 select-none">
                    {brand.logo}
                  </h3>
                  <div className="w-8 h-[1px] bg-[#C8A96A]/20 mx-auto mt-2.5 group-hover:w-16 group-hover:bg-[#C8A96A]/60 transition-all duration-500" />
                </div>

                {/* Brand Description */}
                <p className="text-[11px] sm:text-xs text-gray-400 group-hover:text-gray-300 font-sans font-light leading-relaxed max-w-[260px] line-clamp-3">
                  {brand.desc[language] || brand.desc.en}
                </p>

                {/* Footer details: Scent Count and Quick View CTA */}
                <div className="mt-6 space-y-3 w-full">
                  <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-wider text-[#C8A96A]/75 group-hover:text-[#C8A96A] transition-colors font-mono">
                    <Compass size={11} />
                    <span>
                      {t('available_perfumes_count')}: <strong className="text-white group-hover:text-[#F0DFB2] ml-0.5">{perfumeCount}</strong>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[8.5px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                    <span>{t('explore_brand_perfumes')}</span>
                    <ArrowUpRight size={11} className="text-[#C8A96A]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
