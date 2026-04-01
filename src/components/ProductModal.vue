<template>
  <Transition name="fade">
    <div v-if="product" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeModal">

      <!-- Backdrop -->
      <div @click="closeModal" class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <!-- Modal -->
      <div class="relative glass-panel bg-white rounded-3xl overflow-hidden max-w-3xl w-full flex flex-col md:flex-row slide-down max-h-[90vh]">

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

          <button @click="closeModal" class="absolute top-4 right-4 text-muted hover:text-charcoal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <p class="text-[10px] tracking-[0.35em] uppercase text-muted font-body mb-1">{{ product.category }}</p>
          <h2 class="font-display text-4xl text-charcoal mb-1 leading-tight">{{ product.name }}</h2>

          <div class="flex items-center gap-1.5 mb-4 text-[11px] text-muted">
            <span
              v-for="i in 5" :key="i"
              :class="i <= product.rating ? 'text-accent' : 'text-border'"
            >★</span>
            <span class="text-xs text-muted font-body">{{ product.reviews }} reviews</span>
          </div>

          <p class="text-sm font-body text-muted leading-relaxed mb-4">{{ product.description }}</p>

          <div class="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.35em] text-muted mb-6">
            <span class="px-3 py-1 rounded-full border border-border bg-white/80 text-charcoal">{{ product.gender }}</span>
            <span
              v-for="tag in displayTags"
              :key="tag"
              class="px-3 py-1 rounded-full border border-border"
            >{{ tag }}</span>
          </div>

          <div class="border-t border-border/60 pt-6 mt-auto space-y-6">
            <!-- Sizes -->
            <div>
              <p class="text-[10px] tracking-[0.35em] uppercase text-muted mb-2">Size</p>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="s in sizes"
                  :key="s"
                  @click="selectSize(s)"
                  :disabled="!product.sizes || !product.sizes.includes(s)"
                  :class="[
                    'px-4 py-1.5 rounded-full text-xs border transition-colors',
                    currentSize === s ? 'bg-charcoal text-cream' : 'bg-white text-charcoal',
                    (!product.sizes || !product.sizes.includes(s)) ? 'opacity-40 cursor-not-allowed' : 'hover:bg-border'
                  ]"
                >{{ s }}</button>
              </div>
            </div>
            <!-- Colours -->
            <div v-if="product">
              <p class="text-[10px] tracking-[0.35em] uppercase text-muted mb-2">Colour</p>
              <div class="flex gap-2 items-center">
                <button
                  v-for="c in product.availableColors ? product.availableColors : [product.color]"
                  :key="c"
                  @click="selectColor(c)"
                  :class="[
                    'w-8 h-8 rounded-full border-2 transition-all',
                    currentColor === c ? 'border-charcoal scale-110' : 'border-transparent'
                  ]"
                  :style="{ background: (getColorHex(c) || '#fff') }"
                ></button>
              </div>
            </div>
            <div class="flex items-end justify-between">
              <div>
                <span class="font-display text-4xl">€{{ product.price }}</span>
                <p class="text-[11px] uppercase tracking-[0.35em] text-muted">Worldwide shipping</p>
              </div>
              <span
                v-if="product.badge"
                class="text-[10px] tracking-widest uppercase font-body px-2 py-1 rounded-full bg-accent text-cream"
              >{{ product.badge }}</span>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                @click="closeModal"
                class="w-full border border-border bg-white text-charcoal font-body text-[11px] tracking-[0.35em] uppercase py-4 hover:bg-border transition-colors duration-200 rounded-full"
              >Close</button>
              <button
                @click="onAddToCart"
                :disabled="(product.sizes && product.sizes.length > 0 && !currentSize)"
                class="w-full bg-charcoal text-cream font-body text-[11px] tracking-[0.35em] uppercase py-4 hover:bg-accent transition-colors duration-200 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >Add to bag</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  product: { type: Object, default: null },
  sizes:   { type: Array,  default: () => [] },
  colors:  { type: Array,  default: () => [] },
  selectedSize:  { type: String, default: '' },
  selectedColor: { type: String, default: '' },
})
const emit = defineEmits(['close', 'add-to-cart', 'update:selectedSize', 'update:selectedColor'])

import { ref } from 'vue'
// local fallbacks not used when parent provides v-models
const localSize = ref('')
const localColor = ref('')

import { computed, onMounted, onBeforeUnmount } from 'vue'

const currentSize = computed(() => {
  return (typeof props.selectedSize !== 'undefined' && props.selectedSize !== '') ? props.selectedSize : localSize.value
})

const currentColor = computed(() => {
  return (typeof props.selectedColor !== 'undefined' && props.selectedColor !== '') ? props.selectedColor : localColor.value
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

function getPropSize() {
  return typeof props.selectedSize !== 'undefined' ? props.selectedSize : localSize.value
}

function getPropColor() {
  return typeof props.selectedColor !== 'undefined' ? props.selectedColor : localColor.value
}

function selectSize(s) {
  if (!props.product || !props.product.sizes || !props.product.sizes.includes(s)) return
  const next = currentSize.value === s ? '' : s
  emit('update:selectedSize', next)
  localSize.value = next
}

function selectColor(c) {
  const allowed = props.product && (props.product.availableColors ? props.product.availableColors.includes(c) : props.product.color === c)
  if (!allowed) return
  const next = currentColor.value === c ? '' : c
  emit('update:selectedColor', next)
  localColor.value = next
}

function getColorHex(name) {
  const list = props.colors || []
  const found = list.find(x => x.name === name)
  return found ? found.hex : null
}

function onAddToCart() {
  const size = currentSize.value || null
  const color = currentColor.value || (props.product && props.product.color ? props.product.color : null)
  const options = { size, color }
  emit('add-to-cart', { product: props.product, options })
  emit('close')
}

function closeModal() {
  emit('close')
}

function onKeydown(event) {
  if (event.key === 'Escape' && props.product) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>