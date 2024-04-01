const express = require("express");
const { questionBankModel, questionBankModelSenior} = require("../model/questionBank.model");
const {auth}=require('../middleware/auth.middleware')
const questionBank=require("../output.json")
//const questionBankSenior=require('../senior.json')
const questionBankRouter = express.Router();

// questionBankRouter.post('/addData', async (req, res) => {
//     try {
//         // Insert data from JSON file into MongoDB
//         await questionBankModel.insertMany(questionBank);
//         res.status(200).json({ message: 'Data added successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
// questionBankRouter.post('/addDataSenior', async (req, res) => {
//     try {
//         // Insert data from JSON file into MongoDB
//         await questionBankModelSenior.insertMany(questionBankSenior);
//         res.status(200).json({ message: 'senior Data added successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
questionBankRouter.get("/questions",auth,async(req,res)=>{
    try {
        // Retrieve data from MongoDB
        const { userID,standard } = req.body;
        let questionModel;
        if(standard===5 || standard===6 ){
           questionModel = questionBankModel;
        }else if(standard==7 || standard===8){
            questionModel=questionBankModelSenior
        }
        const questions = await questionModel.find();
       // const questions = await questionBankModel.find();
        console.log(questions[0])
        res.status(200).json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports={questionBankRouter}