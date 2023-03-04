const router = require("express").Router();

const userRouter = require("./user.routes");
const adminRouter = require("./admin.routes");
const testRouter = require("./test.routes");

router.use("/", userRouter);
router.use("/admin", adminRouter);
router.use("/test", testRouter);

module.exports = router;