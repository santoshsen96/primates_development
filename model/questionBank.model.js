const mongoose = require("mongoose");

const questionBankSchema=mongoose.Schema({
    sort_order: Number,
    instruction: String,
    video: String,
    audio:String,
    image:String,
    question_body: String,
    options: [{ option: String, mark: Number }],
    pride: String,
    skill: String,
    intelligence: String,
    skillDemand:String,
    standard: Number,
    date: {
        type: Date,
        default:Date.now()
    },
})

const questionBankModel = mongoose.model("questionBankJunior", questionBankSchema);

module.exports={
    questionBankModel
}

// questionBankModel.insertMany(questionBank)
//     .then(() => {
//         console.log('Questions inserted successfully');
//         // Close the database connection
//        // mongoose.connection.close();
//     })
//     .catch((error) => {
//         console.error('Error inserting questions:', error);
//         // Close the database connection
//        // mongoose.connection.close();
//     });