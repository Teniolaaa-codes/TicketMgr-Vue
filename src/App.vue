<template>
  <div>
    <Navbar />
    <Toast />
    <RouterView />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Toast from "./components/Toast.vue";
</script>

<style>
/* keep body background to match design */
body { background-color: #f8fafc; }
</style>
