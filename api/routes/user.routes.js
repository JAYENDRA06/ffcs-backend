const { userController } = require("../controllers");
const router = require("express").Router();
const { authenticateUserToken } = require('../services/auth.service');

// get routes //

router.get("/faculty/:faculty_id", (req, res) => {
  userController.getFaculty(req, res);
});
router.get("/course/:course_id", (req, res) => {
  userController.getCourse(req, res);
});
router.get("/timetable", (req, res) => {
  userController.getTimetable(req, res);
});

// post routes //

router.post("/register", (req, res) => {
  userController.registerCourse(req, res);
});

router.post("/user/login", (req,res) => {
  userController.loginStudent(req, res);
})

module.exports = router;