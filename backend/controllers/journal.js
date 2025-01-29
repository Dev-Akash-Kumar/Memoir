const Journal = require("../model/journal");
const mongoose = require("mongoose");

// list all journal
const getAllJournal = async (req, res) => {
  try {
    const data = await Journal.find({});
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No Data",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Journal List",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      message: "Error in list API",
      error,
    });
  }
};

// create a journal
const createJournal = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(404).send({
        success: false,
        message: "Missing or Invalid fields",
      });
    }
    const newData = new Journal({
      title,
      content,
    });
    const data = await newData.save();
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Record Entry Failed",
      });
    }
    res.status(200).send({
      success: true,
      message: "Record Created",
      data,
    });
  } catch (error) {
    consol.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create journal API",
      error,
    });
  }
};

// get journal by id
const getJournalByID = async (req, res) => {
  try {
    const ID = req.params.id;
    if (!ID || !mongoose.Types.ObjectId.isValid(ID)) {
      return res.status(404).send({
        success: false,
        message: "Missing or Invalid id",
      });
    }
    const data = await Journal.findById(ID);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No Data",
      });
    }
    res.status(200).send({
      success: true,
      message: "Journal Record",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Journal By id API",
      error,
    });
  }
};

// update journal by id
const updateJournal = async (req, res) => {
  try {
    const ID = req.params.id;
    if (!ID || !mongoose.Types.ObjectId.isValid(ID)) {
      return res.status(404).send({
        success: false,
        message: "Missing or Invalid id",
      });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(404).send({
        success: false,
        message: "Missing or Invalid fields",
      });
    }
    const obj = {
      $set: { title: req.body.title, content: req.body.content },
    };
    const updateData = await Journal.findOneAndUpdate({ _id: ID }, obj);
    if (!updateData) {
      return res.status(404).send({
        success: false,
        message: "Update Record Failed",
      });
    }
    res.status(200).send({
      success: true,
      message: "Record Updated",
      updateData,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update By id API",
      error,
    });
  }
};

// delete journal by id
const deleteJournal = async (req, res) => {
  try {
    const ID = req.params.id;
    if (!ID || !mongoose.Types.ObjectId.isValid(ID)) {
      return res.status(404).send({
        success: false,
        message: "Missing or Invalid id",
      });
    }
    const deleteData = await Journal.deleteOne({ _id: ID });
    if (deleteData.deletedCount == 0) {
      return res.status(404).send({
        success: false,
        message: "Delete Record Failed",
      });
    }
    res.status(200).send({
      success: true,
      message: "Record Deleted",
      deleteData,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete By id API",
      error,
    });
  }
};

module.exports = {
  getAllJournal,
  createJournal,
  getJournalByID,
  updateJournal,
  deleteJournal,
};
