<template>
  <section class="min-h-screen flex items-center justify-center bg-blue-50 py-12">
    <div class="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
      <h2 class="text-3xl font-bold text-blue-600 mb-6 text-center">Welcome Back 👋</h2>

      <p v-if="error" class="text-red-500 text-sm mb-4 text-center">{{ error }}</p>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <input v-model="email" placeholder="Email Address" type="email" class="w-full px-4 py-2 border rounded-lg"/>
        <input v-model="password" placeholder="Password" type="password" class="w-full px-4 py-2 border rounded-lg"/>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg">Log In</button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        Don't have an account?
        <router-link to="/auth/signup" class="text-blue-600 hover:underline">Sign Up</router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "../../composables/useToast";
import { login as doLogin } from "../../composables/useAuth";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const { showToast } = useToast();

function onSubmit() {
  error.value = "";
  if (!email.value || !password.value) {
    error.value = "Please enter both email and password.";
    showToast(error.value, "error");
    return;
  }
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email.value && u.password === password.value);
  if (!user) {
    error.value = "Invalid email or password.";
    showToast(error.value, "error");
    return;
  }
  doLogin(user); // stores ticketapp_session
  showToast(`Welcome back, ${user.name}!`, "success");
  router.push("/dashboard");
}
</script>
