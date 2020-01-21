import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
require("dotenv").config();

// console.log("api key from main.js ", process.env.VUE_APP_GOOGLE_MAPS_API_KEY);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places" // necessary for places input
  }
});

import AuthService from "./AuthService";

// Vue.config.productionTip = false

async function init() {
  let user = await AuthService.Authenticate();
  if (user) {
    store.commit("setUser", user);
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
// console.log("currentRoute from main.js:", router.currentRoute);

store.dispatch("initalizeSocket");
