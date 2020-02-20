import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../views/Home.vue";
// @ts-ignore
import Login from "../views/Login.vue";
// @ts-ignore
import Dashboard from "../views/Dashboard.vue";
// @ts-ignore
import Trip from "../views/Trip.vue";
// @ts-ignore
import Profile from "../views/Profile.vue";
import store from "../store/index.js";
import NotificationService from "../NotificationService.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    // @ts-ignore
    beforeEnter: (to, from, next) => {
      if (store.state.user.hasProfile) {
        next();
      } else {
        NotificationService.errorMessage(
          "You must create a profile to access trips"
        );
        next({ path: "profile" });
      }
    }
  },
  {
    path: "/trip/:tripId",
    name: "trip",
    component: Trip
  }
];

const router = new VueRouter({
  routes
});

export default router;
