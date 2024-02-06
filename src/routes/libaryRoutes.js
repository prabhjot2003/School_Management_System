const express = require('express');
const router = express.Router();

const libaryController = require('../controller/libary/libary');

router.post("/Create", libaryController.libaryCreate)
router.get("/getlibary/:id",libaryController.getlibary);

module.exports = router;