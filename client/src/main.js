import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

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
// store.dispatch("initalizeSocket");
