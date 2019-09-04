const config = {
 app: {
   port: 3000
 },
 local: {
   host: 'localhost', //localhost //127.0.0.1
   port: 27017,
   name: 'vivelastreet'
 },
 dev: {
   host: 'ds151012.mlab.com',
   port: 51012,
   name: 'vivelastreet'
 }
}

module.exports = config
