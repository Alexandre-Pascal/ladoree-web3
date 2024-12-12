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
        profileImage
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
        profileImage
      }
    }
  `,
  GET_CREATOR: gql`
  query GetCreators($userName: String!) {
  userRegistereds(
    orderBy: blockTimestamp
    orderDirection: desc
    first: 1
    where: {isCreator: true, userName: $userName}
  ) {
    email
    userName
    bio
    profileImage
  }
}
  `,

  GET_USER_ARTWORKS: gql`
    query GetUserPosts($user: String!) {
      posts(
        orderBy: blockTimestamp
        orderDirection: desc
        where: { user: $user }
      ) {
        id
        title
        content
        user
      }
    }
  `,
};

// URL du sous-graph
export const GRAPHQL_URL =
  'https://api.studio.thegraph.com/query/96993/ladoree-subgraph/version/latest';
