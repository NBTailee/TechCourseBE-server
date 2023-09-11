// vars
const port = process.env.PORT || 8000;

// Libraries import
const express = require("express");
const cors = require("cors")();
const morgan = require("morgan");
require("dotenv").config();
const app = express();

// other import
const connect = require("./db/connect");
const authRouter = require("./routes/auth");
// Apply middlewares
app.use(cors);
app.use(morgan("tiny"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Routing
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Connecting to Mongodb Database
const connectdb = () => {
  try {
    connect(process.env.MONGODB_CONNECT_URL);
    console.log("Connect to database successfully");
  } catch (err) {
    console.log(err);
  }
};
app.listen(port, () => {
  console.log(`running in ${port}`);
});
connectdb();
