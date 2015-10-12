var express = require('express')
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

module.exports = router
