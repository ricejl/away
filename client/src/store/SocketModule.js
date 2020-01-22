import io from "socket.io-client";

let socket = {};

export default {
  actions: {
    initalizeSocket({ commit, dispatch }) {
      //establish connection with socket
      socket = io("//localhost:3000"); // Use socket=io("//localhost:3000") for testing offline

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
    }
  }
};
