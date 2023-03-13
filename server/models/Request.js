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

});
