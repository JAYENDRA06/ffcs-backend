const { userController } = require("../controllers");
const router = require("express").Router();
const { authenticateStudentToken } = require('../services/auth.service');

// get routes //

router.get("/faculty/:faculty_id", authenticateStudentToken, (req, res) => {
  userController.getFaculty(req, res);
});
router.get("/course/:course_id", authenticateStudentToken, (req, res) => {
  userController.getCourse(req, res);
});
router.get("/timetable", authenticateStudentToken, (req, res) => {
  userController.getTimetable(req, res);
});

// post routes //

router.post("/register", authenticateStudentToken, (req, res) => {
  userController.registerCourse(req, res);
});

router.post("/user/login", (req,res) => {
  userController.loginStudent(req, res);
})

module.exports = router;