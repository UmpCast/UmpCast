import { gql } from '@apollo/client'

const seasonInviteSchema = gql`
    extend type Mutation {
        createSeasonInvite(
            input: CreateSeasonInviteInput!
        ): CreateSeasonInvitePayload
        sendSeasonInvite(input: SendSeasonInviteInput!): SendSeasonInvitePayload
        acceptSeasonInvite(
            input: AcceptSeasonInviteInput!
        ): AcceptSeasonInvitePayload
    }

    type SeasonInvite {
        id: ID!
        season: ID!
        roleList: [Role!]!
        email: String!
    }

    input CreateSeasonInviteInput {
        season: ID!
        roleList: [Role!]!
        email: String!
    }

    type CreateSeasonInvitePayload {
        id: ID!
    }

    input SendSeasonInviteInput {
        seasonInvite: ID!
    }

    type SendSeasonInvitePayload {
        id: ID!
    }

    input AcceptSeasonInviteInput {
        user: ID!
        seasonInvite: ID!
    }

    type AcceptSeasonInvitePayload {
        id: ID!
    }
`

export default seasonInviteSchema
