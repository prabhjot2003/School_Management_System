const express = require('express');
const userRoutes = require('./usreRoute');
const userRoutes1 = require('./classRoutes');
const userRoutes2 = require('./studentRoutes');
const userRoutes3 = require('./sectionRoutes');
const userRouter4 = require('./teacherRoutes');
const userRouter5 = require("./subjectRoutes");
const userRoutes6 = require('./libaryRoutes');
const userRoutes7 = require('./categoryRoutes');
const userRoutes8 = require('./bookRoutes');
const userRoutes9 = require('./issuedRoutes');

const router = express();

router.use('/school', userRoutes);
router.use('/class', userRoutes1);
router.use('/student', userRoutes2);
router.use('/section', userRoutes3);
router.use('/teacher', userRouter4);
router.use('/subject', userRouter5);
router.use('/libary', userRoutes6);
router.use('/category', userRoutes7);
router.use('/book', userRoutes8);
router.use('/issue', userRoutes9);

module.exports = router;