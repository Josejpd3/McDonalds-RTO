import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $firstName: String!, $lastName: String!, $password: String!, $role: String!) {
    addUser(username: $username, firstName: $firstName, lastName: $lastName, password: $password, role: $role) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REQUEST = gql`
  mutation addRequest($startDate: String!, $endDate: String) {
    addRequest(startDate: $startDate, endDate: $endDate) {
      _id
      startDate
      endDate
      requestAuthor
      createdAt
      requestStatus
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;


export const UPDATE_REQUEST_STATUS = gql`
  mutation updateRequestStatus($id: ID!, $requestStatus: String!) {
    updateRequestStatus(_id: $id, requestStatus: $requestStatus) {
      _id
      startDate
      endDate
      requestAuthor
      createdAt
      requestStatus
      comments {
        _id
        commentText
      }
    }
  }
`;


export const REMOVE_REQUEST = gql`
  mutation removeRequest($requestId: ID!) {
    removeRequest(requestId: $requestId) {
      _id
      startDate
      endDate
      requestAuthor
      createdAt
      requestStatus
      comments {
        _id
        commentText
      }
    }
  }
`;