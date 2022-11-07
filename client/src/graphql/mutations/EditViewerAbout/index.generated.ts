/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type EditViewerAboutMutationVariables = Types.Exact<{
    input: Types.UpdateUserInput
}>

export type EditViewerAboutMutation = {
    __typename?: 'Mutation'
    updateUser: {
        __typename?: 'UpdateUserPayload'
        success: boolean
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    }
}

export const EditViewerAboutDocument = gql`
    mutation EditViewerAbout($input: UpdateUserInput!) {
        updateUser(input: $input) {
            success
            errors {
                key
                message
            }
        }
    }
`

export function useEditViewerAboutMutation() {
    return Urql.useMutation<
        EditViewerAboutMutation,
        EditViewerAboutMutationVariables
    >(EditViewerAboutDocument)
}
