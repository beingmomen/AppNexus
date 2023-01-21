import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

// Layouts
import defaultLayout from "../layouts/default.vue";
import authLayout from "../layouts/auth.vue";

// Pages
import HomeView from "../pages/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: defaultLayout,
        isAuth: true,
      },
    },
    {
      path: "/admins",
      name: "admins",
      component: () => import("@/pages/admins/index.vue"),
      meta: {
        layout: defaultLayout,
        isAuth: true,
      },
    },
    {
      path: "/apps",
      name: "apps",
      component: () => import("@/pages/apps/index.vue"),
      meta: {
        layout: defaultLayout,
        isAuth: true,
      },
    },
    {
      path: "/auto-update",
      name: "auto-update",
      component: () => import("@/pages/auto-update/index.vue"),
      meta: {
        layout: defaultLayout,
        isAuth: true,
      },
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("@/pages/categories/index.vue"),
      meta: {
        layout: defaultLayout,
        isAuth: true,
      },
    },
    // {
    //   path: "/categories/:id",
    //   name: "categories",
    //   component: () => import("@/pages/categories/update/index.vue"),
    //   meta: {
    //     layout: defaultLayout,
    //     isAuth: true,
    //   },
    //   children: [
    //     {
    //       path: "/",
    //       name: "update-category",
    //       component: () => import("@/pages/categories/update/index.vue"),
    //       meta: {
    //         layout: defaultLayout,
    //         isAuth: true,
    //       },
    //     },
    //   ],
    // },

    // Auth Routes
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../pages/auth/login/index.vue"),
      meta: {
        layout: authLayout,
        isAuth: false,
      },
    },
    {
      path: "/auth/register",
      name: "register",
      component: () => import("../pages/auth/register/index.vue"),
      meta: {
        layout: authLayout,
        isAuth: false,
      },
    },
  ],
});

router.beforeEach(function (to, from, next) {
  if (to.meta.isAuth && !store.getters["auth/isAuth"]) {
    next("/auth/login");
  } else if (!to.meta.isAuth && store.getters["auth/isAuth"]) {
    next("/");
  } else {
    next();
  }
});

export default router;
