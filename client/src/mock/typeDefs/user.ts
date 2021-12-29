import { gql } from '@apollo/client'

const userSchema = gql`
    extend type UserType {
        ownedOrganizationList: [OrganizationType!]!
    }

    extend type Mutation {
        isConfigure(uid: ID!): Boolean!
        sendEmailVerification(
            email: String!
            actionCodeSettings: ActionCodeSettingsInput!
        ): SendEmailVerificationPayload!
    }

    input ActionCodeSettingsInput {
        url: String!
        iosBundleId: String!
        androidPackageName: String!
        androidMinimumVersion: String!
        dynamicLinkDomain: String!
    }

    type SendEmailVerificationPayload {
        errors: [InputError!]
    }
`

export default userSchema
