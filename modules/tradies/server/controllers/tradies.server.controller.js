'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  Tradie = mongoose.model('Tradie'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Tradie
 */
exports.create = function(req, res) {
  var tradie = new Tradie(req.body);
  tradie.user = req.user;

  var upload = multer(config.uploads.tradiesUpload).single('newProfilePicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;


  if (tradie) {
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        tradie.imageURL = config.uploads.tradiesUpload.dest + req.file.filename;
        tradie.save(function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.jsonp(tradie);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'ERRORRRRRR'
    });
  }
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

  var upload = multer(config.uploads.tradiesUpload).single('newProfilePicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;


  if (tradie) {
    upload(req, res, function (uploadError) {
      if (uploadError) {
        return res.status(400).send({
          message: 'Error occurred while uploading profile picture'
        });
      } else {
        tradie.imageURL = config.uploads.tradiesUpload.dest + req.file.filename;
        tradie.save(function(err) {
          if (err) {
            return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(tradie);
          }
        });
      }
    });
  } else {
    res.status(400).send({
      message: 'ERRORRRRRR'
    });
  }

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
