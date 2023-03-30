import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authorId : {
    type : Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  author : {
    type: String,
    required: true
  },
  done : {
    type: Boolean,
    default: false
  }
},{
  timestamps: true,
  versionKey: false
})

export default model("Posts", PostSchema)