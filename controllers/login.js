const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
	//Get login details form client request
	const { email, password } = req.body

	//Get  the user exists
	const user = await User.findOne({ email }).lean()
	//Verify the password
	const verify = await bcrypt.compare(user.password, password)

	//If user doesn't exists
	if (!user) {
		res
			.status(404)
			.json({ error: `User with email '${user.email}' does not exist` })
	}
	//If password not matching
	if (!verify) {
		res.status(401).json({ error: 'Unautohrizes, Invalid password' })
	}
	//If everything is good
	try {
		//Generate access token
		const accessToken = jwt.sign(
			{ id: user._id, email: user._email },
			JWT_SECRET,
			{ expiresIn: '7d' }
		)
		res.status(200).json({ message: 'OK', token: accessToken })
	} catch (error) {
		res.status(500).json({ error: 'Internal Error! Please try again later' })
	}
}

module.exports = login
