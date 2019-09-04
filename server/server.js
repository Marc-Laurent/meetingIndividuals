const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
const http = require('http')
const { dev: { host, port, name } } = config
const dbuser = process.argv[2] || ''
const dbpassword = process.argv[3] || ''

if(!dbuser && !dbpassword) return console.error("ERROR: @example npm start <user> <password>")

const connectionDatabase = `mongodb://${host}:${port}/${name}`

mongoose.connect(connectionDatabase, {
  auth: {
    user: dbuser,
    password: dbpassword
  },
  useNewUrlParser:true,
}, err => {
  if(err) throw err

  http.createServer(app).listen(port || 3000, () => console.log('Serving...' , port))
})
