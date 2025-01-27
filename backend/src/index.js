import { app } from "./app.js";
import { dbConnection } from "./database/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

dbConnection()
  .then(
    app.listen(process.env.PORT || 8000, () => {
      console.log(`App is listening on ${process.env.PORT || 8000}.`);
    })
  )
  .catch((error) => {
    console.log("Database connection failed!!");
  });
