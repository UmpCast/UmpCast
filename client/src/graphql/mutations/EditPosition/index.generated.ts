/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type EditPositionMutationVariables = Types.Exact<{
    input: Types.UpdatePositionInput
}>

export type EditPositionMutation = {
    __typename?: 'Mutation'
    updatePosition: {
        __typename?: 'UpdatePositionPayload'
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    }
}

export const EditPositionDocument = gql`
    mutation EditPosition($input: UpdatePositionInput!) {
        updatePosition(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useEditPositionMutation() {
    return Urql.useMutation<EditPositionMutation, EditPositionMutationVariables>(
        EditPositionDocument
    )
}
