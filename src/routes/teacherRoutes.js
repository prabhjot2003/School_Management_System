const express = require('express');
const router = express.Router();

const teacherController = require('../controller/teacher/userTeacher');
const middleware = require('../middleWare/verify');




router.post('/createTeacher',teacherController.createTeacher);
router.post('/createlinking',teacherController.Linking);

router.get("/getteachersubject/:id", middleware, teacherController.getTeacherandSubject);
router.post("/getdatathree",teacherController.Linkingthree);

router.get("/getTecherClass/:id", middleware,teacherController.getTeacherandSubjectAandCLass)




module.exports = router;