import React, { Component } from 'react'
import client, { queries } from '../../client'
import { FlatList, View, Image, TouchableOpacity, Text } from 'react-native'
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { Avatar } from '../../components/avatar'

const moment = require('moment')

class HomeScreen extends Component {
  static navigationOptions = {
    headerTitleStyle: { textAlign: 'center', flex: 1 },
    headerTitle: 'Events Available'
  }

  state = {
    events: []
  }

  componentDidMount = async () => {
    try {
      const { data } = await client.query({
        query: queries.GET_EVENTS_HOME,
        fetchPolicy: 'network-only'
      })
      this.setState({ events: data.eventsHome })
      console.log('data: ', data)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  extractItemKey = (item) => `${item.id}`

  onItemPressed = (item) => {
    // console.log('item: ', item)
    this.props.navigation.navigate('HomeEventDetail', { eventId: item.id })
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => this.onItemPressed(item)}
    >
      <RkCard rkType='blog' style={styles.card}>
        <Image rkCardImg source={{ uri: item.images && item.images.thumbnail }} />
        <View rkCardHeader style={styles.content}>
          <RkText style={styles.section} rkType='header4'>
            {item.title}
          </RkText>
        </View>
        <View rkCardContent>
          <View>
            <RkText rkType='primary3 mediumLine' numberOfLines={2}>
              {item.shortDescription}
            </RkText>
          </View>
        </View>
        <View rkCardFooter style={{ display: 'flex' }}>
          <View style={styles.userInfo}>
            {/* <Avatar style={styles.avatar} rkType='circle small' img={{ uri: item.user.photo }} /> */}
            {/* <RkText rkType='header6'>{`${item.user.firstname} ${item.user.lastname}`}</RkText> */}
            <View style={{ flex: 1 }}>
              <Avatar
                style={styles.avatar}
                rkType='circle small'
                img={{ uri: item.organizationLogo }}
              />
            </View>
            <View style={{ flex: 4, paddingRight: 12 }}>
              <RkText rkType='header6' numberOfLines={2}>{`${item.organizationName}`}</RkText>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <RkText rkType='secondary2 hintColor'>{moment(item.createdAt).fromNow()}</RkText>
          </View>
        </View>
      </RkCard>
    </TouchableOpacity>
  )

  render() {
    const data = this.state.events

    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}
        style={styles.container}
      />
    )
  }
}

const styles = RkStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14,
    paddingTop: 12
  },
  card: {
    marginVertical: 8
  },
  userInfo: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 17
  }
}))

// const HomeScreen = () => (
//   <Query query={queries.GET_LOCAL_SESSION}>
//     {({ data, loading }) => {
//       const { me } = data.session
//       return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <Text>Home!</Text>
//           {me && <Text>Username: {me.username}</Text>}
//           {me && <Text>Email: {me.email}</Text>}
//           {me && <Text>Role: {JSON.stringify(me.role)}</Text>}
//         </View>
//       )
//     }}
//   </Query>
// )

export default HomeScreen
