import React, { Component } from 'react'
import EventList from './EventList'

class EventsCheckinWrapper extends Component {
  static navigationOptions = {
    headerTitle: 'My events'
  }
  render() {
    return <EventList {...this.props} />
  }
}
export default EventsCheckinWrapper
