import React, { Component } from 'react'
import { View, Image, Keyboard, TextInput, Button } from 'react-native'
import { RkButton, RkText, RkAvoidKeyboard, RkStyleSheet } from 'react-native-ui-kitten'
import { FontAwesome } from '../../../assets/icons/'
import { GradientButton } from '../../components/gradientButton'
import { scaleVertical } from '../../config/utils/scale'
import { Mutation } from 'react-apollo'
import client, { mutations, queries } from '../../client'
import deviceStorage from '../../services/deviceStorage'
// import styles from './styles'

import LinearGradient from 'react-native-linear-gradient'

class LoginScreen extends Component {
  state = {
    username: '',
    password: ''
  }

  onLoginPress = async () => {
    try {
      const { data: { signIn: { token } } } = await client.mutate({
        mutation: mutations.SIGN_IN,
        variables: {
          username: this._textInputUsn._lastNativeText,
          password: this._textInputPwd._lastNativeText
        },
        fetchPolicy: 'no-cache'
      })
      await deviceStorage.saveKey('auth.token', token)
      const { data } = await client.query({
        query: queries.GET_ME,
        fetchPolicy: 'network-only'
      })
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

  getRandomImageSource = (randomNumber) =>
    randomNumber === 1
      ? require('../../../assets/images/1.png')
      : randomNumber === 2
        ?  require('../../../assets/images/2.png')
        : randomNumber === 3
          ? require('../../../assets/images/3.png')
          : require('../../../assets/images/4.png')

  renderImage = () => {
    const randomNumber = Math.round(Math.random()*4)
    return  (
      <Image style={styles.image} source={this.getRandomImageSource(randomNumber)}/>
    )
  }

  render() {
    const { onLoginPress } = this
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}
      >
        <LinearGradient
          colors={['#1d262d', '#16304e', '#6b83aa', '#e7e5e9']}
          style={styles.screenBackground}
        >
          <View style={styles.header}>
            {this.renderImage()}
          </View>
          <View style={styles.content}>
            <View>
              <TextInput
                ref={(component) => { this._textInputUsn = component } }
                style={styles.inputText}
                placeholder='Username'
              />
              <TextInput
                ref={(component) => { this._textInputPwd = component } }
                style={styles.inputText}
                placeholder='Password'
                secureTextEntry
              />
              <GradientButton
                style={styles.loginButton}
                onPress={this.onLoginPress}
                text='LOGIN'
                rkType='large'
                colors={['#ff7fa3', '#ff8c7f', '#ff7fe3']}
              />
            </View>
            <View style={styles.buttons}>
              <RkButton style={styles.button} rkType='social'>
                <RkText style={styles.tweeterButton} rkType='awesome hero'>
                  {FontAwesome.twitter}
                </RkText>
              </RkButton>
              <RkButton style={styles.button} rkType='social'>
                <RkText style={styles.googleButton} rkType='awesome hero'>
                  {FontAwesome.google}
                </RkText>
              </RkButton>
              <RkButton style={styles.button} rkType='social'>
                <RkText style={styles.fbButton} rkType='awesome hero'>
                  {FontAwesome.facebook}
                </RkText>
              </RkButton>
            </View>
            <View style={styles.footer}>
              <View style={styles.textRow}>
                <RkText rkType='primary3'>Don’t have an account? </RkText>
                <RkButton rkType='clear' onPress={this.onSignUpButtonPressed}>
                  <RkText style={styles.signUpButton} rkType='header6'>Sign up now</RkText>
                </RkButton>
              </View>
            </View>
          </View>
        </LinearGradient>
      </RkAvoidKeyboard>
    )
  }
}

export default LoginScreen

const styles = RkStyleSheet.create((theme) => ({
  screen: { flex: 1 },
  screenBackground: {
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#1d262d'
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  image: {
    height: scaleVertical(100),
    resizeMode: 'contain',
    flex: 1
  },
  content: {
    justifyContent: 'space-between',
    flex: 2
  },
  inputText: {
    fontSize: 16,
    fontWeight: 'bold',
    height: 47,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 9,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#fff',
    backgroundColor: '#fff',
    marginTop: 20
  },
  loginButton: {
    marginTop: 20
  },
  button: {
    borderColor: theme.colors.border.solid
  },
  tweeterButton: {
    color: '#1DA1F2'
  },
  googleButton: {
    color: '#E45B49'
  },
  fbButton: {
    color: '#4267B2'
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
  signUpButton: {
    color: '#16304e'
  },
  footer: {}
}))
