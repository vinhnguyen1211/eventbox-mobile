import gql from 'graphql-tag'

const GET_ME = gql`
  query {
    me {
      id
      username
      email
      role
      departments {
        id
        name
      }
    }
  }
`

const GET_LOCAL_SESSION = gql`
  query getSession {
    session @client {
      me {
        id
        username
        email
        role
      }
    }
  }
`

export { GET_ME, GET_LOCAL_SESSION }
