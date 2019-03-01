let mongoose = require('mongoose')
let Schema = mongoose.Schema
let passportLocalMongoose = require('passport-local-mongoose')

let userSchema = new Schema({
  username: String,
  email: String,
  profilePic: {
    type: String,
    default: "https://static.thenounproject.com/png/17241-200.png"
  }
}, { timestamps: true })

userSchema.plugin(passportLocalMongoose, { usernameField: "email" })

module.exports = mongoose.model('User', userSchema)