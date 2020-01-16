import mongoose from "mongoose";
import Meal from "../models/Meal";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Meal", Meal);

class MealService {
  async getMealsByTripId(id, uid) {
    let data = await _repository
      .find({ tripId: id, authorId: uid })
      .populate("foodItems.profileId");
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this meal",
        400
      );
    }
    return data;
    //NOTE  Left AuthoerId off req do facilitate collaboraters?
  }
  async createMeal(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
  async addFoodItem(mealId, rawData) {
    let data = await _repository.findOneAndUpdate(
      { _id: mealId },
      { $push: { foodItems: rawData } },
      { new: true }
    );
    if (!data) {
      throw new ApiError(
        "Invalid ID or you do not have access to this meal",
        400
      );
    }
    return data;
  }

  async editMeal(id, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this meal",
        400
      );
    }
    return data;
  }

  async deleteMeal(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: userId
    });
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this meal",
        400
      );
    }
  }
}

const mealService = new MealService();
export default mealService;
