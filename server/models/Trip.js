import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Trip = new Schema(
  {
    title: { type: String, required: true },
    authorId: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// NOTE Future problem: cascade on delete

export default Trip;
