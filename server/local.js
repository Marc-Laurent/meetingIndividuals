const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
const http = require('http')
const { local: { host, port, name } } = config

const connectionDatabase = `mongodb://${host}:${port}/${name}`

mongoose.connect(connectionDatabase, { useNewUrlParser: true }, err => {
  if(err) throw err

  http.createServer(app).listen(port || 3000, () => console.log('Serving...'))
})
