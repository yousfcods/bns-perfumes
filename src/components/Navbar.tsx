import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Heart, User, ShoppingBag, Home, Compass, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage, Language } from '../context/LanguageContext';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onSearchClick: () => void;
  onAccountClick: () => void;
  scrollToSection: (id: string) => void;
  activeSection: string;
}

export default function Navbar({
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  onSearchClick,
  onAccountClick,
  scrollToSection,
  activeSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage, t, dir } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: t('nav_home'), id: 'home' },
    { label: t('nav_shop'), id: 'shop' },
    { label: t('nav_collections'), id: 'collections' },
    { label: t('nav_brands'), id: 'brands' },
    { label: t('nav_alternative_brands'), id: 'alternative-brands' },
    { label: t('nav_bestsellers'), id: 'bestsellers' },
    { label: t('nav_about'), id: 'why-choose-us' },
  ];

  const languages = [
    { code: 'en' as Language, label: 'English', flag: '🇬🇧', native: 'English' },
    { code: 'fr' as Language, label: 'Français', flag: '🇫🇷', native: 'Français' },
    { code: 'ar' as Language, label: 'العربية', flag: '🇸🇦', native: 'العربية' },
  ];

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Desktop & Tablet Navbar */}
      <nav
        id="navbar-top"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-b will-change-[transform,padding,background-color] ${
          isScrolled
            ? 'bg-[#0B0B0B]/95 backdrop-blur-2xl border-[#C8A96A]/20 py-2.5 shadow-[0_15px_50px_rgba(0,0,0,0.95)]'
            : 'bg-transparent border-transparent py-4'
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-3.5 sm:px-6 md:px-12 flex items-center justify-between">
          
          {/* Elegant Luxury Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="cursor-pointer group flex flex-col items-center select-none py-1"
          >
            <span className="text-lg sm:text-xl md:text-2xl font-serif tracking-[0.25em] text-[#C8A96A] font-light transition-colors duration-300 group-hover:text-white">
              BNS
            </span>
            <span className="text-[7px] sm:text-[7.5px] tracking-[0.4em] sm:tracking-[0.45em] text-gray-400 font-sans uppercase -mt-0.5 group-hover:text-[#C8A96A] transition-colors duration-300">
              {language === 'ar' ? 'عطور النخبة الفاخرة' : 'haute parfumerie'}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-[10px] uppercase tracking-[0.25em] font-sans font-light relative py-2 transition-all duration-300 hover:text-[#C8A96A] cursor-pointer ${
                    isActive ? 'text-[#C8A96A]' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C8A96A]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons & Language Selector */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Professional Language SelectorDropdown */}
            <div ref={langDropdownRef} className="relative z-50">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 text-gray-300 hover:text-[#C8A96A] transition-colors py-1.5 px-2.5 bg-white/5 hover:bg-white/10 border border-[#C8A96A]/20 hover:border-[#C8A96A]/40 text-[10px] uppercase tracking-wider font-sans font-light rounded-none cursor-pointer"
                title="Select Language"
              >
                <span className="text-xs leading-none">{currentLangObj.flag}</span>
                <span className="font-mono text-[9px]">{currentLangObj.code.toUpperCase()}</span>
                <ChevronDown size={10} className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full mt-2 w-36 bg-[#0C0C0C] border border-[#C8A96A]/30 shadow-[0_15px_30px_rgba(0,0,0,0.9)] p-1 flex flex-col"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-[11px] transition-colors cursor-pointer ${
                          language === lang.code
                            ? 'bg-[#C8A96A]/10 text-[#C8A96A] font-medium'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                        style={{ direction: lang.code === 'ar' ? 'rtl' : 'ltr' }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{lang.flag}</span>
                          <span className="font-sans">{lang.native}</span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search */}
            <button
              onClick={onSearchClick}
              className="text-gray-300 hover:text-[#C8A96A] transition-colors p-2 cursor-pointer relative group will-change-transform"
              title="Search"
              id="nav-search-btn"
            >
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                <Search size={18} strokeWidth={1.5} />
              </motion.div>
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#C8A96A] transition-all duration-300 group-hover:w-4"></span>
            </button>

            {/* Wishlist */}
            <button
              onClick={onWishlistClick}
              className="text-gray-300 hover:text-[#C8A96A] transition-colors p-2 cursor-pointer relative group will-change-transform"
              title="Wishlist"
              id="nav-wishlist-btn"
            >
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                <Heart size={18} strokeWidth={1.5} />
              </motion.div>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#C8A96A] rounded-full ring-2 ring-[#0B0B0B]" />
              )}
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#C8A96A] transition-all duration-300 group-hover:w-4"></span>
            </button>

            {/* Account */}
            <button
              onClick={onAccountClick}
              className="hidden md:block text-gray-300 hover:text-[#C8A96A] transition-colors p-2 cursor-pointer relative group will-change-transform"
              title="Account"
              id="nav-account-btn"
            >
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                <User size={18} strokeWidth={1.5} />
              </motion.div>
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#C8A96A] transition-all duration-300 group-hover:w-4"></span>
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={onCartClick}
              className="text-gray-300 hover:text-[#C8A96A] transition-colors p-2 cursor-pointer relative group will-change-transform"
              title="Shopping Bag"
              id="nav-cart-btn"
            >
              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                <div className="relative">
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 bg-[#C8A96A] text-[#0B0B0B] text-[8px] font-sans font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#0B0B0B] will-change-transform"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </div>
              </motion.div>
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#C8A96A] transition-all duration-300 group-hover:w-4"></span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-[#C8A96A] transition-colors p-2 cursor-pointer"
              aria-label="Toggle Menu"
              id="nav-mobile-toggle-btn"
            >
              {isMobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Mobile Navigation Drawer - Redesigned as modern full-screen luxury overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0B0B0B] z-[100] lg:hidden flex flex-col justify-between pt-20 pb-10 px-6 sm:px-8 overflow-y-auto touch-scrolling select-none gpu-layer"
          >
            {/* Ambient gold glow decoration */}
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#C8A96A]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 left-0 w-64 h-64 bg-[#C8A96A]/3 rounded-full blur-[80px] pointer-events-none" />

            {/* Header branding in full screen */}
            <div className="absolute top-5 left-6 sm:left-8">
              <span className="text-base font-serif tracking-[0.2em] text-[#C8A96A] font-light">BNS</span>
            </div>

            {/* Close Button top-right */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-5 text-gray-300 hover:text-[#C8A96A] p-2.5 rounded-full bg-white/5 border border-white/10 cursor-pointer transition-all duration-300 active:scale-90"
              aria-label="Close Menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className={`flex flex-col space-y-8 relative z-10 my-auto ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <span className="text-[9px] tracking-[0.4em] text-[#C8A96A] uppercase font-light border-b border-[#C8A96A]/10 pb-2 w-fit">
                {language === 'ar' ? 'المجموعات الخاصة بالدار' : 'La Collection Privée'}
              </span>
              
              {/* Navigation Link List */}
              <div className="flex flex-col space-y-5">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-2xl sm:text-3xl font-serif tracking-wider text-white hover:text-[#C8A96A] transition-colors py-1 cursor-pointer flex items-center justify-between group ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] font-sans text-gray-600 group-hover:text-[#C8A96A] tracking-[0.3em] font-light transition-colors">
                      0{index + 1}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Language Selection inside Mobile Drawer */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C8A96A] block">
                  {language === 'ar' ? 'لغة العرض' : 'Display Language'}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`py-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all duration-300 text-[11px] cursor-pointer min-h-[44px] ${
                        language === lang.code
                          ? 'bg-[#C8A96A] text-black border-[#C8A96A] font-medium shadow-[0_5px_15px_rgba(200,169,106,0.2)]'
                          : 'bg-black/50 text-gray-400 border-white/5 hover:border-[#C8A96A]/30'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="font-sans">{lang.native}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer links within mobile menu */}
            <div className={`flex flex-col space-y-6 relative z-10 border-t border-white/5 pt-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onAccountClick();
                  }}
                  className={`flex items-center gap-3 text-gray-400 hover:text-[#C8A96A] transition-colors py-2 text-sm font-sans tracking-widest uppercase font-light ${dir === 'rtl' ? 'justify-start' : 'justify-start'}`}
                >
                  <User size={16} strokeWidth={1.5} />
                  <span>{t('nav_my_account')}</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onWishlistClick();
                  }}
                  className={`flex items-center gap-3 text-gray-400 hover:text-[#C8A96A] transition-colors py-2 text-sm font-sans tracking-widest uppercase font-light ${dir === 'rtl' ? 'justify-end' : 'justify-end'}`}
                >
                  <Heart size={16} strokeWidth={1.5} />
                  <span>{t('nav_wishlist')}</span>
                </button>
              </div>
              
              <div className="text-[8px] text-gray-600 tracking-[0.2em] uppercase text-center mt-2">
                © {new Date().getFullYear()} MAISON D'OR • EXQUISITE SCENTS
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Navigation Bar for Mobile Viewports - Premium iOS Design */}
      <div 
        id="navbar-bottom"
        className="fixed bottom-0 left-0 w-full bg-[#0B0B0B]/85 backdrop-blur-2xl border-t border-[#C8A96A]/15 py-3.5 px-6 flex justify-around items-center z-[90] lg:hidden shadow-[0_-15px_40px_rgba(0,0,0,0.9)] pb-safe"
      >
        <button
          onClick={() => scrollToSection('home')}
          className={`flex flex-col items-center space-y-1 transition-all duration-300 relative cursor-pointer ${
            activeSection === 'home' ? 'text-[#C8A96A]' : 'text-gray-400 hover:text-white'
          }`}
          id="mobile-nav-home"
        >
          <motion.div whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
            <Home size={18} strokeWidth={activeSection === 'home' ? 2 : 1.5} />
          </motion.div>
          <span className="text-[7.5px] uppercase tracking-[0.15em] font-sans font-light">{t('nav_home')}</span>
          {activeSection === 'home' && (
            <motion.span layoutId="mobileActiveIndicator" className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#C8A96A]" />
          )}
        </button>

        <button
          onClick={() => scrollToSection('shop')}
          className={`flex flex-col items-center space-y-1 transition-all duration-300 relative cursor-pointer ${
            activeSection === 'shop' || activeSection === 'collections' ? 'text-[#C8A96A]' : 'text-gray-400 hover:text-white'
          }`}
          id="mobile-nav-shop"
        >
          <motion.div whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
            <Compass size={18} strokeWidth={activeSection === 'shop' || activeSection === 'collections' ? 2 : 1.5} />
          </motion.div>
          <span className="text-[7.5px] uppercase tracking-[0.15em] font-sans font-light">{t('nav_shop')}</span>
          {(activeSection === 'shop' || activeSection === 'collections') && (
            <motion.span layoutId="mobileActiveIndicator" className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#C8A96A]" />
          )}
        </button>

        <button
          onClick={onWishlistClick}
          className="flex flex-col items-center space-y-1 text-gray-400 hover:text-[#C8A96A] transition-all duration-300 relative cursor-pointer"
          id="mobile-nav-wishlist"
        >
          <motion.div whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }} className="relative">
            <Heart size={18} strokeWidth={1.5} className={wishlistCount > 0 ? "text-[#C8A96A]" : ""} fill={wishlistCount > 0 ? "#C8A96A" : "none"} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C8A96A] text-black text-[7px] font-sans font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#0B0B0B]">
                {wishlistCount}
              </span>
            )}
          </motion.div>
          <span className="text-[7.5px] uppercase tracking-[0.15em] font-sans font-light">{t('nav_wishlist')}</span>
        </button>

        <button
          onClick={onCartClick}
          className="flex flex-col items-center space-y-1 text-gray-400 hover:text-[#C8A96A] transition-all duration-300 relative cursor-pointer"
          id="mobile-nav-cart"
        >
          <motion.div whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }} className="relative">
            <ShoppingBag size={18} strokeWidth={cartCount > 0 ? 2 : 1.5} className={cartCount > 0 ? "text-[#C8A96A]" : ""} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C8A96A] text-black text-[7px] font-sans font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-[#0B0B0B]">
                {cartCount}
              </span>
            )}
          </motion.div>
          <span className="text-[7.5px] uppercase tracking-[0.15em] font-sans font-light">{t('nav_cart')}</span>
        </button>

        <button
          onClick={onAccountClick}
          className="flex flex-col items-center space-y-1 text-gray-400 hover:text-[#C8A96A] transition-all duration-300 relative cursor-pointer"
          id="mobile-nav-account"
        >
          <motion.div whileTap={{ scale: 0.85 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
            <User size={18} strokeWidth={1.5} />
          </motion.div>
          <span className="text-[7.5px] uppercase tracking-[0.15em] font-sans font-light">{t('nav_my_account')}</span>
        </button>
      </div>
    </>
  );
}
