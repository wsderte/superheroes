import cors from 'cors'
import createError from 'http-errors'
import express from 'express'
import mongoose from 'mongoose'

import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import { config } from './config.js'

import indexRouter from './routes/index.js'
import superheroRouter from './routes/superhero.js'


const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(cors())
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// let port = process.env.PORT || '8080'
const port = config.port || 8080
const url = config.mongoUrl

const connect = mongoose.connect(url)

connect
    .then((db) => {
        console.log('DB connected correctly to server')
    })
    .catch((err) => {
        console.log('DB connect error', err)
    })


app.use('/', indexRouter);
app.use('/api/superhero', superheroRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log('listening on ' + port)
})


export default app
