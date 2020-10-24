const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const announcementsRoutes = require("./routes/announcements");
const employeesRoutes = require("./routes/employees");
const quickLeavesRoutes = require("./routes/quickLeave");
const longLeavesRoutes = require("./routes/longLeave");
const equipmentRoutes = require("./routes/equipments");
const projectRoutes = require("./routes/projects");
const payrollRoute = require("./routes/payroll");
const salaryRoute = require("./routes/salary");
const trainingProgramsRoute = require("./routes/trainingPrograms");
const vehicleRoute = require("./routes/vehicle");
const attendanceRoutes = require("./routes/attendance");
const advancePayment = require("./routes/advancePayment");
const login = require("./routes/auth");

const app = express();

mongoose.set("useFindAndModify", false); //Deprecated warnings
//MongoDB connections
mongoose
  .connect(
    "mongodb+srv://thushaltk:Fq7N3Qpy16hdLezH@cluster0.tivsh.mongodb.net/hrisItp?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CROS definitions
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-width, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/announcements", announcementsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/payroll", payrollRoute);
app.use("/api/salary", salaryRoute);
app.use("/api/quickLeaves", quickLeavesRoutes);
app.use("/api/longLeaves", longLeavesRoutes);
app.use("/api/trainingPrograms", trainingProgramsRoute);
app.use("/api/vehicles", vehicleRoute);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/advancePayment", advancePayment);
app.use("/api/login", login);
module.exports = app;
