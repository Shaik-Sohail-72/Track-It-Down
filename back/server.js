var express = require("express");
const app = express();

require("dotenv").config({ path: "../.env" });
const cors = require("cors");

const port =  5000;
const cookie_parser = require("cookie-parser");
const mongoose = require("mongoose");
const routes = require("./routes/auth");
const category = require("./routes/category");
const passport = require("passport");
var path = require("path");
app.use(cors());

app.enable("trust proxy");

app.use(express.static(path.join(__dirname, "uploads")));
app.use(cookie_parser());

app.use(express.json());

const DB =
  "mongodb+srv://tid_iomp:tid_iomp@cluster0.rcrczdw.mongodb.net/tidiomp?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

app.use("/", routes);
app.use("/", category);

app.listen(port, () => console.log(`Listening to port ${port} !!`));
