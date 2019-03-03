import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { PrimaryButton } from '../../components/Buttons'
import { Button } from 'react-native-elements'
import Card from '../../components/Card'

@inject('stores')
@observer
class CounterScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'MobX Stores'
  // }

  handleChangeStore = () => {
    const { settings } = this.props.stores
    settings.counter += 1
  }

  render() {
    const { counter, counterTen } = this.props.stores.settings

    return (
      <StyledView>
        <ButtonStyled title='🚀 UP' onPress={this.handleChangeStore} />
        <Card>
          <ContentText>
            Counter: <BoldText>{counter}</BoldText>
          </ContentText>
          <ContentText>
            TenCounter: <BoldText>{counterTen}</BoldText>
          </ContentText>
        </Card>
      </StyledView>
    )
  }
}

const StyledView = styled.View`
  background-color: powderblue;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`

const ContentText = styled.Text`
  padding-bottom: 15px;
  font-size: 16px;
`

const BoldText = styled.Text`
  font-weight: bold;
`

const ButtonStyled = styled(Button)`
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 5px;
  height: 45px;
  margin-top: 10px;
`

export default CounterScreen
