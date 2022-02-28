import { createWebHashHistory, createRouter } from "vue-router";
import methodMonte_Carlo from "../views/methodMonte_Carlo.vue";
import methodSimulatedAnnealing from "../views/methodSimulatedAnnealing.vue";

const routes = [
  {
    path: "/",
    name: "methodMonte_Carlo",
    component: methodMonte_Carlo,
  },
  {
    path: "/methodsimulatedannealing",
    name: "methodSimulatedAnnealing",
    component: methodSimulatedAnnealing,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
