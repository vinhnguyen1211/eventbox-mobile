import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { PrimaryButton } from '../../components/Buttons'
import Card from '../../components/Card'

@inject('stores')
@observer
class CounterScreen extends React.Component {
  static navigationOptions = {
    title: 'MobX Stores'
  }

  handleChangeStore = () => {
    const { settings } = this.props.stores
    settings.counter += 1
  }

  render() {
    const { counter, counterTen } = this.props.stores.settings

    return (
      <StyledView>
        <PrimaryButton title='🚀 Up' onPress={this.handleChangeStore} />
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

export default CounterScreen
