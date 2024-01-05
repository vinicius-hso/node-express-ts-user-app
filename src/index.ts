import "./config/dotenv"; // * config
import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";

import routes from "./routes";

const PORT = process.env.NODE_ENV || 5000;
const app: Express = express();

// * json
app.use(express.json());

// * headers
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  next();
});

// * cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  })
);

// * routes
app.use(routes);

// * listen
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
