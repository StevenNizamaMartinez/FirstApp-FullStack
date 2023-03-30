import { Schema, model } from "mongoose";

const RolSchema = new Schema({
  rol: {
    type: String,
    required: true
  }
},{
  timestamps: true,
  versionKey :false
})

export default model("Rol", RolSchema)