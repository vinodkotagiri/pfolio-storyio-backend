const Category = require('../../models/category')
const slugify = require('slugify')
const editCategory = async (req, res) => {
	try {
		const { _id, name } = req.body
		const slug = slugify(name.toLowerCase())
		console.log(_id, slug, name)
		const category = await Category.findOneAndUpdate(
			{ _id },
			{ slug, name },
			{ new: true }
		)

		res.status(200).send('OK')
	} catch (error) {
		res
			.status(500)
			.json({ error: 'An error occurred while editing the category' })
	}
}
module.exports = editCategory
