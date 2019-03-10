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

export const TICKET_SUBMIT = gql`
  mutation($code: String!, $eventId: ID!) {
    submitTicket(code: $code, eventId: $eventId) {
      checkedIn
      checkedInTime
      userInfo {
        email
        firstname
        lastname
      }
    }
  }
`
