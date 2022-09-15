const { expressjwt: jwt } = require('express-jwt')
const User = require('../models/user')

// Verify user
exports.requireSignin = jwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
})

//Check if user is admin
exports.isAdmin = async (req, res, next) => {
	try {
		const user = await User.findById(req.auth._id)
		if (user.role !== 'admin') {
			return res.status(403).send({ error: 'Forbidden! You are not admin' })
		} else {
			next()
		}
	} catch (error) {
		res.status(500).send('error:' + error)
	}
}
