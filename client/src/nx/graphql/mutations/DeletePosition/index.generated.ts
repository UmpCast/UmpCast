import * as Types from '../../schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type DeletePositionMutationVariables = Types.Exact<{
    input: Types.DeletePositionInput
}>

export type DeletePositionMutation = {
    __typename?: 'Mutation'
    deletePosition: {
        __typename?: 'DeletePositionPayload'
        success: boolean | null
    } | null
}

export const DeletePositionDocument = gql`
    mutation DeletePosition($input: DeletePositionInput!) {
        deletePosition(input: $input) {
            success
        }
    }
`

export function useDeletePositionMutation() {
    return Urql.useMutation<
        DeletePositionMutation,
        DeletePositionMutationVariables
    >(DeletePositionDocument)
}
