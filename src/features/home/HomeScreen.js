import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { Button } from 'react-native-elements'
import routes from '../../navigation/routes'
import client, { signOut, queries } from '../../client'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }

  componentDidMount = async () => {}

  handleLogout = async () => {
    await signOut()
    await this.props.refetch()
  }

  getMe = async () => {
    const {
      data: { session }
    } = await client.query({ query: queries.GET_LOCAL_SESSION })
    console.log('session: ', session)
  }

  render() {
    const {
      handleLogout,
      props: {
        session: { username, email }
      }
    } = this

    return (
      <StyledView>
        <UsrText>
          Username: <BoldText>{username}</BoldText>
        </UsrText>
        <UsrText>
          Email: <BoldText>{email}</BoldText>
        </UsrText>
        <View style={{ flex: 1, paddingTop: 30 }}>
          <ButtonStyled
            title='MobX Stores'
            onPress={() => this.props.navigation.navigate(routes.COUNTER_MOBX)}
          />
          <ButtonStyled title='Log out' onPress={handleLogout} />
        </View>
      </StyledView>
    )
  }
}

const StyledView = styled.View`
  flex: 1;
`

const UsrText = styled.Text`
  font-size: 14px;
  margin-top: 30px;
  text-align: center;
`
const BoldText = styled.Text`
  font-weight: 700;
`

const ButtonStyled = styled(Button)`
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 5px;
  height: 45px;
  margin-top: 10px;
`

export default HomeScreen
