const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const Announcement = require('./models/announcement');

const app = express();

mongoose.connect("mongodb+srv://thushaltk:Fq7N3Qpy16hdLezH@cluster0.tivsh.mongodb.net/hrisItp?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection Failed');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

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


app.get("/api/announcements", (req, res, next) => {
  Announcement.find()
    .then(documents => {
      res.status(200).json({
        message: 'Announcements fetched successfully',
        announcements: documents
      });
    });
});

app.delete("/api/announcements/:id", (req, res, next) => {
  Announcement.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Announcement Deleted"
    });
  });

});

module.exports = app;
