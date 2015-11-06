var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()

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

	var query = querystringigy(qs)

	var url = 'https://api.instagram.com/oauth/authorize/?' + query

	res.redirect(url)
})

router.get('/auth/finalize', function(req, res) {
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
		req.session.access_token = data.access_token

		res.redirect('/dashboard')
	})
})

module.exports = router
