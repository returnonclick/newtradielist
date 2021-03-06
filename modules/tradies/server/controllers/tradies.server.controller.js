'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  config = require(path.resolve('./config/config')),
  multer = require('multer'),
  Tradie = mongoose.model('Tradie'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Tradie
 */
exports.create = function(req, res) {
  var tradie = new Tradie(req.body);
  
  tradie.user = req.user;

  tradie.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tradie);
    }
  });

};

/**
 * Show the current Tradie
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var tradie = req.tradie ? req.tradie.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  tradie.isCurrentUserOwner = req.user && tradie.user && tradie.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(tradie);
};

/**
 * Update a Tradie
 */
exports.update = function(req, res) {
  var tradie = req.tradie ;

  tradie = _.extend(tradie , req.body);

  tradie.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tradie);
    }
  });

};

/**
 * Delete an Tradie
 */
exports.delete = function(req, res) {
  var tradie = req.tradie ;

  tradie.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tradie);
    }
  });
};

/**
 * List of Tradies
 */
exports.list = function(req, res) { 
  Tradie.find().sort('-created').populate('user', 'displayName').exec(function(err, tradies) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tradies);
    }
  });
};

/**
 * List of Tradie Picture
 */
exports.listPicture = function(req, res) {

  // NOTE: the object was populated in the middleware
  var tradie = req.tradie ;
  tradie = _.extend(tradie , req.body);

  // NOTE: This field returns the image of the tradie.
  res.jsonp(tradie.image);

};

/**
 * Update tradie picture
 */
exports.changePicture = function (req, res) {
  var tradie = req.tradie ;
  tradie = _.extend(tradie , req.body);

  var message = null;
  var upload = multer(config.uploads.tradiesUpload).single('newPicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;


  upload(req, res, function (uploadError) {
    if(uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {
      tradie.image = config.uploads.tradiesUpload.dest + req.file.filename;
      tradie.save(function (saveError) {
        if (saveError) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(saveError)
          });
        } else {
          res.json(tradie);
        }
      });
    }
  });
};

/**
 * Tradie middleware
 */
exports.tradieByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Tradie is invalid'
    });
  }

  Tradie.findById(id).populate('user', 'displayName').exec(function (err, tradie) {
    if (err) {
      return next(err);
    } else if (!tradie) {
      return res.status(404).send({
        message: 'No Tradie with that identifier has been found'
      });
    }
    req.tradie = tradie;
    next();
  });
};
