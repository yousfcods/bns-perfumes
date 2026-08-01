import { motion } from 'motion/react';
import { ShieldCheck, Truck, Sparkles, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyChooseUs() {
  const { t, language, dir } = useLanguage();

  const pillars = [
    {
      icon: <ShieldCheck size={28} strokeWidth={1.2} className="text-[#C8A96A]" />,
      title: t('authentic_title'),
      desc: t('authentic_desc')
    },
    {
      icon: <Truck size={28} strokeWidth={1.2} className="text-[#C8A96A]" />,
      title: t('shipping_title'),
      desc: t('shipping_desc')
    },
    {
      icon: <Sparkles size={28} strokeWidth={1.2} className="text-[#C8A96A]" />,
      title: t('secure_title'),
      desc: t('secure_desc')
    },
    {
      icon: <Headphones size={28} strokeWidth={1.2} className="text-[#C8A96A]" />,
      title: t('support_title'),
      desc: t('support_desc')
    }
  ];

  return (
    <section id="why-choose-us" className="relative py-20 bg-[#070707] border-b border-[#C8A96A]/10 overflow-hidden" style={{ direction: dir }}>
      {/* Background soft lighting */}
      <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-[#C8A96A]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1700px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8A96A] font-sans font-light">
            {t('pledge_subtitle')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-wide font-light">
            {t('pledge_title')}
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A96A]/40 mx-auto mt-4" />
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative bg-[#111111] p-8 border border-gray-900 hover:border-[#C8A96A]/30 transition-all duration-500 text-center flex flex-col items-center space-y-4"
            >
              {/* Outer soft shadow hover indicator */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#C8A96A]/1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon Holder */}
              <div className="p-4 bg-black border border-gray-900 group-hover:border-[#C8A96A]/50 group-hover:shadow-[0_0_20px_rgba(200,169,106,0.15)] transition-all duration-500 rounded-none mb-2">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-sm font-serif text-white tracking-wider group-hover:text-[#C8A96A] transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-400 font-sans font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
