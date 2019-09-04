const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const user = new mongoose.Schema({
    was_new: { type: Boolean, default: false },
    email: { type: String, unique: true, required: true, trim: true },
    phone:  { type: String },
    name: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true }
    },
    address: {
      country: String,
      city: { type: String, required: true },
      address: { type: String, required: true },
      code_postal: { type: Number, required: true }
    },
    password: { type: String, required: true, trim: true },
    articles: [mongoose.Schema.Types.ObjectId],
    historic: [],
    is_login: { type: Boolean, default: false }
})

user.static({})

user.method({})

user.pre('save', next => {
  const user = this

  if(!this.was_new){
    next()
  }else {

    bcrypt.hash(user.password, 10, (err, hash) =>  {
      if(err) return next(err)

      user.password = hash

      next()
    })
  }
})

user.post('save', user => {})

user.post('remove', user  => {})

module.exports = mongoose.model('User', user)
