var express = require('express')
var router = express.Router()

router.get('/dashboard', function(req, res) {
  res.render('dashboard', {
		layout: 'auth_base',
    title: 'User Dashboard!',
    welcome: 'Welcome to your dashboard!'
  })
})

// Sarah
//not sure if this is right, so just comment it out if it's messing with stuff :)
router.get('/profile', function(req, res) {
  res.render('profile', {
		layout: 'auth_base',
    UserName: '{UserName}',
    Picture: 'http://placehold.it/225x225',
    Name: 'Full Name',
    Bio: 'Biography',
    Email: 'Email Address'
  })
})

// Tyler

// Ahmed
router.get('/search', function(req, res) {
  res.render('search', {
		layout: 'auth_base',
    title: 'User Search!',
    welcome: 'Welcome to your search!'
  })
})

module.exports = router
