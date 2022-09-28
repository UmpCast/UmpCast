/* eslint-disable */
import * as Types from '../../schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type EditSeasonMutationVariables = Types.Exact<{
    input: Types.UpdateSeasonInput
}>

export type EditSeasonMutation = {
    __typename?: 'Mutation'
    updateSeason: {
        __typename?: 'UpdateSeasonPayload'
        success: boolean
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    }
}

export const EditSeasonDocument = gql`
    mutation EditSeason($input: UpdateSeasonInput!) {
        updateSeason(input: $input) {
            success
            errors {
                key
                message
            }
        }
    }
`

export function useEditSeasonMutation() {
    return Urql.useMutation<EditSeasonMutation, EditSeasonMutationVariables>(EditSeasonDocument)
}
