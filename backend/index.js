const express = require("express");
require("dotenv").config();
const db = require("./config/connectionDB");
const adminRoute = require("./routes/adminRoute");
const bodyParser = require("body-parser");
const cors = require('cors');
const candidateRoute = require("./routes/candidateRoute");

const app = express();

app.use(cors({origin:"hrms-management-7rf1owieu-ramdas-developers-projects.vercel.app"}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Port = process.env.PORT || 8001;

app.use('/admin',adminRoute);
// app.use('/candidate',candidateRoute)

app.use("/get", (req, res) => {
  res.json("data");
  console.log("hello world");
});

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});

