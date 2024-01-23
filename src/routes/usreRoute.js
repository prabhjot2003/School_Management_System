const express = require('express')
const router = express.Router();

const userController = require('../controller/school/userSchool');



// route post is method and (/singup) is router name. 
router.post('/Create', userController.createSchool)
router.post('/Login', userController.loginSchool)



module.exports = router;