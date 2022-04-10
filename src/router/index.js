import { createWebHashHistory, createRouter } from "vue-router";
import methodMonte_Carlo from "../views/methodMonte_Carlo.vue";
import methodSimulatedAnnealing from "../views/methodSimulatedAnnealing.vue";
import methodGenetic from "../views/methodGenetic.vue";
import methodInterval from "../views/methodInterval.vue";

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
  {
    path: "/methodgenetic",
    name: "methodGenetic",
    component: methodGenetic,
  },
  {
    path: "/methodinterval",
    name: "methodInterval",
    component: methodInterval,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
