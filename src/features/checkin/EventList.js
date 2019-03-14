import React, { Component } from 'react'
import client, { queries } from '../../client'
import { FlatList, View, Image, TouchableOpacity, Text } from 'react-native'
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { Avatar } from '../../components/avatar'

const moment = require('moment')

class EventList extends Component {
  state = {
    events: []
  }

  componentDidMount = async () => {
    try {
      const { data } = await client.query({
        query: queries.GET_EVENTS_CHECKIN,
        fetchPolicy: 'network-only'
      })
      this.setState({ events: data.eventsForCheckin })
      console.log('data: ', data)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  extractItemKey = (item) => `${item.id}`

  onItemPressed = (item) => {
    // console.log('item: ', item)
    this.props.navigation.navigate('EventDetail', { id: item.id })
    // console.log('navigaiton: ', this.props.navigation)
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => this.onItemPressed(item)}
    >
      <RkCard rkType='horizontal' style={styles.card}>
        <Image rkCardImg source={{ uri: item.images && item.images.thumbnail }} />
        <View rkCardContent>
          <RkText numberOfLines={1} rkType='header6'>
            {item.title}
          </RkText>
          <RkText rkType='secondary6 hintColor'>
            {/* {`${item.user.firstName} ${item.user.lastName}`} */}
            {moment(item.createdAt).fromNow()}
          </RkText>
          <RkText style={styles.post} numberOfLines={2} rkType='secondary1'>
            {item.shortDescription}
          </RkText>
        </View>
        <View rkCardFooter>{/* <SocialBar rkType='space' showLabel /> */}</View>
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

export default EventList

const styles = RkStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginVertical: 8
  },
  post: {
    marginTop: 13
  }
}))
