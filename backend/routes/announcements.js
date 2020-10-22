const express = require("express");
const announcement = require("../models/announcement");
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

//Get Announcement by ID
router.get("/:id", (req, res, next) => {
  Announcement.findById(req.params.id)
  .then(documents => {
    if(documents){
      res.status(200).json({
        message: 'Announcement fetched successfully',
        announcements: documents
      });
    }else{
      res.status(404).json({message: 'Announcement not found'});
    }
  });
});

//Update Announcements
router.put("/:id", (req, res, next) => {
  const announcement = new Announcement({
      _id: req.body.id,
      title: req.body.title,
      date: req.body.date,
      content: req.body.content,
      priority: req.body.priority,
      validity: req.body.validity
  });
  Announcement.updateOne({_id: req.params.id}, announcement).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful"})
  })
});


//Delete Announcemets
router.delete("/:id", (req, res, next) => {
  Announcement.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Announcement Deleted"
    });
  });

});

module.exports = router;
