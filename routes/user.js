const express = require('express');
const router = express.Router();

const users = require('../controllers/users');
const login = require('../controllers/login');
const register = require('../controllers/register');
const forgotPassword = require('../controllers/forgotPassword');
const editUser = require('../controllers/editUser');
const deleteUser = require('../controllers/deleteUser');

router.get('/', users);
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);

module.exports = router;