import express from "express";
import bodyParser from "body-parser";
import Logger from "./core/logger.js";
import listEndpoints from "express-list-endpoints";
import { corsHandler } from "./core/corsHandler.js";
import { NotFoundError } from "./core/apiErrors.js";
import { globalErrorHandler } from "./core/errorHandler.js";
import routesV1 from "./routes/v1/index.js";
// import { connectToPostgres } from "../src/database/postgres/models/index.js";
// node process start error check
process.on("uncaughtException", (e) => {
  Logger.error(e);
});

const app = express();

// MIDDLEWARE
app.use(corsHandler());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use("/api", routesV1);

// connectToPostgres.sequelize.sync({ force: true }).then(() => {
//   app.listen(port, () => console.log("server is running: " + port));
//   app.on("error", (error) =>
//     console.info(" ❌ Server is not running due to : ", error)
//   );
// });

app.use((req, res, next) => {
  // handle routes not found
  // we can throw the error here as we are not using an async function
  throw new NotFoundError(`Requested URL ${req.path} not found!`);
});

// ERROR HANDLERS
app.use(globalErrorHandler);

console.log(listEndpoints(app));

export default app;
