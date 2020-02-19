import mongoose from "mongoose";
import Trip from "../models/Trip";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Trip", Trip);

class TripService {
  async addCollab(authorId, collabId, tripId) {
    let data = await _repository.findOneAndUpdate(
      { _id: tripId, authorId: authorId },
      {
        $addToSet: {
          collabs: collabId
        }
      },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid Id or you do not own this trip", 400);
    }
    return data;
  }
  async addCollabProfile(authorId, collabProfile, tripId) {
    let data = await _repository.findOneAndUpdate(
      { _id: tripId, authorId: authorId },
      {
        $addToSet: {
          collabsProfiles: collabProfile
        }
      },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid Id or you do not own this trip", 400);
    }
    return data;
  }

  // #region -- SECTION TRIPS --
  async getAll(userId) {
    return await _repository.find({ collabs: { $all: [userId] } });
  }

  async getByTripId(id, userId) {
    let data = await _repository.findOne({
      _id: id,
      collabs: { $all: [userId] }
    });
    if (!data) {
      throw new ApiError("Invalid Id or you do not own this trip", 400);
    }
    return data;
  }

  async create(rawData) {
    try {
      return await _repository.create(rawData);
    } catch (e) {
      console.error(e);
    }
  }
  //NOTE Below Function Works
  async edit(id, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, collabs: { $all: [userId] } },
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

  // #region -- SECTION DESTINATIONS --
  async getDestinationsByTripId(tripId, userId) {
    let data = await _repository.find({ _id: tripId, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }

  async addDestination(tripId, rawData) {
    let data = await _repository.findOneAndUpdate(
      { _id: tripId, collabs: { $all: [rawData.authorId] } },
      { $push: { destinations: rawData } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }

  async editDestination(payload, destinationId) {
    let data = await _repository.findOneAndUpdate(
      {
        _id: payload.tripId,
        collabs: { $all: [payload.userId] },
        "destinations._id": destinationId
      },
      {
        $set: {
          "destinations.$.location": payload.location
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
      { _id: payload.tripId, collabs: { $all: [payload.userId] } },
      { $pull: { destinations: { _id: payload.destinationId } } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }
  // #endregion

  // #region -- SECTION CARPOOLS --
  async getCarpoolsByTripId(tripId, userId) {
    let data = await _repository
      .findOne({ _id: tripId, collabs: { $all: [userId] } })
      .populate({
        path: "carpools.occupants",
        populate: { path: "Profile" }
      });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }
}

const tripService = new TripService();
export default tripService;
