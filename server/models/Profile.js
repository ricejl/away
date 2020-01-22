import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Profile = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String },
    imgURL: { type: String },
    authorId: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// NOTE Future problem: cascade on delete

export default Profile;
