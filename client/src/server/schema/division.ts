import { gql } from 'urql'

const divisionSchema = gql`
    type Division {
        id: ID!

        dateCreated: DateTime!

        dateUpdated: DateTime!

        season: Season!

        name: String!

        positions: [Position!]!
    }

    extend type Mutation {
        createDivision(input: CreateDivisionInput!): CreateDivisionPayload

        deleteDivision(input: DeleteDivisionInput!): DeleteDivisionPayload
    }

    input CreateDivisionInput {
        name: String!

        seasonId: ID!
    }

    type CreateDivisionPayload {
        division: Division

        errors: [InputError!]!
    }

    input DeleteDivisionInput {
        divisionId: ID!
    }

    type DeleteDivisionPayload {
        division: Division
    }
`

export default divisionSchema
