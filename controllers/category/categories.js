const Category = require('../../models/category')
const allCategories = async (req, res) => {
	try {
		const categories = await Category.find()
		res.status(200).json(categories)
	} catch (error) {
		res.status(500).json({ error: 'Intenal Server Error!' })
	}
}
module.exports = allCategories
