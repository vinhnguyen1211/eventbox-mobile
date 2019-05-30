import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { RkStyleSheet } from 'react-native-ui-kitten'

const moment = require('moment')

const { width } = Dimensions.get('window')

class TicketInfo extends Component {
  static navigationOptions = {
    title: 'Tickets'
  }

  render() {
    const { navigation } = this.props
    const ticketInfo = navigation.getParam('ticket', {})
    // console.log('ticketInfo: ', ticketInfo)

    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 24 }}>
          <SvgUri
            width={width - 48}
            height={width - 48}
            source={{ uri: ticketInfo.ticketSvgSrc }}
          />
        </View>
        <View style={{ padding: 12 }}>
          <Text style={[styles.largeText, styles.paddingText]}>
            <Text style={{ color: '#77797A' }}>
              Code: <Text style={{ fontSize: 14, color: '#404142' }}>{ticketInfo.code}</Text>
            </Text>
          </Text>
          <Text style={[styles.largeText, styles.paddingText]}>
            <Text style={{ color: '#77797A' }}>Status: </Text>
            {ticketInfo.checkedIn ? (
              <Text style={{ color: '#78909c', fontStyle: 'italic' }}>Already used</Text>
            ) : (
              <Text style={{ color: '#81c784', fontWeight: 'bold' }}>Available</Text>
            )}
          </Text>
          <Text style={[styles.largeText, styles.paddingText]}>
            <Text style={{ color: '#77797A' }}>
              Registered at:{' '}
              <Text style={{ color: '#404142' }}>
                {moment(ticketInfo.createdAt).format('DD/MM/YYYY HH:mm:ss')}
              </Text>
            </Text>
          </Text>
        </View>
      </View>
    )
  }
}

export default TicketInfo

const styles = RkStyleSheet.create((theme) => ({
  largeText: {
    fontSize: 16
  },
  paddingText: {
    paddingBottom: 14
  }
}))
