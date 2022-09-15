const express = require('express')
const router = express.Router()
const {
	allCategories,
	createCategory,
	editCategory,
} = require('../controllers/category')
const { requireSignin, isAdmin } = require('../middleware/authenticate')

router.get('/', allCategories)
router.post('/create', requireSignin, isAdmin, createCategory)
router.post('/edit', requireSignin, isAdmin, editCategory)
module.exports = router
