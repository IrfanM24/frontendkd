/**
 * =============================================================
 *  PRODUCTS.JS — edit this file to manage your catalogue
 *  Location: src/js/products.js
 * =============================================================
 *
 *  HOW TO ADD A NEW PRODUCT
 *  ------------------------
 *  Copy one of the objects below, paste it at the end of the
 *  array, give it a unique `id`, and fill in the fields.
 *
 *  HOW TO USE A REAL IMAGE
 *  -----------------------
 *  1. Drop your image into  src/assets/images/
 *  2. Import it at the top of this file:
 *       import myPhoto from '../assets/images/my-photo.jpg'
 *  3. Set  image: myPhoto  on the product.
 *  If image is null or an emoji string the emoji is shown instead.
 *
 *  HOW TO ADD A CATEGORY
 *  ----------------------
 *  Add the name string to CATEGORIES, then use it in a product.
 *
 *  HOW TO ADD A COLOUR SWATCH
 *  ---------------------------
 *  Add { name, hex } to COLORS, then use name in a product.
 * =============================================================
 */

// ── Import real product images here ─────────────────────────
import cashmereCoat from '../assets/images/CashmereOvercoat_light-grey.jpg'

import tailoredTrousers from '../assets/images/TailoredTrousers-black.jpg'


// ── Categories shown in the sidebar filter ──────────────────
export const CATEGORIES = [
  'All',
  'Outerwear',
  'Tops',
  'Trousers',
  'Footwear',
  'Accessories',
  'Home',
]

// ── Colour swatches shown in the sidebar filter ─────────────
export const COLORS = [
  { name: 'Ivory',      hex: '#F5F0E8' },
  { name: 'Camel',      hex: '#C4955A' },
  { name: 'Charcoal',   hex: '#3C3C3C' },
  { name: 'Sage',       hex: '#8BA888' },
  { name: 'Dusty Rose', hex: '#D4A0A0' },
  { name: 'Navy',       hex: '#1E2A4A' },
  { name: 'Terracotta', hex: '#C47A5A' },
]

// ── Product catalogue ────────────────────────────────────────
export const PRODUCTS = [
  {
    id: 1,
    name: 'Cashmere Overcoat',
    category: 'Outerwear',
    price: 580,
    image: cashmereCoat,
    bg: '#EEE8E0',
    rating: 5,
    reviews: 42,
    badge: 'New',         // 'New' | 'Sale' | null
    color: 'Camel',
    description: 'A luxurious double-faced cashmere overcoat with a relaxed silhouette and refined lapels. Timeless and versatile.',
  },
  {
    id: 2,
    name: 'Silk Blouse',
    category: 'Tops',
    price: 195,
    image: null,
    emoji: '👚',
    bg: '#F0EBF5',
    rating: 4,
    reviews: 28,
    badge: null,
    color: 'Dusty Rose',
    description: 'Fluid silk blouse with a draped collar. An effortlessly elegant piece for day or evening.',
  },
  {
    id: 3,
    name: 'Tailored Trousers',
    category: 'Trousers',
    price: 285,
    image: tailoredTrousers,
    
    bg: '#E8E4DC',
    rating: 5,
    reviews: 61,
    badge: null,
    color: 'Charcoal',
    description: 'Impeccably cut wide-leg trousers in a premium wool blend. A wardrobe cornerstone.',
  },
  {
    id: 4,
    name: 'Leather Derby',
    category: 'Footwear',
    price: 345,
    image: null,
    emoji: '👟',
    bg: '#F2EDE5',
    rating: 4,
    reviews: 19,
    badge: 'New',
    color: 'Ivory',
    description: 'Hand-finished calfskin derbies with a leather sole. Classic craftmanship for the modern wardrobe.',
  },
  {
    id: 5,
    name: 'Wool Scarf',
    category: 'Accessories',
    price: 125,
    image: null,
    emoji: '🧣',
    bg: '#E5EDEA',
    rating: 5,
    reviews: 88,
    badge: null,
    color: 'Sage',
    description: 'A generous merino wool scarf woven in a subtle herringbone pattern. Warmth without compromise.',
  },
  {
    id: 6,
    name: 'Linen Shirt',
    category: 'Tops',
    price: 145,
    image: null,
    emoji: '👕',
    bg: '#F4F0E8',
    rating: 4,
    reviews: 33,
    badge: null,
    color: 'Ivory',
    description: 'Relaxed linen shirt with mother-of-pearl buttons. The essential summer top.',
  },
  {
    id: 7,
    name: 'Ceramic Vase',
    category: 'Home',
    price: 98,
    image: null,
    emoji: '🏺',
    bg: '#F0E8E0',
    rating: 5,
    reviews: 15,
    badge: 'New',
    color: 'Terracotta',
    description: 'Hand-thrown ceramic vase with a matte glaze. Each piece is unique, bearing the mark of the maker.',
  },
  {
    id: 8,
    name: 'Merino Turtleneck',
    category: 'Tops',
    price: 215,
    image: null,
    emoji: '🧤',
    bg: '#E0E8EE',
    rating: 4,
    reviews: 47,
    badge: null,
    color: 'Navy',
    description: 'Fine merino wool turtleneck in a relaxed fit. The perfect layering piece for cooler months.',
  },
  {
    id: 9,
    name: 'Suede Loafer',
    category: 'Footwear',
    price: 295,
    image: null,
    emoji: '🥿',
    bg: '#EDE8E0',
    rating: 5,
    reviews: 52,
    badge: null,
    color: 'Camel',
    description: 'Buttery suede loafers with a stacked leather heel. A modern classic with old-world charm.',
  },
  {
    id: 10,
    name: 'Linen Trousers',
    category: 'Trousers',
    price: 225,
    image: null,
    emoji: '👔',
    bg: '#EAEEE8',
    rating: 4,
    reviews: 21,
    badge: null,
    color: 'Sage',
    description: 'Lightweight linen trousers with an elasticated waistband and tapered leg. Effortless summer dressing.',
  },
  {
    id: 11,
    name: 'Leather Belt',
    category: 'Accessories',
    price: 110,
    image: null,
    emoji: '⌚',
    bg: '#F2EDE0',
    rating: 4,
    reviews: 36,
    badge: null,
    color: 'Camel',
    description: 'Full-grain leather belt with a polished brass buckle. A quiet mark of quality.',
  },
  {
    id: 12,
    name: 'Linen Throw',
    category: 'Home',
    price: 175,
    image: null,
    emoji: '🛋️',
    bg: '#EAE8F0',
    rating: 5,
    reviews: 9,
    badge: 'New',
    color: 'Dusty Rose',
    description: 'Stonewashed linen throw in a generous size. Drapes beautifully over a sofa or the end of a bed.',
  },

  // ── ADD NEW PRODUCTS BELOW ────────────────────────────────
  // {
  //   id: 13,
  //   name: 'My New Product',
  //   category: 'Tops',
  //   price: 99,
  //   image: null,           // or: import myImg from '../assets/images/x.jpg'
  //   emoji: '👜',
  //   bg: '#F0EEE8',
  //   rating: 4,
  //   reviews: 0,
  //   badge: 'New',
  //   color: 'Ivory',
  //   description: 'Short product description.',
  // },
]