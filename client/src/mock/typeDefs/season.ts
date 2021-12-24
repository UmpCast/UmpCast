import { gql } from '@apollo/client'

const seasonSchema = gql`
    extend type Mutation {
        createSeason(input: createSeasonInput): createSeasonPayload
    }

    extend type SeasonType {
        organization: OrganizationType!
    }

    input createSeasonInput {
        name: String!
        organization: ID!
        startDate: DateTime!
        endDate: DateTime!
    }

    type createSeasonPayload {
        record: SeasonType
    }
`
export default seasonSchema
