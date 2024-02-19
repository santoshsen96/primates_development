const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required:true,
    },
    studentName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true,
    },
    studentId: {
      type: String,
      required: true,
    },
    enrollmentNo: {
      type: Number,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },
    name:{
      type:String
    },
    password: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    schoolCity: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    standard: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const studentModel = mongoose.model("student", studentSchema);
const studentKeys = Object.keys(studentSchema.obj);
module.exports = {
  studentModel,
  studentKeys
};
