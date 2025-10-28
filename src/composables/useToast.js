import { reactive } from "vue";

const state = reactive({
  toasts: [], 
});

export function useToast() {
  function showToast(message, type = "info") {
    const id = Date.now() + Math.random();
    state.toasts.push({ id, message, type });
    setTimeout(() => {
      const idx = state.toasts.findIndex((t) => t.id === id);
      if (idx !== -1) state.toasts.splice(idx, 1);
    }, 3500);
  }
  return { toasts: state.toasts, showToast };
}
