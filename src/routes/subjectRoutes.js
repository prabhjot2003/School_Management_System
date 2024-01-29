const express = require('express');
const router = express.Router();

const subjectRoutes = require('../controller/subject/userSubject');

router.post("/createSubject",subjectRoutes.createSubject);

module.exports = router;