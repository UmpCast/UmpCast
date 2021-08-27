import { gql } from '@apollo/client'

export const GET_LOADER_STYLES = gql`
    query GetLoaderStyles {
        loader @client {
            styles {
                icon
                title
                message
            }
        }
    }
`
