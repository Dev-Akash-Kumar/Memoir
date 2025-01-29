const express = require("express");
const {
  getAllJournal,
  createJournal,
  getJournalByID,
  updateJournal,
  deleteJournal,
} = require("../controllers/journal");

// router object
const router = express.Router();

// routes

// list all journal
router.get("/list", getAllJournal);

// create new journal
router.post("/create", createJournal);

// get journal by id
router.get("/getRecord/:id", getJournalByID);

// update journal by id
router.put("/update/:id", updateJournal);

// delete journal by id
router.delete("/delete/:id", deleteJournal);

module.exports = router;
