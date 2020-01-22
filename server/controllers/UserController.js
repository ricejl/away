import express from "express";
import { Authorize } from "../middleware/authorize";
import _userService from "../services/UserService";
import tripService from "../services/TripService";
import carpoolService from "../services/CarpoolService";
import mealService from "../services/MealService";
import profileService from "../services/ProfileService";

//PUBLIC
export default class UserController {
  constructor() {
    this.router = express
      .Router()
      .post("/register", this.register)
      .post("/login", this.login)
      .use(Authorize.authenticated)
      .get("/authenticate", this.authenticate)
      .post("/authenticateCollab", this.authenticateCollab)
      .delete("/logout", this.logout)
      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }
  async register(req, res, next) {
    try {
      let user = await _userService.create(req.body);
      //SET THE SESSION UID (SHORT FOR USERID)
      req.session.uid = user._id;
      res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      let user = await _userService.getByEmailAndLogin(req.body);
      //SET THE SESSION UID (SHORT FOR USERID)
      req.session.uid = user._id;
      res.send(user);
    } catch (err) {
      next(err);
    }
  }

  async authenticate(req, res, next) {
    try {
      let user = await _userService.authenticate(req.session.uid);
      res.send(user);
    } catch (err) {
      next(err);
    }
  }
  async authenticateCollab(req, res, next) {
    try {
      let user = await _userService.authenticateCollab(
        req.session.uid,
        req.body
      );

      let tripCollab = await tripService.addCollab(
        req.session.uid,
        user.id,
        req.body.tripId
      );
      let collabProfile = await profileService.getProfileByUserId(user.id);

      await tripService.addCollabProfile(
        req.session.uid,
        collabProfile,
        req.body.tripId
      );

      await carpoolService.addCollab(
        req.session.uid,
        user.id,
        req.body.tripId,
        req.body
      );
      await mealService.addCollab(
        req.session.uid,
        user.id,
        req.body.tripId,
        req.body
      );
      res.send(tripCollab);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy(err => {
        if (err) {
          return res.send(err);
        }
        return res.send({
          message: "Logout Successful"
        });
      });
    } catch (error) {
      next(error);
    }
  }
}
