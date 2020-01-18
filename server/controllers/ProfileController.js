import express from "express";
import { Authorize } from "../middleware/authorize";
import profileService from "../services/ProfileService";

export default class ProfileController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("/:id", this.getByProfileId)
      .post("", this.create)
      .put("/:id", this.edit);
    // .delete("/:id", this.delete);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getByProfileId(req, res, next) {
    try {
      let data = await profileService.getByProfileId(
        req.params.id,
        req.session.uid
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await profileService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await profileService.edit(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  // NOTE Users should not be able to delete their profile
  //   async delete(req, res, next) {
  //     try {
  //       let data = await profileService.delete(req.params.id, req.session.uid);
  //       return res.send("Deletion successful");
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}
