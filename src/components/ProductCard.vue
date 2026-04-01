<template>
  <article
    :class="['product-card group cursor-pointer', viewMode === 'list' ? 'flex gap-6 items-center p-4' : '']"
    @click="$emit('open', product)"
  >
    <div
      :class="[
        'overflow-hidden flex items-center justify-center relative bg-white/40',
        viewMode === 'grid' ? 'h-64' : 'w-32 h-32 rounded-2xl flex-shrink-0'
      ]"
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
        :class="viewMode === 'list' ? 'text-3xl' : 'text-6xl'"
      >{{ product.emoji }}</span>

      <span
        v-if="product.badge"
        class="absolute top-3 left-3 text-[10px] tracking-[0.35em] uppercase font-body px-3 py-1 rounded-full bg-black/70 text-white"
      >{{ product.badge }}</span>
    </div>

    <div :class="viewMode === 'grid' ? 'p-5 space-y-3' : 'flex-1 min-w-0 space-y-2'">
      <div>
        <p class="text-[10px] tracking-[0.35em] uppercase text-muted font-body mb-1">{{ product.category }}</p>
        <h3 class="font-display text-xl text-charcoal leading-tight">{{ product.name }}</h3>
        <p v-if="viewMode === 'list'" class="text-xs text-muted font-body line-clamp-2 mt-1">{{ product.description }}</p>
      </div>

      <div class="flex flex-wrap gap-2 text-[9px] uppercase tracking-[0.35em] text-muted">
        <span class="px-3 py-0.5 rounded-full border border-border bg-white/80 text-charcoal">{{ product.gender }}</span>
        <span
          v-for="tag in displayTags.slice(0, 2)"
          :key="tag"
          class="px-3 py-0.5 rounded-full border border-border bg-white/60"
        >{{ tag }}</span>
      </div>

      <div class="flex items-center gap-1 text-[11px] text-muted">
        <span
          v-for="i in 5"
          :key="i"
          :class="i <= product.rating ? 'text-accent' : 'text-border'"
        >★</span>
        <span>({{ product.reviews }})</span>
      </div>

      <div class="flex items-center justify-between gap-4">
        <div>
          <span class="font-display text-2xl">€{{ product.price }}</span>
          <p class="text-[11px] uppercase tracking-[0.3em] text-muted">Incl. duties</p>
        </div>
        <button
          type="button"
          @click.stop="$emit('add-to-cart', product)"
          :class="['btn-cart text-[10px] tracking-[0.35em] uppercase font-body px-4 py-2',
                   inCart ? 'bg-charcoal text-cream' : 'bg-transparent text-charcoal']"
        >{{ inCart ? 'Added' : 'Add to bag' }}</button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product:  { type: Object,  required: true },
  viewMode: { type: String,  default: 'grid' },
  inCart:   { type: Boolean, default: false },
})

const displayTags = computed(() => {
  const genderTag = String(props.product?.gender || '').trim().toLowerCase()
  const unique = new Set()

  for (const rawTag of props.product?.tags || []) {
    const normalized = String(rawTag || '').trim().toLowerCase()
    if (!normalized || normalized === genderTag || unique.has(normalized)) continue
    unique.add(normalized)
  }

  return Array.from(unique)
})

defineEmits(['open', 'add-to-cart'])
</script>