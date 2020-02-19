import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/index";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
require("dotenv").config();

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAa1YgIktAEVQGkyUCNgrDGkzLchDssUII",
    libraries: "places" // necessary for places input
  }
});

import AuthService from "./AuthService";

async function init() {
  let userData = await AuthService.Authenticate();
  if (userData) {
    store.commit("setUser", userData.user);
    store.commit("setResource", {
      resource: "profile",
      data: userData.profile
    });
  } else {
    router.push({ name: "home" });
  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
init();

store.dispatch("initalizeSocket");
