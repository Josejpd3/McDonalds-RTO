const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const requestSchema = new Schema({
  startDate: {
    type: Date,
    get: function (timestamp) {
      const date = new Date(timestamp);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear().toString().slice(-2);
      return `${month}/${day}/${year}`;
    },
    required: "You need to leave a request!",
  },
      const date = new Date(timestamp);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear().toString().slice(-2);
      return `${month}/${day}/${year}`;
    },
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
  requestStatus: {
    type: String,
    default: "pending"
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Request = model('Request', requestSchema);

module.exports = Request;
