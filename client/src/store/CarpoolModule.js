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
    async getCarpoolsByTripId({ commit, dispatch }, tripId) {
      let res = await api.get("trips/" + tripId + "/carpools");
      commit("setResource", { resource: "activeTrip", data: res.data });
    },
    async addCarpool({ commit, dispatch }, { tripId, carpool }) {
      let res = await api.post("trips/" + tripId + "/carpools", carpool);
      commit("setResource", { resource: "activeTrip", data: res.data });
    },
    async editCarpool({ commit, dispatch }, { tripId, update }) {
      let res = await api.put("trips/" + tripId + "/carpools", update);
      commit("setResource", { resource: "activeTrip", data: res.data });
    },
    async removeCarpool({ commit, dispatch }, { tripId, carpoolId }) {
      let res = await api.delete("trips/" + tripId + "/carpools/" + carpoolId);
      commit("setResource", { resource: "activeTrip", data: res.data });
    },

    async addOccupant({ commit, dispatch }, { tripId, carpoolId, occupant }) {
      let res = await api.post(
        "trips/" + tripId + "/carpools/" + carpoolId + "/occupants",
        occupant
      );
      commit("setResource", { resource: "activeTrip", data: res.data });
    },

    async removeOccupant(
      { commit, dispatch },
      { tripId, carpoolId, occupantToRemove }
    ) {
      let res = await api.put(
        "trips/" + tripId + "/carpools/" + carpoolId,
        occupantToRemove
      );
      commit("setResource", { resource: "activeTrip", data: res.data });
    }
  }
};
