export interface Perfume {
  id: string;
  brand: string;
  name: string;
  price: number; // Base price for default size
  rating: number;
  reviewsCount: number;
  image: string;
  fallbackImage?: string; // High-quality CDN fallback image for live preview
  sizes: string[]; // e.g. ["50ml", "100ml", "150ml"]
  sizePrices?: Record<string, number>; // Price multipliers/additions or direct prices for each size
  defaultSize: string;
  gender: 'Men' | 'Women' | 'Unisex';
  notes: string[]; // woody, amber, vanilla, citrus, floral, fresh, musky, leather, oriental
  availability: 'In Stock' | 'New Arrival' | 'Best Seller';
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  story: string;
  inspiredBy: string; // e.g. "Dior Sauvage"
  longevity: string; // e.g. "8-12 Hours"
  projection: string; // e.g. "Strong"
  season: string; // e.g. "Summer" or "Winter"
  family: string; // e.g. "Woody", "Citrus", "Amber", etc.
  collections: string[]; // e.g. ["Fresh & Citrus", "Summer Collection", "Best Sellers"]
}

export interface BottleDesign {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  tag?: string;
  tagAr?: string;
}

export interface CartItem {
  id: string; // unique ID combining perfumeId + size + concentration + bottleId
  perfume: Perfume;
  selectedSize: string;
  selectedBottle?: BottleDesign;
  concentration?: 'x1' | 'x2';
  quantity: number;
  price: number; // calculated based on size
}

export interface FilterState {
  search: string;
  brand: string;
  gender: string;
  maxPrice: number;
  size: string;
  note: string;
  availability: string;
  collection: string;
}
