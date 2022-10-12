/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetOrCreateUserMutationVariables = Types.Exact<{ [key: string]: never }>

export type GetOrCreateUserMutation = {
    __typename?: 'Mutation'
    getOrCreateUser: { __typename?: 'CreateUserPayload'; success: boolean }
}

export const GetOrCreateUserDocument = gql`
    mutation GetOrCreateUser {
        getOrCreateUser {
            success
        }
    }
`

export function useGetOrCreateUserMutation() {
    return Urql.useMutation<GetOrCreateUserMutation, GetOrCreateUserMutationVariables>(
        GetOrCreateUserDocument
    )
}
