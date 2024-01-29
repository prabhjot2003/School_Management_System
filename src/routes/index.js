const express = require('express');
const userRoutes = require('./usreRoute');
const userRoutes1 = require('./classRoutes');
const userRoutes2 = require('./studentRoutes');
const userRoutes3 = require('./sectionRoutes');
const userRouter4 = require('./teacherRoutes');
const userRouter5 = require("./subjectRoutes");
const router = express();

router.use('/school', userRoutes);
router.use('/class', userRoutes1);
router.use('/student',userRoutes2);
router.use('/section',userRoutes3);
router.use('/teacher',userRouter4);
router.use('/subject',userRouter5);


module.exports = router;