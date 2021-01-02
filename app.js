require('dotenv').config();
var passport = require('passport');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "AlDente",
      version: "1.0.0",
      description: "AlDente REST API"
    },
    license: {
      name: "GNU LGPLv3",
      url: "https://choosealicense.com/licenses/lgpl-3.0"
    },
    contact: {
      name: "LP-22",
      email: "nek@mail.net"
    },
    servers: [
      { url: "http://localhost:3000/api" },
      { url: "https://aldente-sp-20-21.herokuapp.com/api" }
    ]
  },
  apis: [
    "./app_api/models/sheme.js",
    "./app_api/routes/index.js"
  ]
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

require('./app_api/models/db')
require('./app_api/konfiguracija/passport');
var indexRouter = require('./app_server/routes/index');
var indexApi = require('./app_api/routes/index');
require('./app_server/views/helpers/hbsh.js');
require('./app_server/views/partials/hbsp.js');
var session = require('express-session')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/api', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, AUTHORIZATION');

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
  next();
});

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

app.use('/', indexRouter);
app.use('/api', indexApi);

indexApi.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
indexApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Obvladovanje napak zaradi avtentikacije
app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    res.status(401).json({"sporočilo": err.name + ": " + err.message});
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
