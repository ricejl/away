import Vue from "vue";
import Vuex from "vuex";
import AuthService from "../AuthService";
import router from "../router/index";
import Axios from "axios";
import tripModule from "./TripModule";
import listModule from "./ListModule";
//import socketModule from "./SocketModule";
import carpoolModule from "./CarpoolModule";
import mealModule from "./MealModule";
import destinationModule from "./DestinationModule";
import profileModule from "./ProfileModule";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  modules: {
    tripModule,
    listModule,
    //socketModule,
    carpoolModule,
    mealModule,
    destinationModule,
    profileModule
  },
  state: {
    user: {},
    profile: {},
    trips: [],
    activeTrip: {},
    meals: [],
    lists: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setResource(state, payload) {
      state[payload.resource] = payload.data;
    },
    // setProfile(state, profile) {
    //   state.profile = profile;
    // },
    // setAllTrips(state, trips) {
    //   state.trips = trips;
    // },
    // addTrip(state, trip) {
    //   state.trips.push(trip);
    // },
    // setActiveTrip(state, trip) {
    //   state.activeTrip = trip;
    // },
    resetActiveTrip(state) {
      state.activeTrip = {};
    },
    resetState(state) {
      (state.user = {}), (state.trips = []);
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "dashboard" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        let profile = await api.get("profiles");
        if (profile.data._id) {
          commit("setResource", { resource: "profile", data: profile.data });
          router.push({ name: "dashboard" });
        } else {
          router.push({ name: "profile" });
        }
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    }
    //#endregion
  }
});
