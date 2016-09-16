'use strict';

/**
 * Module dependencies
 */
var categoriesPolicy = require('../policies/categories-tradies.server.policy'),
  categories = require('../controllers/categories-tradies.server.controller');

module.exports = function(app) {
  // Categories Routes
  app.route('/api/categories').all(categoriesPolicy.isAllowed)
    .get(categories.list)
    .post(categories.create);

  app.route('/api/categories/:categoryId').all(categoriesPolicy.isAllowed)
    .get(categories.read)
    .put(categories.update)
    .delete(categories.delete);

  app.route('/api/categories/picture/:categoryId').all(categoriesPolicy.isAllowed)
    .post(categories.changePicture)
    .get(categories.listPicture);

  // Finish by binding the category middleware
  app.param('categoryId', categories.categoryByID);

};
