import React, { Component } from 'react'
import client, { queries } from '../../client'
import { FlatList, View, Image, TouchableOpacity, Text } from 'react-native'
import { RkCard, RkStyleSheet, RkText } from 'react-native-ui-kitten'

const moment = require('moment')

class TicketScreen extends Component {
  static navigationOptions = {
    headerTitleStyle: { textAlign: 'center', flex: 1 },
    headerTitle: 'My Tickets'
  }

  render() {
    return <TicketList {...this.props} />
  }
}

export default TicketScreen

class TicketList extends Component {
  state = {
    events: []
  }

  componentDidMount = async () => {
    try {
      const { data } = await client.query({
        query: queries.MY_TICKETS
      })
      this.setState({ events: data.myTickets })
      console.log('data: ', data)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  extractItemKey = (item) => `${item.code}`

  onItemPressed = (item) => {
    // console.log('item: ', item)
    this.props.navigation.navigate('TicketInfo', { ticket: item })
    // console.log('navigaiton: ', this.props.navigation)
  }

  renderItem = ({ item }) => {
    const onPress = () => {
      this.onItemPressed(item)
    }

    return (
      <TouchableOpacity delayPressIn={70} activeOpacity={0.8} onPress={onPress}>
        <RkCard rkType='horizontal' style={styles.card}>
          <Image
            rkCardImg
            source={{
              uri: item.eventInfo && item.eventInfo.images && item.eventInfo.images.thumbnail
            }}
          />
          <View rkCardContent>
            <RkText numberOfLines={1} rkType='header6'>
              {item.eventInfo && item.eventInfo.title}
            </RkText>
            <RkText rkType='secondary6 hintColor'>
              {/* {`${item.user.firstName} ${item.user.lastName}`} */}
              {moment(item.createdAt).fromNow()}
            </RkText>
            <RkText style={styles.post} numberOfLines={2} rkType='secondary1'>
              {item.checkedIn ? (
                <Text style={{ color: '#78909c', fontStyle: 'italic' }}>Already used</Text>
              ) : (
                <Text style={{ color: '#81c784', fontWeight: 'bold' }}>Available</Text>
              )}
            </RkText>
          </View>
          <View rkCardFooter>{/* <SocialBar rkType='space' showLabel /> */}</View>
        </RkCard>
      </TouchableOpacity>
    )
  }

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
    paddingHorizontal: 14
  },
  card: {
    marginVertical: 8
  },
  post: {
    marginTop: 13
  }
}))
