import express from "express";
import { Authorize } from "../middleware/authorize";
import mealService from "../services/MealService";

export default class MealController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .post("", this.createMeal)
      .post("/:id/foodItems", this.addFoodItem)
      .put("/:id", this.editMeal)
      .delete("/:id", this.deleteMeal)
      .delete("/:id/foodItems", this.removeFoodItem);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async addFoodItem(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      let data = await mealService.addFoodItem(req.params.id, req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async removeFoodItem(req, res, next) {
    try {
      let data = await mealService.removeFoodItem({
        mealId: req.params.id,
        userId: req.session.uid,
        foodItemId: req.body.foodItemId
        // NOTE make sure to send foodItemId from front end
      });
      return res.send("Deletion Successful");
    } catch (error) {
      next(error);
    }
  }
  async createMeal(req, res, next) {
    try {
      req.body.authorId = req.session.uid;
      req.body.collabs = [];
      req.body.collabs.push(req.session.uid);
      let data = await mealService.createMeal(req.body);
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
      return res.send("Deletion successful");
    } catch (error) {
      next(error);
    }
  }
}
