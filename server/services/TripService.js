import mongoose from "mongoose";
import Trip from "../models/Trip";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Trip", Trip);

class TripService {
  // #region -- SECTION TRIPS --
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

  // #region -- SECTION DESTINATIONS --
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
  // #endregion

  // #region -- SECTION CARPOOLS --
  async getCarpoolsByTripId(tripId, userId) {
    console.log(tripId, userId);
    let data = await _repository.find({ _id: tripId, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }

  async addCarpool(tripId, rawData) {
    let data = await _repository.findOneAndUpdate(
      { _id: tripId },
      { $push: { carpools: rawData } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    return data;
  }

  async editCarpool(payload) {
    let data = await _repository.findOneAndUpdate(
      { _id: payload.tripId },
      {
        $set: {
          carpools: {
            _id: payload.carpoolId,
            name: payload.name,
            totalSeats: payload.totalSeats,
            description: payload.description
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

  async editCarpoolOccupants(payload) {
    // console.log(payload);
    // let data = await _repository.findOne({
    //   _id: payload.tripId
    //   // "carpools._id": payload.carpoolId
    // });
    // console.log(data);
    if (
      payload.addOccupant
      //data.carpools.includes(e => e._id == payload.carpoolId)
    ) {
      // NOTE THIS WORKS!!! However...
      //FIXME better to have different route to add vs remove occupants and use POST request instead of PUT
      // NOTE we may not need the boolean addOccupant property
      let data = await _repository.findOneAndUpdate(
        { _id: payload.tripId, "carpools._id": payload.carpoolId },
        { $push: { "carpools.$.occupants": payload.occupants } },
        { new: true }
        // still editing a trip here; in the push
      );
      return data;
    } else if (
      !payload.addOccupant
      //data.carpools.includes(e => e._id == payload.carpoolId)
    ) {
      let data = await _repository.findOneAndUpdate(
        { _id: payload.tripId },
        {
          $pull: {
            carpools: {
              _id: payload.carpoolId,
              occupants: payload.occupants
            }
          }
        },
        { new: true }
      );
      return data;
    } else if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
    console.log("data rfom editCarpool" + data);
    // data.occupants.push(...payload.occupants);
    // data.markModified("occupants");
    // data.save(err => {
    //   console.error(err);
    // });
    return data;
  }
  async removeCarpool(payload) {
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
