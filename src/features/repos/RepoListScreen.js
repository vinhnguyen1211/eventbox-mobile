import React from 'react'
import { Query } from 'react-apollo'
import { View } from 'react-native'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import RepoListView from './RepoListView'
// import { GET_REPOSITORIES } from './operations';
import { GET_EVENTS_HOMEPAGE } from './queries'
import client from '../../client'

class ReposScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `🎉 ${navigation.getParam('selectedLanguage')} Repos`
  })

  componentDidMount = async () => {
    try {
      const result = await client.query({ query: GET_EVENTS_HOMEPAGE })
      console.log('result: ', result)
    } catch (error) {
      console.log('error: ', error)
    }
    // http://localhost:3000/files
    // fetch('http://10.0.2.2:3000/files')
    // .then(res => res.json())
    // .then(res => {
    //   console.log('res: ',res);
    // })
    // .catch(err => console.log(err))
  }

  render() {
    // const selectedLanguage = this.props.navigation.getParam('selectedLanguage');

    return (
      <View />
      // <Query query={GET_EVENTS_HOMEPAGE} >
      //   {({ loading, error, data }) => {
      //     if (loading) {
      //       return <Loading />;
      //     }
      //     if (error) {
      //       return <Error title="Failed to load repositories" details={error.message} />;
      //     }
      //     console.log('data: ',data);
      //     // const repos = data.search ? data.search.nodes : null;
      //     // return <RepoListView repos={repos} />;
      //     return <View />
      //   }}
      // </Query>
    )
  }
}

export default ReposScreen
