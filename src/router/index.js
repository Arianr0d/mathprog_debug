import Vue from "vue";
import VueRouter from "vue-router";
import ClickOutside from "vue-click-outside";

Vue.use(VueRouter);
Vue.use(ClickOutside);

const routes = [
  {
    path: "/",
    name: "methodMonte_Carlo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/methodMonte_Carlo.vue"),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
