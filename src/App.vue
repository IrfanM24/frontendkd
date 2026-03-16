<template>
  <div>
    <!-- Header -->
    <AppHeader
      :cart-count="cartCount"
      :search-query="searchQuery"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @toggle-cart="cartOpen = !cartOpen"
      @update:searchQuery="searchQuery = $event"
    />

    <!-- Cart -->
    <CartDrawer
      :open="cartOpen"
      :cart="cart"
      :cart-count="cartCount"
      :cart-total="cartTotal"
      :colors="COLORS"
      @close="cartOpen = false"
      @remove="removeFromCart"
    />

    <!-- layout -->
    <div class="max-w-screen-xl mx-auto px-6 py-8 flex gap-8">

      <!-- Sidebar -->
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

      <!-- Main area -->
      <main class="flex-1 min-w-0">

        <!-- Toolbar -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="font-display text-2xl text-charcoal tracking-wide">
              {{ selectedCategory === 'All' ? 'All Products' : selectedCategory }}
            </h2>
            <p class="text-xs text-muted font-body mt-0.5">{{ filteredProducts.length }} items</p>
          </div>

          <!-- Grid / List toggle -->
          <div class="flex gap-1 border border-border rounded p-1 bg-white">
            <button
              @click="viewMode = 'grid'"
              :class="['p-1.5 rounded transition-colors',
                       viewMode === 'grid' ? 'bg-charcoal text-cream' : 'text-muted hover:text-charcoal']"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                <rect x="1" y="1" width="6" height="6"/>
                <rect x="9" y="1" width="6" height="6"/>
                <rect x="1" y="9" width="6" height="6"/>
                <rect x="9" y="9" width="6" height="6"/>
              </svg>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="['p-1.5 rounded transition-colors',
                       viewMode === 'list' ? 'bg-charcoal text-cream' : 'text-muted hover:text-charcoal']"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                <rect x="1" y="2"    width="14" height="2.5"/>
                <rect x="1" y="6.75" width="14" height="2.5"/>
                <rect x="1" y="11.5" width="14" height="2.5"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Product grid -->
        <div
          v-if="filteredProducts.length > 0"
          :class="viewMode === 'grid'
            ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'
            : 'space-y-4'"
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

        <!-- Empty state -->
        <div v-else class="text-center py-24 text-muted">
          <svg class="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
          </svg>
          <p class="font-display text-xl mb-1">No products found</p>
          <p class="text-sm font-body">Try adjusting your filters</p>
          <button @click="clearFilters" class="mt-4 text-xs tracking-widest uppercase underline underline-offset-4 hover:text-charcoal transition-colors">
            Clear filters
          </button>
        </div>
      </main>
    </div>

    <!-- Product modal -->
    <ProductModal
      :product="selectedProduct"
      :sizes="SIZES"
      :colors="COLORS"
      v-model:selectedSize="modalSelectedSize"
      v-model:selectedColor="modalSelectedColor"
      @close="closeModal"
      @add-to-cart="addToCart"
    />

    <!-- Toast -->
    <div v-if="toast" class="fixed top-6 right-6 z-50">
      <div class="bg-charcoal text-cream px-4 py-3 rounded shadow-lg max-w-sm">
        <div class="text-sm">{{ toast }}</div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="border-t border-border mt-16 py-10">
      <div class="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest uppercase text-muted font-body">
        <span class="font-display text-lg text-charcoal tracking-widest">Clothing</span>
        <div class="flex gap-8">
          <a href="#" class="hover:text-charcoal transition-colors">About</a>
          <a href="#" class="hover:text-charcoal transition-colors">Shipping</a>
          <a href="#" class="hover:text-charcoal transition-colors">Returns</a>
          <a href="#" class="hover:text-charcoal transition-colors">Contact</a>
        </div>
        <span>© 2025 footer</span>
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
  // show toast with full description
  const desc = `${product.name}${options.size ? ' • Size: '+options.size : ''}${options.color ? ' • Color: '+options.color : ''} — ${product.description}`
  toast.value = desc
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
</script>