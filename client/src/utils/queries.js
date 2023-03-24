import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      role
      requests {
        _id
        requestText
        requestStatus
        createdAt
      }
    }
  }
`;

export const QUERY_REQUESTS = gql`
  query getRequests {
    thoughts {
      _id
      requestText
      requestAuthor
      createdAt
      requestStatus
    }
  }
`;

export const QUERY_SINGLE_REQUEST = gql`
  query getSingleRequest($requestId: ID!) {
    request(requestId: $requestId) {
      _id
      requestText
      requestAuthor
      createdAt
      requestStatus
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      role
      requests {
        _id
        requestText
        requestAuthor
        createdAt
        requestStatus
      }
    }
  }
`;
