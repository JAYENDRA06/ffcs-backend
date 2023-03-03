const { userController } = require("../controllers");
const router = require("express").Router();

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
})

module.exports = router;