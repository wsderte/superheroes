import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import { fileURLToPath } from 'url';

import path from 'path'
import cookieParser from 'cookie-parser'

import { config } from './config.js'

import indexRouter from './routes/index.js'
import superheroRouter from './routes/superhero.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({extended: true}));
app.use(cors())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, 'images')));

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
