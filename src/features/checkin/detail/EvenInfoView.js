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
    const htmlContent = `
    <p><strong>Đại nhạc hội và trao giải POPS Awards – A New Millennium</strong></p>
    <p><strong>Diễn ra vào lúc 18:30&nbsp;ngày 15.03.2019, tại Nhà thi đấu Quân Khu 7</strong></p>
    <p>
      <strong>POPS Awards – Kỷ Nguyên Mới</strong> là phiên bản đặc biệt của chương trình trình diễn
      trao giải thường niên POPS Awards nhân dịp kỷ niệm 10 năm phát triển của POPS với những dấu ấn đặc
      biệt gắn liền với sự phát triển của thị trường kỹ thuật số nói chung.
    </p>
    <p>
      🎼 Đây cũng là chương trình trình diễn và trao giải <em>lần thứ 5</em> của POPS Awards nhằm mở ra
      một giai đoạn phát triển mới của POPS trước những chuyển biến hết sức sôi động của thị trường
      trong thời điểm hiện tại.
    </p>
    <p>
      🎼 Chương trình với sự góp mặt của những nghệ sĩ hàng đầu như: Đàm Vĩnh Hưng, Hà Anh Tuấn, Tuấn
      Hưng, Trúc Nhân , Bảo Anh, nhóm Uni5, Han Sara, Tố My, nhóm nhạc thần tượng Z-Stars đến từ Hàn
      Quốc,…và hàng trăm ngôi sao nổi tiếng của V-biz.
    </p>
    <p><strong>BTC xin thông báo về cách thức đăng ký vé như sau:</strong></p>
    <p>
      👍Các bạn chỉ đăng ký tài khoản tại website đăng ký thì mã vé sẽ được gửi đến email của các bạn.
    </p>
    <p>
      ✌ Mỗi tài khoản chỉ được đăng ký 1 lần (tối đa 1 vé) nếu phát hiện sự trùng lập BTC có thể huỷ vé
      của các bạn
    </p>
    <p>
      🛑 Mã vé chỉ được gửi đến mail cá nhân của người đăng ký thế nên hi vọng mọi người không để lộ vé
      của mình ra ngoài.
    </p>
    <p><strong>Các bạn in mã vé và đổi vé tại:</strong></p>
    <ul>
      <li>
        Địa điểm: Tầng Trệt, Tòa nhà Viettel, 285 Cách mạng tháng Tám, Phường 12, Quận 10, TP.HCM.
      </li>
      <li>
        Thời gian: Từ 04 - 06/03/2019
        <ul>
          <li>Sáng: 9h30 -12h</li>
          <li>Chiều: 14h - 17h</li>
        </ul>
      </li>
    </ul>
    <p>
      <strong>Lưu ý:</strong> Mã vé khi đã sử dụng để đổi vé tham dự sẽ không còn giá trị, BTC không
      giải quyết bất cứ trường hợp nào đã đổi vé nhưng làm mất vé.
    </p>
    <p>
      Và cuối cùng chúc các bạn đăng ký vé thành công và có những trải nghiệm tuyệt với cùng POPS Awards
      – A New Millennium.
    </p>
    <p><br /></p>
    <figure>&nbsp;</figure>
    <p>&nbsp;</p>
    <p>Cùng xem qua các hình ảnh của POPS Award năm trước:</p>
    <p><br /></p>
    <figure>
      <img
        src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2019/02/22/678FE8.jpg"
        alt=""
        height="auto"
        width=""
      />
    </figure>
    <figure>
      <img
        src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2019/02/22/8108B5.jpg"
        alt=""
        height="auto"
        width=""
      />
    </figure>
    <figure>
      <img
        src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2019/02/22/1055E1.jpg"
        alt=""
        height="auto"
        width=""
      />
    </figure>
    <figure>
      <img
        src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2019/02/22/31713F.jpg"
        alt=""
        height="auto"
        width=""
      />
    </figure>
    <figure>
      <img
        src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2019/02/22/ADC946.jpg"
        alt=""
        height="auto"
        width=""
      />
    </figure>
    <p><br /></p>
    <p><br /></p>
    DescriptionArea.js:96 editorState:
    <p><strong>Đại nhạc hội và trao giải POPS Awards – A New Millennium</strong></p>
    <p><strong>Diễn ra vào lúc 18:30&nbsp;ngày 15.03.2019, tại Nhà thi đấu Quân Khu 7</strong></p>
    <p>
      <strong>POPS Awards – Kỷ Nguyên Mới</strong> là phiên bản đặc biệt của chương trình trình diễn
      trao giải thường niên POPS Awards nhân dịp kỷ niệm 10 năm phát triển của POPS với những dấu ấn đặc
      biệt gắn liền với sự phát triển của thị trường kỹ thuật số nói chung.
    </p>
    <p>
      🎼 Đây cũng là chương trình trình diễn và trao giải <em>lần thứ 5</em> của POPS Awards nhằm mở ra
      một giai đoạn phát triển mới của POPS trước những chuyển biến hết sức sôi động của thị trường
      trong thời điểm hiện tại.
    </p>
    <p>
      🎼 Chương trình với sự góp mặt của những nghệ sĩ hàng đầu như: Đàm Vĩnh Hưng, Hà Anh Tuấn, Tuấn
      Hưng, Trúc Nhân , Bảo Anh, nhóm Uni5, Han Sara, Tố My, nhóm nhạc thần tượng Z-Stars đến từ Hàn
      Quốc,…và hàng trăm ngôi sao nổi tiếng của V-biz.
    </p>
    <p><strong>BTC xin thông báo về cách thức đăng ký vé như sau:</strong></p>
    <p>
      👍Các bạn chỉ đăng ký tài khoản tại website đăng ký thì mã vé sẽ được gửi đến email của các bạn.
    </p>
    <p>
      ✌ Mỗi tài khoản chỉ được đăng ký 1 lần (tối đa 1 vé) nếu phát hiện sự trùng lập BTC có thể huỷ vé
      của các bạn
    </p>
    <p>
      🛑 Mã vé chỉ được gửi đến mail cá nhân của người đăng ký thế nên hi vọng mọi người không để lộ vé
      của mình ra ngoài.
    </p>
    <p><strong>Các bạn in mã vé và đổi vé tại:</strong></p>
    <ul>
      <li>
        Địa điểm: Tầng Trệt, Tòa nhà Viettel, 285 Cách mạng tháng Tám, Phường 12, Quận 10, TP.HCM.
      </li>
      <li>
        Thời gian: Từ 04 - 06/03/2019
        <ul>
          <li>Sáng: 9h30 -12h</li>
          <li>Chiều: 14h - 17h</li>
        </ul>
      </li>
    </ul>
    <p>
      <strong>Lưu ý:</strong> Mã vé khi đã sử dụng để đổi vé tham dự sẽ không còn giá trị, BTC không
      giải quyết bất cứ trường hợp nào đã đổi vé nhưng làm mất vé.
    </p>
    <p>
      Và cuối cùng chúc các bạn đăng ký vé thành công và có những trải nghiệm tuyệt với cùng POPS Awards
      – A New Millennium.
    </p>
    <p><br /></p>
    <figure>&nbsp;</figure>
    <p>&nbsp;</p>
    <p>Cùng xem qua các hình ảnh của POPS Award năm trước:</p>
    <p><br /></p>
    <figure>
      <img
        src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2019/02/22/678FE8.jpg"
        alt=""
        height="auto"
        width=""
      />
    </figure>
    <figure>
      <img
        src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2019/02/22/8108B5.jpg"
        alt=""
        height="auto"
        width=""
      />
    </figure>
    <figure>
      <img
        src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2019/02/22/1055E1.jpg"
        alt=""
        height="auto"
        width=""
      />
    </figure>
    <figure>
      <img
        src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2019/02/22/31713F.jpg"
        alt=""
        height="auto"
        width=""
      />
    </figure>
    <figure>
      <img
        src="https://tkbvn-tokyo.s3.amazonaws.com/Upload/agenda/2019/02/22/ADC946.jpg"
        alt=""
        height="auto"
        width=""
      />
    </figure>
    <p><br /></p>
    <p><br /></p>
    `

    return (
      <Query query={queries.GET_EVENT_DETAIL} variables={{ eventId }}>
        {({ data, loading }) => {
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
                    <HTMLView value={htmlContent} />
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
