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

