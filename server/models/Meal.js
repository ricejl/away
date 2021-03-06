import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const FoodItem = new Schema({
  profileId: { type: ObjectId, ref: "Profile", required: true },
  foodName: { type: String, required: true },
  details: { type: String }
});

const Meal = new Schema(
  {
    title: { type: String, required: true },
    foodItems: [FoodItem],
    details: { type: String },
    tripId: { type: ObjectId, ref: "Trip", required: true },
    authors: [{ type: ObjectId, ref: "User", required: true }],
    collabs: [{ type: ObjectId, ref: "User" }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Meal;
