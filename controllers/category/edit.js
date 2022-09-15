const Category = require('../../models/category')

const editCategory = async (req, res) => {
	const { _id } = req.params
	await console.lod(_id)
	res.status(200).send('OK')
}
module.exports = editCategory
