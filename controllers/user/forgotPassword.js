const User = require('../../models/user')
const { nanoid } = require('nanoid')
const SendResetEmail = require('../../helpers/mailer')
const forgotPassword = async (req, res) => {
	const { email } = req.body
	const user = await User.findOne({ email })
	if (!user) {
		res.status(400).json({ error: 'User not found!' })
		return
	}
	try {
		//Generate  unique reset code
		const resetCode = nanoid(6).toUpperCase()
		//Add code to the user db
		user.resetCode = resetCode
		user.save()
		SendResetEmail(email, resetCode)
		res.status(202).json({ user })
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error!' })
	}
}
module.exports = forgotPassword
