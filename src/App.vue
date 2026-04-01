<template>
  <div class="bg-cream min-h-screen text-charcoal">
    <AppHeader
      :cart-count="cartCount"
      :search-query="searchQuery"
      :selected-gender="selectedGender"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @toggle-cart="openCart"
      @update:searchQuery="searchQuery = $event"
      @select-gender="toggleGenderFilter"
    />

    <CartDrawer
      :open="cartOpen"
      :cart="cart"
      :cart-count="cartCount"
      :cart-total="cartTotal"
      :colors="COLORS"
      @close="cartOpen = false"
      @remove="removeFromCart"
    />

    <div class="page-shell">
      <!-- Hero -->
      <section class="hero-wrap">
        <div class="hero-panel">
          <p class="text-[11px] uppercase tracking-[0.4em] text-white/70 mb-3">Spring 2025 capsule</p>
          <h2>Quiet Luxury Edit</h2>
          <p>Precision tailoring, architectural silhouettes, and tactile fabrics curated to echo the restraint of contemporary shops.</p>
          <div class="cta-group">
            <button type="button" class="cta-primary" @click="scrollToProducts">Shop editorial</button>
            <button type="button" class="cta-secondary" @click="scrollToEditorial">View campaign</button>
          </div>
        </div>

        <div class="metrics-card">
          <p class="text-[11px] uppercase tracking-[0.45em] text-muted">Inside the shop</p>
          <div class="metrics-grid">
            <div class="metric">
              <h3>48</h3>
              <span>pieces</span>
            </div>
            <div class="metric">
              <h3>12</h3>
              <span>new arrivals</span>
            </div>
            <div class="metric">
              <h3>05</h3>
              <span>atelier drops</span>
            </div>
          </div>
          <p class="text-sm text-muted mt-6">A concise wardrobe system informed by neutral chromatics and long-form craftsmanship.</p>
        </div>
      </section>

      <!-- Editorial picks -->
      <section id="editorial-section" class="editorial-grid">
        <article class="editorial-card">
          <span>Tailoring</span>
          <strong>Studio suiting</strong>
          <a href="#">Discover</a>
        </article>
        <article class="editorial-card">
          <span>Collections</span>
          <strong>Shop atelier</strong>
          <a href="#">Curate</a>
        </article>
        <article class="editorial-card">
          <span>Essentials</span>
          <strong>Wardrobe forms</strong>
          <a href="#">Explore</a>
        </article>
      </section>

      <!-- Product + filters -->
      <section id="product-section" class="mt-16">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-[11px] uppercase tracking-[0.4em] text-muted">Curated selection</p>
            <div class="flex flex-wrap items-baseline gap-4">
              <h2 class="font-display text-3xl tracking-[0.3em] uppercase">
                {{ selectedCategory === 'All' ? 'Seasonal Edit' : selectedCategory }}
              </h2>
              <span class="text-xs text-muted tracking-[0.3em] uppercase">{{ filteredProducts.length }} pieces</span>
            </div>
            <p class="text-sm text-muted mt-2 max-w-2xl">
              Precision filters for colour, form, and proportion streamline your search across the collection.
            </p>
          </div>

          <div class="floating-toolbar flex items-center gap-2 text-[10px] uppercase tracking-[0.4em]">
            <span class="text-muted hidden md:inline">View</span>
            <button
              type="button"
              @click="viewMode = 'grid'"
              :class="['px-3 py-1.5 rounded-full transition-colors', viewMode === 'grid' ? 'bg-charcoal text-cream' : 'text-muted']"
            >Grid</button>
            <button
              type="button"
              @click="viewMode = 'list'"
              :class="['px-3 py-1.5 rounded-full transition-colors', viewMode === 'list' ? 'bg-charcoal text-cream' : 'text-muted']"
            >List</button>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-[280px_1fr] mt-10 items-start">
          <FilterSidebar
            :open="sidebarOpen"
            :categories="CATEGORIES"
            :colors="COLORS"
            :sort-options="sortOptions"
            v-model:selectedCategory="selectedCategory"
            v-model:maxPrice="maxPrice"
            v-model:sortBy="sortBy"
            :sizes="SIZES"
            v-model:selectedSize="selectedSize"
            :available-sizes="availableSizes"
            :selected-colors="selectedColors"
            @toggle-color="toggleColor"
            @clear="clearFilters"
          />

          <main class="flex-1 min-w-0">
            <div
              v-if="filteredProducts.length > 0"
              :class="viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-5'"
            >
              <ProductCard
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
                :view-mode="viewMode"
                :in-cart="!!cart.find(i => i.id === product.id)"
                @open="openProduct"
                @add-to-cart="addToCart"
              />
            </div>

            <div v-else class="text-center py-24 text-muted">
              <svg class="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <p class="font-display text-xl mb-1">No products found</p>
              <p class="text-sm font-body">Try adjusting your filters</p>
              <button @click="clearFilters" class="mt-4 text-xs tracking-widest uppercase underline underline-offset-4 hover:text-charcoal transition-colors">
                Clear filters
              </button>
            </div>
          </main>
        </div>
      </section>
    </div>

    <ProductModal
      :product="selectedProduct"
      :sizes="SIZES"
      :colors="COLORS"
      v-model:selectedSize="modalSelectedSize"
      v-model:selectedColor="modalSelectedColor"
      @close="closeModal"
      @add-to-cart="addToCart"
    />

    <div v-if="toast" class="pointer-events-none fixed top-24 right-6 z-50">
      <div class="glass-panel max-w-sm p-3 rounded-2xl border border-border/70 bg-white/90 shadow-2xl">
        <div class="flex items-center gap-3">
          <div class="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" :style="{ background: toast.bg || '#f4f1eb' }">
            <img v-if="toast.image" :src="toast.image" :alt="toast.name" class="w-full h-full object-cover" />
            <div v-else class="w-full h-full flex items-center justify-center text-2xl">{{ toast.emoji || '🛍️' }}</div>
          </div>
          <div class="min-w-0">
            <p class="text-[10px] tracking-[0.3em] uppercase text-muted font-body">Added to bag</p>
            <p class="font-display text-base text-charcoal truncate">{{ toast.name }}</p>
            <p class="text-xs text-muted font-body truncate">{{ toast.meta }}</p>
          </div>
        </div>
      </div>
    </div>

    <footer class="border-t border-border mt-16 py-10">
      <div class="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase text-muted font-body">
        <span class="font-display text-lg text-charcoal tracking-widest">Clothing</span>
        <div class="flex gap-8">
          <a href="#" class="hover:text-charcoal transition-colors">About</a>
          <a href="#" class="hover:text-charcoal transition-colors">Shipping</a>
          <a href="#" class="hover:text-charcoal transition-colors">Returns</a>
          <a href="#" class="hover:text-charcoal transition-colors">Contact</a>
        </div>
        <span>© 2025 Shop</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CATEGORIES, COLORS, PRODUCTS, SIZES } from './js/products.js'
