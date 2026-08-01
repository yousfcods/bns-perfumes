import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t, language, dir } = useLanguage();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="relative py-20 bg-[#0B0B0B] overflow-hidden" style={{ direction: dir }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Luxury Newsletter Card with gold borders and deep black background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-[#C8A96A]/20 p-8 md:p-12 relative text-center overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
        >
          {/* Internal corner lines */}
          <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#C8A96A]/30" />
          <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#C8A96A]/30" />
          <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#C8A96A]/30" />
          <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#C8A96A]/30" />

          {/* Background glowing sphere */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C8A96A]/3 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            
            {/* Header Badge */}
            <div className="flex items-center justify-center gap-1.5 mx-auto">
              <Sparkles size={11} className="text-[#C8A96A]" />
              <span className="text-[9px] tracking-[0.35em] text-[#C8A96A] uppercase font-sans font-light">
                {t('news_subtitle')}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white tracking-wide font-light">
              {t('news_title')}
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-400 font-sans font-light leading-relaxed max-w-lg mx-auto">
              {t('news_desc')}
            </p>

            {/* Animated Submission State */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="newsletter-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-stretch gap-3 mt-8 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    placeholder={t('news_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`flex-1 bg-black/80 border border-[#C8A96A]/20 focus:border-[#C8A96A] text-white px-4 py-3.5 text-xs outline-none transition-colors rounded-none placeholder-gray-600 ${dir === 'rtl' ? 'text-right' : 'text-left'} font-sans`}
                    id="newsletter-email-input"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#C8A96A] hover:bg-white text-black font-semibold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-none cursor-pointer min-h-[44px]"
                    id="newsletter-submit-btn"
                  >
                    <span>{t('news_cta')}</span>
                    <Send size={11} className={dir === 'rtl' ? 'rotate-180' : ''} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/60 border border-[#C8A96A]/40 p-6 max-w-md mx-auto mt-8 flex flex-col items-center space-y-3"
                >
                  <CheckCircle2 size={32} className="text-[#C8A96A] animate-bounce" />
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C8A96A] font-semibold font-sans">
                    {language === 'ar' ? 'تم إرسال دعوتك الخاصة' : 'Invitation Dispatched'}
                  </p>
                  <p className="text-[11px] text-gray-400 font-sans font-light max-w-xs">
                    {language === 'ar' 
                      ? 'لقد تم إرسال رسالة التأكيد لبريدك الإلكتروني المسجل لدينا لتأكيد عضويتك الفاخرة.'
                      : 'An entry invitation has been sent to your email. Check your inbox to complete your private registration.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
