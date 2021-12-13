import { gql } from '@apollo/client'

const socialAuthSchema = gql`
    extend type Mutation {
        socialAuth(provider: String!, accessToken: String!): SimpleJSONWebToken
    }

    type SimpleJSONWebToken {
        token: String!
        refreshToken: String!
    }
`

export default socialAuthSchema
