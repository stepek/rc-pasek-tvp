'use strict';

module.exports = function(app) {
  const tvpNews = require('../controllers/tvpNews');
  const ptaszek = require('../controllers/ptaszek');

  app.route('/')
    .get(tvpNews.home);
  app.route('/tvp/')
    .post(tvpNews.create);
  app.route('/tvp/:id')
    .get(tvpNews.singular);
  app.route('/ptaszek/')
    .post(ptaszek.create);
  app.route('/ptaszek/:id')
    .get(ptaszek.singular);

};
