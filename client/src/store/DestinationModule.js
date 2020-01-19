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
      console.log("res.data in store add destination" + res.data);
      commit("setResource", { resource: "activeTrips", data: res.data });
    },
    //NOTE With delete dispatch, send array with tripId at [0] and destinationId at [1]
    async removeDestination({ commit, dispatch }, idArray) {
      let res = await api.delete(
        "trips/" + idArray[0] + "/destinations",
        idArray[1]
      );
      commit("setResource", { resource: "activeTrips", data: res.data });
    }
  }
};
