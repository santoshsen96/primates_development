const express = require("express");
const questionRouter = express.Router();
const questions = [
  {
    "sort_order": 1,
    "question_body": "Sen is good at imitating and acting the exact mannerism of anyone he sees for five minutes. what skill do you think he possesses that makes it easier for him to do it?",
    "options": [
      { "option": "Observational skills", "mark": 5 },
      { "option": "Memory Skills", "mark": 2},
      { "option": "Acting Skills", "mark": 1 },
      { "option": "Leadership Skills", "mark": 0 },
      { "option": "All the above", "mark": 0 },
      { "option": "None of the above", "mark": 0 }
    ],
    "right_option": 1
  },
  {
    "sort_order": 2,
    "question_body": "Krishitha has the power of listening to the lessons, taught by her teacher, even for 5 hours. What skill do you think she possesses that makes it easier for her to do it?",
    "options": [
      { "option": "Concentration skills", "mark": 5 },
      { "option": "Collaboration Skills", "mark": 2},
      { "option": "Language Skills", "mark": 1 },
      { "option": "Leadership Skills", "mark": 0 },
      { "option": "All the above", "mark": 0 },
      { "option": "None of the above", "mark": 0 }
    ],
    "right_option": 1
  },
  {
    "sort_order": 3,
    "question_body": "Nidhi is good at finding the difference in two picture games easily, what skill do you think she possess that makes it easier for her?",
    "options": [
      { "option": "Creative Skills", "mark": 5 },
      { "option": "Leadership Skills", "mark": 2},
      { "option": "Attention Skills", "mark": 1 },
      { "option": "Emotional Skills", "mark": 0 },
      { "option": "All the above", "mark": 0 },
      { "option": "None of the above", "mark": 0 }
    ],
    "right_option": 1
  }
];

const studentAnswers = {};
let totalMarks = 0;
let countOf5Pointers = 0;

// questionRouter.post("/", (req, res) => {
//   const { sort_order, selected_option } = req.body;

//   const question = questions.find((q) => q.sort_order === sort_order);

//   if (!question) {
//     return res.status(400).json({ error: "Invalid question ID" });
//   }

//   const { right_option } = question;
//   let marks;

//   if (selected_option === right_option) {
//     marks = 5;
//     // Increment countOf5Pointers only if the selected option is the right option
//     if (selected_option == right_option) {
//       countOf5Pointers++;
//     }
//   } else if (selected_option >= 1 && selected_option <= 4) {
//     marks = 5 - Math.abs(selected_option - right_option);
//   } else {
//     marks = 0;
//   }

//   if (studentAnswers[sort_order]) {
//     totalMarks -= studentAnswers[sort_order];
//   }

//   totalMarks += marks;

//   // Decrement countOf5Pointers if the previous selected option was the right option
//   if (studentAnswers[sort_order] === 5) {
//     countOf5Pointers--;
//   }

//   studentAnswers[sort_order] = marks;

//   res.json({ marks, totalMarks, countOf5Pointers });
// });
questionRouter.post("/testOption", (req, res) => {
  const { sort_order, selected_option } = req.body;

  const question = questions.find((q) => q.sort_order === sort_order);

  if (!question) {
    return res.status(400).json({ error: "Invalid question ID" });
  }

  const { options } = question;
  const previousAnswer = studentAnswers[sort_order] || null 

  let marks = 0;
  let selectedOptionMark = 0;

  options.forEach((opt) => {
    if (opt.option === selected_option) {
      selectedOptionMark = opt.mark;
    }
  });

 
  if (selectedOptionMark === 5 && (!previousAnswer || previousAnswer !== 5)) {
    countOf5Pointers++;
  } else if (previousAnswer === 5 && selectedOptionMark !== 5) {
    countOf5Pointers--;
  }

  if (selectedOptionMark) {
    marks = selectedOptionMark;
  }

  if (studentAnswers[sort_order]) {
    totalMarks -= studentAnswers[sort_order];
  }

  totalMarks += marks;

  studentAnswers[sort_order] = marks;

  res
  .status(200)
  .json({ marks, totalMarks, countOf5Pointers });
});



questionRouter.get("/getScore", (req, res) => {
  const maxMarks = questions.length * 5;
  const prideAccuracyScorePercentage = (totalMarks / maxMarks) * 100;
  //const check=questions.length/countOf5Pointers //if there is no 5pointers then what's the logic
  //const consistencyRatioScore = 1 / check; //doubt check it
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


/////////////10/2
questionRouter.get("/testOption", async(req, res) => {
  try {
    //const {answers} = req.body;
    const {answers}=await examDataModel.find({studentId:req.body.userID})
    // Initialize totalMarks and countOf5Pointers
console.log(answers)
    let totalMarks = 0;
    let countOf5Pointers = 0;

    answers.forEach((answer) => {
      const { sort_order, selectedOption } = answer;

      const question = questions.find((q) => q.sort_order === sort_order);

      if (!question) {
        return res.status(400).json({ error: "Invalid question ID" });
      }

      const { options } = question;
      const previousAnswer = studentAnswers[sort_order] || null;

      let marks = 0;
      let selectedOptionMark = 0;

      options.forEach((opt) => {
        if (opt.option === selectedOption) {
          selectedOptionMark = opt.mark;
        }
      });

      if (selectedOptionMark === 5 && (!previousAnswer || previousAnswer !== 5)) {
        countOf5Pointers++;
      } else if (previousAnswer === 5 && selectedOptionMark !== 5) {
        countOf5Pointers--;
      }

      if (selectedOptionMark) {
        marks = selectedOptionMark;
      }

      if (studentAnswers[sort_order]) {
        totalMarks -= studentAnswers[sort_order];
      }

      totalMarks += marks;

      studentAnswers[sort_order] = marks;
    });

    res.status(200).json({ totalMarks, countOf5Pointers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = {
  questionRouter,
};
