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



////////////////////

// questionRouter.get("/testOption", async (req, res) => {
//   try {
//     const { userID} = req.body.userID;
//     const examData = await examDataModel.findOne({ studentId:req.body.userID });
// console.log(examData)
//     if (!examData) {
//       return res.status(404).json({ error: "No exam data found for the student" });
//     }

//     // Initialize totalMarks and countOf5Pointers
//     let totalMarks = 0;
//     let countOf5Pointers = 0;

//     // Iterate over each answer
//     examData.answers.forEach((answer) => {
//       const selectedOption = answer.selectedOption;

//       const question = questions.find((q) => q.sort_order === answer.sort_order);
//       if (!question) {
//         return res.status(404).json({ error: "Question not found for the answer" });
//       }
//       const selectedOptionMark = question.options.find((opt) => opt.option === selectedOption)?.mark;

//       // Update totalMarks
//       if (selectedOptionMark) {
//         totalMarks += selectedOptionMark;
//       }

//       // Update countOf5Pointers if applicable
//       if (selectedOptionMark === 5) {
//         countOf5Pointers++;
//       }
//     });

//     ///////////////
//     let totalQuestionTime = 0;
//     let totalOptionTime = 0;
//     let MentalProcessingSpeed;
// examData.answers.forEach((answer) => {
//   totalQuestionTime += answer.questionReadTime;
//   totalOptionTime += answer.optionReadTime;
// });
// totalTime=totalOptionTime+totalQuestionTime
// MentalProcessingSpeed=(totalTime/questions.length).toFixed(2)

//   const maxMarks = questions.length * 5;
//   const prideAccuracyScorePercentage = (totalMarks / maxMarks) * 100;
 
//   const totalCountOf5Pointers = countOf5Pointers;
//   //console.log(countOf5Pointers);
//   const ratio = countOf5Pointers / questions.length;

//   // Calculate Consistency Ratio Score
//   if (ratio === 0) {
//     consistencyRatioScore = `1:0`; // To handle division by zero
//   } else {
//     consistencyRatioScore = `1:${(1 / ratio).toFixed(2)}`;
//   }
  
//   const mpiScore = (prideAccuracyScorePercentage + +MentalProcessingSpeed + 1.5) ;

//   // Convert percentage to a number between 1 and 10
//   const convertedMpiScore = Math.min(Math.max(mpiScore / 10, 1), 10);

//     res.status(200).json({ totalMarks, countOf5Pointers,prideAccuracyScorePercentage, consistencyRatioScore,totalTime,MentalProcessingSpeed,convertedMpiScore });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

questionRouter.get("/testOption", async (req, res) => {
  try {
    const { userID } = req.body;

    // Fetch exam data for the student
    const examData = await examDataModel.findOne({ studentId: userID });
    if (!examData) {
      return res.status(404).json({ error: "No exam data found for the student" });
    }

    let totalMarks = 0;
    let countOf5Pointers = 0;
    let totalQuestionTime = 0;
    let totalOptionTime = 0;
    let allottedTime=30
    // Iterate over each answer and calculate metrics
    examData.answers.forEach((answer) => {
      const question = questions.find((q) => q.sort_order === answer.sort_order);
      if (!question) {
        return res.status(404).json({ error: "Question not found for the answer" });
      }

      const selectedOptionMark = question.options.find((opt) => opt.option === answer.selectedOption)?.mark;

      if (selectedOptionMark) {
        totalMarks += selectedOptionMark;
      }

      if (selectedOptionMark === 5) {
        countOf5Pointers++;
      }

      totalQuestionTime += answer.questionReadTime;
      totalOptionTime += answer.optionReadTime;
    });

    // Calculate total time and mental processing speed
    const totalTime = totalOptionTime + totalQuestionTime;
    const MentalProcessingSpeed = (totalTime / questions.length).toFixed(2);

    const maxMarks = questions.length * 5;
    const prideAccuracyScorePercentage = (totalMarks / maxMarks) * 100;

    const ratio = countOf5Pointers / questions.length;
    const percentageOfCountOf5Pointer=(countOf5Pointers/questions.length)*100
    const consistencyRatioScore = ratio === 0 ? `1:0` : `1:${(1 / ratio).toFixed(2)}`;

    const mpiScore = (prideAccuracyScorePercentage + +MentalProcessingSpeed + percentageOfCountOf5Pointer)/3;
    const convertedMpiScore = Math.min(Math.max(mpiScore / 10, 1), 10).toFixed(2);

    const equatedTimeScore=(2*allottedTime*questions.length)-totalTime //E
    const A=totalTime/(allottedTime*questions.length) //A
    const y=equatedTimeScore/A //E/A
    const mentalProductivityCapacity=prideAccuracyScorePercentage*y
    
    res.status(200).json({
      totalMarks,
      countOf5Pointers,
      prideAccuracyScorePercentage,
      consistencyRatioScore,
      totalTime,
      MentalProcessingSpeed,
      convertedMpiScore,
      mentalProductivityCapacity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = {
  questionRouter,
};


