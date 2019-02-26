import { Platform, AsyncStorage } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import { setContext } from 'apollo-link-context'
import {
  SERVER_URI_ANDROID,
  SERVER_URI_IOS,
  SERVER_SUB_ANDROID,
  SERVER_SUB_IOS
} from 'react-native-dotenv'
import { onError } from 'apollo-link-error'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import * as queries from './queries'
import * as mutations from './mutations'
import deviceStorage from '../services/deviceStorage'

const apolloCache = new InMemoryCache()

/**
 * REMOTE DATA
 */
const httpLink = createHttpLink({
  uri: Platform.OS === 'android' ? SERVER_URI_ANDROID : SERVER_URI_IOS
})

/* eslint-disable */

const ws_client = new SubscriptionClient(
  Platform.OS === 'android' ? SERVER_SUB_ANDROID : SERVER_SUB_IOS,
  {
    reconnect: true
  }
)
const wsLink = new WebSocketLink(ws_client)

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

/* eslint-disable */
const authMiddleware = setContext(async (req, { headers = {} }) => {
  const token = await AsyncStorage.getItem('auth.token')
  // console.log('token: ', token)
  return {
    headers: {
      ...headers,
      'x-token': token || ''
    }
  }
})
/**
 * LOCAL DATA
 */
const defaults = {
  session: {
    me: null,
    __typename: 'Session'
  }
}

const resolvers = {
  Mutation: {
    setSession: (_, { session: { me } }, { cache }) => {
      const data = {
        session: {
          me,
          __typename: 'Session'
        }
      }
      cache.writeData({ data })
      return null
    }
  }
}

const stateLink = withClientState({
  cache: apolloCache,
  defaults,
  resolvers,
  typeDefs: `
    extend type Query {
      getSession: Session!
    }
    Session {
      me: User
    }
    User {
      id: ID!
      username: String!
      email: String!
      role: [String]
      departments: [Department]
    }
    Department {
      id: ID!
      name: String!
    }
  `
})

/**
 * ERROR HANDLING
 */

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(async ({ message, statusCode, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`) // eslint-disable-line
      if (statusCode === 401) {
        console.log('signOut')
        signOut()
      }
    })
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`) // eslint-disable-line
  }
})

const signOut = async () => {
  await deviceStorage.saveKey('auth.token', '')
  await client.resetStore(stateLink.writeDefaults())
}

/**
 * APOLLO CLIENT
 */
const client = new ApolloClient({
  link: ApolloLink.from([stateLink, errorLink, authMiddleware, terminatingLink]), // order matters
  cache: apolloCache
})

export default client
export { mutations, queries, signOut }
