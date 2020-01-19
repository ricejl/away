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
      commit("setResource", { resource: "lists", data: res.data });
    },
    async editList({ commit, dispatch }, { listId, update }) {
      let res = await api.put("lists/" + listId, update);
      commit("setResource", { resource: "lists", data: res.data });
    },
    async removeList({ commit, dispatch }, listId) {
      let res = await api.delete("lists/" + listId);
      commit("setResource", { resource: "lists", data: res.data });
    },
    async addListItem({ commit, dispatch }, { listId, listItem }) {
      let res = await api.post("lists/" + listId + "/items", listItem);
      commit("setResource", { resource: "lists", data: res.data });
    },
    async removeListItem({ commit, dispatch }, { listId, listItemId }) {
      let res = await api.delete("lists/" + listId + "/items/" + listItemId);
      commit("setResource", { resource: "lists", data: res.data });
    }
  }
};