import AppHeader     from './components/Appheader.vue'
import CartDrawer    from './components/CartDrawer.vue'
import FilterSidebar from './components/FilterSidebar.vue'
import ProductCard   from './components/ProductCard.vue'
import ProductModal  from './components/ProductModal.vue'

// ── UI state ──────────────────────────────────────────────
const sidebarOpen    = ref(false)
const cartOpen       = ref(false)
const viewMode       = ref('grid')
const selectedProduct = ref(null)
const modalSelectedSize  = ref('')
const modalSelectedColor = ref('')

// ── Filter state ──────────────────────────────────────────
const searchQuery      = ref('')
const selectedCategory = ref('All')
const maxPrice         = ref(1000)
const sortBy           = ref('featured')
const selectedColors   = ref([])
const selectedSize     = ref('')
const selectedGender   = ref('')

// ── Cart state ────────────────────────────────────────────
const cart = ref([])
const toast = ref(null)

// ── Sort options ──────────────────────────────────────────
const sortOptions = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest',     label: 'Newest' },
  { value: 'rating',     label: 'Best Rated' },
]

// ── Filtered + sorted products ────────────────────────────
const filteredProducts = computed(() => {
  let list = [...PRODUCTS]

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }

  if (selectedCategory.value !== 'All') {
    list = list.filter(p => p.category === selectedCategory.value)
  }

  list = list.filter(p => p.price <= maxPrice.value)

  if (selectedColors.value.length > 0) {
    list = list.filter(p => selectedColors.value.includes(p.color))
  }

  if (selectedSize.value) {
    list = list.filter(p => Array.isArray(p.sizes) && p.sizes.includes(selectedSize.value))
  }

  if (selectedGender.value) {
    list = list.filter(p => p.gender === selectedGender.value)
  }

  if (sortBy.value === 'price-asc')  list.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') list.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'rating')     list.sort((a, b) => b.rating - a.rating)
  if (sortBy.value === 'newest')     list.sort((a, b) => b.id - a.id)

  return list
})

