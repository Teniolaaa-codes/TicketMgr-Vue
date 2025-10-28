<template>
  <nav class="bg-white shadow-md fixed top-0 left-0 w-full z-50">
    <div class="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/" class="text-xl font-bold text-blue-600">TicketMgr</RouterLink>

      <!-- Desktop Links -->
      <div class="hidden md:flex space-x-6 items-center">
        <RouterLink to="/" class=" text-gray-700 transition hover:text-blue-500 font-medium">Home</RouterLink>
        <RouterLink to="/about" class="text-gray-700 transition hover:text-blue-500 font-medium">About</RouterLink>
        <RouterLink to="/dashboard" class="text-gray-700 transition hover:text-blue-500 font-medium">Dashboard</RouterLink>

        <!-- Divider -->
        <div class="h-6 w-px border-l border-gray-300"></div>

        <!-- Conditional Auth Buttons -->
        <template v-if="loggedInUser">
          <button
            @click="handleLogout"
            class="px-4 py-2 bg-red-500 text-white rounded-lg font-medium 
                   shadow-md transition-all duration-300 
                   hover:bg-red-600 hover:shadow-lg hover:scale-[1.03]"
          >
            Log Out
          </button>
        </template>
        <template v-else>
          <RouterLink
            to="/auth/login"
            class="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg font-medium 
                   hover:bg-blue-600 hover:text-white hover:shadow-md 
                   transition-all duration-300"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/auth/signup"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md 
                   hover:bg-blue-700 hover:shadow-lg hover:scale-[1.03] 
                   transition-all duration-300"
          >
            Sign Up
          </RouterLink>
        </template>
      </div>

      <!-- Hamburger Button -->
      <button @click="toggleMenu" class="md:hidden text-blue-600 text-3xl focus:outline-none">
        <span v-if="!isOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div
      class="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
      :class="isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="flex flex-col items-center py-4 space-y-3 bg-white/95 backdrop-blur-md shadow-md">
        <RouterLink @click="closeMenu" to="/" class="block text-gray-700 hover:text-blue-600 font-medium">
          Home
        </RouterLink>
        <RouterLink @click="closeMenu" to="/about" class="block text-gray-700 hover:text-blue-600 font-medium">
          About
        </RouterLink>
        <RouterLink @click="closeMenu" to="/dashboard" class="block text-gray-700 hover:text-blue-600 font-medium">
          Dashboard
        </RouterLink>

        <hr class="border-gray-200 w-3/4 mx-auto" />

        <!-- Auth Buttons (Mobile) -->
        <template v-if="loggedInUser">
          <button
            @click="() => { handleLogout(); closeMenu(); }"
            class="w-3/4 px-4 py-2 bg-red-500 text-white rounded-lg font-medium 
                   shadow-md transition-all duration-300 
                   hover:bg-red-600 hover:shadow-lg hover:scale-[1.03]"
          >
            Log Out
          </button>
        </template>
        <template v-else>
          <RouterLink
            @click="closeMenu"
            to="/auth/login"
            class="w-3/4 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg text-center 
                   font-medium transition-all duration-300 
                   hover:bg-blue-600 hover:text-white hover:shadow-md"
          >
            Login
          </RouterLink>
          <RouterLink
            @click="closeMenu"
            to="/auth/signup"
            class="w-3/4 px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-medium 
                   shadow-md transition-all duration-300 
                   hover:bg-blue-700 hover:shadow-lg hover:scale-[1.03]"
          >
            Sign Up
          </RouterLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "../composables/useToast"
// State
const isOpen = ref(false);
const loggedInUser = ref(null);

// Router and toast hooks
const router = useRouter();
const route = useRoute();
const { showToast } = useToast();

// Functions
const toggleMenu = () => (isOpen.value = !isOpen.value);
const closeMenu = () => (isOpen.value = false);

// Load session whenever route changes
const loadSession = () => {
  const session = JSON.parse(localStorage.getItem("ticketapp_session"));
  loggedInUser.value = session;
};

// Lifecycle and watch
onMounted(loadSession);
watch(() => route.fullPath, loadSession);

// Logout
const handleLogout = () => {
  localStorage.removeItem("ticketapp_session");
  showToast("You've been logged out.", "info");
  router.push("/");
};
</script>
