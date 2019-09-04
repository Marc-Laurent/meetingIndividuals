const express = require('express')
const bodyParser = require('body-parser')
//const logger = require('morgan') // To implement a log system
const cookieParser = require('cookie-parser')
const session = require('express-session')
//const parseurl = require('parseurl') // To work on the url
const passport = require('passport')
const helmet = require('helmet')
const routes = require('./routes/index')
const articles = require('./routes/articles')
const users = require('./routes/users')
const config = require('./config')
const { app: { port } } = config
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('trust proxy', 1)

app.use(session({
  resave: false,
  saveUninitialized: true,
	secret: 'keyboard cat',
  cookie: {
		path    : '/api/users',
		httpOnly: false,
    maxAge  : null
	}
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  res.locals.session = JSON.stringify(req.session)

  next()

})

app.use(passport.initialize())
app.use(passport.session())

app.disable('x-powered-by') // en-tête X-Powered-By désactivée

app.use('/api/annonces', articles)
app.use('/api/users', users)
app.use('/api', routes)


app.use(helmet()) // Protection

app.listen(port || 3000)

console.log("API ... ", port || 3000)

module.exports = app
