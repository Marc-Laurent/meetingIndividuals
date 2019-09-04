const router = require('express').Router()

router.get('/', function(req, res) {
  res.status(200).json(' Welcome to our API : /api/annonces , /api/users')
})

router.post('/', function(req, res) {
  res.status(200).json(' Welcome to our API : /api/annonces , /api/users')
})

module.exports = router;
