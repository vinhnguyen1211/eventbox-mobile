import React, { Component, Fragment } from 'react'
import { View, Text } from 'react-native'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton
} from 'react-native-popup-dialog'
import client, { mutations } from '../../../client'

const INIT_STATE = {
  isSuccess: undefined,
  isChecked: false,
  timeChecked: null,
  btnDisabled: false
}

class PopupTicket extends Component {
  state = {
    ...INIT_STATE
  }

  onCancel = () => {
    this.setState({ ...INIT_STATE })
    this.props.onCancel()
  }

  onSubmit = async () => {
    const { ticketInfo, onCancel } = this.props
    if (ticketInfo) {
      const { code, eventId, checkedIn } = ticketInfo
      if (!checkedIn) {
      }
      const {
        data: { submitTicket }
      } = await client.mutate({
        mutation: mutations.TICKET_SUBMIT,
        variables: { code, eventId }
      })
      if (submitTicket && submitTicket.checkedIn) {
        this.setState({ isSuccess: 'success', btnDisabled: true }, () => {
          setTimeout(() => {
            this.setState({ ...INIT_STATE })
            onCancel()
          }, 1200)
        })
      } else {
        this.setState({ isSuccess: 'error' })
      }
    }
  }

  renderTicketInfo = () => {
    const { ticketInfo } = this.props
    if (ticketInfo && ticketInfo !== null) {
      return (
        <Fragment>
          <Text>
            Fullname: {ticketInfo.userInfo.lastname} {ticketInfo.userInfo.firstname}
          </Text>
          <Text>Email: {ticketInfo.userInfo.email}</Text>
        </Fragment>
      )
    } else {
      return null
    }
  }

  renderTicketStatus = () => {
    const { ticketInfo } = this.props
    if (ticketInfo && ticketInfo !== null) {
      if (ticketInfo.checkedIn) {
        return (
          <Text style={{ color: '#f5222d' }}>
            Ticket has been taken! ({new Date(ticketInfo.checkedInTime).toLocaleString()})
          </Text>
        )
      } else {
        return <Text style={{ color: '#52c41a' }}>Ticket is available</Text>
      }
    } else {
      return <Text style={{ color: '#faad14' }}>Ticket is not recognize</Text>
    }
  }

  render() {
    const {
      onCancel,
      onSubmit,
      renderTicketInfo,
      renderTicketStatus,
      props: { visible, ticketInfo },
      state: { isSuccess, btnDisabled }
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
              <DialogButton
                text='SUBMIT'
                disabled={!ticketInfo || ticketInfo.checkedIn || btnDisabled}
                bordered
                onPress={onSubmit}
                key='button-2'
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8'
            }}
          >
            {renderTicketInfo()}
            {renderTicketStatus()}
            {isSuccess === 'success' ? (
              <Text style={{ color: '#52c41a' }}>Ticket submitted successfully!</Text>
            ) : (
              isSuccess === 'error' && (
                <Text style={{ color: '#f5222d' }}>Ticket submitted failed!</Text>
              )
            )}
            {/* <Text>{JSON.stringify(ticketInfo)}</Text> */}
          </DialogContent>
        </Dialog>
      </View>
    )
  }
}

export default PopupTicket
