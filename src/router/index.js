import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/auth/Login.vue";
import Signup from "../pages/auth/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import Tickets from "../pages/TicketMan.vue";
import About from "../pages/About.vue";
import { isAuthenticated } from "../composables/useAuth";

// routes
const routes = [
  { path: "/", name: "Home", component: Home },
  {
  path: "/about",
  name: "About",
  component: About,
},
  { path: "/auth/login", name: "Login", component: Login },
  { path: "/auth/signup", name: "Signup", component: Signup },
  // Protected routes
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    name: "Tickets",
    component: Tickets,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// redirect unauthenticated users to /auth/login
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { path: "/auth/login" };
  }
});

export default router;
