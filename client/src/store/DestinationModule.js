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
    async addDestination({ commit, dispatch }, { tripId, destination }) {
      let res = await api.post(
        "trips/" + tripId + "/destinations",
        destination
      );
      commit("setResource", { resource: "activeTrip", data: res.data });
    },
    async removeDestination({ commit, dispatch }, { tripId, destinationId }) {
      let res = await api.delete(
        "trips/" + tripId + "/destinations/" + destinationId
      );
      commit("setResource", { resource: "activeTrip", data: res.data });
    },
    async editDestination(
      { commit, dispatch },
      { tripId, destinationId, update }
    ) {
      let res = await api.put(
        "trips/" + tripId + "/destinations/" + destinationId,
        update
      );
      commit("setResource", { resource: "activeTrip", data: res.data });
    }
  }
};
