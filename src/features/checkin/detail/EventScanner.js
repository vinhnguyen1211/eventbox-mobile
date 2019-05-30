import React, { Component } from 'react'
import { View, Text } from 'react-native'
import ScannerScreen from './ScannerScreen'
import { withNavigationFocus } from 'react-navigation'
import { Button } from 'react-native-elements'

class ScanScreen extends Component {
  state = {
    shouldShowCamera: false
  }

  componentDidMount = () => {
    // console.log('props: ', this.props)
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log('show: ', this.props.isFocused)
  }

  renderCamera() {
    const isFocused = this.props.navigation.isFocused()
    const { shouldShowCamera } = this.state
    if (shouldShowCamera && isFocused) {
      return <ScannerScreen eventId={this.props.eventId} />
    } else {
      return null
    }
  }

  handleShowCamera = () => {
    this.setState({ shouldShowCamera: !this.state.shouldShowCamera })
  }

  isEventEnd = () => {
    const { endTime } = this.props
    if (endTime) {
      const end = new Date(endTime)
      const now = new Date()
      return now >= end
    }
    return true
  }

  render() {
    const {
      handleShowCamera,
      isEventEnd,
      state: { shouldShowCamera }
    } = this
    const isEnd = isEventEnd()

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 12 }}>
          <Button
            title={shouldShowCamera ? 'Turn off camera' : 'Show camera'}
            onPress={handleShowCamera}
            disabled={isEnd}
          />
          {isEnd && (
            <View style={{ paddingTop: 14 }}>
              <Text>Event was close, could not scan ticket</Text>
            </View>
          )}
        </View>
        <View style={{ flex: 4 }}>{this.renderCamera()}</View>
      </View>
    )
  }
}

export default withNavigationFocus(ScanScreen)
