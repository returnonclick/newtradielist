'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tradie Schema
 */
var TradieSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Tradie name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  location: {
    type: String,
    default: '',
    trim: true
  },
  image: {
    type: String,
    default: 'modules/users/client/img/profile/default.png',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  website: {
    type: String,
    default: '',
    trim: true
  },
  abn: {
    type: String,
    default: '',
    trim: true
  },
  acn: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Tradie', TradieSchema);
