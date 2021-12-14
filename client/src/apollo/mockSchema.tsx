import { gql } from '@apollo/client'

const MockSchema = gql`
    type SimpleJSONWebToken {
        token: String!
        refreshToken: String!
    }

    input OrganizationCreateMutationTypeInput {
        name: String!
    }

    extend type Mutation {
        socialAuth(provider: String!, accessToken: String!): SimpleJSONWebToken
        createOrganization(
            input: OrganizationCreateMutationTypeInput!
        ): OrganizationType
    }

    interface Portal {
        organization: OrganizationType!
    }

    type ManagerPortal implements Portal {
        organization: OrganizationType!
        ManagerPermissions: [Int]
    }

    type RefereePortal implements Portal {
        organization: OrganizationType!
        maxCast: Int
    }

    type UserPortals {
        manager: [ManagerPortal]!
        referee: [RefereePortal]!
    }

    extend type UserType {
        portals: UserPortals!
    }
`

export default MockSchema
