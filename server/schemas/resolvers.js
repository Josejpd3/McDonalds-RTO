const { AuthenticationError } = require('apollo-server-express');
const { User, Request, BlockedDate } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('requests');
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('requests');
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
    blockedDates: async ()  => {
      return BlockedDate.find()
    }
  },

  Mutation: {
    addUser: async (parent, { username, firstName, lastName, password, role }) => {
      const user = await User.create({ username, firstName, lastName, password, role });
      const token = signToken(user);
      return { token, user };
    },
    updateUserRole: async (parent, { userId, role }) => {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );
    
      return updatedUser;
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user found with this Employee ID');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    resetPassword: async (parent, { username, firstName, lastName, newPassword }) => {
      const user = await User.findOne({ username, firstName, lastName });

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      user.password = newPassword;
      await user.save();

      const token = signToken(user);

      return { token, user };
    },
    addRequest: async ( parent, { startDate, endDate, requestStatus }, context) => {
      if (context.user) {
        const request = await Request.create({
          startDate,
          endDate,
          requestAuthor: `${context.user.firstName} ${context.user.lastName}`,
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
    blockDate: async (parent, {date}, context) => {
      if(context.user) {
        return BlockedDate.create({
          date,
        })
      }
    },
    removeBlockedDate: async (parent, {blockedDateId}, context) => {
      if (context.user) {
        const blockedDate = await BlockedDate.findOneAndDelete({
          _id: blockedDateId
        });

        return blockedDate;
      }
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
