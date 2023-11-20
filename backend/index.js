import express from "express";
import mongoose from "mongoose";
import { PORT, MONGODB_URL } from "./config.js";
import bookRouter from "./routers/bookRoutes.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(cors());
app.use("/books", bookRouter);
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("DataBase is connect"))
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`App is listen at : ${PORT}`);
});
