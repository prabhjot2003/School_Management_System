const express = require('express');
const router = express.Router();

const bookController = require('../controller/book/book');

router.post('/create',bookController.bookCreate);
router.get('/getdetailsbook/:id',bookController.getbook);
router.get("/bookdetail/:id",bookController.getOnlybookDetail);


module.exports = router;