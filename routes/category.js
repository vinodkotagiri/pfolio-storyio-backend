const express = require('express')
const router = express.Router()
const {
	allCategories,
	createCategory,
	editCategory,
	deleteCategory,
} = require('../controllers/category')
const { requireSignin, isAdmin } = require('../middleware/authenticate')

router.get('/', allCategories)
router.post('/create', requireSignin, isAdmin, createCategory)
router.post('/edit', requireSignin, isAdmin, editCategory)
router.delete('/:id', requireSignin, isAdmin, deleteCategory)
module.exports = router
