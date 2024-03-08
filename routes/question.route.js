const express = require("express");
const { examDataModel } = require("../model/question.model");
const { auth } = require("../middleware/auth.middleware");
const questionRouter = express.Router();
const questions = require("../output");
const { questionBankModel } = require("../model/questionBank.model");
//const {scores} = require("../variables/pride.variables");
//const calculateOptionReadTime=require("../functions/optionReadTime")
//console.log(questions.length);
questionRouter.use(auth);

questionRouter.post("/", async (req, res) => {
  try {
    const { answers } = req.body;

    const examDataOfStudent = {
      studentId: req.body.userID,
      user: req.body.user,
      answers,
    };

    const savedExamData = await examDataModel.create(examDataOfStudent);

    res.status(200).json(savedExamData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

questionRouter.get("/testOption", async (req, res) => {
  try {
    const { userID,standard } = req.body;
    // let questionModel;
    // if(standard===5 || standard===6){
    //   questionModel = questionBankModel;
    // }
    // const questions = await questionModel.find();
    // console.log(questions.length)
    
    const Assesments = await examDataModel.find({ studentId: userID });
    const totalAssesment = Assesments.length;
    const examData = await examDataModel
      .findOne({ studentId: userID })
      .sort({ date: -1 });
     // console.log(examData)
    const previousExamData = await examDataModel
      .findOne({ studentId: userID, date: { $lt: examData.date } })
      .sort({ date: -1 })
      .limit(1);
    //console.log(examData)
    //console.log(previousExamData)
    if (!examData) {
      return res
        .status(404)
        .json({ error: "No exam data found for the student" });
    }

    let totalMarks = 0;
    let totalMarksOfPreviousExam = 0;
    let countOf5Pointers = 0;
    let totalQuestionTime = 0;
    let totalOptionTime = 0;
    let allottedTimePerQuestion = 30;

    // Iterate over each answer and calculate metrics
    examData.answers.forEach((answer) => {
      const question = questions.find(
        (q) => q.sort_order === answer.sort_order
      );
      if (!question) {
        return res
          .status(404)
          .json({ error: "Question not found for the answer" });
      }

      const selectedOptionMark = question.options.find(
        (opt) => opt.option === answer.selectedOption
      )?.mark;

      if (selectedOptionMark) {
        totalMarks += selectedOptionMark;
      }

      if (selectedOptionMark === 5) {
        countOf5Pointers++;
      }

      totalQuestionTime += answer.questionReadTime;
      totalOptionTime += answer.optionReadTime;
    });

    if (previousExamData) {
      previousExamData.answers.forEach((answer) => {
        const question = questions.find(
          (q) => q.sort_order === answer.sort_order
        );
        if (!question) {
          return res
            .status(404)
            .json({ error: "Question not found for the answer" });
        }

        const selectedOptionMark = question.options.find(
          (opt) => opt.option === answer.selectedOption
        )?.mark;

        if (selectedOptionMark) {
          totalMarksOfPreviousExam += selectedOptionMark;
        }
      });
    }

    // Calculate total time and mental processing speed
    const totalTime = totalOptionTime + totalQuestionTime;
    const totalTimeTaken = totalOptionTime;
    const totalMaxTimeAlloted = questions.length * allottedTimePerQuestion;
    AvgSecPerQuestion = totalTimeTaken / questions.length;
    const mentalSpeedInSec = (totalTimeTaken / questions.length).toFixed(2);
    const MentalProcessingSpeed = (
      ((allottedTimePerQuestion - AvgSecPerQuestion + allottedTimePerQuestion) /
        allottedTimePerQuestion) *
      100
    ).toFixed(2); //speed

    const maxMarks = questions.length * 5;
    const prideAccuracyScorePercentage = (
      (totalMarks / maxMarks) *
      100
    ).toFixed(2); //Accuracy

    const ratio = countOf5Pointers / questions.length;
    // const percentageOfCountOf5Pointer =(countOf5Pointers / questions.length) * 100;
    // const consistencyRatioScore =
    //   ratio === 0 ? `1:0` : `1:${(1 / ratio).toFixed(2)}`; //consistency
      const mpiConsistency = (((countOf5Pointers / questions.length) * 100) / 20).toFixed(2); ///mpi Consisitency
    let consistencyPercentage = 0;

    if (countOf5Pointers !== 0) {
      //consistencyPercentage = countOf5Pointers * (1 / ratio) * (1 / 100);
      consistencyPercentage=(countOf5Pointers/questions.length)*100
    } //consistency percentage

    const mpiScore =
      (+prideAccuracyScorePercentage +
        +(+MentalProcessingSpeed) +
        consistencyPercentage) /
      3;
    const convertedMpiScore = Math.min(Math.max(mpiScore / 10, 1), 10).toFixed(
      2
    );

    const equatedTimeScore =
      2 * allottedTimePerQuestion * questions.length - totalTime; //E
    const A = totalTime / (allottedTimePerQuestion * questions.length); //A
    const y = equatedTimeScore / A; //E/A
    const mentalProductivityCapacity = Math.floor(
      //mental productivity capacity
      prideAccuracyScorePercentage * y
    );

    let prideGrowthPercentage = 0;

    if (totalMarks && totalMarksOfPreviousExam) {
      prideGrowthPercentage = (
        ((totalMarks - totalMarksOfPreviousExam) / totalMarksOfPreviousExam) * //growth %
        100
      ).toFixed(2);
    }

    res.status(200).json({
      totalMarks,
      countOf5Pointers,
      totalTime,
      totalAssesment,
      prideAccuracyScorePercentage,
      consistencyPercentage,
      MentalProcessingSpeed,
      mentalSpeedInSec,
      convertedMpiScore,
      mentalProductivityCapacity,
      prideGrowthPercentage,
      mpiConsistency,
      totalOptionTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
questionRouter.get("/prideScore", async (req, res) => {
  try {
    const { userID } = req.body;
    const examData = await examDataModel
      .findOne({ studentId: userID })
      .sort({ date: -1 });

    if (!examData) {
      return res
        .status(404)
        .json({ error: "No exam data found for the student" });
    }

    const outputResult = {}; // Initialize outputResult here

    let scores = {
      perceiveScore: 0,
      perceiveContribution: 0,
      resolveScore: 0,
      resolveContribution: 0,
      influenceScore: 0,
      influenceContribution: 0,
      deliverScore: 0,
      deliverContribution: 0,
      engageScore: 0,
      engageContribution: 0,
      totalPrideScore: 0,

      attentionScore: 0,
      memoryScore: 0,
      criticalScore: 0,
      creativeScore: 0,
      mindsetScore: 0,
      attitudeScore: 0,
      expressionScore: 0,
      communicationScore: 0,
      collaborationScore: 0,
      leadershipScore: 0,

      awarenessScore: 0,
      applicationScore: 0,
      advantageScore: 0,

      countOf5PointerPerceive: 0,
      countOf5PointerResolve: 0,
      countOf5PointerInfluence: 0,
      countOf5PointerDeliver: 0,
      countOf5PointerEngage: 0,

      countOf5PointerAttention: 0,
      countOf5PointerMemory: 0,
      countOf5PointerCritical: 0,
      countOf5PointerCreative: 0,
      countOf5PointerMindset: 0,
      countOf5PointerAttitude: 0,
      countOf5PointerExpression: 0,
      countOf5PointerCommunication: 0,
      countOf5PointerCollaboration: 0,
      countOf5PointerLeadership: 0,

      countOf5PointerAwareness: 0,
      countOf5PointerApplication: 0,
      countOf5PointerAdvantage: 0,

      // optionReadTimePerceive: 0,
      //   optionReadTimeResolve: 0,
      //   optionReadTimeInfluence: 0,
      //   optionReadTimeDeliver: 0,
      //   optionReadTimeEngage: 0,
      optionReadTimeAttention: 0,
      optionReadTimeMemory: 0,
      optionReadTimeCriticalThinking: 0,
      optionReadTimeCreativeThinking: 0,
      optionReadTimeMindset: 0,
      optionReadTimeAttitude: 0,
      optionReadTimeExpression: 0,
      optionReadTimeCommunication: 0,
      optionReadTimeCollaboration: 0,
      optionReadTimeLeadership: 0,

      optionReadTimeAwareness: 0,
      optionReadTimeApplication: 0,
      optionReadTimeAdvantage: 0,
    };

    for (const answer of examData.answers) {
      const question = questions.find((q) => q.sort_order == answer.sort_order);

      if (!question) {
        return res
          .status(404)
          .json({ error: "Question not found for the answer" });
      }

      const selectedOption = question.options.find(
        (opt) => opt.option === answer.selectedOption
      );

      if (!selectedOption) {
        return res
          .status(404)
          .json({ error: "Selected option not found for the answer" });
      }

      // Award marks dynamically based on selected option for each pride, skill, and intelligence
      scores[question.pride + "Score"] += selectedOption.mark;
      scores[question.skill + "Score"] += selectedOption.mark;
      scores[question.intelligence + "Score"] += selectedOption.mark;

      // Count occurrences of mark 5 for each skill
      if (selectedOption.mark === 5) {
        scores[
          "countOf5Pointer" +
            question.pride.charAt(0).toUpperCase() +
            question.pride.slice(1)
        ]++;
        scores[
          "countOf5Pointer" +
            question.skill.charAt(0).toUpperCase() +
            question.skill.slice(1)
        ]++;
        scores[
          "countOf5Pointer" +
            question.intelligence.charAt(0).toUpperCase() +
            question.intelligence.slice(1)
        ]++;
      } else if (selectedOption.mark >= 1) {
        scores[
          "optionReadTime" +
            question.pride.charAt(0).toUpperCase() +
            question.pride.slice(1)
        ] += selectedOption.readTime;
      }
      totalPrideScore =
        scores.perceiveScore +
        scores.resolveScore +
        scores.influenceScore +
        scores.deliverScore +
        scores.engageScore;
      totalSkillScore=scores.attentionScore+scores.memoryScore+scores.criticalScore+scores.creativeScore+scores.mindsetScore+scores.attitudeScore+scores.expressionScore+scores.communicationScore+scores.collaborationScore+scores.leadershipScore  
     
      if (totalPrideScore !== 0) {
        outputResult.perceiveContribution = (
          (scores.perceiveScore / totalPrideScore) *
          100
        ).toFixed(2);
        outputResult.resolveContribution = (
          (scores.resolveScore / totalPrideScore) *
          100
        ).toFixed(2);
        outputResult.influenceContribution = (
          (scores.influenceScore / totalPrideScore) *
          100
        ).toFixed(2);
        outputResult.deliverContribution = (
          (scores.deliverScore / totalPrideScore) *
          100
        ).toFixed(2);
        outputResult.engageContribution = (
          (scores.engageScore / totalPrideScore) *
          100
        ).toFixed(2);
      } else {
        outputResult.perceiveContribution = 0;
      }
    }
    //calculation of skil contribution
    outputResult.attentionContribution=((scores.attentionScore/totalSkillScore)*100).toFixed(2)
    outputResult.memoryContribution = ((scores.memoryScore / totalSkillScore) * 100).toFixed(2);
    outputResult.criticalContribution = ((scores.criticalScore / totalSkillScore) * 100).toFixed(2);
    outputResult.creativeContribution = ((scores.creativeScore / totalSkillScore) * 100).toFixed(2);
    outputResult.mindsetContribution = ((scores.mindsetScore / totalSkillScore) * 100).toFixed(2);
    outputResult.attitudeContribution = ((scores.attitudeScore / totalSkillScore) * 100).toFixed(2);
    outputResult.expressionContribution = ((scores.expressionScore / totalSkillScore) * 100).toFixed(2);
    outputResult.communicationContribution = ((scores.communicationScore / totalSkillScore) * 100).toFixed(2);
    outputResult.collaborationContribution = ((scores.collaborationScore / totalSkillScore) * 100).toFixed(2);
    outputResult.leadershipContribution = ((scores.leadershipScore / totalSkillScore) * 100).toFixed(2);

    //calculate of intelligence contribution
    outputResult.awarenessContribution=((scores.awarenessScore/totalSkillScore)*100).toFixed(2)
    outputResult.applicationContribution=((scores.applicationScore/totalSkillScore)*100).toFixed(2)
    outputResult.advantageContribution=((scores.advantageScore/totalSkillScore)*100).toFixed(2)
    

    // Calculation of all ORT of skill and intelligence

    const calculateOptionReadTime = (examData, questions) => {
      // const scores = {
      //     optionReadTimeAttention: 0,
      //     optionReadTimeMemory: 0,
      //     optionReadTimeCriticalThinking: 0,
      //     optionReadTimeCreativeThinking: 0,
      //     optionReadTimeMindset: 0,
      //     optionReadTimeAttitude: 0,
      //     optionReadTimeExpression: 0,
      //     optionReadTimeCommunication: 0,
      //     optionReadTimeCollaboration: 0,
      //     optionReadTimeLeadership: 0,
      //     optionReadTimeAwareness: 0,
      //     optionReadTimeApplication: 0,
      //     optionReadTimeAdvantage: 0
      // };

      examData.answers.forEach((frontendItem) => {
        // Find corresponding backend question
        const backendQuestion = questions.find(
          (backendItem) => backendItem.sort_order === frontendItem.sort_order
        );

        // Check if backendQuestion exists
        if (backendQuestion) {
          // Add optionReadTime based on skill or intelligence
          switch (backendQuestion.skill) {
            case "attention":
              scores.optionReadTimeAttention += frontendItem.optionReadTime;
              break;
            case "memory":
              scores.optionReadTimeMemory += frontendItem.optionReadTime;
              break;
            case "critical":
              scores.optionReadTimeCriticalThinking +=
                frontendItem.optionReadTime;
              break;
            case "creative":
              scores.optionReadTimeCreativeThinking +=
                frontendItem.optionReadTime;
              break;
            case "mindset":
              scores.optionReadTimeMindset += frontendItem.optionReadTime;
              break;
            case "attitude":
              scores.optionReadTimeAttitude += frontendItem.optionReadTime;
              break;
            case "expression":
              scores.optionReadTimeExpression += frontendItem.optionReadTime;
              break;
            case "communication":
              scores.optionReadTimeCommunication += frontendItem.optionReadTime;
              break;
            case "collaboration":
              scores.optionReadTimeCollaboration += frontendItem.optionReadTime;
              break;
            case "leadership":
              scores.optionReadTimeLeadership += frontendItem.optionReadTime;
              break;
            default:
              break;
          }

          switch (backendQuestion.intelligence) {
            case "awareness":
              scores.optionReadTimeAwareness += frontendItem.optionReadTime;
              break;
            case "application":
              scores.optionReadTimeApplication += frontendItem.optionReadTime;
              break;
            case "advantage":
              scores.optionReadTimeAdvantage += frontendItem.optionReadTime;
              break;
            default:
              break;
          }
        }
      });

      return scores;
    };
    console.log("total pride score:", totalPrideScore);
    console.log(scores.attentionScore)
    calculateOptionReadTime(examData, questions);
    function calculateAccuracy(score, total) {
      return ((score / total) * 100).toFixed(2);
    }

    // Assign calculated accuracy values to outputResult
    outputResult.attentionAccuracy = calculateAccuracy(
      scores.attentionScore,
      15
    );
    outputResult.memoryAccuracy = calculateAccuracy(scores.memoryScore, 15);
    outputResult.criticalThinkingAccuracy = calculateAccuracy(
      scores.criticalScore,
      15
    );
    outputResult.creativeThinkingAccuracy = calculateAccuracy(
      scores.creativeScore,
      15
    );
    outputResult.mindsetAccuracy = calculateAccuracy(scores.mindsetScore, 15);
    outputResult.attitudeAccuracy = calculateAccuracy(scores.attitudeScore, 15);
    outputResult.expressionAccuracy = calculateAccuracy(
      scores.expressionScore,
      15
    );
    outputResult.communicationAccuracy = calculateAccuracy(
      scores.communicationScore,
      15
    );
    outputResult.collaborationAccuracy = calculateAccuracy(
      scores.collaborationScore,
      15
    );
    outputResult.leadershipAccuracy = calculateAccuracy(
      scores.leadershipScore,
      15
    );

    outputResult.awarenessAccuracy = calculateAccuracy(
      scores.awarenessScore,
      50
    );
    outputResult.applicationAccuracy = calculateAccuracy(
      scores.applicationScore,
      50
    );
    outputResult.advantageAccuracy = calculateAccuracy(
      scores.advantageScore,
      50
    );
   outputResult.perceiveAccuracy=calculateAccuracy(scores.perceiveScore,30)
   outputResult.resolveAccuracy=calculateAccuracy(scores.resolveScore,30)
   outputResult.influenceAccuracy=calculateAccuracy(scores.influenceScore,30)
   outputResult.deliverAccuracy=calculateAccuracy(scores.deliverScore,30)
   outputResult.engageAccuracy=calculateAccuracy(scores.engageScore,30)
    // Return outputResult
    res.status(200).json(outputResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  questionRouter,
};
