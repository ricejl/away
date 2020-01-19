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
    async getMealsByTripId({ commit, dispatch }, tripId) {
      let res = await api.get("trips/" + tripId + "/meals");
      commit("setResource", { resource: "meals", data: res.data });
    },
    async addMeal({ commit, dispatch }, meal) {
      let res = await api.post("meals/", meal);
      commit("setResource", { resource: "meals", data: res.data });
    },
    async editMeal({ commit, dispatch }, { mealId, update }) {
      let res = await api.put("meals/" + mealId, update);
      commit("setResource", { resource: "meals", data: res.data });
    },
    async removeMeal({ commit, dispatch }, mealId) {
      let res = await api.delete("meals/" + mealId);
      commit("setResource", { resource: "meals", data: res.data });
    },
    async addFoodItem({ commit, dispatch }, { mealId, foodItem }) {
      let res = await api.post("meals/" + mealId + "/foodItems");
      commit("setResource", { resource: "meals", data: res.data });
    },
    async removeFoodItem({ commit, dispatch }, { mealId, foodItemId }) {
      let res = await api.delete(
        "meals/" + mealId + "/foodItems/" + foodItemId
      );
      commit("setResource", { resource: "meals", data: res.data });
    }
  }
};
