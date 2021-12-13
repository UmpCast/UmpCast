import { gql } from '@apollo/client'

const userSchema = gql`
    extend type UserType {
        ownedOrganizationList: [OrganizationType!]!
    }

    extend type Mutation {
        isConfigure(uid: ID!): Boolean!
    }
`

export default userSchema
