import { Schema,model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserModel } from "../types";

const UserSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  rolId : {
    type : Schema.Types.ObjectId,
    required:true,
    ref : "Rol"
  },
  active : {
    type : Boolean,
    required : true
  }
},{
  timestamps : true,
  versionKey : false
})

UserSchema.statics.encryptPassword =  async (password:string) : Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const passwordEncrypt = await bcrypt.hash(password,salt)
  return passwordEncrypt
}

UserSchema.statics.decryptPassword = async (password:string, encryptPassword:string) :Promise<boolean> => {
  const decode = await bcrypt.compare(password, encryptPassword)
  return decode
}

export default model<IUser,IUserModel>("User", UserSchema)