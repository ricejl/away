class Socket {
  setIO(io) {
    this.io = io;
    this.rooms = {};
    //Server listeners
    io.on("connection", socket => this.newConnection(socket));
    io.on("join", data => this.joinRoom(data));
  }
  newConnection(socket) {
    //Handshake / Confirmation of Connection
    console.log("connected from server SocketService");
    socket.emit("CONNECTED", {
      socket: socket.id,
      message: "Successfully Connected"
    });
  }

  //DESTINATIONS
  notifyaddDestination(destinationData) {
    this.io.emit("addDestination", destinationData);
  }

  notifyremoveDestination(destinationData) {
    this.io.emit("addDestination", destinationData);
  }


}

const socket = new Socket();

module.exports = socket;
