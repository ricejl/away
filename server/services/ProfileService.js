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
      return { name: "First Last" };
    }
    return data;
  }

  async create(rawData) {
    //check if profile with user id exists
    let profile = await _repository.findOne({ authorId: rawData.authorId });
    if (!profile) {
      //if profile doesn't exist, create the profile
      let data = await _repository.create(rawData);
      return data;
    } else {
      throw new ApiError("Profile already exists", 400);
    }
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

  // NOTE Users should not be able to delete their profile

  //   async delete(id, userId) {
  //     let data = await _repository.findOneAndRemove({
  //       _id: id,
  //       authorId: userId
  //     });
  //     if (!data) {
  //       throw new ApiError("Invalid Id or you do not own this profile", 400);
  //     }
  //   }
}

const profileService = new ProfileService();
export default profileService;
