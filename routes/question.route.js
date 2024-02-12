const express = require("express");
const { examDataModel } = require("../model/question.model");
const { auth } = require("../middleware/auth.middleware");
const questionRouter = express.Router();
questionRouter.use(auth);
const questions = [
  {
    sort_order: 1,
    question_body:
      "Sen is good at imitating and acting the exact mannerism of anyone he sees for five minutes. what skill do you think he possesses that makes it easier for him to do it?",
    options: [
      { option: "Observational skills", mark: 5 },
      { option: "Memory Skills", mark: 2 },
      { option: "Acting Skills", mark: 1 },
      { option: "Leadership Skills", mark: 0 },
      { option: "All the above", mark: 0 },
      { option: "None of the above", mark: 0 },
    ],
  },
  {
    sort_order: 2,
    question_body:
      "Krishitha has the power of listening to the lessons, taught by her teacher, even for 5 hours. What skill do you think she possesses that makes it easier for her to do it?",
    options: [
      { option: "Concentration skills", mark: 5 },
      { option: "Collaboration Skills", mark: 2 },
      { option: "Language Skills", mark: 1 },
      { option: "Leadership Skills", mark: 0 },
      { option: "All the above", mark: 0 },
      { option: "None of the above", mark: 0 },
    ],
  },
  {
    sort_order: 3,
    question_body:
      "Nidhi is good at finding the difference in two picture games easily, what skill do you think she possess that makes it easier for her?",
    options: [
      { option: "Creative Skills", mark: 5 },
      { option: "Leadership Skills", mark: 2 },
      { option: "Attention Skills", mark: 1 },
      { option: "Emotional Skills", mark: 0 },
      { option: "All the above", mark: 0 },
      { option: "None of the above", mark: 0 },
    ],
  },
];

const studentAnswers = {};
let totalMarks = 0;
let countOf5Pointers = 0;

// questionRouter.post("/testOption", (req, res) => {
//   try {
//     const { sort_order, selected_option } = req.body;

//     const question = questions.find((q) => q.sort_order === sort_order);

//     if (!question) {
//       return res.status(400).json({ error: "Invalid question ID" });
//     }

//     const { options } = question;
//     const previousAnswer = studentAnswers[sort_order] || null;

//     let marks = 0;
//     let selectedOptionMark = 0;

//     options.forEach((opt) => {
//       if (opt.option === selected_option) {
//         selectedOptionMark = opt.mark;
//       }
//     });

//     if (selectedOptionMark === 5 && (!previousAnswer || previousAnswer !== 5)) {
//       countOf5Pointers++;
//     } else if (previousAnswer === 5 && selectedOptionMark !== 5) {
//       countOf5Pointers--;
//     }

//     if (selectedOptionMark) {
//       marks = selectedOptionMark;
//     }

//     if (studentAnswers[sort_order]) {
//       totalMarks -= studentAnswers[sort_order];
//     }

//     totalMarks += marks;

//     studentAnswers[sort_order] = marks;

//     res.status(200).json({ marks, totalMarks, countOf5Pointers });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// questionRouter.post("/", async (req, res) => {
//   try {
//     const { sort_order, selected_option} = req.body;
//     const {marks,totalMarks,countOf5Pointers}=req.body
//      const question = questions.find((q) => q.sort_order === sort_order);

//     // Save the data to MongoDB
//     const studentData = {
//       // Assuming we have studentId available in req.body
//       studentId: req.body.userID,
//       user: req.body.user,
//       attempts: [
//         {
//           attemptId: 1,
//           answers: [
//             {
//               questionId: question.questionId,
//               questionReadTime: question.questionReadTime,
//               optionReadTime: question.optionReadTime,
//               // totalQuestionTime: question.totalQuestionTime,
//             },
//           ],
//           //totalExamTime: question.totalExamTime, // Assuming you have totalExamTime available
//           // mark: marks,
//           // totalMarks: totalMarks,
//           // countOf5Pointers: countOf5Pointers,
//         },
//       ],
//     };

//     const examData = await examDataModel.create(studentData);

//     res.status(200).json({ examData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

questionRouter.post('/', async (req, res) => {
  try {
      const { answers } = req.body;

      const examDataOfStudent = {
        studentId: req.body.userID,
         user: req.body.user,
          answers
      };

      const savedExamData = await examDataModel.create(examDataOfStudent);

      res.status(200).json(savedExamData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


questionRouter.get("/getScore", (req, res) => {
  const maxMarks = questions.length * 5;
  const prideAccuracyScorePercentage = (totalMarks / maxMarks) * 100;
 
  const totalCountOf5Pointers = countOf5Pointers;
  console.log(countOf5Pointers);
  const ratio = countOf5Pointers / questions.length;

  // Calculate Consistency Ratio Score
  if (ratio === 0) {
    consistencyRatioScore = `1:0`; // To handle division by zero
  } else {
    consistencyRatioScore = `1:${(1 / ratio).toFixed(2)}`;
  }
  res.json({ totalMarks, prideAccuracyScorePercentage, consistencyRatioScore });
});

////////////////////

questionRouter.get("/testOption", async (req, res) => {
  try {
    const { userID} = req.body.userID;
//console.log(userID)
    // Fetch answers for the given student ID
    const examData = await examDataModel.findOne({ studentId:req.body.userID });
console.log(examData)
    if (!examData) {
      return res.status(404).json({ error: "No exam data found for the student" });
    }

    // Initialize totalMarks and countOf5Pointers
    let totalMarks = 0;
    let countOf5Pointers = 0;

    // Iterate over each answer
    examData.answers.forEach((answer) => {
      // Retrieve the selected option for the answer
      const selectedOption = answer.selectedOption;

      // Retrieve the question mark from the corresponding question
      const question = questions.find((q) => q.sort_order === answer.sort_order);
      if (!question) {
        return res.status(404).json({ error: "Question not found for the answer" });
      }
      const selectedOptionMark = question.options.find((opt) => opt.option === selectedOption)?.mark;

      // Update totalMarks
      if (selectedOptionMark) {
        totalMarks += selectedOptionMark;
      }

      // Update countOf5Pointers if applicable
      if (selectedOptionMark === 5) {
        countOf5Pointers++;
      }
    });

    ///////////////
    const maxMarks = questions.length * 5;
  const prideAccuracyScorePercentage = (totalMarks / maxMarks) * 100;
 
  const totalCountOf5Pointers = countOf5Pointers;
  console.log(countOf5Pointers);
  const ratio = countOf5Pointers / questions.length;

  // Calculate Consistency Ratio Score
  if (ratio === 0) {
    consistencyRatioScore = `1:0`; // To handle division by zero
  } else {
    consistencyRatioScore = `1:${(1 / ratio).toFixed(2)}`;
  }
  //res.json({ totalMarks, prideAccuracyScorePercentage, consistencyRatioScore });
    res.status(200).json({ totalMarks, countOf5Pointers,prideAccuracyScorePercentage, consistencyRatioScore });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = {
  questionRouter,
};


