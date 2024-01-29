const express = require('express');
const router = express.Router();

const sectionRoutes = require ('../controller/section/userSection');
const middleware = require('../middleWare/verify');



router.post("/sectionCreate", sectionRoutes.SectionCreate);
router.put("/updatesection/:id",middleware, sectionRoutes.updateSection);
router.get("getAllsection",sectionRoutes.getAllsection);


module.exports = router;