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
    authorId: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Meal;
