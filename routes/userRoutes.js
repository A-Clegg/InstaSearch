var request=require('request')
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
router.get('/profile', function(req, res, next) {
  var options = {
    url: 'https://api.instagram.com/v1/users/self/?access_token=' + req.session.access_token
  }

  request.get(options, function(error, response, body) {
    if(error){
      return res.redirect('/')
     }

    try {
     var profile = JSON.parse(body)
    }
   catch(err) {
     //res.redirect('/')
     return res.redirect('/')
   }

   if(profile.meta.code > 200) {
     return res.redirect('/')
     //return next(profile.meta.error_message)
   }

   console.log(profile)

  res.render('profile', {
		layout: 'auth_base',
    user: profile.data
    // UserName: profile.username,
    // Picture: profile.profile_picture,
    // Name: profile.full_name,
    // Bio: profile.bio,
    // Email: 'Email Address'
  })
})
})

// Taylor


// Ahmed
router.get('/search', function(req, res) {
  res.render('search', {
		layout: 'auth_base',
    title: 'User Search!',
    welcome: 'Welcome to your search!',
    post: 
  })
})

module.exports = router
