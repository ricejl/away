import mongoose from "mongoose";
import Trip from "../models/Trip";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Trip", Trip);

class TripService {
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
    let data = await _repository.create(rawData);
    return data;
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
  //Below function is not being used, think about removing later
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
      .find({ _id: tripId, collabs: { $all: [userId] } })
      .populate({
        path: "carpools.occupants",
        populate: { path: "Profile" }
      });
    console.log(data);
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }

  async addCarpool(tripId, rawData) {
    let data = await _repository.findOneAndUpdate(
      { _id: tripId, collabs: { $all: [rawData.authorId] } },
      { $push: { carpools: rawData } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }
  //NOTE This always edits the first element in carpools array, why???
  async editCarpool(payload, carpoolId) {
    console.log(payload);
    let data = await _repository.findOneAndUpdate(
      {
        _id: payload.tripId,
        collabs: { $all: [payload.userId] },
        "carpools._id": carpoolId
      },
      {
        $set: {
          "carpools.$.name": payload.name,
          "carpools.$.totalSeats": payload.totalSeats,
          "carpools.$.description": payload.description
        }
      },
      { new: true }
    );
    console.log(data);
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }

  //NOTE Below function works
  async addOccupant(payload) {
    console.log(payload);
    let data = await _repository.findOneAndUpdate(
      {
        _id: payload.tripId,
        collabs: { $all: [payload.authorId] },
        "carpools._id": payload.carpoolId
      },
      { $push: { "carpools.$.occupants": payload.occupants } },
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
  //NOTE This one also works
  async removeOccupant(payload) {
    let data = await _repository.findOneAndUpdate(
      {
        _id: payload.tripId,
        collabs: { $all: [payload.userId] },
        "carpools._id": payload.carpoolId
      },
      { $pull: { "carpools.$.occupants": { $in: payload.occupants } } },
      { new: true }
    );
    if (!data) {
      throw new ApiError(
        "Invalid ID or you do not have access to this trip",
        400
      );
    }
    return data;
  }

  async removeCarpool(payload) {
    let data = await _repository.findOneAndUpdate(
      { _id: payload.tripId, collabs: { $all: [payload.userId] } },
      { $pull: { carpools: { _id: payload.carpoolId } } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
  }
}

const tripService = new TripService();
export default tripService;
