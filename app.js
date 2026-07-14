const express = require('express');
const fs = require('fs');
const morgan = require('morgan')

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();


//middlewares
app.use(morgan('dev'))
app.use(express.json());








//route middleware
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports = app;