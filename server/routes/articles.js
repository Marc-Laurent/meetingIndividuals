const router = require('express').Router()
const article = require('../controllers/articles')

router.get('/:id', article.show)
router.post('/', article.create)
router.put('/:id', article.update)
router.delete('/:id', article.destroy)
router.get('/', article.list)

module.exports = router;
