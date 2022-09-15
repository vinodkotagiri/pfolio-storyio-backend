const bcrypt = require('bcrypt')
const User = require('../../models/user')
const resetPassword = async (req, res) => {
	const { password, resetCode } = req.body
	const user = await User.findOne({ resetCode })
	if (!user) {
		res.status(400).json({ error: 'Rest Code is invalid!' })
		return
	}
	const newEncryptedPassword = await bcrypt.hash(password, 12)
	try {
		await user.updateOne({ password: newEncryptedPassword })
		res.status(200).json({ message: 'Password updated successfully!' })
	} catch (error) {
		res.status(500).json({ error: 'Intenal Server Error, Please try again!' })
	}
}
module.exports = resetPassword
