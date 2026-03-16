<template>
  <header class="sticky top-0 z-50 bg-cream border-b border-border">
    <div class="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">

      <!-- Logo + mobile hamburger -->
      <div class="flex items-center gap-3">
        <button @click="$emit('toggle-sidebar')" class="lg:hidden text-charcoal mr-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/>
          </svg>
        </button>
        <h1 class="font-display text-2xl tracking-widest text-charcoal uppercase">Clothing</h1>
        <span class="logo-line hidden sm:inline-block"></span>
        <span class="hidden sm:inline text-xs tracking-[0.2em] text-muted uppercase font-body">Collection 2025</span>
      </div>

      <!-- Main nav -->
      <nav class="hidden md:flex items-center gap-8 text-xs tracking-[0.15em] uppercase text-muted font-body">
        <a href="#" class="hover:text-charcoal transition-colors">New In</a>
        <a href="#" class="hover:text-charcoal transition-colors">Women</a>
        <a href="#" class="hover:text-charcoal transition-colors">Men</a>
        <a href="#" class="hover:text-charcoal transition-colors">Home</a>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-5 text-charcoal">
        <!-- Search -->
        <div class="hidden sm:flex items-center gap-2 border border-border rounded-full px-3 py-1.5 bg-white">
          <svg class="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/>
            <path stroke-linecap="round" d="m21 21-4.35-4.35"/>
          </svg>
          <input
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
            type="text"
            placeholder="Search…"
            class="text-xs bg-transparent outline-none w-28 placeholder-muted font-body text-charcoal"
          />
        </div>

        <!-- Wishlist -->
        <button class="hover:text-accent transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
          </svg>
        </button>

        <!-- Cart -->
        <button @click="$emit('toggle-cart')" class="relative hover:text-accent transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"/>
          </svg>
          <span
            v-if="cartCount > 0"
            :key="cartCount"
            class="cart-badge absolute -top-2 -right-2 bg-accent text-white text-[10px] font-body rounded-full w-4 h-4 flex items-center justify-center leading-none"
          >{{ cartCount }}</span>
        </button>
      </div>

    </div>
  </header>
</template>

<script setup>
defineProps({
  cartCount:   { type: Number, default: 0 },
  searchQuery: { type: String, default: '' },
})
defineEmits(['toggle-sidebar', 'toggle-cart', 'update:searchQuery'])
</script>