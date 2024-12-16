const User = require("../models/user");
const Question = require("../models/question");
const Answer = require("../models/answer");

const getallQuestions = async (req, res, next) => {
  try {
    const totalQuestions = await Question.find().populate("createdBy", "name");

    const questionsWithCreatedBy = totalQuestions.map((question) => ({
      questionId: question._id,
      createdByName: question.createdBy?.name || "Unknown",
    }));

    res.status(200).json({
      questions: questionsWithCreatedBy,
    });
  } catch (error) {
    next(error);
  }
};

const findQuestionDetails = async (req, res, next) => {
  try {
    const id = req.params.id;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }
    console.log(question);
    res.status(200).json({
      msg: "Question retrieved successfully",
      question,
    });
  } catch (error) {
    next(error);
  }
};

const submitResponses1 = async (req, res, next) => {
  try {
    const data = req.body;
    const responses = data.responses;
    const userid = req.id;
    const questionid = data.id;

    const question1Items = [];

    const groupedResponses = [];

    for (const key in responses) {
      const [index, belongsTo] = key.split("-");

      let group = groupedResponses.find((item) => item.index == index);

      if (!group) {
        group = { index: Number(index), answers: [] };
        groupedResponses.push(group);
      }

      group.answers.push({
        belongsTo: belongsTo,
        answer: responses[key],
      });
    }

    groupedResponses.forEach((group) => {
      question1Items.push({
        questionnumber: group.index + 1,
        items: group.answers.map((answer) => ({
          text: answer.answer,
          belongsTo: answer.belongsTo,
        })),
      });
    });

    const newAnswer = new Answer({
      question1: question1Items,
      SubmittedBy: userid,
      Question: questionid,
    });

    const savedAnswer = await newAnswer.save();

    await User.findByIdAndUpdate(
      userid,
      {
        $addToSet: {
          submittedQuestions: questionid,
          answers: savedAnswer._id,
        },
      },
      { new: true }
    );

    await Question.findByIdAndUpdate(
      questionid,
      {
        $addToSet: {
          answers: savedAnswer._id,
          submittedBy: userid,
        },
      },
      { new: true }
    );

    res.status(200).json({
      answerId: savedAnswer._id,
    });
  } catch (error) {
    next(error);
  }
};

const submitResponses2 = async (req, res, next) => {
  try {
    const data = req.body;
    const responses = data.responses;
    const answerId = data.newAnswerId;

    const question2Items = [];

    for (const key in responses) {
      const [index, belongsTo] = key.split("-");

      const questionNumber = Number(index) + 1;

      let group = question2Items.find(
        (item) => item.questionnumber === questionNumber
      );

      if (!group) {
        group = {
          questionnumber: questionNumber,
          answers: [],
        };
        question2Items.push(group);
      }

      group.answers.push({
        text: responses[key],
        belongsTo: belongsTo,
      });
    }

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ msg: "Answer not found" });
    }

    answer.question2 = question2Items;

    console.log(answer);
    await answer.save();

    res
      .status(200)
      .json({ msg: "Successfully updated the responses in question2" });
  } catch (error) {
    next(error);
  }
};

const submitResponses3 = async (req, res, next) => {
  try {
    const data = req.body;
    const responses = data.responses;
    const newAnswerId = data.newAnswerId;
    console.log(data);

    const optionMap = {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
    };

    const question3Items = [];

    for (const key in responses) {
      const [passageNumber, questionNumber] = key.split("_").map(Number);

      const passageNumberAdjusted = passageNumber + 1;
      const questionNumberAdjusted = questionNumber + 1;

      let passageGroup = question3Items.find(
        (item) => item.passageNumber === passageNumberAdjusted
      );

      if (!passageGroup) {
        passageGroup = { passageNumber: passageNumberAdjusted, answers: [] };
        question3Items.push(passageGroup);
      }

      passageGroup.answers.push({
        questionNumber: questionNumberAdjusted,
        correctOption: optionMap[responses[key]],
      });
    }

    const result = await Answer.findByIdAndUpdate(
      newAnswerId,
      { question3: question3Items },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ msg: "Answer document not found" });
    }

    console.log("Updated Answer Document:", result);

    res.status(200).json({ msg: "Successfully updated the responses", result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getallQuestions,
  findQuestionDetails,
  submitResponses1,
  submitResponses2,
  submitResponses3,
};
