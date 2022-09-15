const express = require('express')
const router = express.Router()
const {
	AllUsers,
	registerUser,
	loginUser,
	forgotPassword,
	resetPassword,
	editUser,
	deleteUser,
	currentAdmin,
} = require('../controllers/user')

//Middleware
const { requireSignin, isAdmin } = require('../middleware/authenticate')

router.get('/', AllUsers)

router.get('/current-admin', requireSignin, isAdmin, currentAdmin)

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password', resetPassword)

router.put('/:id', editUser)

router.delete('/:id', deleteUser)

module.exports = router
