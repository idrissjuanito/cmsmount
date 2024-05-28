import mongoose from "mongoose";
import config from "../config";

async function connect() {
  try {
    const con = await mongoose.connect(config.mongoUrl);
    console.log("Database connection was successfull");
    return con;
  } catch (err: any) {
    console.log(err.message);
    return err.message;
  }
}

export default connect;
