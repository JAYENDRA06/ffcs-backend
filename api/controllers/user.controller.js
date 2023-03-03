const jwt = require("jsonwebtoken");
const pool = require('../config/pool')

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

module.exports = {
  getFaculty,
  getCourse,
  getTimetable,
  registerCourse,
};
