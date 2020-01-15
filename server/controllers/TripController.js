import express from "express";
import { Authorize } from "../middleware/authorize";
import tripService from "../services/TripService";

export default class TripController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("", this.getAll)
      .get("/:id", this.getByTripId)
      .get("/:id/destinations", this.getDestinationsByTripId)
      .post("", this.create)
      .post("/:id/destinations", this.addDestination)
      .put("/:id", this.edit)
      .put("/:id/destinations", this.removeDestination)
      .delete("/:id", this.delete);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  // #region -- TRIPS --
  async getAll(req, res, next) {
    try {
      let data = await tripService.getAll(req.session.uid);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getByTripId(req, res, next) {
    try {
      let data = await tripService.getByTripId(req.params.id, req.session.uid);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await tripService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await tripService.edit(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let data = await tripService.delete(req.params.id, req.session.uid);
      return res.send("Deletion successful");
    } catch (error) {
      next(error);
    }
  }
  // #endregion

  // #region -- DESTINATIONS --
  async getDestinationsByTripId(req, res, next) {
    try {
      let data = await tripService.getDestinationsByTripId(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async addDestination(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      // FIXME do we do anything with the authorId here? It's not sent to service. We also do this in the create fn above
      let data = await tripService.addDestination(req.params.id, req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async removeDestination(req, res, next) {
    try {
      let data = await tripService.removeDestination({
        tripId: req.params.id,
        userId: req.session.uid,
        destinationId: req.body.destinationId
      });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  // #endregion
}
