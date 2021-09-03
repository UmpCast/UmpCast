import { gql } from '@apollo/client'

export const localSchema = gql`
    type Authorization {
        refreshToken: String!
        accessToken: String!
    }

    extend type Query {
        authorization: Authorization!
    }
`
