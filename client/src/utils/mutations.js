import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $role: String!) {
    addUser(username: $username, email: $email, password: $password, role: $role) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REQUEST = gql`
  mutation addRequest($requestText: String!) {
    addRequest(requestText: $requestText) {
      _id
      requestText
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

