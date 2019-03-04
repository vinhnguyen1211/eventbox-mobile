import React from 'react'

import { ScrollView, Image, View, TouchableOpacity } from 'react-native'
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten'
import { Avatar } from '../../../components/avatar'
import { Query } from 'react-apollo'
import { queries } from '../../../client'
import { Text } from 'react-native-elements'
import HTMLView from 'react-native-htmlview'

const moment = require('moment')

class EventInfoView extends React.Component {
  static propTypes = {
    // navigation: NavigationType.isRequired
  }
  // static navigationOptions = {
  //   title: 'Article View'.toUpperCase()
  // }

  onAvatarPressed = () => {
    // this.props.navigation.navigate('ProfileV1', { id: this.data.user.id })
  }

  render() {
    const { eventId } = this.props

    return (
      <Query query={queries.GET_EVENT_DETAIL} variables={{ eventId }}>
        {({ data, loading }) => {
          if (loading) {
            return <View />
          }
          const { event } = data
          return (
            <ScrollView style={styles.root}>
              <RkCard rkType='article'>
                <Image rkCardImg source={{ uri: event.images && event.images.thumbnail }} />
                <View rkCardHeader>
                  <View>
                    <RkText style={styles.title} rkType='header4'>
                      {event.title}
                    </RkText>
                    <RkText rkType='secondary2 hintColor'>
                      {moment(event.createdAt).fromNow()}
                    </RkText>
                  </View>
                  <TouchableOpacity onPress={this.onAvatarPressed}>
                    <Avatar rkType='circle' img={{ uri: event.user.photo }} />
                  </TouchableOpacity>
                </View>
                <View rkCardContent>
                  <View>
                    {/* <RkText rkType='primary3 bigLine'>{event.shortDescription}</RkText> */}
                    <HTMLView value={event.rawHtmlContent} />
                  </View>
                </View>
                <View rkCardFooter>
                  {/* <SocialBar /> */}
                  <Text>Footer</Text>
                </View>
              </RkCard>
            </ScrollView>
          )
        }}
      </Query>
    )
  }
}

const styles = RkStyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  }
}))

export default EventInfoView
