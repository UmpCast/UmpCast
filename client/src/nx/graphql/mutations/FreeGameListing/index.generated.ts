/* eslint-disable */
import * as Types from '../../schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type FreeGameListingMutationVariables = Types.Exact<{
    input: Types.UnassignGameListingInput
}>

export type FreeGameListingMutation = {
    __typename?: 'Mutation'
    unassignGameListing: { __typename?: 'UnassignGameListingPayload'; success: boolean }
}

export const FreeGameListingDocument = gql`
    mutation FreeGameListing($input: UnassignGameListingInput!) {
        unassignGameListing(input: $input) {
            success
        }
    }
`

export function useFreeGameListingMutation() {
    return Urql.useMutation<FreeGameListingMutation, FreeGameListingMutationVariables>(
        FreeGameListingDocument
    )
}
