const express = require('express');
const router = express.Router();

const userController = require('../controller/school/userSchool');
const middleware = require('../middleWare/verify');




// route post is method and (/singup) is router name. 
router.post('/Create', userController.createSchool);
router.post('/Login', userController.loginSchool);

router.put('/updateSchool/:id',middleware, userController.updateSchool);
router.get('/getAllschool',userController.getAllschool)



module.exports = router;