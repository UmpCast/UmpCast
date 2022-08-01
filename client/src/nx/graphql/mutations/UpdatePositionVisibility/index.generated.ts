import * as Types from '../../schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UpdatePositionVisibilityMutationVariables = Types.Exact<{
    input: Types.UpdatePositionVisibilityInput
}>

export type UpdatePositionVisibilityMutation = {
    __typename?: 'Mutation'
    updatePositionVisibility: {
        __typename?: 'UpdatePositionVisibilityPayload'
        success: boolean
    } | null
}

export const UpdatePositionVisibilityDocument = gql`
    mutation UpdatePositionVisibility($input: UpdatePositionVisibilityInput!) {
        updatePositionVisibility(input: $input) {
            success
        }
    }
`

export function useUpdatePositionVisibilityMutation() {
    return Urql.useMutation<
        UpdatePositionVisibilityMutation,
        UpdatePositionVisibilityMutationVariables
    >(UpdatePositionVisibilityDocument)
}
