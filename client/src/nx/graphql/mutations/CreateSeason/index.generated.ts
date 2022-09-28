/* eslint-disable */
import * as Types from '../../schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateSeasonMutationVariables = Types.Exact<{
    input: Types.CreateSeasonInput
}>

export type CreateSeasonMutation = {
    __typename?: 'Mutation'
    createSeason: {
        __typename?: 'CreateSeasonPayload'
        success: boolean
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    }
}

export const CreateSeasonDocument = gql`
    mutation CreateSeason($input: CreateSeasonInput!) {
        createSeason(input: $input) {
            success
            errors {
                key
                message
            }
        }
    }
`

export function useCreateSeasonMutation() {
    return Urql.useMutation<CreateSeasonMutation, CreateSeasonMutationVariables>(
        CreateSeasonDocument
    )
}
