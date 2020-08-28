const express = require("express");
const router = express.Router();

const Announcement = require('../models/announcement');

//Add Announcements
router.post("", (req, res, next) => {
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

//Reteive Announcements
router.get("", (req, res, next) => {
  Announcement.find()
    .then(documents => {
      res.status(200).json({
        message: 'Announcements fetched successfully',
        announcements: documents
      });
    });
});

//Delete Announcemets
router.delete("/:id", (req, res, next) => {
  Announcement.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Announcement Deleted"
    });
  });

});

module.exports = router;
