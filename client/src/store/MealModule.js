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
    async getMealsByTripId({ commit, dispatch }, tripId) {
      let res = await api.get("trips/" + tripId + "/meals");
      commit("setResource", { resource: "meals", data: res.data });
    },
    async addMeal({ commit, dispatch }, meal) {
      let res = await api.post("meals/", meal);
      dispatch("getMealsByTripId", meal.tripId);
    },
    async editMeal({ commit, dispatch }, { mealId, update }) {
      try {
        let res = await api.put("meals/" + mealId, update);
        dispatch("getMealsByTripId", update.tripId);
      } catch (error) {
        NotificationService.errorMessage("You can't edit that meal");

      }
    },
    async removeMeal({ dispatch }, { mealId, tripId }) {
      try {
        let res = await api.delete("meals/" + mealId);
        dispatch("getMealsByTripId", tripId);
      } catch (error) {
        NotificationService.errorMessage("You can't delete that meal");

      }
    },
    async addFoodItem({ commit, dispatch }, { mealId, foodItem, tripId }) {
      let res = await api.post("meals/" + mealId + "/foodItems", foodItem);
      dispatch("getMealsByTripId", tripId);
    },
    async removeFoodItem({ commit, dispatch }, { mealId, foodItemId, tripId }) {
      let res = await api.delete(
        "meals/" + mealId + "/foodItems/" + foodItemId
      );
      dispatch("getMealsByTripId", tripId);
    }
  }
};
