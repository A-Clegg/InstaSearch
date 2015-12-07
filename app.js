var express 	= require('express')
	, exphbs		= require('express-handlebars')
	, bodyParser = require('body-parser')
	, request		= require('request')
	, session	 	= require('express-session')
	, path 			= require('path')
  , port      = 3000
	, indexRoutes = require('./routes/indexRoutes.js')
	, userRoutes = require('./routes/userRoutes.js')
	, config 		= require('./config')
	, db	= require('./db.js')
	, Users = require('./models/users')

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

app.use(bodyParser.urlencoded({extended: false}))

app.use('/', indexRoutes);
app.use('/', userRoutes);

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
