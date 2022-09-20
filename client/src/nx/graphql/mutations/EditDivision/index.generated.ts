/* eslint-disable */
import * as Types from '../../schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type EditDivisionMutationVariables = Types.Exact<{
    input: Types.UpdateDivisionInput
}>

export type EditDivisionMutation = {
    __typename?: 'Mutation'
    updateDivision: {
        __typename?: 'UpdateDivisionPayload'
        success: boolean
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    } | null
}

export const EditDivisionDocument = gql`
    mutation EditDivision($input: UpdateDivisionInput!) {
        updateDivision(input: $input) {
            success
            errors {
                key
                message
            }
        }
    }
`

export function useEditDivisionMutation() {
    return Urql.useMutation<EditDivisionMutation, EditDivisionMutationVariables>(
        EditDivisionDocument
    )
}
