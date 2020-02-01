import mongoose from "mongoose";
import List from "../models/List";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("List", List);

class ListService {
  async getListsByTripId(id, uid) {
    let data = await _repository
      .find({ tripId: id, collabs: { $all: [uid] } })
      .populate("items.profileId");
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this list",
        400
      );
    }
    return data;
  }
  async createList(rawData) {
    let data = await _repository.create(rawData);
    return data;
  }
  async addItem(listId, rawData) {
    let data = await _repository.findOneAndUpdate(
      { _id: listId, collabs: { $all: [rawData.authorId] } },
      { $push: { items: rawData } },
      { new: true }
    );
    if (!data) {
      throw new ApiError(
        "Invalid ID or you do not have access to this list",
        400
      );
    }
    return data;
  }

  async editList(id, userId, update) {
    let data = await _repository.findOneAndUpdate(
      { _id: id, collabs: { $all: [userId] } },
      update,
      { new: true }
    );
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this list",
        400
      );
    }
    return data;
  }

  async deleteList(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authors: { $all: [userId] }
    });
    if (!data) {
      throw new ApiError(
        "Invalid Id or you do not have access to this list",
        400
      );
    }
  }

  async removeItem(payload) {
    let data = await _repository.findOneAndUpdate(
      { _id: payload.listId, collabs: { $all: [payload.userId] } },
      { $pull: { items: { _id: payload.itemId } } },
      { new: true }
    );
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this trip", 400);
    }
  }
}

const listService = new ListService();
export default listService;
