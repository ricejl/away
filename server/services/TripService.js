import mongoose from "mongoose";
import Trip from "../models/Trip";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Trip", Trip);

class TripService {
  // #region -- TRIPS --
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
  // #endregion

  // #region -- DESTINATIONS --
  async getDestinationsByTripId(tripId, userId) {
    let data = await _repository.find({ tripId: tripId, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }

  async addDestination(tripId, rawData) {
    let data = await _repository.findOneAndUpdate(
      { _id: tripId },
      { $push: { destinations: rawData } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }

  async editDestination(payload) {
    let data = await _repository.findOneAndUpdate(
      { _id: payload.tripId },
      {
        $set: {
          destinations: {
            _id: payload.destinationId,
            location: payload.location
          }
        }
      },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }

  async removeDestination(payload) {
    let data = await _repository.findOneAndUpdate(
      { _id: payload.tripId },
      { $pull: { destinations: { _id: payload.destinationId } } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
  }
}

const tripService = new TripService();
export default tripService;
