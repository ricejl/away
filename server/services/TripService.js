import mongoose from "mongoose";
import Trip from "../models/Trip";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Trip", Trip);

class TripService {
  async getAll(userId) {
    return await _repository.find({ authorId: userId });
  }

  async getByTripId(id, userId) {
    let data = await _repository.findOne({ _id: id, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid Id or you do not own this trip", 400);
    }
    return data;
  }

  async create(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }

  async edit(id, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, authorId: userId },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid Id or you do not own this trip", 400);
    }
    return data;
  }

  async delete(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Invalid Id or you do not own this trip", 400);
    }
  }
}

const tripService = new TripService();
export default tripService;
