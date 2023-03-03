const { adminController } = require("../controllers");
const router = require("express").Router();

// post routes //

router.post("/slot", (req, res) => {
  adminController.createSlot(req, res);
});
router.post("/faculty", (req, res) => {
  adminController.createFaculty(req, res);
});
router.post("/course", (req, res) => {
  adminController.createCourse(req, res);
});
router.post("/student", (req, res) => {
  adminController.createStudent(req, res);
});

module.exports = router;