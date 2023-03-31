import { ConnectOptions, connect } from "mongoose";
import Rol from "../models/rol.model";
import { MONGO_URI } from "../libs/config";
import { ServerApiVersion } from "mongodb";
const db = async () => {
  try {
    const database = await connect(MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: { w: 'majority' },
      serverApi: ServerApiVersion.v1
    } as ConnectOptions)
    console.log(`Datbase is connected in ${database.connection.name}`);
    // Buscamos los roles existentes
    const count = await Rol.countDocuments()
    if (count > 1) return;
    // Si no existen los roles, los creamos
    const roles = [{ rol: "admin" }, { rol: "user" }, { rol: "dev" }];
    await Rol.create(roles);
    console.log("Roles created successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default db;
