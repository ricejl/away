import mongoose from "mongoose";
import Carpool from "../models/Carpool";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Carpool", Carpool);

class CarpoolService {
  async getCarpoolsByTripId(id, uid) {
    let data = await _repository
      .find({ tripId: id, collabs: { $all: [uid] } })
      .populate("occupants.profileId");
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this carpool",
        400
      );
    }
    return data;
  }
  async createCarpool(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
  async addOccupant(carpoolId, rawData) {
    let data = await _repository.findOneAndUpdate(
      { _id: carpoolId, collabs: { $all: [rawData.authorId] } },
      { $push: { occupants: rawData.occupantId } },
      { new: true }
    );
    if (!data) {
      throw new ApiError(
        "Invalid ID or you do not have access to this carpool",
        400
      );
    }
    return data;
  }

  async editCarpool(id, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, collabs: { $all: [userId] } },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this carpool",
        400
      );
    }
    return data;
  }

  async deleteCarpool(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      collabs: { $all: [userId] }
    });
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this carpool",
        400
      );
    }
  }

  async removeOccupant(payload) {
    let data = await _repository.findOneAndUpdate(
      { _id: payload.carpoolId, collabs: { $all: [payload.userId] } },
      { $pull: { occupants: payload.occupantId } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
  }
}

const carpoolService = new CarpoolService();
export default carpoolService;
