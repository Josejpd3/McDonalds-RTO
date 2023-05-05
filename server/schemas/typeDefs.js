const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    password: String
    role: String
    requests: [Request]!
  }

  type Request {
    _id: ID
    startDate: String
    endDate: String
    requestAuthor: String
    createdAt: String
    requestStatus: String
    comments: [Comment]!
  }

  type BlockedDate {
    _id: ID
    date: String
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    requests(username: String): [Request]
    request(requestId: ID!): Request
    me: User
    blockedDates: [BlockedDate]
  }

  type Mutation {
    addUser(username: String!, firstName: String!, lastName: String!, password: String!, role: String!): Auth
    login(username: String!, password: String!): Auth
    addRequest(startDate: String!, endDate: String): Request
    updateRequestStatus(_id: ID!, requestStatus: String!): Request
    addComment(requestId: ID!, commentText: String!): Request
    removeRequest(requestId: ID!): Request
    removeComment(requestId: ID!, commentId: ID!): Request
    blockDate(date: String!): BlockedDate
  }
`;

module.exports = typeDefs;
