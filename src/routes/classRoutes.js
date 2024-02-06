const express = require('express');
const router = express.Router();

const classRoutes = require ('../controller/class/userClass');
const middleware = require('../middleWare/verify');


router.post('/classCreate', classRoutes.classCreate);
router.put('/updateClass/:id',classRoutes.updateClass);
router.get('/getAllclass',classRoutes.getAllclass);
router.get('/getAllclass/:id',middleware,classRoutes.getALLclassdata);
// router.delete('/delete/:id',classRoutes.deleteClass);   


    



module.exports = router;


