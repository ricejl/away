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
  notifyAddDestination(destinationData) {
    this.io.emit("addDestination", destinationData);
  }
  notifyRemoveDestination(destinationData) {
    this.io.emit("removeDestination", destinationData);
  }
  notifyAddCarpool(carpoolData) {
    this.io.emit("addCarpool", carpoolData);
  }


}

const socket = new Socket();

module.exports = socket;
