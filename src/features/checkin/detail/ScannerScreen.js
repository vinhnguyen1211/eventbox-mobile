import React, { Component } from 'react'

import { View, Dimensions, Text } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import PopupTicket from './PopupTicket'
import client, { queries } from '../../../client'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

console.disableYellowBox = true

class QrCodeCamera extends Component {
  state = {
    visiblePopupTicket: false,
    ticketInfo: undefined
  }

  onSuccess = async ({ data: code }) => {
    const { eventId } = this.props
    try {
      console.log('variables: ', { code, eventId })
      const { data } = await client.query({
        query: queries.GET_TICKET,
        variables: { code, eventId },
        fetchPolicy: 'network-only'
      })
      if (data) {
        console.log('ticket: ', data)
        const { checkTicket: ticketInfo } = data
        this.setState({ ticketInfo, visiblePopupTicket: true })
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  onClosePopup = () => {
    this.setState({ visiblePopupTicket: false })
  }

  render() {
    const {
      onSuccess,
      onClosePopup,
      state: { visiblePopupTicket, ticketInfo }
    } = this

    return (
      <View style={{ flex: 1 }}>
        <QRCodeScanner
          showMarker
          onRead={onSuccess}
          cameraStyle={{ height: SCREEN_HEIGHT - 60 }}
          customMarker={
            <View style={styles.rectangleContainer}>
              <View style={styles.topOverlay}>
                <Text style={{ fontSize: 18, color: 'white' }}>QR CODE SCANNER</Text>
              </View>

              <View style={{ flexDirection: 'row', flex: 5 }}>
                <View style={styles.leftAndRightOverlay} />

                <View style={styles.rectangle} />

                <View style={styles.leftAndRightOverlay} />
              </View>

              <View style={styles.bottomOverlay} />
            </View>
          }
        />
        <PopupTicket visible={visiblePopupTicket} ticketInfo={ticketInfo} onCancel={onClosePopup} />
      </View>
    )
  }
}

const overlayColor = 'rgba(0,0,0,0.5)' // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65 // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005 // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'red'

const scanBarWidth = SCREEN_WIDTH * 0.46 // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025 //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00'

const iconScanColor = '#fff'

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent'
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottomOverlay: {
    flex: 2,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
}

export default QrCodeCamera
