import Vue from "vue";
import Vuex from "vuex";
import AuthService from "../AuthService";
import router from "../router/index";
import Axios from "axios";

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
  state: {
    user: {},
    profile: {},
    trips: [],
    activeTrip: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setProfile(state, profile) {
      state.profile = profile;
    },
    setAllTrips(state, trips) {
      state.trips = trips;
    },
    addTrip(state, trip) {
      state.trips.push(trip);
    },
    setActiveTrip(state, trip) {
      state.activeTrip = trip;
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
        router.push({ name: "dashboard" });
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
    },
    //#endregion

    // #region -- TRIPS --
    async getAllTrips({ commit, dispatch }) {
      let res = await api.get("trips");
      commit("setAllTrips", res.data);
    },
    async createTrip({ commit, dispatch }, trip) {
      let res = await api.post("trips", trip);
      commit("addTrip", res.data);
    },

    async getTripById({ commit, dispatch }, tripId) {
      let res = await api.get("trips/" + tripId);
      commit("setActiveTrip", res.data);
    },
    // #endregion

    // #region -- DESTINATIONS --
    async addDestination({ commit, dispatch }, { tripId, destination }) {
      let res = await api.post(
        "trips/" + tripId + "/destinations",
        destination
      );
      console.log("res.data in store add destination" + res.data);
      commit("setActiveTrip", res.data);
    },
    // #endregion

    // #region -- PROFILES --
    async createProfile({ commit, dispatch }, profile) {
      let res = await api.post("profiles", profile);
      commit("setProfile", res.data);
    },

    async getProfileByUserId({ commit, dispatch }) {
      let res = await api.get("profiles");
      commit("setProfile", res.data);
    }

    // #endregion
  },
  modules: {}
});
