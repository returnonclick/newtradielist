'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tradie Schema
 */
var CategorySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Category name',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  parent: {
    type: String,
    default: '',
    trim: true
  },
  ancestors: {
    type: Array
  },
  icon: {
    type: String,
    default: 'modules/tradies/client/img/categories/default.png',
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

mongoose.model('Category', CategorySchema);
