import express from "express";
import { Authorize } from "../middleware/authorize";
import listService from "../services/ListService";

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
        // NOTE make sure to send ItemId from front end
      });
      return res.send("Deletion Successful");
    } catch (error) {
      next(error);
    }
  }
  async createList(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      req.body.collabs = [];
      req.body.collabs.push(req.session.uid);
      // console.log(req.body);
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
