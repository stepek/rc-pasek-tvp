'use strict';

const mongoose = require('mongoose');
const Ptaszek = mongoose.model('Ptaszek');

const drawer = require('./../../drawerPtaszek');

exports.singular = function(req, res) {
  Ptaszek.findOne({_id: req.params.id}, function(err, news) {
    if (err) {
      res.send(err);
      return;
    }

    res.setHeader('Content-Type', 'image/png');

    drawer.drawImage(news.text, news.image, res)
  });

};

exports.create = function(req, res) {
  const {body} = req;
  const text = body.text.replace(/\!paputek/, '').trim();
  const ptaszek = new Ptaszek({text, image: drawer.getRandomBackground()});

  ptaszek.save(function (err, news) {
    if (err) {
      res.send(err);
      return;
    }

    res.json(
      {
        "attachments": [
          {
            "title": "Paputek :(",
            "image_url": `https://tvpnews.herokuapp.com/ptaszek/${news._id}`
          }
        ]
      }
    )
  });
};
