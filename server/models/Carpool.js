import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Occupant = new Schema({
  profileId: { type: ObjectId, ref: "Profile", required: true }
});

const Carpool = new Schema({
  name: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  occupants: [Occupant],
  description: { type: String },
  authorId: { type: ObjectId, ref: "User", required: true },
  tripId: { type: ObjectId, ref: "Trip", required: true },
  collabs: [{ type: ObjectId, ref: "User" }]
});
export default Carpool;
