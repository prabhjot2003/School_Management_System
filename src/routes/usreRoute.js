const express = require('express');
const router = express.Router();

const userController = require('../controller/school/userSchool');
const middleware = require('../middleWare/verify');
const middleware2 = require ('../middleWare/multerMiddleware');




// route post is method and (/singup) is router name. 
router.post('/Create', middleware2.imageUpload.single("image"), userController.createSchool);

// router.post('/Createted', middleware2.multi_upload.array("image",3), userController.createSchool);


router.post('/Login', userController.loginSchool);

router.put('/updateSchool/:id', userController.updateSchool);
router.get('/getAllschool',userController.getAllschool)

router.delete("/deletedata/:id",userController.deleteSchool);

 




module.exports = router;