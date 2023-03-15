const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    requests: [Request]!
  }

  type Request {
    _id: ID
    requestText: String
    requestAuthor: String
    createdAt: String
    requestStatus: String
    comments: [Comment]!
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
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, role: String!): Auth
    login(email: String!, password: String!): Auth
    addRequest(requestText: String!): Request
    updateRequestStatus(_id: ID!, requestStatus: String!): Request
    addComment(requestId: ID!, commentText: String!): Request
  }
`;
