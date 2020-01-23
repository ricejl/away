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
  notifyAddOccupant(occupantData) {
    this.io.emit("addOccupant", occupantData);
  }
  notifyRemoveOccupant(occupantData) {
    this.io.emit("removeOccupant", occupantData);
  }
  notifyAddMeal(mealData) {
    this.io.emit("addMeal", mealData);
  }
  notifyRemoveMeal(mealData) {
    this.io.emit("removeMeal", mealData);
  }
  notifyAddFoodItem(mealData) {
    this.io.emit("addFoodItem", mealData);
  }
  notifyRemoveFoodItem(mealData) {
    this.io.emit("removeFoodItem", mealData);
  }
}

const socket = new Socket();

module.exports = socket;
