var express 	= require('express')
	, exphbs		= require('express-handlebars')
	, path 			= require('path')
  , port      = 3000
	, indexRoutes = require('./routes/indexRoutes.js')
	, userRoutes = require('./routes/userRoutes.js')

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/', userRoutes);

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
