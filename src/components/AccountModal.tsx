import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Sparkles, User, LogIn, Mail, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
  currentUsername: string | null;
  onLogout: () => void;
}

export default function AccountModal({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUsername,
  onLogout,
}: AccountModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { t, language, dir } = useLanguage();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      if (name.trim()) {
        onLoginSuccess(name);
      } else {
        onLoginSuccess('VIP Member');
      }
    } else {
      onLoginSuccess(email.split('@')[0] || 'VIP Member');
    }
    // Clean up states
    setEmail('');
    setPassword('');
    setName('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} font-sans`} style={{ direction: dir }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-[5px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#111111] border border-[#C8A96A]/30 p-8 max-w-md w-full shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden rounded-none z-10"
          >
            {/* Corner details */}
            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-[#C8A96A]" />
            <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-[#C8A96A]" />
            <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-[#C8A96A]" />
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-[#C8A96A]" />

            {/* Close */}
            <button
              onClick={onClose}
              className={`absolute top-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} p-1 text-gray-400 hover:text-[#C8A96A] cursor-pointer`}
              aria-label="Close"
              id="account-modal-close"
            >
              <X size={20} />
            </button>

            {currentUsername ? (
              /* LOGGED IN VIEW */
              <div className="text-center space-y-6 py-4">
                <div className="mx-auto w-16 h-16 bg-[#C8A96A]/10 border border-[#C8A96A]/40 flex items-center justify-center rounded-full text-[#C8A96A]">
                  <Award size={32} className="animate-pulse" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Sparkles size={11} className="text-[#C8A96A]" />
                    <span className="text-[9px] tracking-[0.3em] text-[#C8A96A] uppercase font-light">
                      {language === 'ar' ? 'عضو نادي BNS الملكي' : 'BNS Club Member'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif text-white tracking-wide font-light">
                    {language === 'ar' ? `مرحباً بك، ${currentUsername}` : `Welcome, ${currentUsername}`}
                  </h3>
                </div>

                <p className="text-xs text-gray-400 font-light leading-relaxed max-w-xs mx-auto">
                  {language === 'ar' 
                    ? 'أنت مسجل حالياً كعميل خاص متميز في عطور BNS. استمتع بخدمة توصيل غرف القفازات البيضاء المجانية وخدمات نقش الأسماء الخاصة بطلباتك العطرية.'
                    : 'You are currently logged in as an esteemed private customer. Enjoy complimentary white-glove shipping on all orders and custom engraving priorities.'}
                </p>

                <div className="pt-4 border-t border-gray-900 flex flex-col space-y-3">
                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-[#C8A96A] text-black font-semibold text-[10px] tracking-[0.2em] uppercase hover:bg-white transition-all cursor-pointer min-h-[44px]"
                    id="account-modal-close-logged-in"
                  >
                    {language === 'ar' ? 'دخول صالون كبار الشخصيات' : 'Enter Private Lounge'}
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full py-2 bg-transparent text-gray-500 hover:text-white font-sans text-[10px] tracking-[0.15em] uppercase transition-colors cursor-pointer min-h-[44px]"
                    id="account-modal-logout-btn"
                  >
                    {language === 'ar' ? 'تسجيل الخروج من الحساب' : 'Logout Account'}
                  </button>
                </div>
              </div>
            ) : (
              /* LOGIN / REGISTER FORM VIEW */
              <div className={`space-y-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <Sparkles size={11} className="text-[#C8A96A]" />
                    <span className="text-[9px] tracking-[0.3em] text-[#C8A96A] uppercase font-light">
                      {language === 'ar' ? 'سجل تشريفات الضيوف' : 'The Guest Registry'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif text-white tracking-wide">
                    {isRegistering 
                      ? (language === 'ar' ? 'الانضمام للنادي الملكي الخاص' : 'Join Private Club')
                      : (language === 'ar' ? 'المصادقة على خزانة العطور الخاصة' : 'Sign In To Scent Vault')}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isRegistering && (
                    <div className={`space-y-1.5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      <label className="text-[9px] uppercase tracking-wider text-gray-400">
                        {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder={language === 'ar' ? 'مثال: عبد الرحمن' : 'e.g. Jean-Baptiste'}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full bg-black/60 border border-[#C8A96A]/20 focus:border-[#C8A96A] text-white ${dir === 'rtl' ? 'pl-3 pr-10' : 'pl-10 pr-3'} py-2.5 text-xs outline-none rounded-none placeholder-gray-700 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                        />
                        <User size={12} className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-500`} />
                      </div>
                    </div>
                  )}

                  <div className={`space-y-1.5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400">
                      {language === 'ar' ? 'البريد الإلكتروني الشخصي' : 'Personal Email'}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="vip@bns.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full bg-black/60 border border-[#C8A96A]/20 focus:border-[#C8A96A] text-white ${dir === 'rtl' ? 'pl-3 pr-10' : 'pl-10 pr-3'} py-2.5 text-xs outline-none rounded-none placeholder-gray-700 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                      />
                      <Mail size={12} className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-500`} />
                    </div>
                  </div>

                  <div className={`space-y-1.5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <label className="text-[9px] uppercase tracking-wider text-gray-400">
                      {language === 'ar' ? 'الرمز السري الخاص' : 'Private Code / Password'}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full bg-black/60 border border-[#C8A96A]/20 focus:border-[#C8A96A] text-white ${dir === 'rtl' ? 'pl-3 pr-10' : 'pl-10 pr-3'} py-2.5 text-xs outline-none rounded-none placeholder-gray-700 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                      />
                      <Lock size={12} className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-500`} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C8A96A] hover:bg-white text-black font-semibold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-none mt-6 cursor-pointer min-h-[44px]"
                    id="account-submit-btn"
                  >
                    <LogIn size={12} />
                    <span>
                      {isRegistering 
                        ? (language === 'ar' ? 'إنشاء حساب خاص جديد' : 'Create Private Account')
                        : (language === 'ar' ? 'المصادقة والمصادقة الأمنية' : 'Authenticate Access')}
                    </span>
                  </button>
                </form>

                <div className="text-center pt-2 border-t border-gray-900">
                  <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-[10px] text-gray-500 hover:text-[#C8A96A] transition-colors cursor-pointer"
                    id="toggle-register-btn"
                  >
                    {isRegistering
                      ? (language === 'ar' ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have credentials? Sign In')
                      : (language === 'ar' ? 'ليس لديك دعوة؟ سجل عضويتك الآن' : "Don't have an invitation? Register Membership")}
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
