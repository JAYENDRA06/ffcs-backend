const router = require('express').Router();

const userRouter = require('./user.routes'); 
// const adminRouter = require('./admin.routes');

router.use('/user', userRouter);
// router.use('/admin', adminRouter);

module.exports = router;