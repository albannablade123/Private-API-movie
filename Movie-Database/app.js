var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', moviesRouter);
app.use('/users', usersRouter);

const logger = require('pino')()
const movieURL = 'http://www.omdbapi.com/?apikey='

logger.info('Connected')

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const db = require('./models');

db.sequelize.sync().then((req) =>{
  app.listen(3000, () => {
    logger.info
    console.log("server running")
  });
});

function verifyToken(req, res, next) {
  //retrieve header value
  const bearerHeader = req.headers['authorization'];
  const token = bearerHeader && bearerHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  webtoken.verify(token, 'secretkey', (err, data) => {
    if (err) return res.sendStatus(403);
    req.data = data;
    next();
  });
}



module.exports = app;
