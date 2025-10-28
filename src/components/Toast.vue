<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <div
      v-for="t in toasts"
      :key="t.id"
      class="px-4 py-2 rounded shadow text-sm"
      :class="{
        'bg-green-100 text-green-800': t.type === 'success',
        'bg-red-100 text-red-800': t.type === 'error',
        'bg-blue-100 text-blue-800': t.type === 'info'
      }"
    >
      {{ t.message }}
    </div>
  </div>
</template>

<script setup>
import { useToast } from "../composables/useToast";
const { toasts } = useToast();
</script>
