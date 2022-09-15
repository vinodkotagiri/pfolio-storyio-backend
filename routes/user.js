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
} = require('../controllers/user')

router.get('/', AllUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.put('/:id', editUser)
router.delete('/:id', deleteUser)

module.exports = router
