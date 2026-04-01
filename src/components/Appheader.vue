<template>
  <header class="sticky top-0 z-50 backdrop-blur-xl bg-cream/80 border-b border-border/70">
    <!-- Announcement strip -->
    <div class="hidden md:flex items-center justify-between text-[10px] tracking-[0.35em] uppercase font-body text-muted border-b border-border/70 px-6 h-9">
      <span>Complimentary shipping on orders over €250</span>
      <span class="flex items-center gap-3">
        <span class="hidden lg:inline">Seasonal lookbook</span>
        <span class="logo-line"></span>
        <span>Edition No. 07</span>
      </span>
    </div>

    <div class="max-w-screen-xl mx-auto px-4 sm:px-6">
      <div class="h-20 flex items-center gap-4">
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <button @click="$emit('toggle-sidebar')" class="lg:hidden text-charcoal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>

          <nav class="hidden lg:flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] font-body text-muted">
            <button
              type="button"
              @click="$emit('select-gender', 'Women')"
              :class="['nav-pill', selectedGender === 'Women' ? 'active' : '']"
            >Women</button>
            <button
              type="button"
              @click="$emit('select-gender', 'Men')"
              :class="['nav-pill', selectedGender === 'Men' ? 'active' : '']"
            >Men</button>
            <button
              type="button"
              @click="$emit('select-gender', 'Unisex')"
              :class="['nav-pill', selectedGender === 'Unisex' ? 'active' : '']"
            >Unisex</button>
          </nav>
        </div>

        <div class="text-center flex flex-col items-center">
          <h1 class="font-display text-3xl tracking-[0.4em] uppercase text-charcoal">Clothing</h1>
          <span class="text-[10px] tracking-[0.45em] uppercase text-muted">Shop 2025</span>
        </div>

        <div class="flex-1 flex items-center justify-end gap-3 text-charcoal">
          <div class="hidden lg:flex items-center gap-2">
            <a href="/login.html" class="nav-pill">Login</a>
            <a href="/js/register.html" class="nav-pill">Register</a>
          </div>

          <div class="hidden md:flex items-center gap-2 border border-border rounded-full px-3 py-1.5 bg-white min-w-[220px]">
            <svg class="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path stroke-linecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <input
              :value="searchQuery"
              @input="$emit('update:searchQuery', $event.target.value)"
              type="text"
              placeholder="Search the shop"
              class="text-xs bg-transparent outline-none w-full placeholder-muted font-body text-charcoal"
            />
          </div>

          <a href="/login.html" class="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-charcoal hover:text-cream transition-colors" aria-label="Wishlist">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.726 0-3.229 1.012-3.937 2.475-.708-1.463-2.211-2.475-3.938-2.475C6.85 3.75 4.75 5.765 4.75 8.25c0 7.063 7.625 11.313 7.625 11.313S21 15.313 21 8.25Z" />
            </svg>
          </a>

          <button @click="$emit('toggle-cart')" class="relative flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-charcoal hover:text-cream transition-colors" aria-label="Cart">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
            </svg>
            <span
              v-if="cartCount > 0"
              :key="cartCount"
              class="cart-badge absolute -top-1 -right-1 bg-accent text-white text-[10px] font-body rounded-full w-4 h-4 flex items-center justify-center leading-none"
            >{{ cartCount }}</span>
          </button>
        </div>
      </div>

      <!-- mobile search -->
      <div class="md:hidden pb-4">
        <div class="flex items-center gap-2 mb-3">
          <a href="/login.html" class="nav-pill text-[10px] tracking-[0.3em] uppercase">Login</a>
          <a href="/js/register.html" class="nav-pill text-[10px] tracking-[0.3em] uppercase">Register</a>
        </div>
        <label class="sr-only">Search the shop</label>
        <div class="flex items-center gap-2 border border-border rounded-full px-4 py-2 bg-white">
          <svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path stroke-linecap="round" d="m21 21-4.35-4.35" />
          </svg>
          <input
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
            type="text"
            placeholder="Search the shop"
            class="text-sm bg-transparent outline-none w-full placeholder-muted font-body text-charcoal"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  cartCount:   { type: Number, default: 0 },
  searchQuery: { type: String, default: '' },
  selectedGender: { type: String, default: '' },
})
defineEmits(['toggle-sidebar', 'toggle-cart', 'update:searchQuery', 'select-gender'])
</script>