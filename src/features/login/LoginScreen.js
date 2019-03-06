import React, { Component } from 'react'
import { View, Image, Keyboard } from 'react-native'
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten'
import { FontAwesome } from '../../../assets/icons/'
import { GradientButton } from '../../components/gradientButton'
import { scaleVertical } from '../../config/utils/scale'
import NavigationType from '../../config/navigation/propTypes'
import { Button } from 'react-native-elements'
import { Mutation } from 'react-apollo'
import client, { mutations, queries } from '../../client'
import deviceStorage from '../../services/deviceStorage'
// import styles from './styles'

class LoginScreen extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChangeUsername = (username) => {
    this.setState({ username })
  }

  handleChangePwd = (password) => {
    this.setState({ password })
  }

  onLoginPress = async (signIn) => {
    try {
      const {
        data: {
          signIn: { token }
        }
      } = await signIn()
      // console.log('token: ', token)
      await deviceStorage.saveKey('auth.token', token)
      const { data } = await client.query({
        query: queries.GET_ME,
        fetchPolicy: 'network-only'
      })
      // console.log('session: ', data)
      if (data && data.me) {
        await client.mutate({
          mutation: mutations.SET_LOCAL_SESSION,
          variables: { session: data }
        })
      }
      this.props.navigation.navigate('App')
    } catch (error) {
      console.log('error: ', error)
    }
  }

  onLoginButtonPressed = () => {
    this.props.navigation.goBack()
  }

  onSignUpButtonPressed = () => {
    this.props.navigation.navigate('SignUp')
  }

  getThemeImageSource = (theme) =>
    theme.name === 'light'
      ? require('../../../assets/images/logo.png')
      : require('../../../assets/images/logoDark.png')

  renderImage = () => (
    <Image style={styles.image} source={this.getThemeImageSource(RkTheme.current)} />
  )

  render() {
    const { username, password } = this.state
    const { handleChangeUsername, handleChangePwd, onLoginPress } = this

    return (
      <Mutation
        mutation={mutations.SIGN_IN}
        variables={{ username, password, type: 1 }}
        fetchPolicy='no-cache'
      >
        {(signIn, { data, loading, error }) => (
          <RkAvoidKeyboard
            style={styles.screen}
            onStartShouldSetResponder={() => true}
            onResponderRelease={() => Keyboard.dismiss()}
          >
            <View style={styles.header}>
              {this.renderImage()}
              <RkText rkType='light h1'>React Native</RkText>
              <RkText rkType='logo h0'>UI Kitten</RkText>
            </View>
            <View style={styles.content}>
              <View>
                <RkTextInput
                  rkType='rounded'
                  placeholder='Username'
                  onChangeText={handleChangeUsername}
                />
                <RkTextInput
                  rkType='rounded'
                  placeholder='Password'
                  secureTextEntry
                  onChangeText={handleChangePwd}
                />
                <GradientButton
                  style={styles.save}
                  rkType='large'
                  text='LOGIN'
                  onPress={() => onLoginPress(signIn)}
                />
              </View>
              <View style={styles.buttons}>
                <RkButton style={styles.button} rkType='social'>
                  <RkText rkType='awesome hero'>{FontAwesome.twitter}</RkText>
                </RkButton>
                <RkButton style={styles.button} rkType='social'>
                  <RkText rkType='awesome hero'>{FontAwesome.google}</RkText>
                </RkButton>
                <RkButton style={styles.button} rkType='social'>
                  <RkText rkType='awesome hero'>{FontAwesome.facebook}</RkText>
                </RkButton>
              </View>
              <View style={styles.footer}>
                <View style={styles.textRow}>
                  <RkText rkType='primary3'>Don’t have an account? </RkText>
                  <RkButton rkType='clear' onPress={this.onSignUpButtonPressed}>
                    <RkText rkType='header6'>Sign up now</RkText>
                  </RkButton>
                </View>
              </View>
            </View>
          </RkAvoidKeyboard>
        )}
      </Mutation>
    )
  }
}

export default LoginScreen

const styles = RkStyleSheet.create((theme) => ({
  screen: {
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    height: scaleVertical(77),
    resizeMode: 'contain'
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    borderColor: theme.colors.border.solid
  },
  footer: {}
}))
