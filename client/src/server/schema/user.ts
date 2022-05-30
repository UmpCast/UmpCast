import { gql } from 'urql'

const userSchema = gql`
    extend type Query {
        viewer: User
    }

    type User {
        id: ID!

        dateCreated: DateTime!

        dateUpdated: DateTime!

        email: String!

        firstName: String!

        lastName: String!

        phoneNumber: String

        profilePictureUrl: String

        zipCode: String

        city: String

        state: String

        streetAddress: String

        fullAddress: String

        """
        Organizations the user has joined
        """
        organizations: [UserJoinedOrganizationEdge!]

        """
        Seasons the user is participating in
        """
        seasons: [UserParticipatingSeasonEdge!]

        """
        Lookup a season the user is particpating in
        """
        season(id: ID!): UserParticipatingSeasonEdge
    }

    """
    Represents an organization a user joined
    """
    type UserJoinedOrganizationEdge {
        node: Organization!

        """
        The membership of the user in the organization
        """
        membership: OrganizationMembership!
    }

    """
    Represents a season the user is participating in
    """
    type UserParticipatingSeasonEdge {
        node: Season!

        """
        The membership of the user in the organization that owns the season
        """
        permit: SeasonParticipationPermit!
    }

    extend type Mutation {
        createUser(input: CreateUserInput!): CreateUserPayload

        updateUser(input: UpdateUserInput!): UpdateUserPayload
    }

    input CreateUserInput {
        firstName: String!

        lastName: String!

        phoneNumber: String
    }

    type CreateUserPayload {
        user: User

        errors: [InputError!]!
    }

    input UpdateUserInput {
        userId: ID!

        firstName: String

        lastName: String

        phoneNumber: String

        profilePictureB64: String

        streetAddress: String

        city: String

        state: String

        zipCode: String
    }

    type UpdateUserPayload {
        user: User

        errors: [InputError!]!
    }
`
export default userSchema
