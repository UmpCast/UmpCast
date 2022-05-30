import { gql } from 'urql'

const positionSchema = gql`
    type Position {
        id: ID!

        dateCreated: DateTime!

        dateUpdated: DateTime!

        division: Division!

        name: String!
    }

    extend type Mutation {
        createPosition(input: CreatePositionInput!): CreatePositionPayload

        deletePosition(input: DeletePositionInput!): DeletePositionPayload
    }

    input CreatePositionInput {
        divisionId: ID!

        name: String!
    }

    type CreatePositionPayload {
        position: Position

        errors: [InputError!]!
    }

    input DeletePositionInput {
        positionId: ID!
    }

    type DeletePositionPayload {
        position: Position
    }
`
export default positionSchema
