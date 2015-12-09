var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var request = require ('request')
var config 		= require('../config')
var querystring = require('querystring')
var Users = require('../models/users')

router.get('/', function(req, res) {
   res.render('index', {
 		layout: 'base',
   })
})

router.get('/index', function(req, res) {
   res.render('index', {
 		layout: 'base',
   })
})

router.get('/authorize', function(req, res) {
	var qs = {
		client_id: config.client_id,
		redirect_uri: config.redirect_uri,
		response_type: 'code'
	}

	var query = querystring.stringify(qs)

	var url = 'https://api.instagram.com/oauth/authorize/?' + query

	res.redirect(url)
})

router.get('/auth/finalize', function(req, res) {
  if (req.query.error == 'access_denied') {
    return res.redirect('/')
  }
	var post_data =
	{
		client_id: config.client_id,
		client_secret: config.client_secret,
		redirect_uri: config.redirect_uri,
		grant_type: 'authorization_code',
		code: req.query.code
	}
	var options =
	{
		url: 'https://api.instagram.com/oauth/access_token',
		form: post_data
	}

  request.post(options, function(error, response, body) {
    var data = JSON.parse(body)
    var user = data.user
    req.session.access_token = data.access_token
    req.session.userId = data.user.id

    user._id = user.id
    delete user.id

    Users.find(user, function(document) {
      if (!document) {
        Users.insert(user, function(result) {
          res.redirect('/dashboard')
        })
      }
      else {
        res.redirect('/dashboard')
      }
    })
  })
})

module.exports = router
