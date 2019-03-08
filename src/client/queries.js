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

const GET_EVENTS_HOME = gql`
  query {
    eventsHome {
      id
      title
      images {
        thumbnail
      }
      shortDescription
      organizationName
      organizationLogo
      user {
        id
        firstname
        lastname
        photo
      }
      createdAt
    }
  }
`

const GET_EVENTS_CHECKIN = gql`
  query {
    eventsForCheckin {
      id
      title
      images {
        thumbnail
      }
      shortDescription
      user {
        id
        firstname
        lastname
        photo
      }
      createdAt
    }
  }
`

const GET_EVENT_DETAIL = gql`
  query($eventId: ID!) {
    event(id: $eventId) {
      id
      title
      rawHtmlContent
      shortDescription
      images {
        thumbnail
      }
      createdAt
      location
      address
      user {
        id
        firstname
        lastname
        photo
      }
      status
    }
  }
`

const GET_TICKET = gql`
  query($code: String!, $eventId: ID!) {
    checkTicket(code: $code, eventId: $eventId) {
      checkedIn
      checkedInTime
      userInfo {
        firstname
        lastname
      }
    }
  }
`
export {
  GET_ME,
  GET_LOCAL_SESSION,
  GET_EVENTS_HOME,
  GET_EVENTS_CHECKIN,
  GET_EVENT_DETAIL,
  GET_TICKET
}
