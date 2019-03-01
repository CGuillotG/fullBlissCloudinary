const express = require('express');
const router = express.Router();
const User = require('../models/User')
const passport = require('passport')
const uploadCloud = require('../helpers/cloudinary');

//middlewares
function isAuth(req, res, next) {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {    
    next()
  } else {
    res.status(401).json({ message: "No te has logueado" })
  }
}

router.get('/logout',isAuth, (req, res) => {
  req.logout()
  
  req.session.destroy((err) => {
    if(!err) {
      res.status(200).clearCookie('connect.sid', {path: '/'}).json({message: "saliste perrrrrrone!"})
    }
  })
})

router.get('/lol' ,isAuth, (req, res, next) => {
  res.status(200).json({
    message: "Lo lograste pesqueño cabrón, estás del otro lado",
    name: req.user.username,
    photo: req.user.profilePic
  })
})

//signup
router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(e => next(e))
})
//login
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.status(200).json(req.user)
})
//private
router.get('/private', isAuth ,(req, res, next) => {
  res.status(200).json({
    message: "Lo lograste pequeño cabrón, estás del otro lado",
    name: req.user.username,
    photo: req.user.profilePic
  })
})

router.post('/imageProfile',isAuth, uploadCloud.single('picture'), (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {profilePic: req.file.url})
    .then( user => {
      res.status(200).json({ message: "Lo lograste! puedes ver, he subido tu foto", profilePic: req.file.url })
    })
    .catch(e => console.log(e))
})

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
