const express = require('express');
const router = express.Router();

const categoryController = require('../controller/category/category');

router.post("/create",categoryController.categoryCreate);

module.exports = router;
