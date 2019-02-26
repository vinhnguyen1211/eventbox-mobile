import React from 'react'
import { Query } from 'react-apollo'
import { queries } from '../../client'
// import Error from '../../components/Error'
import Loading from '../../components/Loading'

const withSession = (Component) => (props) => (
  <Query query={queries.GET_ME} fetchPolicy='cache-and-network'>
    {({ data, error, loading, refetch }) => {
      // console.log('withSession: ', JSON.stringify({ data, error, loading }))
      if (loading) {
        return <Loading />
      }
      // if (error) {
      //   return <Error />
      // }
      return <Component {...props} session={data} refetch={refetch} />
    }}
  </Query>
)

export default withSession
