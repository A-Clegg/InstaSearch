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

    //console.log(feed)
    res.render('dashboard', {
      layout: 'auth_base',
      feed: feed.data
    })
  })
})



// Sarah
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
  })
})
})

//not sure if this is right...comment it out if it's messing with everything..is this the right place to put this?
router.post('/profile', function(req, res) {
  var user= req.body
  //update the user
  Users.update(user, function(){
  res.render('/update', {
    user: user,
    success: 'profile updated!'
  })
  })
})

// taylor
router.get('/search', function(req, res) {
  res.render('search', {
    layout: 'auth_base'
  })
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
