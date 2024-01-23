const express = require('express')
const router = express.Router();

const studentRoute = require ('../controller/student/userStudent');


router.post("/createStudent",studentRoute.createStudent)

module.exports = router;