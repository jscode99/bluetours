const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware/RequiresSign');
const router = express.Router();
const { addCategory, getCategory } = require('../controller/Category');



// Category router
router.post('/category/create',requireSignin, adminMiddleware,addCategory);
router.get('/category/getcategories', getCategory);







module.exports = router;