import { gql } from 'urql'

const organizationSchema = gql`
    extend type Query {
        organization(id: ID!): Organization
    }

    enum OrganizationRoleType {
        OWNER
        MEMBER
    }

    type Organization {
        id: ID!

        dateCreated: DateTime!

        dateUpdated: DateTime!

        name: String!

        description: String

        email: String

        logoUrl: String

        websiteUrl: String

        members: [OrganizationMemberEdge!]!

        seasons: [Season!]!
    }

    """
    Represents a user in the organization
    """
    type OrganizationMemberEdge {
        node: User!

        """
        The membership of the user in the organization
        """
        membership: OrganizationMembership!

        """
        Indicates whether member is participating in a particular season in the organization
        """
        isParticipating(id: ID!): Boolean
    }

    """
    Membership of a user in an organization
    """
    type OrganizationMembership {
        id: ID!

        dateCreated: DateTime!

        dateUpdated: DateTime!

        """
        The role of the user in the organization
        """
        role: OrganizationRoleType!
    }

    extend type Mutation {
        createOrganization(
            input: CreateOrganizationInput!
        ): CreateOrganizationPayload

        updateOrganization(
            input: UpdateOrganizationInput!
        ): UpdateOrganizationPayload

        deleteOrganization(
            input: DeleteOrganizationInput!
        ): DeleteOrganizationPayload

        joinOrganization(input: JoinOrganizationInput!): JoinOrganizationPayload

        leaveOrganization(
            input: LeaveOrganizationInput!
        ): LeaveOrganizationPayload
    }

    input CreateOrganizationInput {
        name: String!

        description: String

        email: String

        logoB64: String

        websiteUrl: String
    }

    type CreateOrganizationPayload {
        organization: Organization

        errors: [InputError!]!
    }

    input UpdateOrganizationInput {
        organizationId: ID!

        name: String

        description: String

        email: String

        logoB64: String

        websiteUrl: String
    }

    type UpdateOrganizationPayload {
        errors: [InputError!]!

        organization: Organization
    }

    input DeleteOrganizationInput {
        organizationId: ID!
    }

    type DeleteOrganizationPayload {
        success: Boolean!

        organization: Organization
    }

    input JoinOrganizationInput {
        organizationId: ID!
    }

    type JoinOrganizationPayload {
        success: Boolean!

        organization: Organization
    }

    input LeaveOrganizationInput {
        organizationId: ID!
    }

    type LeaveOrganizationPayload {
        success: Boolean!

        organization: Organization
    }
`
export default organizationSchema
