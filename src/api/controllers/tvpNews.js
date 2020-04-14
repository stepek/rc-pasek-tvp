'use strict';

const mongoose = require('mongoose');
const TvpNewsModel = mongoose.model('TvpNews');

const drawer = require('./../../drawer');

exports.singular = function(req, res) {
  TvpNewsModel.findOne({_id: req.params.id}, function(err, news) {
    if (err) {
      res.send(err);
      return;
    }

    res.setHeader('Content-Type', 'image/png');

    drawer.drawImage(news.text, news.image, res)
  });

};

exports.home = function(req, res) {
  res.setHeader('Content-Type', 'image/png');
  drawer.drawImage('Works fine', drawer.getRandomBackground(), res)
};

exports.create = function(req, res) {
  const {body} = req;
  const text = body.text.replace(/\!pasek/, '').trim();
  const tvpNews = new TvpNewsModel({text, image: drawer.getRandomBackground()});

  tvpNews.save(function (err, news) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(
      {
        "attachments": [
          {
            "title": "Pasek TVP",
            "image_url": `https://tvpnews.herokuapp.com/tvp/${news._id}`
          }
        ]
      }
    )
  });
};
