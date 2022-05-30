import { gql } from 'urql'

const firebaseSchema = gql`
    extend type Mutation {
        sendSignInLink(input: SendSignInLinkInput!): SendSignInLinkPayload
    }

    input SendSignInLinkInput {
        email: String!

        actionCodeSettings: ActionCodeSettingsInput!
    }

    input ActionCodeSettingsInput {
        url: String!

        iosBundleId: String!

        androidPackageName: String!

        androidMinimumVersion: String!

        dynamicLinkDomain: String!
    }

    type SendSignInLinkPayload {
        errors: [InputError!]!
    }
`
export default firebaseSchema
