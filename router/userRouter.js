const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')



router.get('/login', UserController.login)
router.post('/login', UserController.loginPost)
router.get('/add', UserController.add)
router.post('/save', UserController.save)
router.post('/delete', UserController.delete)
router.get('/update/:id', UserController.edit)
router.post('/updateSave', UserController.editSave)
router.get('/dashboard', UserController.home)


module.exports = router