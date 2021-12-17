import { gql } from '@apollo/client'

const userSchema = gql`
    extend type UserType {
        ownedOrganizationList: [OrganizationType!]!
    }

    extend type Mutation {
        isConfigure(uid: ID!): Boolean!
        sendEmailVerification(input: sendEmailVerificationInput): Boolean
    }

    input sendEmailVerificationInput {
        route: String!
        email: String!
    }
`

export default userSchema
