/**
 * GET     /users              ->  index
 * POST    /users              ->  create
 * GET     /users/:id          ->  show
 * PUT     /users/:id          ->  update
 * DELETE  /users/:id          ->  destroy
 * PUT /users/:id/change/password -> changePassword
 * 
 * 
 * 
 **/

'use strict'

const User = require('../models/users')
const Article = require('../models/articles')
const { compare } = require('bcrypt')
const { parallel, each } = require('async')

const handleError = (res, err) => res.status(400).send(err)

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = (req, res) => {
  User.find({}, '-salt -hashedPassword', (err, users) => {
    if (err) return handleError(res, err)
    res.status(200).json(users[0])
  })
}

/**
 * POST Creates a new user
 */
exports.create = (req, res) => {
  if(!req.body && !req.query) return handleError(res, "NOT DATA FOUND")

  const body = req.body ? req.body : req.query

  const options = {
    email: body.email,
    name: {
      firstname: body.firstname,
      lastname: body.lastname
    },
    address: {
      address: body.address,
      code_postal: body.code_postal,
      city: body.city
    },
    password: body.password
  }

  const newUser = new User(options)

  User.findOne({ email: body.email })
    .exec((err, user) => {
      if (err || user) return res.status(400).json({ error: err ? err : "Existing account", success: false })

      newUser.save((err, user) => res.status(err ? 400 : 200).json({error: err, success: user ? true : false, user: user }) )
  })
}

/**
 * Get object user
 */
exports.show = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) return handleError(res, err ? err : 'Not Found')
    res.status(200).json({ error: null, success: true, user: user })
  })
}

/**
 * PUT update object user
 */
exports.update = (req, res) => {
  if (!req.session || (req.session && !req.session.user && !req.session.user._id) || (req.session && req.session.user && !req.session.user._id)) return res.status(500).json({error: "No ID", success: false})
  if (!req.body && !req.query) return res.status(400).json({ error: "No data found", success: false }) 

  User.findById(req.session.user._id, (err, user) => {
    if(err || !user) return callback(err, null)
    const options = req.body ? req.body : req.query

    if(user.name){
      user.name.firstname = options.firstname ? options.firstname : null
      user.name.lastname = options.lastname ? options.lastname : null
    } 

    if(user.address){
      user.address.address = options.address ? options.address : null
      user.address.code_postal = options.code_postal ? options.code_postal : null
      user.address.country = options.country ? options.country : null
      user.address.city = options.city ? options.city : null
    }
    
    user.was_new = true

    user.save((err, user) => res.status(err ? 400 : 200).json({error: err, success: user ? true : false, user: user }) )
  })
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return handleError(res, err)

    res.status(204).send('Content removed')
  })
}

/**
 * replace a user's password
 */

exports.changePassword = (req, res, next) => {
  if (!req) return handleError(res, "No data found")
  if (!req.body) return handleError(res, "No data found")
  if (!req.session) return handleError(res, "No session found")

  const userId = req.session.user._id
  const oldPass = String(req.body.old_password)
  const newPass = String(req.body.new_password)

  User.findById(userId, (err, user) => {
    compare(oldPass, user.password, (err, result) => {
      if (err || !result) return res.status(400).json({ error: err ? err : "bad password", success: false })

      user.password = newPass
      user.was_new = false

      user.save((err) => res.status(err ? 400 : 200).json({ error: err, success: !err }))
    })
  })
}

/**
 * Function get User by mail
 */
exports.loadByEmail = (user, callback) => {

  User.findOne({ email: user.email }, (err, user) => {
    callback(err, user)
  })
}

/************************************************************************/
/********************* Functions Connection user  ***********************/
/**
 * Don't need if local storage cookies system
 */
/************************************************************************/

/**
 * Get User connect
 */
exports.getUserConnect = (req, res) => {
  User.findOne({ is_login: true })
    .exec((err, user) => {
      if (err || !user) return res.status(400).json({ error: err ? err : "No accounts connected", success: false })
      res.status(200).json({ error: null, success: true, user: user })
    })
}

/**
 * Connect User
 */
exports.authenticateSaveUser = (body, callback) => {
  User.findOne({ email: body.email })
    .exec((err, user) => {
      if (err) {
        return callback(err)

      } else if (!user) {
        const err = new Error('User not found.')
        err.status = 401

        return callback(err)
      }

      user['is_login'] = true
      const newUser = new User(user)

      newUser.save((err, user_save) => {
        if (err) return callback(err, user_save)

        compare(body.password, user.password, (err, result) => {
          callback(err, result && result === true ? user : null)
        })
      })
    })
}

/**
 * Authenticate User
 */
exports.authenticate = (body, callback) => {
  User.findOne({ email: body.email })
    .exec((err, user) => {
      if (err) {
        return callback(err)

      } else if (!user) {
        const err = new Error('User not found.')
        err.status = 401

        return callback(err)
      }

      compare(body.password, user.password, (err, result) => {
        callback(err, result && result === true ? user : null)
      })
    })
}

/************************************************************************/


/************************************************************************/
/*************** Functions interaction user and article *****************/
/************************************************************************/

/**
 * Add an article to a user
 */
exports.addArticle = (user, article, callback) => {
  if(!user) return callback("Need param user", null)

  const userId = user._id
  const articleId = article._id

  if(!article) return callback("No selected articles", null)
  User.findOne({ _id: userId })
    .exec((err, user) => {
    if(err || !user) return callback(err ? err : "Not user found", null)

    user.articles.push(articleId)
    user.was_new = true
    user.save((err, user) => {
      if(err || !user) return callback(err, null)

      Article.findOne({ _id: articleId })
        .exec((err, article_founded) => {
          if(err || !article_founded) return callback(err, null)

          article_founded['Receiver'] = userId

          article_founded.save(err => callback(err, user) )
        })
    })
  })
}

/**
 * Delete an article to a user
 */
exports.removeArticle = (user , article, callback) => {
  if(!user) return callback("Need user", null)

  const userId = user._id
  const articleId = article._id

  if(!article || !articleId) return callback("No selected articles", null)

  User.findById(userId, (err, user) => {
    if(err || !user) return callback(err, null)
    const articles = []

    parallel({
      removeArticle: cbk_parallel => {

        each(user.articles, (article_id, cbk_async) => {
          if( String(articleId) != String(article_id)) articles.push(article_id)

          cbk_async();
        }, err => cbk_parallel(err) )
      }
    }, err => {
      if(err) callback(err, null)

      user.articles =  articles
      user.was_new = true

      user.save((err, user) => {
        if(err) callback(err, null)

        Article.findOne({ _id: articleId })
          .exec((err, article_founded) => {
            if(err) callback(err, null)

            article_founded['Receiver'] = null

            article_founded.save(err => callback(err, user) )
          })
      })
    })
  })
}

/************************************************************************/


/**
 * Authentication callback Redirect if user session not found router.all
 */
exports.authCallback = (req, res, next) =>  res.redirect('/')