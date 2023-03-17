const { AuthenticationError } = require('apollo-server-express');
const { User, Request } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('requests');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('requests');
    },
    requests: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Request.find(params).sort({ createdAt: -1 });
    },
    request: async (parent, { requestId }) => {
      return Request.findOne({ _id: requestId });
    },

  },

};

