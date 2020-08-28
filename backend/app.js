const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const announcementsRoutes = require("./routes/announcements");
const employeesRoutes = require("./routes/employees");


const app = express();

//MongoDB connections
mongoose.connect("mongodb+srv://thushaltk:Fq7N3Qpy16hdLezH@cluster0.tivsh.mongodb.net/hrisItp?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection Failed');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//CROS definitions
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-width, Content-Type, Accept"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/announcements", announcementsRoutes);
app.use("/api/employees", employeesRoutes);

module.exports = app;
