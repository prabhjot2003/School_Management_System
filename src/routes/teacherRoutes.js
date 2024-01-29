const express = require('express');
const router = express.Router();

const teacherController = require('../controller/teacher/userTeacher');

router.post('/createTeacher',teacherController.createTeacher);
router.post('/createlinking',teacherController.Linking);


module.exports = router;