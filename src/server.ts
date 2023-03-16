import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource
  .initialize()
  .then(() => {
    console.log("database connected");

    app.listen(3000, () => {
      console.log("server on");
    });
  })
  .catch((error) => {
    console.log(error);
  });
