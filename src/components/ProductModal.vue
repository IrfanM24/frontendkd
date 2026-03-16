<template>
  <Transition name="fade">
    <div v-if="product" class="fixed inset-0 z-50 flex items-center justify-center p-4">

      <!-- Backdrop -->
      <div @click="$emit('close')" class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <!-- Modal -->
      <div class="relative bg-cream rounded-xl overflow-hidden shadow-2xl max-w-2xl w-full flex flex-col md:flex-row slide-down max-h-[90vh]">

        <!-- Image panel -->
        <div
          class="md:w-1/2 h-64 md:h-auto flex items-center justify-center overflow-hidden"
          :style="{ background: product.bg }"
        >
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <span v-else class="text-8xl select-none">{{ product.emoji }}</span>
        </div>

        <!-- Details panel -->
        <div class="md:w-1/2 p-8 flex flex-col overflow-y-auto">

          <button @click="$emit('close')" class="absolute top-4 right-4 text-muted hover:text-charcoal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <p class="text-[10px] tracking-[0.2em] uppercase text-muted font-body mb-1">{{ product.category }}</p>
          <h2 class="font-display text-3xl text-charcoal mb-1">{{ product.name }}</h2>

          <div class="flex items-center gap-1.5 mb-4">
            <span
              v-for="i in 5" :key="i"
              :class="i <= product.rating ? 'text-accent' : 'text-border'"
            >★</span>
            <span class="text-xs text-muted font-body">{{ product.reviews }} reviews</span>
          </div>

          <p class="text-sm font-body text-muted leading-relaxed mb-6">{{ product.description }}</p>

          <div class="mt-auto">
            <div class="flex items-end justify-between mb-4">
              <span class="font-display text-4xl text-charcoal">€{{ product.price }}</span>
              <span
                v-if="product.badge"
                class="text-[10px] tracking-widest uppercase font-body px-2 py-1 rounded-full bg-accent text-cream"
              >{{ product.badge }}</span>
            </div>
            <button
              @click="$emit('add-to-cart', product); $emit('close')"
              class="w-full bg-charcoal text-cream font-body text-xs tracking-widest uppercase py-4 hover:bg-accent transition-colors duration-200 rounded"
            >Add to Bag</button>
          </div>

        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  product: { type: Object, default: null },
})
defineEmits(['close', 'add-to-cart'])
</script>