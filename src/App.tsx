import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Sparkles, Heart, Check, ArrowRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExclusiveOffers from './components/ExclusiveOffers';
import FilterBar from './components/FilterBar';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import BestSellers from './components/BestSellers';
import BrandShowcase from './components/BrandShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import AccountModal from './components/AccountModal';
import CheckoutModal from './components/CheckoutModal';
import InspiredDisclaimer from './components/InspiredDisclaimer';
import AlternativeBrands from './components/AlternativeBrands';
import LoadingScreen from './components/LoadingScreen';
import MensOfferModal from './components/MensOfferModal';
import WomensOfferModal from './components/WomensOfferModal';

import { LUXURY_PERFUMES, getPriceForSize } from './data/perfumes';
import { DEFAULT_BOTTLE, getBottlesForSize } from './data/bottles';
import { FilterState, CartItem, Perfume, BottleDesign } from './types';
import { ImageWithFallback } from './components/ImageWithFallback';

export default function App() {
  // Shopping Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Account state
  const [username, setUsername] = useState<string | null>(null);

  // Performance-oriented Page Loader state
  const [isLoading, setIsLoading] = useState(true);

  // Micro-interaction Feedback Toast state
  const [cartToast, setCartToast] = useState<{ perfume: Perfume; size: string } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Floating persistent cart bubble state
  const [showFloatCart, setShowFloatCart] = useState(false);

  // Filter States
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    brand: '',
    gender: '',
    maxPrice: 10000,
    size: '',
    note: '',
    availability: '',
    collection: '',
  });

  // UI Open/Closed Toggle States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isMensOfferOpen, setIsMensOfferOpen] = useState(false);
  const [isWomensOfferOpen, setIsWomensOfferOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Perfume | null>(null);

  // Active section for top navbar underline indication
  const [activeSection, setActiveSection] = useState('home');

  // Load cart & wishlist from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bns_cart');
    const savedWishlist = localStorage.getItem('bns_wishlist');
    const savedUser = localStorage.getItem('bns_user');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setUsername(savedUser);

    // Initial loading gate simulation for brand prestige
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    // Scroll tracker for floating checkout button & parallax triggers
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatCart(true);
      } else {
        setShowFloatCart(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sync cart with LocalStorage
  const syncCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('bns_cart', JSON.stringify(newCart));
  };

  // Sync wishlist with LocalStorage
  const syncWishlist = (newWishlist: string[]) => {
    setWishlist(newWishlist);
    localStorage.setItem('bns_wishlist', JSON.stringify(newWishlist));
  };

  // Add to Shopping Cart Action
  const handleAddToCart = (
    perfume: Perfume,
    size: string,
    concentration: 'x1' | 'x2' = 'x1',
    bottle?: BottleDesign
  ) => {
    const availableBottles = getBottlesForSize(size);
    const validBottle = availableBottles.length > 0
      ? (bottle && availableBottles.some((b) => b.id === bottle.id) ? bottle : availableBottles[0])
      : undefined;

    const bottleId = validBottle?.id || 'standard';
    const uniqueId = `${perfume.id}-${size}-${concentration}-${bottleId}`;
    const existingIndex = cart.findIndex((item) => item.id === uniqueId);

    // Calculate price using helper
    const price = getPriceForSize(perfume, size, concentration);

    let updatedCart = [...cart];
    if (existingIndex > -1) {
      // Increment quantity
      updatedCart[existingIndex].quantity += 1;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: uniqueId,
        perfume,
        selectedSize: size,
        selectedBottle: validBottle,
        concentration,
        quantity: 1,
        price,
      };
      updatedCart.push(newItem);
    }
    syncCart(updatedCart);

    // Clear previous timeout and display new premium micro-interaction Toast
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setCartToast({ perfume, size });
    toastTimeoutRef.current = setTimeout(() => {
      setCartToast(null);
    }, 4000);
  };

  // Add Special Men's X2 Offer Bundle to Shopping Cart
  const handleAddBundleToCart = (
    bundleItems: { perfume: Perfume; size: string; concentration: 'x2'; price: number }[]
  ) => {
    let updatedCart = [...cart];

    bundleItems.forEach((item) => {
      const availableBottles = getBottlesForSize(item.size);
      const validBottle = availableBottles.length > 0 ? availableBottles[0] : undefined;
      const bottleId = validBottle?.id || 'standard';
      const uniqueId = `${item.perfume.id}-${item.size}-${item.concentration}-${bottleId}`;

      const existingIndex = updatedCart.findIndex((i) => i.id === uniqueId);
      if (existingIndex > -1) {
        updatedCart[existingIndex].quantity += 1;
      } else {
        const newItem: CartItem = {
          id: uniqueId,
          perfume: item.perfume,
          selectedSize: item.size,
          selectedBottle: validBottle,
          concentration: item.concentration,
          quantity: 1,
          price: item.price,
        };
        updatedCart.push(newItem);
      }
    });

    syncCart(updatedCart);
    setIsCartOpen(true);
  };

  // Update Item Quantity in Cart Drawer
  const handleUpdateQuantity = (uniqueId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(uniqueId);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === uniqueId ? { ...item, quantity: qty } : item
      );
      syncCart(updatedCart);
    }
  };

  // Remove Item from Cart Drawer
  const handleRemoveItem = (uniqueId: string) => {
    const updatedCart = cart.filter((item) => item.id !== uniqueId);
    syncCart(updatedCart);
  };

  // Update Item Size in Cart (12ml, 15ml, 30ml, 50ml, 80ml, 100ml)
  const handleUpdateSize = (oldUniqueId: string, newSize: string) => {
    const itemIndex = cart.findIndex((item) => item.id === oldUniqueId);
    if (itemIndex === -1) return;

    const item = cart[itemIndex];
    const conc = item.concentration || 'x1';

    const availableBottles = getBottlesForSize(newSize);
    let newBottle: BottleDesign | undefined;
    if (availableBottles.length > 0) {
      if (item.selectedBottle && availableBottles.some((b) => b.id === item.selectedBottle?.id)) {
        newBottle = item.selectedBottle;
      } else {
        newBottle = availableBottles[0];
      }
    } else {
      newBottle = undefined;
    }

    const bottleId = newBottle?.id || 'standard';
    const newUniqueId = `${item.perfume.id}-${newSize}-${conc}-${bottleId}`;
    const newPrice = getPriceForSize(item.perfume, newSize, conc);

    let updatedCart = [...cart];
    const existingNewIndex = updatedCart.findIndex((i) => i.id === newUniqueId);
    if (existingNewIndex > -1 && existingNewIndex !== itemIndex) {
      updatedCart[existingNewIndex].quantity += item.quantity;
      updatedCart.splice(itemIndex, 1);
    } else {
      updatedCart[itemIndex] = {
        ...item,
        id: newUniqueId,
        selectedSize: newSize,
        selectedBottle: newBottle,
        price: newPrice,
      };
    }
    syncCart(updatedCart);
  };

  // Clear Cart on Successful Checkout
  const handleCheckoutSuccess = () => {
    syncCart([]);
  };

  // Toggle Wishlist Status
  const handleToggleWishlist = (perfumeId: string) => {
    if (wishlist.includes(perfumeId)) {
      // Remove
      const updatedWishlist = wishlist.filter((id) => id !== perfumeId);
      syncWishlist(updatedWishlist);
    } else {
      // Add
      syncWishlist([...wishlist, perfumeId]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: '',
      brand: '',
      gender: '',
      maxPrice: 10000,
      size: '',
      note: '',
      availability: '',
      collection: '',
    });
  };

  // Account login/logout simulation
  const handleLogin = (user: string) => {
    setUsername(user);
    localStorage.setItem('bns_user', user);
  };

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem('bns_user');
  };

  // Smooth Scroll Helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Account for the navbar offset height
      const offset = 90; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  // Monitor Scroll Position to Highlight active Navbar category link
  useEffect(() => {
    const sections = ['home', 'shop', 'brands', 'alternative-brands', 'bestsellers', 'why-choose-us'];
    
    const handleScrollMonitor = () => {
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollMonitor);
    return () => window.removeEventListener('scroll', handleScrollMonitor);
  }, []);

  // Filter Catalog algorithm
  const filteredPerfumes = LUXURY_PERFUMES.filter((perfume) => {
    // 1. Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchName = perfume.name.toLowerCase().includes(query);
      const matchBrand = perfume.brand.toLowerCase().includes(query);
      const matchFamily = perfume.family && perfume.family.toLowerCase().includes(query);
      const matchNotes = perfume.notes && perfume.notes.some(note => note.toLowerCase().includes(query));
      const matchCollection = perfume.collections && perfume.collections.some(col => col.toLowerCase().includes(query));
      const matchDesc = perfume.description.toLowerCase().includes(query);
      
      if (!matchName && !matchBrand && !matchFamily && !matchNotes && !matchCollection && !matchDesc) {
        return false;
      }
    }

    // 2. Brand filter
    if (filters.brand && perfume.brand !== filters.brand) {
      return false;
    }

    // 3. Gender filter
    if (filters.gender && perfume.gender !== filters.gender) {
      return false;
    }

    // 4. Note filter
    if (filters.note && !perfume.notes.includes(filters.note)) {
      return false;
    }

    // 5. Size filter
    if (filters.size && !perfume.sizes.includes(filters.size)) {
      return false;
    }

    // 6. Availability filter
    if (filters.availability && perfume.availability !== filters.availability) {
      return false;
    }

    // 7. Max Price filter based on default size price
    if (perfume.price > filters.maxPrice) {
      return false;
    }

    // 8. Collection filter
    if (filters.collection && !perfume.collections.includes(filters.collection)) {
      return false;
    }

    return true;
  });

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen relative flex flex-col justify-between overflow-x-hidden select-none">
      
      {/* 0. Luxury Loading Gate */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading-screen" />}
      </AnimatePresence>

      {/* Scent-Added Micro-Interaction Toast */}
      <AnimatePresence>
        {cartToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 sm:bottom-6 right-6 md:right-12 z-[999] bg-[#111111]/95 backdrop-blur-xl border border-[#C8A96A]/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] max-w-sm w-[calc(100vw-3rem)] text-left flex gap-4 overflow-hidden"
          >
            {/* Elegant corner highlights */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#C8A96A]" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#C8A96A]" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#C8A96A]" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#C8A96A]" />

            {/* Product Image preview */}
            <div className="w-16 h-16 bg-black flex-shrink-0 border border-gray-900 overflow-hidden relative">
              <ImageWithFallback
                perfume={cartToast.perfume}
                alt={cartToast.perfume.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Details and Actions */}
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[7.5px] uppercase tracking-[0.2em] text-[#C8A96A] block font-sans">
                    {cartToast.perfume.brand}
                  </span>
                  <h5 className="text-xs font-serif text-white tracking-wide font-light">
                    {cartToast.perfume.name}
                  </h5>
                  <span className="text-[9px] text-gray-400 font-sans">
                    Size: {cartToast.size} • Qty: 1
                  </span>
                </div>
                <button
                  onClick={() => setCartToast(null)}
                  className="text-gray-500 hover:text-white p-0.5 cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Complementary Shipping status */}
              <div className="flex items-center space-x-1.5 bg-[#C8A96A]/10 py-1 px-2 border border-[#C8A96A]/10 rounded-sm">
                <span className="w-1 h-1 bg-[#C8A96A] rounded-full animate-pulse" />
                <span className="text-[7.5px] uppercase tracking-[0.15em] text-[#C8A96A] font-medium font-sans">
                  Private Coffret Secured
                </span>
              </div>

              {/* View bag CTA */}
              <button
                onClick={() => {
                  setCartToast(null);
                  setIsCartOpen(true);
                }}
                className="w-full py-1.5 bg-[#C8A96A] hover:bg-white text-black transition-colors text-[8.5px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center space-x-1"
              >
                <span>View Private Coffret</span>
                <ArrowRight size={10} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Persistent Checkout Button */}
      <AnimatePresence>
        {showFloatCart && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-20 left-6 sm:bottom-6 sm:left-6 md:left-12 lg:bottom-10 lg:left-12 z-[49] bg-[#0B0B0B] hover:bg-white border border-[#C8A96A] text-[#C8A96A] hover:text-black p-4 rounded-full shadow-[0_15px_35px_rgba(0,0,0,0.85)] cursor-pointer group flex items-center justify-center"
            title="Open Cart"
          >
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
              {cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-[#C8A96A] text-black text-[8px] font-sans font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#0B0B0B]">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 1. Sticky Transparent Navbar with Scroll Blur */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onSearchClick={() => scrollToSection('shop')}
        onAccountClick={() => setIsAccountOpen(true)}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />

      {/* 2. Hero Section: Full cinematic backdrop and typography */}
      <Hero onExploreClick={() => scrollToSection('shop')} />

      {/* 2.1 Exclusive Offers Carousel Section */}
      <ExclusiveOffers
        onProductClick={(perfume) => setSelectedProduct(perfume)}
        onExploreClick={() => scrollToSection('shop')}
        onSelectMensOffer={() => setIsMensOfferOpen(true)}
        onSelectWomensOffer={() => setIsWomensOfferOpen(true)}
      />

      {/* 2.5 Inspired Fragrances Philosophy Disclaimer */}
      <InspiredDisclaimer />

      {/* 3. Smart Search & Filter Bar: Floating Glass Panel */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onSearchSubmit={() => scrollToSection('shop')}
        onResetFilters={resetFilters}
      />

      {/* VIP Membership Welcome Badge Toast */}
      {username && (
        <div className="max-w-[1700px] mx-auto w-full px-6 md:px-12 -mt-4 mb-4 text-left">
          <div className="inline-flex items-center space-x-2 bg-[#C8A96A]/10 border border-[#C8A96A]/30 py-2 px-4 rounded-sm text-xs text-[#C8A96A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A] animate-ping" />
            <span>Welcome, Private Club Member <strong>{username}</strong>. Unlocked complimentary overnight shipping.</span>
          </div>
        </div>
      )}

      {/* 4. Shop / Catalogue Section */}
      <section id="shop" className="max-w-[1700px] mx-auto px-6 md:px-12 py-16 w-full">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Desktop Left Sidebar: Sticky Filter inputs */}
          <Sidebar
            filters={filters}
            setFilters={setFilters}
            onResetFilters={resetFilters}
          />

          {/* Right Main Grid Catalog */}
          <ProductGrid
            perfumes={filteredPerfumes}
            selectedCollection={filters.collection}
            onSelectCollection={(col) => setFilters(prev => ({ ...prev, collection: col }))}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
            onProductClick={(perfume) => setSelectedProduct(perfume)}
          />

        </div>
      </section>

      {/* 5. Best Sellers Carousel Section */}
      <BestSellers
        perfumes={LUXURY_PERFUMES}
        onAddToCart={handleAddToCart}
        onProductClick={(perfume) => setSelectedProduct(perfume)}
      />

      {/* 6. Luxury Brand Showcase Grid */}
      <BrandShowcase
        onBrandSelect={(brandName) => {
          setFilters((prev) => ({ ...prev, brand: brandName }));
          scrollToSection('shop');
        }}
      />

      {/* 6.5 Alternative Brands (Arabic Perfume Houses) Section */}
      <AlternativeBrands
        onBrandSelect={(brandName) => {
          setFilters((prev) => ({ ...prev, brand: brandName }));
          scrollToSection('shop');
        }}
      />

      {/* 7. Why Choose Us Pillar section */}
      <WhyChooseUs />

      {/* 8. Newsletter Private Club registration */}
      <Newsletter />

      {/* 9. Premium Multi-column Footer */}
      <Footer />

      {/* ========================================== */}
      {/* INTERACTIVE DRAWERS & MODALS OVERLAYS */}
      {/* ========================================== */}

      {/* Shopping Cart Side Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutSuccess={handleCheckoutSuccess}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Modern Black & Gold BNS Checkout System */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateSize={handleUpdateSize}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Wishlist Saved Side Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        perfumes={LUXURY_PERFUMES}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        perfume={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
      />

      {/* Men's X2 Collection Offer Modal */}
      <MensOfferModal
        isOpen={isMensOfferOpen}
        onClose={() => setIsMensOfferOpen(false)}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Women's X2 Collection Offer Modal */}
      <WomensOfferModal
        isOpen={isWomensOfferOpen}
        onClose={() => setIsWomensOfferOpen(false)}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Account Signup / Registry Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onLoginSuccess={handleLogin}
        currentUsername={username}
        onLogout={handleLogout}
      />

      {/* Mobile Sidebar Filter Drawer (collapses from left on responsive) */}
      {isMobileFiltersOpen && (
        <Sidebar
          filters={filters}
          setFilters={setFilters}
          onResetFilters={resetFilters}
          isMobileDrawerOpen={isMobileFiltersOpen}
          onCloseMobileDrawer={() => setIsMobileFiltersOpen(false)}
        />
      )}

    </div>
  );
}
