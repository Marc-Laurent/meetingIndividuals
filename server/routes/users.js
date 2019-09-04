const router = require('express').Router()
const express = require('express')
const User = require('../controllers/users')
const UserModel = require('../models/users')
const app = express()
const _ = require('lodash')

router.get('/', User.getUserConnect) // Need App.all without request

router.post('/', (req, res, next) => {

    res.status(200).json({ session: req.session })
})
router.get('/get/:id', User.show)
router.post('/create', User.create)
router.post('/update', User.update)
router.delete('/:id', User.destroy)

router.post('/login', (req, res, next) => {

  User.authenticateSaveUser(req.body, function(err, user){
      req.session.user = user
      req.session.connection = err ? false : true

    res.status(err ? 400 : 200).json({error: err, success: user ? true : false })
  })

})

router.post('/logout', (req, res, next) => {
  if (!req.session) return res.status(200).json({error: "Session not found", success: false })
  req.session.destroy()

  UserModel.find({ })
    .exec((err, users) => {
      user = users[0]
      user['is_login'] = false;

      user.save((err, user) => {

        return res.status(200).json({error: null, success: true })
      })
    })
})



router.post("/change/password/user", User.changePassword)

router.post("/add/article", (req, res, next) => {
  const user = req.body.user, article = req.body.article

  User.addArticle(user, article, (err, user) => {
    return res.status(err ? 400 : 200).json({error: err, success: user ? true : false, user: user })

  })
})

router.post("/remove/article", (req, res, next) => {
  const user = req.body.user, article = req.body.article

  User.removeArticle(user, article, (err, user) => {
    return res.status(err ? 400 : 200).json({error: err, success: user ? true : false, user: user })

  })
})

module.exports = router
