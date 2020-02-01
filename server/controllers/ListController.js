import express from "express";
import { Authorize } from "../middleware/authorize";
import listService from "../services/ListService";
import tripService from "../services/TripService";

export default class ListController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .post("", this.createList)
      .post("/:id/items", this.addItem)
      .put("/:id", this.editList)
      .delete("/:id", this.deleteList)
      .delete("/:listId/items/:id", this.removeItem);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async addItem(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await listService.addItem(req.params.id, req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async removeItem(req, res, next) {
    try {
      let data = await listService.removeItem({
        listId: req.params.listId,
        userId: req.session.uid,
        itemId: req.params.id
      });
      return res.send("Deletion Successful");
    } catch (error) {
      next(error);
    }
  }
  async createList(req, res, next) {
    try {
      let trip = await tripService.getByTripId(
        req.body.tripId,
        req.session.uid
      );
      req.body.authors = [req.session.uid, req.body.tripAuthorId];
      req.body.collabs = [...trip.collabs];
      let data = await listService.createList(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async editList(req, res, next) {
    try {
      let data = await listService.editList(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteList(req, res, next) {
    try {
      let data = await listService.deleteList(req.params.id, req.session.uid);
      return res.send("Deletion successful");
    } catch (error) {
      next(error);
    }
  }
}
