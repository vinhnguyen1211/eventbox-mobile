import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { RkText, RkButton, RkStyleSheet } from 'react-native-ui-kitten'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'

const { width, height } = Dimensions.get('window')

// Home: HomeScreen,
//     MobX: CounterScreen,
//     Settings: SettingsScreen
const routes = [
  {
    screen: 'Home',
    title: 'Home',
    icon: 'ios-information-circle'
  },
  {
    screen: 'MobX',
    title: 'MobX',
    icon: 'ios-cube'
  },
  {
    screen: 'Settings',
    title: 'Setting',
    icon: 'ios-options'
  }
]

class TabBarItem extends Component {
  onItemPressed = (item) => {
    console.log('props: ', this.props)
    this.props.navigation.navigate(item.screen)
  }

  render() {
    const { routeName } = this.props.navigation.state

    return (
      <SafeAreaView style={styles.root}>
        {routes.map((item) => (
          <RkButton
            rkType='tile'
            style={{ height: 40, width: width / routes.length, borderColor: 'transparent' }}
            key={item.screen}
            onPress={() => this.onItemPressed(item)}
          >
            <RkText style={styles.ic} rkType='primary moon xxlarge'>
              <Icon name={item.icon} size={25} color={`${routeName !== item.screen && 'grey'}`} />
            </RkText>
            <RkText rkType='small'>{item.title}</RkText>
          </RkButton>
        ))}
      </SafeAreaView>
    )
  }
}

export default TabBarItem

const styles = RkStyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.colors.screen.base,
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid red',
    paddingTop: 6
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  empty: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base
  },
  icon: {
    marginBottom: 16
  }
}))
