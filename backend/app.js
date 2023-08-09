const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const renderRouter = require("./routes/renderRouter");
const productRouter=require("./routes/productRouter");
// const paymentRouter=require("./routes/paymentRouter");
const staffRouter=require("./routes/staffRouter");
const orderRouter=require("./routes/orderRouter");
const notifyRouter=require("./routes/notifyRouter");
const dashboardRouter=require("./routes/dashboardRouter");
const mailRouter=require("./routes/mailRouter");
require("dotenv").config();
const Auth = require("./routes/auth");

// const path = require("path");
const cors = require("cors");
const MongoUrl = "mongodb://localhost:27017/e-commerce";

const app = express();
const port = process.env.PORT || 4000;

// Database Connection
mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error occurred in db connection");
});
db.once("open", () => {
  console.log("Connected");
});

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "sessionSecret",
  resave: false,
  saveUninitialized: true
}));

app.use(cors());
// Run Route Files APIs
app.use("/", Auth);
app.use("/", renderRouter);
app.use("/",productRouter)
app.use("/", staffRouter);
app.use("/", orderRouter);
app.use("/", notifyRouter);
app.use("/", dashboardRouter);
app.use("/", mailRouter);
// app.use("/", paymentRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
