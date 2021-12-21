import { gql } from '@apollo/client'

const userSchema = gql`
    extend type UserType {
        ownedOrganizationList: [OrganizationType!]!
    }

    extend type Mutation {
        isConfigure(uid: ID!): Boolean!
        sendEmailVerification(
            input: SendEmailVerificationInput!
            route: String!
        ): SendEmailVerificationPayload
    }

    input SendEmailVerificationInput {
        email: String!
    }

    type SendEmailVerificationPayload {
        errors: [InputError!]
        emailSent: Boolean!
    }
`

export default userSchema
