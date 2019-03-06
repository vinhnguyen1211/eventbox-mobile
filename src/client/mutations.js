import gql from 'graphql-tag'

export const SIGN_IN = gql`
  mutation($username: String!, $password: String!, $type: Int) {
    signIn(username: $username, password: $password, type: $type) {
      token
    }
  }
`
export const SET_LOCAL_SESSION = gql`
  mutation($session: Session) {
    setSession(session: $session) @client
  }
`
