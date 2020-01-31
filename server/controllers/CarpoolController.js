import express from "express";
import { Authorize } from "../middleware/authorize";
import carpoolService from "../services/CarpoolService";
import tripService from "../services/TripService";
import socket from "../socket/SocketService";

export default class CarpoolController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .post("", this.createCarpool)
      .post("/:id/occupants", this.addOccupant)
      .put("/:id", this.editCarpool)
      .delete("/:id", this.deleteCarpool)
      .delete("/:carpoolId/occupants/:id", this.removeOccupant);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async addOccupant(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await carpoolService.addOccupant(req.params.id, req.body);
      socket.notifyAddOccupant(data);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async removeOccupant(req, res, next) {
    try {
      let data = await carpoolService.removeOccupant({
        carpoolId: req.params.carpoolId,
        userId: req.session.uid,
        occupantId: req.params.id
      });
      socket.notifyRemoveOccupant(data);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async createCarpool(req, res, next) {
    try {
      let trip = await tripService.getByTripId(
        req.body.tripId,
        req.session.uid
      );
      req.body.authors = [req.session.uid, req.body.tripAuthorId];
      req.body.collabs = [...trip.collabs];
      let data = await carpoolService.createCarpool(req.body);
      socket.notifyAddCarpool(data);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async editCarpool(req, res, next) {
    try {
      let data = await carpoolService.editCarpool(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteCarpool(req, res, next) {
    try {
      let data = await carpoolService.deleteCarpool(
        req.params.id,
        req.session.uid
      );
      return res.send("Deletion successful");
    } catch (error) {
      next(error);
    }
  }
}
