import { Model, Document } from "mongoose"

export interface IUser extends Document{
  name : string
  email : string 
  password: string
  active: boolean
  rolId : any
}

export interface IEncrypt {
  
}

export interface IDecrypt{
  
}

export interface IUserModel extends Model<IUser> {
  encryptPassword(password:string) : String;
  decryptPassword(passowrd:string, encryptPassword:string) : Boolean;
}