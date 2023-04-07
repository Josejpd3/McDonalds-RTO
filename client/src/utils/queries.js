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
        startDate
        endDate
        requestStatus
        createdAt
      }
    }
  }
`;

export const QUERY_REQUESTS = gql`
  query getRequests {
    requests {
      _id
      startDate
      endDate
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
      startDate
      endDate
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
        startDate
        endDate
        requestAuthor
        createdAt
        requestStatus
      }
    }
  }
`;
