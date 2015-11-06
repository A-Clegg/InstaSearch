var express 	= require('express')
	, exphbs		= require('express-handlebars')
	, path 			= require('path')
  , port      = 3000
	, indexRoutes = require('./routes/indexRoutes.js')
	, userRoutes = require('./routes/userRoutes.js')
	, session = require('express-session')
	, config = require('./config')

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	cookieName: 'session',
	secret: 'ieuskdnvciaplkclistejmiasndjre',
	resave: false,
	saveUninitialized: true
}))

app.get('/authorize', function(req, res) {
	var qs = {
		client_id: config.client_id,
		redirect_uri: config.redirect_uri,
		response_type: 'code'
	}
})

app.use('/', indexRoutes);
app.use('/', userRoutes);

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
