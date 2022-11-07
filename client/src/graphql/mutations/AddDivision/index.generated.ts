/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AddDivisionMutationVariables = Types.Exact<{
    input: Types.CreateDivisionInput
}>

export type AddDivisionMutation = {
    __typename?: 'Mutation'
    createDivision: {
        __typename?: 'CreateDivisionPayload'
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    }
}

export const AddDivisionDocument = gql`
    mutation AddDivision($input: CreateDivisionInput!) {
        createDivision(input: $input) {
            errors {
                key
                message
            }
        }
    }
`

export function useAddDivisionMutation() {
    return Urql.useMutation<AddDivisionMutation, AddDivisionMutationVariables>(
        AddDivisionDocument
    )
}
