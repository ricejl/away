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
    async getListsByTripId({ commit, dispatch }, tripId) {
      let res = await api.get("trips/" + tripId + "/lists");
      commit("setResource", { resource: "lists", data: res.data });
    },
    async addList({ commit, dispatch }, list) {
      let res = await api.post("lists", list);
      dispatch("getListsByTripId", list.tripId);
    },
    //NOTE Double check update contains tripId
    async editList({ commit, dispatch }, { listId, update }) {
      let res = await api.put("lists/" + listId, update);
      dispatch("getListsByTripId", update.tripId);
    },
    async removeList({ commit, dispatch }, { listId, tripId }) {
      let res = await api.delete("lists/" + listId);
      dispatch("getListsByTripId", tripId);
    },
    async addListItem({ commit, dispatch }, { listId, listItem, tripId }) {
      let res = await api.post("lists/" + listId + "/items", listItem);
      dispatch("getListsByTripId", tripId);
    },
    async removeListItem({ commit, dispatch }, { listId, listItemId, tripId }) {
      let res = await api.delete("lists/" + listId + "/items/" + listItemId);
      dispatch("getListsByTripId", tripId);
    }
  }
};
