const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Controller to handle user registration
register = async (req, res) => {
	const { name, email, password } = req.body

	//Password length lessthan 6
	if (password.length < 6) {
		res
			.status(400)
			.json({ error: 'Password length must be at least 6 characters' })
		return
	}

	//Check if the user is already exists in db
	const check = await User.findOne({ email: email.toLowerCase() }).lean()

	//If user exists in database
	if (check) {
		res
			.status(400)
			.json({ error: `User with email ${check.email} already exists` })
		return
	}

	//If user doesnot exist
	//Encrypt password
	const encryptedPassword = await bcrypt.hash(password, 12)
	try {
		const user = await new User({
			name: name.toLowerCase(),
			email: email.toLowerCase(),
			password: encryptedPassword,
		})
		user.save()
		//Generate a JWT token
		const token = jwt.sign(
			{ _id: user._id, email: user._email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		)
		const { password, ...rest } = user._doc
		res.status(201).json({
			user: rest,
			token: token,
		})
	} catch (error) {
		res.status(500).json({ error: 'Internal Error! Please try again later' })
	}
}

module.exports = register
