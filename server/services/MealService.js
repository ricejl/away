import mongoose from "mongoose";
import Meal from "../models/Meal";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Meal", Meal);

class MealService {
  async addCollab(authorId, collabId, tripId, payload) {
    let data = await _repository.updateMany(
      { tripId: tripId, authorId: authorId },
      {
        $addToSet: {
          collabs: collabId
        }
      }
    );
    if (!data) {
      throw new ApiError("Invalid Id or you do not own this trip", 400);
    }
    return data;
  }
  async getMealsByTripId(id, uid) {
    let data = await _repository
      .find({ tripId: id, collabs: { $all: [uid] } })
      .populate("foodItems.profileId");
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this meal",
        400
      );
    }
    return data;
  }
  async createMeal(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
  async addFoodItem(mealId, rawData) {
    let data = await _repository.findOneAndUpdate(
      { _id: mealId, collabs: { $all: [rawData.authorId] } },
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
      { _id: id, authors: { $all: [userId] } },
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
      authors: { $all: [userId] }
    });
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this meal",
        400
      );
    }
    return data;
  }

  async removeFoodItem(payload) {
    let data = await _repository.findOneAndUpdate(
      { _id: payload.mealId, collabs: { $all: [payload.userId] } },
      { $pull: { foodItems: { _id: payload.foodItemId } } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }
}

const mealService = new MealService();
export default mealService;
