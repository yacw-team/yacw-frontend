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
    },
    {
      path: "/game",
      name: "game",
      component: () => import("@/views/Game/gamePage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/Error/404NotFound.vue"),
    }
  ],
});

export default router;
