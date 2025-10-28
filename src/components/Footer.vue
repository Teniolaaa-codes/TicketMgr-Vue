<template>
  <footer class="relative text-gray-700 pt-16 pb-0 overflow-hidden">
    <!-- Gradient fade -->
    <div class="absolute top-0 left-0 w-full h-40 bg-blue-50 bg-opacity-90 z-0"></div>

    <!-- Footer container -->
    <div class="relative bg-blue-100 border-t border-blue-300 z-10">
      <div class="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 py-10">
        
        <!-- Brand name and catchphrase -->
        <div>
          <h2 class="text-5xl font-bold text-blue-700 mb-3">TicketMgr</h2>
          <p class="text-gray-600 leading-relaxed">
            Empowering teams to manage customer support efficiently and intuitively.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold text-blue-700 mb-3">Quick Links</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="hover:text-blue-600">Home</router-link></li>
            <li><router-link to="/dashboard" class="hover:text-blue-600">Dashboard</router-link></li>
            <li><router-link to="/about" class="hover:text-blue-600">About</router-link></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold text-blue-700 mb-3">Contact us</h3>
          <p class="text-gray-600">support@ticketmgr.com</p>
          <p class="text-gray-600">+1 (555) 123-4567</p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="text-center text-gray-500 text-sm mt-10 border-t border-blue-300 pt-5 pb-0">
        © 2025 TicketMgr — All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
