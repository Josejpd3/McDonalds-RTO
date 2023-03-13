const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const requestSchema = new Schema({
  requestText: {
    type: String,
    required: 'You need to leave a request!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  requestAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

});
