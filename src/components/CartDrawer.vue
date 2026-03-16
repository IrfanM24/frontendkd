<template>
  <Transition name="fade">
    <div v-if="open" class="fixed inset-0 z-50 flex justify-end">

      <!-- Backdrop -->
      <div @click="$emit('close')" class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <!-- Drawer -->
      <div class="relative w-80 bg-cream h-full flex flex-col shadow-2xl slide-down">

        <!-- Header -->
        <div class="p-6 border-b border-border flex items-center justify-between">
          <h2 class="font-display text-xl tracking-wide text-charcoal">
            Your Bag
            <span class="text-muted text-sm font-body font-light">({{ cartCount }})</span>
          </h2>
          <button @click="$emit('close')" class="text-muted hover:text-charcoal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Items -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div v-if="cart.length === 0" class="text-center text-muted font-body text-sm pt-12">
            <svg class="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"/>
            </svg>
            Your bag is empty
          </div>

          <div v-for="item in cart" :key="item.id + JSON.stringify(item.options || {})" class="flex gap-3 items-start">
            <!-- Thumbnail -->
            <div class="w-16 h-20 rounded overflow-hidden flex-shrink-0" :style="{ background: item.bg }">
              <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-2xl">{{ item.emoji }}</div>
            </div>
            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="font-body text-sm text-charcoal font-medium truncate">{{ item.name }}</p>
              <p class="font-body text-xs text-muted">{{ item.category }}</p>
              <p class="font-display text-base text-charcoal mt-1">€{{ item.price }}</p>
              <div class="text-xs text-muted mt-1">
                <span v-if="item.options && item.options.size">Size: {{ item.options.size }}</span>
                <span v-if="item.options && item.options.color" class="ml-2 flex items-center gap-2">
                  <span class="inline-block w-3 h-3 rounded-full" :style="{ background: getColorHex(item.options.color) }"></span>
                  <span>{{ item.options.color }}</span>
                </span>
              </div>
            </div>
            <!-- Remove -->
            <button @click="$emit('remove', item)" class="text-muted hover:text-charcoal flex-shrink-0 mt-0.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Checkout footer -->
        <div v-if="cart.length > 0" class="p-6 border-t border-border space-y-3">
          <div class="flex justify-between font-body text-sm">
            <span class="text-muted">Subtotal</span>
            <span class="text-charcoal font-medium">€{{ cartTotal }}</span>
          </div>
          <button class="w-full bg-charcoal text-cream font-body text-xs tracking-widest uppercase py-3.5 hover:bg-accent transition-colors duration-200">
            Checkout
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  open:      { type: Boolean, required: true },
  cart:      { type: Array,   default: () => [] },
  cartCount: { type: Number,  default: 0 },
  cartTotal: { type: Number,  default: 0 },
  colors:    { type: Array,   default: () => [] },
})
defineEmits(['close', 'remove'])

function getColorHex(name) {
  const list = colors || []
  const found = list.find(x => x.name === name)
  return found ? found.hex : '#fff'
}
</script>