<template>
  <div
    :class="['product-card bg-white rounded-lg overflow-hidden cursor-pointer',
             viewMode === 'list' ? 'flex gap-4 items-center p-4' : '']"
    @click="$emit('open', product)"
  >
    <!-- Image / emoji -->
    <div
      :class="['overflow-hidden flex items-center justify-center relative',
               viewMode === 'grid' ? 'h-52' : 'w-28 h-28 rounded-lg flex-shrink-0']"
      :style="{ background: product.bg }"
    >
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="product-img w-full h-full object-cover"
      />
      <span
        v-else
        class="product-img select-none"
        :class="viewMode === 'list' ? 'text-3xl' : 'text-5xl'"
      >{{ product.emoji }}</span>

      <span
        v-if="product.badge"
        class="absolute top-2 left-2 text-[10px] tracking-widest uppercase font-body px-2 py-0.5 rounded-full"
        :class="product.badge === 'New' ? 'bg-charcoal text-cream' : 'bg-accent text-cream'"
      >{{ product.badge }}</span>
    </div>

    <!-- Card body -->
    <div :class="viewMode === 'grid' ? 'p-4' : 'flex-1 min-w-0'">
      <p class="text-[10px] tracking-[0.15em] uppercase text-muted font-body mb-0.5">{{ product.category }}</p>
      <h3 class="font-display text-base text-charcoal leading-tight mb-1 truncate">{{ product.name }}</h3>
      <p v-if="viewMode === 'list'" class="text-xs text-muted font-body mb-2 line-clamp-2">{{ product.description }}</p>

      <!-- Stars -->
      <div class="flex items-center gap-1 mb-2">
        <span
          v-for="i in 5" :key="i"
          class="text-[10px]"
          :class="i <= product.rating ? 'text-accent' : 'text-border'"
        >★</span>
        <span class="text-[10px] text-muted font-body">({{ product.reviews }})</span>
      </div>

      <div class="flex items-center justify-between gap-2">
        <span class="font-display text-lg text-charcoal">€{{ product.price }}</span>
        <button
          @click.stop="$emit('add-to-cart', product)"
          :class="['btn-cart text-[10px] tracking-widest uppercase font-body border px-3 py-1.5 rounded transition-colors',
                   inCart
                     ? 'bg-accent text-cream border-accent'
                     : 'border-charcoal text-charcoal bg-transparent']"
        >{{ inCart ? '✓ Added' : 'Add' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product:  { type: Object,  required: true },
  viewMode: { type: String,  default: 'grid' },
  inCart:   { type: Boolean, default: false },
})
defineEmits(['open', 'add-to-cart'])
</script>