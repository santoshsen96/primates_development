const express=require('express')
const app=express()
const {connection}=require("./db")
require("dotenv").config()
const cors=require('cors')
app.use(cors())

app.use(express.json())

const {studentRouter}=require("./routes/student.route")
const {questionRouter}=require("./routes/question.route")
const { questionBankRouter } = require('./routes/questionBank.route')

app.use("/student",studentRouter)
app.use('/quiz',questionRouter)
app.use('/',questionBankRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log(`running at port ${process.env.port} `)
    }catch(err){
        console.log(err)
        console.log("something went wrong")
    }

})