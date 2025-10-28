<template>
  <section class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="max-w-1440 mx-auto px-6">
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-blue-600">Dashboard Overview</h1>
        </div>

        <p class="text-gray-700 mb-8">Welcome back, <span class="font-semibold">{{ user?.name }}</span> 👋</p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div class="bg-blue-100 p-6 rounded-xl text-center shadow">
            <h3 class="text-lg font-semibold">Total Tickets</h3>
            <p class="text-3xl font-bold text-blue-700">{{ stats.total }}</p>
          </div>
          <div class="bg-yellow-100 p-6 rounded-xl text-center shadow">
            <h3 class="text-lg font-semibold">Open Tickets</h3>
            <p class="text-3xl font-bold text-yellow-600">{{ stats.open }}</p>
          </div>
          <div class="bg-green-100 p-6 rounded-xl text-center shadow">
            <h3 class="text-lg font-semibold">Resolved Tickets</h3>
            <p class="text-3xl font-bold text-green-600">{{ stats.resolved }}</p>
          </div>
        </div>

        <div class="text-center">
          <router-link to="/tickets" class="px-6 py-3 bg-blue-600 text-white rounded-lg">Manage Tickets</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUser } from "../composables/useAuth";

const user = getUser();
const stats = ref({ total: 0, open: 0, resolved: 0 });

onMounted(() => {
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");
  const userTickets = tickets.filter((t) => t.createdBy === user?.email);
  stats.value.total = userTickets.length;
  stats.value.open = userTickets.filter(t => t.status === "open").length;
  stats.value.resolved = userTickets.filter(t => t.status === "closed").length;
});
</script>
