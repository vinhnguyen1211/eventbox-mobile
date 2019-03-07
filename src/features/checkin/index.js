import React, { Component } from 'react'
import EventList from './EventList'

class EventsCheckinWrapper extends Component {
  static navigationOptions = {
    headerTitleStyle: { textAlign: 'center', flex: 1 },
    headerTitle: 'My events'
  }
  render() {
    return <EventList {...this.props} />
  }
}
export default EventsCheckinWrapper
