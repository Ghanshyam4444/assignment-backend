const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  question1: [
    {
      description: { type: String, default: "" },
      categories: { type: [String], default: [""] },
      items: {
        type: [{ text: String, belongsTo: String }],
      },
      points: { type: Number, default: 0 },
    },
  ],
  question2: [
    {
      answers: { type: [String], default: [] },
      sentence: { type: String, default: "" },
      preview: { type: String, default: "" },
      points: { type: Number, default: 0 },
    },
  ],
  question3: [
    {
      passageText: { type: String, default: "" },
      pic: { type: String, default: "" },
      questions: [
        {
          questionText: { type: String, default: "" },
          options: { type: [String], default: ["", "", "", ""] },
          correctOption: { type: Number, default: null },
        },
      ],
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  submittedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
