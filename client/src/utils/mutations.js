// mutations, queries, and refactor API functions for useMutation and useQuery
import { gql } from '@apollo/client';


export const CREATE_USER = gql`
mutation createUser($username: String!, $password: String!, $email: String!) {
  createUser(username: $username, password: $password, email: $email) {
    token
    user {
      _id
      username
    }
  }
}`

export const LOGIN = gql`

`