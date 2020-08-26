const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const Announcement = require('./models/announcement');
const Employee = require('./models/employee')

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//Add Announcements
app.post("/api/announcements", (req, res, next) => {
  const announcement = new Announcement({
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    priority: req.body.priority,
    validity: req.body.validity
  });
  announcement.save();
  res.status(201).json({
    message: 'Announcement added successfully'
  });
});

//Add Employees
app.post("/api/employees", (req, res, next) => {
  const employee = new Employee({
    fullName: req.body.fullName,
    dob: req.body.dob,
    nic: req.body.nic,
    gender: req.body.gender,
    address: req.body.address,
    cnumber: req.body.cnumber,
    email: req.body.email,
    empDes: req.body.empDes,
    doj: req.body.doj,
    comment: req.body.comment
  });
  employee.save();
  res.status(201).json({
    message: 'Employee added successfully'
  });
});

//Reteive Announcements
app.get("/api/announcements", (req, res, next) => {
  Announcement.find()
    .then(documents => {
      res.status(200).json({
        message: 'Announcements fetched successfully',
        announcements: documents
      });
    });
});

//Reteive Employees
app.get("/api/employees", (req, res, next) => {
  Employee.find()
    .then(documents => {
      res.status(200).json({
        message: 'Employees fetched successfully',
        employees: documents
      });
    });
});

//Reteive Employees by designation
app.get("/api/employees/:empDes", (req, res, next) => {
  Employee.find({empDes: req.params.empDes})
    .then(documents => {
      res.status(200).json({
        message: 'Employees fetched successfully by designation',
        employees: documents
      });
    });
});

//Delete Announcemets
app.delete("/api/announcements/:id", (req, res, next) => {
  Announcement.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Announcement Deleted"
    });
  });

});

//Delete Employees
app.delete("/api/employees/:id", (req, res, next) => {
  Employee.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Employee Deleted"
    });
  });

});

module.exports = app;
