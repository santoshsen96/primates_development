const mongoose = require("mongoose");

// Define schema for questions
const questionSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        //required: true
    },
    question:{
        type:String
    },
    questionReadTime: {
        type: Number,
        //required: true
    },
    optionReadTime: {
        type: Number,
       // required: true
    },
    selectedOption:{
        type:String,
    },
    totalQuestionTime: {
        type: Number,
        default: 0
    }
});

// Define schema for attempts
const attemptSchema = new mongoose.Schema({
    attemptId: {
        type: Number,
        //required: true
    },
    date: {
        type: Date,
        default:Date.now()
    },
    answers: {
        type: [questionSchema],
        //required: true
    }
});

// Define schema for students
const examDataSchema = new mongoose.Schema({
    studentId: {
        type: String,
       // required: true
    },
    user:{
        type:String,
    },
    date: {
        type: Date,
        default:Date.now()
    },
    answers: [{
        sort_order: {
            type: Number,
            // required: true
        },
        question:{
            type:String,
        },
        selectedOption: {
            type: String,
            // required: true
        },
        questionReadTime: {
            type: Number,
            // required: true
        },
        optionReadTime:{
            type:Number
        }
    }]
});

// Create and export student model
const examDataModel = mongoose.model("examData", examDataSchema);
module.exports = {examDataModel};
