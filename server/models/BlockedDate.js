const { Schema, model } = require('mongoose');

const blockedDateSchema = new Schema({
  date: {
    type: Date,
    get: function (timestamp) {
      const date = new Date(timestamp);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear().toString().slice(-2);
      return `${month}/${day}/${year}`;
    },
    required: "You need to choose a date",
  }
});

const BlockedDate = model('BlockedDate', blockedDateSchema);

module.exports = BlockedDate;
