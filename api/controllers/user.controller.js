const {
  Faculty,
  Timings,
  Slot,
  AllowedSlots,
  Course,
  CourseFaculty,
  RegisteredCourse,
  Student,
  Admin,
} = require("../models/index");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require('../config/pool');
const secret = process.env.USER_SECRET;


// // get route functions // //

// getting faculty based on faculty_id //

const getFaculty = async (req, res) => {
  const faculty_id = req.params.faculty_id;
  try {
    const result = await pool.query(`SELECT * FROM faculties WHERE id=${faculty_id}`);
    console.log(result.rows);
    res.json({success: true, data: result.rows});
  } catch (err) {
    console.error(err);
    res.json({success: false, error: err});
  }
};

// get course using course id //

const getCourse = async (req, res) => {
  const course_id = req.params.course_id;
  try{
    const result = await pool.query(`SELECT * FROM courses WHERE id=${course_id}`);
    console.log(result.rows);
    res.json({success: true, data: result.rows});
  } catch(err) {
    console.error(err);
    res.json({success: false, error: err});
  }
}

// Gets the timetable for the currently authenticated student. Does not work without authentication //

const getTimetable = async (req, res) => {

}

// // post route functions // //


const registerCourse = async (req, res) => {

}

const loginStudent = async (req, res) => {
  const { id, password } = req.body;
  const student = await Student.findOne({ id });

  if (!student) {
    res.status(404).json({ success: false, err: "Student not found" });
  }

  const passwordMatches = await bcrypt.compare(password, student.password);

  if (passwordMatches) {
    const accessToken = jwt.sign(id, secret);
    res.status(200).json({ success: true, id, accessToken });
  } else {
    res.status(401).json({ success: false, err: "Password invalid" });
  }
}

module.exports = {
  getFaculty,
  getCourse,
  getTimetable,
  registerCourse,
  loginStudent,
};
