const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const socket = require('socket.io')
const http = require('http')
const debug = require('debug')('back:server')
const db = require('./lib/db')
const paymentHttpHandler = require('./routes/payments').httpHandler

const routes = require('./routes/index')
const users = require('./routes/users')
const payments = require('./routes/payments')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // true is body
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/users', users)
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

const server = http.createServer(app)
// const io = socket(server)


  // socket.on('text', (data) => {
  //   console.log('text', data)
  //   data.user = 123 // default user
  //   db.postConversation(data)
  //     .then(console.log)
  //     .catch(console.error)
  // })
// })
app.use('/payments', paymentHttpHandler(express))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  // $FlowOk
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
