import { gql } from 'urql'

const seasonSchema = gql`
    extend type Query {
        season(id: ID!): Season
    }

    enum SeasonRoleType {
        REFEREE
        MANAGER
    }

    type Season {
        id: ID!

        dateCreated: DateTime!

        dateUpdated: DateTime!

        """
        The organization that owns the season
        """
        organization: Organization!

        name: String!

        endDate: DateTime!

        """
        A list of divisions owned by the season
        """
        divisions: [Division!]!

        """
        A list of games managed by the season
        """
        games(
            """
            Returns elements after the specified date
            """
            afterDate: DateTime

            after: String

            """
            Returns elements before the specified date
            """
            beforeDate: DateTime

            before: String

            first: Int

            last: Int
        ): SeasonGameConnection!

        """
        A list of users participating in the season
        """
        participants: [SeasonParticipantEdge!]!
    }

    type SeasonGameEdge {
        cursor: String!

        node: Game
    }

    type SeasonGameConnection implements Connection {
        edges: [SeasonGameEdge!]

        nodes: [Game!]

        pageInfo: PageInfo!

        totalCount: Int!
    }

    type SeasonParticipantEdge {
        """
        The user participating in the season
        """
        node: User!

        """
        The permit of the user participating in the season
        """
        permit: SeasonParticipationPermit!
    }

    """
    Permit for a user participating in a season
    """
    type SeasonParticipationPermit {
        id: ID!

        dateCreated: DateTime!

        dateUpdated: DateTime!

        """
        The membership of the user in the organization that owns the season
        """
        membership: OrganizationMembership!

        """
        List of roles assigned to the participant
        """
        roles: [SeasonRoleType!]!

        """
        Season positions available for signup if they are a referee
        """
        visibility: [Position!]
    }

    extend type Mutation {
        createSeason(input: CreateSeasonInput!): CreateSeasonPayload

        updateSeason(input: UpdateSeasonInput!): UpdateSeasonPayload

        addSeasonParticipants(
            input: AddSeasonParticipantsInput!
        ): AddSeasonParticipantsPayload

        removeSeasonParticipant(
            input: RemoveSeasonParticipantInput!
        ): RemoveSeasonParticipantPayload
    }

    input CreateSeasonInput {
        organizationId: ID!

        name: String!

        endDate: String!
    }

    type CreateSeasonPayload {
        season: Season

        errors: [InputError!]!
    }

    input UpdateSeasonInput {
        seasonId: ID!

        name: String

        endDate: String
    }

    type UpdateSeasonPayload {
        season: Season

        errors: [InputError!]!
    }

    input AddSeasonParticipantsInput {
        seasonId: ID!

        """
        List of requests to batch execute
        """
        requests: [AddSeasonParticipantRequestInput!]!
    }

    """
    An input request for adding a new season participant
    """
    input AddSeasonParticipantRequestInput {
        """
        User to add as a participant
        """
        userId: ID!

        """
        List of roles to assign the user
        """
        roles: [SeasonRoleType!]!
    }

    type AddSeasonParticipantsPayload {
        success: Boolean
    }

    input RemoveSeasonParticipantInput {
        seasonId: ID!
        userId: ID!
    }

    type RemoveSeasonParticipantPayload {
        success: Boolean
    }
`
export default seasonSchema
