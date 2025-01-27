import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

async function dbConnection() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}${DB_NAME}`
    );
    console.log(
      "Data base connection successfull!!",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Database connection error : ", error);
    process.exit(1);
  }
}

export { dbConnection };
