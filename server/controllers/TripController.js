import express from "express";
import { Authorize } from "../middleware/authorize";
import tripService from "../services/TripService";
import mealService from "../services/MealService";
import listService from "../services/ListService";

export default class TripController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("", this.getAll)
      .get("/:id", this.getByTripId)
      .get("/:id/meals", this.getMealsByTripId)
      .get("/:id/destinations", this.getDestinationsByTripId)
      .get("/:id/carpools", this.getCarpoolsByTripId)
      .get("/:id/lists", this.getListsByTripId)
      .post("", this.create)
      .post("/:id/destinations", this.addDestination)
      .post("/:id/carpools", this.addCarpool)
      .post("/:tripId/carpools/:id/occupants", this.addOccupant)
      .put("/:id", this.edit)
      .put("/:id/destinations", this.editDestination)
      .put("/:id/carpools", this.editCarpool)
      .put("/:tripId/carpools/:id", this.removeOccupant)
      .delete("/:id", this.delete)
      .delete("/:id/destinations", this.removeDestination)
      .delete("/:id/carpools", this.removeCarpool);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }
  async getMealsByTripId(req, res, next) {
    try {
      let data = await mealService.getMealsByTripId(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getListsByTripId(req, res, next) {
    try {
      let data = await listService.getListsByTripId(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  // #region -- SECTION TRIPS --
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

  // #region -- SECTION DESTINATIONS --
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
      let data = await tripService.addDestination(req.params.id, req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async editDestination(req, res, next) {
    try {
      let data = await tripService.editDestination({
        tripId: req.params.id,
        userId: req.session.uid,
        destinationId: req.body._id,
        location: req.body.location
      });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async removeDestination(req, res, next) {
    try {
      let data = await tripService.removeDestination({
        tripId: req.params.id,
        userId: req.session.uid,
        destinationId: req.body._id
        //NOTE Be Sure Destination Id is sent with Front End Reqs
      });
      return res.send("Deletion Successful");
    } catch (error) {
      next(error);
    }
  }
  // #endregion

  // #region -- SECTION CARPOOLS --
  async getCarpoolsByTripId(req, res, next) {
    try {
      let data = await tripService.getCarpoolsByTripId(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async addCarpool(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await tripService.addCarpool(req.params.id, req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async addOccupant(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await tripService.addOccupant({
        tripId: req.params.tripId,
        carpoolId: req.params.id,
        ...req.body
      });
      return res.status(201).send(data);
    } catch (error) {
      next;
    }
  }

  async editCarpool(req, res, next) {
    try {
      let data = await tripService.editCarpool({
        tripId: req.params.id,
        userId: req.session.uid,
        carpoolId: req.body.carpoolId,
        ...req.body
      });
      console.log("Controller:" + data);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async removeOccupant(req, res, next) {
    try {
      let data = await tripService.removeOccupant({
        tripId: req.params.tripId,
        carpoolId: req.params.id,
        userId: req.session.uid,
        ...req.body
      });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async removeCarpool(req, res, next) {
    try {
      let data = await tripService.removeCarpool({
        tripId: req.params.id,
        userId: req.session.uid,
        carpoolId: req.body.carpoolId
        //NOTE Be Sure Carpool Id is sent with Front End Reqs
      });
      return res.send("Deletion Successful");
    } catch (error) {
      next(error);
    }
  }
  // #endregion
}
