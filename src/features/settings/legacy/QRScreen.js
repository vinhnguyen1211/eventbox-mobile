import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native'
import ScannerScreen from './ScannerScreen'
import { withNavigationFocus } from 'react-navigation'
import { Button } from 'react-native-elements'

class ScanScreen extends Component {
  state = {
    shouldShowCamera: false
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log('show: ', this.props.isFocused)
  }

  renderCamera() {
    const isFocused = this.props.navigation.isFocused()
    const { shouldShowCamera } = this.state
    if (shouldShowCamera && isFocused) {
      return <ScannerScreen />
    } else {
      return null
    }
  }

  handleShowCamera = () => {
    this.setState({ shouldShowCamera: !this.state.shouldShowCamera })
  }

  render() {
    const {
      handleShowCamera,
      state: { shouldShowCamera }
    } = this

    return (
      <View style={{ flex: 1, paddingTop: 28 }}>
        <View style={{ flex: 1, padding: 12 }}>
          <Button
            title={shouldShowCamera ? 'Turn off camera' : 'Show camera'}
            onPress={handleShowCamera}
          />
        </View>
        <View style={{ flex: 3 }}>{this.renderCamera()}</View>
      </View>
    )
  }
}

export default withNavigationFocus(ScanScreen)
