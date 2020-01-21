import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/index";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
//import Geocoder from "@pderas/vue2-geocoder";
require("dotenv").config();

// console.log("api key from main.js ", process.env.VUE_APP_GOOGLE_MAPS_API_KEY);

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places" // necessary for places input
  }
});

// Vue.use(Geocoder, {
//   defaultCountryCode: null, // e.g. 'CA'
//   defaultLanguage: null, // e.g. 'en'
//   defaultMode: "address", // or 'lat-lng'
//   googleMapsApiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
// });

// Vue.$geocoder.setDefaultMode("address"); // this is default
// var addressObj = {
//   address_line_1: "",
//   address_line_2: "",
//   city: "Stanley",
//   state: "ID", // province also valid
//   zip_code: "", // postal_code also valid
//   country: "United States"
// };
// Vue.$geocoder.send(addressObj, response => {
//   console.log("geocoder response:", response);
// });

import AuthService from "./AuthService";

//Vue.config.productionTip = false

async function init() {
  let userData = await AuthService.Authenticate();
  if (userData) {
    store.commit("setUser", userData.user);
    store.commit("setResource", { resource: "profile", data: userData.profile });
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
