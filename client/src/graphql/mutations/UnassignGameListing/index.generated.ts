/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UnassignGameListingMutationVariables = Types.Exact<{
    input: Types.UnassignGameListingInput
}>

export type UnassignGameListingMutation = {
    __typename?: 'Mutation'
    unassignGameListing: {
        __typename?: 'UnassignGameListingPayload'
        success: boolean
    }
}

export const UnassignGameListingDocument = gql`
    mutation UnassignGameListing($input: UnassignGameListingInput!) {
        unassignGameListing(input: $input) {
            success
        }
    }
`

export function useUnassignGameListingMutation() {
    return Urql.useMutation<
        UnassignGameListingMutation,
        UnassignGameListingMutationVariables
    >(UnassignGameListingDocument)
}
