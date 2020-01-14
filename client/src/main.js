import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import AuthService from "./AuthService";

// Vue.config.productionTip = false

async function init() {
  // console.log(router.currentRoute.path);

  let user = await AuthService.Authenticate();
  if (user) {
    store.commit("setUser", user);
    // } else if (1 == 1) {
    // router.push({ name: "login" });
    // console.log("HELLOOOOO");
    // console.log(router.currentRoute);
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
