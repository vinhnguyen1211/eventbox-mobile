import React, { Component } from 'react'
import client, { queries } from '../../client'
import { FlatList, View, Image, TouchableOpacity } from 'react-native'
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten'
import { Avatar } from '../../components/avatar'

const moment = require('moment')

class EventList extends Component {
  state = {
    events: []
  }

  componentDidMount = async () => {
    try {
      const { data } = await client.query({ query: queries.GET_EVENTS_CHECKIN })
      this.setState({ events: data.eventsForCheckin })
      console.log('data: ', data)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  extractItemKey = (item) => `${item.id}`

  onItemPressed = (item) => {
    // this.props.navigation.navigate('Article', { id: item.id })
    console.log('item: ', item)
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
        <View rkCardFooter>
          <View style={styles.userInfo}>
            <Avatar style={styles.avatar} rkType='circle small' img={{ uri: item.user.photo }} />
            <RkText rkType='header6'>{`${item.user.firstname} ${item.user.lastname}`}</RkText>
          </View>
          <RkText rkType='secondary2 hintColor'>{moment(item.createdAt).fromNow()}</RkText>
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

export default EventList

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
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginRight: 17
  }
}))
