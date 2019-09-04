/**
 * GET     /annonces              ->  index
 * POST    /annonces              ->  create
 * GET     /annonces/:id          ->  show
 * PUT     /annonces/:id          ->  update
 * DELETE  /annonces/:id          ->  destroy
 * 
 * 
 * Need Remove getSession
 **/

'use strict'

const { merge } = require('lodash')
const Article = require('../models/articles')
const Session = require('./sessions')

const handleError = (res, err) => res.status(400).send(err)

/**
 * Get list of articles
 */
exports.list = (req, res) => {
  Session.getSession(response => {
      const query = Article.find({})
    // execute the query at a later time

    query.exec((err, articles) =>  {
      if (err) return res.status(400).json({ error: err, success: false, articles: null})
      return res.status(200).json({ error: err, success: true, articles: articles, user: response.user})
    })
  })
}

// Get a single article.
exports.show = (req, res) => {
  Session.getSession(response => {
  
    Article.findById(req.params.id, (err, article) => {
      if(err || !!article) return handleError(res, err ? err : "Not article found")
      res.status(200).json({ error: err, success: true, article: article, user: response.user})
    })
  })
}

/**
 * Get a single article with id param.
 */
exports.load = (id, callback) => {

  Article.findById(id, (err, article) =>  callback(err, article) )
}

/**
 * Creates a new article in the DB.
 */
exports.create = (req, res) => {
  Session.getSession(response => {
    if (!req.body && !req.query) return handleError(res, err ? err : "DATA NOT FOUND")
    const options = {} // Parse req body or query in option

    const newArticle = new Article(req.body || req.query)
    
    Article.findOne({ reference: req.body ? req.body.reference : req.query.reference })
      .exec((err, article) => {
        if(err || article) return handleError(res, err ? err : "Existing article")

        newArticle.save((err, article) => {
          if(err) return handleError(res, err)

          res.status(200).json(article)
        })
    })
  })
}

/**
 * Updates an existing article in the DB.
 */
exports.update = (req, res) => {
  if(!req.body && !req.query) return handleError(res, "DATA NOT FOUND")
  if(req.body._id || req.query._id) { delete req.body ? req.body._id : req.query._id }

  Article.findById(req.params.id, (err, article) => {
    if(err || !article) return handleError(res, err ? err : "Not Found")

    const articleUpdated = merge(article, req.body || req.query)

    articleUpdated.save(err => {
      if(err) return handleError(res, err) 

      return res.status(200).json(article)
    })
  })
}

/**
 * Deletes a article from the DB.
 */
exports.destroy = (req, res) => {

  Article.findById(req.params.id, (err, article) => {
    if (err || !article) return res.status(400).json({ error: err, success: false})

    Article.remove(err => res.status(err ? 400 : 200).json({ error: err, success: !err}) )
  })
}


