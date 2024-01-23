const express = require('express')
const router = express.Router();

const classRoutes = require ('../controller/class/userClass')


router.post('/classCreate', classRoutes.classCreate)


module.exports = router;


