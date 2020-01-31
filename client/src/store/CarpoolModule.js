import Axios from "axios";
import NotificationService from "../NotificationService.js";

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
      commit("setResource", { resource: "carpools", data: res.data });
    },
    async addCarpool({ commit, dispatch }, { tripId, carpool }) {
      let res = await api.post("carpools", carpool);
      dispatch("getCarpoolsByTripId", tripId);
    },
    async editCarpool({ commit, dispatch }, { tripId, carpoolId, update }) {
      let res = await api.put("carpools/" + carpoolId, update);
      dispatch("getCarpoolsByTripId", tripId);
    },
    async removeCarpool({ commit, dispatch }, { tripId, carpoolId }) {
      try {
        let res = await api.delete("carpools/" + carpoolId);
        dispatch("getCarpoolsByTripId", tripId);
      } catch (error) {
        NotificationService.errorMessage("You can't delete that carpool.");
      }
    },
    async addOccupant({ commit, dispatch }, { tripId, carpoolId, occupant }) {
      let res = await api.post(
        "carpools/" + carpoolId + "/occupants",
        occupant
      );
      dispatch("getCarpoolsByTripId", tripId);
    },
    async removeOccupant(
      { commit, dispatch },
      { tripId, carpoolId, occupantId }
    ) {
      let res = await api.delete(
        "carpools/" + carpoolId + "/occupants/" + occupantId
      );
      dispatch("getCarpoolsByTripId", tripId);
    }
  }
};
