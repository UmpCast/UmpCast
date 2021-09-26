import { gql } from '@apollo/client'

const LocalSchema = gql`
    type Authentication {
        refreshToken: String!
        accessToken: String!
    }

    extend type Query {
        authentication: Authentication!
    }
`

export default LocalSchema
