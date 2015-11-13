var request=require('request')
var express = require('express')
var router = express.Router()

router.get('/dashboard', function(req, res) {
  var options =
  {
    url: 'https://api.instagram.com/v1/users/self/feed?access_token=' + req.session.access_token
  }
  request.get(options, function(error, response, body)
  {
    if(error)
    {
      return res.redirect('/')
    }
    try
    {
        var feed = JSON.parse(body)
    }
    catch(err)
    {
      return res.redirect('/')
    }

    if(feed.meta.code > 200)
    {
      return res.redirect('/')
    }

    // console.log(feed)
    res.render('dashboard', {
      layout: 'auth_base',
      feed: feed.data
    })
  })
})



// Sarah
// not sure if this is right, so just comment it out if it's messing with stuff :)
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
  res.render('search')
})

router.post('/search', function(req, res) {
  var options =
  {
    url: 'https://api.instagram.com/v1/tags/' + req.body.search + '/media/recent?access_token=' + req.session.access_token
  }
  request.get(options, function(error, response, body)
  {
    if(error)
    {
      return res.redirect('/')
    }
    try
    {
        var feed = JSON.parse(body)
    }
    catch(err)
    {
      return res.redirect('/')
    }

    if(feed.meta.code > 200)
    {
      return res.redirect('/')
    }

    // console.log(feed)
    res.render('search', {
      layout: 'auth_base',
      feed: feed.data
    })
  })
})


module.exports = router
