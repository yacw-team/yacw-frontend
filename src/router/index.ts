import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomePage/HomePage.vue"),
    },
    {
      path: "/translate",
      name: "translate",
      component: () => import("@/views/Translate/TranslateView.vue"),
    },
    {
      path: "/chat",
      name: "chatHomePage",
      component: () => import("@/views/Chat/ChatHomePage.vue"),
    },
    {
      path: "/chat/:id",
      name: "chat",
      component: () => import("@/views/Chat/ChatView.vue"),
    }
  ],
});

export default router;
