import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Item = new Schema({
  profileId: { type: ObjectId, ref: "Profile", required: true },
  itemName: { type: String, required: true }
});

const List = new Schema({
  title: { type: String, required: true },
  items: [Item],
  tripId: { type: ObjectId, ref: "Trip", required: true },
  authorId: { type: ObjectId, ref: "User", required: true },
  collabs: [{ type: ObjectId, ref: "User" }]
});

export default List;
