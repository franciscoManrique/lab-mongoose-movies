const PORT = 4000;
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const app = express();
const celebritiesRoutes = require("./routes/celebrities/celebritiesRoutes");

//CONFIGS:
// require("./configs/spotify.config");
require("./configs/db.config");

//middleware static & parses the body from json & parses the text as url encoded data
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
//set views in views and engine hbs
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "hbs");

//Setup partials
hbs.registerPartials(path.join(__dirname, "/views/partials"));

//general routes
app.use("/celebrities", celebritiesRoutes);
// app.use('/', (req, res, next) => res.redirect('/celebrities'));

//errors
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("errors/error");
});

app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});

// app.listen(PORT, ()=>{
//   console.log(`running on port ${PORT}`);
// });

// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
