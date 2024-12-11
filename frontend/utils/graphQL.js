import { gql } from 'graphql-request';

export const queries = {
  GET_USER_PROFILE: gql`
    query GetUserProfile($user: String!) {
      userRegistereds(
      orderBy: blockTimestamp
      orderDirection: desc
      first: 1
      where: { user: $user }
      ) 
      {
        email
        userName
        bio
        isCreator
      }
    }
  `,
  GET_ALL_USERS: gql`
    {
  userRegistereds {
    email
    userName
    bio
  }
}
`,
  GET_CREATORS: gql`
    query GetCreators {
      userRegistereds(
        orderBy: blockTimestamp
        orderDirection: desc
        where: { isCreator: true }
      ) {
        email
        userName
        bio
      }
    }
  `,
};

// URL du sous-graph
export const GRAPHQL_URL =
  'https://api.studio.thegraph.com/query/96993/ladoree-subgraph/version/latest';
