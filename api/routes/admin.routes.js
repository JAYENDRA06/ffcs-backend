const { userController } = require("../controllers");
const router = require("express").Router();

router.post("/create-admin", (req, res) => {
  console.log("yo");
//   userController.createUser(req, res);
});

module.exports = router;