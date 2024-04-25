import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./routes.js";

dotenv.config({});

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://organic-memory-g4x9qrvp77wxhv6x5-5173.app.github.dev",
    ],
    credentials: true,
  })
);

app.use(router);

export default app;
