import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Destination = new Schema({
  location: { type: String, required: true },
  authorId: { type: ObjectId, ref: "User", required: true }
});

const Carpool = new Schema({
  name: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  occupants: [{ type: ObjectId, ref: "Profile" }],
  description: { type: String },
  authorId: { type: ObjectId, ref: "User", required: true }
});

const Trip = new Schema(
  {
    title: { type: String, required: true },
    authorId: { type: ObjectId, ref: "User", required: true },
    destinations: [Destination],
    carpools: [Carpool]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Trip;
