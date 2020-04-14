'use strict';

const express = require('express');

const app = express();
const port = process.env.PORT || 8080;
const mongolabUri = process.env.MONGOLAB_URI;

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(mongolabUri, {
  server: {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }
});

require('./src/api/models/tvpNews');
require('./src/api/models/ptaszek');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const routes = require('./src/api/routers/tvpNews');
routes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);
