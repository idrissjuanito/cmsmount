import mongoose from "mongoose";
import config from "../config";

export async function connect() {
  try {
    const con = await mongoose.connect(config.mongoUrl);
    console.log("Database connection was successfull");
    return con;
  } catch (err) {
    console.log(err);
  }
}

export default connect;
