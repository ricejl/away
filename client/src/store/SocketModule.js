import io from "socket.io-client";

let socket = {};

export default {
  actions: {
    initalizeSocket({ commit, dispatch }) {
      //establish connection with socket
      socket = io("//localhost:3000");
      //Handle any on connection events
      socket.on("CONNECTED", data => {
        console.log("Connected to socket, villany may commence");
      });

      // register all listeners
      // socket.on("actionName", data => {
      //   commit("mutationaName", data);
      // });
    }
  }
};
