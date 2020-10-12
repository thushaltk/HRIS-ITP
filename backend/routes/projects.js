const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/project");

router.get("/", (req, res, next) => {
  Project.find()
    .populate("supervisor")
    .populate("consultant")
    .populate("employees")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Project.findById(req.params.id)
    .populate("supervisor")
    .populate("consultant")
    .populate("employees")
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", async (req, res, next) => {
  try {
    delete req.body._id;
    // const employees = req.body.employees.map(el=>el._id)

    const project = new Project({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      projectId: req.body.projectId,
      location: req.body.location,
      startDate: req.body.startDate,
      duration: req.body.duration,
      clientName: req.body.clientName,
      clientPhone: req.body.clientPhone,
      clientAddress: req.body.clientAddress,
      consultant: req.body.supervisor,
      supervisor: req.body.consultant,
      employees: req.body.employees,
      progress: req.body.progress,
    });
    const result = await project.save();
    Project.findById(result._id)
      .populate("supervisor")
      .populate("consultant")
      .populate("employees")
      .exec()
      .then((docs) => {
        res.status(201).json(docs);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", (req, res, next) => {
  Project.findByIdAndRemove(req.params.id)
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/", (req, res, next) => {
  Project.updateOne({ _id: req.body._id }, req.body)
    .exec()
    .then((response) => {
      Project.findById(req.body._id)
        .populate("supervisor")
        .populate("consultant")
        .populate("employees")
        .exec()
        .then((docs) => {
          res.status(201).json({
            project: docs,
            res: response,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

module.exports = router;
