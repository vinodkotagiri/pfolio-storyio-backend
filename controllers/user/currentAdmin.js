const User = require('../../models/user')
const currentAdmin = async (req, res) => {
	try {
		res.status(200).send('OK')
	} catch (error) {
		console.log(error)
	}
}
module.exports = currentAdmin
