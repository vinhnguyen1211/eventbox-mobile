import * as React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Text } from 'react-native-elements'
import EventInfoView from './EvenInfoView'
import EventScanner from './EventScanner'
import { SafeAreaView } from 'react-navigation'

export default class EventTabView extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    index: 0,
    routes: [
      { key: 'event', title: 'Information', icon: 'ios-paper' },
      { key: 'scanner', title: 'Scanner', icon: 'ios-qr-scanner' }
    ]
  }

  componentDidMount = () => {
    const { navigation } = this.props
    // const itemId = navigation.getParam('id', '')
    // console.log('itemId: ', itemId)
  }

  _renderIcon = ({ route, color }) => <Ionicons name={route.icon} size={24} color={color} />

  _renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        renderIcon={this._renderIcon}
        style={styles.tabbar}
        tabStyle={{ flexDirection: 'row' }}
        getLabelText={({ route }) => route.title}
      />
    )
  }

  render() {
    const { navigation } = this.props
    const eventId = navigation.getParam('id', '')

    return (
      <SafeAreaView style={styles.container}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            event: () => <EventInfoView eventId={eventId} />,
            scanner: () => <EventScanner eventId={eventId} />
          })}
          renderTabBar={this._renderTabBar}
          onIndexChange={(index) => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scene: {
    flex: 1
  },
  tabbar: {
    backgroundColor: '#f64e59'
  },
  indicator: {
    backgroundColor: '#ffeb3b'
  }
})
