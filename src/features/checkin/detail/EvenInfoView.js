import React from 'react'

import {
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  Platform
} from 'react-native'
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten'
import { Avatar } from '../../../components/avatar'
import { Query } from 'react-apollo'
import { queries } from '../../../client'
import { Text } from 'react-native-elements'
import HTMLView from 'react-native-htmlview'

const { width, height } = Dimensions.get('window')
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

  renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == 'img') {
      const { src } = node.attribs
      // const imageHeight = !isNaN(height) ? height : 120
      return (
        <Image
          key={index}
          style={{ width: width * 0.95, height: width * 0.8 }}
          source={{ uri: src }}
          resizeMethod='auto'
        />
      )
    }
  }

  render() {
    const { eventId } = this.props
    const isAndroid = Platform.OS === 'android'

    return (
      <Query query={queries.GET_EVENT_DETAIL} variables={{ eventId }}>
        {({ data, loading }) => {
          if (loading) {
            return <View />
          }
          const { event } = data
          const htmlDescription = event.rawHtmlContent.replace(/<(\/)?p>/g, '')
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
                    <HTMLView value={htmlDescription} renderNode={this.renderNode} />
                  </View>
                </View>
                {/* <View rkCardFooter>
                  <Text>Footer</Text>
                </View> */}
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
