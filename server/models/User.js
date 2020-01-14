import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
let Schema = mongoose.Schema

const User = new Schema({
  name: { type: String, required: true },
  //every email must be unique on the database
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true }
}, { timestamps: true })

//schema.methods are used to add a method to a Model instance
User.methods.validatePassword = function (password, hash) {
  return bcrypt.compareSync(password, this.hash)
}

export default User