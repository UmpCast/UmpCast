import { gql } from '@apollo/client'

const GET_NETWORK_ERROR = gql`
    query getNetworkError {
        networkError @client {
            name
            message
        }
    }
`

export default GET_NETWORK_ERROR
