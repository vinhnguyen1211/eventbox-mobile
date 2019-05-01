[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Code Style: airbnb](https://img.shields.io/badge/Code%20Style-airbnb-blue.svg)](https://github.com/airbnb/javascript)

# eventbox

**eventbox** is a small sample app written in react-native, which uses EventBox's GraphQL API as a backend and performs some basic queries and mutations using apollo-client.

## Tech Stack

- ⚛️ react-native
- 🚀 apollo-client
- 💅 styled-components
- ✅ jest

## Key Features

- [x] Support for building native code
- [x] Styling using [styled-components](https://www.styled-components.com/docs/basics#react-native)
- [x] In-app navigation/routing handled via [react-navigation](https://reactnavigation.org/)
  - creating a stack navigator
  - navigation between screens, passing parameters to routes
  - configuring the header bar
- [x] Remote data managed using [apollo-client](https://www.apollographql.com/docs/react/recipes/react-native.html)
  - queries: get first 10 repositiories by language
  - mutations: star a repository
- [x] Local data also managed by apollo-client using [apollo-link-state](https://www.apollographql.com/docs/react/essentials/local-state.html)
  - store user language selection in Apollo cache
- [x] Offline support using [apollo-cache-persist](https://github.com/apollographql/apollo-cache-persist)
  - language selection is persisted
  - repositories list can be viewed while offline
- [ ] Unit tests with [jest](https://jestjs.io/docs/en/tutorial-react-native)

## Environment

This app was developed following the steps in the react-native docs - ["Building projects with native code"](https://facebook.github.io/react-native/docs/getting-started.html). Env setup:

```
Environment:
  Node: 8.12.0
  Yarn: 1.12.3
  npm: 6.4.1
  Watchman: 4.9.0
  Xcode: 9.2/9C40b - /usr/bin/xcodebuild
  Android Studio: 3.2 AI-181.5540.7.32.5056338
```

## Getting Started

To communicate with the GraphQL server, follow the steps in ["Creating a GraphQL Eventbox Server](https://github.com/legend1250/eventbox-dashboard). After creating a server, follow these steps to start the app:

```
$ git clone https://github.com/legend1250/eventbox-mobile.git
$ cd eventbox && touch .env
$ echo "SERVER_URI_IOS=https://192.168.1.246:8000/graphql" > .env
$ echo "SERVER_URI_ANDROID=https://192.168.1.246:8000/graphql" > .env
$ yarn install
$ yarn ios OR yarn android
```

## Available Scripts

- `yarn ios` - start the app in the iOS simulator
- `yarn android` - start the app in the Android emulator
- `yarn lint` - runs eslint checks + fixes
- `yarn test` - runs available unit tests

## Screenshots

![Screen 1](assets/screenshots/screen1.png)
![Screen 2](assets/screenshots/screen2.png)
![Screen 3](assets/screenshots/screen3.png)
![Screen 4](assets/screenshots/screen4.png)
![Screen 5](assets/screenshots/screen5.png)
