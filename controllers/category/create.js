const slugify = require('slugify')
const Category = require('../../models/category')

const createCategory = async (req, res) => {
	try {
		const { name } = req.body

		const check = await Category.findOne({ name: name.toLowerCase() }).lean()
		if (check) {
			return res.status(400).json({ error: 'Category already exists' })
		}
		const category = await Category.create({
			name: name.toLowerCase(),
			slug: slugify(name.toLowerCase()),
		})
		category.save()
		console.log(category)
		res.status(201).json({ category: category })
	} catch (error) {
		res.status(500).json({ error: 'Intenal Server Error, Try again later!' })
	}
}
module.exports = createCategory
