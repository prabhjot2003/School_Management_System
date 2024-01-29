const express = require('express')
const router = express.Router();

const studentRoute = require ('../controller/student/userStudent');
const middleware = require('../middleWare/verify');


router.post("/createStudent",studentRoute.createStudent)
router.put("/updateStudent/:id", middleware,studentRoute.updateStudent);
router.get("/getAllstudent",studentRoute.getAllstudent);




module.exports = router;