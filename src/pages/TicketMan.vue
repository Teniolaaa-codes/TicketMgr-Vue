<template>
  <section class="min-h-screen bg-blue-50 py-12">
    <div class="max-w-1440 mx-auto px-6">
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 mt-12">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-blue-700">Ticket Management</h1>
            <p class="text-gray-600">Create, view, edit, and delete your support tickets.</p>
          </div>
          <router-link to="/dashboard" class="text-sm md:text-base text-gray-700 hover:text-blue-600">← Back to Dashboard</router-link>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 class="text-lg font-semibold mb-4">{{ editingId ? "Edit Ticket" : "Create Ticket" }}</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title <span class="text-red-500">*</span></label>
            <input v-model="form.title" name="title" class="mt-1 w-full px-4 py-2 border rounded-md" :class="errors.title ? 'border-red-400' : 'border-gray-200'"/>
            <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Status <span class="text-red-500">*</span></label>
            <select v-model="form.status" name="status" class="mt-1 w-full px-4 py-2 border rounded-md" :class="errors.status ? 'border-red-400':'border-gray-200'">
              <option v-for="s in STATUS_OPTIONS" :key="s" :value="s">{{ s.replace('_',' ') }}</option>
            </select>
            <p v-if="errors.status" class="text-red-500 text-sm mt-1">{{ errors.status }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="form.description" rows="4" class="mt-1 w-full px-4 py-2 border rounded-md" :class="errors.description ? 'border-red-400':'border-gray-200'"></textarea>
            <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
          </div>

          <div class="flex gap-3">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg">{{ editingId ? "Update Ticket" : "Create Ticket" }}</button>
            <button v-if="editingId" type="button" @click="cancelEdit" class="px-4 py-2 border rounded-lg">Cancel</button>
          </div>
        </form>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-if="tickets.length === 0" class="bg-white rounded-2xl shadow p-6 text-center">
          <p class="text-gray-600">You have no tickets yet. Create your first ticket above.</p>
        </div>

        <article v-for="t in sortedTickets" :key="t.id" class="bg-white rounded-2xl shadow p-6 relative">
          <div class="flex justify-between items-start gap-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-800">{{ t.title }}</h3>
              <p class="text-sm text-gray-500 mt-2" v-html="t.description || '<em class=&#34;text-gray-400&#34;>No description</em>'"></p>
              <div class="mt-3 flex items-center gap-3">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', statusBadge(t.status)]">{{ t.status.replace('_',' ') }}</span>
                <span class="text-xs text-gray-400">Created: {{ new Date(t.createdAt).toLocaleString() }}</span>
              </div>
            </div>

            <div class="flex flex-col items-end gap-2">
              <button @click="startEdit(t)" class="text-sm text-blue-600 hover:underline" :aria-label="`Edit ticket ${t.title}`">Edit</button>
              <button @click="handleDelete(t.id)" class="text-sm text-red-600 hover:underline" :aria-label="`Delete ticket ${t.title}`">Delete</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "../composables/useToast";
import { getUser } from "../composables/useAuth";

const STATUS_OPTIONS = ["open", "in_progress", "closed"]; // required

const user = getUser();
const tickets = ref([]);
const form = ref({ title: "", description: "", status: "open" });
const errors = ref({});
const editingId = ref(null);
const { showToast } = useToast();

onMounted(() => {
  const all = JSON.parse(localStorage.getItem("tickets") || "[]");
  tickets.value = all.filter(t => t.createdBy === user?.email);
});

function validate() {
  const e = {};
  if (!form.value.title || !form.value.title.trim()) e.title = "Title is required.";
  if (!form.value.status || !STATUS_OPTIONS.includes(form.value.status)) e.status = `Status must be one of: ${STATUS_OPTIONS.join(", ")}`;
  if (form.value.description && form.value.description.length > 1000) e.description = "Description is too long (max 1000 chars).";
  errors.value = e;
  return Object.keys(e).length === 0;
}

function persistAll(updatedForUser) {
  const all = JSON.parse(localStorage.getItem("tickets") || "[]");
  const others = all.filter(t => t.createdBy !== user.email);
  const merged = [...others, ...updatedForUser];
  localStorage.setItem("tickets", JSON.stringify(merged));
}

function handleSubmit() {
  if (!validate()) { showToast("Please fix form errors.", "error"); return; }
  const now = new Date().toISOString();
  if (editingId.value) {
    const updated = tickets.value.map(t => t.id === editingId.value ? { ...t, ...form.value, updatedAt: now } : t);
    tickets.value = updated;
    persistAll(updated);
    showToast("Ticket updated.", "success");
    editingId.value = null;
  } else {
    const newTicket = {
      id: Date.now() + "-" + Math.floor(Math.random() * 10000),
      title: form.value.title.trim(),
      description: form.value.description?.trim() || "",
      status: form.value.status,
      createdBy: user.email,
      createdAt: now,
      updatedAt: now,
    };
    tickets.value = [newTicket, ...tickets.value];
    persistAll(tickets.value);
    showToast("Ticket created.", "success");
  }
  form.value = { title: "", description: "", status: "open" };
  errors.value = {};
}

function startEdit(t) {
  editingId.value = t.id;
  form.value = { title: t.title, description: t.description || "", status: t.status };
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelEdit() {
  editingId.value = null;
  form.value = { title: "", description: "", status: "open" };
  errors.value = {};
}

function handleDelete(id) {
  if (!confirm("Delete this ticket? This action cannot be undone.")) return;
  tickets.value = tickets.value.filter(t => t.id !== id);
  persistAll(tickets.value);
  showToast("Ticket deleted.", "success");
}

const statusBadge = (status) => {
  switch (status) {
    case "open": return "bg-green-100 text-green-800";
    case "in_progress": return "bg-amber-100 text-amber-800";
    case "closed": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const sortedTickets = computed(() => tickets.value.slice().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
</script>
