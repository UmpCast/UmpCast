/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RemoveSeasonParticipantMutationVariables = Types.Exact<{
    input: Types.RemoveSeasonParticipantInput
}>

export type RemoveSeasonParticipantMutation = {
    __typename?: 'Mutation'
    removeSeasonParticipant: {
        __typename?: 'RemoveSeasonParticipantPayload'
        success?: boolean | null
    }
}

export const RemoveSeasonParticipantDocument = gql`
    mutation RemoveSeasonParticipant($input: RemoveSeasonParticipantInput!) {
        removeSeasonParticipant(input: $input) {
            success
        }
    }
`

export function useRemoveSeasonParticipantMutation() {
    return Urql.useMutation<
        RemoveSeasonParticipantMutation,
        RemoveSeasonParticipantMutationVariables
    >(RemoveSeasonParticipantDocument)
}
