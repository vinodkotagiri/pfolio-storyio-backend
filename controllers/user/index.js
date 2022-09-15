const AllUsers = require('./users')
const registerUser = require('./register')
const loginUser = require('./login')
const editUser = require('./edit')
const deleteUser = require('./delete')
const forgotPassword = require('./forgotPassword')
const resetPassword = require('./resetPassword')
const currentAdmin = require('./currentAdmin')
module.exports = {
	AllUsers,
	registerUser,
	loginUser,
	editUser,
	deleteUser,
	forgotPassword,
	resetPassword,
	currentAdmin,
}
