import React from 'react'
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import routes from './routes'
//
import { AuthLoadingScreen, HomeIconWithBadge } from './components'
//
import LoginScreen from '../features/login/LoginScreen'
//
import SettingsScreen from '../features/settings/SettingsScreen'
import CounterScreen from '../features/mobx/CounterScreen'
import TabBarItem from './TabBarItem'
import ScanScreen from '../features/settings/QRScreen'
// Home stack
import HomeScreen from '../features/home/HomeScreen'
import HomeEventDetail from '../features/home/EventDetail/EventHomeDetail'
// Checkin stack
import EventsCheckin from '../features/checkin'
import EventsCheckinDetail from '../features/checkin/detail/EventTabView'

const HomeStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    HomeEventDetail: HomeEventDetail
  },
  {
    initialRouteName: 'HomeScreen'
  }
)

const CheckinStack = createStackNavigator(
  {
    EventList: EventsCheckin,
    EventDetail: EventsCheckinDetail
  },
  {
    initialRouteName: 'EventList'
  }
)

const AppStack = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Checkin: { screen: CheckinStack },
    Settings: SettingsScreen
    // Camera: ScanScreen,
    // MobX: CounterScreen
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
          // IconComponent = HomeIconWithBadge
        } else if (routeName === 'Settings') {
          // iconName = `ios-options${focused ? '' : '-outline'}`
          iconName = 'ios-options'
        } else if (routeName === 'MobX') {
          iconName = 'ios-cube'
        } else if (routeName === 'Camera') {
          iconName = 'ios-camera'
        } else if (routeName === 'Checkin') {
          iconName = 'ios-contacts'
        }

        // You can return any component that you like here!
        return (
          <IconComponent name={iconName} size={28} color={tintColor} style={{ minHeight: 26 }} />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: '#f64e59',
      inactiveTintColor: 'grey',
      labelStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14
      },
      tabStyle: {
        paddingTop: 5,
        paddingBottom: 2
      },
      style: {
        minHeight: 60
      }
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
