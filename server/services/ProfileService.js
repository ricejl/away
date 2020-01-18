import mongoose from "mongoose";
import Profile from "../models/Profile";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Profile", Profile);

class ProfileService {
  async getByProfileId(id, userId) {
    let data = await _repository.findOne({ _id: id, authorId: userId });
    if (!data) {
      throw new ApiError("Invalid Id or you do not own this profile", 400);
    }
    return data;
  }

  async getProfileByUserId(userId) {
    let data = await _repository.findOne({ authorId: userId });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this profile or profile doesn't exist", 400)
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
      throw new ApiError("Invalid Id or you do not own this profile", 400);
    }
    return data;
  }

  async delete(id, userId) {
    let data = await _repository.findOneAndRemove({
      _id: id,
      authorId: userId
    });
    if (!data) {
      throw new ApiError("Invalid Id or you do not own this profile", 400);
    }
  }
}

const profileService = new ProfileService();
export default profileService;
