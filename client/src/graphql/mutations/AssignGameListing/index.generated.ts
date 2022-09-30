/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AssignGameListingMutationVariables = Types.Exact<{
    input: Types.AssignGameListingInput
}>

export type AssignGameListingMutation = {
    __typename?: 'Mutation'
    assignGameListing: { __typename?: 'AssignGameListingPayload'; success: boolean }
}

export const AssignGameListingDocument = gql`
    mutation AssignGameListing($input: AssignGameListingInput!) {
        assignGameListing(input: $input) {
            success
        }
    }
`

export function useAssignGameListingMutation() {
    return Urql.useMutation<AssignGameListingMutation, AssignGameListingMutationVariables>(
        AssignGameListingDocument
    )
}
