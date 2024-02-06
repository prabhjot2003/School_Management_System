const express = require('express');
const router = express.Router();

const issuedController = require('../controller/issued/issued');

router.post("/create",issuedController.isuuedCreate);


module.exports = router;