// available sizes for the currently filtered products (used to grey out sidebar)
const availableSizes = computed(() => {
  const set = new Set()
  filteredProducts.value.forEach(p => {
    if (Array.isArray(p.sizes)) p.sizes.forEach(s => set.add(s))
  })
  return Array.from(set)
})

// ── Cart computed ─────────────────────────────────────────
const cartCount = computed(() => cart.value.length)
const cartTotal = computed(() => cart.value.reduce((s, i) => s + i.price, 0))

// ── Methods ───────────────────────────────────────────────
function addToCart(productOrPayload, maybePayload) {
  // support two calling styles:
  // - addToCart(product)           (from ProductCard)
  // - addToCart({ product, options }) (from ProductModal)
  let product = productOrPayload
  let options = maybePayload
  if (productOrPayload && productOrPayload.product) {
    product = productOrPayload.product
    options = productOrPayload.options || {}
  }
  options = options || {}

  // avoid duplicate entries with same options
  const exists = cart.value.find(i => i.id === product.id && JSON.stringify(i.options || {}) === JSON.stringify(options))
  if (exists) return

  const item = { ...product, options }
  cart.value.push(item)

  const meta = [
    options.size ? `Size: ${options.size}` : '',
    options.color ? `Color: ${options.color}` : '',
  ].filter(Boolean).join(' • ') || product.category

  toast.value = {
    name: product.name,
    image: product.image || null,
    emoji: product.emoji || null,
    bg: product.bg || '#f4f1eb',
    meta,
  }

  // Open cart immediately after add so users can confirm chosen options.
  cartOpen.value = true
  setTimeout(() => { toast.value = null }, 4500)
}

function removeFromCart(item) {
  // remove matching product with same options
  cart.value = cart.value.filter(i => !(i.id === item.id && JSON.stringify(i.options || {}) === JSON.stringify(item.options || {})))
}

function toggleColor(name) {
  const idx = selectedColors.value.indexOf(name)
  if (idx === -1) selectedColors.value.push(name)
  else            selectedColors.value.splice(idx, 1)
}

function clearFilters() {
  selectedCategory.value = 'All'
  maxPrice.value         = 1000
  sortBy.value           = 'featured'
  selectedColors.value   = []
  searchQuery.value      = ''
  selectedSize.value     = ''
  selectedGender.value   = ''
}

function toggleGenderFilter(gender) {
  selectedGender.value = selectedGender.value === gender ? '' : gender
}

function openProduct(product) {
  selectedProduct.value = product
  // prefill modal selections with sensible defaults
  modalSelectedSize.value = (product && Array.isArray(product.sizes) && product.sizes.length) ? product.sizes[0] : ''
  modalSelectedColor.value = product ? (product.availableColors && product.availableColors.length ? product.availableColors[0] : (product.color || '')) : ''
}

function closeModal() {
  selectedProduct.value = null
  modalSelectedSize.value = ''
  modalSelectedColor.value = ''
}

function openCart() {
  cartOpen.value = true
}

function scrollToProducts() {
  const el = document.getElementById('product-section')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function scrollToEditorial() {
  const el = document.getElementById('editorial-section')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>