import React from 'react'
import { View, Text } from 'react-native'
import { Query } from 'react-apollo'
import { queries } from '../../client'

const HomeScreen = () => (
  <Query query={queries.GET_LOCAL_SESSION}>
    {({ data, loading }) => {
      const { session } = data
      if (session && session.me) {
        const { username, email, role } = session.me

        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
            <Text>Username: {username}</Text>
            <Text>Email: {email}</Text>
            <Text>Role: {JSON.stringify(role)}</Text>
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
          </View>
        )
      }
    }}
  </Query>
)

export default HomeScreen
