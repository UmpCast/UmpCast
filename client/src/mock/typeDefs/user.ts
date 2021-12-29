import { gql } from '@apollo/client'

const userSchema = gql`
    extend type UserType {
        ownedOrganizationList: [OrganizationType!]!
    }

    extend type Mutation {
        isConfigure(uid: ID!): Boolean!
        sendEmailVerification(
            input: SendEmailVerificationInput!
            url: String!
            iosBundleId: String!
            androidPackageName: String!
            androidMinimumVersion: String!
            dynamicLinkDomain: String!
        ): SendEmailVerificationPayload!
    }

    input SendEmailVerificationInput {
        email: String!
    }

    type SendEmailVerificationPayload {
        errors: [InputError!]
    }
`

export default userSchema
