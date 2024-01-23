const express = require('express')
const router = express.Router();

const sectionRoutes = require ('../controller/section/userSection')


router.post("/sectionCreate", sectionRoutes.SectionCreate)


module.exports = router;