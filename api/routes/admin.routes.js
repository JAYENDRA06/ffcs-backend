const { adminController } = require("../controllers");
const { authenticateAdminToken } = require('../services/auth.service');
const router = require("express").Router();

// post routes //

router.post("/slot", authenticateAdminToken, (req, res) => {
  adminController.createSlot(req, res);
});
router.post("/faculty", authenticateAdminToken, (req, res) => {
  adminController.createFaculty(req, res);
});
router.post("/course", authenticateAdminToken, (req, res) => {
  adminController.createCourse(req, res);
});
router.post("/student", authenticateAdminToken, (req, res) => {
  adminController.createStudent(req, res);
});


// admin creation route for testing //
router.post("/createAdmin", (req, res) => {
  adminController.createAdmin(req, res);
});

router.post("/login", (req, res) => {
  adminController.loginAdmin(req, res);
})

module.exports = router;