const express = require('express');
const userController = require('../controllers/user.js');
const {verify} = require('../auth')
const router = express.Router();

router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.get('/details',verify,userController.userDetails)

module.exports = router;