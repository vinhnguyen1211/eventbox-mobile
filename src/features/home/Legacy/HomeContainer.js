import React, { PureComponent } from 'react'
import client from '../../client'
import HomeScreen from './HomeScreen'
import LoginScreen from '../login/LoginScreen'
import withSession from './withSession'
import gql from 'graphql-tag'
const setSession = gql`
  mutation($session: Session) {
    setSession(session: $session) @client
  }
`
class HomeContainer extends PureComponent {
  componentDidMount = () => {
    const { session } = this.props
    client.mutate({
      mutation: setSession,
      variables: { session }
    })
  }

  render() {
    const { session, refetch, navigation } = this.props
    // console.log('props: ', this.props)

    if (session && session.me) {
      return <HomeScreen navigation={navigation} refetch={refetch} session={session.me} />
    }

    return <LoginScreen refetch={refetch} />
  }
}

export default withSession(HomeContainer)
