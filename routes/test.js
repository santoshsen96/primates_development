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


questionRouter.get("/prideScore", async (req, res) => {
  try {
    const { userID } = req.body;
    const examData = await examDataModel
      .findOne({ studentId: userID })
      .sort({ date: -1 });

    if (!examData) {
      return res.status(404).json({ error: "No exam data found for the student" });
    }

    let perceiveScore = 0;
    let resolveScore=0;
    let influenceScore=0;
    let deliverScore=0;
    let engageScore=0

    let attentionScore = 0;
    let memoryScore=0;
    let criticalThinkingScore=0;
    let creativeThinkingScore=0;
    let mindsetScore=0;
    let attitudeScore=0;
    let expressionScore=0;
    let communicationScore=0;
    let collaborationScore=0;
    let leadershipScore=0;

    let awarenessScore = 0;
    let applicationScore = 0;
    let advantageScore = 0;

    let countOf5PointerPerceive = 0; // Variable to count occurrences of mark 5 in perceive skill
    
    let countOf5PointerAttention = 0; // Variable to count occurrences of mark 5 in attention skill
    let countOf5PointerMemory=0;
    let countOf5PointerCriticalThinking=0
    let countOf5PointerCreativeThinking=0
    let countOf5PointerMindset=0
    let countOf5PointerAttitude=0
    let countOf5PointerExpression=0
    let countOf5PointerCommunication=0
    let countOf5PointerCollaboration=0
    let countOf5PointerLeadership=0

    examData.answers.forEach((answer) => {
      const question = questions.find((q) => q.sort_order === answer.sort_order);

      if (!question) {
        return res.status(404).json({ error: "Question not found for the answer" });
      }

      const selectedOption = question.options.find((opt) => opt.option === answer.selectedOption);

      if (!selectedOption) {
        return res.status(404).json({ error: "Selected option not found for the answer" });
      }

      // Award marks dynamically based on selected option for perceive, skill, and intelligence
      if (question.pride === "perceive") {
        perceiveScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerPerceive++;
        }
      }
      if (question.skill === "attention") {
        attentionScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerAttention++;
        }
      }
      if (question.skill === "memory") {
        memoryScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerMemory++;
        }
      }
      if (question.skill === "critical thinking") {
        criticalThinkingScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerCriticalThinking++;
        }
      }
      if (question.skill === "creative thinking") {
        creativeThinkingScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerCreativeThinking++;
        }
      }
      if (question.skill === "mindset") {
        mindsetScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerMindset++;
        }
      }
      if (question.skill === "attitude") {
        attitudeScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerAttitude++;
        }
      }
      if (question.skill === "expression") {
        expressionScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerExpression++;
        }
      }
      if (question.skill === "communication") {
        communicationScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerCommunication++;
        }
      }
      if (question.skill === "collaboration") {
        collaborationScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerCollaboration++;
        }
      }
      if (question.skill === "leadership") {
        leadershipScore += selectedOption.mark;
        if (selectedOption.mark === 5) {
          countOf5PointerLeadership++;
        }
      }
      awarenessScore += question.intelligence === "awareness" ? selectedOption.mark : 0;
      applicationScore += question.intelligence === "application" ? selectedOption.mark : 0;
      advantageScore += question.intelligence === "advantage" ? selectedOption.mark : 0;
    });

    res.status(200).json({
      perceiveScore,
      countOf5PointerPerceive,
      attentionScore,
      countOf5PointerAttention,
      memoryScore,
      countOf5PointerMemory,
      criticalThinkingScore,
      countOf5PointerCriticalThinking,
      creativeThinkingScore,
      countOf5PointerCreativeThinking,
      mindsetScore,
      countOf5PointerMindset,
      attitudeScore,
      countOf5PointerAttitude,
      expressionScore,
      countOf5PointerExpression,
      communicationScore,
      countOf5PointerCommunication,
      collaborationScore,
      countOf5PointerCollaboration,
      leadershipScore,
      countOf5PointerLeadership,
      awarenessScore,
      applicationScore,
      advantageScore,
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

