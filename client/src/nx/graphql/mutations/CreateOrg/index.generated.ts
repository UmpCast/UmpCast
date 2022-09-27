/* eslint-disable */
import * as Types from '../../schema'

import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateOrgMutationVariables = Types.Exact<{
    input: Types.CreateOrganizationInput
}>

export type CreateOrgMutation = {
    __typename?: 'Mutation'
    createOrganization: {
        __typename?: 'CreateOrganizationPayload'
        success: boolean
        errors: Array<{ __typename?: 'InputError'; key: string; message: string }>
    }
}

export const CreateOrgDocument = gql`
    mutation CreateOrg($input: CreateOrganizationInput!) {
        createOrganization(input: $input) {
            success
            errors {
                key
                message
            }
        }
    }
`

export function useCreateOrgMutation() {
    return Urql.useMutation<CreateOrgMutation, CreateOrgMutationVariables>(CreateOrgDocument)
}
