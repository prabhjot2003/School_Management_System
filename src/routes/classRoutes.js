const express = require('express');
const router = express.Router();

const classRoutes = require ('../controller/class/userClass');
const middleware = require('../middleWare/verify');


router.post('/classCreate', classRoutes.classCreate);
router.put('/updateClass/:id',middleware,classRoutes.updateClass);

router.get('/getAllclass',classRoutes.getAllclass);
router.get('/getAllclass/:id',middleware,classRoutes.getALLclassdata);

module.exports = router;


