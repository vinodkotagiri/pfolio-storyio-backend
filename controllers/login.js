const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
	//Get login details form client request
	const { email, password } = req.body

	//Get  the user exists
	const user = await User.findOne({ email: email.toLowerCase() }).lean()

	//If user doesn't exists
	if (!user) {
		res.status(404).json({
			error: `User with email '${email.toLowerCase()}' does not exist`,
		})
		return
	}
	//IF Email exists
	//Verify the password
	const verify = await bcrypt.compare(password, user.password)

	//If password not matching
	if (!verify) {
		res.status(401).json({ error: 'Unautohrized!, Invalid password' })
		return
	}
	//If everything is good
	try {
		//Generate access token
		const accessToken = jwt.sign(
			{ id: user._id, email: user._email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		)
		res.status(200).json({ message: 'OK', token: accessToken })
	} catch (error) {
		res.status(500).json({ error: 'Internal Error! Please try again later' })
	}
}

module.exports = login
