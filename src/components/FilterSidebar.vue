<template>
  <aside :class="['sidebar-scroll flex-shrink-0 w-56 font-body text-sm', open ? 'block' : 'hidden lg:block']">

    <!-- Category -->
    <div class="mb-8">
      <p class="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">Category</p>
      <div class="space-y-1">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="$emit('update:selectedCategory', cat)"
          :class="['block w-full text-left px-3 py-2 rounded text-xs tracking-wide filter-chip',
                   selectedCategory === cat ? 'active' : 'text-charcoal']"
        >{{ cat }}</button>
      </div>
    </div>

    <!-- Price range -->
    <div class="mb-8">
      <p class="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">Price Range</p>
      <input
        type="range"
        :value="maxPrice"
        @input="$emit('update:maxPrice', Number($event.target.value))"
        min="0" max="1000" step="10"
        class="w-full mb-2"
      />
      <div class="flex justify-between text-xs text-muted">
        <span>€0</span>
        <span class="text-charcoal font-medium">€{{ maxPrice }}</span>
      </div>
    </div>

    <!-- Sort -->
    <div class="mb-8">
      <p class="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">Sort By</p>
      <div class="space-y-1">
        <button
          v-for="s in sortOptions"
          :key="s.value"
          @click="$emit('update:sortBy', s.value)"
          :class="['block w-full text-left px-3 py-2 rounded text-xs tracking-wide filter-chip',
                   sortBy === s.value ? 'active' : 'text-charcoal']"
        >{{ s.label }}</button>
      </div>
    </div>

    <!-- Colour swatches -->
    <div class="mb-8">
      <p class="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">Colour</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in colors"
          :key="color.name"
          @click="$emit('toggle-color', color.name)"
          :title="color.name"
          :class="['w-6 h-6 rounded-full border-2 transition-all',
                   selectedColors.includes(color.name) ? 'border-charcoal scale-110' : 'border-transparent']"
          :style="{ background: color.hex }"
        ></button>
      </div>

        <!-- Sizes -->
        <div class="mb-8">
          <p class="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">Size</p>
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
    </div>

    <button
      @click="$emit('clear')"
      class="text-xs tracking-widest uppercase text-muted hover:text-charcoal underline underline-offset-4 transition-colors"
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