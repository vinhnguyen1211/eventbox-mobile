import React from 'react'
import { View, Text } from 'react-native'
import { Query } from 'react-apollo'
import { queries } from '../../client'

const HomeScreen = () => (
  <Query query={queries.GET_LOCAL_SESSION}>
    {({ data, loading }) => {
      const { me } = data.session
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home!</Text>
          {me && <Text>Username: {me.username}</Text>}
          {me && <Text>Email: {me.email}</Text>}
          {me && <Text>Role: {JSON.stringify(me.role)}</Text>}
        </View>
      )
    }}
  </Query>
)

export default HomeScreen
