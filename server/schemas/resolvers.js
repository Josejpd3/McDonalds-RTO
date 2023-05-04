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
    addUser: async (parent, { username, firstName, lastName, password, role }) => {
      const user = await User.create({ username, firstName, lastName, password, role });
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
    addRequest: async ( parent, { startDate, endDate, requestStatus }, context) => {
      if (context.user) {
        const request = await Request.create({
          startDate,
          endDate,
          requestAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { requests: request._id } }
        );

        return request;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateRequestStatus: async (parent, { _id, requestStatus }, context) => {
      if(context.user) {
        return Request.findOneAndUpdate(
          { _id: _id },
          {
            $set: { requestStatus: requestStatus },
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { requestId, commentText }, context) => {
      if (context.user) {
        return Request.findOneAndUpdate(
          { _id: requestId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeRequest: async (parent, { requestId }, context) => {
      if (context.user) {
        const request = await Request.findOneAndDelete({
          _id: requestId
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { requests: request._id } }
        );

        return request;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { requestId, commentId }, context) => {
      if (context.user) {
        return Request.findOneAndUpdate(
          { _id: requestId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
