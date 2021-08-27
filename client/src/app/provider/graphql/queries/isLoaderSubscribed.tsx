import { gql } from '@apollo/client'

export const IS_LOADER_SUBSCRIBED = gql`
    query IsLoaderSubscribed {
        loader @client {
            subscribed
        }
    }
`
