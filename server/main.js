import express from "express";
import cors from "cors";
import bp from "body-parser";
import DbContext from "./db/dbconfig";
import Socket from './socket/SocketService'
const server = express();
const socketServer = require("http").createServer(server);
const io = require("socket.io")(socketServer);

//Fire up database connection
DbContext.connect();
Socket.setIO(io)

//Sets the port to Heroku's, and the files to the built project
var port = process.env.PORT || 3000;
server.use(express.static(__dirname + "/../client/dist"));

var whitelist = ["http://localhost:8080"];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
server.use(cors(corsOptions));

//REGISTER MIDDLEWEAR
server.use(bp.json());
server.use(
  bp.urlencoded({
    extended: true
  })
);

//REGISTER YOUR SESSION, OTHERWISE YOU WILL NEVER GET LOGGED IN
import UserController from "./controllers/UserController";
import Session from "./middleware/session";
server.use(new Session().express);
server.use("/account", new UserController().router);

//YOUR ROUTES HERE!!!!!!
import TripController from "./controllers/TripController";
import ProfileController from "./controllers/ProfileController";
import MealController from "./controllers/MealController";
import ListController from "./controllers/ListController";

server.use("/api/trips", new TripController().router);
server.use("/api/profiles", new ProfileController().router);
server.use("/api/meals", new MealController().router);
server.use("/api/lists", new ListController().router);

//NOTE Default error handler, catches all routes with an error attached
server.use((error, req, res, next) => {
  res.status(error.status || 400).send({ error: { message: error.message } });
});

//Catch all
server.use("*", (req, res, next) => {
  res.status(404).send({
    error: "No matching routes"
  });
});

// server.listen(port, () => {
//   console.log("server running on port", port);
// });

//Start Server
socketServer.listen(port, () => {
  console.log("socketServer running on port:", port)
})