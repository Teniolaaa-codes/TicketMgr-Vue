<template>
  <section class="min-h-screen flex items-center justify-center bg-blue-50 py-12">
    <div class="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
      <h2 class="text-3xl font-bold text-blue-600 mb-6 text-center">Create an Account</h2>

      <p v-if="error" class="text-red-500 text-sm mb-4 text-center">{{ error }}</p>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <input v-model="name" placeholder="Full Name" class="w-full px-4 py-2 border rounded-lg"/>
        <input v-model="email" placeholder="Email Address" type="email" class="w-full px-4 py-2 border rounded-lg"/>
        <input v-model="password" placeholder="Password (min 6 chars)" type="password" class="w-full px-4 py-2 border rounded-lg"/>
        <input v-model="confirmPassword" placeholder="Confirm Password" type="password" class="w-full px-4 py-2 border rounded-lg"/>

        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg">Sign Up</button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        Already have an account?
        <router-link to="/auth/login" class="text-blue-600 hover:underline">Log In</router-link>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "../../composables/useToast";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");
const router = useRouter();
const { showToast } = useToast();

function onSubmit() {
  error.value = "";
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = "All fields are required.";
    return;
  }
  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }
  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find((u) => u.email === email.value)) {
    error.value = "User already exists. Please log in instead.";
    return;
  }
  users.push({ name: name.value, email: email.value, password: password.value });
  localStorage.setItem("users", JSON.stringify(users));
  showToast("Signup successful! Please log in.", "success");
  router.push("/auth/login");
}
</script>
