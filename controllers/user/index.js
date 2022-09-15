const AllUsers = require('./users')
const registerUser = require('./register')
const loginUser = require('./login')
const editUser = require('./edit')
const deleteUser = require('./delete')
const forgotPassword = require('./forgotPassword')
const resetPassword = require('./resetPassword')
module.exports = {
	AllUsers,
	registerUser,
	loginUser,
	editUser,
	deleteUser,
	forgotPassword,
	resetPassword,
}
