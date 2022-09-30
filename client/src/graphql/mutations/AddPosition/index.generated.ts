/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AddPositionMutationVariables = Types.Exact<{
    input: Types.CreatePositionInput
}>

export type AddPositionMutation = {
    __typename?: 'Mutation'
    createPosition: {
        __typename?: 'CreatePositionPayload'
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    }
}

export const AddPositionDocument = gql`
    mutation AddPosition($input: CreatePositionInput!) {
        createPosition(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useAddPositionMutation() {
    return Urql.useMutation<AddPositionMutation, AddPositionMutationVariables>(AddPositionDocument)
}
