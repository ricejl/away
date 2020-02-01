import io from "socket.io-client";

let socket = {};

export default {
  actions: {
    initalizeSocket({ commit, dispatch }) {
      //Establish connection with socket:
      let baseUrl = window.location.host.includes("localhost")
        ? "//localhost:3000/"
        : "//awayapp.herokuapp.com/";

      socket = io(baseUrl);
      //Offline testing:
      // socket = io("//localhost:3000")

      //Handle any on connection events
      socket.on("CONNECTED", data => {
        console.log("Connected to socket");
      });

      //register all listeners

      socket.on("addDestination", data => {
        commit("setResource", { resource: "activeTrip", data: data });
      });
      socket.on("removeDestination", data => {
        commit("setResource", { resource: "activeTrip", data: data });
      });
      socket.on("addCarpool", data => {
        dispatch("getCarpoolsByTripId", data.tripId);
      });
      socket.on("addOccupant", data => {
        dispatch("getCarpoolsByTripId", data.tripId);
      });
      socket.on("removeOccupant", data => {
        dispatch("getCarpoolsByTripId", data.tripId);
      });
      socket.on("addMeal", data => {
        dispatch("getMealsByTripId", data.tripId);
      });
      socket.on("removeMeal", data => {
        dispatch("getMealsByTripId", data.tripId);
      });
      socket.on("addFoodItem", data => {
        dispatch("getMealsByTripId", data.tripId);
      });
      socket.on("removeFoodItem", data => {
        dispatch("getMealsByTripId", data.tripId);
      });
    }
  }
};
