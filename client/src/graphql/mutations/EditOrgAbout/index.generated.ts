/* eslint-disable */
import * as Types from '../../../mock/schema.generated'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type EditOrgAboutMutationVariables = Types.Exact<{
    input: Types.UpdateOrganizationInput
}>

export type EditOrgAboutMutation = {
    __typename?: 'Mutation'
    updateOrganization: {
        __typename?: 'UpdateOrganizationPayload'
        success: boolean
        errors: Array<{
            __typename?: 'InputError'
            key: string
            message: string
        }>
    }
}

export const EditOrgAboutDocument = gql`
    mutation EditOrgAbout($input: UpdateOrganizationInput!) {
        updateOrganization(input: $input) {
            success
            errors {
                key
                message
            }
        }
    }
`

export function useEditOrgAboutMutation() {
    return Urql.useMutation<
        EditOrgAboutMutation,
        EditOrgAboutMutationVariables
    >(EditOrgAboutDocument)
}
