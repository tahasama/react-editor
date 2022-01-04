const productRoute = require("./routes/product");
const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://taha-mongo:maatof24@cluster0.9mg2o.mongodb.net/editor?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/project", productRoute);

app.listen(5000, () => {
  console.log("Backend server is running!");
});
