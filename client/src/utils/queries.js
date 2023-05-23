import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      firstName
      lastName
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

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      firstName
      lastName
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
      firstName
      lastName
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


export const QUERY_BLOCKED_DATES = gql`
  query getBlockedDates {
    blockedDates {
      _id
      date
    }
  }
`;
