const mongoose = require("mongoose");

const AnswerSchema = mongoose.Schema({
  question1: [
    {
      questionnumber: { type: Number, required: true },
      items: [
        {
          text: { type: String }, // Text of the answer
          belongsTo: { type: String }, // Name of the item (e.g., 'grapes', 'apple')
        },
      ],
    },
  ],
  question2: [
    {
      questionnumber: { type: Number, required: true },
      answers: [
        {
          text: { type: String }, // The text answer
          belongsTo: { type: String }, // The item name (e.g., '0-0', '0-1', '1-0', etc.)
        },
      ],
    },
  ],
  question3: [
    {
      passageNumber: { type: Number, required: true },
      answers: [
        {
          questionNumber: { type: Number, required: true },
          correctOption: {
            type: String,
            enum: ["A", "B", "C", "D"],
          },
        },
      ],
    },
  ],
  SubmittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
});

const Answer = mongoose.model("Answer", AnswerSchema);
module.exports = Answer;
