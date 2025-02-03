const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "journal",
  }
);

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
