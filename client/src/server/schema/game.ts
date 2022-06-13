import { gql } from 'urql'

const gameSchema = gql`
    extend type Query {
        game(id: ID!): Game
    }

    extend type Mutation {
        createGame(input: CreateGameInput!): CreateGamePayload
    }

    type Game {
        id: ID!

        dateCreated: DateTime!

        dateUpdated: DateTime!

        """
        The division of the game
        """
        division: Division!

        name: String!

        startTime: DateTime!

        endTime: DateTime

        location: String

        listings: [GameListing!]!
    }

    """
    A listing for a game
    """
    type GameListing implements Node {
        id: ID!

        dateCreated: DateTime!

        dateUpdated: DateTime!

        """
        The name of the listing
        """
        name: String!

        """
        A listing may have been generated from a position
        """
        position: Position

        """
        The user, if exists, that has been assigned to the listing
        """
        assignee: GameListingAssigneeEdge

        canAssignSelf: Boolean

        canChangeAssignee: Boolean
    }

    """
    Represents a user assigned to a game listing
    """
    type GameListingAssigneeEdge {
        node: User!

        permit: SeasonParticipationPermit!
    }

    input CreateGameInput {
        divisionId: ID!

        name: String!

        startTime: DateTime!

        endTime: DateTime

        location: String
    }

    type CreateGamePayload {
        game: Game

        errors: [InputError!]!
    }
`
export default gameSchema
