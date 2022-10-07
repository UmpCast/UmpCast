/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AddSeasonParticipantsMutationVariables = Types.Exact<{
    input: Types.AddSeasonParticipantsInput
}>

export type AddSeasonParticipantsMutation = {
    __typename?: 'Mutation'
    addSeasonParticipants: { __typename?: 'AddSeasonParticipantsPayload'; success: boolean }
}

export const AddSeasonParticipantsDocument = gql`
    mutation AddSeasonParticipants($input: AddSeasonParticipantsInput!) {
        addSeasonParticipants(input: $input) {
            success
        }
    }
`

export function useAddSeasonParticipantsMutation() {
    return Urql.useMutation<AddSeasonParticipantsMutation, AddSeasonParticipantsMutationVariables>(
        AddSeasonParticipantsDocument
    )
}
