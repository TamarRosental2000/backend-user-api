const express = require('express');
const membersController = require('../controllers/membersController');

const router = express.Router();

router.get('/getUsers/:page', membersController.getUsers);
router.get('/getUser/getById/:userId', membersController.getById);
router.post('/createUser', membersController.createUser);
router.put('/updateUser/:userId', membersController.updateUser);
router.delete('/deleteUser/:userId',membersController.deleteUser)

module.exports = router;