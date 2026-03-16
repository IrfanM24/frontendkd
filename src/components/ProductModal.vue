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
            <!-- Sizes -->
            <div class="mb-4">
              <p class="text-[10px] tracking-[0.2em] uppercase text-muted mb-2">Size</p>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="s in sizes"
                  :key="s"
                  @click="selectSize(s)"
                  :disabled="!product.sizes || !product.sizes.includes(s)"
                  :class="[
                    'px-3 py-1 rounded text-xs border transition-colors',
                    currentSize === s ? 'bg-charcoal text-cream' : 'bg-white text-charcoal',
                    (!product.sizes || !product.sizes.includes(s)) ? 'opacity-40 cursor-not-allowed' : 'hover:bg-border'
                  ]"
                >{{ s }}</button>
              </div>
            </div>
            <!-- Colours -->
            <div v-if="product" class="mb-4">
              <p class="text-[10px] tracking-[0.2em] uppercase text-muted mb-2">Colour</p>
              <div class="flex gap-2 items-center">
                <button
                  v-for="c in product.availableColors ? product.availableColors : [product.color]"
                  :key="c"
                  @click="selectColor(c)"
                  :class="[
                    'w-7 h-7 rounded-full border-2 transition-all',
                    currentColor === c ? 'border-charcoal scale-110' : 'border-transparent'
                  ]"
                  :style="{ background: (getColorHex(c) || '#fff') }"
                ></button>
              </div>
            </div>
            <div class="flex items-end justify-between mb-4">
              <span class="font-display text-4xl text-charcoal">€{{ product.price }}</span>
              <span
                v-if="product.badge"
                class="text-[10px] tracking-widest uppercase font-body px-2 py-1 rounded-full bg-accent text-cream"
              >{{ product.badge }}</span>
            </div>
            <button
              @click="onAddToCart"
              :disabled="(product.sizes && product.sizes.length > 0 && !currentSize)"
              class="w-full bg-charcoal text-cream font-body text-xs tracking-widest uppercase py-4 hover:bg-accent transition-colors duration-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >Add to Bag</button>
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

import { computed } from 'vue'

const currentSize = computed(() => {
  return (typeof props.selectedSize !== 'undefined' && props.selectedSize !== '') ? props.selectedSize : localSize.value
})

const currentColor = computed(() => {
  return (typeof props.selectedColor !== 'undefined' && props.selectedColor !== '') ? props.selectedColor : localColor.value
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
</script>