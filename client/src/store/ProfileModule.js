import Axios from "axios";

let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default {
  actions: {
    async createProfile({ commit, dispatch }, profile) {
      let res = await api.post("profiles", profile);
      console.log("store create pofile res.data: ", res.data);

      commit("setProfile", res.data);
    },

    async getProfileByUserId({ commit, dispatch }) {
      let res = await api.get("profiles");
      commit("setProfile", res.data);
    }
  }
};
