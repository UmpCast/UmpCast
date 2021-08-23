import { gql, InMemoryCache } from '@apollo/client'

export const localSchema = gql`
    type TBD {
        value: String!
    }

    extend type Query {
        tbd: TBD
    }
`

export const clientCache = new InMemoryCache()
