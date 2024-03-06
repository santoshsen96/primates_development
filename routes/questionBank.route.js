const express = require("express");
const { questionBankModel} = require("../model/questionBank.model");
const questionBank=require("../output.json")
const questionBankRouter = express.Router();

questionBankRouter.post('/addData', async (req, res) => {
    try {
        // Insert data from JSON file into MongoDB
        await questionBankModel.insertMany(questionBank);
        res.status(200).json({ message: 'Data added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
questionBankRouter.get("/questions",async(req,res)=>{
    try {
        // Retrieve data from MongoDB
        const questions = await questionBankModel.find();
        console.log(questions[0])
        res.status(200).json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports={questionBankRouter}