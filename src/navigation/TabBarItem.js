import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { RkText, RkButton, RkStyleSheet } from 'react-native-ui-kitten'

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
    console.log('item', item)
  }

  render() {
    return (
      <View>
        {routes.map((item) => (
          <RkButton
            rkType='tile'
            style={{ height: 30, width: 50 }}
            key={item.screen}
            onPress={() => this.onItemPressed(item)}
          >
            <RkText style={styles.icon} rkType='primary moon xxlarge'>
              {item.icon}
            </RkText>
            <RkText rkType='small'>{item.title}</RkText>
          </RkButton>
        ))}
      </View>
    )
  }
}

export default TabBarItem

const styles = RkStyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.colors.screen.base
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
