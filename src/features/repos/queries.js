import gql from 'graphql-tag'

export const GET_EVENTS_HOMEPAGE = gql`
  query {
    eventsHome {
      id
      title
      slug
      status
      images {
        thumbnail
      }
      createdAt
      updatedAt
      user {
        id
        username
      }
    }
  }
`
