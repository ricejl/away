import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Trip from "../views/Trip.vue";
import Profile from "../views/Profile.vue";
import Account from "../views/Account.vue";
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
    path: "/account",
    name: "account",
    component: Account
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
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
