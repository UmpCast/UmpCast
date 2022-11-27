/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateGameMutationVariables = Types.Exact<{
    input: Types.CreateGameInput
}>

export type CreateGameMutation = {
    __typename?: 'Mutation'
    createGame: {
        __typename?: 'CreateGamePayload'
        success: boolean
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    }
}

export const CreateGameDocument = gql`
    mutation CreateGame($input: CreateGameInput!) {
        createGame(input: $input) {
            success
            errors {
                key
                message
            }
        }
    }
`

export function useCreateGameMutation() {
    return Urql.useMutation<CreateGameMutation, CreateGameMutationVariables>(
        CreateGameDocument
    )
}
