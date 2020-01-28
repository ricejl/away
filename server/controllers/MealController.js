import express from "express";
import { Authorize } from "../middleware/authorize";
import mealService from "../services/MealService";
import tripService from "../services/TripService";
import socket from "../socket/SocketService";

export default class MealController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .post("", this.createMeal)
      .post("/:id/foodItems", this.addFoodItem)
      .put("/:id", this.editMeal)
      .delete("/:id", this.deleteMeal)
      .delete("/:mealId/foodItems/:id", this.removeFoodItem);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async addFoodItem(req, res, next) {
    try {
      console.log("controller foodItem req.body", req.body);
      req.body.authorId = req.session.uid;
      let data = await mealService.addFoodItem(req.params.id, req.body);
      socket.notifyAddFoodItem(data);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async removeFoodItem(req, res, next) {
    try {
      let data = await mealService.removeFoodItem({
        mealId: req.params.mealId,
        userId: req.session.uid,
        foodItemId: req.params.id
      });
      socket.notifyRemoveFoodItem(data);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async createMeal(req, res, next) {
    try {
      let trip = await tripService.getByTripId(
        req.body.tripId,
        req.session.uid
      );
      req.body.authorId = req.session.uid;
      req.body.collabs = [...trip.collabs];
      let data = await mealService.createMeal(req.body);
      socket.notifyAddMeal(data);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async editMeal(req, res, next) {
    try {
      let data = await mealService.editMeal(
        req.params.id,
        req.session.uid,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async deleteMeal(req, res, next) {
    try {
      let data = await mealService.deleteMeal(req.params.id, req.session.uid);
      socket.notifyRemoveMeal(data);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
