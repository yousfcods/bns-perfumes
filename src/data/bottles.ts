import { BottleDesign } from '../types';

export const BOTTLE_DESIGNS: BottleDesign[] = [
  {
    id: 'black-luxury',
    name: 'Black Luxury Bottle',
    nameAr: 'زجاجة أسود فاخر',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80',
    tag: 'Best Seller',
    tagAr: 'الأكثر طلباً',
  },
  {
    id: 'gold-crystal',
    name: 'Gold Crystal Bottle',
    nameAr: 'زجاجة كريستال ذهبي',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80',
    tag: 'Royal',
    tagAr: 'ملكي',
  },
  {
    id: 'obsidian-matte',
    name: 'Obsidian Matte Bottle',
    nameAr: 'زجاجة أسود مطفي',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'royal-diamond',
    name: 'Royal Diamond Bottle',
    nameAr: 'زجاجة ماسي الملكية',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'imperial-clear',
    name: 'Imperial Clear Bottle',
    nameAr: 'زجاجة شفاف إمبراطوري',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'amber-gold',
    name: 'Amber Gold Bottle',
    nameAr: 'زجاجة عنبر ذهبي',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=400&q=80',
  },
];

export const DEFAULT_BOTTLE: BottleDesign = BOTTLE_DESIGNS[0];

export const BOTTLE_DESIGNS_50ML: BottleDesign[] = [
  {
    id: 'bottle-50ml-style-1',
    name: 'Bottle Style 1',
    nameAr: 'تصميم زجاجة 1',
    image: 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1785326526/Gemini_Generated_Image_hwlbufhwlbufhwlb_yhpekb.png',
    tag: 'Classic',
    tagAr: 'كلاسيكي',
  },
  {
    id: 'bottle-50ml-style-2',
    name: 'Bottle Style 2',
    nameAr: 'تصميم زجاجة 2',
    image: 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1785326518/Gemini_Generated_Image_hz4ivghz4ivghz4i_bbggvl.png',
    tag: 'Modern',
    tagAr: 'عصري',
  },
  {
    id: 'bottle-50ml-style-3',
    name: 'Bottle Style 3',
    nameAr: 'تصميم زجاجة 3',
    image: 'https://res.cloudinary.com/qmmcvx8e/image/upload/v1785327217/Gemini_Generated_Image_k2lrv2k2lrv2k2lr_1_zny4kb.png',
    tag: 'Luxury',
    tagAr: 'فاخر',
  },
];

export function getBottlesForSize(size: string): BottleDesign[] {
  if (!size) return [];
  const cleanSize = size.trim().toLowerCase();

  if (cleanSize === '30ml') {
    return BOTTLE_DESIGNS.slice(0, 5); // 5 bottle designs
  }
  if (cleanSize === '50ml') {
    return BOTTLE_DESIGNS_50ML; // 3 bottle designs with specific Cloudinary images
  }
  if (cleanSize === '100ml') {
    return BOTTLE_DESIGNS.slice(0, 1); // 1 bottle design only
  }

  // 12ml, 15ml, 80ml or any other size without custom bottle designs
  return [];
}

