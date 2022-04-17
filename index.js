import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import salesRouter from "./controllers/sales.js";

const app = express();
const PORT = process.env.PORT || 4000;
const url = process.env.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to MongoDB"))
  .catch((error) => console.log("error", error));

app.use("/", salesRouter);

app.listen(PORT, () => console.log(`listening to port ${PORT}`));
