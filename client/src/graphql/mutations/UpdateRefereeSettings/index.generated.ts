/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UpdateRefereSettingsMutationVariables = Types.Exact<{
    input: Types.UpdateSeasonParticipantPermitInput
}>

export type UpdateRefereSettingsMutation = {
    __typename?: 'Mutation'
    updateSeasonParticipantPermit: {
        __typename?: 'UpdateSeasonParticipantPermitPayload'
        success: boolean
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    }
}

export const UpdateRefereSettingsDocument = gql`
    mutation UpdateRefereSettings($input: UpdateSeasonParticipantPermitInput!) {
        updateSeasonParticipantPermit(input: $input) {
            success
            errors {
                key
                message
            }
        }
    }
`

export function useUpdateRefereSettingsMutation() {
    return Urql.useMutation<
        UpdateRefereSettingsMutation,
        UpdateRefereSettingsMutationVariables
    >(UpdateRefereSettingsDocument)
}
