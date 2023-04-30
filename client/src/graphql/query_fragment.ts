import { gql } from "@apollo/client";

export const BASIC_DETAILS = gql`
  fragment BasicDetails on User {
    id
    name
    email
    role
  }
`