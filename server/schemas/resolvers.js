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
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('requests');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, role }) => {
      const user = await User.create({ username, email, password, role });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

  },
};

