/* eslint-disable */
import * as Types from '../../schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type DeleteDivisionMutationVariables = Types.Exact<{
    input: Types.DeleteDivisionInput
}>

export type DeleteDivisionMutation = {
    __typename?: 'Mutation'
    deleteDivision: { __typename?: 'DeleteDivisionPayload'; success: boolean } | null
}

export const DeleteDivisionDocument = gql`
    mutation DeleteDivision($input: DeleteDivisionInput!) {
        deleteDivision(input: $input) {
            success
        }
    }
`

export function useDeleteDivisionMutation() {
    return Urql.useMutation<DeleteDivisionMutation, DeleteDivisionMutationVariables>(
        DeleteDivisionDocument
    )
}
