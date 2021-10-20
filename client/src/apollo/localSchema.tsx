import { gql } from '@apollo/client'

const LocalSchema = gql`
    type SimpleJSONWebToken {
        token: String!
        refreshToken: String!
    }

    type Authentication {
        refreshToken: String!
        accessToken: String!
    }

    extend type Mutation {
        socialAuth(provider: String!, accessToken: String!): SimpleJSONWebToken
    }

    extend type Query {
        authentication: Authentication
    }
`

export default LocalSchema
