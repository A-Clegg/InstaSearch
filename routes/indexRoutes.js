var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
   res.render('', {
 		layout: 'base',
     title: 'User Dashboard!',
     welcome: 'Welcome to your dashboard!'
   })
})

module.exports = router
