import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from 'react-native-popup-dialog'

class PopupTicket extends Component {
  onCancel = () => {
    this.props.onCancel()
  }

  onSubmit = () => {
    this.props.onCancel()
  }

  render() {
    const {
      onCancel,
      onSubmit,
      props: { visible, ticketInfo }
    } = this

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Dialog
          onTouchOutside={onCancel}
          onDismiss={onCancel}
          width={0.9}
          visible={visible}
          rounded
          actionsBordered
          // actionContainerStyle={{
          //   height: 100,
          //   flexDirection: 'column',
          // }}
          dialogTitle={
            <DialogTitle
              title='Ticket Info'
              style={{
                backgroundColor: '#F7F7F8'
              }}
              hasTitleBar={false}
              align='left'
            />
          }
          footer={
            <DialogFooter>
              <DialogButton text='CANCEL' bordered onPress={onCancel} key='button-1' />
              <DialogButton text='OK' bordered onPress={onSubmit} key='button-2' />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8'
            }}
          >
            {/* <Text>Default Animation</Text> */}
            {!!ticketInfo && (
              <Text>
                Fullname: {ticketInfo.userInfo.lastname} {ticketInfo.userInfo.firstname}
              </Text>
            )}
            <Text>{JSON.stringify(ticketInfo)}</Text>
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}

export default PopupTicket
