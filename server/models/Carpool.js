import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Carpool = new Schema({
  name: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  occupants: [{ type: ObjectId, ref: "Profile" }],
  description: { type: String },
  authorId: { type: ObjectId, ref: "User", required: true },
  tripId: { type: ObjectId, ref: "Trip", required: true },
  collabs: [{ type: ObjectId, ref: "User" }]
});
export default Carpool;
