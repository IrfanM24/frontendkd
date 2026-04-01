/**
 * =============================================================
 *  PRODUCTS.JS — single source of truth for catalogue content
 * =============================================================
 * 1. Duplicate one of the product objects below and adjust fields.
 * 2. Keep names consistent with the colour palette defined here.
 * 3. `availableColors`, `tags`, and `sizes` make filters predictable.
 * =============================================================
 */

// ── Quick helpers ───────────────────────────────────────────
const cdnImage = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`

const productDefaults = {
  rating: 4,
  reviews: 12,
  badge: null,
  gender: 'Women',
  tags: [],
  sizes: [],
  bg: '#EEE8E0',
}

const normalizeTags = (product) => {
  const auto = [
    product.gender?.toLowerCase(),
    product.category?.toLowerCase(),
    product.color?.toLowerCase(),
  ]
  const manual = (product.tags || []).map(tag => String(tag || '').trim().toLowerCase())
  return Array.from(new Set([...auto, ...manual].filter(Boolean)))
}

const createProduct = (config) => {
  const product = {
    ...productDefaults,
    ...config,
  }
  product.availableColors = config.availableColors ?? (config.color ? [config.color] : [])
  product.tags = normalizeTags(product)
  return product
}

// ── Sidebar data ────────────────────────────────────────────
export const CATEGORIES = [
  'All',
  'Outerwear',
  'Tops',
  'Trousers',
  'Footwear',
  'Accessories',
  'Loungewear',
  'Dresses',
]

export const COLORS = [
  { name: 'Ivory',      hex: '#F5F0E8' },
  { name: 'Camel',      hex: '#C4955A' },
  { name: 'Charcoal',   hex: '#3C3C3C' },
  { name: 'Sage',       hex: '#8BA888' },
  { name: 'Dusty Rose', hex: '#D4A0A0' },
  { name: 'Navy',       hex: '#1E2A4A' },
  { name: 'Terracotta', hex: '#C47A5A' },
  { name: 'Stone',      hex: '#D7D2C8' },
  { name: 'Sand',       hex: '#E8DCC8' },
  { name: 'Black',      hex: '#0D0D0C' },
  { name: 'Champagne',  hex: '#F9E3C6' },
]

export const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size', 'EU 40', 'EU 41', 'EU 42', 'EU 43']

// ── Product catalogue ───────────────────────────────────────
export const PRODUCTS = [
  createProduct({
    id: 1,
    name: 'Cashmere Overcoat',
    category: 'Outerwear',
    price: 580,
    gender: 'Women',
    image: cdnImage('photo-1524504388940-b1c1722653e1'),
    bg: '#EEE8E0',
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 5,
    reviews: 42,
    badge: 'New',
    color: 'Camel',
    availableColors: ['Camel', 'Ivory', 'Charcoal'],
    description: 'A double-faced cashmere overcoat with architectural lapels and a fluid, robe-like drape.',
    tags: ['cashmere', 'tailoring', 'layering'],
  }),
  createProduct({
    id: 2,
    name: 'Silk Column Blouse',
    category: 'Tops',
    price: 210,
    gender: 'Women',
    image: cdnImage('photo-1521572163474-6864f9cf17ab'),
    bg: '#F0EBF5',
    sizes: ['XS', 'S', 'M', 'L'],
    color: 'Ivory',
    availableColors: ['Ivory', 'Dusty Rose'],
    description: 'Fluid silk with a hidden placket and column silhouette that tucks cleanly into high-rise tailoring.',
    tags: ['silk', 'desk-to-dinner'],
  }),
  createProduct({
    id: 3,
    name: 'Tailored Wool Trouser',
    category: 'Trousers',
    price: 295,
    gender: 'Women',
    image: cdnImage('photo-1503341455253-b2e723bb3dbb'),
    bg: '#E8E4DC',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    color: 'Charcoal',
    availableColors: ['Charcoal', 'Stone'],
    description: 'Impeccably pressed pleats and a high-rise waistband create a sharp, elongated line.',
    tags: ['wide-leg', 'suiting'],
  }),
  createProduct({
    id: 4,
    name: 'Leather Derby',
    category: 'Footwear',
    price: 345,
    gender: 'Men',
    image: cdnImage('photo-1504593811423-6dd665756598'),
    bg: '#F2EDE5',
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43'],
    rating: 4,
    reviews: 19,
    badge: 'New',
    color: 'Charcoal',
    availableColors: ['Charcoal', 'Camel'],
    description: 'Hand-burnished calfskin derbies with a low profile sole and soft square toe.',
    tags: ['leather', 'derby', 'formal'],
  }),
  createProduct({
    id: 5,
    name: 'Merino Fringe Scarf',
    category: 'Accessories',
    price: 125,
    gender: 'Unisex',
    image: cdnImage('photo-1487412720507-e7ab37603c6f'),
    bg: '#E5EDEA',
    sizes: ['One Size'],
    rating: 5,
    reviews: 88,
    color: 'Sage',
    availableColors: ['Sage', 'Ivory'],
    description: 'Featherweight merino finished with micro fringe — designed to wrap twice without bulk.',
    tags: ['scarf', 'winter', 'giftable'],
  }),
  createProduct({
    id: 6,
    name: 'Linen Band-Collar Shirt',
    category: 'Tops',
    price: 165,
    gender: 'Men',
    image: cdnImage('photo-1490111718993-d98654ce6cf7'),
    bg: '#F4F0E8',
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Stone',
    availableColors: ['Stone', 'Sand'],
    description: 'Airy European linen with a band collar and corozo buttons for an easy, refined profile.',
    tags: ['linen', 'band-collar'],
  }),
  createProduct({
    id: 7,
    name: 'Cashmere Lounge Set',
    category: 'Loungewear',
    price: 320,
    gender: 'Women',
    image: cdnImage('photo-1521572166906-148c5a57d242'),
    bg: '#F7EDEE',
    sizes: ['XS', 'S', 'M', 'L'],
    color: 'Dusty Rose',
    availableColors: ['Dusty Rose', 'Ivory'],
    description: 'Matching cashmere knit top and relaxed pant with subtle rib trims for elevated off-duty dressing.',
    tags: ['loungewear', 'set', 'travel'],
  }),
  createProduct({
    id: 8,
    name: 'Merino Turtleneck',
    category: 'Tops',
    price: 215,
    gender: 'Women',
    image: cdnImage('photo-1475180098004-ca77a66827be'),
    bg: '#E0E8EE',
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4,
    reviews: 47,
    color: 'Navy',
    availableColors: ['Navy', 'Charcoal'],
    description: 'Fine-gauge merino with a clean fold-over neck that slips seamlessly under tailoring.',
    tags: ['knitwear', 'layering'],
  }),
  createProduct({
    id: 9,
    name: 'Suede Loafer',
    category: 'Footwear',
    price: 295,
    gender: 'Men',
    image: cdnImage('photo-1483985988355-763728e1935b'),
    bg: '#EDE8E0',
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43'],
    rating: 5,
    reviews: 52,
    color: 'Camel',
    availableColors: ['Camel', 'Charcoal'],
    description: 'Supple Italian suede with a hand-stitched apron and leather outsole.',
    tags: ['loafers', 'handmade'],
  }),
  createProduct({
    id: 10,
    name: 'Linen Drawstring Trouser',
    category: 'Trousers',
    price: 225,
    gender: 'Men',
    image: cdnImage('photo-1503342217505-b0a15ec3261c'),
    bg: '#EAEEE8',
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Sage',
    availableColors: ['Sage', 'Sand'],
    description: 'Relaxed drawstring waist with a tapered leg — ideal for travel or effortless city dressing.',
    tags: ['linen', 'travel'],
  }),
  createProduct({
    id: 11,
    name: 'Leather Waist Belt',
    category: 'Accessories',
    price: 110,
    gender: 'Unisex',
    image: cdnImage('photo-1512436991641-6745cdb1723f'),
    bg: '#F2EDE0',
    sizes: ['One Size'],
    color: 'Camel',
    availableColors: ['Camel', 'Black'],
    description: 'Full-grain leather with a brushed metal keeper sized to cinch dresses or layer over coats.',
    tags: ['belt', 'leather', 'minimal'],
  }),
  createProduct({
    id: 12,
    name: 'Pleated Midi Skirt',
    category: 'Dresses',
    price: 260,
    gender: 'Women',
    image: cdnImage('photo-1524504388940-56574f60c786'),
    bg: '#F6ECE7',
    sizes: ['XS', 'S', 'M', 'L'],
    color: 'Champagne',
    availableColors: ['Champagne', 'Ivory'],
    description: 'Sunray pleats fall from a clean waistband, creating movement with every step.',
    tags: ['pleated', 'occasion'],
  }),
  createProduct({
    id: 13,
    name: 'Structured Crepe Blazer',
    category: 'Outerwear',
    price: 340,
    gender: 'Women',
    image: cdnImage('photo-1521572163474-0bf273ad0a81'),
    bg: '#EFECE6',
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 5,
    reviews: 64,
    badge: 'Bestseller',
    color: 'Stone',
    availableColors: ['Stone', 'Charcoal'],
    description: 'Single-breasted crepe blazer with peak lapels and subtle waist shaping for a sharp profile.',
    tags: ['blazer', 'tailoring', 'desk-to-dinner'],
  }),
]