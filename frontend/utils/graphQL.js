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
    user
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
  GET_ARTWORKS: gql`
  query MyQuery {
  itemListeds {
    name
    description
    imageURI
    price
    kind
    seller
    creator
    tokenId
    itemId
  }
}`,
  GET_METADATAS: gql`
  query GetMetadas {
  nftminteds {
    tokenURI
  }
}`,
  GET_ITEMS_SOLD: gql`
  query GetItemsSold {
    itemSolds {
      itemId
    }
  }
`,
  GET_USER_BY_ADDRESS: gql`
  query GetUserByAddress($user: Bytes!) {
  userRegistereds(
    first: 1
    orderBy: blockTimestamp
    orderDirection: desc
    where: {user: $user}
  ) {
    email
    userName
    bio
    profileImage
  }
}
`,
  GET_ARTWORK_BY_NAME: gql`
  query GetArtworkByName($name: String!) {
  itemListeds(
    first: 1
    orderBy: blockTimestamp
    orderDirection: desc
    where: {name: $name}
  ) {
    name
    description
    imageURI
    price
    kind
    creationDate
    seller
    creator
    tokenId
    itemId
  }
}`,

  // on veut toutes les oeuvres d'un artiste sauf celle qui est passée en paramètre
  GET_OTHERS_ARTWORK_BY_SELLER: gql`
  query GetArtworksByCreator($seller: String!, $name: String!) {
  itemListeds(
    orderBy: blockTimestamp
    orderDirection: desc
    where: {seller: $seller, name_not: $name}
  ) {
    name
    description
    imageURI
    price
    kind
    creationDate
    seller
    creator
    tokenId
    itemId
  }
}
`,

  GET_ARTWORKS_BY_CREATOR: gql`
  query GetArtworksByCreator($creator: String!) {
  itemListeds(
    orderBy: blockTimestamp
    orderDirection: desc
    where: {creator: $creator}
  ) {
    name
    description
    imageURI
    price
    kind
    creationDate
    seller
    creator
    tokenId
    itemId
  }
}`,

  GET_LAST_MINT_TIMESTAMP: gql`
  query MyQuery($user: String!) {
  userHasMinteds(
    where: {user: $user}
    first: 1
    orderDirection: desc
    orderBy: blockTimestamp
  ) {
    blockTimestamp
  }
}
`,

  GET_ALL_BUYER_DISCOUNTS: gql`
query MyQuery($userAddress: String!) {
  buyerDiscountBoughts(where: { from: $userAddress }) {
    discountId
    amount
    from
  }
  discountUseds(where: { from: $userAddress }) {
    discountId
    from
  }
}
`,

  GET_ALL_SELLER_DISCOUNTS: gql`
query MyQuery($userAddress: String!) {
  sellerDiscountBoughts(where: { from: $userAddress }) {
    discountId
    amount
    from
  }
  discountUseds(where: { from: $userAddress }) {
    discountId
    from
  }
}
`,
  GET_ALL_NFT_BY_USER: gql`
query MyQuery($owner: String = "") {
  nftminteds(where: {owner: $owner}) {
    tokenId
    tokenURI
  }
}
`,

  GET_LAST_TOKEN_ID: gql`
query MyQuery {
  nftminteds(first: 1, orderDirection: desc, orderBy: blockTimestamp) {
    tokenId
  }
}
`,

  GET_NFT_BY_TOKEN_ID: gql`
query MyQuery($tokenId: BigInt!) {
  nftminteds(where: {tokenId: $tokenId}) {
    tokenId
    tokenURI
  }
}
`,

  GET_TOKEN_ID_BY_TOKEN_URI: gql`
  query MyQuery($tokenURI: String!) {
  nftminteds(where: {tokenURI: $tokenURI}) {
    tokenId
  }
}
  `,

};

// URL du sous-graph
export const GRAPHQL_URL =
  'https://api.studio.thegraph.com/query/96993/ladoree-subgraph/version/latest';
