import { createWebHashHistory, createRouter } from "vue-router";
import methodMonte_Carlo from "../views/methodMonte_Carlo.vue";

const routes = [
  {
    path: "/",
    name: "methodMonte_Carlo",
    component: methodMonte_Carlo,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
