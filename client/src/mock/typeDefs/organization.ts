import { gql } from '@apollo/client'

const organizationSchema = gql`
    extend type Mutation {
        createOrganization(
            input: OrganizationCreateMutationTypeInput!
        ): OrganizationCreateMutationTypePayload
    }

    input OrganizationCreateMutationTypeInput {
        name: String!
        owner: ID!
    }

    type OrganizationCreateMutationTypePayload {
        id: ID!
        name: String!
    }
`
export default organizationSchema
