import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import HomeScreen from '../features/home/HomeScreen'
// import RepoSelectionScreen from '../features/repos/RepoSelectionScreen'
// import RepoListScreen from '../features/repos/RepoListScreen'
// import CounterScreen from '../features/mobx/CounterScreen'
import LoginScreen from '../features/login/LoginScreen'
// import HomeContainer from '../features/home/HomeContainer'
import routes from './routes'
import { HomeScreen, SettingsScreen } from './AppStack'
import AuthLoadingScreen from './AuthLoadingScreen'
import HomeIconWithBadge from './IconWithBadge'

const AppStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let IconComponent = Ionicons
        let iconName
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge
        } else if (routeName === 'Settings') {
          // iconName = `ios-options${focused ? '' : '-outline'}`
          iconName = 'ios-options'
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  }
)
const AuthStack = createStackNavigator(
  {
    [routes.LOGIN]: LoginScreen
  },
  {
    initialRouteName: routes.LOGIN
  }
)

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
)

// const RootStack = createStackNavigator(
//   {
//     [routes.HOME_CONTAINER]: HomeContainer,
//     [routes.HOME]: HomeScreen,
//     [routes.LOGIN]: LoginScreen,
//     [routes.REPO_SELECTION]: RepoSelectionScreen,
//     [routes.REPO_LIST]: RepoListScreen,
//     [routes.COUNTER_MOBX]: CounterScreen
//   },
//   {
//     initialRouteName: routes.HOME_CONTAINER
//   }
// )
// export default createAppContainer(RootStack)
