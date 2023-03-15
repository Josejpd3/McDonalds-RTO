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


`;
