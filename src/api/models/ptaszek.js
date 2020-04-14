'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TvpNewsModel = new Schema({
  text: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Ptaszek', TvpNewsModel);
