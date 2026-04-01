<template>
  <aside :class="['sidebar-scroll glass-panel flex-shrink-0 font-body text-sm p-6 space-y-8', open ? 'block' : 'hidden lg:block']">

    <!-- Category -->
    <div>
      <p class="text-[10px] tracking-[0.35em] uppercase text-muted mb-3">Category</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="$emit('update:selectedCategory', cat)"
          :class="['px-4 py-1.5 text-left text-[11px] tracking-[0.25em] filter-chip border border-border/60',
                   selectedCategory === cat ? 'active' : 'text-charcoal']"
        >{{ cat }}</button>
      </div>
    </div>

    <!-- Price range -->
    <div>
      <p class="text-[10px] tracking-[0.35em] uppercase text-muted mb-3">Price Range</p>
      <input
        type="range"
        :value="maxPrice"
        @input="$emit('update:maxPrice', Number($event.target.value))"
        min="0" max="1000" step="10"
        class="w-full mb-3"
      />
      <div class="flex justify-between text-xs text-muted">
        <span>€0</span>
        <span class="text-charcoal font-medium">€{{ maxPrice }}</span>
      </div>
    </div>

    <!-- Sort -->
    <div>
      <p class="text-[10px] tracking-[0.35em] uppercase text-muted mb-3">Sort By</p>
      <div class="space-y-2">
        <button
          v-for="s in sortOptions"
          :key="s.value"
          @click="$emit('update:sortBy', s.value)"
          :class="['w-full text-left px-3 py-2 rounded text-[11px] tracking-[0.2em] filter-chip border border-border/60',
                   sortBy === s.value ? 'active' : 'text-charcoal']"
        >{{ s.label }}</button>
      </div>
    </div>

    <!-- Colour swatches -->
    <div>
      <p class="text-[10px] tracking-[0.35em] uppercase text-muted mb-3">Colour</p>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="color in colors"
          :key="color.name"
          @click="$emit('toggle-color', color.name)"
          :title="color.name"
          :class="['w-7 h-7 rounded-full border-2 transition-all',
                   selectedColors.includes(color.name) ? 'border-charcoal scale-110' : 'border-transparent']"
          :style="{ background: color.hex }"
        ></button>
      </div>
    </div>

    <!-- Sizes -->
    <div>
      <p class="text-[10px] tracking-[0.35em] uppercase text-muted mb-3">Size</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="size in sizes"
          :key="size"
          @click="onSelectSize(size)"
          :disabled="availableSizes && !availableSizes.includes(size)"
          :class="[
            'px-3 py-1 rounded text-xs border transition-colors',
            selectedSize === size ? 'bg-charcoal text-cream' : 'bg-white text-charcoal',
            (availableSizes && !availableSizes.includes(size)) ? 'opacity-40 cursor-not-allowed' : 'hover:bg-border'
          ]"
        >{{ size }}</button>
      </div>
    </div>

    <button
      @click="$emit('clear')"
      class="text-[10px] tracking-[0.35em] uppercase text-muted hover:text-charcoal underline underline-offset-4 transition-colors"
    >Clear all filters</button>

  </aside>
</template>

<script setup>
defineProps({
  open:             { type: Boolean, required: true },
  categories:       { type: Array,   default: () => [] },
  colors:           { type: Array,   default: () => [] },
  sortOptions:      { type: Array,   default: () => [] },
  selectedCategory: { type: String,  default: 'All' },
  maxPrice:         { type: Number,  default: 1000 },
  sortBy:           { type: String,  default: 'featured' },
  selectedColors:   { type: Array,   default: () => [] },
  sizes:            { type: Array,   default: () => ['XS','S','M','L','XL'] },
  selectedSize:     { type: String,  default: '' },
  availableSizes:   { type: Array,   default: () => [] },
})
const emit = defineEmits([
  'update:selectedCategory',
  'update:maxPrice',
  'update:sortBy',
  'toggle-color',
  'update:selectedSize',
  'clear',
])

function onSelectSize(size) {
  if (Array.isArray(availableSizes) && availableSizes.length > 0 && !availableSizes.includes(size)) return
  const next = selectedSize === size ? '' : size
  emit('update:selectedSize', next)
}
</script>